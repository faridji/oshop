import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private user: UserService, private auth: AuthService, private route: Router) {
    this.auth.user$.subscribe(user => {
      if (!user) return

      this.user.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return
      
      localStorage.removeItem('returnUrl');
      this.route.navigateByUrl(returnUrl);
    });
  }
}

