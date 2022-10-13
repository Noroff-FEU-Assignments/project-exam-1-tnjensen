const links = document.querySelectorAll('nav a:not(.sidebar)');

for(let i = 0; i < links.length; i++){
    if(links[i] == document.URL){
        links[i].classList.add('active');
    }
}