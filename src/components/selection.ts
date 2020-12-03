import {AuthService} from '../services/AuthService';
import { autoinject } from 'aurelia-framework';
import {Router} from 'aurelia-router';

@autoinject
export class Selection {

    constructor(private authSvc: AuthService, private router: Router){}

    Give(){
        console.log(this.authSvc.User);
    }
}