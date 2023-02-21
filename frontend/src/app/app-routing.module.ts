import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoLoginComponent } from './empleado-login/empleado-login.component';
import { ClienteComponent } from './cliente/cliente.component'
import { EmpleadoComponent } from './empleado/empleado.component';
import { EcrearClienteComponent } from './ecrear-cliente/ecrear-cliente.component';
import { EcrearCuentaComponent } from './ecrear-cuenta/ecrear-cuenta.component';
import { TransferenciaInternaComponent } from './transferencia-interna/transferencia-interna.component';
import { ClientesComponent } from './clientes/clientes.component'

const routes: Routes = [
  { path: 'cliente', component: ClienteComponent },
  { path: 'empleado-login', component: EmpleadoLoginComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'cliente', component: ClientesComponent },
  { path: 'ecrear-cliente', component: EcrearClienteComponent },
  { path: 'ecrear-cuenta', component: EcrearCuentaComponent },
  { path: 'transferencia-interna', component: TransferenciaInternaComponent },

  { path: 'ecrear-cliente/:id', component: EcrearClienteComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
