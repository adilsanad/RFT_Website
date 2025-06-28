import { useEffect, useRef, useState } from "react"

function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    const num = Math.floor(value / 100_000) / 10 // e.g., 1,250,000 → 12.5 → 1.2M
    return Number.isInteger(num) ? `${num.toFixed(0)}M` : `${num.toFixed(1)}M`
  } else if (value >= 1_000) {
    const num = Math.floor(value / 100) / 10 // e.g., 99,999 → 999.9 → 999.9K
    return Number.isInteger(num) ? `${num.toFixed(0)}K` : `${num.toFixed(1)}K`
  } else {
    return value.toLocaleString()
  }
}

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export function useCountUpOnView(target: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const animationFrame = useRef<number>(null)

  useEffect(() => {
    if (!ref.current) return

    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now()

          const animate = (now: number) => {
            const elapsed = now - startTime
            const t = Math.min(elapsed / duration, 1)
            const eased = easeInOutQuad(t)
            const value = Math.floor(eased * target)

            setCount(value)

            if (t < 1) {
              animationFrame.current = requestAnimationFrame(animate)
            } else {
              setCount(target)
            }
          }

          animationFrame.current = requestAnimationFrame(animate)
        } else {
          cancelAnimationFrame(animationFrame.current!)
          setCount(0) // reset when out of view
        }
      },
      {
        threshold: 0.5,
      }
    )

    observer.current.observe(ref.current)

    return () => {
      observer.current?.disconnect()
      cancelAnimationFrame(animationFrame.current!)
    }
  }, [target, duration])

  return {
    ref,
    count: formatNumber(count),
  }
}
