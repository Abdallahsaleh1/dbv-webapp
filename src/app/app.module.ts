import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loginComponent } from './login/login';
import { FormsModule } from '@angular/forms';
import { dbvApi } from './api/dbv.api';
import { dbvState } from './services/dbv.state';
import { SelectorService } from './services/dbv.Facade';
import { importDataComponent } from './create-table/import-data/import-data.component';
import { dbConnectionComponent } from './DB-connection/db-connection.component';
import { createTableComponent } from './create-table/create-table.component';
@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    importDataComponent,
    dbConnectionComponent,
    createTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    
  ],
  providers: [dbvApi,dbvState,SelectorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
