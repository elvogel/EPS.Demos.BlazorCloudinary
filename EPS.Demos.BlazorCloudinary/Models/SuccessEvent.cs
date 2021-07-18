using System;
using System.Collections.Generic;

namespace EPS.Demos.BlazorCloudinary.Models
{
// Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Info
    {
        public string id { get; set; }
        public string batchId { get; set; }
        public string asset_id { get; set; }
        public string public_id { get; set; }
        public int version { get; set; }
        public string version_id { get; set; }
        public string signature { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public string format { get; set; }
        public string resource_type { get; set; }
        public DateTime created_at { get; set; }
        public List<string> tags { get; set; }
        public int bytes { get; set; }
        public string type { get; set; }
        public string etag { get; set; }
        public bool placeholder { get; set; }
        public string url { get; set; }
        public string secure_url { get; set; }
        public string access_mode { get; set; }
        public string path { get; set; }
        public string thumbnail_url { get; set; }
    }

    public class SuccessEvent
    {
        public string @event { get; set; }
        public Info info { get; set; }
    }

}
