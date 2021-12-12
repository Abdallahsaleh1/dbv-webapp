import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dbvApi } from '../api/dbv.api';
import { dbvState } from './dbv.state';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {

  constructor(private state : dbvState, private _dbvApi : dbvApi) { }
  
  getUserInfo():Observable<Array<any>>{
    return this.state.getUserInfo()
  }

  setHomePageVisibility(visible:boolean){
    this.state.setHomePageVisibility(visible);
  }

  getHomePageVisibility():Observable<boolean>{
    return this.state.getHomePageVisibility();
  }

  setRole(role:string){
    this.state.setRole(role);
  }

  getRole():Observable<string>{
    return this.state.getRole();
  }

  createTable(tableName:string , tableSchema:string) :Observable<string>{
    return this._dbvApi.createTable(tableName,tableSchema);
  }
  getUserName():Observable<string>{
    return this.state.getUserName();
  }
  setUserName(name:string){
    this.state.setUserName(name);
  }


  importData(tableName: string, data: any): Observable<string> {
    return this._dbvApi.importData(tableName,data);
  }

  createDBConnection(data: any): Observable<string> {
    return this._dbvApi.createDBConnection(data);
  }

  checkIfTableExist(tableName: string): Observable<string> {
    return this._dbvApi.checkIfTableExist(tableName);
  }

  getAllRecords(tableName: string): Observable<string> {
    return this._dbvApi.getAllRecords(tableName);
  }

  exportData(tableName: string): Observable<string> {
    return this._dbvApi.exportData(tableName);
  }

  deleteTable(tableName: string): Observable<string> {
    return this._dbvApi.deleteTable(tableName);
  }

  deleteRow(tableName: string, rowId: number): Observable<string> {
    return this._dbvApi.deleteRow(tableName,rowId);
  }

  editRow(tableName: string, rowId: number, data: any): Observable<string> {
    return this._dbvApi.editRow(tableName, rowId, data);
  }

}
