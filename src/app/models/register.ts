export class Register {
    constructor(
        public _id: string,  //nickname
        public nombre: string,
        public apellido: string,
        public identificacion: string,
        public empresa_nombre: string,
        public empresa_dir: string,
        public empresa_ciudad: string,
        public empresa_privincia: string,
        public empresa_pais: string,
        public firm: string,
        public image: string,
        public password:string,
        public confirm_password:string,
        public email:string
    ) { }

    reset(){
        this._id= ""  //nickname
        this.nombre= ""
        this.apellido= ""
        this.identificacion= ""
        this.empresa_nombre= ""
        this.empresa_dir= ""
        this.empresa_ciudad= ""
        this.empresa_privincia= ""
        this.empresa_pais= ""
        this.firm= ""
        this.image= ""
        this.password = "",
        this.confirm_password = ""
        this.email = ""
    }
}