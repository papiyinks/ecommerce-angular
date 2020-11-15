import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentToken: Observable<Array<any>>;
  isAuthenticated = false;

  constructor(private cookieService: CookieService, private store: Store) {
  }

  ngOnInit(): void {
    // this.currentToken = this.store.select(store => store.authList.token);
    const user = this.cookieService.get('userId');
    if (user) {
      this.isAuthenticated = true;
    }
  }

  onLogout() {
    this.cookieService.delete('token');
    this.cookieService.delete('userId');
  }
}
