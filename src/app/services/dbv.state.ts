import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class dbvState {

  private userInfo = new BehaviorSubject<Array<any>>([
    {username:"ahmadzahi",password:"1234",role:"admin"},
    {username:"samizen",password:"sami123",role:"staff"},
    {username:"abed",password:"abed1234",role:"reader"},
  ]);
  private showHomePage = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<string>(""); 
  private userName = new BehaviorSubject<string>("");


  getUserInfo():Observable<any>{
    return this.userInfo.asObservable();
  }

  setHomePageVisibility(visible:boolean){
    this.showHomePage.next(visible);
  }
  getHomePageVisibility():Observable<boolean>{
    return this.showHomePage.asObservable();
  }
  setRole(role:string){
    this.role.next(role);
  }
  getRole():Observable<string>{
    return this.role.asObservable();
  }
  getUserName():Observable<string>{
    return this.userName.asObservable();
  }
  setUserName(name:string){
    this.userName.next(name);
  }

}
