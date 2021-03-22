import {UserOffer} from "models/UserOffer";
import {AuthService} from 'services/AuthService';
import {OfferService} from 'services/OfferService';
import {autoinject} from 'aurelia-framework';

@autoinject
export class SearchOffer{
    public offers: UserOffer[];

    constructor(private authSvc: AuthService, private offerSvc: OfferService){}

    activate(){
        this.offerSvc.GetOffersByUser(this.authSvc.user.id).then(
            (result) => {
                this.offers = result;
            }
        );
    }
}