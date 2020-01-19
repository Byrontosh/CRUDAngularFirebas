import { Component, OnInit } from '@angular/core';
import { ConsumofirebaseService } from 'src/app/service/consumofirebase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit {
  // CERAR UN ARREGLO 
  public autos: any = [];
 // PARA LA PARTE DE AGREGAR Y ACTUALIZAR UN AUTO 
  public documentId = null;
  public currentStatus = 1;
  public newAutoForm = new FormGroup({
    marcaF: new FormControl('', Validators.required),
    modeloF: new FormControl('', Validators.required),
    anioF: new FormControl('', Validators.required),
    urlF: new FormControl('', Validators.required),
    idF: new FormControl('')
  });
  // CREAR UNA VARIABLE DENTRO DEL CONSTRUCTOR
  constructor(private fs: ConsumofirebaseService) 
  {
    this.newAutoForm.setValue({
      idF: '',
      marcaF: '',
      modeloF: '',
      anioF: '',
      urlF: ''
    });
   }


  ngOnInit() {
    // INICIALIZAR EL METODO CREADO
    this.obtenerAutos();
  }

  // CREAR UN METODO PARA OBTENER TODOS LOS AUTOS 
  public obtenerAutos() {
    this.fs.ObtenerAutos().subscribe((dataDocumentos) => {
      dataDocumentos.forEach((data: any) => {
        this.autos.push({
          id: data.payload.doc.id,
          data: data.payload.doc.data()
        });
        console.log(this.autos);
      })
    });
  }


  //METODO PARA ACTUALIZAR Y AGREGAR UN NUEVO AUTO 
  public nuevoAuto(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {
      let data = {
        marca: form.marcaF,
        modelo: form.modeloF,
        anio: form.anioF,
        url: form.urlF
      }
      this.fs.crearAuto(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newAutoForm.setValue({
          marcaF: '',
          modeloF: '',
          anioF: '',
          urlF: '',
          idF: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        marca: form.marcaF,
        modelo: form.modeloF,
        anio: form.anioF,
        url: form.urlF
      }
      this.fs.actualizarAuto(documentId, data).then(() => {
        this.newAutoForm.setValue({
          marcaF: '',
          modeloF: '',
          anioF: '',
          urlF: '',
          idF: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }


  // METODO PARA CARGAR LOS DATOS EN LOS CAMPOS DEL FORMULARIO 
  // POSTERIOR A ELLO REALIZAR EL ACTUALIZAR
  public actualizarAuto(documentId) {
    let editSubscribe = this.fs.obtenerAutoId(documentId).subscribe((data) => {
      this.currentStatus = 2;
      this.documentId = documentId;
      this.newAutoForm.setValue({
        idF: documentId,
        marcaF: data.payload.data()['marca'],
        modeloF: data.payload.data()['modelo'],
        anioF: data.payload.data()['anio'],
        urlF: data.payload.data()['url']
      });
      editSubscribe.unsubscribe();
    });
  }

  //ELIMINAR AUTO
  public eliminarAuto(documentId) {
    this.fs.eliminarAuto(documentId).then(() => {
      console.log('Documento eliminado!');
    }, (error) => {
      console.error(error);
    });
  }



}
