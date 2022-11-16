import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = ''; // = new FormControl<string>('');
  usernameComp =  new FormControl<string>('');
  passwordComp =  new FormControl<string>('');
  //fullForm = new FormGroup('');
  isUsernameValid: boolean = true;
  password = ''; // = new FormControl<string>('');
  constructor() {

   }

  login($event: MouseEvent): void {
    $event.preventDefault();
    console.log(this.username, this.password);
    this.username = "Wrong";
    this.password = "Fool"
    console.log(this.username, this.password);
  }

  ngOnInit(): void {
  }

}
