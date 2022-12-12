const hostUrl = "http://127.0.0.1:8000"
const payload = JSON.parse(localStorage.getItem('payload', ''))
const DATE = new Date()
const url = new URL(`${window.location.href}`);
const CATEGORY = {
    '' : '',
    'all' : '',
    '디지털기기' : 'digital',
    '생활가전' : 'machine',
    '가구/인테리어' : 'inte',
    '생활/주방' : 'dinning',
    '유아' : 'baby',
    '여성 의류' : 'w-cloth',
    '남성 의류' : 'm-cloth',
    '스포츠' : 'sport',
    '반려동물 용품' : 'animal',
    '기타' : 'etc',
}


function searchAuction(){
    var keyword = document.getElementById('search-input').value;
    console.log(keyword)
    window.location.href = `/goods/index.html?search=${keyword}`
}