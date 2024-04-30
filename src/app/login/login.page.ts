import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public mail: string = "";
  public pass: string = "";
  
  public arrayFirebase: Array<User> = [];
  public arrayTestUsers: Array<User> = [];

  public cargaFin: boolean = false;

  private obsDatabase: Subscription = Subscription.EMPTY;

  constructor(private alert: AlertService, private router: Router,
    private data: DatabaseService, private auth: AuthService) 
  { 
    console.log("Entro en Login");
  }

  ngOnInit() 
  {
    this.mail = "";
    this.pass = "";
    
    this.obsDatabase = this.data.getCollectionObservable('users').subscribe((next: any) =>
    {
      let result: Array<any> = next;
      this.arrayFirebase = [];

      result.forEach((obj: any) => {
        this.arrayFirebase.push(new User(obj.id, obj.email, obj.password, obj.name, obj.rol));
      });
      
      this.arrayFirebase.forEach(user => {
      if(user.id == "rA5GqEnhZWCChVDfWNC6" || user.id == "ul0i7tVOM3QN9dJKJfy3" || user.id == "2Jv5NFfrAVKoCyczu8aG")
      {
        this.arrayTestUsers.push(user);
      }

      this.cargaFin = true;
      console.log("Carga Fin");
    });
    });
  }

  async iniciarSesion()
  {
    let user: any = null;

    if(this.mail != "" && this.pass != "")
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
        this.auth.userName = user.userName;
        this.alert.successToast("Sesión iniciada correctamente"); //El toast de Ionic no tapa el header ni el footer, vamos a tener que usar ese.
        this.obsDatabase.unsubscribe();
        this.router.navigateByUrl('/tabs');
      }
      ).catch(() => {
        this.auth.logOut();
        this.alert.sweetAlert('Error', 'No fue posible iniciar sesión, compruebe los datos ingresados', 'error');
        this.pass = '';
      });
    }
    else
    {
      this.alert.sweetAlert('Error', 'Debe llenar los campos para iniciar sesión', 'error');
    }
  }

  onQuickUser(user: any) 
  {
    this.mail = user.target.value.mail;
    this.pass = user.target.value.password;
  }
}
