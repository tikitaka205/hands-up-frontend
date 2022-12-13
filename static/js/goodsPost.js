   
$(document).ready(function(){
    console.log('이미지 준비되는 실행되는 함수')
    $('#image').on("change", addFiles)
    let today = new Date()
    console.log(today)
    let year = today.getFullYear()
    let month = today.getMonth()+1
    let max_date = today.getDate() + 2
    let min_date = today.getDate()

    // let hours = today.getHours(); // 시
    // let minutes = today.getMinutes();  // 분
    // let seconds = today.getSeconds();  // 초

    // console.log('시간',hours, minutes, seconds)


    date_html=`<input class="inputdate" type ="date" id ="start" min ="${year}-${month}-${min_date}" max="${year}-${month}-${max_date}"/>
    <input class="inputtime" id="starttime" type="time" id="appt" name="appt" required style="margin-bottom: 20px;">`
    $('#date-time').append(date_html) 
})

// 가격에 콤마를 찍는 함수
function getNumber(obj){
    var num01;
    var num02;
    num01 = obj.value;
    num02 = num01.replace(/\D/g,""); 
    num01 = setComma(num02);
    obj.value =  num01;

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



//document.getElementById("Date").setAttribute("max", today);

// date value 현재 날짜
document.getElementById('start').value = new Date().toISOString().substring(0,10);
let today = new Date()
let max_date = today.getDate() + 3
console.log(max_date)
document.getElementById('start').setAttribute("max", max_date)


//현재 시간
document.getElementById('starttime').value = new Date().toISOString().slice(11,16);


let fileTemArr =[]
let fileTemArrlen ;

function addFiles(e){
    console.log('이미지를 추가하는 함수')
    
    // let fileList = document.getElementById('fileList')
    // let files = e.target.files;
    // let fileArr = Array.prototype.slice.call(files);
    // console.log(fileTemArr,'filekdkfk')
    // let filesArrlen = fileArr.length;
    // fileTemArrlen = fileTemArr.length;

    // if (filesArrlen > 0){
    //     for (let i=0; i < filesArrlen; i++){
    //         let reader = new FileReader()
    //         // reader.onload = function(data){
    //         //     //이미지 태그 만들기
    //         //     let imgTag = document.createElement('img')

    //         //     imgTag.setAttribute('src', data.target.result)
    //         //     imgTag.setAttribute('width', '250')
    //         //     imgTag.setAttribute('height','150')

    //         //     fileList.appendChild(imgTag)
    //         // }
    //         reader.readAsDataURL(fileArr[i])
    //     }
    //     //for end
    // }else{
    //     fileList.innerHtml=""
    // }
    // for(let i =0; i<filesArrlen; i++){
    //     fileTemArr.push(fileArr[i])
    //     // $("#fileList").append("<div>" + fileArr[i].name + "<img class = 'deletebnt' src=\"/static/image/delete.png\" onclick=\"deleteFile(event, " + (fileTemArrlen+i)+ ");\"></div>");
    //     $("#fileList").append(`<div id=image_${i}>` +fileArr[i].name + "<img class = 'deletebnt' src=\"/static/images/delete.png\" onclick=\"deleteFile(event, " + i+ ");\"></div>");
    // }
}

function deleteFile(eventParam, orderParam){
    console.log('이미지를 삭제하는 함수')

    fileTemArr.splice(orderParam, 1);
    let innerHtmlTemp =""
    let filesArrlen = fileTemArr.length
    for(let i =0 ; i<filesArrlen; i++){
        innerHtmlTemp += `<div id=image_${i}>` + fileTemArr[i].name + "<img class = 'deletebnt' src=\"/static/image/delete.png\" onclick=\"deleteFile(event, " + i + ");\"></div>"  
    }
    $(`#image_${orderParam}`).remove()
   
    //지우는 함수 실행시 모든 이미지가 삭제되는 문제
}


function posthandle(){
    console.log('post작성 실행')
    const title = document.getElementById('title').value
    let category = $("select[name=category]").val()
    console.log(category)
    const dateControl = document.querySelector('input[type="date"]').value
    const timeControl = document.querySelector('input[type="time"]').value
    const content = document.getElementById('content').value
    const auction_room = 1

    let predict_price = document.getElementById('predictPrice').value
    let start_price = document.getElementById('startPrice').value

    console.log(predict_price)
    console.log(start_price)

    predict_price = predict_price.replace(/,/g,"");
    start_price = start_price.replace(/,/g,""); 

    console.log(predict_price)
    console.log(start_price)
    
    const trade_room=1
    let fd = new FormData()

    if(title == ""){
        alert('제목을 입력해주세요.')
        return 
    }else if(category =="" || category=="카테고리"){
        alert('카테고리를 선택해주세요.')
        return 
    }else if (predict_price == ""){
        alert('예상가격을 입력해주세요.')
        return 
    }else if(start_price==""){
        alert('시작가격을 입력해주세요.')
        return 
    }else if(dateControl == ""){
        alert('날짜를 선택해주세요.')
        return 
    }else if(timeControl ==""){
        alert('시간을 설정해주세요.')
        return 
    }else if(content == ""){
        alert('본문을 입력해주세요.')
        return 
    }


    // for(var i=0, fileTemArrlen = fileTemArr.length; i<fileTemArrlen; i++) {
    //     fd.append("files", fileTemArr[i]);
    // }

    // console.log(fileTemArr)
    
    console.log(dateControl, timeControl, auction_room, trade_room)

    fd.append('title', title)
    fd.append('category', category)
    fd.append('start_date', dateControl)
    fd.append('start_time', timeControl)
    fd.append('content', content)
    fd.append('auction_room', auction_room)
    fd.append('predict_price', predict_price)
    fd.append('start_price', start_price)
    fd.append('trade_room', trade_room)
    

   $.ajax({
        type:'POST',
        url :"http://127.0.0.1:8000/goods/",
        processData: false,
        contentType: false,
        data: fd,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access"),
          },
        
        success:function(data){
            console.log(data)
            // window.location.href = 'http://127.0.0.1:5500/post/post_data.html'
        },
        error: function(request, status, error){
            console.log(error)
        },
    })
}


