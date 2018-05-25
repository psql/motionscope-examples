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
	text: "Ease In Out"
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

place()
Canvas.onResize ->
	place()
	
# animate
ball.stateSwitch("dismiss")
Utils.interval 1.5, ->
	ball.stateCycle("show","dismiss")
	
ball.animationOptions = 
	curve: Bezier.easeInOut
	time: 1


(require "MotionScope").load({
  parent: scopeContainer
}, (scope) ->
  scope.plot(ball, 'y')
)