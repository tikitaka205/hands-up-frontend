window.onload = function(){
    review_list()
}

function review_list() {
    console.log('정보 불러오기 성공')

    $.ajax({
        type: 'GET',

        data: {},
        headers: {
        },

        url: `http://127.0.0.1:8000/review/list/3`,

        success: function (response) {
            console.log('성공:', response);
            if (response['results'].length > 0) {
                for (let i = 0; i < response['results'].length; i++) {
                    let author = response['results'][i]['author']
                    let content = response['results'][i]['content']
                    let created_at =response['results'][i]['created_at']
                    let bad_review_count =response['bad_review_count']
                    let soso_review_count =response['soso_review_count']
                    let good_review_count =response['good_review_count']
                    let excellent_review_count =response['excellent_review_count']
    
                    temp_html=`
                    <div class="col-lg-4 col-md-6 col-sm-8">
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                    <div class="toast-header">
                        <img src="/static/images/스테디배너.png" style="width: 30px; height: 30px;" class="rounded me-2" alt="...">
                        <strong class="me-auto" style="margin-left: 10px;">${author}</strong>
                        <small class="text-muted" style="margin-left: 10px;">${created_at}</small>
                    </div>
                    <div class="toast-body">
                    ${content}
                    </div>
                    </div>

                </div>
                `
                console.log("끝")
                $('#review_list').append(temp_html)
                $('#bad_score').text(`${bad_review_count}`)
                $('#soso_score').text(`${soso_review_count}`)
                $('#good_score').text(`${good_review_count}`)
                $('#excellent_score').text(`${excellent_review_count}`)
            }
            }

            // 
            


            }
            });
    }