import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Subscription} from "rxjs";


const BACKEND_URL = "https://snakebytes-backend.onrender.com"
@Injectable()
export class BackendService {
  constructor(private http: HttpClient) { }

  signUp(username: string) {
    return this.http.get(BACKEND_URL + '/signUp', {params: {username}})
  }

  signIn(username: string, pubKeyHash: string) {
    return this.http.post(BACKEND_URL + '/signIn', {username, pubKeyHash})
  }

  getLeaderboard(){
    return this.http.get(BACKEND_URL + '/leaderboard')
  }

  getPrize(){
    return this.http.get(BACKEND_URL + '/prize')
  }

  startGame(username: string, pubKeyHash: string) {
    return this.http.post(BACKEND_URL + '/startGame', {username, pubKeyHash})
  }

  collectCoin(username: string, pubKeyHash: string, x: number, y: number) {
    return this.http.post(BACKEND_URL + '/collectCoin', {username, pubKeyHash, x , y})
  }

  finishGame(username: string, pubKeyHash: string, x: number, y: number, playLog: any[]) {
    return this.http.post(BACKEND_URL + '/finishGame', {username, pubKeyHash, deathPoint: {x , y}, playLog})
  }

  ping(){
    return this.http.get(BACKEND_URL + '/ping')
  }
}
