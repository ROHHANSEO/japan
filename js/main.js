$("#menu_btn").click(function(){
    var status = $(this).attr("data-active");

    if(status != 'off'){
        $("#main_nav").hide();
        $("#main_nav > ul").hide();
        $(".first_list").show();
        $(this).attr("data-active",'off');
        $(this).text('메뉴');
    } else {
        $("#main_nav").show();
        $(this).attr("data-active",'on');
        $(this).text("X");
    }
})

$(".first_list > li:not(:eq(0))").click(function(){
    var target = $(this).attr("data-target");

    $(this).parent().hide();
    $("#"+target).show();
})