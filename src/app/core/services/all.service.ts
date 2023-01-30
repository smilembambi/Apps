import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs';
import {QueryResultDataModel} from "../models/natural-model/query-result.model";
import {URL_API} from "../helpers/params/params-api.routes";



@Injectable({
  providedIn: 'root'
})
export class AllService {


  constructor(private http: HttpClient) { }

  /**
   * get all
   */
  getAll(params:any={}, url: string): Observable<QueryResultDataModel> {
    params['status[ne]'] = "Supprimer";
    return this.http.get<QueryResultDataModel>(URL_API.baseUrl+url, { params});
  }

  getFile(url: String): Observable<HttpResponse<Blob>> {
    return this.http.get(`${url}`, {responseType: 'blob', observe: 'response'});
  }

  export(url) {
    return this.http.get(url,
      {responseType: 'blob'});
  }
}
