import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

import * as authActions from '../store/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      resData => {
        this.isLoading = false;
        this.cookieService.set('token', resData.idToken);
        this.cookieService.set('userId', resData.localId);
        this.store.dispatch(new authActions.AuthToken(resData.idToken));
        this.store.dispatch(new authActions.AuthUserId(resData.localId));
        this.router.navigate(['/products']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

}
