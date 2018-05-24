# setup elements
ball = new Layer
	parent: boundary
	width: 100
	height: 100
	borderRadius: 1000
	backgroundColor: "rgba(255,131,215,1)"
	

# responsive stuff		
place = () ->
	gutter = 25
	
	boundary.props = 
		width: (Screen.width / 2) - (gutter*2)
		height: Screen.height - (gutter*2)
		x: gutter
		y: gutter
	
place()

Canvas.onResize ->
	place()