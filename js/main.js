$(document).ready(function(){
	$(window).scroll(function () {
		// console.log($(this).scrollTop())
		if($(this).scrollTop() > 300){
			$('#scroll_top_btn').fadeIn();
		}else{
			$('#scroll_top_btn').fadeOut(20*60*1000);
		}
	});
	$('#scroll_top_btn').click(function(e) {
		$('body, html').animate({
			scrollTop:0
		})
	});

	$('.user-data').submit(function(e) {
		e.preventDefault();
		var $this_form   = $(this),
			user_name    = $('.input_name', $this_form).val(),
			user_surname = $('.input_surname', $this_form).val();
			is_active    = $('.is_active', $this_form).prop('checked'),
			tr_html      = $('.user-data-table tbody tr:first').clone();

			tr_html.find('.name-val').text(user_name).end()
					.find('.surname-val').text(user_surname).end()
					.find('.status-indicator').attr('data-active',is_active);

			$('.user-data-table').append(tr_html);
			// $this_form.trigger('reset');

	});
	$('.user-data-table').on('click', '.delete-line', function(e) {
		e.preventDefault();
		e.stopPropagation();
		// $(this).closest('tr').remove();
		var $this = $(this),
			offset = $this.offset();

		// console.log(offset)
		$('.action_window').css({
			left: offset.left,
			top: offset.top + $(this).outerHeight() + 10
		}).show();
		closeWindow();

		initActions($this.closest('tr'));

	});

	$('.user-data-table').on('click', '.status-indicator', function(e) {
		$(this).attr('data-active',confirm("Is user active?"));
	});
	$('.user-data-table').on('click', '.change-value', function(e) {
		var $this = $(this),
			new_text = prompt("Введите новое значение", $this.text());
			console.log(new_text)
	
		if(new_text){
			$this.text(new_text);
		}
	});
	$('.action_window .close').click(function(e) {
		e.preventDefault();
		$('.action_window').hide()
	});

	$(document).mouseup(function (e){
		var div = $(".action_window"); 
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			div.hide(); 
			closeWindow();
		}
	});

});

var actions = {
	remove_line: function($row){
		$row.remove();
	},
	check_line: function($row){
		console.log($row)
		$row.addClass('info')
	},
	change_status: function($row){
		console.log('change_status')
	},
	move_line_down: function($row){
		console.log('move_line_down')
	},
	move_line_up: function($row){
		console.log('move_line_up')
	},
}

function initActions($row){
	var $action_window =  $(".action_window"),
		$link = $('.actions a', $action_window);
	$link.on('click', function(e){
		e.preventDefault();
		var action_name = $(this).data('action');

		actions[action_name]($row);
		$action_window.hide();
		closeWindow();
	});

}

function closeWindow(){
	$('.action_window .actions a').off('click');
}
