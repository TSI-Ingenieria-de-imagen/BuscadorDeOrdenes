import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuscarofserviceService } from 'src/shared/buscarofservice.service';
import { Subscription } from 'rxjs';  
import { ToastrService } from 'ngx-toastr';

interface RespuestaServidor {
  mensaje: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {  // Implementa OnInit y OnDestroy
  title = 'Buscador de OF Y OM TSI';
  private subscription!: Subscription;  // Declara una propiedad para almacenar la suscripción

  constructor(private buscarofserviceService: BuscarofserviceService , private toastr: ToastrService ) { }  // Inyecta tu servicio

  ngOnInit(): void {
    setTimeout(() => {  
      this.subscription = this.buscarofserviceService.copiarArchivo().subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);  
          this.toastr.success('Respuesta del servidor: ' + response.mensaje);  
        },
        error => {
          console.error('Error al copiar el archivo:', error);  
          this.toastr.error('Error al copiar el archivo: ' + error.message);  
        }
      );
    }, 1000);
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {  // Verifica si la suscripción existe
      this.subscription.unsubscribe();  // Desuscríbete de la suscripción
    }
  }
}


// En este código:

// Importamos OnDestroy de @angular/core junto con OnInit.
// Implementamos la interfaz OnDestroy junto con OnInit en la clase AppComponent.
// Declaramos una propiedad privada subscription de tipo Subscription.
// Asignamos la suscripción al método copiarArchivo a la propiedad subscription.
// Creamos el método ngOnDestroy y dentro de este método, verificamos si la propiedad subscription tiene un valor. Si es así, llamamos al método unsubscribe en la propiedad subscription para desuscribirnos del observable.
// Este código asegura que te desuscribas del observable cuando el componente se destruye, lo que puede ayudar a evitar fugas de memoria y otros comportamientos inesperados.





