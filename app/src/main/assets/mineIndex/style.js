const mSelect1 = document.getElementById('mSelect1')
const switchWindow = document.getElementById('swWindow')

window.onload = () => {
    mSelect1.onclick = () => {
        // alert('Jump!')
        window.open('../mainIndex/index.html', 'thisact')
        switchWindow.classList.remove('switch')
    }
    setTimeout(() => {
        switchWindow.classList.add('switch')
    }, 100)
}