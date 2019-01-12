import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LandingpageGuard implements CanActivate {

  constructor(private Auth: AuthService, private Router: Router){ }

  canActivate(){
    if (this.Auth.isAuthenticated()) {
      this.Router.navigate(['/home/treats']);
      return false;
    }
    return true;
}
}
