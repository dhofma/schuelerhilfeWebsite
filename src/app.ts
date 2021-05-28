import {PLATFORM, autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import { AuthService } from 'services/AuthService';

@autoinject
export class App {

  constructor(private router: Router, private authSvc: AuthService){
  }

  configureRouter(config, router) {
    config.title = 'Schüler helfen Schüler';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName("components/selection"), nav: true, title: 'Select' },
      { route: 'editProfile', name: 'editProfile', moduleId: PLATFORM.moduleName("components/editProfile"), title: 'Edit Profile' },
      { route: 'createOffer', name: 'createOffer', moduleId: PLATFORM.moduleName("components/createOffer"), title: 'Create Offer' },
      { route: 'search', name: 'search', moduleId: PLATFORM.moduleName("components/searchOffer"), title: 'Suchen' },
      { route: 'myOffers', name: 'myOffers', moduleId: PLATFORM.moduleName("components/myOffers"), title: 'Meine Angebote' }
    ]);
  }

  Home(){
    this.router.navigateToRoute("home");
  }

  Logout(){
    if (this.authSvc.IsLoggedIn) {
      this.authSvc.Logout();
      this.router.navigateToRoute("home");
    }
  }
}
