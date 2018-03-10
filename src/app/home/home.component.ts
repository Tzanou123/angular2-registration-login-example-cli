import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService,AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    islogged: boolean;

    constructor(private userService: UserService,private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(this.currentUser == null) {
            this.islogged = false;
        }else {
            this.islogged = true;
        }
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    logout() {
        this.authenticationService.logout();
        window.location.reload();
    }
}