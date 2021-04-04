import {autoinject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@autoinject()

export class Prompt {
   constructor(private controller: DialogController) {
      controller.settings.centerHorizontalOnly = true;
   }

   public message: string;

   activate(message){
       
       this.message = message;
   }
}
  

  