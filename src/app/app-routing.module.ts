import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginComponent} from "./login/login"
import { HomePageComponent } from './home-page/home-page.component';
import { importDataComponent } from './home-page/import-data/import-data.component';
import { dbConnectionComponent } from './DB-connection/db-connection.component';

const routes: Routes = [
    { path: '', component: loginComponent },
    { path: 'login', component: loginComponent },
    { path: 'connection', component: dbConnectionComponent },
    { path: 'homepage', component: HomePageComponent },
    { path: 'tabledata/:tablename', component: importDataComponent },
//   { path: 'response/:id', component: WidgetResponsesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }