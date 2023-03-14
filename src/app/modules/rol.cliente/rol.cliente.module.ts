import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicModule } from '../public/public.module';
import { ClienteRoutingModule } from './cliente-routing.module';


@NgModule({
  declarations: [
    ClientesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,   //para el modulo 
    HttpClientModule,
    PublicModule,
    ClienteRoutingModule
  ],
})
export class RolClienteModule { }
