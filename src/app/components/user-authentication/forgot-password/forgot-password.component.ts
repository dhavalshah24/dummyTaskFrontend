import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { UserService } from 'src/app/services/users/user.service';
import { OutputComponent } from '../../shared-components/output/output.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private _userService: UserService, private _sharedDataService: SharedDataService, private _modalService: NgbModal) { }

  ngOnInit(): void {
  }

  forgotPasswordForm = this.fb.group({
    name: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}.[a-zA-Z]{2,}")]],
    password: [null, [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$")]],
    confirmPassword: [null, [Validators.required]]
  },
  {
    validators: this.checkPassword("password", "confirmPassword")
  })

  get email() {
    return this.forgotPasswordForm.get("email")
  }
  get password() {
    return this.forgotPasswordForm.get("password");
  }
  get confirmPassword() {
    return this.forgotPasswordForm.get("confirmPassword");
  }

  getEmailError() {
    if(this.email?.hasError("required")) {
      return "Email is required";
    }
    if(this.email?.hasError("pattern")) {
      return "Email is invalid";
    }
    return null;
  }

  getPasswordError() {
    if(this.password?.hasError("required")) {
      return "Password is required";
    }
    if(this.password?.hasError("minlength")) {
      return "Password should have at least 8 characters"
    }
    if(this.password?.hasError("pattern")) {
      return "Password is invalid"
    }
    return null;
  }

  getConfirmPasswordError() {
    if(this.confirmPassword?.hasError("required")) {
      return "Confirm Password is required";
    }
    if(this.confirmPassword?.hasError("checkPassword")) {
      return "Password does not match";
    }
    return null;
  }

  checkPassword(password: string, confirmPassword: string) {
    
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if(control.value !== matchingControl.value) {
        matchingControl.setErrors({checkPassword: true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  forgotPassword() {
    if(this.email?.valid && this.password?.valid && this.confirmPassword?.valid && this.password.value === this.confirmPassword.value) {
      const { email, password } = this.forgotPasswordForm.value;
      const data = { email, password }
      this._userService.forgotPassword(data).subscribe(
        res => {
          this._sharedDataService.outputMessage = res.message;
          this._modalService.open(OutputComponent, { centered: true });
        }, 
        error => console.log(error)
      )
    } else {
      this._sharedDataService.outputMessage = "Enter valid credentials";
      this._modalService.open(OutputComponent, { centered: true });
    }
  }
}
