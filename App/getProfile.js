let btnstrap = document.getElementById('btnstrap')

btnstrap.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapingProfile,
    })
})

function scrapingProfile() {

    const cssSelectorsProfile = {
        profile: {
            name: 'div.ph5 > div.mt2 > div > ul > li',
            resumen: 'div.ph5 > div.mt2 > div > ul ~ h2',
            // country: 'div.ph5.pb5 > div.display-flex.mt2.pv-top-card--reflow > div.pv-top-card__list-container > ul.cx.mt1 > li'
            country: 'div.ph5 > div.mt2 > div > ul.mt1 > li.t-16',
            email: 'div > section.pv-contact-info__contact-type.ci-email > div > a',
            phone: 'div > section.pv-contact-info__contact-type.ci-phone > ul > li > span',
            urlLinkedin: 'div > section.pv-contact-info__contact-type.ci-vanity-url > div > a',
            about: 'div > section.pv-about-section > p.pv-about__summary-text',
            // about: '[id="about-summary"]'
            experience: 'div.pv-profile-section-pager > section#experience-section > ul.section-info',
            experienceChildren: 'li.pv-profile-section__list-item > section.pv-profile-section',
            experienceChildrenTitle: 'div > div.pv-entity__company-summary-info > h3 > span:nth-child(2)',
            experienceChildrenTitle2: 'div.pv-entity__summary-info.pv-entity__summary-info--background-section > h3',
            experienceChildrenDuration: 'div > div.pv-entity__company-summary-info > h4 > span:nth-child(2)',
            experienceChildrenDuration2: 'div.pv-entity__summary-info.pv-entity__summary-info--background-section > div > h4.pv-entity__date-range.t-14.t-black--light.t-normal > span:nth-child(2)',
            experienceChildrenJobs: 'ul.pv-entity__position-group',
            experienceChildrenJobsTitle: 'div.pv-entity__role-details > div > div.pv-entity__role-container > div > div > h3 > span:nth-child(2)',
            experienceChildrenJobsDirection: 'div > div > div.pv-entity__role-container > div > div > h4 > span:nth-child(2)',
            experienceChildrenJobsDirection2: 'div.pv-entity__summary-info.pv-entity__summary-info--background-section > h4 > span:nth-child(2)',
            experienceChildrenJobsDirection3: 'div > div > div.pv-entity__role-container > div > div > div > h4.pv-entity__date-range.t-14.t-black--light.t-normal > span:nth-child(2)'
        },
        option: {
            buttonSeeMore: '[data-control-name="contact_see_more"]',
            buttonCloseSeeMore: 'button.artdeco-modal__dismiss',
            buttonAboutSeeMore: 'line-clamp-show-more-button',
            buttonExperienceSeeMore: 'button.pv-profile-section__see-more-inline',
            buttonExperienceCloseSeeMore: 'button.pv-profile-section__see-less-secondary-inline'
        }
    }

    const wait = (milliseconds) => {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve()
            }, milliseconds);
        })
    }

    const autoscrollToElement = async function (cssSelector) {
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

        console.log('Finish autoscroll to element %s', cssSelector)

        return new Promise(function (resolve) {
            resolve()
        })
    }

    const getContactProfile = async () => {
        const {
            profile: {
                name: nameCss,
                resumen: resumenCss,
                country: countryCss,
                email: emailCss,
                phone: phoneCss,
                urlLinkedin: urlLinkedinCss
            },
            option: {
                buttonSeeMore: buttonSeeMoreCss,
                buttonCloseSeeMore: buttonCloseSeeMoreCss
            }
        } = cssSelectorsProfile

        const name = document.querySelector(nameCss)?.innerText
        const resumen = document.querySelector(resumenCss)?.innerText
        const country = document.querySelector(countryCss)?.innerText

        const buttonSeeMore = document.querySelector(buttonSeeMoreCss)
        buttonSeeMore.click()

        await wait(1000)

        const email = document.querySelector(emailCss)?.innerText
        const phone = document.querySelector(phoneCss)?.innerText
        let urlLinkedin = document.querySelector(urlLinkedinCss)?.innerText
        if (urlLinkedin)
            urlLinkedin = `https://${urlLinkedin}`

        const buttonCloseSeeMore = document.querySelector(buttonCloseSeeMoreCss)
        buttonCloseSeeMore.click()

        let contact = {}
        contact['name'] = name || ''
        contact['resumen'] = resumen || ''
        contact['email'] = email || ''
        contact['phone'] = phone || ''
        contact['linkedIn'] = urlLinkedin || ''

        return contact
    }

    const getAboutProfile = async () => {

        const {
            profile: {
                about: aboutCss
            },
            option: {
                buttonOpenAboutEdit: buttonOpenAboutEditCss
            }
        } = cssSelectorsProfile

        await wait(1000)

        const buttonOpenAboutEdit = document.getElementById(buttonOpenAboutEditCss)
        if (buttonOpenAboutEdit)
            buttonOpenAboutEdit.click()

        const about = document.querySelector(aboutCss)?.innerText || ''

        return about
    }

    const getExperienceProfile = async () => {

        const {
            profile: {
                experience: experienceCss,
                experienceChildren: experienceChildrenCss,
                experienceChildrenTitle: experienceChildrenTitleCss,
                experienceChildrenTitle2: experienceChildrenTitle2Css,
                experienceChildrenDuration: experienceChildrenDurationCss,
                experienceChildrenJobs: experienceChildrenJobsCss,
                experienceChildrenJobsTitle: experienceChildrenJobsTitleCss,
                experienceChildrenDuration2: experienceChildrenDuration2Css,
                experienceChildrenJobsDirection: experienceChildrenJobsDirectionCss,
                experienceChildrenJobsDirection2: experienceChildrenJobsDirection2Css,
                experienceChildrenJobsDirection3: experienceChildrenJobsDirection3Css
            },
            option: {
                buttonExperienceSeeMore: buttonExperienceSeeMoreCss,
                buttonExperienceCloseSeeMore: buttonExperienceCloseSeeMoreCss
            }
        } = cssSelectorsProfile

        await wait(1000)

        const buttonExperienceSeeMore = document.querySelector(buttonExperienceSeeMoreCss)
        if (buttonExperienceSeeMore)
            buttonExperienceSeeMore.click()

        const experiencesChildren = document.querySelector(experienceCss)
        let experiences = []

        if (experiencesChildren) {

            let experiencesHTML = experiencesChildren.children

            for (const key in experiencesHTML) {

                if (experiencesHTML[key].querySelector) {

                    let experience = {}

                    let children = experiencesHTML[key].querySelector(experienceChildrenCss)

                    let childrenTitle = children.querySelector(experienceChildrenTitle2Css)
                    let title = childrenTitle?.innerText
                    if (!title) {
                        childrenTitle = children.querySelector(experienceChildrenTitleCss)
                        title = childrenTitle?.innerText
                    }
                    experience['title'] = title || ''

                    let childrenDuration = children.querySelector(experienceChildrenDurationCss)
                    let duration = childrenDuration?.innerText
                    if (!duration) {
                        childrenDuration = children.querySelector(experienceChildrenDuration2Css)
                        duration = childrenDuration?.innerText
                    }
                    experience['duration'] = duration || ''

                    let childrenDirection = children.querySelector(experienceChildrenJobsDirectionCss)
                    let direction = childrenDirection?.innerText
                    if (!direction) {
                        childrenDirection = children.querySelector(experienceChildrenJobsDirection2Css)
                        direction = childrenDirection?.innerText
                    }
                    experience['direction'] = direction || ''

                    const childrenJobs = children.querySelector(experienceChildrenJobsCss)
                    if (childrenJobs) {
                        experience['jobs'] = []
                        for (const key in childrenJobs.children) {
                            if (childrenJobs.children[key]?.querySelector) {

                                let job = {}

                                let jobsTitle = childrenJobs.children[key]?.querySelector(experienceChildrenJobsTitleCss)
                                job['title'] = jobsTitle?.innerText

                                let jobsDirection = childrenJobs.children[key]?.querySelector(experienceChildrenJobsDirection3Css)
                                job['direction'] = jobsDirection?.innerText

                                experience.jobs.push(job)
                            }
                        }
                    }

                    experiences.push(experience)
                }
            }
        }

        const buttonExperienceCloseSeeMore = document.querySelector(buttonExperienceCloseSeeMoreCss)
        if (buttonExperienceCloseSeeMore)
            buttonExperienceCloseSeeMore.click()

        return experiences
    }

    const getProfile = async () => {

        await autoscrollToElement('body')

        const contactProfile = await getContactProfile()

        const aboutProfile = await getAboutProfile()

        const experienceProfile = await getExperienceProfile()

        let profile = new Object()
        profile['contact'] = contactProfile
        profile['about'] = aboutProfile
        profile['experiences'] = experienceProfile

        console.log(profile)
    }

    getProfile().catch((e) => {
        console.log(e)
    })
}