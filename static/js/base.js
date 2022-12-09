const hostUrl = "http://127.0.0.1:8000"
const goods = JSON.parse(localStorage.getItem('handsup', ''))
const payload = JSON.parse(localStorage.getItem('payload', ''))
const DATE = new Date()
const url = new URL(`${window.location.href}`);

if (!goods) {
    localStorage.setItem('goods', JSON.stringify({}));
}



