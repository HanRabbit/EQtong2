let helloBoxT = document.getElementById('helloBoxT')

const toTopBox = document.getElementById('toTopBox')
const bgFilter = document.getElementById('bgFilter')
const selectBox = document.getElementById('selectBox')
const selectBoxBtn = document.getElementById('selectBoxBtn')
const titleBarBox = document.getElementById('titleBarBox')
const cancelBtn = document.getElementById('cancelBtn')
const okBtn = document.getElementById('okBtn')

const select1 = document.getElementById('select1')

const switchWindowMain = document.getElementById('switchWindowMain')

let isToTopClicked = false
// helloBoxT.innerHTML = 'Hi 晚上好'
let toTopIsShow = false

let isSelectorShow = false
let isSelectorClicked = false

function getTime() {
    helloBoxT = document.getElementById('helloBoxT')
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

function showSelector(isShow) {
    if (isShow) {
        selectBox.classList.add('show')
        bgFilter.classList.add('black')
        titleBarBox.classList.add('light')
        document.body.style.overflowY = 'hidden'
        isSelectorShow = true
    } else {
        selectBox.classList.remove('show')
        bgFilter.classList.remove('black')
        titleBarBox.classList.remove('light')
        document.body.style.overflowY = 'inherit'
        isSelectorShow = false
    }
}

function selectorSwitch() {
    if (!isSelectorShow) {
        showSelector(true)
    } else {
        showSelector(false)
    }
}

selectBoxBtn.onclick = () => {
    isSelectorClicked = true
    selectorSwitch()
    setTimeout(() => {
        isSelectorClicked = false
        clearTimeout(this)
    }, 20)
}

cancelBtn.onclick = () => {
    cancelProvSelect()
    showSelector(false)
}

okBtn.onclick = () => {
    arrayProvSelected.length = 0
    arrayProv.forEach((prov, index) => {
        if (document.getElementById('checkProv'+ index +'').checked) {
            arrayProvSelected.push(prov)
        }
    })
    setArrayProvSelected()
    showSelector(false)
}

titleBarBox.onclick = () => {
    if (isSelectorShow && !isSelectorClicked) {
        showSelector(false)
    }
}

bgFilter.onclick = () => {
    showSelector(false)
}

select1.onclick = () => {
    switchWindowMain.classList.remove('slideOff')
    setTimeout(() => {
        window.open('../mineIndex/index.html', 'thisact')
        // window.androidData.switchAct(ACTIVITY_MINE);
    }, 100)
}

// setTimeout(() => {
//     const helloBoxBtn = document.getElementById('helloBoxBtn')
//     helloBoxBtn.onclick = () => {
//         setTimeout(() => {
//             window.open('https://news.sina.cn/zt_d/yiqing0121', 'thisact2')
//         }, 400)
//     }
// }, 600)

window.onload = () => {
    getTime()
    
    
}

setTimeout(() => {
        switchWindowMain.classList.add('slideOff')  
}, 100)
