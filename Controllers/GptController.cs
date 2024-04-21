using Microsoft.AspNetCore.Mvc;

namespace AndongSojuGuideBot.Controllers;
[Controller]
public class GptController : Controller
{
    [HttpPost("send-message")]
    public IActionResult Index()
    {
        var test = new { test = "Hello World" };
        string url = "";
        return Json(test);
    }
}