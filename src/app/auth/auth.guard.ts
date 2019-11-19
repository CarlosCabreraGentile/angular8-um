import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        //Expects return true or false, so needs to pipe and map operators 
        //to convert the result of user 
        return this.authService.user
        .pipe(
            map( user => {
                //!! returns a true value if there anything that is not null or undefined
                //or converts to false, if there is a null or undefined value
                return !!user;
            }),
            //Option 1 to re-direct if user is not authenticated
            tap(isAuthenticated => {
                if(!isAuthenticated){
                    this.router.navigate(['/auth']);
                }
            })
        );
    }

}