import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Auth } from '../../models/auth.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlBase = environment.aguapenApi;
  private readonly http = inject(HttpClient);

  login(auth: Auth): Observable<Auth> {
    const url = `${this.apiUrlBase}login`;
    return this.http.post<Auth>(url, auth);
  }
}
