import { ClassService } from 'services/ClassService';
import {UserService} from 'services/UserService';
import {UploadService} from '../services/PictureService';
import {AuthService} from '../services/AuthService';
import {autoinject} from 'aurelia-framework';
import {Config} from '../resources/Config';
import {Router} from 'aurelia-router';
import { Class } from 'models/Class';
import { isNull } from 'lodash';
import { User } from 'models/User';

@autoinject
export class EditProfile{
    files;
    tempUser: User;
    public classes: Class[];

    constructor(private upload: UploadService, private config: Config, private router: Router, private authSvc: AuthService,
        private userSvc: UserService, private classSvc: ClassService){
            this.GetClasses();
    }

    activate(){
        this.tempUser = new User;
        this.tempUser.id = this.authSvc.user.id;
        this.tempUser.firstName = this.authSvc.user.firstName;
        this.tempUser.lastName = this.authSvc.user.lastName;
        this.tempUser.email = this.authSvc.user.email;
        this.tempUser.class = this.authSvc.user.class;
    }

    public GetClasses(){
        this.classSvc.GetClasses().then(
            (result) => {
                this.classes = result;
            }
        );
    }
    
    Submit(){
        this.authSvc.user = this.tempUser;

        if(this.files){
            this.upload.UploadFile(this.files, this.authSvc.user.id).then(() =>{
            }, () =>{
            });
            this.authSvc.PictureLoaded = false;
            setTimeout(() => {
                this.authSvc.PictureLoaded = true;
            }, 200);
        }

        // TODO: handle other user data

        if(this.authSvc.user.class == null){
            alert("Bitte eine gültige Klasse auswählen");
            return;
        }

        this.userSvc.createUser(this.authSvc.user).then(
            (result) =>{
                this.authSvc.user = result;
            }, (result) =>{
                console.log("Creating or updating user failed!");
                console.log(result);
            }
        );

        this.router.navigateToRoute('select');
    }

    
}