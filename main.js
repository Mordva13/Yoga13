// ! модальное окно

const overlay = document.querySelector('.overlay')
const more = document.querySelector('.more')
const close = document.querySelector('.popup-close')
const descriptionBtn = document.querySelectorAll('.description-btn')

more.addEventListener('click', () => {
    overlay.style.display = 'block'
    document.body.style.oveflow = 'hidden'
})

overlay.addEventListener('click', (event) => {

    console.log(event.target)
    if (event.target === close || event.target === overlay) {
        overlay.style.display = 'none'
        document.body.style.overflow = 'hidden'
    }
})

descriptionBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        overlay.style.display = 'block'
        document.body.style.oveflow = 'hidden'
    })
})

// ! работа с табами 
const tab = document.querySelectorAll('.info-header-tab')
const tabContent = document.querySelectorAll('.info-tabcontent')
const infoHeader = document.querySelector('.info-header')

const hideTabContent = (n) => {
    for (let i = n; i < tabContent.length; i++) {

        tabContent[i].classList.remove('show')
        tabContent[i].classList.add('hide')
    }
}

hideTabContent(1)

const showTabContent = (n) => {
    if (tabContent[n].classList.contains('hide')) {
        tabContent[n].classList.remove('hide')
        tabContent[n].classList.add('show')
    }
}

infoHeader.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('info-header-tab')) {
        for (let i=0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0)
                showTabContent(i)
                break
            }
        }
    }
})

//Timer URAAAAA!!!

const deadline = '2024-04-30'

const getTimeRemaining = (deadline) => {
    // Получить время до ДР в мил.сек с 1 янв. 1970
    let t_end = Date.parse(deadline)
    // Получить время сейчас в мил.сек с 1 янв. 1970
    let t_start = Date.parse(new Date())
    // Получить кол-во мил.сек. от сейчас до ДР
    let t = t_end - t_start

    let seconds = Math.floor((t / 1000) % 60)
    let minutes = Math.floor((t / 1000 / 60) % 60)
    let hours = Math.floor(t / (1000 * 60 * 60))


    return {
        'total' : t,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    }
}


const setClock = (id, deadline) => {

    const timer = document.querySelector(id)
    const hours = timer.querySelector('.hours')
    const minutes = timer.querySelector('.minutes')
    const seconds = timer.querySelector('.seconds')
    let timeInterval = setInterval(updateTimer, 1000)

    function updateTimer() {
        let t = getTimeRemaining(deadline)

        function addZero(num) {
            if (num <= 9) {
                return '0' + num
            } else {
                return num
            }
        }
        hours.textContent = addZero(t.hours)
        minutes.textContent = addZero(t.minutes)
        seconds.textContent = addZero(t.seconds)

        if (t.total <= 0) {
            clearInterval(timeInterval)
            hours.textContent = '00'
            minutes.textContent = '00'
            seconds.textContent = '00'
        }
    }
}

setClock('#timer', deadline)


// const setClock = (id) => {

//     const timer = document.querySelector(id)
//     const hours = timer.querySelector('.hours')
//     const minutes = timer.querySelector('.minutes')
//     const seconds = timer.querySelector('.seconds')

//     setInterval(() => {
//         let t = new Date()

//         function addZero(num) {
//             if (num <= 9) {
//                 return '0' + num
//             } else {
//                 return num
//             }
//         }
//         hours.textContent = addZero(t.getHours())
//         minutes.textContent = addZero(t.getMinutes())
//         seconds.textContent = addZero(t.getSeconds())
//         }, 1000)
// }

// setClock('#timer')



// ! slider
const slides = document.querySelectorAll('.slider-item')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const dots = document.querySelectorAll('.dot')



let slideIndex = 0



const showSlide = (n) => {
    if (n >= slides.length - 1) {
        slideIndex = 0
    }
    if (n < 0) {
        slideIndex = slides.length - 1
    }
    slides.forEach(slide => slide.style.display = 'none')
    dots.forEach(dot => dot.classList.remove('dot-active'))
    

    slides[slideIndex].style.display = 'block'
    dots[slideIndex].classList.add('dot-active')
}

showSlide(slideIndex)
next.addEventListener('click', () => {
    showSlide(slideIndex += 1)

})

prev.addEventListener('click', () => {
    showSlide(slideIndex -= 1)

})

// !calculator
const person = document.querySelectorAll('.counter-block-input')[0]
const restdays = document.querySelectorAll('.counter-block-input')[1]
const place = document.querySelector('#select')
const totalValue = document.querySelector('#total')


let personSum = 0
let daysSum = 0
let total = 0
totalValue.textContent = 'Заполните все поля'

person.addEventListener('change', () => {
    personSum += +person.value
    total = 4000 * daysSum * person.value
    if (restdays.value == '') {

        totalValue.textContent = 'Заполните ОБА поля'
    } else {

        totalValue.textContent = total
    }
})

restdays.addEventListener('change', () => {
    daysSum += +restdays.value
    total = 4000 * daysSum * person.value
    totalValue.textContent = total

    if (person.value == '') {

        totalValue.textContent = 'Заполните ОБА поля'
    } else {
        
        totalValue.textContent = total
    }
})

place.addEventListener('click', () => {

    if (restdays.value == '' || person.value == '') {
        totalValue.textContent = 'Заполните ОБА поля'
    } else {
        totalValue.textContent = total * place.value
    }
})

// ! conatc form
const form = document.querySelector('#form')
const email = document.querySelector('#email')
const phone = document.querySelector('#phone')
const TOKEN = '6546236925:AAGDE4oGXcpGex__sWPlXsfTyuCJ6vCkHcI'
const CHAT_ID = '1409004355'

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: `Новое сообщение!\nEmail: ${data.email},\nPhone: ${data.phone}`
        })
    })
    if (!response.ok) {
        throw new Error('Ошибка ответа')
    } else {
        console.log('Отправил')
        return await response.json()
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
        email: email.value,
        phone: phone.value,
    }

    sendData(`https://api.telegram.org/bot${TOKEN}/sendMessage`, data)
        .then(() => {
            email.value = ''
            phone.value = ''
        })
})
// {
//     email : 'mordva13gg@gmail.com',
//     phone : '+79254200706'
// }
// //
// {
//     message : 'send.ok',
//     ok : true,
//     status: 200
// }