export class ProductoF {
    constructor(
        public _id: string,
        public precio: number,
        public descripcion: string,
        public admin_id: string,
    ) { }

    reset(){
        this._id = ""
        this.precio = 0
        this.descripcion = ""
        this.admin_id = ""
    }
}