import { Component, OnInit } from '@angular/core';
import { SelectorService } from '../services/dbv.Facade';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  role :string = "";
  userName:string="";
  fileData :any;
  tableSchema:string="";
  tableName:string="";
  fileType: number = 0;

  constructor(private selector : SelectorService) { }

  ngOnInit(): void {
    this.selector.getRole().subscribe(ele=>{
      this.role = ele;
    })
    this.selector.getUserName().subscribe(ele=>{
      this.userName = ele;
    })

    
  }

 

  submitModal(){
    if(this.fileType == 1){
      this.submitText();
    }else if(this.fileType == 2){
      this.submitJson();
    }
  }

  submitText() {
    this.tableName = (<HTMLInputElement>document.getElementById("table-name")).value
    let file = (<HTMLInputElement>document.getElementById("formTextFileSm")).files![0];
    const reader = new FileReader()
    reader.onload = event =>{
        this.fileData = event.target!.result
        this.splitColumnNames();
        this.selector.createTable(this.tableName,this.tableSchema);
    } // desired file content
    reader.onerror = error => reject(error)
    reader.readAsText(file) // you could also read images and other binaries
    
   }

   submitJson(){
    this.tableName = (<HTMLInputElement>document.getElementById("table-name")).value
    let file = (<HTMLInputElement>document.getElementById("formJsonFileSm")).files![0];
    const reader = new FileReader()
    reader.onload = event =>{
        this.fileData = event.target!.result
        
        this.fileData = JSON.parse(this.fileData)
        this.splitJsonColumnNames()
        this.selector.createTable(this.tableName,this.tableSchema);
    } // desired file content
    reader.onerror = error => reject(error)
    reader.readAsText(file) // you could also read images and other binaries
   }

   splitColumnNames(){
    
    let lines = this.fileData.split("\n");
    let columnNames = lines[0].split(',');
    let dataTypes = lines[1].split(','); 

    console.log(columnNames,dataTypes)
    
    this.buildTableSchema(columnNames,dataTypes);
    
   }
   
   buildTableSchema(columnNames:any,dataTypes:any){
    for(let i=0;i<columnNames.length;i++){
        console.log(columnNames[i].toString())
        this.tableSchema+=columnNames[i].toString()
        this.tableSchema+=" "
        this.tableSchema+=dataTypes[i].toString()
        this.tableSchema+=", "
        console.log(this.tableSchema)
        
        // this.tableSchema[columnNames[i]]=dataTypes[i];
    }
   }

   splitJsonColumnNames(){
    let columnNames =Object.keys(this.fileData)
    let dataTypes:any=[];
    columnNames.forEach(element => {
      dataTypes.push(this.fileData[element]);
      
    });
    console.log(dataTypes)
    this.buildTableSchema(columnNames,dataTypes);
   }

   changeFlagValue(value: number){
    this.fileType = value;
   }
}

function reject(error: ProgressEvent<FileReader>): any {
  throw new Error('Function not implemented.');
}