const payload = JSON.parse(localStorage.getItem('payload', ''))


// function join_chat(goods_id) {
//     localStorage.setItem('goods_id',goods_id)
//     location.href='chat/index.html/'
//     } 받아와서 아래에서 사용


// let goods_id = localStorage.getItem('goods_id')
let goods_id = 2;
console.log("start_chat", "user_id: ", payload["user_id"]);


// 로컬스토리지에서 goods id
// 그걸알아야하는데 경매창이나 내정보
// const roomName = JSON.parse(document.getElementById('roomName').textContent);

var backUrl = '127.0.0.1:8000'
var backEndUrl = 'http://127.0.0.1:8000'
var token = localStorage.getItem('access')


function review() {
    let user_id = localStorage.getItem('user_id')
    let seller_id = localStorage.getItem('seller_id')
    console.log("여기")
    window.location.href = 'http://127.0.0.1:5501/review/seller.html'

    // if(user_id==seller_id){
    //     window.location.href ='http://127.0.0.1:5501/review/seller.html'
    // }else{
    //     window.location.href ='http://127.0.0.1:5501/review/buyer.html'
    // }
}


hostUrl = '127.0.0.1:8000'
var chatSocket = new WebSocket(
    'ws://' + backUrl +
    '/chat/' + goods_id + '/?token=' + token);

console.log(chatSocket)

chatSocket.onopen = function (e) {
    get_chat_other_user()
    get_chat_log()
}


chatSocket.onmessage = function (e) {
    let data = JSON.parse(e.data);
    let message = data['message'];
    let sender = data['sender_name']
    let sender_image = data['sender_image']
    console.log("onmessage: ", sender_image)
    let temp_html
    if (sender == payload["username"]) {
        temp_html = `
        <div class="chat_message_wrap" style="align-items: flex-end;">
            <div class="chat_message" style="float: right; bottom: 0px;" >
            <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
            </div>
        </div>
        `
    } else {
        temp_html = `
        <div class="chat_message_wrap" style="align-items: flex-start;">
            <div style="display: flex; flex-direction: row;">    
                <img src="http://127.0.0.1:8000/media/default.jpeg" style="width:30px; height:30;">
                <span style="margin-left: 5px; font-weight: bolder;">${sender}</span>
            </div>
            <div class="chat_message" style="background-color: rgb(183, 183, 183);">
            <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
            </div>
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
    $.ajax({
        type: 'GET',
        url: `${backEndUrl}/chat/${goods_id}/?token=${token}`,
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
                let sender = response['data'][i]['author']['username'];
                let profile_image = response['data'][i]['author']['profile_image'];
                console.log(profile_image)
                // console.log(message, sender)
                let temp_html
                if (sender == payload["username"]) {
                    temp_html = `
                    <div class="chat_message_wrap" style="align-items: flex-end;">
                        <div class="chat_message" style="float: right; bottom: 0px;" >
                        <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
                        </div>
                    </div>
                    `
                } else {
                    temp_html = `
                    <div class="chat_message_wrap" style="align-items: flex-start;">
                        <div style="display: flex; flex-direction: row;">    
                            <img src="${backEndUrl}${profile_image}" style="width:30px; height:30;">
                            <span style="margin-left: 5px; font-weight: bolder;">${sender}</span>
                        </div>
                        <div class="chat_message" style="background-color: rgb(183, 183, 183);">
                        <div style=" margin: 5px 20px 5px 20px;"> ${message} </div>
                        </div>
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

function get_chat_other_user() {
    $.ajax({
        type: 'GET',
        url: `${backEndUrl}/goods/${goods_id}/?token=${token}`,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {
            console.log(response)
            let seller = response["seller"]["username"]
            let buyer = response["buyer"]["username"]
            if (payload["username"] == buyer) {
                $('#chat-other-user').text(`${seller} 님과의 대화`)
                temp_html = `
                    <button class="btn btn-success" id="review" onclick="location.href='/review/seller.html'" 
                    style="background-color: rgb(65, 166, 209); border-radius: 15px;">거래후기 작성</button>
                `
            } else if (payload["username"] == seller) {
                $('#chat-other-user').text(`${buyer} 님과의 대화`)
                temp_html = `
                    
                    <button class="btn btn-success" id="review" onclick="location.href='/review/buyer.html'" 
                    style="background-color: rgb(65, 166, 209); border-radius: 15px;">거래후기 작성</button>
                `
            }
            $('#review-btn').html(temp_html)
        }
    });
}