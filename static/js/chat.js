const payload = JSON.parse(localStorage.getItem('payload', ''))
console.log("start_chat", "user_id: ", payload["user_id"]);

// const roomName = JSON.parse(document.getElementById('roomName').textContent);

hostUrl = '127.0.0.1:8000'
var chatSocket = new WebSocket(
    'ws://' + hostUrl +
    '/chat/' + "1" + '/');

console.log(chatSocket)

chatSocket.onopen = function (e) {
    let result = get_chat_log()
    console.log("result: ", result)
}


chatSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    let message = data['message'];
    let sender = data['sender_name']
    console.log("onmessage: ", data)
    // 
    document.querySelector('#chatLog').value += (sender + ": " + message + '\n');
    //
    // $('#chatLog').value +=
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
        'goods_id': 1,
        'message': message
    }));
    // 메세진 전송후 입력창에 빈값 넣어주기
    messageInputDom.value = '';
};

function get_chat_log() {
    let result
    $.ajax({
        type: 'GET',
        url: `http://${hostUrl}/chat/1`,
        data: {},
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        success: function (response) {
            console.log(response)
            if (response['message'] != '입장') {
                result = false
                return false
            }
            result = true
            for (let i = 0; i < response['data'].length; i++) {
                let message = response['data'][i]['content'];
                let sender = response['data'][i]['author'];
                console.log(message, sender)
// 
                document.querySelector('#chatLog').value += (sender + ": " + message + '\n');
                const top = $('#chatLog').prop('scrollHeight');
                $('#chatLog').scrollTop(top);
            }
        }
    });
    return result
}