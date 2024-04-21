using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.SignalR;

namespace AndongSojuGuideBot.Hubs;

public class GptStreamHub : Hub
{
    public async IAsyncEnumerable<string> GptAnswer([EnumeratorCancellation] CancellationToken cancellationToken)
    {
        // threadId 기반으로 stream하기 구현
        
        cancellationToken.ThrowIfCancellationRequested();
        
        //TODO: 
        yield return null;
        await Task.Delay(10, cancellationToken);
    }
}