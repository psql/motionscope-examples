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
	text: "Spring Simulated"
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



#sliders
sliderDamping = new SliderComponent
	width: 150
	min: 0
	max: 1
	value: 0.7
	y: 110
	x: 40

sliderDampingLabel = new TextLayer
	text: "Damping: #{sliderDamping.value}"
	x: 40
	y: 130
	height: 34
	fontSize: 20
	font: "menlo, monospaced"

sliderMass = new SliderComponent
	x: 250
	y: 110
	width: 150
	min: 0
	max: 1
	value: 1

sliderMassLabel = new TextLayer
	text: "Mass: #{sliderMass.value}"
	x: 250
	y: 130
	width: 156
	height: 34
	fontSize: 20
	font: "menlo, monospaced"



sliderDamping.on "change:value", ->
	sliderDampingLabel.text = "Damping: #{(sliderDamping.value).toFixed(2)}"
	ball.animationOptions.curve = "Spring(damping: #{this.value})"
	
sliderMass.on "change:value", ->
	sliderMassLabel.text = "Mass: #{(sliderMass.value).toFixed(2)}"
	ball.animationOptions.curve = "Spring(mass: #{this.value})"


place()
Canvas.onResize ->
	place()
	
# animate
ball.stateSwitch("dismiss")
Utils.interval 1.5, ->
	ball.stateCycle("show","dismiss")
	
ball.animationOptions = 
	curve: Spring(damping: 0.7, mass: 1)

(require "MotionScope").load({
  parent: scopeContainer
}, (scope) ->
  scope.plot(ball, 'y',{
    color: '#ffdc6d'
  })
)