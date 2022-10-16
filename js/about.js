const links = document.querySelectorAll('nav a:not(.sidebar)');
const year = document.getElementById('year');
const menuButton = document.querySelector('.menu-btn');

let date = new Date().getFullYear();
if( date > 2022){
  year.innerHTML = `2022 - `+ date;
}else{
  year.innerHTML = date;
}

for(let i = 0; i < links.length; i++){
    if(links[i] == document.URL){
        links[i].classList.add('active');
    }
}

menuButton.addEventListener('click', function(){
    menuButton.classList.toggle('visible');
});

window.addEventListener('mouseup', function(event){
    if(!event.target.closest('.menu-btn')){
        menuButton.classList.remove('visible');
    }
})