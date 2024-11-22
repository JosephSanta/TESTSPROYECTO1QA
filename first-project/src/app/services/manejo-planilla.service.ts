import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManejoPlanillaService {

  constructor(private http: HttpClient, private router: Router) {}

  API = 'http://localhost:3000/manejo-plantilla'

  getFuncionariosElegibles() {
    return this.http.get<Array<any>>(this.API+`/get-elegibles`);
  }

  getFuncionariosEliminables() {
    return this.http.get<Array<any>>(this.API+`/get-eliminables`);
  }

  addToPlanilla(funcionario: any) {
    return this.http.put(this.API+`/addToPlanilla`, funcionario, {responseType: 'text'});
  }

  deleteFromPlanilla(funcionario: any) {
    console.log(funcionario);
    return this.http.put(this.API+`/deleteFromPlanilla`, funcionario, {responseType: 'text'});
  }
}
