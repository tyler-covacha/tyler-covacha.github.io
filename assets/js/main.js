/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// IE flexbox workaround.
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// Page load animation.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Forms.
	$('form').on('click', '.submit', function (event) {
		event.stopPropagation();
		event.preventDefault();
		$(this).parents('form').submit();
	});

	// Sidebar.
	if ($sidebar.length > 0) {

		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function () {

				var $this = $(this);

				if ($this.attr('href').charAt(0) != '#')
					return;

				$sidebar_a.removeClass('active');

				$this
					.addClass('active')
					.addClass('active-locked');
			})
			.each(function () {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				if ($section.length < 1)
					return;

				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					initialize: function () {
						$section.addClass('inactive');
					},
					enter: function () {

						$section.removeClass('inactive');

						if ($sidebar_a.filter('.active-locked').length == 0) {
							$sidebar_a.removeClass('active');
							$this.addClass('active');
						} else if ($this.hasClass('active-locked')) {
							$this.removeClass('active-locked');
						}
					}
				});
			});
	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function () {
			if (breakpoints.active('<=large')
				&& !breakpoints.active('<=small')
				&& $sidebar.length > 0)
				return $sidebar.height();

			return 0;
		}
	});

	// Spotlights.
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',
			initialize: function () {
				$(this).addClass('inactive');
			},
			enter: function () {
				$(this).removeClass('inactive');
			}
		})
		.each(function () {

			var $this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;

			$image.css('background-image', 'url(' + $img.attr('src') + ')');

			if (x = $img.data('position'))
				$image.css('background-position', x);

			$img.hide();
		});

	// Features.
	$('.features').scrollex({
		mode: 'middle',
		top: '-20vh',
		bottom: '-20vh',
		initialize: function () {
			$(this).addClass('inactive');
		},
		enter: function () {
			$(this).removeClass('inactive');
		}
	});

	/* =====================================================
	   PROJECT GRID MODAL (YOUR ADDITION)
	===================================================== */

	var projectData = {
		zelda: {
			title: "Legends of Zelda ENRAGED",
			image: "images/zelda_thumb.gif",
			description: `
				The more Link defeats enemies, the more ENRAGED he becomes.
				Press "4" in-game to unleash bloodthirsty Link.
				Built using C# in Unity.
			`,
			links: `
				<strong>Downloads:</strong> 
				<a href="links/ZeldaMacGoldExe.zip">Mac</a>
				<a href="links/ZeldaWindowsGoldExe.zip">Windows</a>
			`
		},
		recoil: {
			title: "Recoil",
			image: "images/recoil_thumb.gif",
			description: `
				Can't move? Then shoot!
				Built using C# in Unity.<br>
				Utilized Pub-Sub, Composition, and Inheritance.
			`,
			links: `
				<strong>Downloads:</strong> 
				<a href="links/RecoilGoldMacExe.zip">Mac</a>
				<a href="links/RecoilGoldWindowsExe.zip">Windows</a><br>
				<strong>Link:</strong> <a href="https://tyronecoachella.itch.io/recoil">Itch.io</a>
			`
		},
		lostspirit: {
			title: "Lost Spirit",
			image: "images/lostspirit_thumb.gif",
			description: `
				You wake up in a morgue with spirit powers.
				Navigate the hospital, solve puzzles, and escape.
			`,
			links: `
				<strong>Downloads:</strong> 
				<a href="links/Lost_Spirit_Mac.zip">Mac</a>
				<a href="links/Lost_Spirit_Windows.zip">Windows</a><br>
				<strong>Links:</strong> <a href="https://isvong.itch.io/lost-spirit">Itch.io</a>
				<a href="https://www.youtube.com/watch?v=bbxzO7ohnnM">Trailer</a>
			`
		}
	};

	var $modal = $('#project-modal');
	var $modalImg = $('#modal-image');
	var $modalTitle = $('#modal-title');
	var $modalDate = $('#modal-date'); // assuming this exists in your HTML
	var $modalDesc = $('#modal-description');
	var $modalLinks = $('#modal-links');

	$('.project-card').on('click', function () {
		var key = $(this).data('project');
		var data = projectData[key];

		$modalImg.attr('src', data.image);
		$modalTitle.html(data.title);
		$modalDate.html(data.date);           // fill in date
		$modalDesc.html(data.description);
		$modalLinks.html(data.links);

		$modal.fadeIn(200);
	});

	$('.close').on('click', function () {
		$modal.fadeOut(200);
	});

	$modal.on('click', function (e) {
		if ($(e.target).is('#project-modal'))
			$modal.fadeOut(200);
	});

})(jQuery);
