import {Config} from 'resources/Config';
import {HttpClient, json} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';
import {UserOffer} from 'models/UserOffer';
import {Offer} from 'models/Offer';
import {OfferFilter} from 'models/OfferFilter';

@autoinject
export class OfferService{
    private httpClient: HttpClient;

    constructor(private config: Config){
        this.httpClient = new HttpClient();
    }

    public async GetOffersByFilter(filter: OfferFilter): Promise<UserOffer[]>{
        let result = await this.httpClient.fetch(this.config.offerControllerUrl  + "/filtered", {
            method: "post",
            body: json(filter)
        });
        if(result.ok)
            return Promise.resolve(result.json());
        else
            return Promise.reject(null);
    }

    public async CreateOffer(offer: Offer): Promise<Offer>{
        let result = await this.httpClient.fetch(this.config.offerControllerUrl, {
            method: "post",
            body: json(offer)
        });
        if(result.ok)
            return Promise.resolve(result.json());
        else
            return Promise.reject(result);
    }
}