import {AuthService} from '../services/AuthService';
import {UserService} from 'services/UserService';
import { autoinject } from 'aurelia-framework';
import {Router} from 'aurelia-router';

@autoinject
export class Start{

    constructor(private authSvc: AuthService, private router: Router, private userSvc: UserService){}

    Login(){
        this.authSvc.Login().then(()=>{
            this.userSvc.GetUserById(this.authSvc.user.id).then((response) =>{
                console.log("worked");
                console.log(response);
                this.authSvc.user = response;
                this.router.navigateToRoute('select');
            }, (response) =>{
                console.log("failed");
                console.log(response);
                this.router.navigateToRoute('editProfile');
            });
            
        });
    }
}