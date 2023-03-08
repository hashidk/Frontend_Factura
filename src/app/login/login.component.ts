import { Component, OnInit } from '@angular/core';
import { EmpleadoB } from '../models/empleado';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../service/login.service';
import { Login } from '../models/login';
import { isAuthService } from '../service/isAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MasterService, isAuthService]
})
export class LoginComponent implements OnInit {
  public login: Login;
  public error: string

  constructor(
    private _router: Router,
    private _service: MasterService,
    private _isAuthService: isAuthService
  ) {
    this.login = new Login('', '', ''),
      this.error = "";
  }
  ngOnInit(): void {
  }

  delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  onSubmit(formEl: NgForm) {
    this.delete_cookie("access_token");
    this._service.login({
      nickname: formEl.value.nickname,
      password: formEl.value.password,
      rol: formEl.value.rol
    }).subscribe(
      resp => {
        this.error = "";
        localStorage.setItem("rol", resp.rol)
        window.location.reload();
        this._router.navigate(['/sistema']);

        // switch (resp.rol) {
        //   case "cliente":
        //     this._router.navigate(['/cliente']);
        //     break;
        //   case "empleado":
        //     this._router.navigate(['/empleado']);
        //     break;
        //   case "administrador":
        //     this._router.navigate(['/admin']);
        //     break;
        //   default:
        //     break;
        // }
      }, err => {
        this.error = err.error.message;
      }
    )
  }
}
