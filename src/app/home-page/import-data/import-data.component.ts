import { Component, OnInit } from '@angular/core';
import { SelectorService } from 'src/app/services/dbv.Facade';
@Component({
  selector: 'import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class importDataComponent implements OnInit {
  fileData :any;
  tableSchema:string="";
  tableName:string="";
  fileType: number = 0;
  constructor(private selector : SelectorService) { }

  ngOnInit(): void {
    
  }
  submitModal(){
    if(this.fileType == 1){
      this.submitText();
    }else if(this.fileType == 2){
      this.submitJson();
    }
  }
  submitText() {
    this.tableName = (<HTMLInputElement>document.getElementById("tableName")).value
    let file = (<HTMLInputElement>document.getElementById("my")).files![0];
    const reader = new FileReader()
    reader.onload = event =>{
        this.fileData = event.target!.result
        this.splitData();
        //this.selector.createTable(this.tableName,this.tableSchema);
    } // desired file content
    reader.onerror = error => reject(error)
    reader.readAsText(file) // you could also read images and other binaries
    
   }

   submitJson(){
    let file = (<HTMLInputElement>document.getElementById("myFile")).files![0];
    const reader = new FileReader()
    reader.onload = event =>{
        this.fileData = event.target!.result
        
        this.fileData = JSON.parse(this.fileData)
        //call_api
    } // desired file content
    reader.onerror = error => reject(error)
    reader.readAsText(file) // you could also read images and other binaries
   }

   splitData(){
    let data:any=[];

    let lines = this.fileData.split("\n");
    console.log(lines)
    let columnNames = lines[0].split(',');
    
    for(let i = 1;i<lines.length;i++){
      if(lines[i] == "") continue;
      let row =lines[i].split(',');
      let dataObject:any = {};
      for(let j = 0;j<row.length;j++){
        let key = columnNames[j]
        let value = row[j]
        dataObject[key]=value; 
      }
      data.push(dataObject);
    }

    this.prepareDataJsonObject(data);
        
   }
   
 prepareDataJsonObject(data:any){
    var viewData = { 

      data : [] 
  
  };
  viewData.data = data
  console.log(viewData)
  //callapi
  
   }
   changeFlagValue(value: number){
    this.fileType = value;
   }


  


}
function reject(error: ProgressEvent<FileReader>): any {
  throw new Error('Function not implemented.');
}

