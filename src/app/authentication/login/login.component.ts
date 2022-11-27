import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error = '';
  // username = ''; // = new FormControl<string>('');
  usernameComp =  new FormControl<string>('');
  passwordComp =  new FormControl<string>('');
  isUsernameValid: boolean = true;
  // password = ''; // = new FormControl<string>('');
  constructor(
    private authService: AuthService,
    private router: Router
    ) {
   }

  login($event: MouseEvent): void {
    $event.preventDefault();
    
    this.usernameComp.value;
    this.passwordComp.value;
    this.authService.login(this.usernameComp.value, this.passwordComp.value)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return EMPTY;
        })
      )
      .subscribe((token) => {
        localStorage.setItem('jwt', token.token);
        console.log(`The auth token is: ${token.token}`)
        this.router.navigateByUrl('home');
        //TODO: redirect also do the same as register

      })
  }

  ngOnInit(): void {
  }

}
