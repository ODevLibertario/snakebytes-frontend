import { Component } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  public scores = [{username: 'Player A', score: "1000"}, {username: 'Player B', score: "800"}]
}
