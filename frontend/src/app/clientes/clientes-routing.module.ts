import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  
  // { path: 'cuentas', component: CleerComponent },
  // { path: 'aleer', component: AleerComponent },
  // { path: 'aactualizar', component: AactualizarComponent },
  // { path: 'adesactivar', component: AdesactivarComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
