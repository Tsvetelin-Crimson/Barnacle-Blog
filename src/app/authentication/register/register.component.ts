import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class RegisterComponent {
  
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
    ) { }
  register(form: NgForm) {
    const values: { username:string, email: string, password:string, repass: string } = form.value;

    this.authService.register(values.username, values.email, values.password, values.repass)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return EMPTY
        })
      )
      .subscribe(token => {
        if (token != null && token.token != '') {
          this.userService.setLocalValue('jwt', token.token);
          this.userService.setLocalValue('username', values.username ?? '');
          this.router.navigateByUrl('home');
          return;
        }

        this.error == 'An unexpected error occured please try again';
      })
  }
}
