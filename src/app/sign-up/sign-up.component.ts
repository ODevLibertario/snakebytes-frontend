import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../service/backend.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup | undefined;
  public privateKey: string | undefined;
  public pubKeyHash: string | undefined;

  constructor(private formBuilder: FormBuilder, private backendService: BackendService, private toastr: ToastrService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: [''],
      publicKey: ['']
    })
  }

  signUp(){
    this.backendService.signUp(this.signUpForm?.value?.username).subscribe(response => {
      if(response instanceof String){
        throw response
      }else{
        let keys = response as {privateKey: string, pubKeyHash: string}
        this.privateKey = keys.privateKey
        this.pubKeyHash = keys.pubKeyHash
      }
    }, response => {
      this.toastr.error(response.error.message)
    })
  }
}
