window.onload = function(){
    review_list()
    $("time.timeago").timeago();

}

function review_list() {
    console.log('정보 불러오기 성공')
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyMzk3MTU3LCJpYXQiOjE2NzA1OTcxNTcsImp0aSI6IjU4N2ZmYTU0NGIzZDQ3M2JiY2M4MDIwMjZiODY1OGRmIiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBob25lIjoiMDEwIn0.dSfcKBzQEvUSv-ATCaX6dfAvy3LutOJqsw4qZPfNmaI'
    $.ajax({
        type: 'GET',

        data: {},
        headers: {
            "Authorization": "Bearer " + accessToken,
            },

        url: `http://127.0.0.1:8000/review/list/2/`,

        success: function (response) {
            console.log('성공:', response);
            let profile_image =response['receiver']['profile_image']
            let bad_review_count =response['bad_review_count']
            let soso_review_count =response['soso_review_count']
            let good_review_count =response['good_review_count']
            let excellent_review_count =response['excellent_review_count']
            let username =response['receiver']['username']
            let temperature=response['receiver']['rating_score']
            let id=response['receiver']['id']
            let ratingColor = [['#686868', 'black'], ['#a0cfff', 'blue'], ['#ffe452', '#ff9623'], ['#ff6d92', '#e981ff']][parseInt(temperature / 25)]
            console.log(temperature)
            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {
                    let author = response['results'][i]['author']
                    let content = response['results'][i]['content']
                    let created_at =response['results'][i]['created_at']
                    let review_image=response['review_image'][i]
                    temp_html=`
                    <div class="col-lg-4 col-md-6 col-sm-8" style="margin-top: 10px;>
                        <div class="col-lg-4 col-md-6 col-sm-8">
                            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" >
                                <div class="toast-header">
                                    <img src="http://127.0.0.1:8000${review_image}" id="image2" style="width:30px;">
                                    <strong class="me-auto" style="margin-left: 10px;">${author}</strong>
                                    <small class="text-muted" style="margin-left: 10px;"><time class="timeago" datetime="${created_at}"></small>
                                </div>
                                <div class="toast-body">
                                    ${content}
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                $('#review_list').append(temp_html)
                        }
                }
                if(profile_image){
                    $('#profile_image').attr("src", `http://127.0.0.1:8000${profile_image}`)
                }
                console.log("끝")
                if(bad_review_count==0){
                    $('#bad_score').hide()
                }else{
                    $('#bad_score').text(`${bad_review_count}`)
                }
                if(soso_review_count==0){
                    $('#soso_score').hide()
                }else{
                    $('#soso_score').text(`${soso_review_count}`)
                }
                if(good_review_count==0){
                    $('#good_score').hide()
                }else{
                    $('#good_score').text(`${good_review_count}`)
                }
                if(excellent_review_count==0){
                    $('#excellent_score').hide()
                }else{
                    $('#excellent_score').text(`${excellent_review_count}`)
                }
                let temper=`
                <div>
                <div class="progress" max=100 style="--w:${temperature}%; --c1:${ratingColor[0]};--c2:${ratingColor[1]};"></div>
                <span class='text-secondary small'>매너점수</span> ${temperature}
                </div>
                <div onclick="">판매상품 보러가기</div>
                `
                $('#soso_score').text(`${soso_review_count}`)
                $('#good_score').text(`${good_review_count}`)
                $('#excellent_score').text(`${excellent_review_count}`)
                $('#username').text(`${username}`)
                $('#profile_image').text(`${profile_image}`)
                $('#temp').append(temper)
                    

                $("time.timeago").timeago();

            }
            });
    }