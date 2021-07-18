namespace EPS.Demos.BlazorCloudinary.Models
{
    /// <summary>The Cloudinary configuration.</summary>
    public class CloudinaryConfig
    {
        /// <summary>The cloud name.</summary>
        public string Cloud { get; set; }

        /// <summary>The API key.</summary>
        public string APIKey { get; set; }

        /// <summary>The API secret.</summary>
        public string APISecret { get; set; }

        public CloudinaryConfig(){}

        public CloudinaryConfig(string cloud, string apiKey, string apiSecret)
        {
            Cloud = cloud;
            APIKey = apiKey;
            APISecret = apiSecret;
        }
    }

}
