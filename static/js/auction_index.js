'use strict';
const hostUrl = 'http://127.0.0.1:8000'
const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxNzUwMjc4LCJpYXQiOjE2Njk5NTAyNzgsImp0aSI6Ijc3NWZhYWJmNTAwMDQzNzc5YmJiMjQ4Zjg5ODJiMmNlIiwidXNlcl9pZCI6MiwidXNlcm5hbWUiOiJ0ZXN0IiwicGhvbmUiOiIwMTAxMjM0NTY3OCJ9.XhCjA_1O53IB3tZentC9KvBnPAyNc1aW8REsxUgZZDw'

let data_auction_list
$(document).ready(function () {
    console.log("접속")
    data_auction_list = get_auction_list()
});



function get_auction_list() {
    let temp_response
    $.ajax({
        type: "GET",
        url: `${hostUrl}/goods/`,
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
            "Authorization": "Bearer " + accessToken,
        },
        data: {},
        async: false,
        success: function (response) {
            console.log(response)
            let auction_list = response
            temp_response = auction_list

            for (let i = 0; i < auction_list.length; i++) {
                let price
                let auction_status = auction_list[i]['status']
                console.log(auction_list)
                if (auction_status == null) {
                    auction_status = "wait-auction";
                    price = `
                    <h5 id="start_price-${auction_list[i]['id']}">시작가 ${auction_list[i]["start_price"]}원</h5>
                    `
                } else if (auction_status == true) {
                    auction_status = "started-auction";
                    price = `
                    <h5 id="high_price-${auction_list[i]['id']}">현재가 ${auction_list[i]["high_price"]}원</h5>
                    `
                } else {
                    auction_status = "end-auction";
                    price = `
                    <h5 id="high_price-${auction_list[i]['id']}">현재가 ${auction_list[i]["high_price"]}원</h5>
                    `
                };

                let temp_html = `
                <div class="col-lg-3 col-md-4 col-sm-6 mix ${auction_status}">
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" data-setbg="static/images/stady_bear_face.png"
                            style="background-image: url(&quot;http://127.0.0.1:5500/static/images/stady_bear_face.png&quot;);">
                            <div style="position: absolute; right: 0px;">
                                <div class="btn btn-outline-danger" id="post-like" style="width: 80px; margin: 0 auto; padding: 3px; cursor: pointer; ">
                                    <i id="heart" class="far fa-heart"></i>
                                    <span id="like-num"></span>
                                </div>
                            </div>
                            <ul class="featured__item__pic__hover">
                                <p class="time-title-${auction_list[i]['id']}" style="background-color: aliceblue;"></p>
                                <div class="time-${auction_list[i]['id']} font40" style="background-color: aliceblue;">    
                                    <span class="minutes-${auction_list[i]['id']}"></span>
                                    <span>분</span>
                                    <span class="seconds-${auction_list[i]['id']}"></span>
                                    <span>초 남음</span>
                                </div>
                                <br>
                                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                                <li><a href="#"><i class="fa fa-shopping-cart"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div class="featured__item__text">
                            <h6><a href="#">${auction_list[i]['title']}</a></h6>
                            <h6>판매자: ${auction_list[i]["seller"]}</h6>
                            ${price}
                            
                            
                            
                        </div>
                    </div>
                </div>
                `
                $('#auction_list').append(temp_html)
                // remaindTime(auction_list[i]['id'], auction_list[i]['start_date'], auction_list[i]['start_time'])
                // remaindTime()
            }
        }
    })
    return temp_response
}

async function remaindTime() {

    for (let i = 0; i < data_auction_list.length; i++) {
        console.log(data_auction_list)
        let start_date = data_auction_list[i]["start_date"]
        let start_time = data_auction_list[i]["start_time"]
        let id = data_auction_list[i]["id"]
        let high_price = data_auction_list[i]["high_price"]
        let auction_status = data_auction_list[i]["status"]

        if ($(`p.time-title-${id}`).text() == "경매 종료") {
            $(`#start_price-${id}`).fadeOut();
            if (high_price == null) {
                $(`#high_price-${id}`).text("낙찰가: 미낙찰");
            } else {
                $(`#high_price-${id}`).text(`낙찰가: ${high_price}원`)
            }
            continue
        }


        var now = new Date();
        var open = new Date(start_date + 'T' + start_time);
        var end = new Date(start_date + 'T' + start_time);
        end.setMinutes(end.getMinutes() + 20);

        // console.log("now:", now)
        // console.log("open:", open)
        // console.log("end:", end)
        // console.log("id:", id)

        var nt = now.getTime();
        var ot = open.getTime();
        var et = end.getTime();
        let sec
        let day
        let hour
        let min

        if (nt < ot) {
            $(`.time-${id}`).fadeOut();
            $(`p.time-title-${id}`).html(start_date + " " + start_time + " 시작");
        } else if (nt > et || nt == et) {
            $(`p.time-title-${id}`).html("경매 종료");
            $(`.time-${id}`).fadeOut();
        } else {
            $(`.time-${id}`).fadeIn();
            // $(`p.time-title-${id}`).html("경매 남은 시간");
            sec = parseInt(et - nt)
            console.log("sec:", sec)
            sec = parseInt(et - nt) / 1000;
            console.log("sec:", sec)
            day = parseInt(sec / 60 / 60 / 24);
            sec = (sec - (day * 60 * 60 * 24));

            // hour = parseInt(sec / 60 / 60);
            // sec = (sec - (hour * 60 * 60));

            min = parseInt(sec / 60);
            sec = parseInt(sec - (min * 60));

            // if (hour < 10) { hour = "0" + hour; }
            if (min < 10) { min = "0" + min; }
            if (sec < 10) { sec = "0" + sec; }
            // $(`.hours-${id}`).html(hour);
            $(`.minutes-${id}`).html(min);
            $(`.seconds-${id}`).html(sec);
            $(`p.time-title-${id}`).html($(`.time-${id}`));
        }

        if (auction_status == true) {
            $(`#start_price-${id}`).fadeOut();
            if (high_price == null) {
                $(`#high_price-${id}`).text(`낙찰가: 진행중`)
            } else {
                $(`#high_price-${id}`).text(`낙찰가: ${high_price}원`)
            }

        }
    }
}
setInterval(remaindTime, 1000);


function goodsLike(goods_id) {
    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
            "Authorization": "Bearer " + accessToken,
        },

        url: `${hostUrl}/goods/${goods_id}/like/`,

        success: function (result) {
            if ($('#heart').hasClass('fas')) {
                $('#heart').attr('class', 'far fa-heart')
                var num = $('#like-num').text()
                $('#like-num').text(Number(num) - 1)
            } else {
                $('#heart').attr('class', 'fas fa-heart')
                var num = $('#like-num').text()
                $('#like-num').text(Number(num) + 1)

            }
        },
    });
}