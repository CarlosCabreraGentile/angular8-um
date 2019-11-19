import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../auth-response-data';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    isLogin: boolean = true;
    isLoading: boolean = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    onSwitchMode() {
        //Just change the status of the boolean
        this.isLogin = !this.isLogin;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObservable: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLogin) {
            authObservable = this.authService.login(email, password);
        } else {
            authObservable = this.authService.signUp(email, password);
        }
        
        authObservable.subscribe(
            data => {
                console.log(data);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            err => {
                console.log(err);
                this.error = err;
                this.isLoading = false;
            },
            () => {
                //console.log("POST subscribe complete");
            }
        );

        form.reset();
    }

}
