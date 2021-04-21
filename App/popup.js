let btnstrap = document.getElementById('btnstrap')
let txtstrap = document.getElementById('txtstrap')
let btnprofile = document.getElementById('btnprofile')

btnstrap.addEventListener('click', async () => {
    searchText = txtstrap.value

    if (searchText){
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

        if (tab){
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: [`./Scrap/background.js`]
            })

            window.close();
            
        } else {
            const pAlert = document.getElementById('alert')
            pAlert.innerText = 'No se tiene permiso para los tabs.'
            txtstrap.focus()
        }
    } else {
        const pAlert = document.getElementById('alert')
        pAlert.innerText = 'Coloque un texto.'
        txtstrap.focus()
    }
   
})

btnprofile.addEventListener('click', async () => {
    
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

        if (tab){
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: [`./Scrap/backgroundProfile.js`]
            })

            window.close();
            
        } else {
            const pAlert = document.getElementById('alert')
            pAlert.innerText = 'No se tiene permiso para los tabs.'
            txtstrap.focus()
        }
})