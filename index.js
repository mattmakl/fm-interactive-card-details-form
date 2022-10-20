const expMonth = document.querySelector("#exp-month")
const expYear = document.querySelector("#exp-year")
const datesCont = document.querySelector(".dates-container")
const cvcCont = document.querySelector(".cvc-container")
const cardCvc = document.querySelector("#card-cvc")
const cardName = document.querySelector("#card-name")
const cardNum = document.querySelector("#card-number")

function updateCardDisplay(target, value) {
    document.querySelector(`.${target}`).textContent = target === 'card-number'?
        value.replace(/\s/g,"").slice(0,16).replace(/\d{4}/g,"$& "): // add spaces to displayed card no & display first 16 digits only.
        value
}

function toggleForm() {
    document.querySelector(".confirmation-container").classList.toggle("hidden")
    document.querySelector("#payment-form").classList.toggle("hidden")
}

function validateForm() {
    let errors = false

    // regex matches
    const name = /[a-zA-Z]+\s[a-zA-Z]+.*/g.test(cardName.value);
    const num = /^\d{16}$/g.test(cardNum.value.replace(/\s/g,""));
    const month = /(^0|^)[1-9]($|[0-2]$)/g.test(expMonth.value);
    const year = /^[0-9][0-9]$/g.test(expYear.value);
    const cvc = /^[0-9]{3}$/g.test(cardCvc.value);
    
    if(name) {
        document.querySelector("#name-err").classList.remove("error")
        cardName.classList.remove("error")
    } else {
        errors = true
        document.querySelector("#name-err").classList.add("error")
        cardName.classList.add("error")
    }
    
    if(num) {
        cardNum.classList.remove("error")
        document.querySelector("#number-err").classList.remove("error")
    } else {
        errors = true
        cardNum.classList.add("error")
        document.querySelector("#number-err").classList.add("error")
    }

    if (month || year) {
        datesCont.classList.remove("error")
        expMonth.classList.remove(expMonth.value?"error": null)
        expYear.classList.remove(expYear.value?"error": null)
    } else {
        errors = true
        datesCont.classList.add("error")
        expMonth.classList.add(!expMonth.value?"error": null)
        expYear.classList.add(!expYear.value?"error": null)
    }

    if(!cvc) {
        errors = true
        cvcCont.classList.add("error")
        cardCvc.classList.add("error")
    } else {
        cvcCont.classList.remove("error")
        cardCvc.classList.remove("error")
    }

    return(errors)    
}


document.querySelector("#payment-form").addEventListener('submit', e => {
    e.preventDefault()
    !validateForm()?toggleForm():null
});

[...document.querySelectorAll('.form-input')].forEach(el => el.addEventListener('keyup', e => {
    e.target.value?updateCardDisplay(e.target.id, e.target.value):null
}))
;

[...document.querySelectorAll(".dates-container input")].forEach(num => num.addEventListener('change', e => {
    let expDate = `${expMonth.value.toString().padStart(2,'0')}/${expYear.value.toString().padStart(2,'0')}`
    updateCardDisplay("card-date", expDate)
}))

document.querySelector("#continue-btn").addEventListener('click', e => {
    toggleForm()
    document.querySelectorAll("#payment-form input").forEach(input => input.value = '')
});
