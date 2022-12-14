const goodsId = url.searchParams.get('goods');
const backUrl = '127.0.0.1:8000';
const token = localStorage.getItem('access');

console.log("start_chat", "user_id: ", payload["username"]);

select_chat_roome()

if (goodsId != null) {
    const chatSocket = new WebSocket(
        'ws://' + backUrl +
        '/chat/' + goodsId + '/?token=' + token);

    chatSocket.onopen = function (e) {
        get_chat_log()
        // get_chat_other_user()
        // select_chat_roome()
        // wait_chat_message()
    }


    chatSocket.onmessage = function (e) {
        let data = JSON.parse(e.data);
        let message = data['message'];
        let sender = data['sender_name']
        let sender_image = data['sender_image']
        console.log("onmessage: ", data)
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
            send_checkMessage(data["goods_id"], data["sender"])
        }
        $('#chatLog').append(temp_html)
        // document.querySelector('#chatLog').value += (sender + ": " + message + '\n');
        const top = $('#chatLog').prop('scrollHeight');
        $('#chatLog').scrollTop(top);
        // wait_chat_message(goodsId)
    };

    chatSocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
    };


    // let chatLog = document.querySelector("#chatLog");
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
            'goods_id': `${goodsId}`,
            'message': message
        }));
        // 메세진 전송후 입력창에 빈값 넣어주기
        messageInputDom.value = '';
    };
}



function get_chat_log() {
    $.ajax({
        type: 'GET',
        url: `${hostUrl}/chat/${goodsId}/?token=${token}`,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {
            console.log(response)
            if (response['message'] != '입장') {
                return false
            }

            for (let i = 0; i < response['data'].length; i++) {
                let message = response['data'][i]['content'];
                let sender = response['data'][i]['author']['username'];
                let profile_image = response['data'][i]['author']['profile_image'];

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
                            <img src="${hostUrl}${profile_image}" style="width:30px; height:30;">
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
            let other_user = response["data"].find(e => e.author.username != payload["username"])
            console.log("test", other_user, other_user["author"]["id"])
            send_checkMessage(goodsId, other_user["author"]["id"])
        }
    });
}

function select_chat_roome() {
    $.ajax({
        type: "GET",
        url: `${hostUrl}/chat/list/?token=${token}`,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {
            console.log(response)
            for (let i = 0; i < response.length; i++) {
                let buyer = response[i]['buyer']['username']
                let seller = response[i]['seller']['username']
                let goods_id = response[i]["id"]
                if (payload['username'] == buyer) {
                    let temp_html = `
                        <div style="background-color: white">
                        <a href="javascript:get_chatSocket(${goods_id})">판매자: ${seller}</a>
                        <span id="wait-msg-${goods_id}"></span>
                        </div>
                    `
                    $("#chat-list").append(temp_html)
                } else if (payload['username'] == seller) {
                    let temp_html = `
                        <div style="background-color: green">
                        <a href="javascript:get_chatSocket(${goods_id})">구매자: ${buyer}</a>
                        <span id="wait-msg-${goods_id}"></span>
                        </div>
                    `
                    $("#chat-list").append(temp_html)
                    wait_chat_message(goods_id)
                }
                // wait_chat_message(goods_id)

            }

        },
    });
}

function get_chatSocket(goods_id) {
    let chatSocket = new WebSocket(
        'ws://' + backUrl +
        '/chat/' + goods_id + '/?token=' + token);
    window.location.href = `index.html?goods=${goods_id}`
    return chatSocket
}


function send_checkMessage(goods_id, user_id) {
    let is_read = "True"
    formdata = new FormData()
    formdata.append("is_read", is_read)

    $.ajax({
        type: "POST",
        url: `${hostUrl}/chat/${goods_id}/check_msg/${user_id}/`,
        processData: false,
        contentType: false,
        data: formdata,
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {

        },
    });
}

function wait_chat_message(trade_room_id) {

    $.ajax({
        type: "GET",
        // url: `${hostUrl}/chat/${goods_id}/check_msg/${user_id}/`,
        // url: `${hostUrl}/chat/${goodsId}/?token=${token}`,
        url: `${hostUrl}/chat/wait_msg/${trade_room_id}/?token=${token}`,
        processData: false,
        contentType: false,
        data: {},
        headers: {
            "Authorization": "Bearer " + token,
        },
        success: function (response) {
            console.log(response)
            // let count
            // for (let i = 0; i < response.length; i++) {
            //     if (response[i]["is_read"] === true) {
            //         count++
            //     }
            // }
            $(`#wait-msg-${trade_room_id}`).text(response.length)
            console.log("count", response.length)
        },
    });
}

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


// function get_chat_other_user() {
//     $.ajax({
//         type: 'GET',
//         url: `${hostUrl}/goods/${goodsId}/?token=${token}`,
//         data: {},
//         headers: {
//             "Authorization": "Bearer " + token,
//         },
//         success: function (response) {
//             console.log(response)
//             let seller = response["seller"]["username"]
//             let buyer = response["buyer"]["username"]
//             if (payload["username"] == buyer) {
//                 $('#chat-other-user').text(`${seller} 님과의 대화`)
//                 temp_html = `
//                     <button class="btn btn-success" id="review" onclick="location.href='/review/seller.html'"
//                     style="background-color: rgb(65, 166, 209); border-radius: 15px;">거래후기 작성</button>
//                 `
//             } else if (payload["username"] == seller) {
//                 $('#chat-other-user').text(`${buyer} 님과의 대화`)
//                 temp_html = `

//                     <button class="btn btn-success" id="review" onclick="location.href='/review/buyer.html'"
//                     style="background-color: rgb(65, 166, 209); border-radius: 15px;">거래후기 작성</button>
//                 `
//             }
//             $('#review-btn').html(temp_html)
//         }
//     });
// }