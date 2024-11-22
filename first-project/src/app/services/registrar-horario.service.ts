import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrarHorarioService {

  APIget = 'http://localhost:3000/registro-horario/get-horarios';
  APIupdate = 'http://localhost:3000/registro-horario/update-horarios';

  constructor(private http: HttpClient, private router: Router) { }

  getHorarios(){
    return this.http.get<any>(this.APIget + `/${"idParam"}`);
  }

  updateHorarios(horarios: any){
    return this.http.put(this.APIupdate, horarios,{responseType: 'text'});
  }
}
