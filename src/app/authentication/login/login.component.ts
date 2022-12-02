import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
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

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
   }

  login(form: NgForm): void {

    const values: { username:string, password: string } = form.value;
    // console.log(values.username);
    // console.log(values.password);
    
    this.authService.login(values.username, values.password)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return EMPTY;
        })
      )
      .subscribe((token) => {
        localStorage.setItem('jwt', token.token);
        localStorage.setItem('username', values.username ?? '');
        console.log(`The auth token is: ${token.token}`);
        this.router.navigateByUrl('home');
        //TODO: redirect also do the same as register

      })
  }

  ngOnInit(): void {
  }

}
