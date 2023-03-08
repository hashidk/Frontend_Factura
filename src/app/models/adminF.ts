export class AdminF {
    constructor(
        public _id: string,  //nickname
        public nombre: string,
        public apellido: string,
        public identificacion: string,
        public usuario: {
            email:string,
            nickname:string
        },
        public empresa_nombre: string,
        public empresa_dir: string,
        public empresa_ciudad: string,
        public empresa_provincia: string,
        public empresa_pais: string,
        public firma: string,
        public image: string,
    ) { }

    reset(){
        this._id= ""  //nickname
        this.nombre= ""
        this.apellido= ""
        this.identificacion= ""
        this.usuario.email= ""
        this.usuario.nickname = ""
        this.empresa_nombre= ""
        this.empresa_dir= ""
        this.empresa_ciudad= ""
        this.empresa_provincia= ""
        this.empresa_pais= ""
        this.firma= ""
        this.image= ""
    }
}