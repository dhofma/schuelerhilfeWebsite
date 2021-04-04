import {bindable, customElement} from 'aurelia-framework';
import {autoinject} from 'aurelia-framework';
import {UserOffer} from 'models/UserOffer';
import {Config} from 'resources/Config';

import {DialogService} from 'aurelia-dialog';
import {Prompt} from './popUp';
import {OfferService} from 'services/OfferService';
import {Router} from 'aurelia-router';


@autoinject
export class OfferComponentCustomElement{

    constructor(private config: Config, private dialogSvc: DialogService, private offerSvc: OfferService, private router: Router){}

    @bindable model: UserOffer;
    @bindable editable: boolean = false;

    GetPictureUrl(){
        return this.config.pictureBaseUrl + this.model.userId + ".jpg?random=" + Math.random() * 100;
    }

    Delete(){
        this.dialogSvc.open({viewModel: Prompt, model: "Angebot wird gelöscht! Fortfahren?"}).whenClosed(response => {
            if(!response.wasCancelled){
                this.offerSvc.DeleteOffer(this.model).then(result =>{
                    if (result)
                        this.router.navigateToRoute('select');
                    else
                        console.log(result);
                })
            }
        })
    }
}