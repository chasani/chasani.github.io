document.addEventListener('DOMContentLoaded', () => {

    /*=============== SHOW MENU ===============*/

    const navMenu = document.querySelector('#nav-menu'), navToggle = document.querySelector('#nav-toggle'), navClose = document.querySelector('#nav-close')

    // Menu Show
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu')
        })

    }

    // Menu hidden
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu')
        })
    }

    /*=============== REMOVE MENU MOBILE ===============*/
    const navLink = document.querySelectorAll('.nav__link')

    const linkAction = () => {
        const navMenu = document.querySelector('.nav-menu')
        navMenu.classList.remove('show-menu')
    }

    navLink.forEach((list) => {
        list.addEventListener('click', linkAction)

    })


    /*=============== ADD BLUR HEADER ===============*/

    const blurHeader = () => {
        const header = document.querySelector('header')
        // when scroll is greater than 50 viewport height add the scroll -header class to the header tag

        this.scrollY >= 50 ? header.classList.add('blur-header') : header.classList.remove('blur-header')
    }

    window.addEventListener('scroll', blurHeader)


    /*=============== SHOW SCROLL UP ===============*/

    const scrollup = () => {
        const scrollup = document.querySelector('#scrollup')
        // when scroll is greater than 350 viewport height add the show-scroll class to the scroll link

        this.scrollY >= 350 ? scrollup.classList.add('show-scroll') : scrollup.classList.remove('show-scroll')
    }

    window.addEventListener('scroll', scrollup)

    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

    const sections = document.querySelectorAll('section[id]')

    // console.log(sections)

    const scrollActive = () => {
        const scrollDown = window.scrollY

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight
            const sectionTop = section.offsetTop - 58
            // console.info(sectionTop)
            const sectionId = section.getAttribute('id')
            const sectionMenuLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`)

            if (scrollDown > sectionTop && scrollDown <= (sectionTop + sectionHeight)) {
                sectionMenuLink.classList.add('active-link')
            } else {
                sectionMenuLink.classList.remove('active-link')

            }

        })
    }

    window.addEventListener('scroll', scrollActive)

    /*=============== SCROLL REVEAL ANIMATION ===============*/

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.info(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible')
            }
            else {
                // entry.target.classList.remove('scroll-visible')

            }
        })
    })

    const observer1 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.info(entry)
            if (entry.isIntersecting) {
                entry.target.classList.add('twist-in')
            }
            else {
                // entry.target.classList.remove('scroll-visible')

            }
        })
    })

    sections.forEach(section => {

        if (!section.classList.contains('home')) {
            observer.observe(section)

        }

    })

    favImgs = document.querySelectorAll('.favorite__img')

    favImgs.forEach(favImg => {

        observer1.observe(favImg)

    })




    // show purchase card

    const purchaseCard = document.querySelector('#purchase-card')
    const favoriteBtns = document.querySelectorAll('.favorite__button')

    favoriteBtns.forEach(fBtn => {
        fBtn.addEventListener('click', () => {
            const treat = fBtn.getAttribute('data-treat')
            const imgUrl = `/src/assets/bakery/${treat}.png`
            purchaseCard.querySelector('.purchase__image').setAttribute('src', imgUrl)
            console.log(treat)
            purchaseCard.classList.add('show')
        })
    })

    // make purchase card vanish
    document.querySelector('.purchase__button').addEventListener('click', () => {
        purchaseCard.classList.remove('show')
    })

    document.querySelector('.purchase__close').addEventListener('click', () => {
        purchaseCard.classList.remove('show')
    })



})