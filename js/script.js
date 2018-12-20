/** SCROLL **/
$(document).ready(function() {
    $('.js-scrollTo').on('click', function() {
        var page = $(this).attr('href');
        var speed = 2000;
        $('html, body').animate( { scrollTop: $(page).offset().top }, speed );
        return false;
    });
});



/** DISPARITION DU CADRE **/

var cadre = document.getElementById('cadre');
var bloc = document.getElementById('bloc');

let observer = new IntersectionObserver(function (observables) {
    observables.forEach(function (observable) {
        if (observable.intersectionRatio === 1) {
            cadre.style.backgroundSize = "100% 103vh";
            cadre.style.left = "-2vh";
            cadre.style.right = "-2vh";
            cadre.style.top = "-2vh";
            bloc.style.display = "block";
            apparition();
        }
    })
}, {
    threshold: [1]
})

let items = document.querySelectorAll('.apparition_cadre')
items.forEach(function (item) {

    observer.observe(item)
})



/** TEXTE QUI DEFILE **/

Splitting();

function apparition(){
/* phrase 1 */
setTimeout(function() { 
    $('.phrase1').fadeIn(); 
}, 1000); 

setTimeout(function() { 
        $('.phrase1').fadeOut(); 
}, 7000); 

/* phrase 2 */
 setTimeout(function() { 
    $('.phrase2').fadeIn(); 
}, 7300); 

setTimeout(function() { 
    $('.phrase2').fadeOut(); 
}, 14500);

/* phrase 3 */
setTimeout(function() { 
    $('.phrase3').fadeIn(); 
}, 14800);

setTimeout(function() { 
    $('.phrase3').fadeOut(); 
}, 21600);

/* phrase 4 */
setTimeout(function() { 
    $('.phrase4').fadeIn(); 
}, 21900);

setTimeout(function() { 
    $('.phrase4').fadeOut(); 
}, 29600);

/* phrase 5 */
setTimeout(function() { 
    $('.phrase5').fadeIn(); 
}, 30000);

};