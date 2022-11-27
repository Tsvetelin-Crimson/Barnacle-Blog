import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  error = '';
  username = new FormControl<string>('');
  email = new FormControl<string>('');
  password = new FormControl<string>('');
  repass = new FormControl<string>('');

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  register($event: MouseEvent){
    $event.preventDefault();
    console.log(this.username, this.email, this.password, this.repass);
    
    this.authService.register(this.username.value, this.email.value, this.password.value, this.repass.value)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return EMPTY
        })
      )
      .subscribe(token => {
        if (token != null && token.token != '') {
        localStorage.setItem('jwt', token.token);
        console.log(`The auth token is: ${token.token}`);
        this.router.navigateByUrl('home');
        return;
        }
        this.error == 'An unexpected error occured please try again';
      })
  }
}
