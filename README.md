# EPS.Demos.BlazorCloudinary

The purpose of this project is to demonstrate interoperability of the [Cloudinary Upload Widget](https://cloudinary.com/documentation/upload_widget), a complete, interacive user interface that allows your users to upload a variety of sources to your website or application. 

## Demo Setup
- Have a [Cloudinary](https://cloudinary.com) account.
- Configure an unsigned [Upload Preset](https://cloudinary.com/documentation/upload_presets)
- set up the following secret keys:

```
dotnet user-secrets set "CloudinaryConfig:Cloud" "<your-cloud-name>"
dotnet user-secrets set "CloudinaryConfig:APIKey" "<apikey>"
dotnet user-secrets set "CloudinaryConfig:APISecret" "<apiSecret>"
dotnet user-secrets set handle "<folderName>"
dotnet user-secrets set "preset" "<cloudinaryPreset>" #the upload preset name
```
In this demo, the folder value is used for the images and is part of the image's public id.

## How it Works

### _Host.cshtml
Add the Cloudinary widget script reference either above or below the Blazor script reference.

```c#
<script src="https://upload-widget.cloudinary.com/global/all.js"></script>
<script src="_framework/blazor.server.js"></script>
```

### imgHandler.js
This Javascript file sets up and fires off our widget from our code. 

**IMPORTANT**

Do *not* reference the Cloudinary JS library from your code by using an `import` statement - you will get CORS issues and have a bad time. 

We create three methods:
- `setCloudinaryCloudName` to set the cloud name for Cloudinary
- `setupCloudinaryUploadWidget` which configures the widget 
- `openWidget` which opens the widget

`setCloudinaryCloudName` can be replaced by simply passing in the cloud name as a parameter to `setupCloudinaryUploadWidget` but it's just a matter of preference - either way is sufficient.

In `setupCloudinaryUploadWidget` we pass in a couple of parameters, most notably of which is a [DotNetObjectReference](https://docs.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript?view=aspnetcore-5.0#invoke-an-instance-net-method) we use for invoking a method in our Blazor page in the widget event. We also pass in the name of the method so we can invoke it.

### `Index.razor`

In our demo, this page does all the work. 

First thing we do is set up a button that calls a method.

```c#
@page "/"

@using EPS.Demos.BlazorCloudinary.Models
@using Microsoft.Extensions.Configuration
@using Newtonsoft.Json
@inject IJSRuntime JS
@inject Cloudinary cloudinary
@inject IConfiguration config

<h1>Cloudinary demo</h1>
<div class="row">
    <div class="col-1">
        <button class="btn-lg" @onclick="LoadFile">Upload Image</button>
    </div>
</div>

@if (SuccessEvent is not null)
{
    <div class="row">
        @imgString
    </div>
}

```

In the [OnAfterRenderAsync](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle?view=aspnetcore-6.0#after-component-render-onafterrenderasync) event, we do the following:
- set up a [IJSObjectReference](https://docs.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.ijsobjectreference?view=aspnetcore-6.0) to our javascript file that manages our Cloudinary widget
- read some config settings
- invoke `setCloudinaryCloudName` and set our cloud name 
- invoke `setupCloudinaryUploadWidget` with our parameters, including a [DotNetObjectReference](https://docs.microsoft.com/en-us/dotnet/api/microsoft.jsinterop.dotnetobjectreference?view=aspnetcore-6.0) to `Index` with the name of the method to invoke (`UploadComplete`)

The code looks like this:
```c#
private IJSObjectReference module;
protected override async Task OnAfterRenderAsync(bool firstRender)
{
    await base.OnAfterRenderAsync(firstRender);

    if (firstRender)
    {
        module = await JS.InvokeAsync<IJSObjectReference>("import",
            "./js/imgHandler.js");
    
        var preset = config["preset"];
        var handle = config["handle"];
        var cloud = config["CloudinaryConfig:Cloud"];
        await module.InvokeVoidAsync("setCloudinaryCloudName", cloud);
        //pass in 
        await module.InvokeVoidAsync("setupCloudinaryUploadWidget",preset,handle,
            DotNetObjectReference.Create(this),"UploadComplete").ConfigureAwait(false);
    }
}
```
Our button in the UI code is wired to a method that invokes the `openWidget` method.

```c#
private async Task LoadFile()
{
    Console.WriteLine("invoking LoadFile");
    await module.InvokeVoidAsync("openWidget");

}

```

When the widget uploads successfully, it closes and invokes our callback. In the demo, we use the Cloudinary SDK to generate a `<img>` tag for us, which is a bit redundant in this case since we have a number of URLs to pick from. But what better time to remind ourselves that you need to use a [MarkupString](https://docs.microsoft.com/en-us/aspnet/core/blazor/components/?view=aspnetcore-5.0#raw-html) in order to display raw HTML in a Blazor UI!

```c#
[JSInvokable]
public void UploadComplete(string response)
{
    Console.WriteLine(response);
    SuccessEvent = JsonConvert.DeserializeObject<SuccessEvent>(response);
    imgString = new MarkupString(cloudinary.Api.UrlImgUp.BuildImageTag(SuccessEvent.info.public_id));
    StateHasChanged();
}

```

## Notes
- 'Live Broadcast' should be turned *off* in youir upload presets if you plan on capturing camera inputs for uploading pictures.
- Watch for typos in your method names - this includes capitalization. As obvious as that sounds, a simple 'CLoudinary' method name misspelling gave me at least a good hour of headaches. Don't let it happen to you! 
