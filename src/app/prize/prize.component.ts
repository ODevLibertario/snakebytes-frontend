import {Component, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css']
})
export class PrizeComponent implements OnInit{
  public prize: { username: string, payload: string } | null = null

  constructor(private backendService: BackendService) {

  }

  ngOnInit() {
    this.backendService.getPrize().subscribe(prize => {
      this.prize = prize as { username: string, payload: string } | null
    })
  }

}
