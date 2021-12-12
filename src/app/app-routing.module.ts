import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginComponent} from "./login/login"
import { HomePageComponent } from './home-page/home-page.component';
import { importDataComponent } from './home-page/import-data/import-data.component';
import { dbConnectionComponent } from './DB-connection/db-connection.component';

const routes: Routes = [
    { path: '', component: loginComponent },
    { path: 'homepage', component: dbConnectionComponent },
//   { path: 'response/:id', component: WidgetResponsesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }