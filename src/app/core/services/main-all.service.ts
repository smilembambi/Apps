import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {QueryResultDataModel, QueryResultOneDataModel} from "../models/natural-model/query-result.model";
import {URL_API} from "../helpers/params/params-api.routes";

@Injectable({
  providedIn: 'root'
})
export class MainAllService {
  constructor(private http: HttpClient,) { }

  /**
   * find
   * @param params
   * @param url
   */
  find(params: any, url: string): Observable<QueryResultDataModel> {
    return this.http.post<QueryResultDataModel>(URL_API.baseUrl+url+"/find", params);
  }


  /**
   * get all
   */
  getAll(params:any={}, url: string): Observable<QueryResultDataModel> {
    params['status[ne]'] = "Supprimer";
    return this.http.get<QueryResultDataModel>(URL_API.baseUrl+url, { params});
  }




  /**
   * cerate
   * @param _object
   * @param url
   * @param params
   */
  create(_object: any, url: string, params={}): Observable<QueryResultOneDataModel> {
    return this.http.post<QueryResultOneDataModel>(URL_API.baseUrl+url, _object,{params});
  }


  /**
   * Modification path
   * @param _object
   * @param url
   */
  update(_object: any, url: string): Observable<QueryResultOneDataModel> {
    return this.http.put<QueryResultOneDataModel>(URL_API.baseUrl+url +'/'+ _object._id, _object);
  }

  /**
   * Suppression path
   * @param id
   * @param url
   */
  delete(id: string, url: string): Observable<QueryResultOneDataModel> {
    return this.http.delete<QueryResultOneDataModel>(URL_API.baseUrl+url+"/"+ id);
  }


  /**
   * Obtenir un path
   * @param id
   * @param url
   */
  getOne(id: string, url: string): Observable<QueryResultOneDataModel> {
    return this.http.get<QueryResultOneDataModel>(URL_API.baseUrl+url+"/" + id);
  }

}
