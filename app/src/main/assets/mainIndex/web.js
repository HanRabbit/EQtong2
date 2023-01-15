/* Cookies 常量 Key 的宏定义 */
const COOKIE_SIFT_INIT = 'SIFT_INIT'    // 筛选栏初始化标志位
const COOKIE_SIFT_PROV_JSON = 'SIFT_PROV'   // 筛选栏选中的省份 ( JSON )

virusJson = window.androidData.getVirusJson()

let virusJsonObj = JSON.parse(virusJson)
let ulCard = document.getElementById('cardListUL')
let ulCardNode = document.createDocumentFragment()
let selectProvBox = document.getElementById('selectorsUl')
let el = document.body

let listCardInner = ''
let newCard = null
let cards
let arrayUl = new Array()
let arrayProv = new Array()
let arrayProvSelected = new Array()

function writeFile(path, content) {
    let fso
    try {
        fso = new ActiveXObject("Scripting.FileSystemObject")
    } catch (e) {
        console.error("The Broswer cannot support 'FileSystemObject'")
        return
    }
    let f = fso.createtextfile(path, true)
    f.write(content)
}

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

    this.isShow = false
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

function injectProvBox(prov, index) {
    let provSelectBoxTemp = '<div class="selector-box">\n' +
        '                        <input class="selector" type="checkbox" id="checkProv'+ index +'">\n' +
        '                        <label for="checkProv'+ index +'" class="selector-t">' + prov + '</label>\n' +
        '                    </div>'
    return provSelectBoxTemp
}

function updateList() {
    /* 遍历获取 json 数据保存为对象数组
    *  使用 for 循环遍历以优化启动速度 */
    for (let ln = 0; ln < virusJsonObj.data.list.length; ln ++) {
        for (let cln = 0; cln < virusJsonObj.data.list[ln].city.length; cln ++) {
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

            // newCard = document.createElement('li')
            // newCard.innerHTML = injectListCard(virusData)
            // ulCard.append(newCard)
            arrayUl.push(virusData)
            // arrayUl[ln + cln] = virusData
        }
    }
}

function listAnimation() {
    if (!isToTopClicked) {
        cards = document.querySelectorAll('#vdBox')

        /* 使用 for 而不是 forEach 以优化性能 */
        for (let cn = 0; cn < cards.length; cn ++) {
            let card = cards[cn]
            const clientRect = card.getBoundingClientRect()
            const clientRectY = clientRect.y
            const winHeight = window.innerHeight
            if (clientRectY > winHeight * 2) {
                card.classList.remove('show')
            } else {
                card.classList.add('show')
            }
        }
    }
}

function getProvBoxById(id) {
    return document.getElementById('checkProv'+ id +'')
}

function siftListUpdate() {
    arrayUl.forEach((prov) => {
        if (arrayProv.findIndex((item) => {return item === prov.vdProvT}) === -1) {
            arrayProv.push(prov.vdProvT)
        }
    })
    arrayProv.forEach((prov, index) => {
        let provBox = document.createElement('li')
        provBox.innerHTML = injectProvBox(prov, index)
        selectProvBox.append(provBox)
    })
}

function setUlIShow(isShow) {
    /* 将arrayUl中的isShow重置 */
    arrayUl.forEach((item) => {item.isShow = isShow})
}

function setArrayProvSelected() {
    arrayProvSelected.length = 0    // 清空数组
    setUlIShow(false)
    /* 按下确定后，将checkbox中的数据存储到arrayProvSelected中 */
    arrayProv.forEach((prov, index) => {
        if (getProvBoxById(index).checked) {
            arrayProvSelected.push(prov)
        }
    })
    arrayUl.forEach((item) => {
        arrayProvSelected.forEach((prov) => {
            if (item.vdProvT === prov) {
                item.isShow = true
            }
        })
    })
    // console.log(arrayProvSelected)
    updateCards()
}

function cancelProvSelect() {
    arrayProvSelected.length = 0
    arrayProv.forEach((prov, index) => {
        arrayUl.forEach((item) => {
            if (item.isShow) {
                arrayProvSelected.push(prov)
                getProvBoxById(index).checked = true
            } else {
                getProvBoxById(index).checked = false
            }
        })
    })
}

function addHelloBox() {
    const helloBoxHTML = '<div class="hello-box">\n' +
        '                <div class="hello-box-t-box">\n' +
        '                    <p class="hello-box-t" id="helloBoxT">Hi ~</p>\n' +
        '                    <p class="hello-box-ft">关注疫情动态实时监测防控</p>\n' +
        '                    <button class="hello-box-btn" id="helloBoxBtn">查看详情</button>\n' +
        '                </div>\n' +
        '                <div class="hello-box-svg-box">\n' +
        '                    <svg class="hello-box-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="153" height="153" viewBox="0 0 153 153" fill="none"><defs><rect id="path_0" x="0" y="0" width="153" height="153" /><linearGradient id="linear_0" x1="50%" y1="100.122278%" x2="51%" y2="-0.0579832828%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.1" /><stop offset="1" stop-color="#D9E9FF" stop-opacity="1" /></linearGradient><linearGradient id="linear_1" x1="50.08438710000001%" y1="100%" x2="51.08438710000001%" y2="0.006494738150000001%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.1" /><stop offset="0.14" stop-color="#F8FBFF" stop-opacity="0.27" /><stop offset="0.37" stop-color="#EDF5FF" stop-opacity="0.52" /><stop offset="0.58" stop-color="#E4F0FF" stop-opacity="0.73" /><stop offset="0.76" stop-color="#DEECFF" stop-opacity="0.88" /><stop offset="0.91" stop-color="#DAEAFF" stop-opacity="0.97" /><stop offset="1" stop-color="#D9E9FF" stop-opacity="1" /></linearGradient><linearGradient id="linear_2" x1="50.004589499999994%" y1="99.9311993%" x2="51.004589499999994%" y2="-0.0811277354%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.1" /><stop offset="0.09" stop-color="#FEFEFF" stop-opacity="0.13" /><stop offset="0.23" stop-color="#FBFCFF" stop-opacity="0.21" /><stop offset="0.4" stop-color="#F5F9FF" stop-opacity="0.33" /><stop offset="0.59" stop-color="#EEF5FF" stop-opacity="0.51" /><stop offset="0.79" stop-color="#E4EFFF" stop-opacity="0.74" /><stop offset="1" stop-color="#D9E9FF" stop-opacity="1" /></linearGradient><linearGradient id="linear_3" x1="50%" y1="100%" x2="51%" y2="0%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.1" /><stop offset="0.13" stop-color="#FBFDFF" stop-opacity="0.19" /><stop offset="0.41" stop-color="#F1F7FF" stop-opacity="0.43" /><stop offset="0.81" stop-color="#E1EEFF" stop-opacity="0.82" /><stop offset="1" stop-color="#D9E9FF" stop-opacity="1" /></linearGradient><linearGradient id="linear_4" x1="36.9834497%" y1="54.10230930000001%" x2="26.4788126%" y2="33.1348898%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0" /><stop offset="1" stop-color="#C1DDFD" stop-opacity="0.4" /></linearGradient><linearGradient id="linear_5" x1="0%" y1="95.8519161%" x2="169.600204%" y2="95.8519161%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#F6FBFF" stop-opacity="0.4" /><stop offset="1" stop-color="#ACD2FA" stop-opacity="0.4" /></linearGradient><linearGradient id="linear_6" x1="34.4993212%" y1="50%" x2="71.9746699%" y2="46.8956483%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#EDF5FF" stop-opacity="0.4" /><stop offset="1" stop-color="#3396FB" stop-opacity="0.4" /></linearGradient><linearGradient id="linear_7" x1="64.7498302%" y1="54.5931784%" x2="35.2501698%" y2="45.4068216%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#D9E9FF" stop-opacity="0.4" /><stop offset="0.31" stop-color="#DFECFF" stop-opacity="0.4" /><stop offset="0.73" stop-color="#F0F6FF" stop-opacity="0.4" /><stop offset="1" stop-color="#FFFFFF" stop-opacity="0.4" /></linearGradient><linearGradient id="linear_8" x1="65.6073002%" y1="56.76471759999999%" x2="34.3612335%" y2="43.2352824%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#D9E9FF" stop-opacity="1" /><stop offset="0.31" stop-color="#DFECFF" stop-opacity="1" /><stop offset="0.73" stop-color="#F0F6FF" stop-opacity="1" /><stop offset="1" stop-color="#FFFFFF" stop-opacity="1" /></linearGradient><linearGradient id="linear_9" x1="65.6073002%" y1="56.76471759999999%" x2="34.3612335%" y2="43.2352824%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#D9E9FF" stop-opacity="1" /><stop offset="0.31" stop-color="#DFECFF" stop-opacity="1" /><stop offset="0.73" stop-color="#F0F6FF" stop-opacity="1" /><stop offset="1" stop-color="#FFFFFF" stop-opacity="1" /></linearGradient><linearGradient id="linear_10" x1="6.98906497%" y1="52.12387509999999%" x2="120.30992199999999%" y2="50%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#F5FBFF" stop-opacity="0.4" /><stop offset="1" stop-color="#89BEF8" stop-opacity="0.4" /></linearGradient><linearGradient id="linear_11" x1="24.2813054%" y1="50%" x2="100%" y2="50%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#EDF7FF" stop-opacity="0.4" /><stop offset="1" stop-color="#3396FB" stop-opacity="0.4" /></linearGradient><linearGradient id="linear_12" x1="64.7498302%" y1="58.83383400000001%" x2="35.2501698%" y2="41.166166%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#D9E9FF" stop-opacity="0.4" /><stop offset="0.31" stop-color="#DFECFF" stop-opacity="0.4" /><stop offset="0.73" stop-color="#F0F6FF" stop-opacity="0.4" /><stop offset="1" stop-color="#FFFFFF" stop-opacity="0.4" /></linearGradient><linearGradient id="linear_13" x1="65.6073002%" y1="60.909611600000005%" x2="34.3612335%" y2="39.0903884%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#D9E9FF" stop-opacity="0.4" /><stop offset="0.31" stop-color="#DFECFF" stop-opacity="0.4" /><stop offset="0.73" stop-color="#F0F6FF" stop-opacity="0.4" /><stop offset="1" stop-color="#FFFFFF" stop-opacity="0.4" /></linearGradient><linearGradient id="linear_14" x1="65.6073002%" y1="58.6782812%" x2="34.3612335%" y2="41.3217188%" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#D9E9FF" stop-opacity="0.4" /><stop offset="0.31" stop-color="#DFECFF" stop-opacity="0.4" /><stop offset="0.73" stop-color="#F0F6FF" stop-opacity="0.4" /><stop offset="1" stop-color="#FFFFFF" stop-opacity="0.4" /></linearGradient></defs><g opacity="1" transform="translate(0 0)  rotate(0 76.5 76.5)"><mask id="bg-mask-0" fill="white"><use xlink:href="#path_0"></use></mask><g mask="url(#bg-mask-0)" ><g opacity="1" transform="translate(0 0)  rotate(0 76.5 76.5)"><path id="路径 1" fill-rule="evenodd" style="fill:#FFFFFF" transform="translate(0 0)  rotate(0 76.5 76.5)" opacity="0" d="M0,153L153,153L153,0L0,0L0,153Z " /><path id="矩形" fill-rule="evenodd" style="fill:#F4F7F9" transform="translate(0 0)  rotate(0 76.5 76.5)" opacity="0" d="M0,153L153,153L153,0L0,0L0,153Z " /><path id="路径" fill-rule="evenodd" style="fill:#E4EFFF" transform="translate(26.4462890625 88.751953125)  rotate(0 2.16650390625 3.5859375)" opacity="1" d="M0,6.69L4.33,7.17L3.64,0L0,6.69Z " /><path id="路径" fill-rule="evenodd" style="fill:#F3F8FF" transform="translate(29.8828125 88.751953125)  rotate(0 2.2412109375 3.5859375)" opacity="1" d="M0.68,7.17L4.48,5.66L0,0L0.68,7.17Z " /><path id="路径" fill-rule="evenodd" style="fill:#E4EFFF" transform="translate(10.6083984375 90.544921875)  rotate(0 2.61474609375 4.55712890625)" opacity="1" d="M0,8.51L5.23,9.11L4.38,0L0,8.51Z " /><path id="路径" fill-rule="evenodd" style="fill:#F3F8FF" transform="translate(15.0908203125 90.544921875)  rotate(0 2.76416015625 4.55712890625)" opacity="1" d="M0.85,9.11L5.53,7.2L0,0L0.85,9.11Z " /><path id="路径" fill-rule="evenodd" style="fill:#E4EFFF" transform="translate(14.044921875 84.26953125)  rotate(0 4.78125 7.54541015625)" opacity="1" d="M0,14.15L9.56,15.09L8.14,0L0,14.15Z " /><path id="路径" fill-rule="evenodd" style="fill:#F3F8FF" transform="translate(21.9638671875 84.26953125)  rotate(0 5.00537109375 7.54541015625)" opacity="1" d="M1.42,15.09L10.01,11.86L0,0L1.42,15.09Z " /><path id="路径" fill-rule="evenodd" fill="url(#linear_0)" transform="translate(4.3330078125 46.01953125258635)  rotate(0 11.87841796875 6.4248047180719405)" opacity="1" d="M7.99,1.23C5.67,1.2 3.64,2.8 3.12,5.08C1.33,5.48 0.05,7.05 0,8.89C0.07,11.13 1.92,12.9 4.14,12.85L19.62,12.85C21.84,12.9 23.69,11.14 23.76,8.89C23.71,7.05 22.43,5.49 20.65,5.08C20.1,2.09 17.48,-0.05 14.47,0C12.86,-0.01 11.3,0.6 10.11,1.7C9.45,1.39 8.72,1.23 7.99,1.23Z " /><path id="路径" fill-rule="evenodd" fill="url(#linear_1)" transform="translate(96.22265625 26.14746092217036)  rotate(0 11.056640651402644 5.528320320164843)" opacity="1" d="M22.11,7.62C22.15,5.82 20.59,4.34 18.63,4.2C17.83,2.94 16.47,2.15 14.99,2.1C14.13,0.77 12.65,-0.03 11.08,0C9.81,-0.01 8.6,0.49 7.71,1.4C7.3,1.26 6.88,1.2 6.45,1.2C4.47,1.2 2.83,2.59 2.66,4.34C1.15,4.71 0.06,6.05 0,7.62C0,9.51 1.71,11.06 3.79,11.06L18.33,11.06C20.43,11.06 22.11,9.51 22.11,7.62Z " /><path id="路径" fill-rule="evenodd" fill="url(#linear_2)" transform="translate(107.2792969305489 17.929687468741896)  rotate(0 20.320312484749387 12.177253805600444)" opacity="1" d="M0.1,17.15C0.73,21.29 4.3,24.35 8.49,24.35L32.13,24.35C36.35,24.36 39.93,21.28 40.55,17.11C41.17,12.95 38.63,8.96 34.6,7.75L34.61,7.73C33.19,4.81 30.22,2.95 26.97,2.93C25.16,2.94 23.4,3.53 21.94,4.61C20.22,1.24 16.46,-0.57 12.75,0.16C9.03,0.9 6.25,4 5.94,7.77C1.94,9.03 -0.54,13.02 0.1,17.15Z " /><path id="椭圆形" fill-rule="evenodd" fill="url(#linear_3)" transform="translate(0 86.66015625)  rotate(0 76.5 24.205078125)" opacity="1" d="M76.5,0C34.25,0 0,10.84 0,24.21C0,37.57 34.25,48.41 76.5,48.41C118.75,48.41 153,37.57 153,24.21C153,10.84 118.75,0 76.5,0Z " /><g opacity="1" transform="translate(43.389142034361576 45.43784437888473)  rotate(0 44.35817854238953 45.73896264210058)"><path id="路径" fill-rule="evenodd" fill="url(#linear_4)" transform="translate(15.259643926575947 46.96062005177936)  rotate(0 36.72835657910156 22.258652616210938)" opacity="0.385356358" d="M33.58,1.21L0,0L22.79,44.52L73.46,28.21L44.65,7.8L33.58,1.21Z " /><path id="路径" fill-rule="evenodd" fill="url(#linear_5)" transform="translate(0 0)  rotate(0 6.691500753365935 5.630093228575196)" opacity="1" d="M7.63,0C-0.33,0 0,5.52 0,5.52L0,11.26L13.08,11.26C13.08,11.26 15.32,0 7.63,0Z " /><path id="路径" fill-rule="evenodd" fill="url(#linear_6)" transform="translate(7.328786533118894 0)  rotate(0 16.410108967417692 24.753424445323244)" opacity="1" d="M5.02,7.1C5.02,13.58 5.02,44.66 5.02,44.66C5.02,44.66 4.91,49.51 10.14,49.51C15.36,49.51 25.19,49.51 25.19,49.51L32.81,27.02L32.81,8.67C32.81,8.67 33.39,0 25.57,0C18.57,0 0,0 0,0C0,0 5.02,0.61 5.02,7.1Z " /><path id="矩形" fill-rule="evenodd" fill="url(#linear_7)" transform="translate(16.829009451966563 5.721177839572313)  rotate(0 9.279861486328125 1.6686061888183594)" opacity="1" d="M1.67,3.34L16.89,3.34C17.33,3.34 17.76,3.16 18.07,2.85C18.38,2.54 18.56,2.11 18.56,1.67L18.56,1.67C18.56,1.23 18.38,0.8 18.07,0.49C17.76,0.18 17.33,0 16.89,0L1.67,0C1.23,0 0.8,0.18 0.49,0.49C0.18,0.8 0,1.23 0,1.67L0,1.67C0,2.11 0.18,2.54 0.49,2.85C0.8,3.16 1.23,3.34 1.67,3.34Z " /><path id="矩形" fill-rule="evenodd" fill="url(#linear_8)" transform="translate(16.829009451966563 12.325551948263687)  rotate(0 6.676794163476562 1.6686061888183594)" opacity="1" d="M1.67,3.34L11.68,3.34C12.12,3.34 12.55,3.16 12.86,2.85C13.17,2.54 13.35,2.11 13.35,1.67L13.35,1.67C13.35,1.23 13.17,0.8 12.86,0.49C12.55,0.18 12.12,0 11.68,0L1.67,0C1.23,0 0.8,0.18 0.49,0.49C0.18,0.8 0,1.23 0,1.67L0,1.67C0,2.11 0.18,2.54 0.49,2.85C0.8,3.16 1.23,3.34 1.67,3.34Z " /><path id="矩形" fill-rule="evenodd" fill="url(#linear_9)" transform="translate(16.829009451966563 18.92992604201372)  rotate(0 6.676794163476562 1.6686061888183594)" opacity="1" d="M1.67,3.34L11.68,3.34C12.12,3.34 12.55,3.16 12.86,2.85C13.17,2.54 13.35,2.11 13.35,1.67L13.35,1.67C13.35,1.23 13.17,0.8 12.86,0.49C12.55,0.18 12.12,0 11.68,0L1.67,0C1.23,0 0.8,0.18 0.49,0.49C0.18,0.8 0,1.23 0,1.67L0,1.67C0,2.11 0.18,2.54 0.49,2.85C0.8,3.16 1.23,3.34 1.67,3.34Z " /><path id="路径" fill-rule="evenodd" fill="url(#linear_10)" transform="translate(19.437216439271253 26.198653179708998)  rotate(0 11.630465630859373 11.65409785546875)" opacity="1" d="M23.26,23.31L20.69,4.56C20.69,4.56 17.45,0 11.08,0C3.9,0 4.25,6.79 4.25,7.14C4.25,7.49 4.25,18.84 4.25,18.84C4.25,18.84 4.2,23.31 0,23.31L23.26,23.31Z " /><path id="路径" fill-rule="evenodd" fill="url(#linear_11)" transform="translate(30.589717690247817 26.198144160238797)  rotate(0 14.657573170898434 14.283089442352301)" opacity="1" d="M29.32,9.35C29.32,-0.23 19.97,0 19.97,0C19.97,0 9.59,0 0,0C8.45,0 7.93,7.48 7.93,7.48L7.93,28.57L29.32,28.57C29.32,28.57 29.32,18.93 29.32,9.35Z " /><path id="矩形" fill-rule="evenodd" fill="url(#linear_12)" transform="translate(42.6390837244275 32.81326198732613)  rotate(0 6.691500758056641 1.6686061888183594)" opacity="1" d="M1.67,3.34L11.71,3.34C12.15,3.34 12.58,3.16 12.89,2.85C13.2,2.54 13.38,2.11 13.38,1.67L13.38,1.67C13.38,1.23 13.2,0.8 12.89,0.49C12.58,0.18 12.15,0 11.71,0L1.67,0C1.23,0 0.8,0.18 0.49,0.49C0.18,0.8 0,1.23 0,1.67L0,1.67C0,2.11 0.18,2.54 0.49,2.85C0.8,3.16 1.23,3.34 1.67,3.34Z " /><path id="矩形" fill-rule="evenodd" fill="url(#linear_13)" transform="translate(42.6390837244275 39.41763593166216)  rotate(0 5.257607737939453 1.6686061888183594)" opacity="1" d="M1.67,3.34L8.85,3.34C9.29,3.34 9.72,3.16 10.03,2.85C10.34,2.54 10.52,2.11 10.52,1.67L10.52,1.67C10.52,1.23 10.34,0.8 10.03,0.49C9.72,0.18 9.29,0 8.85,0L1.67,0C1.23,0 0.8,0.18 0.49,0.49C0.18,0.8 0,1.23 0,1.67L0,1.67C0,2.11 0.18,2.54 0.49,2.85C0.8,3.16 1.23,3.34 1.67,3.34Z " /><path id="矩形" fill-rule="evenodd" fill="url(#linear_14)" transform="translate(42.6390837244275 46.02201002541213)  rotate(0 5.8948935205078135 1.6686061888183594)" opacity="1" d="M1.67,3.34L10.12,3.34C10.56,3.34 10.99,3.16 11.3,2.85C11.61,2.54 11.79,2.11 11.79,1.67L11.79,1.67C11.79,1.23 11.61,0.8 11.3,0.49C10.99,0.18 10.56,0 10.12,0L1.67,0C1.23,0 0.8,0.18 0.49,0.49C0.18,0.8 0,1.23 0,1.67L0,1.67C0,2.11 0.18,2.54 0.49,2.85C0.8,3.16 1.23,3.34 1.67,3.34Z " /></g><path id="路径" fill-rule="evenodd" style="fill:#E4EFFF" transform="translate(129.2431640625 90.544921875)  rotate(0 3.06298828125 4.78125)" opacity="1" d="M0,8L5.4,9.56L6.13,0L0,8Z " /><path id="路径" fill-rule="evenodd" style="fill:#F3F8FF" transform="translate(134.47265625 90.544921875)  rotate(0 2.61474609375 4.78125)" opacity="1" d="M0,9.56L5.23,8.43L0.72,0L0,9.56Z " /></g></g></g></svg>\n' +
        '                </div>\n' +
        '            </div>'
    return helloBoxHTML
}

function updateCards() {
    // ulCard.childNodes.forEach((node) => {
    //     node.remove()
    // })
    // console.log(ulCard.childNodes)
    ulCard.innerHTML = addHelloBox()
    arrayUl.forEach((item) => {
        if (item.isShow) {
            newCard = document.createElement('li')
            newCard.innerHTML = injectListCard(item)
            ulCard.append(newCard)
            console.log(item)
        }
    })
    getTime()
    listAnimation()
}

window.onload = () => {
    updateList()
    siftListUpdate()
    document.addEventListener('scroll', listAnimation)
    listAnimation()

    getProvBoxById(0).checked = true
    setArrayProvSelected()
}
