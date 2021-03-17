import {HttpClient} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-framework';
import {Config} from '../resources/Config';

@autoinject
export class UploadService{

    private httpClient: HttpClient;

    constructor(private config: Config){
        this.httpClient = new HttpClient();
    }

    public async UploadFile(files: FileList, name: string) {
        if(!files){
            return Promise.reject(null);
        }
        let formData = new FormData();
        let image = <File>files[0];
        var blob = image.slice(0, image.size, "image/jpg");
        image = new File([blob], name + "." + this.getExtension(blob.type), {type: blob.type});

        formData.append("image", image, image.name);

        let result = await this.httpClient.fetch(this.config.imageUploadUrl, {
            method: "POST",
            body: formData,
            headers: new Headers()
        });
        if(result.ok)
            return Promise.resolve(result);
        else
            return Promise.reject(null);
    }

    getExtension(str) {
        return str.split('/')[1];
    }
}