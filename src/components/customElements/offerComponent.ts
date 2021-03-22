import {bindable, customElement} from 'aurelia-framework';
import {autoinject} from 'aurelia-framework';
import {UserOffer} from 'models/UserOffer';
import {Config} from 'resources/Config';


@autoinject
export class OfferComponentCustomElement{

    constructor(private config: Config){}

    @bindable model: UserOffer;

    GetPictureUrl(){
        return this.config.pictureBaseUrl + this.model.userId + ".jpg?random=" + Math.random() * 100;
    }
}