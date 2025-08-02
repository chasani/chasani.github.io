document.addEventListener('DOMContentLoaded', () => {

    //alert("hello")

    // Theme toggle functionality

    const themeToggle = document.querySelector('#themeToggle')
    const html = document.documentElement
    const icon = themeToggle.querySelector('i')

    //    check for saved theme preferece or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefere-color-scheme:dark)').matches



    // Apply theme based of saved preference or system preference
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        html.classList.add('dark')
        icon.classList.replace('fa-moon', 'fa-sun')

        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000')

    }

    // toogle theme when button is clicked
    themeToggle.addEventListener('click', () => {

        html.classList.toggle('dark')

        if (html.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun')
            localStorage.setItem('theme', 'dark')
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000')

        } else {
            icon.classList.replace('fa-sun', 'fa-moon')
            localStorage.setItem('theme', 'light')
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0070f3')


        }
    })

    // Mobile navigation toggle
    const menuToggle = document.querySelector('#menuToggle')
    const closeMenu = document.querySelector('#closeMenu')
    const mobileMenu = document.querySelector('#mobileMenu')

    if (mobileMenu && closeMenu && menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full')
            document.body.classList.add('overFlow-hidden')
        })

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full')
            document.body.classList.remove('overFlow-hidden')
        })


        // Close mobile menu when clicking a link
        const mobilelinks = mobileMenu.querySelectorAll('a')
        mobilelinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full')
                document.body.classList.remove('overFlow-hidden')
            })
        })
    }


    // smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault()

            const targetId = anchor.getAttribute('href')
            const targetElement = document.querySelector(targetId)

            if (targetElement) {
                const headerheight = document.querySelector('header').offsetHeight
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerheight

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                })
            }
        })
    })


    // infinte scroll
    const copy = document.querySelector(".logos-slide").cloneNode(true);

    document.querySelector(".logos").appendChild(copy)

    // form submission handling
    const contactform = document.querySelector('#contactForm')

    //alert(contactform.innerHTML)

    if (contactform) {
        contactform.addEventListener('submit', (e) => {
            e.preventDefault()

            // get form values
            const name = document.querySelector('#name').value
            const email = document.querySelector('#email').value
            const message = document.querySelector('#message').value

            //since no server lets creat a dictionary with data a alert it.
            const data = {
                name: name,
                email: email,
                message: message
            }

            console.warn(`${data['name']} of ${data['email']} sent ${data['message']}`)

            const button = document.querySelector('button[type="submit"')
            const originalContent = button.textContent // same as "button.getHTML()""

            button.textContent = "Message Sent!"
            button.classList.add('bg-green-600')

            setTimeout(() => {
                button.textContent = originalContent
            }, 3000)




            // send data to server
            /* fetch('http://localhost', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors',
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })
            }).then(response => {
                if (!response.ok) {
                    console.error(`Response is not ok. this is the response: ${response}`)
                }

                return response.json
            }).then(responseData => {
                console.info(responseData)
            }).catch(error => {
                console.error(`error: ${error}`)
            })
 */

        })

        // reset form
    }


})