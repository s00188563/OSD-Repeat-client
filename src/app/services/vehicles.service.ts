import { Injectable } from '@angular/core';
import { Vehicle } from 'src/app/interfaces/vehicle';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  page: number = 1;
  category: string = '';
  sort: string = '';
  search: string = '';

  public dataUri = `http://localhost:3000/api/vehicles?limit=${this.page * 8}
  &${this.category}&${this.sort}&title[regex]=${this.search}`;

  private currentVehicle = new BehaviorSubject<Vehicle | null>(null);
  constructor(private http: HttpClient) {}
  getVehicles(): Observable<Vehicle[]> {
    console.log(this.dataUri);
    return this.http
      .get<Vehicle[]>(this.dataUri)
      .pipe(catchError(this.handleError));
  }
  doSearch(term: any): Observable<Vehicle[]> {
    this.category = term.category;
    this.search = term.search;
    this.sort = term.sort;
    console.log(this.sort);
    this.dataUri = `http://localhost:3000/api/vehicles?limit=${this.page} * 8
    &${this.category}&${this.sort}&title[regex]=${this.search}`;
    console.log(this.dataUri);
    return this.http
      .get<Vehicle[]>(this.dataUri)
      .pipe(catchError(this.handleError));
  }
  doLoadMore(): Observable<Vehicle[]> {
    this.page += 1;
    console.log(this.page);
    this.dataUri = `http://localhost:3000/api/vehicles?limit=${this.page * 8}
    &${this.category}&${this.sort}&title[regex]=${this.search}`;
    console.log(this.dataUri);
    return this.http
      .get<Vehicle[]>(this.dataUri)
      .pipe(catchError(this.handleError));
  }
  setCurrentVehicle(vehicle: Vehicle) {
    this.currentVehicle.next(vehicle);
  }
  getCurrentVehicle(): Observable<Vehicle | null> {
    return this.currentVehicle.asObservable();
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
