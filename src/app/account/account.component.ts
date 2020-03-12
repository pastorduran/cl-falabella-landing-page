import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public accountFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private  router: Router, public clientService : ClientService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.accountFormGroup = this.formBuilder.group({
      netSalary: ['', Validators.required]
    });
  }

  public saveAccount() {
    const formObj = this.accountFormGroup.value;
    this.clientService.setNetSalary(formObj.netSalary);
    this.clientService.createAccount(this.clientService.getLocalClient()).subscribe(res => {
      console.log(res);
    });
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.accountFormGroup.get(controlName);
    if (control.touched && control.errors != null) {
      error = `Introduzca un valor valido en el campo ${controlName}`;
    }
    return error;
  }

}
