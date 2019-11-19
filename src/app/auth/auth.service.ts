import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthResponseData } from '../auth-response-data';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //Emit a new user when a new user exists or when log out
    //with BehaviorSubject can access data before subscribes
    user = new BehaviorSubject<User>(null)
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router:Router) { }

    /**
     * This function is used for sign up users
     * @param email 
     * @param password 
     */
    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            //Tap operator allows to perform some action without changin the perform
            .pipe(catchError(this.handleError), tap(
                data => {
                    this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn);
                })
            );
    }

    /**
     * This function allows users to log in
     * @param email 
     * @param password 
     */
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError), tap( 
                data => {
                    this.handleAuthentication(data.email, data.localId, data.idToken, +data.expiresIn);
                })
            );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
    
        if(!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        //Check if it is a valid token and forward the new authenticated user 
        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    logout() {
        this.user.next(null );
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(err: HttpErrorResponse) {
        let error = 'Unknown error';

        if (!err.error || !err.error.error) {
            return throwError(error);
        }

        switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
                error = 'This email already exist';
                break;
            case 'OPERATION_NOT_ALLOWED':
                error = 'This is not allowed';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                error = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                error = 'There is no user record corresponding to this identifier. The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                error = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                error = 'The user account has been disabled by an administrator.';
                break;
        }
        return throwError(error);
    }
}
