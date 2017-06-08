import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private  addMovie(){
    alert("Film was added to your collection");
  }

}
