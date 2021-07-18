# EPS.Demos.BlazorCloudinary

The purpose of this project is to demonstrate interoperability of the [Cloudinary Upload Widget](https://cloudinary.com/documentation/upload_widget), a complete, interacive user interface that allows your users to upload a variety of sources to your website or application. 

## How it Works

We create two methods in a Javascript file - `setupBarberUploadWidget` which configures the widget the way we want it, and `openWidget` which opens the widget.

In `setupBarberUploadWidget` we pass in a couple of parameters, most notably of which is a [DotNetObjectReference](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript?view=aspnetcore-5.0#invoke-an-instance-net-method) we use for invoking a method in our Blazor page in the widget event. We also pass in the name of the method so we can invoke it. 

Our Upload Widget event now looks like this:

```js
        },(error,result) => {
                if (!error && result.event === 'success'){
                    instance.invokeMethodAsync(callback,JSON.stringify(result));
                }
```

We invoke the method and pass in a stringified version of the data from the widget so our callback serializes it to a SuccessEvent object which we can then do a number of things - in this demo, we simply take the info and build an image tag which we put into a [MarkupString](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-5.0#raw-html) so we can display the image on our page. 


## Demo Setup
- Have a [Cloudinary](https://cloudinary.com) account.
- Configure an unsigned [Upload Preset](https://cloudinary.com/documentation/upload_presets) 
- set up the following secret keys:

`dotnet user-secrets set "CloudinaryConfig:Cloud" "<your-cloud-name>"`

`dotnet user-secrets set "CloudinaryConfig:APIKey" "<apikey>"`

`dotnet user-secrets set "CloudinaryConfig:APISecret" "<apiSecret>"`

`dotnet user-secrets set handle <folderName>` (folder is used for the images and is part of their public id)

`dotnet user-secrets set preset <cloudinaryPreset>` using the preset name

