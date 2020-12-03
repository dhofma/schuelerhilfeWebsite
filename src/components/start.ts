import {AuthService} from '../services/AuthService';
import { autoinject } from 'aurelia-framework';
import {Router} from 'aurelia-router';

@autoinject
export class Start{

    constructor(private authSvc: AuthService, private router: Router){}

    Login(){
        this.authSvc.Login().then(()=>{
            this.router.navigateToRoute('editProfile');
        });
    }
}