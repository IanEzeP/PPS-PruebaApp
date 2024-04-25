import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  usuariosBD: Array<User> = [];

  constructor(private firestore: AngularFirestore) 
  { 
    console.log("Utilizo servicio Database");
    this.getCollectionObservable("users").subscribe((next : any) => 
    {
      let result : Array<any>  = next;
      this.usuariosBD = [];
      
      result.forEach((obj : any) => {
        this.usuariosBD.push(new User(obj.id, obj.email, obj.password, obj.name));
      });
    });
    console.log("Finalizo inicializacion");
  }

  traerUnDocumento(coleccion: string, id: string)
  {
    return this.firestore.firestore.doc(coleccion + '/' + id).get();
  }

  traerDocumentoObservable(coleccion: string, id: string)
  {
    return this.firestore.doc(coleccion + '/' + id).get();
  }

  getCollectionObservable(coleccion : string)
  {
    return this.firestore.collection(coleccion).valueChanges();
  }

  getCollectionPromise(coleccion : string)
  {
    return this.firestore.firestore.collection(coleccion).get();
  }

  /*
  validarDatoGuardado(id : string, coleccion : string)
  {
    const col = this.firestore.firestore.collection(coleccion);
    console.log(id);
    let retorno = col.get().then((next : any) =>
    {
      let result : Array<any> = next;
      let exito : boolean = false;
      result.forEach(obj =>
      {
        if(id == obj.id)
        {
          exito = true;
        }
      });
      return exito;
    });
    return retorno;
  }
  */
}
