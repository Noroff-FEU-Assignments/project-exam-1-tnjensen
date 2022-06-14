/**
 * Functionality to send and receive JWT tokens and perform actions on the REST API.
 *
 * NOT FOR PRODUCTION. PURELY FOR DEMONSTRATION PURPOSES!
 */

 const restRoot = 'https://noroffcors.herokuapp.com/https://noroff.tnjensen.com/blogsite_exam1/wp-json';
 const login = document.querySelector( '#loginform' );
 const logout = document.querySelector( '#logout' );
 const entryTitle = document.querySelector( '.post-title' );
 const editToggle = document.querySelector( '.edit-toggle' );
 const titleForm = document.querySelector( '#titleform');
 
 // Get token from session storage.
 let token = sessionStorage.getItem('newToken');
 console.info("Token on load: ", token);
 
 /**
  * Request JWT token from the REST API using supplied username and password.
  * @param {string} username 
  * @param {string} password 
  */
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
  
 }
 
 /**
  * Clear token from sessionStorage on logout.
  */
 function clearToken() {
     console.log('clearToken!');
     sessionStorage.removeItem('newToken');
     /* login.style.display = 'block';
     logout.style.display = 'none';
     titleForm.style.display = 'none';
     editToggle.style.display = 'none'; */
     monitorLogin();
 }
 
 