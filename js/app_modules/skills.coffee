# skill, class, mark, color

skills = [
	['Design',    'design', '8.6', '#6EDF95']
	['HTML/CSS',  'html',   '9.5', '#6EDF95']
	['Front End', 'front',  '8.0', '#ECC160']
	['Back End',  'back',   '6.5', '#EE6255']
	['CMS',       'cms',    '7.5', '#ECC160']
]

# skill related technologies

technologies = [
	['Photoshop','Illustrator','Corel Draw','3ds Max']
	['HTML5','CSS3','Less','SASS','SCSS','Stylus','Jade']
	['jQuery','Vanilla.js','AngularJS','CoffeeScript']
	['PHP','MySQL','NoSQL', 'Python','Node.js','nw.js']
	['WordPress','Cockpit','CS Cart', 'More+']
]

# show skills

$.each skills, (k,v) ->

	if k % 2 == 0 then even_odd = "Left" else even_odd = "Right"
	# <!--<svg width="60" height="60" class="chart #{v[1]}">
		# <circle class="pie #{v[1]}" r="25" cx="30" cy="30" style="animation-delay:#{k/2}s;">
	# </svg>
	$('#skills-list').append """
	<div class="item #{even_odd} #{v[1]} animated fadeIn" style="animation-delay:#{1+k/2}s;">
		<h4>#{v[0]} (#{v[2]})</h4>
		<h5>#{technologies[k].join(', ')}</h5>
		<div class="progress-bar">
			<div class="progress animated" style="background:#{v[3]};"></div>
		</div>
	</div>
	"""
