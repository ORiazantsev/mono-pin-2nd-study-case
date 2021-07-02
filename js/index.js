let currentIndex = 0;
let pinNumber = '';
let numberOfAttempts = 3;

function onNumberButtonClick(enteredPinNumber) {
    let possibilityOfEntry = sessionStorage.getItem('possibilityOfEntry');
    if (possibilityOfEntry !== 'No') {
        fillingIndicators();
        addNumber(enteredPinNumber);
    }
}

function addNumber(enteredPinNumber) {
    if (pinNumber.length !== 4) {
        pinNumber += enteredPinNumber;
    }
    if (pinNumber.length === 4) {
        $.ajax({
            type: "POST",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            url: "http://datiwoods.com/api/auth/login",
            data: JSON.stringify({
                pin: pinNumber.toString()
            }),
            success: function () {
                sessionStorage.setItem('isLoggedIn', 'true');
                window.open('balance.html', '_self');
            },
            error: function () {
                setTimeout(function () {
                    cleanFilledIndicators();
                }, 200);
                pinNumber = '';
                currentIndex = 0;
                numberOfAttempts -= 1;
                incorrectPassword();
                if (numberOfAttempts == 1) {
                    console.log('У вас залишилась остання спроба')
                } else if (numberOfAttempts == 0) {
                    sessionStorage.setItem('possibilityOfEntry', 'No');
                    console.log('Доступ заблоковано');
                }
            }
        })
    }
}

function fillingIndicators() {
    if (currentIndex !== 4) {
        let indicator = document.getElementsByClassName('fill-indicator')[currentIndex];
        indicator.classList.add('filled');
        currentIndex++;
    }
}

function unfillingIndicators() {
    if (currentIndex > 0) {
        currentIndex--;
        let indicator = document.getElementsByClassName('fill-indicator')[currentIndex];
        indicator.classList.remove('filled');
        pinNumber = pinNumber.substring(0, currentIndex - 1) + pinNumber.substring(currentIndex, pinNumber.length);
    }
}

function cleanFilledIndicators() {
    for (let index = 0; index < 4; index++) {
        let allIndicators = document.getElementsByClassName('fill-indicator');
        allIndicators[index].classList.remove('filled');
    }
}

function incorrectPassword() {
    let alarm = document.getElementsByClassName('incorrect-password')[0];
    alarm.style.opacity = 100;
    setTimeout(function () {
        alarm.style.opacity = 0;
    }, 1500);
}


function loginCheck() {
    let status = sessionStorage.getItem('isLoggedIn');
    if (status == 'true') {
        window.open('balance.html', '_self');
    }
}