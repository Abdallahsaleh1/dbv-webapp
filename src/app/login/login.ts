import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectorService } from '../services/dbv.Facade';
import { Observable, Subscription } from 'rxjs'
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class loginComponent implements OnInit {

  userName:string="";
  password:string="";
  usersInfo:any;
  constructor(private selector : SelectorService,private _router: Router,private _activatedRoute:ActivatedRoute ) { }


  ngOnInit(): void {
    this.selector.getUserInfo().subscribe(ele =>
       {this.usersInfo = ele});
 
  }

  checkUser(){
    this.userName = String((<HTMLInputElement>document.getElementById("Email")!).value);
    this.password = String((<HTMLInputElement>document.getElementById("Password")!).value);
    console.log(this.password);
    for(let i = 0;i<this.usersInfo.length;i++){
      console.log(this.usersInfo[i].username,this.usersInfo[i].password)
      if(this.userName == this.usersInfo[i].username && this.password == this.usersInfo[i].password){
        this.selector.setUserName(this.userName);
        this.selector.setHomePageVisibility(true)
        if(this.usersInfo.role == "admin"){
          this.selector.setRole("admin")
          localStorage.setItem("role", "admin");
        } else if(this.usersInfo.role == "staff"){
          this.selector.setRole("staff")
          localStorage.setItem("role", "staff");
        } else if(this.usersInfo.role == "reader"){
          this.selector.setRole("reader")
          localStorage.setItem("role", "reader");
        }
        this._router.navigate(['/','connection'])
      }
    }
  }

  
}
