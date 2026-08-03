# Performance

- Prefer `transform` / `opacity` for motion
- ≤ 3 active GSAP timelines; ≤ 4 ScrollTriggers per page
- Hero sequence ≤ 1200 ms
- Lazy route chunks (existing)
- Kill GSAP contexts on route change
- Ambient effects off or lighter on coarse pointers / reduced motion
