import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class LoginComponent {
  
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userSevice: UserService
    ) {
   }

  login(form: NgForm): void {
    const values: { username:string, password: string } = form.value;
    
    this.authService.login(values.username, values.password)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return EMPTY;
        })
      )
      .subscribe((token) => {
        if (token != null && token.token != '') {
          this.userSevice.setLocalValue('jwt', token.token);
          this.userSevice.setLocalValue('username', values.username ?? '');
          this.router.navigateByUrl('home');
          return;
        }
        this.error == 'An unexpected error occured please try again';
      })
  }
}
