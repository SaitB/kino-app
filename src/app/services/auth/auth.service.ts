import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interface/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 key = 'AIzaSyD7lh5Gq8sWlTdBKmtMWAskUjAsDFoOHV4';

constructor(private _http: HttpClient) { }

public login(user: IUser) {
  user.returnSecureToken = true;
  return this._http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.key}`, user).pipe(
  );
}

public setToLocalStorage(item: any) {
  return localStorage.setItem('is-online', item.registered);
}

public getToLocalStorage() {
  return localStorage.getItem('is-online');
}

}
