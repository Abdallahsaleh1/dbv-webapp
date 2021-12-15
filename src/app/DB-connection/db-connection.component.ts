import { Component, OnInit } from '@angular/core';
import { SelectorService } from '../services/dbv.Facade';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'db-connection',
  templateUrl: './db-connection.component.html',
  styleUrls: ['./db-connection.component.scss']
})
export class dbConnectionComponent implements OnInit {
  databaseName:string="";
  hostName:string="";
  userName:string="";
  password:string="";
  connect:boolean=false;
  constructor(private selector : SelectorService,private _router: Router,private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  
  }

  submit(){
    this.databaseName = String((<HTMLInputElement>document.getElementById("database-name")!).value);
    this.hostName = String((<HTMLInputElement>document.getElementById("host")!).value);
    this.userName = String((<HTMLInputElement>document.getElementById("username")!).value);
    this.password = String((<HTMLInputElement>document.getElementById("password")!).value);

    var databaseInfo = { 

        "database":this.databaseName,
        "host":this.hostName,
        "username":this.userName,
        "password":this.password

  
  };
  
    this.selector.createDBConnection(databaseInfo).subscribe(ele=>{
      console.log(ele);
      this.connect = ele.data;
      if(this.connect == true){
        this._router.navigate(['/','homepage'])
      }
    });
  }

  signOut(){
    this.selector.setHomePageVisibility(false);
    this.selector.setRole("");
    this.selector.setUserName("");
    this._router.navigate(['/','login']);
  }
}

