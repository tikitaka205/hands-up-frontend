const goodsId = url.searchParams.get('goods');
// const token = localStorage.getItem('access');

console.log(payload["username"])
console.log("start_chat", "user_id: ", payload["user_id"]);

console.log(goodsId)
select_chat_roome()
// window.onload = function () {
//     $("time.timeago").timeago();
// }

if (goodsId != null) {
    const chatSocket = new WebSocket(
        'ws://' + backUrl +
        '/ws/chat/' + goodsId + '/?token=' + token);

    console.log(chatSocket)

    chatSocket.onopen = function (e) {
        get_chat_log()
        // wait_chat_message(goodsId)
        select_chat_roome()
        // get_chat_other_user()
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
                    <img src="/media/default.jpeg" style="width:30px; height:30;">
                    <span style="margin-left: 5px; font-weight: bolder;">${sender}</span>
                </div>
                <div class="chat_message" style="background-color: #d6cdcd;">
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
        select_chat_roome()
    };

    chatSocket.onclose = function (e) {
        console.log(e)
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
        if (message === '') {
            return
        }
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
            send_checkMessage(goodsId, other_user["author"]["id"])
            // wait_chat_message(goodsId)
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
            console.log("룸정보", response)
            $("#chat-list").empty()
            for (let i = 0; i < response.length; i++) {
                let buyer = response[i]['buyer']['username']
                let seller = response[i]['seller']['username']
                let goods_id = response[i]["id"]
                let created_at = response[i]["created_at"]
                let title = response[i]['title']
                let auction_image
                let buyer_profile_img = response[i]['buyer']['profile_image']
                let seller_profile_img = response[i]['seller']['profile_image']
                console.log(created_at)
                try {
                    if (response[i]['images']["image"]) {
                        auction_image = response[i]['images']["image"]
                    }
                } catch (err) {
                    auction_image = `/media/goods/cat-7347316__340.jpg`
                }

                if (payload['username'] == buyer) {
                    let temp_html = `
                    <div class="chat-list">
                        <div class=" col-9 p-0" style="background-color: #FFFFFF; border-radius: 10px 0 0 10px; cursor : pointer;" onclick="getChatRoom(${goods_id})" >
                            <div class="row m-0 p-0" >
                                <div class="col-sm-3 p-2">
                                    <img class="" src="${buyer_profile_img}" id="image2"
                                        style="width:30px; border-radius:500px;">
                                </div>
                                <span class="col-sm-9 p-1" style="font-size: 20px; font-weight: bold;">
                                    ${seller}
                                    <span style="font-size: 5px;">(<time class="timeago" datetime="${created_at}"></time>)</span>
                                </span>
                            </div>
                            <div class="p-2">
                                <div class=""
                                    style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                                    ${title}
                                </div>
                            </div>
                        </div>
                        <div class="col-3 m-0 p-0" style="border-radius: 10px 0 0 10px;">
                        <img src="${hostUrl}${auction_image}" alt="" style="border-radius: 0 10px 10px 0;width: 100%; height: 100%; object-fit: cover;">
                            <span
                                style="text-align: center; background-color: #ff0000; width: 20px; height: 20px; border-radius: 50px; position: absolute; right: 20px; top: 8px; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-family: inherit; position: absolute; right: 5px; top: 5px;"
                                id="wait-msg-${goods_id}">
                                
                            </span>
                        </div>
                    </div>
                    `
                    $("#chat-list").append(temp_html)
                    // wait_chat_message(goods_id)
                } else if (payload['username'] == seller) {
                    let temp_html = `
                    <div class="chat-list">
                        <div class=" col-9 p-0" style="background-color: #FFFFFF; border-radius: 10px 0 0 10px; cursor : pointer;" onclick="getChatRoom(${goods_id})" >
                            <div class="row m-0 p-0" >
                                <div class="col-sm-3 p-2">
                                    <img class="" src="${seller_profile_img}" id="image2"
                                        style="width:30px; border-radius:500px;">
                                </div>
                                <span class="col-sm-9 p-1" style="font-size: 20px; font-weight: bold;">
                                    ${buyer}
                                    <span style="font-size: 5px;">(<time class="timeago" datetime="${created_at}"></time>)</span>
                                </span>
                                
                            </div>
                            <div class="p-2">
                                <div class=""
                                    style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                                    <span style="font-size: 15px">${title}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 m-0 p-0" style="border-radius: 10px 0 0 10px;">
                            <img src="${hostUrl}${auction_image}" alt="" style="border-radius: 0 10px 10px 0;width: 100%; height: 100%; object-fit: cover;">
                            <span
                                style="text-align: center; background-color: #ff0000; width: 20px; height: 20px; border-radius: 50px; position: absolute; right: 20px; top: 8px; z-index: 99; color: rgb(255, 255, 255); font-weight: bold; font-family: inherit; position: absolute; right: 5px; top: 5px;"
                                id="wait-msg-${goods_id}">
                                
                            </span>
                        </div>
                    </div>
                    `
                    $("#chat-list").append(temp_html)
                    // wait_chat_message(goods_id)
                }
                wait_chat_message(goods_id)
            }
            $("time.timeago").timeago();
        },
    });
}

function getChatRoom(goods_id) {
    window.location.href = `index.html?goods=${goods_id}`
    return
}

function review() {

    $.ajax({
        type: 'GET',
        url: `${hostUrl}/goods/${goodsId}`,
        data: {},
        success: function (response) {
            console.log("review get: ", response)
            let user_id = payload['user_id']
            let seller_id = response['seller']['id']
            if (user_id == seller_id) {
                window.location.href = `/review/seller.html?goods_id=${goodsId}`
            } else {
                window.location.href = `/review/buyer.html?goods_id=${goodsId}`
            }
        },
    });


    // let user_id = payload['user_id']
    // let seller_id = localStorage.getItem('seller_id')
    // console.log("여기")
    // window.location.href = `/review/seller.html?goods_id=${goodsId}`

    // if (user_id == seller_id) {
    //     window.location.href = 'http://127.0.0.1:5500/review/seller.html'
    // } else {
    //     window.location.href = 'http://127.0.0.1:5500/review/buyer.html'
    // }
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