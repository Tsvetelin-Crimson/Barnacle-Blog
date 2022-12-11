import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';
import { IUser } from '../../common/services/models/IUser';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
  host: {
    class: 'host-element'
  }
})
export class AdminPanelComponent implements OnInit {
  
  users$?: Observable<IUser[]>;
  error = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.users$ = this.userService
      .getAllUsers();
  }

  banUser(userId: string) {
    this.userService.banUser(userId)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return of(null);
        })
      )
      .subscribe(changedUser => {
        if (changedUser !== null) {
          this.userService.userChanged(changedUser);
        }
      });
  }

  unbanUser(userId: string) {
    this.userService.unbanUser(userId)
      .pipe(
        catchError(err => {
          this.error = err.error.error;
          return of(null);
        })
      )
      .subscribe(changedUser => {
        if (changedUser !== null) {
          this.userService.userChanged(changedUser);
        }
      });
  }
}
