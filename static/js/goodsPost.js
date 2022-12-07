   
$(document).ready(function(){
    console.log('이미지 준비되는 실행되는 함수')
    $('#image').on("change", addFiles)
})

let fileTemArr =[]
let fileTemArrlen ;

function addFiles(e){
    console.log('이미지를 추가하는 함수')
    let fileList = document.getElementById('fileList')
    let files = e.target.files;
    let fileArr = Array.prototype.slice.call(files);
    console.log(fileArr)
    let filesArrlen = fileArr.length;
    fileTemArrlen = fileTemArr.length;

    if (filesArrlen > 0){
        for (let i=0; i < filesArrlen; i++){
            let reader = new FileReader()
            reader.onload = function(data){
                //이미지 태그 만들기
                let imgTag = document.createElement('img')

                imgTag.setAttribute('src', data.target.result)
                imgTag.setAttribute('width', '250')
                imgTag.setAttribute('height','150')

                fileList.appendChild(imgTag)
            }
            reader.readAsDataURL(fileArr[i])
        }
        //for end
    }else{
        fileList.innerHtml=""
    }


    for(let i =0; i<filesArrlen; i++){
        fileTemArr.push(fileArr[i])
        // $("#fileList").append("<div>" + fileArr[i].name + "<img class = 'deletebnt' src=\"/static/image/delete.png\" onclick=\"deleteFile(event, " + (fileTemArrlen+i)+ ");\"></div>");
        $("#fileList").append("<div>" +"http://127.0.0.1:5501/"+fileArr[i].name + "<img class = 'deletebnt' src=\"/static/image/delete.png\" onclick=\"deleteFile(event, " + (fileTemArrlen+i)+ ");\"></div>");
    }
}

function deleteFile(eventParam, orderParam){
    console.log('이미지를 삭제하는 함수')
    fileTemArr.splice(orderParam, 1);
    let innerHtmlTemp =""
    let filesArrlen = fileTemArr.length
    for(let i =0 ; i<filesArrlen; i++){
        innerHtmlTemp += "<div>" + fileTemArr[i].name + "<img class = 'deletebnt' src=\"/static/image/delete.png\" onclick=\"deleteFile(event, " + i + ");\"></div>" 
    }
    $("#fileList").html(innerHtmlTemp);
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
    const predict_price = document.getElementById('predict_price').value
    const start_price = document.getElementById('start_price').value
    const trade_room=1
    let fd = new FormData()


    for(var i=0, fileTemArrlen = fileTemArr.length; i<fileTemArrlen; i++) {
        fd.append("files", fileTemArr[i]);
    }

    console.log(fileTemArr)
    
    fd.append('title', title)
    fd.append('category', category)
    fd.append('dateControl', dateControl)
    fd.append('timeControl', timeControl)
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


