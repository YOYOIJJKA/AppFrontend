import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Components/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private auth: AuthService) {}

  /// интерсепторы проверяют при каждом запросе юзера
  canActivate(): boolean {
    return this.auth.checkAuth();
  }
  flagCanActivate(): boolean {
    return this.auth.getFlag();
  }
}
export const AuthGuard: CanActivateFn = (): boolean => {
  return inject(AuthGuardService).canActivate();
};

export const FlagGuard: CanActivateFn = (): boolean => {
  return inject(AuthGuardService).flagCanActivate();
};
