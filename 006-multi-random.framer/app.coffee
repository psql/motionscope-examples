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
	borderRadius: 10
	backgroundColor: "rgba(255,131,215,1)"

label = new TextLayer
	x: 15
	y: 15
	text: "Layered Animation"
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

Utils.interval Utils.randomNumber(0.5,3), ->
	ball.animate
		properties:
			x: Utils.randomNumber(0,(boundary.width - ball.width))
			
Utils.interval Utils.randomNumber(0.5,3), ->
	ball.animate
		properties:
			y: Utils.randomNumber(0,(boundary.height - ball.width))	

Utils.interval Utils.randomNumber(1,3), ->
	ball.animate
		properties:
			rotation: Utils.randomNumber(-360,360)
		time: 3
	
ball.animationOptions = 
	curve: Spring(damping: 0.8, mass: 10)


(require "MotionScope").load({
  parent: scopeContainer
}, (scope) ->
  scope.plot(ball, 'y', {color: "yellow"})
  scope.plot(ball, 'x', {color:"#fb5a75"})
  scope.plot(ball, 'rotation', {color:"#6dd9ff"})
)