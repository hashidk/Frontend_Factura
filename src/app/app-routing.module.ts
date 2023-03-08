import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EmpleadoComponent } from './empleado/empleado.component';

// import { ClienteComponent } from './cliente/clientee/cliente.component'
// import { TransferenciaInternaComponent } from './cliente/transferencia-interna/transferencia-interna.component';
// import { ClientesComponent } from './cliente/clientes/clientes.component';
// import { EscritorioComponent } from './cliente/escritorio/escritorio.component';
import { ClientesComponent } from './clientes/clientes.component';
import { RegisterComponent } from './register/register.component';
import { PublicComponent } from './public/public.component';
import { AuthGuard } from './Guards/auth.guard';


const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const empleadoModule = () => import('./empleado/empleado.module').then(x => x.EmpleadoModule);
const clienteModule = () => import('./clientes/clientes.module').then(x => x.ClientesModule);
const inicioModule = () => import('./public/public.module').then(x => x.PublicModule);


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: PublicComponent },

  // { path: 'empleado', component: EmpleadoComponent, canActivate: [AuthGuard] },
  // { path: 'empleado', loadChildren: empleadoModule, canActivate: [AuthGuard] },

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

  // { path: 'cliente', component: ClientesComponent, canActivate: [AuthGuard] },
  // { path: 'cliente', loadChildren: clienteModule },

  // { path: 'cliente', component: ClientesComponent },
  // { path: 'transferencia-interna', component: TransferenciaInternaComponent },
  // { path: 'cliente', component: ClienteComponent },
  // { path: 'escritorio', component: EscritorioComponent },

  // { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]  },  //
  // { path: 'admin', loadChildren: adminModule },
  
  { path: '**', loadChildren: inicioModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
