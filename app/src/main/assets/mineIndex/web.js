const UPDATE_ID = 87509126
let APP_VERSION = ''
let APP_LOG = ''

const GET_UPDATE_API_URL = 'https://api.github.com/repos/hanrabbit/eqtong2/releases'

const Http = new XMLHttpRequest()

let updateDataJson = null
let needUpdate = false;
let newVersion = null
let curVersion = null

function getUpdateData() {
    Http.open('GET', GET_UPDATE_API_URL)
    Http.send()

    Http.onload = (e) => {
        parseJson()
        updateDataJson.forEach((item) => {
            if (item.id === UPDATE_ID) {
                APP_VERSION = item.tag_name
                APP_LOG = item.body
            }
        })
        newVersion = updateDataJson[0].tag_name
        needUpdate = updateDataJson[0].id !== UPDATE_ID
        if (needUpdate) {
            showMsg('有新版本需要更新', APP_VERSION + '<span style="color: #383838"> -> </span> ' + '<span style="color: #2A82E4">' + newVersion +'</span>', updateDataJson[0].body, true)
        } else {
            showMsg('已是最新版本', APP_VERSION, APP_LOG, false)
        }
    }
}

function parseJson() {
    updateDataJson = JSON.parse(Http.responseText)
}

window.onload = () => {
    getUpdateData()
}
