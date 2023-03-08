import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MasterService {
    public url:string;
    constructor(
        private _http:HttpClient,
    ){
        this.url=Global.url;
    }
    GetAllInvoice() {
        return this._http.get("http://localhost:8080/api/empleado/info");
    }
    login(credentias:any):Observable<any>{
        let params=JSON.stringify(credentias);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'login',params,{headers:headers, withCredentials: true});
    }

    register(form:any){
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.onreadystatechange=function(){
                if(request.readyState==4){
                    if(request.status==200){
                        resolve(JSON.parse(request.response));
                    }else{
                        reject(request.response);
                    }
                }
            }
            request.open("POST", this.url+'register');
            request.send(new FormData(form));
        })
    }

    logout():Observable<any>{
        localStorage.removeItem("rol");
        window.location.reload();
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'logout',{},{headers:headers, withCredentials: true});
    }
}