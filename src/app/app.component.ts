import { Component,OnInit,OnChanges,SimpleChanges, DoCheck,AfterViewChecked } from '@angular/core';
import { User } from '../app/_models/index';
import { AuthenticationService } from '../app/_services/index';
import '../assets/app.css';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit, OnChanges, DoCheck, AfterViewChecked  {
    currentUser: User;
    islogged: boolean;
    constructor(private authenticationService: AuthenticationService) { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser == null) {
            this.islogged = false;
        }else {
            this.islogged = true;
        }
    }

    ngOnInit() {
        
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log("onchange")
      
      }
      ngDoCheck() {
        console.log("docheck")
       
      }

      ngAfterViewChecked() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser == null) {
            this.islogged = false;
        }else {
            this.islogged = true;

        }

      }

      logout() {
        this.authenticationService.logout();
        window.location.reload();
    }
 }