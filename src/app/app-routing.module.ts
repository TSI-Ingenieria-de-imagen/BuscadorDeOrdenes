import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuscarOrdenComponent } from './pages/buscar-orden/buscar-orden.component';
import { BuscarOfComponent } from './pages/buscar-of/buscar-of.component';
import { BuscarOmComponent } from './pages/buscar-om/buscar-om.component';
import { ClientesVariosComponent } from './pages/clientes-varios/clientes-varios.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'buscar-orden' },
  { path: 'buscar-orden', component: BuscarOrdenComponent },
  { path: 'buscar-of', component: BuscarOfComponent },
  { path: 'buscar-om', component: BuscarOmComponent },
  { path: 'clientes-varios', component: ClientesVariosComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
