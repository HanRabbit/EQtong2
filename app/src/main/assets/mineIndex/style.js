const ACTIVITY_ABOUT = 'about'
const ACTIVITY_LOGIN = 'login'

const mSelect1 = document.getElementById('mSelect1')
const switchWindow = document.getElementById('swWindow')

const aboutBtn = document.getElementById('aboutBtn')
const checkUpdateBtn = document.getElementById('checkUpdateBtn')

const msgBox = document.getElementById('msgBoxContent')
const msgContent   = document.getElementById('msgT')
const msgFT  = document.getElementById('msgFt')
const msgLog = document.getElementById('msgLog')
// const msgContent = document.getElementById('contentMsg')
const msgCancel = document.getElementById('msgCancel')
const msgConfirm = document.getElementById('msgConfirm')
const msgBoxBefore = document.getElementById('msgBox')

const mineLoginBtn = document.getElementById('mineLoginBtn')

const bgFilter = document.getElementById('bgFilter')


function showMsg(content, ver, log, np) {
    msgBoxBefore.style.visibility = 'inherit'
    msgBox.classList.remove('showOut')
    msgBox.classList.add('showIn')
    msgConfirm.disabled = !np;
    msgContent.innerHTML = content
    msgFT.innerHTML = ver
    msgLog.innerHTML = log
    bgFilter.classList.add('black')
    window.androidData.setNavColor(230, 230, 230)
    // if (version !== null) {
    // } else {
    //     msgFT.innerHTML = ''
    // }
}

function outMsg() {
    msgBox.classList.add('showOut')
    bgFilter.classList.remove('black')
    // msgBoxBefore.style.width = '0'
    setTimeout(() => {msgBoxBefore.style.visibility = 'hidden'}, 300)
    window.androidData.setNavColor(255, 255, 255)
    // msgBox.classList.remove('showIn')
}

window.onload = () => {
    mSelect1.onclick = () => {
        // alert('Jump!')
        window.open('../mainIndex/index.html', 'thisact')
        switchWindow.classList.remove('switch')
    }

    aboutBtn.onclick = () => {
        window.androidData.switchAct(ACTIVITY_ABOUT)
    }

    checkUpdateBtn.onclick = () => {
        getUpdateData()
    }

    msgCancel.onclick = () => {
        setTimeout(() => {
            outMsg()
        }, 100)
    }

    msgConfirm.onclick = () => {
        window.androidData.downloadAPK(updateDataJson[0].assets[0].browser_download_url)
    }

    mineLoginBtn.onclick = () => {
        window.androidData.switchAct(ACTIVITY_LOGIN)
    }

    setTimeout(() => {
        switchWindow.classList.add('switch')
    }, 100)
}