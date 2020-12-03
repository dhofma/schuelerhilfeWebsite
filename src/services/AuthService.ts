import * as msal from "@azure/msal-browser";

export class AuthService{

    private msalConfig = {
        auth:{
            clientId: '4a3e691e-f053-4855-b29a-64adab42e87f',
            authority: 'https://login.microsoftonline.com/9a618953-9bf3-44e9-af39-63b18eae5b5f'
        }
    };

    private msalInstance: msal.PublicClientApplication;

    public User : msal.AccountInfo;

    constructor(){
        this.msalInstance = new msal.PublicClientApplication(this.msalConfig);
    }

    async Login(){
        try{
            let loginresponse : msal.AuthenticationResult = await this.msalInstance.loginPopup();
            this.User = loginresponse.account;
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
}