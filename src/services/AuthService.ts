import * as msal from '@azure/msal-browser';
import {autoinject} from 'aurelia-framework';
import {User} from 'models/User';
import {Config} from 'resources/Config';

import {UserService} from 'services/UserService';

@autoinject
export class AuthService{

    private msalConfig = {
        auth:{
            clientId: '4a3e691e-f053-4855-b29a-64adab42e87f',
            authority: 'https://login.microsoftonline.com/9a618953-9bf3-44e9-af39-63b18eae5b5f'
        }
    };

    private msalInstance: msal.PublicClientApplication;

    public user: User;

    private pictureLoaded: boolean = true;

    get PictureLoaded(): boolean{
        return this.pictureLoaded;
    }

    set PictureLoaded(value: boolean){
        this.pictureLoaded = value;
    }

    get IsLoggedIn(): boolean{
        return !(!this.user.id || !this.user.id.trim());
    }

    constructor(private config: Config){
        this.msalInstance = new msal.PublicClientApplication(this.msalConfig);
        this.user = new User();
    }

    async Login(){
        try{
            let loginresponse: msal.AuthenticationResult = await this.msalInstance.loginPopup();
            this.user.id = loginresponse.account.localAccountId;
            this.user.email = loginresponse.account.username;
            this.user.firstName = loginresponse.account.name.split(' ')[1];
            this.user.lastName = loginresponse.account.name.split(' ')[0];
            return Promise.resolve();
        }
        catch (err){
            console.log(err);
            return Promise.reject();
        }
    }

    Logout() {
        this.msalInstance.logout();
    }

    GetPictureUrl(){
        return this.config.pictureBaseUrl + this.user.id + ".jpg?random=" + Math.random() * 100;
    }
}