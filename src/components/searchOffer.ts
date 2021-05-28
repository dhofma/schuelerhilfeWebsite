import {UserOffer} from "models/UserOffer";
import {Teacher} from "models/Teacher";
import {OfferFilter} from "models/OfferFilter";

import {AuthService} from 'services/AuthService';
import {OfferService} from 'services/OfferService';
import {SubjectService} from "services/SubjectService";
import {TeacherService} from "services/TeacherService";

import {autoinject, observable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@autoinject
export class SearchOffer{
    public offers: UserOffer[];
    public teachers: Teacher[];
    public subjects: string[];

    @observable subject: string;
    @observable teacherId: number;

    
    constructor(private authSvc: AuthService, private subjectSvc: SubjectService, private teacherSvc: TeacherService,
        private offerSvc: OfferService, private router: Router){
    }

    subjectChanged(){
        if(this.subject){
            this.teacherSvc.GetTeachersBySubject(this.subject).then(
                (result) =>{
                    this.teachers = result;
                }
            );
            let filter = new OfferFilter;
            filter.subject = this.subject;
            filter.teacherId = 0;
            this.offerSvc.GetOffersByFilter(filter).then(
                (result) => {
                    this.offers = result.filter(x => x.userId != this.authSvc.user.id);
                }
            );
        }
        else{
            this.teachers = null;
            this.offers = null;
        }
    }

    teacherIdChanged(){
        if(this.subject && this.teacherId){
            console.log(this.teacherId)
            let filter = new OfferFilter;
            filter.subject = this.subject;
            filter.teacherId = this.teacherId;
            this.offerSvc.GetOffersByFilter(filter).then(
                (result) => {
                    console.log(result);
                    this.offers = result.filter(x => x.userId != this.authSvc.user.id);
                }
            );
        }
    }

    activate(){
        this.subjectSvc.GetSubjects().then(
            (result) => {
                this.subjects = result;
            }
        );
    }
}