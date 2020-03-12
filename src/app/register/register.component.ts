import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ɵROUTER_PROVIDERS } from '@angular/router';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formGroup: FormGroup;

  title = 'Banco Falabella - registro';

  constructor(private formBuilder: FormBuilder, private router: Router, public clientService : ClientService) {}

  public ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      rut: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  public redirect() {
    const client = this.formGroup.value;
    this.clientService.setDataCliente(client.rut, client.email, client.phone);
    this.buildForm();
    this.router.navigateByUrl('/renta');
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null) {
      error = `Introduzca un valor valido en el campo ${controlName}`;
    }
    return error;
  }

}
