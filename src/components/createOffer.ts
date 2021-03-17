import {AuthService} from 'services/AuthService';
import {OfferService} from 'services/OfferService';
import {SubjectService} from 'services/SubjectService';
import {TeacherService} from 'services/TeacherService';
import {autoinject} from 'aurelia-framework';
import {Teacher} from 'models/Teacher';
import { UserOffer } from 'models/UserOffer';

import {Router} from 'aurelia-router';

@autoinject
export class createOffer{
    public teachers: Teacher[];
    public subjects: string[];

    public offer: UserOffer;

    constructor(private authSvc: AuthService, private subjectSvc: SubjectService, private teacherSvc: TeacherService,
        private offerSvc: OfferService, private router: Router){
        this.subjectSvc.GetSubjects().then(
            (result) => {
                this.subjects = result;
            }
        );
        this.teacherSvc.GetTeachers().then(
            (result) => {
                this.teachers = result;
            }
        );
    }

    activate(){
        this.offer = new UserOffer();
        this.offer.userId = this.authSvc.user.id;
        this.offer.userFirstName = this.authSvc.user.firstName;
        this.offer.userLastName = this.authSvc.user.lastName;
        this.offer.class = this.authSvc.user.class;
    }

    Submit(){
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
            
        var tempTeacher = this.teachers.find(x => x.id == this.offer.teacherId);
        this.offer.teacherFirstName = tempTeacher.firstname;
        this.offer.teacherLastName = tempTeacher.lastname;

        this.offerSvc.CreateOffer(this.offer).then((response) =>{
            this.router.navigateToRoute('select');
        }, (response) =>{
            console.log(response);
            alert("Erstellen des Angebots fehlgeschlagen! Bitte erneut versuchen!");
        });
    }
}