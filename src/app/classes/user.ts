export class User {

    id: string = '';
    mail: string = '';
    password: string = '';
    userName: string = '';

    constructor(id: string, mail: string, password: string, userName: string)
    {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.userName = userName;
    }

    initialize()
    {
        this.id = '';
        this.mail = '';
        this.password = '';
        this.userName = '';
    }
}
