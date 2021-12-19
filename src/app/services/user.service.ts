import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Vehicle } from '../interfaces/vehicle';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.user = this.userSubject.asObservable();
    if (localStorage.getItem('currentUser')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  public isLoggedIn: boolean = false;
  private registerURL: string = 'http://localhost:3000/api/register';
  private loginURL: string = 'http://localhost:3000/api/login';
  public currentVehicle?: Vehicle;
  private cartURL: string = '';
  private getCartURL: string = '';
  private updateCartURL: string = '';

  public get userValue(): User | null {
    return this.userSubject.value;
  }

  register(user: User): Observable<User> {
    const uri: string = this.registerURL;

    return this.http.post<User>(uri, user).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        this.isLoggedIn = true;
        this.router.navigate(['/vehicles']);
        return user;
      })
    );
  }

  login(user: User): Observable<User> {
    const uri: string = this.loginURL;

    return this.http.post<User>(uri, user).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        this.isLoggedIn = true;
        this.router.navigate(['/vehicles']);
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    console.log('You have been logged out');
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    this.isLoggedIn = false;
  }

  addToCart(vehicle: Vehicle) {
    this.currentVehicle = vehicle;
    console.log(this.currentVehicle);
    console.log(this.userSubject.value);
    this.cartURL = `http://localhost:3000/api/${this.userSubject.value?._id}/addcart`;
    this.http
      .patch<any>(this.cartURL, { cart: [{ ...this.currentVehicle }] })
      .subscribe(
        (val) => {
          console.log('PATCH call successful value returned in body', val);
        },
        (response) => {
          console.log('PATCH call in error', response);
        },
        () => {
          console.log('The PATCH observable is now completed.');
        }
      );
  }

  getCart(): Observable<Vehicle[]> {
    this.getCartURL = `http://localhost:3000/api/${this.userSubject.value?._id}/cart`;
    return this.http
      .get<Vehicle[]>(this.getCartURL)
      .pipe(catchError(this.handleError));
  }

  updateCart(cart: Vehicle[]) {
    console.log('hi there');
    this.updateCartURL = `http://localhost:3000/api/${this.userSubject.value?._id}/updatecart`;
    this.http
      .put<any>(this.updateCartURL, { cart: cart })
      .subscribe((response) => console.log(response));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
