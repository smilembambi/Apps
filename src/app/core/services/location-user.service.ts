import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {CountryLocaleModel} from '../models/natural-model/country-locale.model';


@Injectable({
    providedIn: 'root'
})
export class LocationUserService {

    constructor(private http: HttpClient) {
    }

    getIpAddress() {
        return this.http
            .get('https://api.ipify.org/?format=json')
            .pipe(
                catchError(this.handleError)
            );
    }

    getGEOLocation(ip): Observable<CountryLocaleModel> {

        // Update your api key to get from https://ipgeolocation.io
        let url = "https://api.ipgeolocation.io/ipgeo?apiKey=ac2cda824bf346a8be34f335ae97ea59&ip=" + ip;
        return this.http
            .get<CountryLocaleModel>(url)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }


    getCoordinates(city: string) {
      const apiKey = 'YOUR_API_KEY';
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
      return this.http.get(url);
    }


}
