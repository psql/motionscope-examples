Canvas.backgroundColor = "black"
# setup elements
gutter = 25

scopeContainer = new Layer
	size: 100
	backgroundColor: "transparent"

ball = new Layer
	parent: boundary
	width: 100
	height: 100
	borderRadius: 1000
	backgroundColor: "rgba(255,131,215,1)"

label = new TextLayer
	x: 15
	y: 15
	text: "Sine vs Consine"
	textAlign: "center"
	fontFamily: "Menlo, monospaced"
	color: "white"
	fontSize: 16
	parent: boundary
	

# responsive stuff		
place = () ->
	
	boundary.props = 
		width: (Screen.width / 2) - (gutter*2)
		height: Screen.height - (gutter*2)
		x: gutter
		y: gutter
		
	scopeContainer.props = 
		width: (Screen.width / 2) - (gutter)
		height: Screen.height - (gutter*2)
		x: boundary.width + (gutter * 2)
		y: gutter
	
	
	ball.x = (boundary.width/2)- (ball.width / 2)
	
# 	setup states inside closure so it updates on resize
	ball.states = 
		show:
			midY : boundary.height/2
		dismiss:
			midY : boundary.height



counter = 0

Utils.interval 0.001, ->
	counter++
	
	# y = A sin(Bx + C) + D
	# amplitude is A
	# period is 2π/B
	# phase shift is −C/B
	# vertical shift is D
	
	ball.x = 150 * Math.sin(Math.PI / 200 * counter) + 200
	ball.y = 150 * Math.cos(Math.PI / 200 * counter) + 200

place()
Canvas.onResize ->
	place()
	
# animate

(require "MotionScope").load({
  parent: scopeContainer
}, (scope) ->
  scope.plot(ball, 'y',{
    color: '#ffdc6d'
  })
  scope.plot(ball, 'x',{color:'#ff5fff'})
)