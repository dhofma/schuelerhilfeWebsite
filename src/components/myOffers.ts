import {UserOffer} from "models/UserOffer";
import {OfferFilter} from "models/OfferFilter";

import {AuthService} from 'services/AuthService';
import {OfferService} from 'services/OfferService';

import {autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@autoinject
export class MyOffers{

    public offers: UserOffer[];

    constructor(private authSvc: AuthService, private offerSvc: OfferService, private router: Router){}

    activate(){
        let filter = new OfferFilter;
        filter.teacherId = 0;
        filter.userId = this.authSvc.user.id;
        this.offerSvc.GetOffersByFilter(filter).then(
            (result) => {
                this.offers = result;
            }
        );
    }

}