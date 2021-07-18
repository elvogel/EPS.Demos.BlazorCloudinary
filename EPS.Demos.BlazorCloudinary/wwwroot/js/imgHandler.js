import 'https://upload-widget.cloudinary.com/global/all.js';

//https://cloudinary.com/documentation/upload_widget_reference#openuploadwidget
//https://cloudinary.com/documentation/upload_widget_reference#events
cloudinary.setCloudName("barber-shop");
var widget;

export function setupBarberUploadWidget(preset, handle, instance, callback){
    widget = cloudinary.createUploadWidget({uploadPreset: preset,
        cropping: true,
        showSkipCropButton: true,
        multiple: false,
        folder: handle,
        tags: ['user',handle],
        resourceType: 'image'
        },(error,result) => {
                if (!error && result.event === 'success'){
                    instance.invokeMethodAsync(callback,JSON.stringify(result));
                }
    });
}

export function openWidget(){
    widget.open();
}
