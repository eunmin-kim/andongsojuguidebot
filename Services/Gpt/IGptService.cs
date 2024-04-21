namespace AndongSojuGuideBot.Services;

public interface IGptService
{
    string GPT_API_KEY { get; set; }
    string GPT_ASS_KEY { get; set; }

    Task<string> MakeThread(string question);

}