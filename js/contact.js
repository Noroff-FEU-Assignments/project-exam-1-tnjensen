const form = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const fullNameError = document.getElementById('fullName-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const subject = document.getElementById('subject');
const subjectError = document.getElementById('subject-error');
const message = document.getElementById('message');
const messageError = document.getElementById('message-error');
const postUrl = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/users/register';

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
async function handleSubmit(evt) {
    let data = JSON.stringify({
        "username": fullName.value,
        "email": email.value,
        "password": "0000"
    });

    let postUrl = `https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/users/register`;    
    let result = await fetch(postUrl, {
        method: 'post',
        headers: {
        'Content-Type': 'application/json'
        },
        body: data,
    })
    .then(result => result.json()) 
    .then(result  => {
        fetch('https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/users?per_page=1')
        .then(result => result.json())
        .then(console.log(result.id))
        postSubscriberData(result.id);
    })
    .catch(error => console.error('Error:', error));
}

async function postSubscriberData(id){
    let data = JSON.stringify({
        contact_Id: id,
        contact_name: fullName.value,
        contact_email: email.value,
        contact_subject: subject.value,
        contact_message: message.value
    });
     
    let dataUrl = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/contacts';
    let response = await fetch(dataUrl + id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(console.log(response))
    .catch(error => console.error('Error:', error ));
}
/* getSubscribedUser(); */
/* function submitFormData(event){
    event.preventDefault();
  
    const formElement = event.target,
      { action, method } = formElement,
      body = new FormData(formElement);
  
    fetch(action, {
      method,
      body
    })
      .then((response) => response.json())
      .then((response) => {
        // Determine if the submission is not valid
        if (isFormSubmissionError(response)) {
          // Handle the case when there are validation errors
          console.log(response);
          
        }
        // Handle the happy path
      })
      .catch((error) => {
        // Handle the case when there's a problem with the request
        console.log(error);
        
      });
  }; */
  /* async function handleSubmit(evt) {
    evt.preventDefault();

    const data = JSON.stringify({
        post: postId,
        author_name: fullName.value,
        author_email: email.value,
        subject: subject.value,
        content: message.value,
    });

    let postUrl = `https://noroff.tnjensen.com/blogsite_exam1/wp-json/contact-form-7/v1/contact-forms/contactForm/feedback`;    
    let response = await fetch(postUrl, {
        method: 'post',
        headers: {
        'Content-Type': 'application/json'
        },
        body: data,
    })
    .then((response) => {
    if (response.ok === true) {
        // Submitted successfully!
    }

    return response.json();
    })
    .then((object) => {
    // Comment submission failed.
    // Output `object.message` to see the error message.
    })
    .catch(error => console.error('Error:', error));
} */
/* const thisForm = document.getElementById('myForm'); */
/* thisForm.addEventListener('submit',  */
/* async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form).entries()
    const response = await fetch('https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/contacts', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });

    const result = await response.json();
    console.log(result)
};
 */
/* async function getContacts(){
    let response = await fetch('https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/contacts');
    let result = await response.json();
    console.log(result);

    createHTML(result);
     
}
getContacts();

function createHTML(results){
    for(let i = 0; i < results.length; i++){
        contacts.innerHTML += `<div class="contacts">
        <h3>${results[i].title.rendered}</h3>
        <p>${results[i].excerpt.rendered}</p>
        <p>${results[i].content.rendered}</p>
        </div>`; 
    }
} */