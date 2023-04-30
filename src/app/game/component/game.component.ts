import {Component, OnInit} from '@angular/core';
import Phaser from 'phaser';
import {GameScene} from "../game.scene";
import {StartScene} from "../start.scene";
import {GameOverScene} from "../game-over.scene";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../service/localStorage.service";
@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  phaserGame: Phaser.Game | undefined;
  config: Phaser.Types.Core.GameConfig;
  constructor(private router: Router, private localStorageService: LocalStorageService) {
    this.config = {
      type: Phaser.AUTO,
      height: 608,
      width: 800,
      scene: [StartScene, GameScene, GameOverScene],
      parent: 'gameContainer',
      fps: {limit: 25},
      backgroundColor: "#8F6A59"
    };
  }
  ngOnInit() {
    if(this.localStorageService.getItem('username')){
      this.phaserGame = new Phaser.Game(this.config);
    }else {
      this.router.navigate(['/sign-in'])
    }
  }
}
