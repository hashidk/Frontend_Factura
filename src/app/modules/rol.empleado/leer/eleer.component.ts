//Empleado lee: Cuenta y Cliente

import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EmpleadoService } from '../service/empleado.service';
import { MasterService } from '../../../service/login.service';
import { ClienteF, FacturaF } from '../../../models';
import { Global } from '../../../service/global';
import { fadeIn, fadeOut } from 'src/app/animations/fadeInOut';

@Component({
    selector: 'app-eleer',
    templateUrl: './eleer.component.html',
    providers: [MasterService, EmpleadoService],
    animations: [fadeIn, fadeOut],
})

export class EleerComponent implements OnInit {
    @Input() objR: string;

    public direc = Global.url+"empleado/facturas/"

    public clientes: ClienteF[] = [];
    public facturas: FacturaF[] = [];

    opcion: number = 2;
    public error: string = "";
    public success: string = "";

    constructor(
        private _router: Router,
        private service: MasterService,
        private _EmpleadoService: EmpleadoService
    ) {
        this.objR = ""
        this._EmpleadoService.getClientes().subscribe(resp => {
            this.clientes = resp.data;
        }, err => {
            this._router.navigate(['/login']);
        })

        this._EmpleadoService.getFacturas().subscribe(resp => {
            this.facturas = resp.data;
            this.facturas.map((ele, index) => {
                this.facturas[index].fecha = new Date(ele.fecha).toLocaleString()
            })            
        }, err => {
            this._router.navigate(['/login']);
        })
    }

    ngOnInit(): void {
    }

    getPDF(factura:FacturaF){
        factura._id
    }

}
