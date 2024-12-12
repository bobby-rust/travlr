import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterLink],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.isLoggedIn();
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public login(): void {
    this.router.navigateByUrl('/login');
  }

  public onLogout(): void {
    return this.authenticationService.logout();
  }

  ngOnInit(): void { }
}
