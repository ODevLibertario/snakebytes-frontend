import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../service/localStorage.service";
import {Router} from "@angular/router";
import {Observable, Subject, timer} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private localStorageService: LocalStorageService, private router: Router) {
  }

  public username: string | null = null
  ngOnInit(): void {
    this.username = this.localStorageService.getItem('username')
    this.localStorageService.localStorageChangeEvents.subscribe(key => {
      if(key === 'username'){
        //Give time for the localStorage change to propagate
        timer(1000).subscribe(() => {
          this.username = this.localStorageService.getItem('username')
        })
      }
    })

  }

  logout() {
    this.username = null
    this.localStorageService.removeItem('username')
    this.localStorageService.removeItem('pubKeyHash')
    this.router.navigate(['sign-in'])


  }
}
