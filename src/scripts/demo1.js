document.addEventListener('DOMContentLoaded', () => {

    const primaryHeader = document.querySelector('.primary-header')
    const navToggle = document.querySelector('.mobile-nav-toggle')
    const primaryNav = document.querySelector('.primary-navigation')


    navToggle.addEventListener('click', () => {
        // Set aria-expanded true or false

        primaryNav.hasAttribute('data-visible') ? navToggle.setAttribute('aria-expanded', false) : navToggle.setAttribute('aria-expanded', true)

        // toggle data-visible on element
        primaryNav.toggleAttribute('data-visible')


        // Toggle the mobile screen overlay
        primaryHeader.toggleAttribute('data-overlay')

    })


    const slider = new A11YSlider(document.querySelector('.slider'), {
        adaptiveHeight: false,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        responsive: {
            480: {
                dots: false,
            },
            500: {
                slidesToShow: 2,
                dots: false,


            },
            800: {
                slidesToShow: 3,
                dots: false,


            }
        }

    });

    // register form

    const getStartedBtns = document.querySelectorAll('.get-started')
    const form = document.querySelector('.register-form')


    getStartedBtns.forEach(gStartbtn => {
        gStartbtn.addEventListener('click', () => {
            form.style.display = "block"
        })
    })


    form.addEventListener('submit', (event) => {
        event.preventDefault();

        form.style.display = "none"
    })

    document.querySelector('.form-close i').addEventListener('click', () => {
        form.style.display = "none"
    })

})