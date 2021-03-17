import { User } from 'models/User';
import {Config} from 'resources/Config';
import {HttpClient, json} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';

@autoinject
export class UserService{
    private httpClient: HttpClient;

    constructor(private config: Config){
        this.httpClient = new HttpClient();
    }

    public async GetUserById(id:string): Promise<User>{
        let result = await this.httpClient.fetch(this.config.userControllerUrl + "/" + id, {
            method: "get"
        });
        if(result.ok)
            return Promise.resolve(result.json());
        else
            return Promise.reject(null);
    }

    public async createUser(user: User): Promise<User>{
        let result = await this.httpClient.fetch(this.config.userControllerUrl, {
            method: "post",
            body: json(user)
        });
        if(result.ok)
            return Promise.resolve(result.json());
        else
            return Promise.reject(null);
    }
}