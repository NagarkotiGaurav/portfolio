# Motion Guidelines (implementation)

See [docs/MotionSystem.md](../../docs/MotionSystem.md) for the canonical RFC.

Quick rules:
- Max 3 primaries / page (SceneRegistry)
- Animate opacity + transform only
- Words not letters
- Kill GSAP contexts on unmount (`useGsapScene`)
- Ambient never competes with CTA
