"use client"

import { useState, useRef } from "react"
import { type Stage } from "@/hooks/useGameEngine"

interface ScreenProps {
  onStart: () => void
  onRestart: () => void
  stage: Stage
}

const pixelFont = { fontFamily: "'Press Start 2P', monospace" }

// ─── Pixel art wizard icon drawn with divs ────────────────────────────────────
function WizardIcon() {
  return (
    <div style={{ width: 48, height: 64, position: "relative", imageRendering: "pixelated" }}>
      {/* Hat */}
      <div style={{ position: "absolute", top: 0, left: 6, width: 36, height: 10, background: "#5b21b6" }} />
      <div style={{ position: "absolute", top: 2, left: 14, width: 20, height: 14, background: "#4c1d95" }} />
      <div style={{ position: "absolute", top: 4, left: 21, width: 6, height: 6, background: "#fbbf24" }} />
      {/* Head */}
      <div style={{ position: "absolute", top: 10, left: 10, width: 28, height: 22, background: "#fde68a" }} />
      {/* Eyes */}
      <div style={{ position: "absolute", top: 16, left: 15, width: 6, height: 6, background: "#1e1b4b" }} />
      <div style={{ position: "absolute", top: 16, left: 27, width: 6, height: 6, background: "#1e1b4b" }} />
      {/* Beard */}
      <div style={{ position: "absolute", top: 28, left: 14, width: 4, height: 6, background: "#e2e8f0" }} />
      <div style={{ position: "absolute", top: 28, left: 24, width: 4, height: 6, background: "#e2e8f0" }} />
      {/* Robe */}
      <div style={{ position: "absolute", top: 32, left: 6, width: 36, height: 24, background: "#6d28d9" }} />
      {/* Staff */}
      <div style={{ position: "absolute", top: 14, left: 40, width: 4, height: 42, background: "#92400e" }} />
      <div style={{ position: "absolute", top: 10, left: 37, width: 10, height: 10, background: "#8b5cf6", borderRadius: 2 }} />
    </div>
  )
}

// ─── Title Screen ─────────────────────────────────────────────────────────────
export function TitleScreen({ onStart, onStartTestMode }: Pick<ScreenProps, "onStart"> & { onStartTestMode?: () => void }) {
  const [showPw, setShowPw] = useState(false)
  const [pwError, setPwError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleTestClick = () => {
    setShowPw(true)
    setPwError(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handlePwSubmit = () => {
    const value = inputRef.current?.value ?? ""
    if (value === "adamadam") {
      onStartTestMode?.()
    } else {
      setPwError(true)
      if (inputRef.current) inputRef.current.value = ""
      inputRef.current?.focus()
    }
  }

  const handlePwKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handlePwSubmit()
    if (e.key === "Escape") setShowPw(false)
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #1a0a2e 50%, #0d0d1a 100%)",
        ...pixelFont,
      }}
    >
      {/* Stars */}
      {Array.from({ length: 40 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(i * 73 + 17) % 100}%`,
            top: `${(i * 47 + 11) % 60}%`,
            width: (i % 3 === 0) ? 3 : 2,
            height: (i % 3 === 0) ? 3 : 2,
            background: "#ffffff",
            opacity: 0.4 + (i % 5) * 0.12,
          }}
        />
      ))}

      {/* Title card */}
      <div
        className="flex flex-col items-center gap-6 px-10 py-8 relative"
        style={{
          background: "rgba(0,0,0,0.85)",
          border: "3px solid #fbbf24",
          borderRadius: 4,
          boxShadow: "0 0 40px rgba(251,191,36,0.25), inset 0 0 30px rgba(0,0,0,0.5)",
          maxWidth: 520,
          width: "90%",
        }}
      >
        {/* Corner decorations */}
        <div style={{ position: "absolute", top: 6, left: 6, width: 12, height: 12, border: "2px solid #fbbf24", borderRight: "none", borderBottom: "none" }} />
        <div style={{ position: "absolute", top: 6, right: 6, width: 12, height: 12, border: "2px solid #fbbf24", borderLeft: "none", borderBottom: "none" }} />
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 12, height: 12, border: "2px solid #fbbf24", borderRight: "none", borderTop: "none" }} />
        <div style={{ position: "absolute", bottom: 6, right: 6, width: 12, height: 12, border: "2px solid #fbbf24", borderLeft: "none", borderTop: "none" }} />

        <WizardIcon />

        <div className="flex flex-col items-center gap-1">
          <h1 style={{ fontSize: 20, color: "#fbbf24", textShadow: "0 0 20px rgba(251,191,36,0.8)", letterSpacing: 2, textAlign: "center" }}>
            WIZARD
          </h1>
          <h1 style={{ fontSize: 20, color: "#a78bfa", textShadow: "0 0 20px rgba(167,139,250,0.8)", letterSpacing: 2, textAlign: "center" }}>
            QUEST
          </h1>
        </div>

        <p style={{ fontSize: 7, color: "#9ca3af", textAlign: "center", lineHeight: 2.2 }}>
          SAVE THE HUMANS FROM<br />THE DARK LORD&apos;S CURSE
        </p>

        {/* Divider */}
        <div style={{ width: "100%", height: 2, background: "linear-gradient(90deg,transparent,#fbbf24,transparent)" }} />

        {/* Story */}
        <div
          className="w-full rounded px-4 py-3"
          style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)" }}
        >
          <p style={{ fontSize: 6, color: "#d1d5db", lineHeight: 2.4, textAlign: "center" }}>
            A powerful wizard must battle<br />
            through the enchanted forest,<br />
            storm the dark castle, soar to<br />
            the floating isle of Laputa, and<br />
            ascend the golden gates of Heaven<br />
            to face the final god.
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 flex-wrap justify-center">
          {[["A/D", "MOVE"], ["SPACE", "JUMP"], ["SHIFT", "DASH"], ["Z/J", "FIREBALL"], ["X", "RAIN"], ["C", "STORM"], ["V/K", "COMET"]].map(([k, v]) => (
            <div key={k} className="flex flex-col items-center gap-1">
              <div
                className="rounded px-2 py-1"
                style={{ background: "#1f2937", border: "1px solid #fbbf24", fontSize: 7, color: "#fbbf24" }}
              >
                {k}
              </div>
              <span style={{ fontSize: 5, color: "#6b7280" }}>{v}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="mt-2 px-8 py-3 rounded"
          style={{
            background: "#5b21b6",
            border: "3px solid #a78bfa",
            color: "#e9d5ff",
            fontSize: 10,
            cursor: "pointer",
            letterSpacing: 2,
            boxShadow: "0 0 20px rgba(139,92,246,0.5)",
            transition: "all 0.15s",
            fontFamily: "'Press Start 2P', monospace",
          }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#7c3aed"; (e.target as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(139,92,246,0.8)" }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#5b21b6"; (e.target as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(139,92,246,0.5)" }}
        >
          START GAME
        </button>

        {onStartTestMode && !showPw && (
          <button
            onClick={handleTestClick}
            className="px-6 py-2 rounded"
            style={{
              background: "#1f2937",
              border: "2px solid #ef4444",
              color: "#fca5a5",
              fontSize: 7,
              cursor: "pointer",
              letterSpacing: 1,
              boxShadow: "0 0 12px rgba(239,68,68,0.3)",
              transition: "all 0.15s",
              fontFamily: "'Press Start 2P', monospace",
              marginTop: -6,
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#374151"; (e.target as HTMLButtonElement).style.boxShadow = "0 0 18px rgba(239,68,68,0.5)" }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#1f2937"; (e.target as HTMLButtonElement).style.boxShadow = "0 0 12px rgba(239,68,68,0.3)" }}
          >
            TEST MODE
          </button>
        )}

        {onStartTestMode && showPw && (
          <div className="flex flex-col items-center gap-2" style={{ marginTop: -6 }}>
            <input
              ref={inputRef}
              type="password"
              placeholder="Enter password"
              onKeyDown={handlePwKeyDown}
              className="px-3 py-2 rounded text-center outline-none"
              style={{
                background: "#0f172a",
                border: `2px solid ${pwError ? "#ef4444" : "#ef4444"}`,
                color: "#fca5a5",
                fontSize: 8,
                fontFamily: "'Press Start 2P', monospace",
                width: 220,
              }}
            />
            {pwError && (
              <span style={{ fontSize: 6, color: "#ef4444" }}>WRONG PASSWORD</span>
            )}
            <div className="flex gap-2">
              <button
                onClick={handlePwSubmit}
                className="px-4 py-1.5 rounded"
                style={{
                  background: "#7f1d1d",
                  border: "2px solid #ef4444",
                  color: "#ffffff",
                  fontSize: 6,
                  cursor: "pointer",
                  fontFamily: "'Press Start 2P', monospace",
                }}
              >
                ENTER
              </button>
              <button
                onClick={() => setShowPw(false)}
                className="px-4 py-1.5 rounded"
                style={{
                  background: "#1f2937",
                  border: "2px solid #6b7280",
                  color: "#9ca3af",
                  fontSize: 6,
                  cursor: "pointer",
                  fontFamily: "'Press Start 2P', monospace",
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        )}

        <p style={{ fontSize: 5, color: "#4b5563", marginTop: -8 }}>
          v1.0 - PIXEL EDITION
        </p>
      </div>
    </div>
  )
}

// ─── Win Screen ───────────────────────────────────────────────────────────────
export function WinScreen({ onRestart }: Pick<ScreenProps, "onRestart">) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.92)",
        ...pixelFont,
      }}
    >
      <div
        className="flex flex-col items-center gap-5 px-10 py-8 relative"
        style={{
          background: "rgba(0,0,0,0.9)",
          border: "3px solid #22c55e",
          borderRadius: 4,
          boxShadow: "0 0 60px rgba(34,197,94,0.3)",
          maxWidth: 480,
          width: "90%",
        }}
      >
        {/* Corner decorations */}
        <div style={{ position: "absolute", top: 6, left: 6, width: 12, height: 12, border: "2px solid #22c55e", borderRight: "none", borderBottom: "none" }} />
        <div style={{ position: "absolute", top: 6, right: 6, width: 12, height: 12, border: "2px solid #22c55e", borderLeft: "none", borderBottom: "none" }} />
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 12, height: 12, border: "2px solid #22c55e", borderRight: "none", borderTop: "none" }} />
        <div style={{ position: "absolute", bottom: 6, right: 6, width: 12, height: 12, border: "2px solid #22c55e", borderLeft: "none", borderTop: "none" }} />

        {/* Trophy pixel art */}
        <div style={{ width: 40, height: 40, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 8, width: 24, height: 20, background: "#fbbf24" }} />
          <div style={{ position: "absolute", top: 4, left: 4, width: 4, height: 12, background: "#fbbf24" }} />
          <div style={{ position: "absolute", top: 4, left: 32, width: 4, height: 12, background: "#fbbf24" }} />
          <div style={{ position: "absolute", top: 20, left: 14, width: 12, height: 8, background: "#d97706" }} />
          <div style={{ position: "absolute", top: 28, left: 8, width: 24, height: 4, background: "#b45309" }} />
          <div style={{ position: "absolute", top: 8, left: 15, width: 10, height: 6, background: "#fef08a" }} />
        </div>

        <h2 style={{ fontSize: 18, color: "#22c55e", textShadow: "0 0 20px rgba(34,197,94,0.8)", textAlign: "center", letterSpacing: 2 }}>
          VICTORY!
        </h2>

        <div style={{ width: "100%", height: 2, background: "linear-gradient(90deg,transparent,#22c55e,transparent)" }} />

        <p style={{ fontSize: 8, color: "#86efac", textAlign: "center", lineHeight: 2.5 }}>
          THE DARK LORD, MUSKA,<br />AND GOD HAVE BEEN DEFEATED!
        </p>
        <p style={{ fontSize: 7, color: "#9ca3af", textAlign: "center", lineHeight: 2.5 }}>
          The humans are safe.<br />
          The wizard&apos;s quest is complete.<br />
          Peace returns to the realm.
        </p>

        <button
          onClick={onRestart}
          className="mt-2 px-8 py-3 rounded"
          style={{
            background: "#14532d",
            border: "3px solid #22c55e",
            color: "#bbf7d0",
            fontSize: 9,
            cursor: "pointer",
            letterSpacing: 2,
            boxShadow: "0 0 20px rgba(34,197,94,0.4)",
            fontFamily: "'Press Start 2P', monospace",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#166534" }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#14532d" }}
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  )
}

// ─── Game Over Screen ─────────────────────────────────────────────────────────
export function GameOverScreen({ onRestart }: Pick<ScreenProps, "onRestart">) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.93)",
        ...pixelFont,
      }}
    >
      <div
        className="flex flex-col items-center gap-5 px-10 py-8 relative"
        style={{
          background: "rgba(0,0,0,0.9)",
          border: "3px solid #ef4444",
          borderRadius: 4,
          boxShadow: "0 0 60px rgba(239,68,68,0.25)",
          maxWidth: 440,
          width: "90%",
        }}
      >
        {/* Corner decorations */}
        <div style={{ position: "absolute", top: 6, left: 6, width: 12, height: 12, border: "2px solid #ef4444", borderRight: "none", borderBottom: "none" }} />
        <div style={{ position: "absolute", top: 6, right: 6, width: 12, height: 12, border: "2px solid #ef4444", borderLeft: "none", borderBottom: "none" }} />
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 12, height: 12, border: "2px solid #ef4444", borderRight: "none", borderTop: "none" }} />
        <div style={{ position: "absolute", bottom: 6, right: 6, width: 12, height: 12, border: "2px solid #ef4444", borderLeft: "none", borderTop: "none" }} />

        {/* Skull pixel art */}
        <div style={{ width: 36, height: 40, position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 4, width: 28, height: 24, background: "#e2e8f0" }} />
          <div style={{ position: "absolute", top: 6, left: 8, width: 7, height: 7, background: "#0f172a" }} />
          <div style={{ position: "absolute", top: 6, left: 21, width: 7, height: 7, background: "#0f172a" }} />
          <div style={{ position: "absolute", top: 8, left: 10, width: 3, height: 3, background: "#ef4444" }} />
          <div style={{ position: "absolute", top: 8, left: 23, width: 3, height: 3, background: "#ef4444" }} />
          <div style={{ position: "absolute", top: 22, left: 6, width: 24, height: 8, background: "#e2e8f0" }} />
          <div style={{ position: "absolute", top: 24, left: 10, width: 4, height: 6, background: "#0f172a" }} />
          <div style={{ position: "absolute", top: 24, left: 16, width: 4, height: 6, background: "#0f172a" }} />
          <div style={{ position: "absolute", top: 24, left: 22, width: 4, height: 6, background: "#0f172a" }} />
          <div style={{ position: "absolute", top: 30, left: 4, width: 28, height: 10, background: "#cbd5e1" }} />
        </div>

        <h2 style={{ fontSize: 16, color: "#ef4444", textShadow: "0 0 20px rgba(239,68,68,0.8)", textAlign: "center", letterSpacing: 2 }}>
          GAME OVER
        </h2>

        <div style={{ width: "100%", height: 2, background: "linear-gradient(90deg,transparent,#ef4444,transparent)" }} />

        <p style={{ fontSize: 7, color: "#9ca3af", textAlign: "center", lineHeight: 2.5 }}>
          The wizard has fallen...<br />
          The humans remain captive.<br />
          Will you try again?
        </p>

        <button
          onClick={onRestart}
          className="mt-2 px-8 py-3 rounded"
          style={{
            background: "#450a0a",
            border: "3px solid #ef4444",
            color: "#fecaca",
            fontSize: 9,
            cursor: "pointer",
            letterSpacing: 2,
            boxShadow: "0 0 20px rgba(239,68,68,0.4)",
            fontFamily: "'Press Start 2P', monospace",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#7f1d1d" }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#450a0a" }}
        >
          TRY AGAIN
        </button>
      </div>
    </div>
  )
}

// ─── Stage Transition Banner ──────────────────────────────────────────────────
export function StageTransition({ stage }: { stage: Stage }) {
  const labels: Partial<Record<Stage, string>> = {
    stage1: "LEVEL 1-1 - ENCHANTED FOREST",
    stage2: "LEVEL 1-2 - DARK CASTLE",
    stage3: "LEVEL 1-3 - CASTLE ROOFTOP",
    stage4: "LEVEL 2-1 - LAPUTA APPROACH",
    stage5: "LEVEL 2-2 - SKY FORTRESS",
    stage6: "LEVEL 2-3 - MUSKA'S SANCTUM",
    stage7: "LEVEL 3-1 - GATES OF HEAVEN",
    stage8: "LEVEL 3-2 - GOLDEN CLOUDS",
    stage9: "LEVEL 3-3 - THRONE OF GOD",
  }
  const label = labels[stage]
  if (!label) return null
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ background: "rgba(0,0,0,0)", ...pixelFont }}
    >
      <div
        className="px-10 py-4 flex flex-col items-center gap-2"
        style={{
          background: "rgba(0,0,0,0.85)",
          border: "2px solid #fbbf24",
          boxShadow: "0 0 30px rgba(251,191,36,0.2)",
          borderRadius: 2,
          animation: "fadeInOut 2.5s ease-in-out",
        }}
      >
        <span style={{ fontSize: 6, color: "#9ca3af", letterSpacing: 3 }}>NOW ENTERING</span>
        <span style={{ fontSize: 11, color: "#fbbf24", letterSpacing: 2, textAlign: "center" }}>{label}</span>
      </div>
    </div>
  )
}
