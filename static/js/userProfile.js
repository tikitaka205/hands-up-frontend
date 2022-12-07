window.onload = function (){
    console.log('userProfile 업로드시 실행되는 함수')
    userdata()
}


function userdata() {
    //userid필요
    const user_id = JSON.parse(localStorage.getItem('payload')).user_id
    console.log(user_id)

    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/user/${user_id}/`,
        data: {},

        success: function (response) {
            console.log(response['sell_goods'].length)
            for(let i =0 ; i < response['sell_goods'].length; i++){
                if (response['sell_goods'][i]['images'].length > 0){
                    let images = response['sell_goods'][i]['images'][0]
                    let title = response['sell_goods'][i]['title']
                    let predict_price = response['sell_goods'][i]['predict_price']
                    let start_price = response['sell_goods'][i]['star_price']

                    let temp_html = `
                    <div id="item" class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">     
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" 
                            style="background-image: url(http://127.0.0.1:8000${images['image']}); background-size: cover;">
                        </div>
                            <div class="featured__item__text">
                                <h6><a href="#">${title}</a></h6>
                                <h5>${predict_price}</h5>
                            </div>
                        </div>
                    </div>`
    
                    
                    $('#item').append(temp_html)

                }else{
                    let images = "https://w7.pngwing.com/pngs/703/554/png-transparent-camera-graphy-free-content-camera-camera-lens-rectangle-black.png"
                    let title = response['sell_goods'][i]['title']
                    let predict_price = response['sell_goods'][i]['predict_price']
                    let start_price = response['sell_goods'][i]['star_price']

                    let temp_html = `
                    <div id="item" class="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat">     
                    <div class="featured__item">
                        <div class="featured__item__pic set-bg" data-setbg="img/featured/feature-1.jpg"
                            style="background-image: url(${images}); background-size: cover;">
                        </div>
                            <div class="featured__item__text">
                                <h6><a href="#">${title}</a></h6>
                                <h5>${predict_price}</h5>
                            </div>
                        </div>
                    </div>`
    
                    
                    $('#item').append(temp_html)
                    
                }
            }
        }
    })
}