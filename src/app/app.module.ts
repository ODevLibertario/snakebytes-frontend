import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/component/game.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { PrizeComponent } from './prize/prize.component';
import { FaqComponent } from './faq/faq.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    NavbarComponent,
    LeaderboardComponent,
    PrizeComponent,
    FaqComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCollapseModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
