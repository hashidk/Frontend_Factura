type Pedido = {_id:string, cantidad:number};

export class FacturaF {
    constructor(
        public _id: string,
        public empresa: string,
        public cliente: string,
        public vendedor: string,
        public invoicer_nr: string,
        public subtotal: number,
        public productos: Pedido[],
        public fecha: string,
        public path: string,
        public borrador:boolean,
        public estado:boolean
    ) {
    }

    reset(){
        this._id = ""
        this.empresa = ""
        this.cliente = ""
        this.vendedor = ""
        this.invoicer_nr = ""
        this.subtotal = 0
        this.productos = []
        this.fecha = ""
        this.path = ""
        this.borrador = true,
        this.estado = false
    }
}