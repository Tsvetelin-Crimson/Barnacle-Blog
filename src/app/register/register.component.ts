import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username = new FormControl<string>('');
  password = new FormControl<string>('');
  repass = new FormControl<string>('');
  isUsernameValid: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  register($event: MouseEvent){
    $event.preventDefault();
    console.log(this.username, this.password, this.repass);
  }
}
