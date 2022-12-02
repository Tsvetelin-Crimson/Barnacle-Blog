import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { AuthService } from '../services/auth/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class RegisterComponent implements OnInit {
  error = '';
  // EXAMPLE
  // form = this.fb.group({
  //   username: ['', Validators.required],
  //   email: ['', Validators.required, Validators.email],
  //   password: ['', Validators.required],
  //   repass: ['', Validators.required],
  // });
  // registerForm = this.fb.group({
  //   username: ['', Validators.required],
  //   email: ['', Validators.required, Validators.email],
  //   password: ['', Validators.required],
  //   repass: ['', Validators.required],
  // });
  // // @ViewChild('registerForm', { static: true })
  // // registerForm!: NgForm;
  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  register(form: NgForm) {
    // console.log(this.username, this.email, this.password, this.repass);
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
        localStorage.setItem('jwt', token.token);
        // TODO: make control fields consistent
        localStorage.setItem('username', values.username ?? '');
        // console.log(`The auth token is: ${token.token}`);
        this.router.navigateByUrl('home');
        return;
        }
        this.error == 'An unexpected error occured please try again';
      })
  }
}
