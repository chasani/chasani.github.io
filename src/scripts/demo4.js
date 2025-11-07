

document.addEventListener('DOMContentLoaded', () => {

    const loggedinUser = localStorage.getItem('certUsername')
    const page = window.location.href
    if ((page != 'http://localhost:4321/demo4' && page != 'http://localhost:4321/demo4_reg') && !loggedinUser) {
        // window.location.href = 'http://localhost:4321/demo4';


    }

    if ((page === 'http://localhost:4321/demo4' || page === 'http://localhost:4321/demo4_reg') && loggedinUser) {
        // window.location.href = 'http://localhost:4321/demo4_dash';

    }


    // for GIT
    if ((page != 'https://chasani.github.io/demo4/' && page != 'https://chasani.github.io/demo4_reg/') && !loggedinUser) {
        window.location.href = 'https://chasani.github.io/demo4/'

    }


    if ((page === 'https://chasani.github.io/demo4/' || page === 'https://chasani.github.io/demo4_reg/') && loggedinUser) {
        window.location.href = 'https://chasani.github.io/demo4_dash/'

    }




    // initialise db
    const db = new PouchDB('certsDB');
    const remoteCouch = false

    if (db) {
        // destroyDB()

    }

    let currentUserCount = 0
    function getUserCount() {
        db.allDocs({
            startkey: `user`,
            endkey: `user\uffff`,
        }).then(result => {
            // console.warn("my count")
            // console.log(result.rows.length);

            currentUserCount = result.rows.length

        })



    }

    getUserCount()


    class User {
        constructor(name, password) {
            this._id = name
            this.password = password
        }
    }

    // register user

    const regForm = document.querySelector('#reg-form')

    if (regForm) {

        regForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const regData = new FormData(regForm)


            const p1 = regData.get('password1')
            const p2 = regData.get('password2')

            if (p1 != p2) {
                showPopup("Password did not match")
                return
            }

            const reguser = new User(regData.get('username'), p1)


            db.put(reguser, function callback(err, result) {
                if (!err) {
                    console.log('Successfully registered user!');
                }
            });

            showPopup("Sucessfully registered. returning to login in 2 sec..")

            setTimeout(() => {
                // window.location.href = 'http://localhost:4321/demo4';

                // for GIT
                window.location.href = 'https://chasani.github.io/demo4/';


            }, 2000);

        })


    }

    // Login

    const loginForm = document.querySelector('#login-form')

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const loginData = new FormData(loginForm)
            const username = loginData.get('username')

            db.get(username).then(function (doc) {
                if (doc.password === loginData.get('password')) {
                    localStorage.setItem('certUsername', username);

                    // window.location.href = 'http://localhost:4321/demo4_dash';
                    window.location.href = 'https://chasani.github.io/demo4_dash/';


                } else {
                    showPopup('Username or paswword incorrect')
                }

            }).catch(function (err) {
                console.log(err);
                showPopup('Username or paswword incorrect')
            });


        })
    }


    console.warn("login user:  ", loggedinUser)

    if ((page != 'http://localhost:4321/demo4' && page != 'http://localhost:4321/demo4_reg') && loggedinUser) {
        // return

        document.querySelector('#loginUser').innerHTML = loggedinUser
    }

    // for GIT
    if ((page != 'https://chasani.github.io/demo4/' && page != 'https://chasani.github.io/demo4_dash/') && loggedinUser) {
        // return

        document.querySelector('#loginUser').innerHTML = loggedinUser
    }



    // logout

    const logoutLink = document.querySelector('#logout-link')
    if (logoutLink) {
        logoutLink.addEventListener('click', () => {
            localStorage.removeItem('certUsername')
            // window.location.href = 'http://localhost:4321/demo4';

            // for GIT
            window.location.href = 'https://chasani.github.io/demo4/';


        })
    }

    // hamburger menu

    const hanMenu = document.querySelector('#menu__line')
    const sideNav = document.querySelector('#side-nav')

    if (hanMenu) {
        hanMenu.addEventListener('click', () => {

            sideNav.classList.toggle('expand')
        })
    }

    /*=============== SHOW MENU ===============*/


    const certlinks = document.querySelectorAll('#cert-list ul li');
    const certImages = document.querySelectorAll('#cert-images img');
    const cards = document.querySelectorAll('.card');

    const certInfo = document.querySelector('#cert-info')

    function removeClass(items, rclass) {
        items.forEach(item => {
            item.classList.remove(rclass)
        })


    }

    certlinks.forEach(link => {

        link.addEventListener('click', () => {
            certInfo.classList.add('blur')

            removeClass(certlinks, 'extend')
            removeClass(certImages, 'show')


            link.classList.add('extend')
            const linkNumber = link.getAttribute('data-certNumber')

            // show related image
            document.querySelector(`.cert__images img:nth-Child(${linkNumber})`).classList.add('show')

            // display cert stats
            displayCertStats(`cert${linkNumber}`)

            // Updates awardee cards
            displayCards(`cert${linkNumber}`)

            // remove blur after a delay
            setTimeout(function () { certInfo.classList.remove('blur') }, 500);






        })

    })



    // DATABASE SECTION




    // create default database data

    // Create certs
    const certs = ["cert1", "cert2", "cert3", "cert4"]

    const cert1 = {
        _id: 'cert1',
        usage_rate: 'low',
        total_awarded: 1,
    }
    const cert2 = {
        _id: 'cert2',
        usage_rate: 'low',
        total_awarded: 0,
    }
    const cert3 = {
        _id: 'cert3',
        usage_rate: 'low',
        total_awarded: 1,
    }
    const cert4 = {
        _id: 'cert4',
        usage_rate: 'low',
        total_awarded: 1,
    }

    const allCerts = [cert1, cert2, cert3, cert4]

    // console.log(allCerts)

    // Create clients
    const client1 = {
        _id: 'client1',
        name: 'Peter Pedro',
        sex: 'm',
        location: 'St. Lucia',
        total_awarded: 1




    }

    const client2 = {
        _id: 'client2',
        name: 'Zane Hassani',
        sex: 'm',
        location: 'United States',
        total_awarded: 1




    }



    const client3 = {
        _id: 'client3',
        name: 'Nina Edwards',
        sex: 'f',
        location: 'United States',
        total_awarded: 1




    }

    const allClients = [client1, client2, client3]

    // client object consrtuctor function
    function CertClient(_id, cert_id, client_id, date) {
        this._id = _id
        this.cert_id = cert_id
        this.client_id = client_id
        this.date = date
    }

    // Create client certs

    const clientCert1 = new CertClient(`certifiedcert1no1`, 'cert1', 'client1', new Date().toLocaleDateString())
    const clientCert2 = new CertClient(`certifiedcert4no2`, 'cert4', 'client2', new Date().toLocaleDateString())
    const clientCert3 = new CertClient(`certifiedcert3no3`, 'cert3', 'client3', new Date().toLocaleDateString())

    const allClientCerts = [clientCert1, clientCert2, clientCert3]



    // Delete database items
    function deleteAllItems(arr) {

        arr.forEach(itemId => {
            db.get(itemId).then(function (doc) {
                return db.remove(doc);
            });
        })
    }
    // destroy database
    function destroyDB() {
        db.destroy().then(function (response) {
            // success
        }).catch(function (err) {
            console.log(err);
        });
    }

    // Uplod docs funtion
    function loadDocs(items) {
        items.forEach(item => {
            db.put(item, function callback(err, result) {
                if (!err) {
                    console.log('Successfully posted item!');
                }
            });

        })
    }

    // display cert stats function
    function displayCertStats(cert) {
        db.get(cert).then((doc) => {


            document.querySelector('#stat-usage').innerHTML = doc.total_awarded > 5 ? 'High' : "Low"
            document.querySelector('#stat-total').innerHTML = doc.total_awarded
        })

    }

    // hide cards 
    function hideCards() {
        cards.forEach(card => {
            card.classList.remove('show')
        })
    }

    // Upddate Awardee cards funtion
    function displayCards(cert) {
        hideCards()
        db.allDocs({
            include_docs: true,
            startkey: `certified${cert}\uffff`,
            endkey: `certified${cert}`,
            descending: true,
            limit: 3
        }).then(result => {
            console.warn(result.rows)

            let count = 0

            result.rows.forEach((entry, index) => {
                console.error(index)
                const card = document.querySelector(`#card${index}`)
                card.classList.add('show')

                console.info("card entry:: ", entry.doc.client_id)

                db.get(entry.doc.client_id).then((docu) => {
                    if (docu.sex === 'm') {
                        card.querySelector('#avatar-m').classList.add('show')
                        card.querySelector('#avatar-f').classList.remove('show')


                    } else if (docu.sex === 'f') {
                        card.querySelector('#avatar-f').classList.add('show')
                        card.querySelector('#avatar-m').classList.remove('show')

                    }
                    card.querySelector('#card-name-text').innerHTML = docu.name
                    card.querySelector('#card-location-text').innerHTML = docu.location
                    card.querySelector('#card-date-text').innerHTML = entry.doc.date

                })


            })

            // iconGroup.querySelector('span').innerHTML = count


        })

    }

    let currentClientCount = 0
    function getClientCount() {
        db.allDocs({
            startkey: `client`,
            endkey: `client\uffff`,
        }).then(result => {
            // console.warn("my count")
            // console.log(result.rows.length);

            currentClientCount = result.rows.length

        })



    }

    let certsIssued = 0
    function getCertIssuedCount() {
        db.allDocs({
            startkey: `certified`,
            endkey: `certified\uffff`,
        }).then(result => {
            // console.warn("my count")
            // console.log(result.rows.length);

            certsIssued = result.rows.length

        })



    }

    getCertIssuedCount()

    // Load database with certs and clients and cert clients
    loadDocs(allCerts)
    loadDocs(allClients)
    loadDocs(allClientCerts)




    // displayCertStats('cert1')







    // Add people data to table
    const peopleTable = document.querySelector('#people-table')

    function loadTable() {
        db.allDocs({
            include_docs: true,
            startkey: `client`,
            endkey: `client\uffff`,
            ascending: true,
        }).then(result => {
            result.rows.forEach(person => {
                var name = person.name
                var sex = person.sex
                var location = person.location

                const tr = document.createElement('tr')
                const td1 = document.createElement('td')
                const td2 = document.createElement('td')
                const td3 = document.createElement('td')
                const td4 = document.createElement('td')

                td1.appendChild(document.createTextNode(person.doc.name))
                td2.appendChild(document.createTextNode(person.doc.sex))
                td3.appendChild(document.createTextNode(person.doc.location))
                td4.appendChild(document.createTextNode(person.doc.total_awarded))

                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(td4)

                if (peopleTable) {
                    peopleTable.appendChild(tr)
                }
            })
        })




    }

    loadTable()

    getClientCount()

    // NEW Person Form

    const personForm = document.querySelector('#person-form')

    if (personForm) {

        personForm.addEventListener('submit', function (ev) {
            ev.preventDefault()

            const personData = new FormData(personForm)


            let newId = currentClientCount + 1
            console.log(currentClientCount)
            console.log(personData.get('sex'))
            console.log(personForm.name)

            const sexInit = 'm'

            if (personData.get('sex') === "female" || personData.get('sex') === "Female") {
                sexInit = "f"
            }
            // create person
            const usr = {
                _id: `client${newId}`,
                name: personData.get('name'),
                sex: sexInit,
                location: personData.get('location'),
                total_awarded: 0
            }


            //'save person to db
            db.put(usr, function callback(err, result) {
                if (!err) {
                    console.log('Successfully posted item!');
                    personForm.reset()


                    const tr = document.createElement('tr')
                    const td1 = document.createElement('td')
                    const td2 = document.createElement('td')
                    const td3 = document.createElement('td')
                    const td4 = document.createElement('td')

                    td1.appendChild(document.createTextNode(personData.get('name')))
                    td2.appendChild(document.createTextNode(sexInit))
                    td3.appendChild(document.createTextNode(personData.get('location')))
                    td4.appendChild(document.createTextNode('0'))

                    tr.appendChild(td1)
                    tr.appendChild(td2)
                    tr.appendChild(td3)
                    tr.appendChild(td4)

                    peopleTable.appendChild(tr)
                }
            });


            // Add person to table

            logPeople()


        })
    }


    function logPeople() {
        db.allDocs({
            include_docs: true,
            endkey: `client\uffff`,
            startkey: `client`,
        }).then(result => {
            console.info(result.rows)
        })
    }




    // CREATING A CERTIFICATE

    const certThumbs = document.querySelectorAll('#cert-thumbs img')
    const previewImages = document.querySelectorAll('#preview-images img')

    const selectGroup = document.querySelector('#select-group')
    const selectedName = document.querySelector('#selected-name')

    // store clicked thumb id
    let clickedThumbId = '0'

    certThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            removeClass(certThumbs, 'cert__selected')
            thumb.classList.add('cert__selected')

            // enable select dropdown
            if (!selectGroup.classList.contains('remove-gray')) {
                selectGroup.querySelector('select').removeAttribute('disabled')
                selectGroup.classList.add('remove-gray')
            }


            // show preview image
            removeClass(previewImages, 'show')

            const thumbNumber = thumb.getAttribute('data-thumbNumber')

            // temporarily store click thumb number
            clickedThumbId = thumbNumber

            // show related image
            document.querySelector(`.preview__images img:nth-Child(${thumbNumber})`).classList.add('show')



            // add class to name div which places it in the right location oncertificate
            selectedName.classList.add(`on${thumbNumber}`)

            console.warn(selectedName.classList)

            if (selectedName.classList.length > 2) {
                selectedName.classList.remove(selectedName.classList[1])


            }


        })
    })



    // Selecting name and displaying it in position
    const peopleSelect = document.querySelector('#people')


    if (peopleSelect) {
        peopleSelect.addEventListener('change', () => {
            // alert("HIt me")

            // enable save btn
            document.querySelector('#certsave-btn').removeAttribute('disabled')

            const selectedIndex = peopleSelect.selectedIndex

            const name = peopleSelect.options[selectedIndex].text
            // console.log("hey name", name)

            selectedName.querySelector('h2').innerHTML = name
        })
    }

    // Load select
    function loadSelect() {

        if (peopleSelect) {

            db.allDocs({
                include_docs: true,
                endkey: `client\uffff`,
                startkey: `client`,
            }).then(result => {
                result.rows.forEach(entry => {
                    console.info(entry.doc)
                    const option = document.createElement('option')
                    option.value = entry.doc._id
                    option.innerHTML = entry.doc.name
                    peopleSelect.appendChild(option)
                })
            })
        }
    }

    loadSelect()


    // remove not allowed in the drag area
    const certPreview = document.querySelector('#cert-preview')

    if (certPreview) {

        certPreview.addEventListener('dragover', (e) => {
            e.preventDefault()
        })
    }


    // Make Name draggable for positioning
    const personName = document.querySelector('#selected-name')


    let newX = 0, newY = 0, startX = 0, startY = 0

    if (personName) {
        personName.addEventListener('mousedown', mouseDown)
    }

    function mouseDown(e) {

        startX = e.clientX

        startY = e.clientY

        document.addEventListener('mousemove', mouseMove)
        document.addEventListener('mouseup', mouseUp)
        document.addEventListener('dragend', mouseUp)

    }



    function mouseMove(e) {
        // e.preventDefault()

        // get difference in new cursor position form last cusor position or start position
        newX = startX - e.clientX
        newY = startY - e.clientY

        // set x and y postion to current mouse/cursor position
        startX = e.clientX
        startY = e.clientY

        // sets card top/Y and left/X position to current X an Y positions of the cursor when moved 
        // personName.style.top = startY + 'px'
        // personName.style.left = startX + 'px'


        // 
        personName.style.top = (personName.offsetTop - newY) + 'px'
        personName.style.left = (personName.offsetLeft - newX) + 'px'


        console.log('mouse position:', e.clientX, e.clientY)
        console.log('start position:', startX, startY)
        console.log('new position:', newX, newY)
        console.log('offset position:', personName.offsetLeft, personName.offsetTop)

        console.log('card positioning:', (personName.offsetLeft - newX), (personName.offsetTop - newY))



    }

    function mouseUp() {
        // removes mouse move event ending the card movement

        // console.info("we moused up")

        // for some odd reason the mouse up event is not being registered properly in the dom. hence we will hack when drag ends

        setTimeout(() => {
            document.removeEventListener('mousemove', mouseMove)


        }, 200,)


    }






    // save a certificate to person

    const saveCertBtn = document.querySelector('#certsave-btn')

    if (saveCertBtn) {

        saveCertBtn.addEventListener('click', () => {


            console.info("hello:  ", certsIssued)
            const certHolder = new CertClient(`certifiedcert${clickedThumbId}no${(certsIssued + 1)}`, `cert${clickedThumbId}`, peopleSelect.value, new Date().toLocaleDateString())

            console.info(certHolder)

            db.put(certHolder, function callback(err, result) {
                if (!err) {
                    console.log('Successfully posted Cert client!');
                }
            });

            // Update cert stats
            db.get(`cert${clickedThumbId}`).then(function (doc) {
                return db.put({
                    _id: `cert${clickedThumbId}`,
                    _rev: doc._rev,
                    usage_rate: 'low',
                    total_awarded: (doc.total_awarded + 1)
                });
            }).then(function (response) {
                // handle response
            }).catch(function (err) {
                console.log(err);
            });


            // Update cert client stats

            db.get(peopleSelect.value).then(function (doc) {
                return db.put({
                    _id: peopleSelect.value,
                    _rev: doc._rev,
                    name: doc.name,
                    sex: doc.sex,
                    location: doc.location,
                    total_awarded: (doc.total_awarded + 1)
                });
            }).then(function (response) {
                // handle response
            }).catch(function (err) {
                console.log(err);
            });

            // display save message
            showPopup('Certificate Saved !!')


            // reset create page
            // disable save btn
            document.querySelector('#certsave-btn').setAttribute('disabled', 'disabled')

            selectGroup.querySelector('select').selectedIndex = 0


        })
    }

    // show save popup
    function showPopup(message) {

        const popUp = document.querySelector('#popup')

        popUp.querySelector('p').innerHTML = message

        popUp.classList.add('show')

        setTimeout(() => {
            popUp.classList.remove('show')


        }, 3000);


    }

    // showPopup("welcome")


})

