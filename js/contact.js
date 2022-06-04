const form = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const fullNameError = document.getElementById('fullName-error');
const email = document.getElementById('email');
const emailError = document.getElementById('email-error');
const subject = document.getElementById('subject');
const subjectError = document.getElementById('subject-error');
const message = document.getElementById('message');
const messageError = document.getElementById('message-error');
/* const postUrl = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json/wp/v2/users/register'; */
const restRoot = 'https://noroff.tnjensen.com/blogsite_exam1/wp-json';

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
    const formData = new FormData(form).entries();
    let postUrl = `/wp/v2/contacts`;    
    try{
    let response = await fetch(restRoot + postUrl, {
        method: 'post',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbm9yb2ZmLnRuamVuc2VuLmNvbVwvYmxvZ3NpdGVfZXhhbTEiLCJpYXQiOjE2NTQyODQ4NzcsIm5iZiI6MTY1NDI4NDg3NywiZXhwIjoxNjU0ODg5Njc3LCJkYXRhIjp7InVzZXIiOnsiaWQiOjEsImRldmljZSI6IiIsInBhc3MiOiJmZGY0ODJiNzI5NzNjZjg0ZjQxZWM5ZDZhZWY4ODhlZSJ9fX0.tgrdfb649zDeGvji7LkNA2Ut52uwAB29gvpT1dld2WA'
        },
        body: JSON.stringify(Object.fromEntries(formData))
    });
    let result = await response.json();
    console.log(result);
    }
    catch(error){
        console.log('Error:', error)
    }
}
/* let token = sessionStorage.getItem('newToken');
console.info("Token on load: ", token);

function getToken( username, password ) {
 
    let restURL = `${restRoot}/jwt-auth/v1/token`;

    // The POST request to get the token.
    const response = fetch( restURL, {
        method: 'POST',
        body: JSON.stringify( {
            'username': username,
            'password': password
        } ),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( response => response.json() )
    .then( response => {
        // If we get a token in response (username and password match).
        if ( response.token ) {
            // Toggle various things on and off.
            console.log( 'getToken: ', response.token );
            sessionStorage.setItem('newToken',response.token);
        }
    })
    .catch( ( error ) => {
        console.error( 'getToken error: ', error );
    });
 
} */