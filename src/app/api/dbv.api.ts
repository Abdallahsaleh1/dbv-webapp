import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class dbvApi {
  private readonly API = ``;
  constructor(private http: HttpClient) { }


  createTable(tableName: string,tableSchema:string): Observable<string> {
    return this.http
      .post<any>(`${this.API}/${tableName}`, { params: { tableSchema: tableSchema } });
  }


}