import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username : string;
  public password : string;
  public firstname : string;
  public lastname : string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  private  cancel(){
    this.router.navigate(['/login']);
  }

  private  createProfile(){
    this.router.navigate(['/user-profile']);
  }

}
