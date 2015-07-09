$(function () {
    materialRipple();
});

function materialRipple() {
    $(".fab:not(.disabled)").on("mousedown", function (e) {
        recycler();
        var offset = $(this).offset();
        var XCoord = (e.pageX - offset.left);
        var YCoord = (e.pageY - offset.top);

        if ($(this).outerWidth() < 199) {
            $(this).children().append($("<div class='ripple ripple-active'></div>").css({
                left: XCoord - 4.5,
                top: YCoord - 2,
                height: $(this).width() * .20,
                width: $(this).width() * .20
            })).on("mouseup", function () {
                $(this).children('div').removeClass('ripple-active');
            });
        } else {
            $(this).children().append($("<div class='ripple ripple-active'></div>").css({
                left: XCoord - 4.5,
                top: YCoord - 2,
                height: $(this).width() * .05,
                width: $(this).width() * .05
            })).on("mouseup", function () {
                $(this).children('div').removeClass('ripple-active');
            });
        }
    });
}

function recycler() {
    $('html').find('.ripple:not(.active)').remove();
}
