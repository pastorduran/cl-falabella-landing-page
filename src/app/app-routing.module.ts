import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'renta',
    component: AccountComponent
  },
  {
    path: '',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
