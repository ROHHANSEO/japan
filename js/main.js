$("#menu_btn").click(function(){
    $("#title").text("교토 여행");

    $("#main_nav").show();
    $(".sca").hide();
    $(".first_list").show();
    $(this).hide();
    $("#menu_back_btn").show();
    $(".first_list").addClass("on");
    $("#all").show();
})

$(".first_list > li:not(:eq(0))").click(function(){
    var target = $(this).attr("data-target");

    $(this).parent().hide();
    $("#menu_back_btn").show();
    $("#"+target).addClass("on");
    $("#"+target).show();
})

$("#menu_back_btn").click(function(){
    if(!$(".first_list").hasClass("on")){
        $(".on").hide();
        $(".first_list").show();
        $("#menu_back_btn").hide();
    } else {
        $("#main_nav").hide();
        $(".first_list").hide();
        $("#menu_back_btn").hide();
        $("#menu_btn").show();
        $("#all").hide();
    }
})

$(".sca .day_list li:not(:eq(0))").click(function(){
    var target = $(this).attr("day-calendar");
    var targetTitle = $(this).parent().parent().parent().attr("id");

    $("#main_section div").hide();
    $("#menu_back_btn").hide();
    $("#main_nav").hide();
    $("#all").hide();
    $("#title").text(targetTitle);
    $("#menu_btn").show();
    $("#"+target).addClass("on");
    $("#"+target).show();
})

