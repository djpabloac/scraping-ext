// SelectorCss del profile buscado.
const cssSelectorsProfile = {
    profile: {
        name: 'div.ph5 > div.mt2 > div > ul > li',
        resumen: 'div.ph5 > div.mt2 > div > ul ~ h2',
        country: 'div.ph5 > div.mt2 > div > ul.mt1 > li.t-16',
        email: 'div > section.pv-contact-info__contact-type.ci-email > div > a',
        phone: 'div > section.pv-contact-info__contact-type.ci-phone > ul > li > span',
        urlLinkedin: 'div > section.pv-contact-info__contact-type.ci-vanity-url > div > a'
    },
    about: {
        about: 'div > section.pv-about-section > p.pv-about__summary-text'
    },
    experience: {
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

scrapingProfile()