export class User {

    id: string = '';
    mail: string = '';
    password: string = '';
    userName: string = '';
    rol: string = '';

    constructor(id: string, mail: string, password: string, userName: string, rol: string)
    {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.userName = userName;
        this.rol = rol;
    }

    static initialize() : User
    {
        return new User('','','','','');
    }

    //Para las aplicaciones del parcial, los usuarios no tienen nombre de usuario, solo rol.
}
