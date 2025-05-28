import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BuscarofserviceService } from 'src/shared/buscarofservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-om',
  templateUrl: './buscar-om.component.html',
  styleUrls: ['./buscar-om.component.css']
})
export class BuscarOmComponent implements OnInit {

  formulario2!: FormGroup;
  mensajeDelServidor: string = ''; 

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private buscarOmService: BuscarofserviceService
  ) { }

  ngOnInit(): void {
    this.formulario2 = this.fb.group({
      of: [''],
      destino: ['0']
    });
  }

  navegarYMostrarToast(ruta: string) {
    const mensaje = ruta === 'buscar-orden' ? 'Te rediriges al Inicio' : 'Buscando OF';
    // this.toastr.success(mensaje);
    this.router.navigate([ruta]);
  }

  buscarOm() {
    const om = this.formulario2?.get('of')?.value;
    const destino = this.formulario2?.get('destino')?.value;
    this.buscarOmService.buscarOm(om, destino)
      .subscribe(
        respuesta => {
          if (respuesta.mensaje) {
            window.alert(respuesta.mensaje);  // Muestra el mensaje en una ventana de alerta
          } else {
            // Si deseas, puedes agregar un mensaje de éxito aquí
            window.alert('Operación exitosa');  // Muestra el mensaje en una ventana de alerta
          }
        },
        error => {
          console.error('Error: ', error);
          window.alert('Error al buscar la OM');  // Muestra el mensaje en una ventana de alerta
        }
      );
  }
}
