const form = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const fullNameError = document.getElementById('fullName-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const subject = document.getElementById('subject');
const subjectError = document.getElementById('subject-error');
const message = document.getElementById('message');
const messageError = document.getElementById('message-error');
const restRoot = 'https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/blogsite_exam1/wp-json/';
const contactDetails = document.querySelector('.contact-form-details');

function validateForm(event){
    event.preventDefault();

    if(checkLength(fullName.value, 0)){
        fullNameError.style.display = 'none';
    }
    else{
        fullNameError.style.display = 'block';
        return;
    }
    if(validateEmail(email.value)){
        emailError.style.display = 'none';
    }
    else{
        emailError.style.display = 'block';
        return;
    }
    if(checkLength(subject.value, 15)){
        subjectError.style.display = 'none';
    }
    else{
        subjectError.style.display = 'block';
        return;
    }
    if(checkLength(message.value, 25)){
        messageError.style.display = 'none';
    }
    else{
        messageError.style.display = 'block';
        return;
    }
    handleSubmit();
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

async function handleSubmit(event) {
  
    /* const formData = new FormData(form).entries(); */
    let data = JSON.stringify({
        "title": fullName.value,
        "excerpt": subject.value,
        "content": message.value,
        'status': 'publish',
        'meta': {
            'email': email.value,
        }
    });

    let postUrl = restRoot + 'wp/v2/contacts';   
    let response = await fetch(postUrl, {
        method: 'post',
        headers: {
            "Content-type": "application/json",
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbm9yb2ZmLnRuamVuc2VuLmNvbVwvYmxvZ3NpdGVfZXhhbTEiLCJpYXQiOjE2NTQ5MzYxMDMsIm5iZiI6MTY1NDkzNjEwMywiZXhwIjoxNjU1NTQwOTAzLCJkYXRhIjp7InVzZXIiOnsiaWQiOjEsImRldmljZSI6IiIsInBhc3MiOiJmZGY0ODJiNzI5NzNjZjg0ZjQxZWM5ZDZhZWY4ODhlZSJ9fX0.CvJMyYhx25r40VGMf-Sxn5rVKLL9eWVRSFsIsVZ7CsM'
        },
       body: data,  
       /*  body: JSON.stringify(Object.fromEntries(formData)) */
    })
    .then(response => response.json())
    .ctch(error => console.log("Error: ", error))
}

async function getContacts(){
    try{
        let contactUrl = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/contacts/';
        let response = await fetch(contactUrl + '?id=' + postId);
        let result = await response.json();
        loader.innerHTML = "";
        loader.classList.remove('loading-indicator');
        
        for(let i = 0; i < result.length; i++){
            contactDetails.innerHTML += `<div class="posted-contact">
            <p>Posted by: <b>${result[i].title.rendered}</b></p>
            <p>Email: <b>${result[i].meta.email}</b></p>
            <p>Subject: <b>${result[i].excerpt.rendered}</b></p>
            <p>Message: <b>${result[i].content.rendered}</b></p>
            <hr>
            </div>`;
        }
    }
    catch(error){
        contactDetails.innerHTML = `Error: ` + error;
    }
    
}
getContacts();