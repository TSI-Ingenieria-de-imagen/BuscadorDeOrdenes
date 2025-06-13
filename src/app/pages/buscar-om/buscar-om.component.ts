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
    private buscarOmService: BuscarofserviceService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario2 = this.fb.group({
      aviso: [''],     // Cambia aquí a 'aviso' para mayor claridad (antes era 'of')
      destino: ['0']
    });
  }

  navegarYMostrarToast(ruta: string) {
    const mensaje = ruta === 'buscar-orden' ? 'Te rediriges al Inicio' : 'Buscando Aviso';
    // this.toastr.success(mensaje);
    this.router.navigate([ruta]);
  }

  buscarOm() {
    const aviso = this.formulario2?.get('aviso')?.value;      // Cambia aquí de 'of' a 'aviso'
    const destino = this.formulario2?.get('destino')?.value;

    if (!aviso) {
      this.toastr.error('Debes indicar un número de aviso');
      return;
    }

    const destinoFinal = destino || null;

    this.buscarOmService.buscarOm(aviso, destinoFinal).subscribe(
      respuesta => {
        if (respuesta.mensaje) {
          this.toastr.info(respuesta.mensaje, '', {
            timeOut: 8000,
            progressBar: true
          });
        } else if (respuesta.ruta) {
          this.toastr.success(`Ruta encontrada:\n${respuesta.ruta}`, '', {
            timeOut: 8000,
            progressBar: true,
            enableHtml: true
          });
        } else {
          this.toastr.warning('Respuesta inesperada del servidor');
        }
        console.log('Respuesta backend:', respuesta);
      },
      err => {
        const texto = err.error || 'Error desconocido al buscar el aviso';
        this.toastr.error(texto, '', {
          timeOut: 5000,
          progressBar: true
        });
        console.error('Error HTTP:', err);
      }
    );
  }
}
