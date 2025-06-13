import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';  // Importa FormBuilder y FormGroup
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { BuscarofserviceService } from './buscarofservice.service';
import { BuscarofserviceService } from 'src/shared/buscarofservice.service';

@Component({
  selector: 'app-buscar-of',
  templateUrl: './buscar-of.component.html',
  styleUrls: ['./buscar-of.component.css']
})
export class BuscarOfComponent implements OnInit {

  formulario!: FormGroup;  // Define una propiedad para el formulario
  mensajeDelServidor: string = '';

  constructor(private router: Router, private toastr: ToastrService, private buscarService: BuscarofserviceService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({  // Inicializa el formulario
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
  const orden = this.formulario?.get('of')?.value;
  const destino = this.formulario?.get('destino')?.value;

  if (!orden) {
    this.toastr.error('Debes indicar un número de orden');
    return;
  }

  const destinoFinal = destino || null;

  this.buscarService.buscarOrden(orden, destinoFinal).subscribe(
    respuesta => {
      // Si el backend envía un mensaje, lo mostramos
      if (respuesta.mensaje) {
        // Info o warning según prefieras
        this.toastr.info(respuesta.mensaje, '', {
          timeOut: 8000,
          progressBar: true
        });
      } else if (respuesta.ruta) {
        // Si no hay mensaje pero sí ruta, la mostramos como éxito
        this.toastr.success(`Ruta encontrada:\n${respuesta.ruta}`, '', {
          timeOut: 8000,
          progressBar: true,
          enableHtml: true
        });
      } else {
        // Caso muy raro: ni mensaje ni ruta
        this.toastr.warning('Respuesta inesperada del servidor');
      }
      console.log('Respuesta backend:', respuesta);
    },
    err => {
      // err.error puede ser el mensaje de texto puro que enviamos con res.status(...).send("texto")
      const texto = err.error || 'Error desconocido al buscar la orden';
      this.toastr.error(texto, '', {
        timeOut: 5000,
        progressBar: true
      });
      console.error('Error HTTP:', err);
    }
  );
}
  

}
