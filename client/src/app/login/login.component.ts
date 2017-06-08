import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username : string;
  public password : string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = "Toto";
  }

  private  login(){
    this.router.navigate(['/user-profile']);
  }

  private  register(){
    this.router.navigate(['/register']);
  }

}
