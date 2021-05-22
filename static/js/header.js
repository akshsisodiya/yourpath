// button scaling code
$('.header-login-btn').mousedown(function (){
    $(this).addClass('clicked')
})
$('.header-login-btn').mouseup(function (){
    $(this).removeClass('clicked')
})