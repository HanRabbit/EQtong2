// let virusJson = window.androidData.getVirusJson()

let virusJsonObj = JSON.parse(virusJson)
let ulCard = document.getElementById('cardListUL')
let ulCardNode = document.createDocumentFragment()
let el = document.body

let listCardInner = ''
let newCard = null
let cards

    function VirusData() {
    this.vdRegionT = null        // 地区
    this.vdProvT = null          // 所在省份
    this.vdListSDT1 = '累计确诊'
    this.vdListSDD1 = null       // 病例数

    this.vdListSDT2 = '本土无症状'
    this.vdListSDD2 = null       // 病例数

    this.vdListSDT3 = '累计死亡'
    this.vdListSDD3 = null       // 病例数

    this.vdListSDT4 = '当前确诊'
    this.vdListSDD4 = null       // 病例数

    this.vdListSDT5 = '零增加天数'
    this.vdListSDD5 = null       // 天数

    this.vdListSDT6 = '累计治愈'
    this.vdListSDD6 = null       // 病例数

    this.cityCode = null
    this.time = null
}

function injectListCard(data) {
    if (data.vdListSDD2 === null || data.vdListSDD2 === '') {
        data.vdListSDD2 = '暂无数据'
    }
    listCardInner = '<div class="vd-box" id="vdBox">\n' +
        '                    <div class="vd-region-box">\n' +
        '                        <p class="vd-region-t" id="vdRegionT">'+ data.vdRegionT +'</p>\n' +
        '                        <div class="vd-prov-box">\n' +
        '                            <p class="vd-prov-t" id="vdProvT">'+ data.vdProvT +'</p>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="br-line"></div>\n' +
        '                    <div class="vd-list-box">\n' +
        '                        <div class="vd-list-s-d-box" style="background-color: rgba(255, 87, 51, 0.2)">\n' +
        '                            <p class="vd-list-s-d-t" id="vdListSDT1" style="color: rgba(255, 87, 51, 1)">'+ data.vdListSDT1 +'</p>\n' +
        '                            <p class="vd-list-s-d-d" id="vdListSDD1" style="color: rgba(255, 87, 51, 1)">'+ data.vdListSDD1 +'</p>\n' +
        '                        </div>\n' +
        '                        <div class="vd-list-s-d-box" style="background-color: rgba(42, 130, 228, 0.2)">\n' +
        '                            <p class="vd-list-s-d-t" id="vdListSDT2" style="color: rgba(42, 130, 228, 1)">'+ data.vdListSDT2 +'</p>\n' +
        '                            <p class="vd-list-s-d-d" id="vdListSDD2" style="color: rgba(42, 130, 228, 1)">'+ data.vdListSDD2 +'</p>\n' +
        '                        </div>\n' +
        '                        <div class="vd-list-s-d-box" style="background-color: rgba(230, 230, 230, 1)">\n' +
        '                            <p class="vd-list-s-d-t" id="vdListSDT3">'+ data.vdListSDT3 +'</p>\n' +
        '                            <p class="vd-list-s-d-d" id="vdListSDD3">'+ data.vdListSDD3 +'</p>\n' +
        '                        </div>\n' +
        '                        <div class="vd-list-s-d-box"  style="background-color: rgba(255, 87, 51, 0.1)">\n' +
        '                            <p class="vd-list-s-d-t" id="vdListSDT4" style="color: rgba(255, 87, 51, 1)">'+ data.vdListSDT4 +'</p>\n' +
        '                            <p class="vd-list-s-d-d" id="vdListSDD4" style="color: rgba(255, 87, 51, 1)">'+ data.vdListSDD4 +'</p>\n' +
        '                        </div>\n' +
        '                        <div class="vd-list-s-d-box" style="background-color: rgba(121, 72, 234, 0.1)">\n' +
        '                            <p class="vd-list-s-d-t" id="vdListSDT5" style="color: rgba(121, 72, 234, 1)">'+ data.vdListSDT5 +'</p>\n' +
        '                            <p class="vd-list-s-d-d" id="vdListSDD5" style="color: rgba(121, 72, 234, 1)">'+ data.vdListSDD5 +'</p>\n' +
        '                        </div>\n' +
        '                        <div class="vd-list-s-d-box" style="background-color: rgba(0, 186, 173, 0.2)">\n' +
        '                            <p class="vd-list-s-d-t" id="vdListSDT6" style="color: rgba(0, 186, 173, 1)">'+ data.vdListSDT6 +'</p>\n' +
        '                            <p class="vd-list-s-d-d" id="vdListSDD6" style="color: rgba(0, 186, 173, 1)">'+ data.vdListSDD6 +'</p>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                    <div class="vd-other-box">\n' +
        '                        <p class="vd-city-code">'+ data.cityCode +'</p>\n' +
        '                        <p class="vd-time">'+ data.time +'</p>\n' +
        '                    </div>\n' +
        '                </div>'
    // alert(data.vdRegionT)
    return listCardInner
}

function updateList() {
    let arrayUl = new Array()
    /* 遍历获取 json 数据保存为对象数组 */
    for (let ln in virusJsonObj.data.list) {
        for (let cln in virusJsonObj.data.list[ln].city) {
            let virusData = new VirusData()

            virusData.vdRegionT = virusJsonObj.data.list[ln].city[cln].name
            virusData.vdProvT = virusJsonObj.data.list[ln].name
            virusData.vdListSDD1 = virusJsonObj.data.list[ln].city[cln].conNum
            virusData.vdListSDD2 = virusJsonObj.data.list[ln].city[cln].asymptomNum
            virusData.vdListSDD3 = virusJsonObj.data.list[ln].city[cln].deathNum
            virusData.vdListSDD4 = virusJsonObj.data.list[ln].city[cln].econNum
            virusData.vdListSDD5 = virusJsonObj.data.list[ln].city[cln].zerodays
            virusData.vdListSDD6 = virusJsonObj.data.list[ln].city[cln].cureNum
            virusData.cityCode = virusJsonObj.data.list[ln].city[cln].citycode
            virusData.time = virusJsonObj.data.times
            // console.log(VirusData)

            newCard = document.createElement('li')
            newCard.innerHTML = injectListCard(virusData)
            ulCard.append(newCard)

            arrayUl.push(virusData)
            // arrayUl[ln + cln] = virusData
        }
    }
    console.log(arrayUl)
}

function listAnimation() {
    if (!isToTopClicked) {
        cards = document.querySelectorAll('#vdBox')
        cards.forEach((card) => {
            const clientRect = card.getBoundingClientRect()
            const clientRectY = clientRect.y
            const winHeight = window.innerHeight
            if (clientRectY > winHeight * 2) {
                card.classList.remove('show')
            } else {
                card.classList.add('show')
            }
            // console.log(clientRect)
        })
    }
}

window.onload = () => {
    updateList()
    document.addEventListener('scroll', listAnimation)
    listAnimation()
}
