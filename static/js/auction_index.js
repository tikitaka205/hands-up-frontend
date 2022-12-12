let data_auction_list
$(document).ready(function () {
    console.log("접속")
    data_auction_list = get_auction_list()
});


const listEnd = document.getElementById('endList');
const option = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    thredhold: 0,
}
const onIntersect = (entries, observer) => { 
    console.log(entries, observer)
    // entries는 IntersectionObserverEntry 객체의 리스트로 배열 형식을 반환합니다.
    entries.forEach(entry => {
        if(entry.isIntersecting){
            get_auction_list()
            console.log('ddd')
        }
    });
};

const observer = new IntersectionObserver(onIntersect, option);
observer.observe(listEnd);


var nowPage = 1
var category = ''
var goodsStatus = ''
var isNull = ''
var search = url.searchParams.get('search')
var search = search === null || search === undefined? search ='': search = search


function get_auction_list() {
    let temp_response
    $.ajax({
        type: "GET",
        url: `${hostUrl}/goods/?page=${nowPage}&category=${category}&status=${goodsStatus}&search=${search}`,
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
        },
        data: {},
        async: false,
        success: function (response) {
            // console.log(response)
            let auction_list = response
            temp_response = auction_list

            for (let i = 0; i < auction_list.length; i++) {
                // console.log(auction_list)
                let price
                let banner
                let high_price
                let participants
                let auction_status = auction_list[i]['status']
                let image = auction_list[i]['images']?.image
                let time = auction_list[i]['start_time'].slice(0,2) + '시' + ' ' +  auction_list[i]['start_time'].slice(3,)+'분'
                let startTime = auction_list[i]['start_date'].split('-').slice(1,).join('/') + ' ' + time + ' 오픈!'

                var now = new Date();
                var open = new Date(auction_list[i]['start_date'] + 'T' + auction_list[i]['start_time']);

                open.setMinutes(open.getMinutes() + 20);
                let rt = open - now
                rt = parseInt(rt/(1000*60))


                if (auction_status == null) {
                    auction_status = "wait-auction";
                    banner = `<span style="padding : 4px; border-radius:10px; background-color:#78d7ff; color:black;">${startTime}<span>`
                    participants = ``
                    price = `
                    <div>
                        <span style="font-size : 20px; font-weight:700;">
                            ${auction_list[i]["start_price"]} 원
                        </span>
                        <span class="font-secondary" style="font-size:12px">
                            (시작가)
                        </span>
                    </div>
                    `
                    
                } else if (auction_status == true) {
                    auction_status = "started-auction";
                    high_price = auction_list[i]["high_price"] === 0? auction_list[i]['start_price'] +'원': auction_list[i]["high_price"] + '원';
                    banner = `<span style="padding : 4px; border-radius:10px;background-color:#ffd700; color:black;">경매 ${rt}분 남았어요!<span>`
                    participants = `
                    <div style="background-color:black; border-radius : 10px; padding:3px;">
                        <i class="fas fa-eye"></i>
                        <span class="font-secondary">
                            ${auction_list[i]['participants_count']}
                            참여중
                        </span>
                    </div>
                        
                    `
                    
                    price = `
                    <div>
                        <span style="font-size : 19px; font-weight:700;">
                            ${high_price}
                        </span>
                        <span class="font-secondary" style="font-size:12px">
                            (현재가)
                        </span>
                    </div>
                    `
                } else {
                    auction_status = "end-auction";
                    high_price = auction_list[i]["high_price"] === 0? '미낙찰' : auction_list[i]["high_price"] + '원';
                    banner = `<span style="padding : 4px; border-radius:10px;background-color:gray; color:white;">경매종료<span>`
                    participants = ``
                    price = `
                    <h5 id="high_price-${auction_list[i]['id']}">
                        <span style="font-size : 19px; font-weight:700;">
                            ${high_price}
                        </span>
                        <span class="font-secondary" style="font-size:12px">
                            (낙찰가)
                        </span>
                    </h5>
                    `
                    
                };

                let temp_html_is_like = `
                <div class="col-lg-3 col-md-4 col-sm-6 mix ${auction_status}">
                    <div class="featured__item">
                        <div id="img" class="featured__item__pic set-bg"
                            style="background-image: url(http://127.0.0.1:8000${image}); ">
                            <div style="position: absolute; right: 0px;">
                                <div onclick="goodsLike(${goods_id})" class="btn btn-outline-danger" id="post-like" style="width: 30px; height:30px; margin: 0 auto; padding: 3px; cursor: pointer; ">
                                    <i id="heart-${goods_id}" class="fas fa-heart"></i>
                                    <span id="like-num"></span>
                                </div>
                            </div style="display:flex; justify-content: center;">
                                <p class="time-title-${goods_id}" style="margin-top:200px; background-color: skyblue; text-align: center; font-size: 20px; border-radius:10px;"></p>
                                <div class="time-${goods_id} font40" style="background-color: skyblue; text-align: center; font-size: 20px; color:black; margin-top:200px; border-radius:10px;" id="min">    
                                    <span class="minutes-${goods_id}"></span>
                                    <span>분</span>
                                    <span class="seconds-${goods_id}"></span>
                                    <span>초 남음</span>
                                </div>
                        </div>
                        <div class="featured__item__text">
                            <h6><a href="#">${auction_list[i]['title']}</a></h6>
                            <h6>판매자: ${auction_list[i]["seller"]["username"]}</h6>
                            ${price}
                        </div>
                    </div>
                </div>
                `
                let temp_html = `
                <div class="col-lg-3 col-md-4 col-sm-6 mix ${auction_status}"  style="margin-bottom : 50px">
                    <div class="featured__item" style="">
                        <div id="img" class="featured__item__pic set-bg"
                            style="background-image: url(http://127.0.0.1:8000${image}); border-radius:15px 15px 0 0;">
                            <div style="position: absolute; right: 5px; bottom:5px;">
                                <div class="" id="post-like" style="width: 30px; margin: 0 auto; padding: 3px; cursor: pointer;" onclick="alert('직었다')">
                                    <i id="heart" class="far fa-heart" style="color : #ffcaca; font-size : 25px"></i>
                                    <span id="like-num"></span>
                                </div>
                            </div>
                            <div style="position: absolute; left: 5px; top:10px;">
                                ${banner}
                            </div>
                            <div style="position: absolute; left: 10px; bottom:10px; font-size: 15px; color : white;">
                                ${participants}
                            </div>
                        </div>
                        <div class="" style="background-color : white; padding : 5px 15px 10px; border-radius:0 0 15px 15px; cursor:pointer;" onclick="window.location.href='/goods/auction.html?goods=${auction_list[i]['id']}'">
                            <span style="font-size:17px; font-weight : 700;">${auction_list[i]['title']}</span>
                            ${price}
                        </div>
                    </div>
                </div>
                `
                if (is_like) {
                    $('#auction_list').append(temp_html_is_like)
                } else {
                    $('#auction_list').append(temp_html)
                }
                // remaindTime(auction_list[i]['id'], auction_list[i]['start_date'], auction_list[i]['start_time'])
                // remaindTime()

            }
            console.log(search, '나 서치', !search)
            if(search){
                
                $('#search-result').text(`"${search}"에 대한 결과`)
                $('#search-result').show()

            }


            nowPage += 1
        },
        error : function(error){
            var temp = `
            <div class="text-center">
                <span style="font-size:25px; color:white;">원하시는 경매는 이게 전부에요 &#128517;</span>
                <button class="btn btn-primary m-3">내가 경매 올리기</button>
            </div>
            `
            $('#endList').html(temp)
        }
    })
    return temp_response
}


function filter(c='', gs='', sr=''){
    var prevCategory = CATEGORY[category]
    var prevStatus = goodsStatus
    // var nowStatus = 
    if(sr !== ''){
        nowPage = 1
        search = sr
        category = '';
        gs = '';
        $('#auction_list').empty()
    }else if (c !== ''){
        nowPage = 1;
        c!== 'all' ? category=c : category=''
        search = '';
        $('#auction_list').empty()
        $(`#ct-${prevCategory}`).removeClass('active')
        $(`#ct-${CATEGORY[c]}`).addClass('active')
    }else if (gs !== ''){
        nowPage = 1
        gs !=='all'?goodsStatus = gs: goodsStatus=''
        $('#auction_list').empty()
        $(`#st-${prevStatus}`).removeClass('active')
        $(`#st-${goodsStatus}`).addClass('active')

    }
    get_auction_list()
}



async function remaindTime() {

    for (let i = 0; i < data_auction_list.length; i++) {
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
                $(`#high_price-${id}`).text(`경매 진행중`)
            } else {
                $(`#high_price-${id}`).text(`낙찰가: ${high_price}원`)
            }

        }
    }
}
// setInterval(remaindTime, 1000);


function goodsLike(goods_id) {
    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            // "Authorization": "Bearer " + localStorage.getItem("access"),
            // "Authorization": "Bearer " + accessToken,
            "Authorization": "Bearer " + token,
        },

        url: `${hostUrl}/goods/like/${goods_id}/`,
        // document
        success: function () {
            if ($(`#heart-${goods_id}`).hasClass('fas')) {
                $(`#heart-${goods_id}`).attr('class', 'far fa-heart')

            } else {
                $(`#heart-${goods_id}`).attr('class', 'fas fa-heart')

            }
        },
    });
}