import { Component, OnInit } from '@angular/core';
import { SelectorService } from 'src/app/services/dbv.Facade';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  routerTableName:any;
  tableData:any;
  columnsNames:any=[];
  checkEditing=false;
  role:string = "";
  constructor(private selector : SelectorService,private activatedroute: ActivatedRoute,private _router: Router) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(
      (params) => {
        this.routerTableName = String(params.get('tablename'));
        console.log(this.routerTableName)
      })


    this.selector.getAllRecords(String(this.routerTableName)).subscribe(ele=>{
      this.tableData = ele.data;
      if(this.tableData.length == 0){
        this.selector.getTableSchema(String(this.routerTableName)).subscribe(ele=>{
          let test = ele.data;
          
          for(let i =0 ; i<test.length;i++){
            this.columnsNames.push(test[i].COLUMN_NAME)
          }
          console.log(this.columnsNames)
  
        })
      } else{
        this.columnsNames = Object.keys(this.tableData[0]);
      console.log(this.tableData);
      console.log(this.columnsNames)
      
      }
      
    });
    this.role = localStorage.getItem("role")!;
    
  }
  submitModal(){
    if(this.fileType == 1){
      this.submitText();
    }else if(this.fileType == 2){
      this.submitJson();
    }
  }
  submitText() {
    let file;
    if(this.checkEditing ==true){
      file= (<HTMLInputElement>document.getElementById("editTextFile")).files![0];
    }else{
      file= (<HTMLInputElement>document.getElementById("formTextFileSm")).files![0];
    }
    const reader = new FileReader()
    reader.onload = event =>{
        this.fileData = event.target!.result
        this.splitData();
    } // desired file content
    reader.onerror = error => reject(error)
    reader.readAsText(file) // you could also read images and other binaries
    
   }
   

   submitJson(){
    let file = (<HTMLInputElement>document.getElementById("formJsonFileSm")).files![0];
    const reader = new FileReader()
    reader.onload = event =>{
        this.fileData = event.target!.result
        
        this.fileData = JSON.parse(this.fileData)
        this.selector.importData(this.routerTableName,this.fileData).subscribe();
        setTimeout(() => {
          this.selector.getAllRecords(String(this.routerTableName)).subscribe(ele=>{
            this.tableData = ele.data;
            this.columnsNames = Object.keys(this.tableData[0]);
            console.log(this.tableData);
            console.log(this.columnsNames)
          });
        }, 5000);
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
  if(this.checkEditing == true){
    console.log("hii")
    let rowId = (<HTMLInputElement>document.getElementById("rowId")).value

    this.selector.editRow(this.routerTableName,Number(rowId),viewData).subscribe()
    this.selector.getAllRecords(String(this.routerTableName)).subscribe(ele=>{
      this.tableData = ele.data;
      this.columnsNames = Object.keys(this.tableData[0]);
      console.log(this.tableData);
      console.log(this.columnsNames)
      
      
      
    });

  } else{
    this.selector.importData(this.routerTableName,viewData).subscribe();

  }
  
   }
   changeFlagValue(value: number){
    this.fileType = value;
   }

   
   counter(columns: any) {
    return new Array(columns.length);
  }
  
  deleteRow(rowId:any){
    console.log("del",rowId)
    this.selector.deleteRow(this.routerTableName,rowId).subscribe();
    this.selector.getAllRecords(String(this.routerTableName)).subscribe(ele=>{
      this.tableData = ele.data;
      this.columnsNames = Object.keys(this.tableData[0]);
      console.log(this.tableData);
      console.log(this.columnsNames)
      
      
      
    });
  }

  changeFlagRow(value: number){
    this.fileType = value;

   }

   submitEditModal(){
     this.checkEditing = true;
    if(this.fileType == 1){
      this.submitText();
    }else if(this.fileType == 2){
      this.submitJson();
    }
  }

  signOut(){
    this.selector.setHomePageVisibility(false);
    this.selector.setRole("");
    this.selector.setUserName("");
    this._router.navigate(['/','login']);
  }
  exportSchema(){
    this.selector.exportSchema(this.routerTableName).subscribe();
  }
  exportData(){
    this.selector.exportData(this.routerTableName).subscribe();
  }

  exportSchemaAndData(){
    this.selector.exportDataAndSchema(this.routerTableName).subscribe();
  }
  goBack(){
    this._router.navigate(['/','homepage']);
   }


}
function reject(error: ProgressEvent<FileReader>): any {
  throw new Error('Function not implemented.');
}

