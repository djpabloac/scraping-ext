// Function que permite esperar por milésimas de segundos.
const wait = (milliseconds) => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve()
        }, milliseconds);
    })
}


// Function que permite scrollear indicado un selector.
const autoscrollToElement = async (cssSelector) => {
    const exists = document.querySelector(cssSelector)

    while (exists) {
        let maxScrollTop = document.body.clientHeight - window.innerHeight
        let elementScrollTop = document.querySelector(cssSelector).offsetHeight
        let currentScrollTop = window.scrollY

        if (maxScrollTop == currentScrollTop || elementScrollTop <= currentScrollTop)
            break

        await wait(32)

        let newScrollTop = Math.min(currentScrollTop + 20, maxScrollTop)

        window.scrollTo(0, newScrollTop)
    }

    return new Promise(function (resolve) {
        resolve()
    })
}

// Function que permite dibujar el div en la página.
const createPopup = () => {

    const styleDiv = 'position: fixed;z-index: 2000;width:100%; top: 0px;left: 0px;overflow: hidden;background-color: #e6e6e6;font-size: 10px;padding: 2px 10px;min-height: 52px;'
    const div = document.createElement('div')
    div.id = 'krowdy-profile-message'
    div.style = styleDiv

    const stylePre = 'position: relative;max-height: 400px;overflow: scroll;width: 100%;margin-top: 17px;'
    const pre = document.createElement('pre')
    pre.id = 'krowdy-profile-pre'
    pre.style = stylePre

    const bodyElement = document.querySelector('div.body')
    bodyElement.appendChild(div)

    pre.innerText = 'Estamos extrayendo la información!!!'
    div.appendChild(pre)

    return { div, pre }
}