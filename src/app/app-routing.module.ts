import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public/login/login.component';
import { PublicComponent } from './modules/public/public.component';
import { RegisterComponent } from './modules/public/register/register.component';
import { AdminComponent } from './modules/rol.admin/admin.component';
import { ClientesComponent } from './modules/rol.cliente/clientes.component';
import { EmpleadoComponent } from './modules/rol.empleado/empleado.component';

const adminModule = () => import('./modules/rol.admin/rol.admin.module').then(x => x.RolAdminModule);
const empleadoModule = () => import('./modules/rol.empleado/rol.empleado.module').then(x => x.RolEmpleadoModule);
const clienteModule = () => import('./modules/rol.cliente/rol.cliente.module').then(x => x.RolClienteModule);
const inicioModule = () => import('./modules/public/public.module').then(x => x.PublicModule);



const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: PublicComponent },
  { path: 'sistema', component: (() => {
    switch (localStorage.getItem("rol") || "") {
      case "":
        return LoginComponent;
      case "cliente":
        return ClientesComponent;
      case "empleado":
        return EmpleadoComponent;
      case "administrador":
        return AdminComponent;
      default:
        return LoginComponent;
    }
  })()},

  { path: '**', component: PublicComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
