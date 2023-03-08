export class EmpleadoF {
    constructor(
        public _id: string,
        public nombre: string,
        public apellido: string,
        public identificacion: string,
        public usuario: {
            email:string,
            nickname:string
        },
        public admin_id: string,
        public activo: boolean
    ) {
    }

    reset(){
        this._id= ""
        this.nombre= ""
        this.apellido= ""
        this.identificacion= ""
        this.usuario.email= ""
        this.usuario.nickname = ""
        this.activo= false
        this.admin_id= ""
    }
}