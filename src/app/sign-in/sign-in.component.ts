import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  signInForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: [''],
      publicKey: ['']
    })
  }

  signIn(){
    console.log(this.signInForm?.valid)
    console.log(this.signInForm?.value)
  }
}
