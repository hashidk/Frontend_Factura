import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PasosComponent } from './pasos/pasos.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { FormularioComponent } from './formulario/formulario.component';
import { InputComponent } from './ui/input/input.component';
import { AlertaComponent } from './ui/alerta/alerta.component';
import { MessageComponent } from './ui/message/message.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PublicRoutingModule } from './public-routing.module';
import { AcordeonItemComponent } from './ui/acordeon-item/acordeon-item.component';
import { RequisitosComponent } from './requisitos/requisitos.component';



@NgModule({
  declarations: [
    PublicComponent,
    HeaderComponent,
    FooterComponent,
    PresentacionComponent,
    ContactoComponent,
    PasosComponent,
    CarruselComponent,
    FormularioComponent,
    InputComponent,
    AlertaComponent,
    MessageComponent,
    LoginComponent,
    RegisterComponent,
    AcordeonItemComponent,
    RequisitosComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    PublicRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    InputComponent,
    AlertaComponent,
    MessageComponent,
    LoginComponent,
    RegisterComponent,
    AcordeonItemComponent
  ]
})
export class PublicModule { }
