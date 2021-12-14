// this import does NOT work and will create CORS issues.
// instead, import the script in your _Host.cshtml file, like this:
// <script src="https://upload-widget.cloudinary.com/global/all.js"></script>
// put it before or after your blazor JS script.

//import 'https://upload-widget.cloudinary.com/global/all.js';

//https://cloudinary.com/documentation/upload_widget_reference#openuploadwidget
//https://cloudinary.com/documentation/upload_widget_reference#events

// use this if you want to save a parameter and remove 'theCloud' from the 
// setupCloudinaryUploadWidget method.
export function setCloudinaryCloudName(cloudName){
    cloudinary.setCloudName(cloudName);
}

var widget;

export function setupCloudinaryUploadWidget(preset, handle, instance, callback){
    console.log(preset,handle,instance,callback);
    widget = cloudinary.createUploadWidget({uploadPreset: preset,
        //cloud: theCloud,
        cropping: true,
        showSkipCropButton: true,
        multiple: false,
        folder: handle,
        tags: ['user',handle],
        resourceType: 'image',
        image_file_type: 'jpg'
        },(error,result) => {
                if (!error && result.event === 'success'){
                    instance.invokeMethodAsync(callback,JSON.stringify(result));
                }
    });
}

export function openWidget(){
    widget.open();
}
