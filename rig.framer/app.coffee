# setup elements
gutter = 25

scopeContainer = new Layer
	size: 100
	backgroundColor: "red"

ball = new Layer
	parent: boundary
	width: 100
	height: 100
	borderRadius: 1000
	backgroundColor: "rgba(255,131,215,1)"
	

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
Utils.interval 0.5, ->
	ball.stateCycle("show","dismiss")
	
ball.animationOptions = 
	curve: Bezier.linear
	time: 0


(require "MotionScope").load((scope) ->
  parent: scopeContainer
  scope.plot(ball, 'y')
)