import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../service/backend.service";
import {ToastrService} from "ngx-toastr";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup | undefined;
  public privateKey: string | undefined;
  public pubKeyHash: string | undefined;
  public sending: boolean = false

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService,
              private toastr: ToastrService,
              private clipboard: Clipboard) { }

  ngOnInit() {
    this.sending = false
    this.signUpForm = this.formBuilder.group({
      username: [''],
      publicKey: ['']
    })
  }

  isButtonDisabled(){
    return this.signUpForm?.invalid || this.sending
  }

  signUp(){
    this.sending = true;
    this.backendService.signUp(this.signUpForm?.value?.username).subscribe(response => {
      this.sending = false
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

  copyToClipboard(value: string) {
    this.clipboard.copy(value)
    this.toastr.success("Copied to cliboard")
  }
}
