document.addEventListener("DOMContentLoaded", function(event) {

    const waitInit = (milliseconds) => {
        return new Promise(function (resolve) {
          setTimeout(function () {
            resolve()
          }, milliseconds)
        })
    }


    let btnstrap = document.getElementById('btnstrap')
    let txtstrap = document.getElementById('txtstrap')

    btnstrap.addEventListener('click', async (e) => {
        e.preventDefault();
        
        btnstrap.setAttribute('disabled', 'disabled')
        txtstrap.setAttribute('disabled', 'disabled')
        searchText = txtstrap.value

        if (searchText){
            const href = `https://www.linkedin.com/search/results/people/?keywords=${searchText}&origin=SWITCH_SEARCH_VERTICAL`

            chrome.tabs.update({url: href})

            await waitInit(6000)

            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

            if (tab){

                //ExecuteScript initial
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: [`./Scrap/init.js`]
                })

                //Event listener
                chrome.runtime.onMessage.addListener(
                    async (request, sender, sendResponse) => {
                        const { action, data } = request
                        console.log(action)

                        switch (action) {
                            case 'search':
                                const ForEach = async (array, callback) => {
                                    for (let index = 0; index < array.length; index++) {
                                      await callback(array[index], index, array);
                                    }
                                }
                
                                await ForEach(data, async (el) => {
                                    chrome.tabs.update({ url: el.href })
                          
                                    await waitInit(5000)
                                    
                                    chrome.scripting.executeScript({
                                      target: { tabId: tab.id },
                                      files: ["./Scrap/profileFetch.js"],
                                    })
                          
                                    await waitInit(11000)
                                })
                                
                                break
                            case 'profile':
                                const { key } = request
                                const existKey = localStorage.getItem(key)
                                if (!existKey) {
                                    localStorage.setItem(key, data)
                                } else {
                                    localStorage.removeItem(key)
                                    localStorage.setItem(key, data)
                                }
                                break
                            default:
                                break
                        }
                    }
                )
                
                // window.close()
            }


        } else {

            const pAlert = document.getElementById('alert')
            pAlert.innerText = 'Coloque un texto.'
            btnstrap.removeAttribute('disabled')
            txtstrap.setAttribute('disabled')
            txtstrap.focus()
            
        }
    
    })

})