import {Component, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {BackendService} from "../service/backend.service";
import {Clipboard} from "@angular/cdk/clipboard";
import {ToastrService} from "ngx-toastr";
import {CountdownConfig} from "ngx-countdown";

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.css']
})
export class PrizeComponent implements OnInit{
  public prize: { username: string, payload: string } | null = null

  constructor(private backendService: BackendService, private clipboard: Clipboard, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.backendService.getPrize().subscribe(prize => {
      let prizeAny = prize as any
      this.prize = {username: prizeAny.username, payload: atob(prizeAny.payload)}
    })
  }

  toolTip(){
    if(this.prize) {
      return "Click to copy to clipboard \n" + this.prize.payload
    }else {
      return ""
    }
  }

  copyToClipboard() {
    this.clipboard.copy(this.prize!!.payload!!)
    this.toastr.success("Prize copied to clipboard")
  }
}
