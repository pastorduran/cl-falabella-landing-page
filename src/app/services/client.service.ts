import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Client } from './client.module';
import { ResponseModel } from './responseModel.module';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl = 'http://localhost:8080';


  client = new Client();

  constructor(private http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public checkRestStatus() {
    let resp = this.http.get('localhost:8080/cl/falabella/health');
    console.log(resp);
  }

  public getClients(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.baseUrl + '/cl/falabella/clients',this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  public createAccount(client : Client): Observable<ResponseModel> {
    const data = {'rut' : client.rut, 'email' : client.email, 'phone' : client.phone, 'netSalary' : client.netSalary};
    return this.http.post<ResponseModel>('/cl/falabella/save-account', data)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  } 

  public setDataCliente(rut: any, email: any, phone: any){
    this.client.email = email;
    this.client.rut = rut;
    this.client.phone = phone;
  }

  public setNetSalary(netSalary : any) {
    this.client.netSalary = netSalary;
  }

  public getLocalClient() {
    return this.client;
  }

  public cleanClient(){
    this.client = new Client();
  }

  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }


}
