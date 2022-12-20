
$('#image').on("change", addFiles)


// date value 현재 날짜
let today = new Date()
let year = today.getFullYear()
let month = today.getMonth() + 1
let max_date = today.getDate() + 2
let min_date = today.getDate()



// let min_time= new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].split('.')[0];
// console.log(min_time)


// date_html = `<input class="inputdate" type ="date" id ="start" min ="${year}-${month}-${min_date}" max="${year}-${month}-${max_date}"/>
// <input class="inputtime" id="starttime" type="time" min="${min_time}" id="appt" name="appt" required style="margin-bottom: 20px;">`
// $('#date-time').append(date_html)

// //if 오늘 날짜면 시간 지금 시간 이전으로 못돌아 가게 한다.
// //할 수 있다면 시간도 20분 제약을 걸 수 있도록 해주면 좋다.
// //if 선택 날짜가 오늘 날짜와 같으면 (그럼 선택 날짜 값을 가져와야 한다...)
// //바로바로 안가져와지면 제출이 클릭 되었을때 체크..?

// document.getElementById('start').onblur = function(){
//     var val = this.value;
//     if( new Date(val) instanceof Date && val ){
//         if (val == new Date().get)
//     }else{
//         console.log('엘스값?')
//     }
// }





// 가격에 콤마를 찍는 함수
function getNumber(obj) {
    var num01;
    var num02;
    num01 = obj.value;
    num02 = num01.replace(/\D/g, "");
    num01 = setComma(num02);
    obj.value = num01;

    $('#test').text(num01);
}

function setComma(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    n += '';
    while (reg.test(n)) {
        n = n.replace(reg, '$1' + ',' + '$2');
    }
    return n;
}


var fileArr = [];

function addFiles(e) {

    $('#swiper-wrapper').empty();
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    if (fileArr.length > 6) {
        return alert('최대 6장 가능합니다') // 용량 등 유효성 검사 필요
    }
    var index = 0;
    filesArr.forEach(element => {
        if (!element.type.match("image.*")) {
            alert("이미지 확장자만 가능")
            return
        }

// 업로드 이미지 파일크기제한
        if (this.files && this.files[0]) {
                
            var maxSize = 10 * 1024 * 1024;
            var fileSize = this.files[0].size;

            if(fileSize > maxSize){
                alert("첨부파일 사이즈는 10MB 이내로 등록 가능합니다.");
                $(this).val('');
            }else{
                fileArr.push(element);
                var reader = new FileReader();
                reader.onload = function (e) {
        
                    var temp = `
                        <div class="p-3 col-4 m-0" id="img_id_${index}">
                            <div  style="position:relative">
                                <img style="box-shadow: 0 2px 5px 0px; border-radius:10px" src="${e.target.result}" data-file="${element.name}" alt="상품이미지"/>
                                <button style="position : absolute; border-radius : 5px; background-color: #ffda00; top : 0; right:15px; color :black; font-weight:700;" onclick="deleteImage(${index})">X</button>
                            </div>
                        </div>
                        `
                    $('#image-wrap').append(temp)
                    index++;
                }
                reader.readAsDataURL(element);
            }
        }
    });
}

function deleteImage(index) {
    console.log(fileArr)
    fileArr.splice(index, 1);
    $(`#img_id_${index}`).remove();
    console.log(fileArr)
}


function posthandle() {

    console.log('post작성 실행')
    const title = document.getElementById('title').value
    let category = $("select[name=category]").val()
    const dateControl = document.querySelector('input[type="date"]').value
    const timeControl = document.querySelector('input[type="time"]').value
    const content = document.getElementById('content').value
    let predict_price = document.getElementById('predictPrice').value
    let start_price = document.getElementById('startPrice').value


    predict_price = predict_price.replace(/,/g, "");
    start_price = start_price.replace(/,/g, "");

    let fd = new FormData()

    if (fileArr.length < 1) {
        alert('최소 하나 이상의 이미지를 포함해 주세요')
        return
    } else if (title == "") {
        alert('제목을 입력해주세요.')
        return
    } else if (category == "" || category == "카테고리") {
        alert('카테고리를 선택해주세요.')
        return
    } else if (predict_price == "") {
        alert('예상가격을 입력해주세요.')
        return
    } else if (start_price == "") {
        alert('시작가격을 입력해주세요.')
        return
    } else if (dateControl == "") {
        alert('날짜를 선택해주세요.')
        return
    } else if (timeControl == "") {
        alert('시간을 설정해주세요.')
        return
    } else if (content == "") {
        alert('본문을 입력해주세요.')
        return
    }
    for (var i = 0; i < fileArr.length; i++) {
        fd.append("images", fileArr[i]);
    }

    fd.append('title', title)
    fd.append('content', content)
    fd.append('category', category)
    fd.append('start_date', dateControl)
    fd.append('start_time', timeControl)
    fd.append('predict_price', predict_price)
    fd.append('start_price', start_price)


    $.ajax({
        type: 'POST',
        url: `${hostUrl}/goods/`,
        processData: false,
        contentType: false,
        data: fd,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
        },

        success: function (data) {
            console.log(data)

            window.location.href = `/goods/auction.html?goods=${data['id']}`
        },
        error: function (error) {
            alert('사진 용량 크기를 확인해 주세요. 1장에 최대 5MB 입니다.')
        },
    })
}


//시작 가격 입력시 알림창
function startPriceinput(){
    alert("가격은 변경이 불가합니다. 신중하게 입력해주세요.")
}


