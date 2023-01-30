import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {QueryResultUser, QueryResultUsers, UserModel} from '../models/user.model';
import {AuthenticationService} from "../../../core/services/auth.service";
import {URL_API} from "../../../core/helpers/params/params-api.routes";



@Injectable({providedIn: 'root'})
export class UserService {

  url = 'user';

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
  }


  /**
   * GetAll
   */
  getAll(params:any = {}): Observable<QueryResultUsers> {
    return this.http.get<QueryResultUsers>(URL_API.baseUrl + this.url, {params});
  }


  /**
   * Create
   * @param _user
   */
  create(_user: UserModel): Observable<QueryResultUser> {
    return this.http.post<QueryResultUser>(URL_API.baseUrl + this.url, _user);
  }

  /**
   * reset
   * @param _email
   */
  resetPassword(_email: string): Observable<QueryResultUser> {
    return this.http.post<QueryResultUser>(URL_API.baseUrl + this.url + '/reset-password', {email:_email});
  }



  /**
   * Update
   * @param _user
   */
  update(_user: UserModel): Observable<QueryResultUser> {
    return this.http.put<QueryResultUser>(URL_API.baseUrl + this.url + '/' + _user._id, _user);
  }


  /**
   * Upload image
   * @param _user
   * @param _file
   * @param origin
   */
  upload(_user: UserModel, _file,origin): Observable<QueryResultUser> {
    return this.http.put<QueryResultUser>(URL_API.baseUrl + this.url + '/'+origin+'/' + _user._id, _file);
  }


  register(user: UserModel) {
    return this.http.post(this.url + `/register`, user);
  }

  delete(id: string) {
    return this.http.delete(URL_API.baseUrl +this.url + `/${id}`);
  }

  getUserConnected() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(currentUser == null){
      this.authenticationService.quit();
     // window.location.reload();
      return;
    }

     return currentUser;
  }

  getRole() {
    let dataUser = this.getUserConnected();
    return dataUser.data['role'];
  }




  getUser(): UserModel {
    let dataUser = this.getUserConnected();
    return dataUser?.data;
  }

  getDataDisplay() {
    let dataUser = this.getUserConnected();
    let role = dataUser.data['role'];
    let userInfo = "";

    if (role == "OperatorAdmin") {
      role = "Operateur Admin";
      userInfo = dataUser.data['name'];
    } else {
      userInfo = dataUser.data['name'] + " " + dataUser.data['lastname'];
    }

    return {
      role: role,
      userInfo: userInfo
    }
  }

  getId(): string {
    let dataUser = this.getUserConnected();
    if(dataUser){
      return dataUser.data['_id'];
    }
    return "";
  }

  /**
   * Obtenir un user
   * @param _id
   */
  getOne(_id: string): Observable<QueryResultUser> {
    return this.http.get<QueryResultUser>(URL_API.baseUrl+this.url+"/" + _id);
  }

  /**
   * Check email
   * @param email
   */
  checkEmail(email: string): Observable<QueryResultUser> {
    return this.http.post<QueryResultUser>(URL_API.baseUrl + this.url+'/checkEmail', {email: email});
  }

  setUserLocalStorage(user: UserModel){
    let currentUser = this.getUserConnected();
    currentUser.data = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }


  /**
   * Create
   * @param _user
   */
  edit(_user: UserModel): Observable<QueryResultUser> {
    return this.http.post<QueryResultUser>(URL_API.baseUrl + this.url, _user);
  }
}
