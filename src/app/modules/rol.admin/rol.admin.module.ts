import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { PublicModule } from '../public/public.module';
import { AcrearComponent } from './crear/acrear.component';
import { AleerComponent } from './leer/aleer.component';
import { AactualizarComponent } from './actualizar/aactualizar.component';
import { AdesactivarComponent } from './desactivar/adesactivar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    AcrearComponent, 
    AleerComponent, 
    AactualizarComponent, 
    AdesactivarComponent,
    AdminComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,   //para el modulo 
    HttpClientModule,
    PublicModule,
    AdminRoutingModule
  ],
  providers: [],
})

export class RolAdminModule { }
