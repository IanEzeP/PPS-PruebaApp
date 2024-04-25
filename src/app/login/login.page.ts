import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public mail : string = "";
  public pass : string = "";
  
  public arrayFirebase : Array<User> = [];

  constructor(private alert: AlertService, private router: Router,
    private data: DatabaseService, private auth: AuthService) 
  { 
    console.log("Entro en Login");
  }

  ngOnInit() 
  {
    this.mail = "";
    this.pass = "";
    this.arrayFirebase = this.data.usuariosBD;
  }

  async iniciarSesion()
  {
    let user : any = null;

    this.arrayFirebase = this.data.usuariosBD;

    if(this.mail != "" && this.pass != "" && this.arrayFirebase.length > 0)
    {
      this.arrayFirebase.forEach((usuario : any) => 
      {
        if(usuario.mail == this.mail && usuario.password == this.pass)
        {
          user = usuario;
        }
      });
      await this.auth.logIn(this.mail, this.pass).then(res =>
      {
        //if(res!.user.emailVerified == true) { }
        this.auth.email = res!.user.email || '';
        this.auth.userName = user.name;
        this.alert.successToast("Sesión iniciada correctamente"); //Toast exito
        this.router.navigateByUrl('/tabs');
      }
      ).catch(() => {
        this.auth.logOut();
        this.alert.sweetAlert('Error', 'No fue posible iniciar sesión, compruebe los datos ingresados', 'error');
      });
    }
    else
    {
      this.alert.sweetAlert('Error', 'Debe llenar los campos para iniciar sesión', 'error');
    }
  }
}
