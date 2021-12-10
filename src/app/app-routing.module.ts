import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginComponent} from "./login/login"
import { HomePageComponent } from './home-page/home-page.component';
const routes: Routes = [
    { path: '', component: loginComponent },
  { path: 'homepage', component: HomePageComponent },
//   { path: 'response/:id', component: WidgetResponsesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }