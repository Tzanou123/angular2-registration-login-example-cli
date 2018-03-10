import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private website:string = "http://ttipp-laravel.raphael-demo.com";
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    
        return this.http.post<any>('http://ttipp-laravel.raphael-demo.com/api/user/login',"email="+username+"&password="+password,{headers: headers})
            .map(user => {

                
                // login successful if there's a jwt token in the response
                // console.log(JSON.stringify(user.data.token));
                // user.data.username = username;
                let theuser = user.data;
                console.log('raf'+JSON.stringify(user.data));
                // return;
                if (user && user.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(theuser));
                }

                return theuser;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}