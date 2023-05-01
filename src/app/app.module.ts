import {Injector, NgModule} from '@angular/core';
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
import { SignUpComponent } from './sign-up/sign-up.component';
import {MdbFormsModule} from "mdb-angular-ui-kit/forms";
import {HttpClientModule} from "@angular/common/http";
import {BackendService} from "./service/backend.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import {LocalStorageService} from "./service/localStorage.service";
import {ServiceLocator} from "./service/locator.service";
import {CountdownModule} from "ngx-countdown";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    NavbarComponent,
    LeaderboardComponent,
    PrizeComponent,
    FaqComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCollapseModule,
    ReactiveFormsModule,
    MdbFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CountdownModule
  ],
  providers: [BackendService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = injector;
  }

}
