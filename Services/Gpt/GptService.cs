using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace AndongSojuGuideBot.Services;

public class GptService : IGptService
{
    public string GPT_API_KEY { get; set; }
    public string GPT_ASS_KEY { get; set; }

    private static HttpClient httpclient;
    public GptService()
    {
        httpclient = new HttpClient();
        httpclient.BaseAddress = new Uri("https://api.openai.com/v1/threads");
    }

    public GptService(string GPT_API_KEY, string GPT_ASS_KEY)
    {
        GPT_API_KEY = GPT_API_KEY;
        GPT_ASS_KEY = GPT_ASS_KEY;
    }

    public async Task<string> MakeThread(string question)
    {
        var createThreadData = new
        {
            messages = new
            {
                role = "user",
                content = "안동 소주에 대해 알려줘"
            }
        };
        var json = JsonConvert.SerializeObject(createThreadData);
        var content = new StringContent(json, Encoding.UTF8, "application/json");
        content.Headers.Add("Authorization",$"Bearer {this.GPT_API_KEY}");
        content.Headers.Add("OPenAI-Beta",$"assistants=v2");
        
        var response = await httpclient.PostAsync(httpclient.BaseAddress,content);
        var responseContent = await response.Content.ReadAsStringAsync();
        return responseContent;
    }
}