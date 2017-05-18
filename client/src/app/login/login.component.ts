import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userName : string;
  public password : string;

  constructor() { }

  ngOnInit() {
    this.userName = "Toto";
  }

  private  login(){
    alert(this.userName);
  }


}
