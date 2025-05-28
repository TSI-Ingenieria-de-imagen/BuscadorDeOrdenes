import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';  // Importa FormBuilder y FormGroup
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { BuscarofserviceService } from './buscarofservice.service';
import { BuscarofserviceService } from 'src/shared/buscarofservice.service';

@Component({
  selector: 'app-clientes-varios',
  templateUrl: './clientes-varios.component.html',
  styleUrls: ['./clientes-varios.component.css']
})
export class ClientesVariosComponent implements OnInit{

  formulario3!: FormGroup;  // Define una propiedad para el formulario
  mensajeDelServidor: string = '';

  constructor(private router: Router, private toastr: ToastrService, private buscarService: BuscarofserviceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario3 = this.fb.group({  // Inicializa el formulario
      of: [''],
      destino: ['0']
    });
  }

  navegarYMostrarToast(ruta: string) {
    const mensaje = ruta === 'buscar-orden' ? 'Te rediriges al Inicio' : 'Buscando OF';
    // this.toastr.success(mensaje);
    this.router.navigate([ruta]);
  }

  buscarOrden() {
    const orden = this.formulario3?.get('of')?.value;
    const destino = this.formulario3?.get('destino')?.value;
    
    if (orden) {
      // Si destino es una cadena vacía, se pasa null al servicio
      const destinoFinal = destino ? destino : null;
      
      this.buscarService.buscarOrdenCv(orden, destinoFinal).subscribe(
        respuesta => {
          if (respuesta.mensaje) {
            this.mensajeDelServidor = respuesta.mensaje;
            window.alert(this.mensajeDelServidor);  // Esto mostrará una ventana de alerta con el mensaje
          } else {
            // Si no hay mensaje en la respuesta, asumimos que la operación fue exitosa
            this.mensajeDelServidor = 'Operación exitosa';
            this.toastr.success(this.mensajeDelServidor);  // Esto mostrará una ventana de alerta con el mensaje de éxito
          }
          console.log(respuesta);
        },
        error => {
          console.error(error);
          this.mensajeDelServidor = 'Error al buscar la orden';
          this.toastr.error(this.mensajeDelServidor);  // Esto mostrará una ventana de alerta con el mensaje de error
        }
      );
    } else {
      console.error('El formulario o el valor del campo orden son null o undefined');
      this.mensajeDelServidor = 'El formulario o el valor del campo orden son null o undefined';
      this.toastr.error(this.mensajeDelServidor);  // Esto mostrará una ventana de alerta con el mensaje de error
    }
  }


}
