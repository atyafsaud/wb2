var canvas = document.querySelector('#board')
	, ctx = canvas.getContext('2d')
	
	, myColor = Math.round(Math.random() * 0xFFFFFF).toString(16)
	, drawing = false
	, pre = {}
	
	, socket = io.connect('http://localhost:3000')

function drawLine (opts) {
	
	var from = opts.from
		, to = opts.to
		, color = opts.color
		
		ctx.beginPath()
		ctx.moveTo(from.x, from.y)
		ctx.lineTo(to.x, to.y)
		ctx.strokeStyle = color
		ctx.stroke()
}
	
canvas.addEventListener('mousedown', function (e) {

	drawing = true
	
	pre.x = e.pageX
	pre.y = e.pageY
})

canvas.addEventListener('mouseup', function (e) {
	drawing = false
})

canvas.addEventListener('mousemove', function (e) {

	if (!drawing) return;
	
	var opts = {
		from: pre
	,	to: {x: e.pageX, y: e.pageY}
	, color: myColor
	}
	
	drawLine(opts)
	
	socket.emit('userDraw', opts)
	
	pre = opts.to
})

socket.on('userDrawing', drawLine)


