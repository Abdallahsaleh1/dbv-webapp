import { Component, OnInit } from '@angular/core';
import { SelectorService } from '../services/dbv.Facade';
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
  constructor(private selector : SelectorService) { }

  ngOnInit(): void {
  
  }

  submit(){
    this.databaseName = String((<HTMLInputElement>document.getElementById("database-Name")!).value);
    this.hostName = String((<HTMLInputElement>document.getElementById("host")!).value);
    this.userName = String((<HTMLInputElement>document.getElementById("username")!).value);
    this.password = String((<HTMLInputElement>document.getElementById("password")!).value);

    var databaseInfo = { 

      data : [{
        "database":this.databaseName,
        "host":this.hostName,
        "username":this.userName,
        "password":this.password

      }] 
  
  };
    //callapi



  }
}

