import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class isAuthService {
    private subject = new Subject<any>();

    constructor() {
    }

    setAuth(auth: boolean, rol:string) {
        this.subject.next({ isAuth: auth, rol: rol });
    }

    clearAuth() {
        this.subject.next({ isAth: false, rol: ""});
    }

    getAuth(): Observable<any> {
        return this.subject.asObservable();
    }
}