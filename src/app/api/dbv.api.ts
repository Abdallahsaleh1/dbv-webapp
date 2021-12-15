import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class dbvApi {
  private readonly API = `http://localhost:5000`;
  constructor(private http: HttpClient) { }


  createTable(tableName: string, tableSchema: string): Observable<string> {
    console.log(tableSchema)
    return this.http
      .post<any>(`${this.API}/createNewTable/${tableName}/${tableSchema}`, {});
  }

  importData(tableName: string, data: any): Observable<string> {
    return this.http
      .post<any>(`${this.API}/importData/${tableName}`, data);
  }

  createDBConnection(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.API}/createDBConnection`, data);
  }

  checkIfTableExist(tableName: string): Observable<string> {
    return this.http
      .get<any>(`${this.API}/checkTable/${tableName}`);
  }

  getAllRecords(tableName: string): Observable<any> {
    return this.http
      .get<any>(`${this.API}/getAllRecords/${tableName}`);
  }

  exportData(tableName: string): Observable<string> {
    return this.http
      .get<any>(`${this.API}/exportData/${tableName}`);
  }

  deleteTable(tableName: string): Observable<string> {
    return this.http
      .delete<any>(`${this.API}/deleteTable/${tableName}`);
  }

  deleteRow(tableName: string, rowId: number): Observable<string> {
    return this.http
      .delete<any>(`${this.API}/deleteRow/${tableName}/${rowId}`);
  }

  editRow(tableName: string, rowId: number, data: any): Observable<string> {
    return this.http
      .put<any>(`${this.API}/editRow/${tableName}/${rowId}`, data);
  }

  getTablesNames(){
    return this.http
      .get<any>(`${this.API}/tablesNames`);
  }
  getTableSchema(tableName:string):Observable<any>{
    return this.http
      .get<any>(`${this.API}/tableColumnsNames/${tableName}`);
  }

  getBackUpData(dbName:string):Observable<any>{
    return this.http
      .get<any>(`${this.API}/versionControl/${dbName}`);
  }

  exportSchema(tableName:string){
    return this.http
      .get<any>(`${this.API}/exportSchema/${tableName}`);
  }
  
  exportDataAndSchema(tableName:string):Observable<any>{
    return this.http
      .get<any>(`${this.API}/exportSchemaAndData/${tableName}`);
  }
  restore():Observable<any>{
    return this.http
      .post<any>(`${this.API}/restoreData`,{});
  }

  getDatabaseName():Observable<any>{
    return this.http
      .get<any>(`${this.API}/databaseName`);
  }

}