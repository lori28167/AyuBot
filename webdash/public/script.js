$(".dropdown").on("hide.bs.collapse", function() {
  $(this).find(".dropdown-menu").first().addClass( "sliding" )
});
$(".dropdown").on("hidden.bs.collapse", function() {
  $(this).find(".dropdown-menu").first().removeClass( "sliding" )
});
$(document).click(function() {
  $(".dropdown-menu.collapse.show").collapse("hide");
});