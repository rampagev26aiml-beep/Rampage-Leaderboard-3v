"use client"

import { useEffect, useRef } from "react"

interface DotGridProps {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  shockRadius?: number
  shockStrength?: number
  resistance?: number
  returnDuration?: number
}

interface Dot {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
}

export default function DotGrid({
  dotSize = 5,
  gap = 15,
  baseColor = "#271E37",
  activeColor = "#5227FF",
  proximity = 120,
  shockRadius = 250,
  shockStrength = 5,
  resistance = 750,
  returnDuration = 1.5,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDots()
    }

    const initDots = () => {
      dotsRef.current = []
      const cols = Math.ceil(canvas.width / gap)
      const rows = Math.ceil(canvas.height / gap)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * gap,
            y: j * gap,
            baseX: i * gap,
            baseY: j * gap,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      dotsRef.current.forEach((dot) => {
        const dx = dot.x - clickX
        const dy = dot.y - clickY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < shockRadius) {
          const force = (1 - dist / shockRadius) * shockStrength
          dot.vx += (dx / dist) * force * 10
          dot.vy += (dy / dist) * force * 10
        }
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      dotsRef.current.forEach((dot) => {
        const dx = mouseRef.current.x - dot.x
        const dy = mouseRef.current.y - dot.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Return to base position
        const returnForce = 1 / (returnDuration * 60)
        dot.vx += (dot.baseX - dot.x) * returnForce
        dot.vy += (dot.baseY - dot.y) * returnForce

        // Apply resistance
        dot.vx *= 1 - 1 / resistance
        dot.vy *= 1 - 1 / resistance

        // Mouse repulsion
        if (dist < proximity) {
          const force = (1 - dist / proximity) * 0.5
          dot.vx -= (dx / dist) * force
          dot.vy -= (dy / dist) * force
        }

        dot.x += dot.vx
        dot.y += dot.vy

        // Draw dot
        const isActive = dist < proximity
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? activeColor : baseColor
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength, resistance, returnDuration])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  )
}
