import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { loginComponent } from './login/login';
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from '@angular/forms';
import { createTableComponent } from './home-page/createTable/create-table.component';
import { dbvApi } from './api/dbv.api';
import { dbvState } from './services/dbv.state';
import { SelectorService } from './services/dbv.Facade';
@NgModule({
  declarations: [
    AppComponent,
    loginComponent,
    HomePageComponent,
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