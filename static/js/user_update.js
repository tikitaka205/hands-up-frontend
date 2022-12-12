window.onload = function(){
    getInfo()
}
$(document).ready(function(){
    var fileTarget = $('.profile_image');

    fileTarget.on('change', function(){

      if(window.FileReader){
        var filename = $(this)[0].files[0].name;
      } 
      else {
        var filename = $(this).val().split('/').pop().split('\\').pop();  // 파일명만 추출
      }
      
      $(this).siblings('.upload-name').val(filename);
    });
  }); 

function getInfo(){
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyNjE1NDA4LCJpYXQiOjE2NzA4MTU0MDgsImp0aSI6IjRmMDEyOWQ3OGNiZTQzNTViYWUzZjJkYTYxYjk2YTU2IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBob25lIjoiMDEwIn0.F2pwJe9WR-zPBMMruSsv9gg2lsMHo0Iq2xcr0W4tXho'

    console.log('회원정보 가져오기')
    $.ajax({
        type: "GET",
        url: `http://127.0.0.1:8000/user/`,
        data: {},
        headers: {
            "Authorization": "Bearer " + accessToken,
        },
        success: function(response){
            let username = response['username']
            let profile_image = response['profile_image']

        $('#profile_image').attr('src', profile_image)
        $('#username').attr('value',username)
        $('#upload-name').attr('value', profile_image)
        console.log(username)
        console.log(response)
        console.log(profile_image)
        }
    })
}

function checkUsername(){
    var username = $('#username').val()
    console.log(username)
    if (!/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/.test(username)){
        $('#username-message').html('<span class="redfont">2자 이상 10자 이하의 영문, 한글, 숫지</span>')
        return
    }
    $('#username-message').empty()


    $.ajax({
    type: 'GET',

    data: {'username' : username},
    headers: {
        // "Authorization": "Bearer " + localStorage.getItem("access"),
    },

    url: `http://127.0.0.1:8000/user/check/`,

    success: function (result) {
        // 유저이름 안바꾸면 체크 안하게끔 해야한다.
        console.log(result)
        if(result['result'] === false || username==result['username']){ // 같은 이름의 유저가 없음
            // $('#username-message').empty()
            $('#username-message').html('<i class="fas fa-check" style="color:green">사용가능한 아이디 입니다.</i>')
            username_check = true
        }else{
            $('#username-message').html('<i class="fas fa-times" style="color:red">이미 사용 중인 아이디입니다.</i>')
        }
    },
});


}
$('#username').on('input', usernameChecker);
function usernameChecker(){
    username_check = false
    $('#username-message').html('<span class="redfont">중복체크를 해주세요.</span>')
}

// async function handleJoin() {
//     const username = document.getElementById("username").value
//     const password1 = document.getElementById("password1").value
//     const password2 = document.getElementById("password2").value

    
//     if( !is_auth || !username_check || password1 !== password2){
//         !is_auth? $('#phone-message').html('<span class="redfont">인증해 주세요!</span>') : $('#phone-message').html('감사합니다')
//         !username_check? $('#username-message').html('<span class="redfont">중복체크 해주세요!</span>') : $('#phone-message').text('감사합니다')
//         // !is_password? $('#password-1-message').html('<span class="redfont">8자 이상 16자 이하 영문, 숫자, 특수문자 하나 이상씩 포함</span>') : $('#username-message').html('<span class="redfont">사용가능한 비밀번호</span>')
//         password1 !==password2 || password1 === '' ? $('#password-1-message').html('<span class="redfont">비밀번호를 입력해 주세요.</span>') : is_password = true;
//         return false
//     }

//     const response = await fetch('http://127.0.0.1:8000/user/', {
//         headers: {
//             'content-type': 'application/json',
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             "phone": phoneNumber,
//             "username": username,
//             "password": password1
//         })
//     })
//     if(response.ok){
//         alert("회원정보 변경완료.")
//         window.location.href = "/user/login.html";
//     }else{
//         const response_json = await response.json()
//         (response_json);
//     }
// }

async function handleUpdate() {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcyNjE1NDA4LCJpYXQiOjE2NzA4MTU0MDgsImp0aSI6IjRmMDEyOWQ3OGNiZTQzNTViYWUzZjJkYTYxYjk2YTU2IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBob25lIjoiMDEwIn0.F2pwJe9WR-zPBMMruSsv9gg2lsMHo0Iq2xcr0W4tXho'
    let username = $("#username").val()
    console.log(username)
    let formFile = $("#profile_image")[0];
    console.log(formFile)
    
    let formData = new FormData();
    if (formFile.files.length === 0) {
    } else {
      formData.append("profile_image", formFile.files[0]);
    };
    formData.append("username", username)

    // if(!username_check){
    //     !username_check? $('#username-message').html('<span class="redfont">중복체크 해주세요!</span>') : $('#phone-message').text('감사합니다')
    //     // !is_password? $('#password-1-message').html('<span class="redfont">8자 이상 16자 이하 영문, 숫자, 특수문자 하나 이상씩 포함</span>') : $('#username-message').html('<span class="redfont">사용가능한 비밀번호</span>')
    //     return false
    // }
    $.ajax({

        type: "PUT",
        url: `http://127.0.0.1:8000/user/`,
        processData: false,
        contentType: false,
        data: formData,

        headers: {
          "Authorization": "Bearer " + accessToken,
        },

        success: function (result) {
        alert("회원정보 변경완료.", result);
        location.href='post_detail.html'
        },
        error : function(){
          alert("에러");
          }
        
        }
      );
    }

//     const response = await fetch('http://127.0.0.1:8000/user/', {
//         headers: {
//             'content-type': 'application/json',
//         },
//         method: 'PUT',
//         body: JSON.stringify({
//             "phone": phoneNumber,
//             "username": username,
//             "password": password1
//         })
//     })
//     if(response.ok){
//         alert("회원정보 변경완료.")
//         window.location.href = "/user/login.html";
//     }else{
//         const response_json = await response.json()
//         (response_json);
//     }
// }

// async function startTimer() {
//     let totalSecond = 300

//     let x = setInterval(function () {
//         let min = parseInt(totalSecond / 60)
//         let sec = totalSecond % 60

//         document.getElementById('auth-timer').innerHTML = min + ":" + sec;
//         totalSecond--;

//         if (totalSecond < 0) {
//             clearInterval(x);
//             document.getElementById('auth-timer').innerHTML = '<span style = "color : red">시간초과</span>';
//         }
//     }, 1000);
// }