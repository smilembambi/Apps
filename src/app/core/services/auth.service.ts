import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';

import { User } from '../../features-master/auth/models/auth.models';
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../../features-master/users/models/user.model";
import {HttpClient} from "@angular/common/http";
import {PLATFORM, URL_API} from "../helpers/params/params-api.routes";
import {map} from "rxjs/operators";
import {QueryResultOneDataModel} from "../models/natural-model/query-result.model";

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  url: string = 'auth/';


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  /**
   * Se connecter
   * @param username
   * @param password
   */


  login(username: string, password: string) {
    const origin = PLATFORM;

    return this.http.post<any>(`${URL_API.baseUrl + 'auth/'}login`, {username, password, origin})
      .pipe(map(auth => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (auth.success) {
          localStorage.setItem('currentUser', JSON.stringify(auth));
          this.currentUserSubject.next(auth);
        }
        return auth;
      }));
  }


  /**
   * Se deconnecter
   */
  logout(email) {
    return this.http.post<any>(`${URL_API.baseUrl + 'auth/'}logout`, {email})
      .pipe(map(auth => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.quit();
        return auth;
      }));
  }

  quit() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  /**
   * Update password
   * @param data
   */
  updatePassword(data): Observable<QueryResultOneDataModel> {
    return this.http.put<QueryResultOneDataModel>(URL_API.baseUrl + this.url + 'updatepassword', data);
  }


  loginExpress(res) {
    localStorage.setItem('currentUser', JSON.stringify(res));
    this.currentUserSubject.next(res);
  }

  /**
   * send token
   * @param token
   */
  sendToken(token): Observable<any> {
    return this.http.post<any>(URL_API.baseUrl + 'auth/recaptcha/validate_token', {recaptcha: token});
  }


  /**
   * register account
   * @param email
   */
  sendCodeUpdatePassword(email) {
    let params: any = {};
    params.typeApp = 'Web';
    return this.http.post<any>(`${URL_API.baseUrl + 'auth/'}update-password/`, {email: email}, {params})
      .pipe(map(auth => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return auth;
      }));
  }


  /**
   * check code
   * @param params
   */
  checkCode(params: any) {
    return this.http.post<any>(`${URL_API.baseUrl + 'auth/'}check-code`, {params})
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res;
      }));
  }


  /**
   * init password
   * @param email
   */
  initPassword(email: string) {
    return this.http.post<any>(`${URL_API.baseUrl + 'auth/'}init-password`, {email})
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res;
      }));
  }


  /**
   * forgot password
   * @param email
   */
  forgotPassword(email: string) {
    return this.http.post<any>(`${URL_API.baseUrl + 'auth/'}forgotpassword`, {email})
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res;
      }));
  }

  getPlatform(): string{
    return localStorage.getItem('platform');
  }

  postCrossDomainMessage(link, portal = 'admin') {
    console.log("voula54")
    console.log("LINK",link)
    let postURL: any;
    let iframeId: any;
    if (portal === 'simoder') {
      postURL = window.location.href;
      iframeId = 'simoway-cross';
    }
    console.log("OU ON EST", window.location.href )
    const iframe = document.getElementById(iframeId);
    console.log("IFRAME",iframe);

    if (iframe == null) { return; }

    const iWindow = (iframe as HTMLIFrameElement).contentWindow;
    const storageData = JSON.parse(localStorage.getItem('currentUser'));
    console.log("STORAGE",storageData);
    console.log("PLUS-PLUS");
    setTimeout(function () {
      iWindow.postMessage(JSON.stringify(storageData), link);
    }, 2000);

  }


  /**
   * get token
   * @param token
   */
  getToken(token: string) {
    return this.http.post<any>(`${URL_API.baseUrl + 'auth/'}login_by_token`, {token:token})
      .pipe(map(auth => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (auth.success) {
          localStorage.setItem('currentUser', JSON.stringify(auth));
          this.currentUserSubject.next(auth);
        }
        return auth;
      }));
  }
}

