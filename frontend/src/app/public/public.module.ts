import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PasosComponent } from './pasos/pasos.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { FormularioComponent } from './formulario/formulario.component';



@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    PresentacionComponent,
    ContactoComponent,
    PasosComponent,
    CarruselComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule, //para el modulo de rutas
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class PublicModule { }
