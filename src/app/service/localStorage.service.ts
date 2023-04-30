import {Subject} from "rxjs";


export class LocalStorageService{
  private localStorageSubject = new Subject<string>();

  public localStorageChangeEvents = this.localStorageSubject.asObservable();

  setItem(key: string, value: string){
    this.localStorageSubject.next(key)
    localStorage.setItem(key, value)
  }

  removeItem(key: string){
    this.localStorageSubject.next(key)
    localStorage.removeItem(key)
  }

  getItem(key: string){
    return localStorage.getItem(key)
  }
}
