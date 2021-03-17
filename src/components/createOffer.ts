import {AuthService} from 'services/AuthService';
import {OfferService} from 'services/OfferService';
import {SubjectService} from 'services/SubjectService';
import { autoinject } from 'aurelia-framework';

@autoinject
export class createOffer{

    public subjects: string[];
    constructor(private authSvc: AuthService, private subjectSvc: SubjectService, private offerSvc: OfferService){
        this.subjectSvc.GetSubjects().then(
            (result) => {
                this.subjects = result;
                
                var options = '';
                this.subjects.forEach(element => options += '<option value="' + element + '" />');
                document.getElementById('subjectsTest').innerHTML = options;
            }
        );
    }

    Test(){
        this.subjectSvc.GetSubjects().then((response) =>{
            console.log("worked");
            console.log(response);
        }, (response) =>{
            console.log("failed");
            console.log(response);
        });
    }
}