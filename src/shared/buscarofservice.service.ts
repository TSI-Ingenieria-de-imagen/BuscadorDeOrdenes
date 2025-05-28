import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root',
})
export class BuscarofserviceService {
  private url = 'http://localhost:3000'; // URL del servidor

  constructor(private http: HttpClient) {} // Inyecta HttpClient

  buscarOrden(orden: string, destino: string | null): Observable<any> {  //Servicio que busca orden 
    const body = destino ? { destino: destino } : {};
    return this.http.post<any>(`${this.url}/buscar-of/${orden}`, body);
  }

  buscarOm(om: string, destino: string | null): Observable<any> { //Servicio que busca om 
    const body = destino ? { destino: destino } : {};
    return this.http.post<any>(`${this.url}/buscar-om/${om}`, body);
  }

  copiarArchivo() {
    return this.http.post(`${this.url}/copiarArchivo`, {});  //Servicio que copia el txt del origen y lo copia en temp  
  }

  buscarOrdenCv(orden: string, destino: string | null): Observable<any> {  //Servicio que busca orden en Clientes Varios 
    const body = destino ? { destino: destino } : {};
    return this.http.post<any>(`${this.url}/buscar-orden-cv/${orden}`, body);  // Asegúrate de que esta ruta coincida con la que tienes en tu servidor Express
  }
}
