import {PLATFORM} from 'aurelia-framework';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

export class App {
  configureRouter(config, router) {
    config.title = 'Todo-List';
    config.map([
      { route: '', name: 'home', moduleId: PLATFORM.moduleName("components/start"), nav: true, title: 'Home' },
      { route: 'select', name: 'select', moduleId: PLATFORM.moduleName("components/selection"), title: 'Selection' }
    ]);
  }
}
