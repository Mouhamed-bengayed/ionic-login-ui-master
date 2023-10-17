import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthTestService {
  private signupUrl = 'http://localhost:8081/api/auth/signup/user';
  private signupUrl1 = 'http://localhost:8081/api/auth/signIn';
  isconn: any = false;

  private user: any;
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  private userDataSubject = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient, private router: Router) { }

 
   setUserData(userData: any) {
     this.userDataSubject.next(userData);
   }
 
   getUserData(): Observable<any> {
     return this.userDataSubject.asObservable();
   }
   
 
   setCurrentUser(user: any) {
     this.currentUserSubject.next(user);
   }
 
   getCurrentUser(): Observable<any> {
     return this.currentUserSubject.asObservable();
   }
 
   clearCurrentUser() {
     this.currentUserSubject.next(null);
   }
 
   login(email: string, password: string, rememberMe: boolean): Observable<any> {
     if(email==="admin@gmail.com"&&password==="med123"){
       this.router.navigate(['/admin/admindashboard'])
     }
     return this.http.post<any>(this.signupUrl1, { email, password }).pipe(
       tap((response) => {
         this.isconn=true;
         localStorage.setItem('conn',this.isconn)
         const token = response.accessToken; 
         //        if (rememberMe) {
           localStorage.setItem('access_token', token);
         //} else {
         //  sessionStorage.setItem('access_token', tokenWithPrefix);
         //}
       }),
       catchError((error: HttpErrorResponse) => {
         // Handle errors
         if (error) {
         
           console.error('An error occurred during authentication.', error);
 
         }
         return throwError('Authentication failed.');
       })
     );
   }
  
   signupUser(user: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
         
       })
     }
     return this.http.post<any>(this.signupUrl, user, httpOptions)
     .pipe(
       catchError(error => {
         console.error('An error occurred:', error);
         return throwError(error);
       })
     );
 };
 
 
 getAuthToken(): string {
   const token = localStorage.getItem('access_token');
   console.log('SERVICE token is'+token)
 
   return token || 'EMPTY';
 }
   isLoggedIn(): boolean {
     return true;
    // return !!localStorage.getItem('access_token') || !!sessionStorage.getItem('access_token');
     
   }
 
 getIsconn(){
   return(
     this.isconn
   )
 }
 signout(){
 
   localStorage.removeItem('access_token')
 
   this.router.navigate(['/landing'])
 }



}
