import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscarOrdenComponent } from './pages/buscar-orden/buscar-orden.component';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { BuscarOfComponent } from './pages/buscar-of/buscar-of.component';
import { BuscarOmComponent } from './pages/buscar-om/buscar-om.component';
import { ToastrModule } from 'ngx-toastr';
import { ClientesVariosComponent } from './pages/clientes-varios/clientes-varios.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarOrdenComponent,
    PruebasComponent,
    CabeceraComponent,
    BuscarOfComponent,
    BuscarOmComponent,
    ClientesVariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
