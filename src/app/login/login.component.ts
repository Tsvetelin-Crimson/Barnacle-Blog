import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username?: string;
  //fullForm = new FormGroup('');
  password?: string;
  constructor() {

   }

  login($event: MouseEvent): void {
    $event.preventDefault();
    console.log(this.username, this.password);
    
  }

  ngOnInit(): void {
  }

}
