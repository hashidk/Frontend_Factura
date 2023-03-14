import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { EcrearComponent } from './crear/ecrear.component'
import { EleerComponent } from './leer/eleer.component';
import { EactualizarComponent } from './actualizar/eactualizar.component';
import { EdesactivarComponent } from './desactivar/edesactivar.component';

import { PublicModule } from '../public/public.module';
import { EmpleadoRoutingModule } from './empleado-routing.module';
import { EmpleadoComponent } from './empleado.component';

@NgModule({
    declarations: [
        EleerComponent, 
        EactualizarComponent, 
        EdesactivarComponent,
        EcrearComponent,
        EmpleadoComponent
    ],

    imports: [
        BrowserModule,
        FormsModule,   //para el modulo 
        HttpClientModule,
        PublicModule,
        EmpleadoRoutingModule
    ],
    providers: [],
})
export class RolEmpleadoModule { }
