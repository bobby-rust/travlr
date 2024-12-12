import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { TripListingComponent } from '../trip-listing/trip-listing.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TripListingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authenticationService: AuthenticationService) { }
  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}
