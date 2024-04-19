import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public mail : string = "";
  public pass : string = "";
  
  public arrayUsers : any = null;

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() 
  {
    this.mail = "";
    this.pass = "";

    localStorage.setItem("usuariosGuardados", `{"email": "ian.eze21@gmail.com", "password": "zeke0822"}`);
    //{"email": "okami935@gmail.com", "password": "fire5555"}
    let resultado : string | null = localStorage.getItem("usuariosGuardados");
    if(resultado !== null)
    {
      this.arrayUsers = JSON.parse(resultado);
      console.log(resultado);
      console.log(this.arrayUsers);
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
