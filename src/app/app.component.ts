import { Component } from '@angular/core';
import { ConsumorestService } from './service/consumorest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //Se procede a crear un arreglo vacío
  categoria:any = [];

  // se procede a llamar el servicio en el Constructor de la clase 
  constructor(public rest:ConsumorestService){}

  // Para llamar al metodo y que se cargue 
  // componente el momento que se cargue la pagina 
  ngOnInit() {
    this.getCategorias();
  }

  //metodo para obtener las categorias del servicio 
  getCategorias()
  {

    this.categoria = [];
    this.rest.getCategoriasRest().subscribe(data=> {
      console.log(data);
      this.categoria = data;
    });
  }

  
}
