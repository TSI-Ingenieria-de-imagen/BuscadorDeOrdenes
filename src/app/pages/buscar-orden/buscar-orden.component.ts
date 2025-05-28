import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BuscarofserviceService } from 'src/shared/buscarofservice.service';

@Component({
  selector: 'app-buscar-orden',
  templateUrl: './buscar-orden.component.html',
  styleUrls: ['./buscar-orden.component.css'],
})
export class BuscarOrdenComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    // private buscarService: BuscarofserviceService
  ) {}

  navegarYMostrarToast(ruta: string) {
    const mensaje =
      ruta === 'buscar-of' ? 'Menu Buscar OF' : 'Has cambiado a Buscar OM';
    // this.toastr.success(mensaje);
    this.router.navigate([ruta]);
  }



}
