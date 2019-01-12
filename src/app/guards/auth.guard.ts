import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private Auth: AuthService, private Router: Router){ }

  canActivate(){
      if (!this.Auth.isAuthenticated()) {
        this.Router.navigate(['']);
        return false;
      }
      return true;
  }
}
