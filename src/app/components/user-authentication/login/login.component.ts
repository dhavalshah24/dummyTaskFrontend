import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutputComponent } from '../../shared-components/output/output.component';
import { SharedDataService } from '../../../services/shared-data/shared-data.service';
import { UserService } from 'src/app/services/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _modalService: NgbModal, private router: Router, private _userService: UserService, private fb: FormBuilder, private _sharedDataService: SharedDataService) { }
  ngOnInit(): void {
  }
  loginMessage = "";
  user = {}

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}.[a-zA-Z]{2,}")]],
    password: ["", [Validators.required]],
  })

  get email() {
    return this.loginForm.get("email")
  }
  get password() {
    return this.loginForm.get("password");
  }

  getEmailError() {
    if (this.email?.hasError("required")) {
      return "Email is required";
    }
    if (this.email?.hasError("pattern")) {
      return "Email is invalid";
    }
    return null;
  }

  getPasswordError() {
    if (this.password?.hasError("required")) {
      return "Password is required";
    }
    return null;
  }

  login() {
    if(this.email?.valid && this.password?.valid) {
      const { email, password } = this.loginForm.value;
      const data = { email, password };
      this._userService.login(data).subscribe(
        res => {
          this._sharedDataService.outputMessage = res.message;
          // this._modalService.open(OutputComponent, { centered: true });
          if(res.success) {
            this.user = res.user;
            this.router.navigate(["/home"], {state: {user: this.user}});
          }
        },
        error => console.log(error)
      )
    }
    else {
      this._sharedDataService.outputMessage = "Enter valid credentials";
      this._modalService.open(OutputComponent, { centered: true });
    }
  }
}
