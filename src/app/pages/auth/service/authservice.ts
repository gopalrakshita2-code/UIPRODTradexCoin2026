import { Apiservice } from '@/service/apiservice';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
      user?: any;
      token?: string;
  };
}
export interface ResetPasswordPayload {
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})

export class Authservice {
  constructor(private apiService: Apiservice) {}

  register(payload: RegisterPayload): Observable<AuthResponse> {
      return this.apiService.post<AuthResponse>('auth/register', payload);
  }

  login(payload: LoginPayload): Observable<AuthResponse> {
      return this.apiService.post<AuthResponse>('auth/login', payload);
  }
  
      resetPassword(payload: ResetPasswordPayload): Observable<AuthResponse> {
      return this.apiService.post<AuthResponse>('auth/reset-password', payload);
    }

}


  
