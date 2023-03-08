export class ClienteF {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public provincia: string,
        public ciudad: string,
        public dir: string,
        public identificacion: string,
        public usuario: {
            email:string,
            nickname:string
        },
        public activo: boolean,
        public admin_id: string,
    ) {
    }

    reset(){
        this._id= ""
        this.nombre= ""
        this.apellido= ""
        this.provincia= ""
        this.ciudad= ""
        this.dir= ""
        this.identificacion= ""
        this.usuario.email = ""
        this.usuario.nickname = ""
        this.activo= false
        this.admin_id= ""
    }
}