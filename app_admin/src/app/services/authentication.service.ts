import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE)
    private storage: Storage,
    private tripDataService: TripDataService,
    private router: Router,
  ) { }

  public getToken(): string | null {
    return this.storage.getItem('travlr-token') || null;
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public async login(user: User): Promise<AuthResponse> {
    const res = await this.tripDataService.login(user).then((res) => {
      console.log(res);
      return res;
    });
    res.token && this.saveToken(res.token);
    return res;
  }

  public async register(user: User): Promise<AuthResponse> {
    const res = await this.tripDataService.register(user);
    res.token && this.saveToken(res.token);
    return res;
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.router.navigateByUrl('/login');
  }

  public isLoggedIn(): boolean {
    const token: string | null = this.getToken();
    if (token && token !== 'undefined') {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isLoggedIn = payload.exp > Date.now() / 1000;
      return isLoggedIn;
    } else {
      return false;
    }
  }
  public getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const token: string | null = this.getToken();
      if (!token) return null;
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }

    return null;
  }
}
