const form = document.querySelector('#contactForm');
const fullName = document.querySelector('#fullName');
const fullNameError = document.querySelector('#fullName-error');
const email = document.querySelector('#email');
const emailError = document.querySelector('#email-error');
const subject = document.querySelector('#subject');
const subjectError = document.querySelector('#subject-error');
const message = document.querySelector('#message');
const messageError = document.querySelector('#message-error');

function validateForm(event){
    event.preventDefault();

    if(checkLength(fullName.value, 0)){
        fullNameError.style.display = 'none';
    }
    else{
        fullNameError.style.display = 'block';
    }
    if(validateEmail(email.value)){
        emailError.style.display = 'none';
    }
    else{
        emailError.style.display = 'block';
    }
    if(checkLength(subject.value, 15)){
        subjectError.style.display = 'none';
    }
    else{
        subjectError.style.display = 'block';
    }
    if(checkLength(message.value, 25)){
        messageError.style.display = 'none';
    }
    else{
        messageError.style.display = 'block';
    }
}
form.addEventListener("submit", validateForm);

function checkLength(value, len){
    if(value.trim().length > len){
        return true;
    }
    else{
        return false;
    }
}
function validateEmail(email){
    const regEx = /^.+@.+$/;
    const patternMatches = regEx.test(email);
    return patternMatches; 
}