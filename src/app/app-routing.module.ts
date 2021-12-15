import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginComponent} from "./login/login"
import { createTableComponent } from './create-table/create-table.component';
import { importDataComponent } from './create-table/import-data/import-data.component';
import { dbConnectionComponent } from './DB-connection/db-connection.component';

const routes: Routes = [
    { path: '', component: loginComponent },
    { path: 'login', component: loginComponent },
    { path: 'connection', component: dbConnectionComponent },
    { path: 'homepage', component: createTableComponent },
    { path: 'tabledata/:tablename', component: importDataComponent },
//   { path: 'response/:id', component: WidgetResponsesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }