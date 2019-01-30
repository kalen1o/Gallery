(($) => {
	'use strict';

	$.fn.gallery = function(options = {}) {
		let defaults = {
			current: 0,
			classes: ''
		};
		
		options = $.extend(defaults, options);

		return this.each((i, element) => {
			let $gallery = $(element),
				$galleryItems = $gallery.children();

			$gallery
				.addClass('gallery')
				.addClass(options.classes);

			$galleryItems.addClass('gallery-item');

			$galleryItems
				.eq(options.current)
				.addClass('current');

			let children = Array.from($galleryItems),
				heights = children.map(item => {
					return $(item).height();
				}),
				maxHeight = Math.max(...heights);
			
			$gallery.height(maxHeight);

			let $strip = $('.strip', $(this).parent()),
				$stripChildren,
				j;
			for (let i = 0; i < children.length; i++) {
				$stripChildren = $($(children[i]).html());
				$stripChildren.appendTo($strip).addClass('strip-item');
				if(options.current + 1 == $stripChildren.attr('alt')) {
					$stripChildren.addClass('current');
				}
				j = i + 1;
			};

			let $stripChildrens = $('.strip-item',  $(this).parent());
			$stripChildrens.css('max-width', 100 / j + '%');

			$gallery.attr('tabindex', 0);

			$gallery.on('keyup', function(event) {
				console.log(event)
				if (event.which !== 39 && event.which !== 37) return;
				let index = $gallery.find('.current').index();
					console.log('index', index);
					$gallery.find('.current').removeClass('current');
					$strip.find('.current').removeClass('current');


				if (event.which === 39) {
					//$gallery.find('.current').removeClass('current').next().addClass('current');

					if(index + 1 < $galleryItems.length) {
						$galleryItems.eq(index + 1).addClass('current');
						$stripChildrens.eq(index + 1).addClass('current');
					} else {
						$galleryItems.eq(0).addClass('current');
						$stripChildrens.eq(0).addClass('current');
					}
				} else if (event.which === 37) {
					if(index - 1 < $galleryItems.length) {
						$galleryItems.eq(index - 1).addClass('current');
						$stripChildrens.eq(index - 1).addClass('current');
					} else {
						$galleryItems.eq($galleryItems.length - 1).addClass('current');
						$stripChildrens.eq(0).addClass('current');
					}
				}
			});
			
			$('.checkbox', $(this).parent()).change(function() {
				let $previous = $('<span>').text('<').addClass('previous'),
					$next = $('<span>').text('>').addClass('next');
				if (this.checked) {
					$gallery.append($previous).append($next);

					$previous.on('click', function(event) {
						event.preventDefault();
						let index = $gallery.find('.current').index();
						console.log('index', index);
						$gallery.find('.current').removeClass('current');
						$strip.find('.current').removeClass('current');

						if(index - 1 < $galleryItems.length) {
							$galleryItems.eq(index - 1).addClass('current');
							$stripChildrens.eq(index - 1).addClass('current');
						} else {
							$galleryItems.eq($galleryItems.length - 1).addClass('current');
							$stripChildrens.eq(0).addClass('current');
						}
					});

					$next.on('click', function(event) {
						event.preventDefault();
						let index = $gallery.find('.current').index();
						console.log('index', index);

						$gallery.find('.current').removeClass('current');
						$strip.find('.current').removeClass('current');
						if(index + 1 < $galleryItems.length) {
							$galleryItems.eq(index + 1).addClass('current');
							$stripChildrens.eq(index + 1).addClass('current');
						} else {
							$galleryItems.eq(0).addClass('current');
							$stripChildrens.eq(0).addClass('current');
						}
					});
				} else {
					$('.previous').remove();
					$('.next').remove();
				};
			});
		});
	};

})(jQuery);