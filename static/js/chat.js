const payload = JSON.parse(localStorage.getItem('payload', ''))
console.log("start_chat", "user_id: ", payload["user_id"]);

// const roomName = JSON.parse(document.getElementById('roomName').textContent);
// hostUrl = '127.0.0.1:8000'

var backUrl = '127.0.0.1:8000'
var backEndUrl = 'http://127.0.0.1:8000'
var token = localStorage.getItem('access')


var chatSocket = new WebSocket(
    'ws://' + backUrl +
    '/chat/' + "2" + '/');

console.log(chatSocket)

chatSocket.onopen = function (e) {
    get_chat_log()
}


chatSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    let message = data['message'];
    let sender = data['sender_name']
    // console.log("onmessage: ", data)
    let temp_html
    if (sender == payload["username"]) {
        temp_html = `
            <div class="chat_message" style="float: right; bottom: 0px; float: right;" >
            <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
            </div>
        `
    } else {
        temp_html = `
            <div class="chat_message" style="background-color: rgb(183, 183, 183);">
            <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
            </div>
        `
    }
    $('#chatLog').append(temp_html)
    // document.querySelector('#chatLog').value += (sender + ": " + message + '\n');
    const top = $('#chatLog').prop('scrollHeight');
    $('#chatLog').scrollTop(top);
};

chatSocket.onclose = function (e) {
    console.log(e)
    console.error('Chat socket closed unexpectedly');
};


let chatLog = document.querySelector("#chatLog");
let chatMessageInput = document.querySelector("#chatMessageInput");
let chatMessageSend = document.querySelector("#chatMessageSend");

chatMessageInput.focus();
chatMessageInput.onkeyup = function (e) {
    if (e.keyCode === 13) {  // enter, return
        chatMessageSend.click();
    }
};

chatMessageSend.onclick = function (e) {
    const messageInputDom = chatMessageInput;
    const message = messageInputDom.value;

    chatSocket.send(JSON.stringify({
        'user_id': payload['user_id'],
        'goods_id': 2,
        'message': message
    }));
    // 메세진 전송후 입력창에 빈값 넣어주기
    messageInputDom.value = '';
};

function get_chat_log() {
    $.ajax({
        type: 'GET',
        url: `${backEndUrl}/chat/2`,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {
            // console.log(response)
            if (response['message'] != '입장') {
                return false
            }

            for (let i = 0; i < response['data'].length; i++) {
                let message = response['data'][i]['content'];
                let sender = response['data'][i]['author'];
                // console.log(message, sender)
                let temp_html
                if (response['data'][i]['author'] == payload["username"]) {
                    temp_html = `
                        <div class="chat_message" style="float: right; bottom: 0px; float: right;" >
                        <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
                        </div>
                    `
                } else {
                    temp_html = `
                        <div class="chat_message" style="background-color: rgb(183, 183, 183);">
                        <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
                        </div>
                    `
                }

                $('#chatLog').append(temp_html)
                // document.querySelector('#chatLog').value += (sender + ": " + message + '\n');
                const top = $('#chatLog').prop('scrollHeight');
                $('#chatLog').scrollTop(top);
            }
        }
    });
}