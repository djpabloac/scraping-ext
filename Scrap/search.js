const scrapingSearch = async (searchText) => {

    // SelectorCss del buscador poner en la db.
    const cssSelectorsSearch = {
        job: {
            jobs: 'main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul',
            jobTitle: 'div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div.t-roman.t-sans > span > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)',
            jobContainer: 'div.entity-result > div.entity-result__item > div.entity-result__content > div > div.linked-area > div > span.entity-result__title > div > span.entity-result__title-line > span.entity-result__title-text > a.app-aware-link'
        },
        option: {
            inputSearch: 'input.search-global-typeahead__input',
            buttonPerson: 'body > div.application-outlet > div.authentication-outlet > div > div.scaffold-layout.scaffold-layout--breakpoint-none.scaffold-layout--main-aside.scaffold-layout--static > section > div > nav > div > div > div > div.peek-carousel.js-slideshow > ul > li:nth-child(2) > button'
        }
    }


    const {
        job: {
            jobs: jobsCss,
            jobTitle: jobTitleCss,
            jobContainer: jobContainerCss
        },
        option: {
            inputSearch: inputSearchCss,
            buttonPerson: buttonPersonCss
        }
    } = cssSelectorsSearch

    // Buscador
    console.log('Load')
    const inputSearch = document.querySelector(inputSearchCss)
    console.log('Focus')
    inputSearch.focus()

    console.log('Primer wait...')
    await wait(3000)

    console.log('Write')
    inputSearch.value = searchText

    console.log('Segundo wait...')
    await wait(50)
    let keyboardEvent = new KeyboardEvent('keydown', {
        code: 'Enter',
        key: 'Enter',
        charKode: 13,
        keyCode: 13,
        view: window
    });
    inputSearch.dispatchEvent(keyboardEvent);

    console.log('Tercer wait...')
    await wait(5000)

    console.log('Button Person Click')
    const buttonPerson = document.querySelector(buttonPersonCss)

    if (buttonPerson)
        buttonPerson.click()

    console.log('Cuarto wait...')
    await wait(5000)

    console.log('Recorrer jobs')
    let i = 1
    const jobs = document.querySelector(jobsCss)
    let jobColletion = []
    for (const key in jobs.children) {
        if (jobs.children[key].querySelector) {
            const jobTitle = jobs.children[key].querySelector(jobTitleCss)
            const jobContainer = jobs.children[key].querySelector(jobContainerCss)
            let job = {}
            job['index'] = i
            job['title'] = jobTitle?.innerText || ""
            job['href'] = jobContainer?.href || ""
            jobColletion.push(job)
            i++
        }
    }

    console.log('Ir al jobs')
    await wait(500)
    i = 1
    for (const key in jobColletion) {
        if (jobColletion[key].href) {

            //// ---> Job - Cargar una nueva pagin
            console.log(`---> Job ${i} - Cargar una nueva pagina`)
            let windowJob = window.open(jobColletion[key].href, '_blank')

            ///// ---> Job - Algoritmo para ejecutar
            // var script = windowJob.document.createElement('script')
            // script.src = chrome.runtime.getURL('Scrap/profile.js')
            // script.onload = function() {
            //     this.scrapingProfile();
            // }
            // windowJob.document.head.appendChild(script)
            // await wait(3000)
            
            //// ---> Job - Cerrar el windows
            //windowJob.close();

            i++
        }
    }
}