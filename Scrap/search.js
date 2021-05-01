const scrapingSearch = async () => {

    // SelectorCss del buscador poner en la db.
    const cssSelectorsSearch = {
        job: {
            jobs: 'main > div > div > div.pv2.artdeco-card.ph0.mb2 > ul',
            jobTitle: 'div > div > div.entity-result__content.entity-result__divider.pt3.pb3.t-12.t-black--light > div.mb1 > div > div.t-roman.t-sans > span > div > span.entity-result__title-line.flex-shrink-1.entity-result__title-text--black > span > a > span > span:nth-child(1)',
            jobContainer: 'div.entity-result > div.entity-result__item > div.entity-result__content > div > div.linked-area > div > span.entity-result__title > div > span.entity-result__title-line > span.entity-result__title-text > a.app-aware-link'
        }
    }

    // SelectorCss
    const {
        job: {
            jobs: jobsCss,
            jobTitle: jobTitleCss,
            jobContainer: jobContainerCss
        },
    } = cssSelectorsSearch

    //Buscador
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

    return jobColletion
}