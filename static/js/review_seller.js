$(document).ready(function(){

 });

function selectScore(score_1){
    console.log(score_1)
    const score = score_1;
    console.log(score)

    if(score==-20){
        let temp_bad = `
        <div class="col-lg-6" style="text-align: center; background-color: rgb(255, 255, 255);">
        <div class="col-lg-12" style="background-color:#ffffff">

                    <div class="col-lg-12">
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:inherit"> 설명과 너무 다른 물건이에요 </label><br>
                    </div>
                    <div class="col-lg-12">
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:inherit">연락이 없어요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:inherit">일방적으로 거래를 거부해요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:inherit">시간 약속을 여러번 바꿨어요</label><br>
                    </div>
                </div>
            </div>
            <div class="col-lg-6" style="text-align: center; background-color: rgb(255, 255, 255);">

                <div class="col-lg-12" style="background-color:#ffffff">

                    <div class="col-lg-12">
                        <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:inherit">정말 친절해요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:inherit">물건상태가 정말 좋아요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:inherit">네고를 해줬어요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:inherit">질문에 대답을 잘 해줬어요</label><br>
                    </div>
                </div>
            </div>
    </div>
        `

        $('#check_list').empty()
        $('#check_list').append(temp_bad)
        console.log("최악")

    } else{
        let temp_good=`
        <div class="col-lg-6" style="text-align: center; background-color: rgb(255, 255, 255);">
        <div class="col-lg-12" style="background-color:#ffffff">

                    <div class="col-lg-12">
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined1" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-2-outlined1" style="width:inherit">제가 있는 곳까지 와주셨어요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined2" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-2-outlined2" style="width:inherit">답장이 빨라요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined3" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-2-outlined3" style="width:inherit">네고를 해줬어요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input name="animal" type="checkbox" class="col-lg-12 btn-check" id="btn-check-2-outlined4" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-2-outlined4" style="width:inherit">시간 약속을 잘 지켰어요</label><br>
                    </div>
                </div>
            </div>
            <div class="col-lg-6" style="text-align: center; background-color: rgb(255, 255, 255);">

                <div class="col-lg-12" style="background-color:#ffffff">

                    <div class="col-lg-12">
                        <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-3-outlined" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-3-outlined" style="width:inherit">정말 친절해요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-4-outlined" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-4-outlined" style="width:inherit">물건상태가 정말 좋아요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-5-outlined" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-5-outlined" style="width:inherit">네고를 해줬어요</label><br>
                    </div>
                    <div class="col-lg-12">
                        <input type="checkbox" class="col-lg-12 btn-check" id="btn-check-6-outlined" autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btn-check-6-outlined" style="width:inherit">질문에 대답을 잘 해줬어요</label><br>
                    </div>
                </div>
            </div>
    </div>
        `
        $('#check_list').empty()
        $('#check_list').append(temp_good)
        console.log("좋아요")

    }



}




function reviewCreate(){

}

