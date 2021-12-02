import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {  
    this.user = this.router.getCurrentNavigation()?.extras.state?.user;
    this.password = "*".repeat(this.user.password.length);
  }

  ngOnInit(): void {}

  password: any;
  user: any = {};
  hidden = true;

  showPassword() {
    this.hidden = false;
    this.password = this.user.password;
  }
  hidePassword() {
    this.hidden = true;
    this.password = "*".repeat(this.user.password.length);
  }
}
