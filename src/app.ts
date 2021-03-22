import {PLATFORM, autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import { AuthService } from 'services/AuthService';

@autoinject
export class App {

  constructor(private router: Router, private authSvc: AuthService){}

  configureRouter(config, router) {
    config.title = 'Schüler helfen Schüler';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName("components/start"), nav: true, title: 'Home' },
      { route: 'select', name: 'select', moduleId: PLATFORM.moduleName("components/selection"), title: 'Select' },
      { route: 'editProfile', name: 'editProfile', moduleId: PLATFORM.moduleName("components/editProfile"), title: 'Edit Profile' },
      { route: 'createOffer', name: 'createOffer', moduleId: PLATFORM.moduleName("components/createOffer"), title: 'Create Offer' },
      { route: 'search', name: 'search', moduleId: PLATFORM.moduleName("components/searchOffer"), title: 'Suchen' }
    ]);
  }

  Home(){
    if(this.authSvc.IsLoggedIn)
      this.router.navigateToRoute("select");
    else
      this.router.navigateToRoute("home");
  }
}
