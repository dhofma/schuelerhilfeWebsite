import {User} from '../models/User';
import {autoinject} from 'aurelia-framework';

@autoinject
export class EditProfile{
    image;

    constructor(user: User){
        
    }

    
    Test(){
        console.log(this.image);
    }
}