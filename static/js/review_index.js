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
                $('#bad_score').text(`${bad_review_count}`)
                $('#soso_score').text(`${soso_review_count}`)
                $('#good_score').text(`${good_review_count}`)
                $('#excellent_score').text(`${excellent_review_count}`)
                $('#username').text(`${username}`)
                $('#profile_image').text(`${profile_image}`)
                $("time.timeago").timeago();

            }
            });
    }