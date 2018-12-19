/** SCROLL **/
$(document).ready(function(){
    $(this).scrollTop(0);
});

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

let observer = new IntersectionObserver(function (observables) {
    observables.forEach(function (observable) {
        if (observable.intersectionRatio > 0.5) {
            cadre.style.backgroundSize = "100% 103vh";
            cadre.style.left = "-2vh";
            cadre.style.right = "-2vh";
            cadre.style.top = "-2vh";
        }
    })
}, {
    threshold: [0.5]
})

let items = document.querySelectorAll('.apparition_cadre')
items.forEach(function (item) {

    observer.observe(item)
})

/** TEXTE QUI DEFILE **/

Splitting();