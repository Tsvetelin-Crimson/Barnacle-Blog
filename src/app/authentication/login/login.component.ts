import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'host-element'
  }
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
        this.router.navigateByUrl('home');
        return;
      })
  }

  ngOnInit(): void {
  }

}
