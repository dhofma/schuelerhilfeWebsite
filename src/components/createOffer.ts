import {AuthService} from 'services/AuthService';
import {OfferService} from 'services/OfferService';
import {SubjectService} from 'services/SubjectService';
import {TeacherService} from 'services/TeacherService';
import {autoinject} from 'aurelia-framework';
import {Teacher} from 'models/Teacher';
import {UserOffer} from 'models/UserOffer';
import {Offer} from 'models/Offer';

import {Router} from 'aurelia-router';
import {observable} from 'aurelia-framework';

@autoinject
export class CreateOffer{
    public teachers: Teacher[];
    public subjects: string[];

    public offer: Offer;
    @observable subject: string;

    constructor(private authSvc: AuthService, private subjectSvc: SubjectService, private teacherSvc: TeacherService,
        private offerSvc: OfferService, private router: Router){
        this.subjectSvc.GetSubjects().then(
            (result) => {
                this.subjects = result;
            }
        );
    }

    activate(){
        this.offer = new UserOffer();
        this.offer.userId = this.authSvc.user.id;
    }

    subjectChanged(){
        if(this.subject){
            this.teacherSvc.GetTeachersBySubject(this.subject).then(
                (result) =>{
                    this.teachers = result;
                }
            );
        }
        else{
            this.teachers = null;
        }
    }

    Submit(){
        this.offer.subject = this.subject;
        if(!this.offer.subject && this.offer.teacherId){
            alert("Bitte Fach auswählen!");
            return;
        }
        if(!this.offer.teacherId && this.offer.subject){
            alert("Bitte Lehrer auswählen!");
            return;
        }
        if(!this.offer.subject && !this.offer.teacherId){
            alert("Bitte Fach und Lehrer auswählen!");
            return;
        }

        this.offerSvc.CreateOffer(this.offer).then((response) =>{
            this.router.navigateToRoute('select');
        }, (response) =>{
            console.log(response);
            alert("Erstellen des Angebots fehlgeschlagen! Bitte erneut versuchen!");
        });
    }
}