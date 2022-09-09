export default function Meteor({ x, y, size, context, canvas }) {
  let positionX = x
  let positionY = y

  return {
    draw() {
      console.log({ context, positionX, positionY, x, y })
      context.beginPath()
      context.moveTo(positionX + size, positionY - size)
      context.lineTo(positionX, positionY)
      context.shadowBlur = 10
      context.shadowColor = '#CF352E'
      context.strokeStyle = 'white'
      context.lineCap = 'round'
      context.stroke()
    },
    update() {
      positionX -= size
      positionY += size

      if (positionX < canvas.width && positionY > canvas.height) {
        positionX = x
        positionY = -size
      }
    }
  }
}
