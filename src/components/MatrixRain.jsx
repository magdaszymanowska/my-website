import { useEffect, useRef } from 'react'

export default function MatrixRain({ opacity = 0.22 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let lastTime = 0
    const INTERVAL = 60 // ms between updates

    const FONT_SIZE = 14
    const CHAR_SET = '01'
    let columns = []

    const init = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const numCols = Math.floor(canvas.width / FONT_SIZE)
      columns = []

      for (let i = 0; i < numCols; i++) {
        // Each column has multiple independent "streams" at different positions
        const numStreams = 2 + Math.floor(Math.random() * 3)
        const streams = []
        for (let s = 0; s < numStreams; s++) {
          streams.push({
            y: Math.random() * canvas.height / FONT_SIZE, // random start position
            speed: 0.4 + Math.random() * 0.8,
            length: 8 + Math.floor(Math.random() * 20), // how long the tail is
            brightness: 0.5 + Math.random() * 0.5,
          })
        }
        columns.push({ streams, x: i * FONT_SIZE })
      }

      // Fill canvas black initially
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Pre-generate random chars for each cell — flickering effect
    const getChar = () => CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]

    const draw = (timestamp) => {
      animId = requestAnimationFrame(draw)
      if (timestamp - lastTime < INTERVAL) return
      lastTime = timestamp

      // Dark overlay to create fade trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      columns.forEach(col => {
        col.streams.forEach(stream => {
          const totalRows = Math.floor(canvas.height / FONT_SIZE)

          // Draw each character in the stream tail
          for (let j = 0; j < stream.length; j++) {
            const rowY = Math.floor(stream.y) - j
            if (rowY < 0 || rowY >= totalRows) continue

            const charX = col.x
            const charY = rowY * FONT_SIZE

            let alpha, color, bold
            if (j === 0) {
              // Bright white-green lead
              color = `rgba(200, 255, 215, ${stream.brightness})`
              bold = true
              ctx.font = `bold ${FONT_SIZE}px 'Courier New', monospace`
            } else if (j === 1) {
              color = `rgba(100, 255, 140, ${stream.brightness * 0.9})`
              bold = false
              ctx.font = `${FONT_SIZE}px 'Courier New', monospace`
            } else if (j < 5) {
              const fade = 1 - (j / stream.length) * 0.5
              color = `rgba(0, 200, 80, ${stream.brightness * fade})`
              ctx.font = `${FONT_SIZE}px 'Courier New', monospace`
            } else {
              const fade = 1 - j / stream.length
              color = `rgba(0, 130, 50, ${stream.brightness * fade * 0.8})`
              ctx.font = `${FONT_SIZE - 2}px 'Courier New', monospace`
            }

            ctx.fillStyle = color
            ctx.fillText(getChar(), charX, charY)
          }

          // Advance stream
          stream.y += stream.speed

          // Reset stream when it scrolls off bottom
          if ((stream.y - stream.length) * FONT_SIZE > canvas.height) {
            stream.y = -stream.length - Math.random() * 30
            stream.speed = 0.4 + Math.random() * 0.8
            stream.length = 8 + Math.floor(Math.random() * 20)
            stream.brightness = 0.5 + Math.random() * 0.5
          }
        })
      })
    }

    init()
    animId = requestAnimationFrame(draw)

    const ro = new ResizeObserver(init)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity,
        display: 'block',
      }}
    />
  )
}