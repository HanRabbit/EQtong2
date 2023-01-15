const backBtn = document.getElementById('backBtn')
const pwdShowIcon = document.getElementById('pwdShowIcon')
const pwdHideIcon = document.getElementById('pwdHideIcon')

const inputPwd = document.getElementById('inputPwd')
const inputName = document.getElementById('inputName')
const loginBtn = document.getElementById('loginBtn')

const hPwd = document.getElementById('hPwd')

let pwdIsShow = false

function pwdShow(show) {
    if (show) {
        inputPwd.type = 'text'
        pwdHideIcon.style.visibility = 'hidden'
    } else {
        inputPwd.type = 'password'
        pwdHideIcon.style.visibility = 'inherit'
    }
}

window.onload = () => {
    pwdHideIcon.onclick = () => {
        pwdShow(pwdIsShow = true)
    }
    pwdShowIcon.onclick = () => {
        pwdShow(pwdIsShow = false)
    }
    backBtn.onclick = () => {
        window.androidDataM.switchAct('exit')
    }
}
