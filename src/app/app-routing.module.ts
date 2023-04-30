import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameComponent} from "./game/component/game.component";
import {FaqComponent} from "./faq/faq.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {PrizeComponent} from "./prize/prize.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";

const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'prize', component: PrizeComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
