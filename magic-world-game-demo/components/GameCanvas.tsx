"use client"

import { useRef, useEffect } from "react"
import { CANVAS_W, CANVAS_H } from "@/hooks/useGameEngine"

interface GameCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
}

export default function GameCanvas({ canvasRef }: GameCanvasProps) {
  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="block"
      style={{ imageRendering: "pixelated" }}
      aria-label="Wizard Quest game canvas"
    />
  )
}
