var prevScrollpos = window.pageYOffset;
var scroll_top = document.getElementById('scroll-top')
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
        if (currentScrollPos>600){
            scroll_top.classList.remove('d-none')
        }else{

            scroll_top.classList.add('d-none')
        }
    } else {
        document.getElementById("navbar").style.top = "-75px";
        if(scroll_top.classList[0]){

        }else{
            scroll_top.classList.add('d-none')
        }
    }
    if (currentScrollPos>200){
        document.getElementById("navbar").style.backgroundColor = "white";
    }else{
        document.getElementById("navbar").style.backgroundColor = "rgba(255,255,255,0.4)";
    }

    prevScrollpos = currentScrollPos;
}

window.onload = function (){
    document.querySelector('.header-left.load').classList.remove('load')
}

var links = document.getElementsByClassName("nav-link");

//Browse the previously created array
Array.prototype.forEach.call(links, function(elem, index) {
    //Get the hyperlink target and if it refers to an id go inside condition
    var elemAttr = elem.getAttribute("href");
    if(elemAttr && elemAttr.includes("#")) {
        //Replace the regular action with a scrolling to target on click
        elem.addEventListener("click", function(ev) {
            ev.preventDefault();
            //Scroll to the target element using replace() and regex to find the href's target id
            document.getElementById(elemAttr.replace(/#/g, "")).scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
        });
    }
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
$('#subscription').submit(function(e){
    e.preventDefault()
    let email = $('#subscription input[name=email]').val()
    let log = document.querySelector('.subscription h6')
    $.post('add-subscriber/',{
        csrfmiddlewaretoken:csrftoken,
        email: email
    }, function (data, status){
        if(status === 'success'){
            log.innerHTML='Request Submitted Successfully'
            log.classList.add('text-success')
        }else{
            log.innerHTML='Something went wrong! Please try after some time.'
            log.classList.add('text-danger')
        }
        $('#subscription input[name=email]').val('')
    })
})
$('#support').submit(function(e){
    e.preventDefault()
    let name = $('#support input[name=name]').val()
    let email = $('#support input[name=email]').val()
    let message = $('#support textarea[name=message]').val()
    let log =e.target.querySelector('h6')
    $.post('add-support/',{
        csrfmiddlewaretoken:csrftoken,
        name: name,
        email: email,
        message: message
    }, function (data, status){
        if(status === 'success'){
            log.innerHTML='Request Submitted Successfully'
            log.classList.add('text-success')
        }else{
            log.innerHTML='Something went wrong! Please try after some time.'
            log.classList.add('text-danger')
        }
        $('#support input[name=name]').val('')
        $('#support input[name=email]').val('')
        $('#support textarea[name=message]').val('')
    })

})