// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

let qCnt = 0;
let sCnt = 0;

// 총 질문 답변 개수

let rowCnt = 0;
async function sendQ()
{
    return new Promise((resolve, reject) => {
        let question = $('.question_text').val();
        $(`.question_text`).val("");
        if (rowCnt === 0) {
            $(".col-send-list").append(
                ` <div class="chat-send">
                    <div class="chat-msg">
                        ${question}
                    </div>
                    <div class="chat-profile">
                        <img style="width: 50px; height: auto;" src="image/anu.png" alt="">
                    </div>

            </div>
            `
            )

        }
        if (rowCnt > 0) {
            $('.chat-container').append(
                `
                <div class="col-send-list">
                    <div class="chat-send">
                     <div class="chat-msg">
                     ${question}
                     </div>
                      <div class="chat-profile">
                        <img style="width: 50px; height: auto;" src="image/anu.png"" alt="">
                     </div>
                 </div>
                </div>
                `
            )
        }

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: "/send-message",
            async: true,
            // data: JSON.stringify({
            //     question: question
            // }),
            data: {
                question: question
            },
            method: 'POST',
            success: (success) => {
                resolve(success);
                console.log(success)
            },
            error: (err) => {
                reject(err)
                console.log(err)
            }
        })
        rowCnt++;
    })
}
function sendMessage()
{


    let eventSource = new EventSource('rec-message', {withCredentials: true});

    // if (eventSource.readyState !== 2) {
    //     $('.question_text').disable();
    // }

    if (eventSource.readyState == 2) {
        return;
    }

    eventSource.onopen = (ev) => {
        console.log("연결됨")
        console.log(ev);
    }
    eventSource.onmessage = event => {

        console.log(event);


    }
    let cnt = 0;
    let text = "";
    eventSource.addEventListener('thread.message.delta',function (data) {
        let d = JSON.parse(data.data);
        // console.log(d.delta.content[0].text.value);

        // console.log(qCnt);
        //
        if (rowCnt === 1) {
            $(".col-receive-list").append(
                ` <div class="chat-receive re-${rowCnt}">
                    <div class="chat-receive-profile">
                           <img style="width: 50px; height: 50px; border-radius: 50px" src="${location.href}image/park.jpg" alt="">

                    </div>
                    <div class="chat-receive-msg re-${rowCnt}">
                            ${text}
                    </div>

                </div>
            `);

            // qCnt++;
            rowCnt++;
        }

        if (rowCnt % 2 == 1) {
            $('.chat-container').append(
                `
                    <div class="col-receive-list">
                         <div class="chat-receive re-${rowCnt}">
                            <div class="chat-receive-profile">
                                   <img style="width: 50px; height: 50px; border-radius: 50px" src="${location.href}image/park.jpg" alt="">

                            </div>
                            <div class="chat-receive-msg re-${rowCnt}">
                                    ${text}
                            </div>

                        </div>
                    </div>
                `
            )
            rowCnt++;

        }
        // $('.chat-receive-msg').text += d.delta.content[0].text.value;
        // console.log(cnt)
        // console.log($(`.chat-receive-msg.re-${cnt-1}`))
        $(`.chat-receive-msg.re-${rowCnt-1}`).append(
            `${d.delta.content[0].text.value}`
        )

    })

    eventSource.onerror = error => {
        console.log(error)
    }

}

$(document).ready(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('#Capa_1').click(async function() {
        try {
            await sendQ();
            sendMessage();
        } catch (e) {
            console.log(e)
        }
    })
    $('.question_text').keypress(async function(event) {
        if (event.which == 13) {
            event.preventDefault();
            await sendQ();
            sendMessage();

        }
    })
})
