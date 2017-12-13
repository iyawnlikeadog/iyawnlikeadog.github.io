export default function works() {

	// Masonry

	var container = document.querySelector('.works')

	var msnry = new Masonry(container, {
		itemSelector: '.works-item'
	});

	// Placeholders -> Previews -> Images

	[].forEach.call(document.querySelectorAll('.placeholder'), function(el) {

		var preview  = el.querySelector('.preview'),
				img      = new Image(),
				imgLarge = new Image()

		// Show preview

		img.src = preview.src

		img.onload = function() {
			preview.classList.add('preview_loaded')
		}

		// Show large image

		imgLarge.src = el.dataset.large

		imgLarge.onload = function() {
			imgLarge.classList.add('large_loaded')
		}
		el.appendChild(imgLarge)

	})

}
