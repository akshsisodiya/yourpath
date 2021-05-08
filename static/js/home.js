var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-75px";
    }
    if (currentScrollPos>400){
        document.getElementById("navbar").style.backgroundColor = "white";
    }else{
        document.getElementById("navbar").style.backgroundColor = "rgba(255,255,255,0.4)";
    }
    prevScrollpos = currentScrollPos;
}

window.onload = function (){
    document.querySelector('.header-left.load').classList.remove('load')
}