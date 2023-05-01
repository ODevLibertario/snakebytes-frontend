import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../service/localStorage.service";
import {Router} from "@angular/router";
import {Observable, Subject, timer} from "rxjs";
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private backendService: BackendService) {
  }

  public username: string | null = null
  ngOnInit(): void {
    this.username = this.localStorageService.getItem('username')
    this.localStorageService.localStorageChangeEvents.subscribe(key => {
      if(key === 'username'){
        //Give time for the localStorage change to propagate
        timer(500).subscribe(() => {
          this.username = this.localStorageService.getItem('username')
        })
      }
    })

    setInterval(() => {
      console.log("ping")
      this.backendService.ping().subscribe(response => {
        console.log((response as any).message)
      })
    }, 30000)

  }

  logout() {
    this.username = null
    this.localStorageService.removeItem('username')
    this.localStorageService.removeItem('pubKeyHash')
    this.router.navigate(['sign-in'])


  }
}
