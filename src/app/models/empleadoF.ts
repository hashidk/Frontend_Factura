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
        public activo: boolean,
        public empresa_nombre?: string,
        public empresa_dir?: string,
        public empresa_ciudad?: string,
        public empresa_provincia?: string,
        public empresa_pais?: string,
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