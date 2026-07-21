---
name: mylo-docs
description: Пишет Figma-документацию компонентов для Mўlo Mobile Library — doc-фреймы для дизайнеров (Figma-only, без кода). Используй, когда пользователь хочет задокументировать компонент Mўlo/Mylo, говорит «Mylo: документируем X» и т.п., присылает ссылку на Figma-файл Mўlo Mobile Library или работает над doc-фреймами Mўlo. Покрывает весь воркфлоу сборки, house-style, токены и QA.
---

# Mylo DS — component documentation

Build **Figma documentation for designers** in the Mўlo Mobile Library (fileKey `UGCOeKehvfoEkWtbXr4Mav`). Figma-only — the source of truth is the component itself + designer intent.

## On kickoff (works from a one-line prompt like "Mylo: документируем <component> <link>")

1. **Read the references now** (they ship with this skill — read via the `Read` tool; if `${CLAUDE_SKILL_DIR}` doesn't expand, they're in the `references/` folder next to this SKILL.md):
   - `${CLAUDE_SKILL_DIR}/references/methodology.md` — what/when/why to document, canonical section set & order, voice, dev-notes, lifecycle.
   - `${CLAUDE_SKILL_DIR}/references/doc-kit.md` — execution: exact tokens/styles/icons/props, snippet helpers, the **§0 pre-show QA checklist**, and build gotchas. **Bind tokens by ID** (no re-harvest unless a bind fails).
   - `${CLAUDE_SKILL_DIR}/references/library-index.md` — fileKeys of the Mўlo libraries, reference guides, and the component registry.
2. **Study the component** in Figma (variants, states, props, slots, prototype).
3. **Check for an existing doc** on the component's page — preserve its info re-expressed in our format; never edit/delete it (the designer deletes the old one). **Also read the component's `description`** (on the COMPONENT_SET/COMPONENT) — note whether it's empty; you'll fill it on finalize if so.
4. **Three pre-checks** (methodology → "Before writing"), incl. the mandatory question: **mobile-only or multi-platform?**
5. **Build a CONCEPT** frame `DOCUMENTATION CONCEPT — <Component>` to the RIGHT of any existing doc, **on the component's own page** (`await figma.setCurrentPageAsync(page)` first — `use_figma` resets to the file's first page). Fully token-bound.
6. **Present the structure for approval.** Never finalize without an explicit "ok".
7. **On approval:** remove the CONCEPT chip, rename to `DOCUMENTATION — <Component>`, add a `DEV NOTES` frame only if there's non-inspectable dev info, **link + describe the component** (set `documentationLinks`, and `description` if it was empty — via the doc-kit §6 finalize snippet; rules in methodology → "Auto-link + description on finalize"), add a row to the registry in `references/library-index.md`.

## ⚠️ Before every screenshot you show the user

**Run the §0 pre-show QA checklist in `references/doc-kit.md`.** It consolidates the recurring failure points (right page, real components not hand-drawn, equal-sized comparison cards, no clipping, contrast, anatomy обязательно/опционально, verify-don't-invent, transparent frames, Russian typography pass, never mutate the component). These rules got re-broken in the past precisely because this checklist wasn't loaded at build time — loading it is the whole point of this step.

## Standing rules (details in the references)

- Build to the RIGHT of the existing doc; never touch it; the designer deletes the old one.
- Default to a **guide-complete** doc — don't ask the user about section scope.
- Canonical visual reference = finalized **accordion doc `12017:1595`** (🧩 accordions). Everything in Mўlo tokens; never a foreign doc-DS.
- **Russian typography pass** over all text before finalizing (nbsp after hanging prepositions, number+unit together).
- After a build, **audit & grow the internal docs** with anything newly learned so it isn't re-derived next time — but place each fact in its **one home** (file-roles, see the header in `methodology.md`/`doc-kit.md`): a *rule/why* → `methodology.md`; *code/tokens/snippets/gotchas* → `doc-kit.md`; an *ordered step* → here in `SKILL.md` (name it + point, don't restate the rule); *index/registry/fileKeys* → `references/library-index.md`. **When the user says "add it everywhere," don't** — translate the loose ask into the correct single home. Duplicating the same rule across files is the exact drift the "one fact, one home" architecture prevents.

## Files (Figma)

fileKeys and the component registry live in `references/library-index.md`.
