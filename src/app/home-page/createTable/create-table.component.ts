import { Component, OnInit } from '@angular/core';
import { SelectorService } from 'src/app/services/dbv.Facade';
@Component({
  selector: 'create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class createTableComponent implements OnInit {
  fileData :any;
  tableSchema:string="";
  tableName:string="";
  constructor(private selector : SelectorService) { }

  ngOnInit(): void {
    
  }
  submit() {
    this.tableName = (<HTMLInputElement>document.getElementById("tableName")).value
    let file = (<HTMLInputElement>document.getElementById("myFile")).files![0];
    const reader = new FileReader()
    reader.onload = event =>{
        this.fileData = event.target!.result
        this.splitColumnNames();
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

   


  


}
function reject(error: ProgressEvent<FileReader>): any {
  throw new Error('Function not implemented.');
}

