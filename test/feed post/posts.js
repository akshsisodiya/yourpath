// post like color change
$(".post-like").click(function () {
    $(".post-like>i").toggleClass("fas");
    $(".post-like").toggleClass("active");
    $(".post-like>i").toggleClass("far");
});

// post save color change
$(".post-save").click(function () {
    $(".post-save>i").toggleClass("fas");
    $(".post-save").toggleClass("active");
    $(".post-save>i").toggleClass("far");
});

// action button click action : action drop down
$(".post-actions-button").click(function(){
    $(".post-actions-container").toggleClass("d-none");
});

// tab change funtion
$(".tab").click(function(){
    $(".tab.active").removeClass("active");
    $(this).addClass("active");
});

// result box apear when search bar is focused
$(".search-bar>form>input").focus(function(){
    $(".search-result-container").removeClass("d-none");
});

// result box disapear when search bar is out of focus
$(".search-bar>form>input").focusout(function(){

    // checks if anywhere in screen is clicked
    $(document).click(function() {
        $(".search-result-container").addClass("d-none");
    });

    // checks that click is not on result container
    $(".search-result-container").click(function(e) {
        e.stopPropagation();
        return false;   
    }); 

    // check that click is not on serach bar itself
    $(".search-bar>form>input").click(function(e) {
        e.stopPropagation();
        return false;                                  
    }); 
})

// action when clicked on any result
$(".search-result").click(function(e) {
    console.log(e.target)
});

$(".search-bar>form>input").keyup(function(e){
    $(".search-result-container>h6>strong").text(e.target.value);
})

$(".search-result-container>h6").click(function(){
    $("#search-form").submit();
})