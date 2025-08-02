document.addEventListener('DOMContentLoaded', () => {

    /*=============== SHOW MENU ===============*/

    const navMenu = document.querySelector('#nav-menu'), navToggle = document.querySelector('#nav-hamburger'), navClose = document.querySelector('#nav-close')

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
    const navLink = document.querySelectorAll('.nav__list a')

    const linkAction = () => {
        const navMenu = document.querySelector('#nav-menu')
        navMenu.classList.remove('show-menu')
    }

    navLink.forEach((list) => {
        list.addEventListener('click', linkAction)

    })



    // show different fruits

    const menuLinks = document.querySelectorAll('.nav__list a');
    const fruits = document.querySelectorAll('.fruit');
    const getBtn = document.querySelector('button')
    menuLinks.forEach(link => {

        link.addEventListener('click', () => {

            // remove class on other links
            fruits.forEach(fru => {
                fru.classList.remove('active-fruit')
            })

            menuLinks.forEach(lin => {
                lin.classList.remove('active-link')
            })

            const fruit = link.getAttribute("data-fruit")
            const fruitItem = document.querySelector(`#${fruit}`)
            // const fruitColor = `hsl(from var(--bg-color-${fruit}) h s 50%)`
            const fruitColor = `hsl( from var(--bg-color-${fruit}) h s l)`
            const colorVar = "--active-fruit-color"

            link.classList.add('active-link')
            fruitItem.classList.add('active-fruit')
            document.documentElement.style.setProperty(colorVar, fruitColor)



        })
    })



})