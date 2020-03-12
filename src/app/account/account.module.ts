import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    ReactiveFormsModule,
    AccountRoutingModule
  ],
  bootstrap: [AccountComponent]
})
export class AccountModule { }
