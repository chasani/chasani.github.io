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
        closeOrderCard()
    }

    navLink.forEach((list) => {
        list.addEventListener('click', linkAction)

    })



    // show different fruits

    const menuLinks = document.querySelectorAll('.nav__list a');
    const fruits = document.querySelectorAll('.fruit');
    menuLinks.forEach(link => {

        link.addEventListener('click', () => {

            // remove class on other links
            fruits.forEach(fru => {
                fru.classList.remove('active-fruit')
            })

            menuLinks.forEach(lin => {
                lin.classList.remove('active-link')
            })

            // Set color of Links
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

    // set items on order card

    const orderCard = document.querySelector('#order-card')


    // Close card
    function closeOrderCard() {
        orderCard.classList.remove('order__visible')

    }

    document.querySelector('.close__card i').addEventListener('click', closeOrderCard)

    // open card and fill
    const getBtn = document.querySelector('button')
    const shopping__cart = document.querySelector('.shopping__cart')


    getBtn.addEventListener('click', () => {
        shopping__cart.classList.remove('slide-in')

        orderCard.classList.add('order__visible')

        // reset card show window
        document.querySelector('.show__window img').setAttribute('src', '')
        document.querySelector('video').style.display = "block"
        const orderFruit = document.querySelector('.active-link').getAttribute('data-fruit')


        db.get(orderFruit).then(doc => {

            const orderCard = document.querySelector('.order__card')
            orderCard.querySelector('video').setAttribute('src', doc.vid)
            orderCard.querySelector('#image-1').setAttribute('src', doc['thumb_1'])
            orderCard.querySelector('#image-2').setAttribute('src', doc.thumb_2)
            orderCard.querySelector('#image-3').setAttribute('src', doc['thumb_3'])
            orderCard.querySelector('#image-4').setAttribute('src', doc.thumb_4)
            orderCard.querySelector('#title').innerHTML = doc.title
            orderCard.querySelector('#desc').innerHTML = doc['description']
            orderCard.querySelector('#price').innerHTML = "$" + doc.price + "  l/b"
            orderCard.querySelector('#purchase-number').value = doc['amount']
            //console.log(orderFruit)


        })

    })


    // Showcase thumbnail image
    const thumbnails = document.querySelectorAll('img[id*=image-]')
    const showWindow = document.querySelector('.show__window')
    const showWindowImage = document.querySelector('.show__window img')
    const showWindowVid = document.querySelector('video')

    // console.info(thumbnails)

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            showWindowImage.style.display = 'block'
            showWindowVid.style.display = "none"
            showWindowImage.setAttribute('src', thumb.getAttribute('src'))

        })
    })


    // Increase/decrease purchase amount
    const signs = document.querySelectorAll('#pricing-group label')
    const purchaseNumber = document.querySelector('#purchase-number')

    signs.forEach(sign => {
        sign.addEventListener('click', () => {
            if (sign.getAttribute('data-sign') === 'minus') {
                purchaseNumber.value = parseInt(purchaseNumber.value) - 1

            } else if (sign.getAttribute('data-sign') === 'plus') {
                purchaseNumber.value = parseInt(purchaseNumber.value) + 1

            }
        })
    })



    // Add to cart button
    const addToCartBtn = document.querySelector('#cart-btn')

    addToCartBtn.addEventListener('click', () => {

        const orderedFruit = document.querySelector('.active-link').getAttribute('data-fruit')


        db.get(orderedFruit).then((doc) => {
            doc.amount = purchaseNumber.value
            doc.in_cart = true

            return db.put(doc)

        }).then(() => {
            const cartFruit = document.querySelector(`#${orderedFruit}-incart`)
            // console.info(cartFruit)
            cartFruit.classList.add('cart-visible')
            cartFruit.querySelector('#value').innerHTML = purchaseNumber.value
            updateCartBubble()

        })

        closeOrderCard()

    })

    // Remove fruit from cart
    const removeFromCartBtns = document.querySelectorAll('.cart__options button')

    removeFromCartBtns.forEach((btn) => {

        btn.addEventListener('click', () => {
            // console.log(parent)
            const cartFruit = btn.parentElement.parentElement.parentElement.getAttribute('id').replace('-incart', '')

            btn.parentElement.parentElement.parentElement.classList.remove('cart-visible')

            db.get(cartFruit).then((doc) => {
                doc.in_cart = false
                return db.put(doc)

            }).then(() => {
                updateCartBubble()
            })
        })

    })



    // Open and Close shopping cart

    const cartCloseIcon = document.querySelector('.cart__heading i')
    const iconGroup = document.querySelector('.shop__group div')

    cartCloseIcon.addEventListener('click', () => {

        shopping__cart.classList.remove('slide-in')
    })


    iconGroup.addEventListener('click', () => {
        closeOrderCard()
        shopping__cart.classList.toggle('slide-in')

    })



    // Pouch Database setup and usage. PS. i stopped was not needed in forsight

    // // create database
    const db = new PouchDB('market');
    const remoteCouch = false

    // Add items to database

    const marketfruits = ["banana", "mango", "water-apple", "sugar-apple"]

    const banana = {
        _id: "banana",
        vid: "",
        thumb_1: `https://chasani.github.io/_astro/banana-thumb-1.BPrnxREf.png`,
        thumb_2: `/src/assets/market/banana-thumb-2.png?origWidth=2048&origHeight=2048&origFormat=png`,
        thumb_3: `/src/assets/market/banana-thumb-3.png?origWidth=2048&origHeight=2048&origFormat=png`,
        // thumb_4: `/src/assets/market/${fruit}-thumb-4.png?origWidth=2048&origHeight=2048&origFormat=png`,
        // title: fruit.replace('-', ' '),
        // description: document.querySelector(`#${fruit}`).querySelector('.description').innerHTML,
        // price: parseInt(document.querySelector(`#${fruit}`).getAttribute('data-price')),
        // amount: 0,
        in_cart: false
    }



    function createItem(fruit) {
        const item = {
            // _id: new Date().toISOString(),
            _id: fruit,
            vid: `/_astro/assets/market/${fruit}-vid.mp4`,
            thumb_1: `https://chasani.github.io/_astro/banana-thumb-1.BPrnxREf.png`,
            thumb_2: `/src/assets/market/${fruit}-thumb-2.png?origWidth=2048&origHeight=2048&origFormat=png`,
            thumb_3: `/src/assets/market/${fruit}-thumb-3.png?origWidth=2048&origHeight=2048&origFormat=png`,
            thumb_4: `/src/assets/market/${fruit}-thumb-4.png?origWidth=2048&origHeight=2048&origFormat=png`,
            title: fruit.replace('-', ' '),
            description: document.querySelector(`#${fruit}`).querySelector('.description').innerHTML,
            price: parseInt(document.querySelector(`#${fruit}`).getAttribute('data-price')),
            amount: 0,
            in_cart: false
        };
        db.put(item, function callback(err, result) {
            if (!err) {
                console.log('Successfully posted a todo!');
            }
        });
    }

    function deleteItem(itemId) {
        db.get(itemId).then(function (doc) {
            return db.remove(doc);
        });
    }

    function deleteAllItems(arr) {

        arr.forEach(itemId => {
            db.get(itemId).then(function (doc) {
                return db.remove(doc);
            });
        })
    }



    function showCart() {
        db.allDocs({ include_docs: true, descending: true }, function (err, doc) {
            console.info(doc.rows);
        });
    }

    function loadDatabase(arr) {

        db.info().then(function (info) {

            //console.log(info['doc_count']);
            if (parseInt(info['doc_count']) < 1) {
                arr.forEach(createItem)

            }
        })

    }






    // update cart and icon bubble

    const allCartFruits = document.querySelectorAll('li[id$=incart]')




    function updateCartBubble() {
        db.allDocs({
            include_docs: true,
        }).then(result => {
            // console.warn(result.rows[1].doc.amount)

            let count = 0

            result.rows.forEach(entry => {
                if (entry.doc.in_cart === true) {
                    count += 1

                }
            })

            iconGroup.querySelector('span').innerHTML = count


        })

    }

    allCartFruits.forEach(cartFruit => {
        const fruit = cartFruit.getAttribute('id').replace('-incart', '')

        db.get(fruit).then((doc) => {
            if (doc.in_cart === true) {
                cartFruit.classList.add('cart-visible')
                cartFruit.querySelector('#value').innerHTML = doc.amount
            }
        })
    })


    deleteAllItems(marketfruits)
    loadDatabase(marketfruits)
    updateCartBubble()
    //createItem("mango")
    // deleteItem("mango")
    showCart()

})