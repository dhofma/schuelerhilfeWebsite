import {AuthService} from '../services/AuthService';
import { autoinject } from 'aurelia-framework';
import {Router} from 'aurelia-router';

@autoinject
export class Selection {

    constructor(private authSvc: AuthService, private router: Router){}

    Give(){
        this.router.navigateToRoute('createOffer');
    }

    Receive(){
        this.router.navigateToRoute('search');
    }
}