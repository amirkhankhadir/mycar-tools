# Mylo DS — Documentation Guidelines

> **File roles (one fact, one home):** `library-index.md` = index + kickoff + component registry + fileKeys. **This file (`documentation.md`) = methodology** — when/why/what to document, section list, voice, dev-notes philosophy, lifecycle. `doc-kit.md` = execution — exact tokens/styles/icons/props, snippets, the §0 pre-show QA checklist, and all build gotchas. When a value or rule is needed, it lives in doc-kit; this file points there rather than restating.
>
> Adapted from the Claude Design System documentation guide. **Scope of this project: Figma-only** (no code library / Storybook). The source of truth is the **Figma component itself + designer intent**.
>
> **Foundation is filled from the real Mўlo libraries** (Core Variables & Styles + Text Styles), studied 2026-07-07. Token names, text styles, radius/spacing/elevation, and the focus-ring token below are REAL Mylo values — use them directly.
>
> **All project decisions are settled:** mobile-width component previews, colored Do/Don't cards, all token-bound; **dev detail lives in a separate `DEV NOTES — [Component]` frame** (see that section); **finalized docs are tracked in `library-index.md`** (the component registry).
>
> ⚡ **Load `.claude/doc-kit.md` first.** It freezes the reusable references so we don't re-derive them each session: the exact house-style spec (frame **800px** wide — the canonical Accordion doc supersedes the old 720 figure), the variable-ID and text-style-ID maps (bind by ID, no harvest), status-icon keys, per-component prop tables, and paste-in JS snippet helpers. Only re-harvest if a bind actually fails.

## Figma Documentation

Documentation in Figma is for **designers** — explains intent, UX logic, usage rules, behavioral patterns.
Developer-facing detail (exact token values, spacing numbers, implementation) lives in **Figma Dev Mode / dev handoff**, not in the designer-facing doc.

### Core Principle

> Help designers make decisions. Don't describe what is already visible.

- Don't duplicate Dev Mode / inspect (token values, exact numbers)
- Don't restate what the component's variants/properties already show
- Focus on: **why** the component exists, **when** to use it, **when not to**, **how it behaves**, **how to combine**

### Full set of applicable sections — don't ask about scope

Default to a **guide-complete** doc: include every section below that genuinely applies to the component. **Do NOT ask the user "expand or keep close to the current doc?"** — that's been explicitly flagged as annoying; just build the full applicable set. Omit a section only if it's truly not applicable (and note briefly why). An existing/old doc is a **floor, not a ceiling** — never copy its trimmed scope.

### Recommended Sections

| # | Section | What to cover |
|---|---------|---------------|
| 1 | **Overview** | What is this, what problem does it solve. Don't describe obvious things. |
| 2 | **When to Use** | Right scenarios. How it differs from similar components. |
| 3 | **When NOT to Use** | Anti-patterns, misuse, limitations. **One of the most important sections.** |
| 4 | **Anatomy** | Key parts, their names, shared vocabulary. No implementation details. |
| 5 | **Variants** | Visual/semantic variants, why each exists — not just how they look. |
| 6 | **States** | Only states that are relevant and non-obvious. |
| 7 | **Behavior** | Interaction timing, dismiss logic, keyboard, focus, edge cases. **Very important.** |
| 8 | **Content Guidelines** | Tone, text length, capitalization, icon usage, wording — **incl. RU-localization nuances** (long Russian words, case/number agreement, text expansion vs the design). |
| 9 | **Accessibility** | **Brief** — touch-target size, VoiceOver/TalkBack labels, semantic order. Light-touch, NOT a full WCAG audit. |
| 10 | **Responsive / resize** | How it adapts across **screen widths, safe-area, orientation**, and content growth (wrap / truncate / stretch). Mobile-first. |
| 11 | **Composition** | How it combines with other components, nesting rules. |
| 12 | **Dos & Don'ts** | Good examples, bad examples, common mistakes. Visual where possible. |
| 13 | **Real Examples** | Component in a real mobile screen / product context (by relevance). Not isolated examples. |
| 14 | **Behavior by platform** | ONLY if the component is multi-platform (reused on desktop too) — a dedicated section for where behavior/layout differs by platform (see check #3 below). |

**Canonical order** (a guide, not a rigid template — omit non-applicable, nudge order to fit the component, but keep this logic): Overview → **Anatomy (early — it names the parts every later section refers to)** → When to use / When NOT → Types/Variants → States → Interaction (tap/keyboard/focus) → Behavior → Display rules → Composition → Content guidelines → Do & Don't (summary examples, kept at the end; don't scatter Do/Don't into other sections). Section-header styling and the indent rhythm (8 < 16 < 40) live in `doc-kit.md` §1.

**Slots — don't enumerate.** For a slot with variable content (icon / tag / badge / image…), do NOT list everything it can hold — that set keeps growing and the doc rots. In **Anatomy**, just say the position is a *slot with variable content* and give 2–3 examples as "etc." Exception: if the slot's set is **fixed/limited**, documenting the allowed set is worth it — decide per component.

### Before writing — three checks (Mylo)

1. **Reconcile with any existing doc draft.** Several components already have doc sketches. Read what's already there and **preserve that information** (re-expressed in our sections) — don't lose it. If a piece genuinely fits no current section, **add a new section to the list above** for reuse rather than dropping it. (Still build the new doc to the right; never edit/delete the old — the designer does that.)
2. **Broaden — "what else is worth documenting?"** The section list is a floor, not a ceiling. On every component do a quick pass for behavior / intent / edge-cases worth capturing beyond our sections and propose additions — design evolves, so look wider than these instructions.
3. **Confirm platform scope with the designer.** Some components are stored as one component but used on **mobile AND desktop**. Before writing, **ask whether this component is mobile-only or multi-platform** (make it a routine question — the designer will help). If multi-platform, add the **"Behavior by platform"** section for where behavior/layout differs (the `iOS/*` / `Android/*` token maps exist for exactly this).

### What to Skip

- Everything **inspectable** — exact token values, measurements/spacing, the full variant enumeration → all visible in Dev Mode.
- Developer-facing detail Dev Mode can't show (prop meaning/defaults, behavioral contracts) does **NOT** go in the designer doc either — it belongs in the separate **`DEV NOTES` frame**.

### Documentation Blocks — Template, Not Components

Doc blocks are **NOT** Figma components. Use a single approved reference frame and reproduce the pattern.

**Why not components:** layouts vary per component; changing a doc component risks breaking all existing docs; overhead outweighs benefit at a small component count.

**How to maintain consistency:** follow section order and spacing from the **canonical reference doc frame** (⚠️ Mylo has none yet — the **first finalized Mylo doc becomes the canonical reference**). Use Mylo text styles everywhere.

**Revisit when:** same structural change needed across 5+ docs simultaneously.

### ⛔ Never touch existing documentation — build the new one to the RIGHT

Several Mylo components already have documentation. **Do NOT rework, edit, or delete an existing doc.** Build the new documentation **to the right of the existing one** on the same page. Once the new one is finished, **the designer deletes the old one themselves** — that is not your job. Do not treat existing Mylo docs as the style reference; the canon is this file.

### Status Badges — Do Not Use

Do **not** add "Stable", "Accessible", "Deprecated" badges to doc frames. They require active maintenance; stale badges are worse than no badges. (Mylo already tracks each component's **version + readiness status via its own mechanism on the component itself** — semver like `primary-button 1.2.0` + a status chip. The doc must not duplicate that as badges.)

### Text Styles — Always Bind

Every text node must use a Mўlo text style — never hardcode `fontSize`/`fontWeight`/`lineHeight`. Fonts: **Okta Neue** (title/subtitle), **Inter Display** (body/action/label/caption).

→ The **full text-style ramp and the exact per-element mapping** live in `doc-kit.md` §3 (style-ID map) and §1 (house-style: which style each doc element uses). Use those; don't restate values here.

---

## Date & time content — follow the Mўlo formats guide

If a component **displays dates or times** (notifications, feeds, listings, chat/history, credit terms, timestamps, ranges…), its **Content Guidelines / Behavior** must follow the **Mўlo Date & Time Formats guide** (RU & KZ) — link in `library-index.md` → Reference guides. Don't restate the whole guide in the doc; **reference it and state which pattern the component uses.** Key points to reflect:

- **24-hour by default**, leading zero (`07:00`), colon separator; 12h only as AM/PM with a space and leading zero (`02:00 PM`).
- **Abbreviations by the 3-letter rule**, lowercase, no dots (RU: `12 апр`; KZ: `12 сәу`).
- **Year shown only if the date is not the current year.** `ISO 8601` for API/logs/serious data.
- **Relative time = one of two patterns:** «Активность» (freshness — `только что` / `5 мин назад` / `через 10 мин`) vs «Коммуникация» (day-anchored — `сегодня` / `вчера` / `пятница` / `12 апр`). Pick per the component's question ("how long ago?" vs "which day?").
- **Switch to an absolute date after 14 days.** Ranges use an en-dash `–`.
- **Accessibility:** provide the exact date/time (e.g. tooltip) alongside relative formats.

---

## Component Cross-Check — Mandatory Before Finalizing

> Replaces the Claude DS "Storybook Cross-Check". With no code, **the source of truth is the Figma component itself + confirmed designer intent.**

Before finalizing documentation, read the actual component in the Figma file and check the doc against it:

- **Behavioral descriptions** — match how the component is actually built (variants, prototype interactions, states present)?
- **Variant/placement names** — match the exact property/variant names on the component set.
- **Content constraints** — `max-width`, `min-width`, character limits in the doc match the component's real constraints.
- **Interaction triggers** — hover, focus, click — verify against the component's states/prototype.
- **Keyboard/touch behavior** — confirm intended behavior with the designer (no code to defer to).

**If a contradiction is found:** the real component + confirmed designer intent win. Update the doc to match — or, if the *component* looks wrong, flag it to the designer (never silently change the component).

---

## Documentation Layout Rules

### Every described behaviour needs a visual example

**Never write text-only documentation.** Every card that describes a behaviour must have a visual preview — an instance, an illustration, or a diagram above the text.

Checklist before finalising any section:
- Trigger/overlay card → show the trigger instance + the thing appearing
- Keyboard/touch card → show key/gesture chip illustration (not just text)
- State card → show the actual state variant (loading, disabled, danger color, etc.)
- Dos & Don'ts → the instances must USE meaningful icons/props, not the default placeholder

**Scan the full doc before declaring done:** open each card mentally and ask "does a designer understand this without reading the text?"

### Use realistic content, not placeholder text

Never leave the component's generic default ("Label", "Button") in a card that makes a specific point. Set realistic, context-appropriate copy that matches what the card is teaching.

- "Use a statement, not a question" → label the instance with an actual statement, not the literal word "statement"
- "Don't write long labels" → use a genuinely long, real-sounding string — the example needs to actually be wrong to be convincing
- Dos & Don'ts pairs → reuse the *same* realistic label on both sides, so the only variable is the thing being illustrated

**If a long/realistic string causes overflow or clipping**, that's a real layout bug to fix on that instance — not a reason to fall back to a short placeholder. Fix the wrap/sizing.

### Use instance swap for meaningful visual examples

Never leave default icons in documentation instances. Swap to the icon (from the Mўlo Icons Library) that makes the use case obvious.

### Keyboard / touch & focus illustrations — use chips, not labels

Text labels like "focused" are not enough. Show the interaction with a chip. **Touch/gesture is primary** (tap / long-press / swipe); **also include keyboard** (Tab / Enter) where an external keyboard or a11y focus applies. Focus indicator on demo instances: use the **`stroke/focus-ring`** color token (Mylo represents the focus ring as a stroke color token, NOT an effect style). Apply it as a visible ring/border on the focused demo — describe focus as behavior in Behavior/Accessibility, never prescribe CSS.

### Instances in comparison sections — use the most revealing variant

In Variants / comparison sections, always pick the variant that makes differences most visible. The Default variant is only for the "Default" card.

### No duplicate documentation across sections

Never document the same behavior in two sections.

**Behavior section covers:** timing, keyboard/touch handling, focus management, async states, edge cases.
**Behavior does NOT cover:** placement mechanics, content rules, dos/don'ts — those have their own sections.

### Card row layout

> **DECIDED:** doc frame width = **720px**. Docs are viewed on desktop, so the frame isn't phone-width — but **component previews inside cards use mobile width (~360–390px)** wherever screen context matters (full components/screens); small atoms show at natural size, centered.

- **2 cards per row** — default for behavior/guidelines cards with substantial content
- **3 cards per row** — lightweight visual comparison cards (e.g. Dos & Don'ts)
- **Full-width** — single-concept cards that need space

### Card visual style

→ All exact card/frame/preview/pill/chip specs and the token values (fills, radii, padding, Do/Don't tints, status tokens) live in `doc-kit.md` §1 (house-style) with the ID maps in §2. Colored cards use fill only (no accent strips). Don't restate values here.

### Dos & Don'ts — structure

Each Do/Don't item is a **wrapper frame** (no fill, no stroke) containing:
1. **Preview area** — FRAME, `corner-radius/sm`, fill = `success/tint` (Do) or `danger/tint` (Don't), with the component instance inside
2. **"✓ Do" / "✗ Don't"** — TEXT, `caption/sm-medium` or `label/sm-medium`, colored `text/semantic/success` / `text/semantic/danger`
3. **Description** — TEXT, `body/sm-regular`, `text/neutral/secondary`

Layout: **Do | Don't** paired per row. Max 2 per row.

---

## Dev notes — a SEPARATE frame (not mixed into the designer doc)

The designer doc stays focused on intent/usage/behavior. Developer-facing detail goes in a **separate `DEV NOTES — [Component]` frame built to the right of the designer doc** — never mixed into it (mixing prop tables into the designer doc breaks the "don't duplicate Dev Mode / help designers decide" principle).

**What the DEV NOTES frame captures — only what Figma Dev Mode CANNOT show on its own:**
- **Props:** meaning of each prop/variant in plain language, **defaults**, required vs optional, allowed combinations, and **what must NOT be exposed** (internal-only props).
- **Behavioral contracts:** what triggers what, event/data flow, state precedence (e.g. error beats focus), async/loading behavior, timing/animation intent.
- **Edge cases & constraints:** empty/overflow/error handling, min/max, what the component does NOT do (hand-off to a parent/other component).
- **Integration notes:** expected data, side effects, analytics ownership, platform differences (e.g. the `iOS/*` vs `Android/*` token maps) where they matter.

**What it must NOT contain** (all visible in Dev Mode already): exact token values, measurements/spacing, the full variant enumeration, and any "how to implement" (CSS/DOM/framework). Describe *what/behavior*, not *how to build*.

**Form:** reuse the same card system and Mylo tokens; header chip reads **`DEV`** instead of `DOCUMENTATION`. It is **optional per component** — add it when there's genuine non-inspectable dev info; skip it for a trivial atom whose behavior is fully obvious. Never delete an existing dev frame — same rule as docs (build to the right; the designer deletes the old).

---

## Concept vs. Final Documentation — Lifecycle

**Concept phase** (`DOCUMENTATION CONCEPT — [Component]` frame):
- Exists on the component's Figma page as a separate frame, built to the RIGHT of any existing doc
- Header has "CONCEPT DRAFT" chip
- Purpose: iterate on structure and content before committing

**Finalization** (when designer approves):
1. Remove "CONCEPT DRAFT" chip from header
2. Rename frame to `DOCUMENTATION — [Component]`
3. Record the finalized structure in the registry `library-index.md` (component | page | doc node-id | dev-frame node-id | status | linked?)
4. **Link the component to its doc, and fill its `description` if empty — automatically, no need to ask** (rules below; the exact setter code is the finalize snippet in `doc-kit.md` §6 — single home, not restated here).

**Rule:** Never start a final frame without an approved concept. Never delete the existing/old doc — the designer does that.

### Auto-link + description on finalize (standing rules)

Two things happen on every finalize, without asking. The *code* lives once, in the **`doc-kit.md` §6 finalize snippet**; these are the *rules* it enforces:

- **`documentationLinks`** → an in-file deep-link to the new doc frame. One link per component. (fileKey `UGCOeKehvfoEkWtbXr4Mav`; node-id with a **dash** — `662:133` → `node-id=662-133`.)
- **`description`** → if the component's `description` is empty, a **short** intent line (1–2 sentences: what it is + when it's for), in the voice/length of sibling components. **Never overwrite a non-empty one** — same "don't touch what's already there" rule as the old doc; if an existing one looks wrong, flag it to the designer, don't edit it.
- Verify **both** persisted with a read-back, not just the setter's return.

---

## Reference — Mўlo libraries & tokens

→ Library fileKeys are in `library-index.md` (Files table). Token conventions, the exact `name→VariableID` / `name→StyleID` maps, spacing/radius/border scales, icon keys, and component props all live in **`doc-kit.md` §2–§5**. Single source — don't restate here.
