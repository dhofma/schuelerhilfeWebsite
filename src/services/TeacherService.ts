import {Config} from 'resources/Config';
import {HttpClient, json} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';
import { Teacher } from 'models/Teacher';

@autoinject
export class TeacherService{
    private httpClient: HttpClient;

    constructor(private config: Config){
        this.httpClient = new HttpClient();
    }

    public async GetTeachers(): Promise<Teacher[]>{
        let result = await this.httpClient.fetch(this.config.teacherControllerUrl, {
            method: "get"
        });
        if(result.ok)
            return Promise.resolve(result.json());
        else
            return Promise.reject(null);
    }
}