const helloBoxT = document.getElementById('helloBoxT')
const helloBoxBtn = document.getElementById('helloBoxBtn')
const toTopBox = document.getElementById('toTopBox')
let isToTopClicked = false
// helloBoxT.innerHTML = 'Hi 晚上好'
let toTopIsShow = false

function getTime() {
    const h = new Date().getHours();
    let helloText = ''
    if (h >= 5 && h <= 8)
        helloText = 'Hi 早上好'
    else if (h >= 9 && h <= 11)
        helloText = 'Hi 上午好'
    else if (h >= 12 && h <= 13)
        helloText = 'Hi 中午好'
    else if (h >= 14 && h <= 18)
        helloText = 'Hi 下午好'
    else if (h >= 19)
        helloText = 'Hi 晚上好'
    else if (h <= 4)
        helloText = 'Hi 凌晨了，请注意休息~'
    helloBoxT.innerHTML = helloText
}

helloBoxBtn.onclick = () => {
    window.open('https://news.sina.cn/zt_d/yiqing0121', '_blank')
}

function isShowToTopBox(isShow) {
    if (isShow) {
        if (!toTopIsShow) {
            toTopBox.style.animation = 'showIn .3s'
        }
        toTopBox.style.opacity = '1'
        toTopIsShow = true
    } else {
        if (toTopIsShow) {
            toTopBox.style.animation = 'showOut .3s'
        }
        toTopBox.style.opacity = '0'
        toTopIsShow = false
    }
}

const toTopTimer = setInterval(() => {
    let distTop = document.documentElement.scrollTop || document.body.scrollTop
    if (distTop > 500) {
        isShowToTopBox(true)
    } else {
        isShowToTopBox(false)
    }
}, 60)

getTime()