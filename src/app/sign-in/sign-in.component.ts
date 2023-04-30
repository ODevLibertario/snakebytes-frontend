import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../service/backend.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {LocalStorageService} from "../service/localStorage.service";
import {timer} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  signInForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder,
              private backendService: BackendService,
              private toastr: ToastrService,
              private localStorageService: LocalStorageService,
              private router: Router) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: [''],
      pubKeyHash: ['']
    })
  }

  signIn(){
    let {username, pubKeyHash} = this.signInForm?.value

    this.backendService.signIn(username, pubKeyHash).subscribe(response => {
      this.localStorageService.setItem('username', username)
      this.localStorageService.setItem('pubKeyHash', pubKeyHash)
      this.router.navigate(['/game'])



    }, response => {
      this.toastr.error(response.error.message)
    })
  }
}
