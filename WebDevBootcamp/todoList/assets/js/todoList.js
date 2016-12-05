//Check off Todos when clicked
$("ul").on("click", "li", function() {
		$(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on("click", "span", function(e) {
	$(this).parent().fadeOut(400, function() {
		$(this).remove();
	});
	e.stopPropagation();
});

$("input[type='text'").keypress(function(e) {
 if(e.which === 13) {
 	//grab text from input
	var toDoText = $(this).val();
	$(this).val("");
	//create a new li and add to ul
	$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + toDoText + "</li>");
 }

});

$(".fa-plus").click(function() {
	$("input[type='text'").fadeToggle();
});