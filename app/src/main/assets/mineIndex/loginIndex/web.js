const pb = document.getElementById('Pb')
const userDataForm = document.getElementById('userDataForm')

const GIT_URL = 'https://api.github.com/repos/HanRabbit/EQtong2-Origin/contents/server?ref=master'
let serverURL = ''

function getServerURL() {
    let Http = new XMLHttpRequest()
    Http.open('GET', GIT_URL, true)
    Http.send()

    Http.onreadystatechange = (e) => {
        if (Http.readyState === 4 && Http.status === 200) {
            let resJson = JSON.parse(Http.responseText)
            serverURL = window.atob(resJson['content'])
        }
    }
}

loginBtn.onclick = () => {
    let name = inputName.value
    pb.classList.add('run')
    loginBtn.classList.add('switch-to-pb')
    getServerURL()
    setTimeout(() => {
        hPwd.value = hex_sha1(inputPwd.value)
        userDataForm.action = serverURL + '/login'
        userDataForm.submit()
        setTimeout(() => {
            window.open('./index.html')
        }, 2400)
    }, 2000)

    // if (name !== '' && pwd !== '') {
    //     const url = 'http://192.168.1.8:3000/login?name=' + name + '&password=' + pwd
    //     Http.open('post', url)
    //     Http.send()
    //     Http.onreadystatechange = (e) => {
    //         // alert(this.status)
    //         if (this.status === 200) {
    //             alert(Http.responseText)
    //         }
    //     }
    // }
}