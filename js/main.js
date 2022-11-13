$("#menu_btn").click(function(){
    $("#title").text("교토 여행");



    $("#main_nav").addClass("on");
    $(".first_list").addClass("on");
    $("#menu_btn").hide();
    $("#menu_back_btn").show();
    $("#all").show();
    $("#menu_back_btn").attr('data-page','1');
})

$(".first_list > li:not(:eq(0))").click(function(){
    var target = $(this).attr("data-target");

    $("#menu_back_btn").show();
    $(".first_list").removeClass("on");
    $("#"+target).addClass("on");
    $("#menu_back_btn").attr('data-page','2');
})

$("#menu_back_btn").click(function(){

    var page = $(this).attr("data-page");

    if(page == '1'){
        $("#main_nav").removeClass("on");
        $("#all").hide();
        $("#menu_back_btn").hide();
        $("#menu_btn").show();
    } else if(page == '2') {
        $('.sca').removeClass("on");
        $(".first_list").addClass("on");
        $("#menu_back_btn").attr('data-page','1');
    }
})

$(".sca .day_list li:not(:eq(0))").click(function(){
    var target = $(this).attr("day-calendar");
    var targetTitle = $(this).parent().parent().parent().attr("id");

    
    $("#main_section div").removeClass("on");
    $('.sca').removeClass("on");
    $("#menu_back_btn").hide();
    $("#all").hide();
    $("#title").text(targetTitle);
    $("#menu_btn").show();
    $("#"+target).addClass("on");
    $("#main_nav").removeClass("on");
})

$(".siteBtn").click(function(){
    var href = $(this).prev().attr("href");

    location.href = href;
})

