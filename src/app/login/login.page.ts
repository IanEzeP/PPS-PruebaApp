import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from '../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public mail : string = "";
  public pass : string = "";
  
  public arrayUsers : any = null;
  public arrayFirebase : Array<User> = [];

  constructor(private alertController: AlertController, private router: Router, private firestore: AngularFirestore) 
  { 
    console.log("Inicio extracción de base de datos");

    this.firestore.collection("users").valueChanges().subscribe((next: any) =>
    {
      let result: Array<User> = next;
      console.log(result);
      this.arrayFirebase = [];
      result.forEach((obj : any) => {
        this.arrayFirebase.push(new User(obj.id, obj.email, obj.password, obj.name));
      });
      console.log(this.arrayFirebase);
    })
  }

  ngOnInit() 
  {
    this.mail = "";
    this.pass = "";

    localStorage.setItem("usuariosGuardados", `{"email": "ian.eze21@gmail.com", "password": "zeke0822"}`);

    let resultado : string | null = localStorage.getItem("usuariosGuardados");
    if(resultado !== null)
    {
      this.arrayUsers = JSON.parse(resultado);
    }
  }

  iniciarSesion()
  {
    let exito : boolean = false;

    if(this.mail != "" && this.pass != "" && this.arrayUsers !== null)
    {
      //this.arrayUsers.forEach((usuario : any) => {
        if(this.arrayUsers.email == this.mail && this.arrayUsers.password == this.pass)
        {
          exito = true;
        }
      //});
    }

    if(exito == false)
    {
      this.presentAlert();
    }
    else
    {
      this.router.navigateByUrl('/tabs');
    }
  }

  async presentAlert() 
  {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'No se pudo iniciar sesión, compruebe los datos ingresados',
      buttons: ['Cerrar'],
    });

    await alert.present();
    this.pass = "";
  }
}
