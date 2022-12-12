const payload = JSON.parse(localStorage.getItem('payload', ''))


// function join_chat(goods_id) {
//     localStorage.setItem('goods_id',goods_id)
//     location.href='chat/index.html/'
//     } 받아와서 아래에서 사용


let goods_id=localStorage.getItem('goods_id')
console.log("start_chat", "user_id: ", payload["user_id"]);


// 로컬스토리지에서 goods id
// 그걸알아야하는데 경매창이나 내정보
// const roomName = JSON.parse(document.getElementById('roomName').textContent);
// 굿즈아이디를 담아서 보내주는데 그건 페이지 들어가서고
// 여기서는 페이지만 잘들어가게 해주면 된다 근데 그게 조건문
// 굿즈에서 받을때부터 구매자 판매자 누군지 저장해두자 그리고 여기서 들고오자 ajax이용말고


function review() {
    let user_id=localStorage.getItem('user_id')
    let seller_id=localStorage.getItem('seller_id')
    console.log("여기")
    window.location.href ='http://127.0.0.1:5501/review/seller.html'

    // if(user_id==seller_id){
    //     window.location.href ='http://127.0.0.1:5501/review/seller.html'
    // }else{
    //     window.location.href ='http://127.0.0.1:5501/review/buyer.html'
    // }
    }


hostUrl = '127.0.0.1:8000'
var chatSocket = new WebSocket(
    'ws://' + hostUrl +
    '/chat/' + `${goods_id}` + '/');

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
        'goods_id': `${goods_id}`,
        'message': message
    }));
    // 메세진 전송후 입력창에 빈값 넣어주기
    messageInputDom.value = '';
};

function get_chat_log() {
    let result
    $.ajax({
        type: 'GET',
        url: `http://${hostUrl}/chat/${goods_id}`,
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
    return result
}
