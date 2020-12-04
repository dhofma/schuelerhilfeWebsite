export class ImageValueConverter{
    toView(fileList){
        let file;
        if(!fileList){
            return file;
        }
        file = fileList[0];
        return URL.createObjectURL(file);

    }
}