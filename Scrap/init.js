( async () => {

    console.log("Carga init...")
    
    const search = await scrapingSearch()
    //console.log(JSON.stringify(search, null, 2))

    chrome.runtime.sendMessage("hbnpchbibiafacoehbnkphomnpacgnej", { action: "search", data: search })
    console.log("Enviado init sendMessage...")
})()