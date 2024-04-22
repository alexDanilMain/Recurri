using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

class Program
{
    static readonly HttpClient client = new HttpClient();

    static async Task Main(string[] args)
    {
        DateTime now = DateTime.UtcNow;
        DateTime newTime = now.AddHours(2);

        Console.WriteLine("Creating calendar event");

        var eventObj = new
        {
            summary = "Testing calendar api",
            description = "testing calendar api",
            start = new
            {
                dateTime = now.ToString("o"), // ISO 8601 format
                timeZone = TimeZoneInfo.Local.Id
            },
            end = new
            {
                dateTime = newTime.ToString("o"), // ISO 8601 format
                timeZone = TimeZoneInfo.Local.Id
            }
        };

        string json = JsonConvert.SerializeObject(eventObj);
        string url = "https://www.googleapis.com/calendar/v3/calendars/primary/events";
        //string url = "https://www.googleapis.com/auth/calendar";
        //string url = "https://iamcredentials.googleapis.com/v1/projects/kindcoderscalendar/serviceAccounts/kindcoderscalendar@kindcoderscalendar.iam.gserviceaccount.com:generateAccessToken";
        string jwt = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxYjkzYzY0MDE0NGI4NGJkMDViZjI5NmQ2NzI2MmI2YmM2MWE0ODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDIxMDUyODIwNTQzLWZtMXZya2twa3ExaWRwdmNrdHRldm4waXI5ZDlxZGMyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAyMTA1MjgyMDU0My1mbTF2cmtrcGtxMWlkcHZja3R0ZXZuMGlyOWQ5cWRjMi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNzA4NjEwNjc2NTM5MDUwOTU3NyIsImhkIjoiYXBwbGllZHRlY2hub2xvZ3kuc2UiLCJlbWFpbCI6ImF4ZWwucGV0ZXJzc29uQGFwcGxpZWR0ZWNobm9sb2d5LnNlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcxMzc4ODI4MiwibmFtZSI6IkF4ZWwgUGV0ZXJzc29uIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xxeF9SOU5SQkpIOFNBYlRzMGNkeEYxRE41cDF1NDllTU9wbkxvM3NOQklkTURPdz1zOTYtYyIsImdpdmVuX25hbWUiOiJBeGVsIiwiZmFtaWx5X25hbWUiOiJQZXRlcnNzb24iLCJpYXQiOjE3MTM3ODg1ODIsImV4cCI6MTcxMzc5MjE4MiwianRpIjoiYmE0NTJiOTRhMTBmMWIzNjYwY2QzNjkwNDJjNmI2Y2ZjZDUxMDZiNyJ9.kzThea_VCNtwC8haHJiFSqBLJwbajwZk8Yf-tykDLIlJErjXe5Ts1lJwIwEAknil-HoGEgHkvX_fn6lLqDvC2Azr2i7RGdT6zONylc59kf4vTfhk1m3DsE8lBOXnJjRb264Qx2ZZH7M5biPCIeugpKlhU02ll8CKEBiDNFjzZufnDh8DLHbYLRV7qdaMCE-ohbqrDjfqzkF7qDnyAdIDw3QQqPXm2bios-9iydqkiuGdxDjzcw_yDh-wJsOtRkpvZFcCcLkNAQL9K3S83odWTiV80eDQSNlGAjkOMC2rrx7CUy0eAsTs-XVMDk_DkyhfO1G8pqKQQ7ZuCanJ3pXEbA";      
        string token = "ya29.a0Ad52N391zNUBR0fRnOr96ZEmI4K_CNTEO2HA1rq8MZUD09zj6lb-6rLtzYcHIFbwMttCiEOcVe0uU-50NUwDrRZU17BPoJ5TQvBCCRtNVDXfw-Q3dFK9WAPHqhA7TxnSWF3Qrrpw0dUw46RjvPy8kUWCZ41XOFBBEIkFaCgYKAaYSARMSFQHGX2MirrJyp129bYs8Kfvrmf1m6A0171";
        //string accessToken = GetCookie("test_key"); // You need to implement this method

        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, url);
        
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
        request.Content = new StringContent(json, Encoding.UTF8, "application/json");

        HttpResponseMessage response = await client.SendAsync(request);
        string responseData = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseData);
        Console.WriteLine("Event created, check your Google Calendar!");
    }

    static string GetCookie(string key)
    {
        // Implementation depends on where you're storing cookies or similar data.
        // For a desktop app, this could be in user settings, environment variables, etc.
        return "your_access_token_here";
    }
}
