# Motion System

Subsystem of the Experience System. Canonical rules for animation.

## Budgets
| Item | Limit |
| --- | --- |
| Primary animations / page | ≤ 3 |
| Concurrent GSAP timelines | ≤ 3 active |
| ScrollTriggers / page | ≤ 4 |
| Hero sequence | ≤ 1200 ms |
| Allowed props | opacity, transform (filter rare) |

## ScrollTrigger mix
~80% once · 15% pin · 5% scrub

## Intents
`focus` · `guide` · `feedback` · `transition` · `context` · `celebration`

## States
Idle → Entering → Focused → Leaving · Reduced · Disabled

## Patterns (purpose names)
FocusHeadline · RevealMetrics · GuideTimeline · StoryProgress · PrimaryCTA · ScrollOnce · NavigationNarrative

## Atmosphere
Noise + grid + glow + orb + light. Mouse shift 2–5%. No custom cursor. No sound.

## Reduced motion
`prefers-reduced-motion: reduce` → Reduced state: no pin/scrub, content fully visible.

## QA before merge
60 FPS · reduced motion · keyboard · SR · mobile · Safari/FF/Chrome · no ST leaks · scroll restore · SceneRegistry budget
