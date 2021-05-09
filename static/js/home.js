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