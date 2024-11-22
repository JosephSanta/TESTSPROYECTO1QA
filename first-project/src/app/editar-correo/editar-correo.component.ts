import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { NgForm } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-correo',
  templateUrl: './editar-correo.component.html',
  styleUrls: ['./editar-correo.component.css']
})
export class EditarCorreoComponent implements OnInit, AfterViewInit {

  cols : number;

  gridByBreakpoint = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 1,
    xs: 1
  }

  departamentos = [
    {dpto:"Compu", campus:"SJ"},
    {dpto:"Arqui", campus:"SJ"},
    {dpto:"Admin", campus:"Cartago"},
    {dpto:"IDI", campus:"Cartago"},
    {dpto:"Ing Construcción", campus:"Cartago"},
    {dpto:"Ing Industrial", campus:"Cartago"},
    
  ];
  isAdmin = 0;
  
  constructor(private breakpointObserver: BreakpointObserver, public router: Router) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  }

  displayedColumns: string[] = ['Departamento', 'Campus'];
  dataSource = new MatTableDataSource<any>(this.departamentos);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  onEditarCorreo(form: NgForm){
    if(form.invalid){
        return;
    }
  }

}