import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadoRoutingModule } from './empleado-routing.module';

import { EmpleadoComponent } from './empleado.component';
import { EcrearComponent } from './crear/ecrear.component'
import { EleerComponent } from './leer/eleer.component';
import { EactualizarComponent } from './actualizar/eactualizar.component';
import { EdesactivarComponent } from './desactivar/edesactivar.component';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
    declarations: [
        EmpleadoComponent,
        EleerComponent, EactualizarComponent, EdesactivarComponent,
        EcrearComponent
    ],

    imports: [
        BrowserModule,
        FormsModule,   //para el modulo 
        EmpleadoRoutingModule, //para el modulo de rutas
        HttpClientModule,
        DataTablesModule //para tablas
    ],
    providers: [],
})
export class EmpleadoModule { }
