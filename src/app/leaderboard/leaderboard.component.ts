import {Component, OnInit} from '@angular/core';
import {BackendService} from "../service/backend.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit{
  public leaderboard: any[] = []

  constructor(private backendService: BackendService) {

  }

  ngOnInit() {
    this.backendService.getLeaderboard().subscribe(leaderboard => {
      this.leaderboard = leaderboard as any[]
    })
  }

}
