import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Funcionario } from '../modelos/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaFuncionarioService {

  constructor(private http: HttpClient, private router: Router) {}

  API = 'http://localhost:3000/consulta-funcionario'

  getFuncionarioData(identificacion: String){ 
    console.log(identificacion)
    return this.http.get<any>(this.API + `/findByID/${identificacion}`);
  }

  getAllFuncionariosData(){ 
    return this.http.get<any>(this.API + "/get-all");
  }

  getAllFuncionariosDataByCampus(campus: String){ 
    return this.http.get<any>(this.API + `/get-by/${campus}`);
  }

  updateFuncionarioData(form: Funcionario){ 
    const headers = { 'content-type': 'application/json'}
    console.log("FormFuncionario", form);
    const body=JSON.stringify(form);
    console.log("body", body)
    return this.http.put(this.API + `/updateByID/${form.identificacion}`, body,{'headers':headers})

  }
  deleteFuncionarioData(id: String){ 
    return this.http.delete<any>(this.API + `/deleteByID/${id}`)

  }

  getDepartamentos(){
    return this.http.get<any>('http://localhost:3000/campus-departamentos/getAll');
  }

}
