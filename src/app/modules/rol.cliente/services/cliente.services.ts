import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "../../../service/global";
import { Observable } from 'rxjs';

@Injectable()
export class ClienteService {
    public url:string;
    private _headers: HttpHeaders;

    constructor(
        private _http:HttpClient,
    ){
        this.url=Global.url+"cliente/";
        this._headers = new HttpHeaders().set('Content-Type','application/json');
    }

    getInfo():Observable<any>{
        return this._http.get(this.url+'info', {headers:this._headers, withCredentials: true});
    }

    getMisFacturas():Observable<any>{
        return this._http.get(this.url+'facturas', {headers:this._headers, withCredentials: true});
    }

}