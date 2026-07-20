# Mylo DS — Doc Kit (frozen references)

> **Purpose:** everything reusable across doc builds, frozen so we don't re-derive it every session (no re-reading the canonical doc, no re-harvesting variable/style IDs, no re-searching icons). Load this alongside `documentation.md` at the start of any Mylo doc build.
>
> **Staleness rule:** IDs below are stable per file but can change if variables/styles are republished or reorganized. Try by ID first; **only if a `setBoundVariable` / `setTextStyleIdAsync` fails, do a one-time re-harvest** (script at the bottom) and update this file. Don't re-harvest preemptively.
>
> Harvested from the canonical **`DOCUMENTATION — Accordion`** frame (node `12017:1595`) on 2026-07-07. That frame remains the visual canon — but the spec below replaces having to open it.

---

## 0. Pre-show QA checklist — RUN before every screenshot to the user

> This is THE single operational checklist. It consolidates the craft rules that used to live scattered in memory (which kept getting missed because it wasn't loaded at build time). Read this file at kickoff and run this list before showing any section.

- [ ] **Right page.** Doc frame is on the component's page, not the file's first page. `await figma.setCurrentPageAsync(componentPage)` at the top of every script (also required for `getNodeByIdAsync` of that page's nodes). Read back `frame.parent.name`.
- [ ] **Real components, not hand-drawn.** Fields → `text-input`, headers → `top-nav`, etc. (§5). Never fake what exists.
- [ ] **Equal-sized comparison cards.** Side-by-side previews (Do/Don't, Types/Статусы, before/after) are the SAME height — measure the tallest, set all previews to that fixed height, center content (§6a). Not `layoutAlign=STRETCH`+`FILL` (runs away).
- [ ] **Nothing clipped.** Every component fully visible; no fixed height cuts text; wide mobile previews go in full-width cards or FILL the preview (§6a).
- [ ] **Contrast.** Component/pill/note reads against its background (white-on-white and gray-on-gray disappear); notes get a visible fill or border (§6a, and craft rule 6/7).
- [ ] **Anatomy marks обязательно/опционально** on every part, per the component's real props (§ inline-alert facts). Legend matches the canon format.
- [ ] **Only verified behavior.** No invented states/sizes (this component has NO focus state; close touch-area is 40×40). Guidance phrased as guidance, not "the component does X".
- [ ] **Transparent structural frames** (`fills=[]`) so no white boxes on tinted cards.
- [ ] **Realistic, non-redundant copy.** Comparison pairs use identical content except the illustrated variable.
- [ ] **Russian typography pass** over ALL text before finalizing (§6a): nbsp after hanging prepositions/conjunctions, number+unit together (`3 дня`), no illogical breaks. See [[feedback_ru_typography]].
- [ ] **Never mutate the component** — only its text properties.

## 1. House-style spec (exact, token-bound)

**Layout grid:** doc frame width **800**; content column **736** (= 800 − 32×2). Rows of 2 cards = **360** each with **16** gap (x=0 and x=376).

### Main doc frame — `DOCUMENTATION — [Component]` (or `DOCUMENTATION CONCEPT — [Component]` while drafting)
- layout VERTICAL, gap `spacing/space-10` (40)
- padding top/right/left `spacing/space-8` (32), bottom `spacing/space-10` (40)
- radius `corner-radius/sm` (12)
- fill `bg-surface/neutral/base-container`
- stroke `stroke/neutral/secondary`, weight `border/width/sm`
- Set the frame's explicit mode to match neighbouring frames (light/dark).

### Header (first child of frame)
- frame VERTICAL, gap `spacing/space-4` (16), no fill
- **H1 title** — Okta Neue **Bold**, size **28**, lineHeight 34px, letterSpacing −0.5; fill `text/neutral/primary`; bind fontFamily → `font/family/title`. (No text style is applied to H1 in the canon.)
- **Description** — text style `body/md-regular`, fill `text/neutral/secondary`

### Divider under header
- RECTANGLE 736×1, fill `stroke/neutral/secondary` (used as a fill, not a stroke)

### Section — `section-[name]`
- frame VERTICAL, gap `spacing/space-4` (16)
- child 1: **section-header** frame VERTICAL, gap `spacing/space-2` (8):
  - **eyebrow** — UPPERCASE, text style `caption/sm-medium`, fill `text/neutral/tertiary`
  - **subtitle** — text style `body/lg-medium`, fill `text/neutral/primary`
- child 2: content (card / row / grid)

### Regular content card — `card`
- frame VERTICAL, padding `spacing/space-5` (20), gap `spacing/space-5` (20) or `space-3` (12), radius `corner-radius/xs` (8)
- fill `bg-surface/neutral/base-container`, stroke `stroke/neutral/secondary` weight `border/width/sm`

### Preview inset (gray stage for a component instance) — `preview` / `inset`
- frame, padding `spacing/space-4` (16), radius `corner-radius/xs` (8)
- fill `bg-surface/neutral/base` (the page-gray), align center
- Use when the instance needs a neutral stage. If the preview's background is itself the point (surfaces/themes), color the whole card instead.

### "When to use" / "When NOT to use" cards (also Do/Don't preview fills)
- **use / Do:** fill `bg-surface/semantic/success/tint`, no stroke; title & ✓ marks `text/semantic/success`
- **NOT / Don't:** fill `bg-surface/semantic/danger/tint`, no stroke; title & ✕ marks `text/semantic/danger`
- padding `spacing/space-5` (20), gap `spacing/space-3` (12), radius `corner-radius/xs` (8)
- item = HORIZONTAL row gap `space-3`: mark (`✓`/`✕`, style `body/sm-medium`, semantic color) + text (`body/sm-regular`, `text/neutral/secondary`)
- card title style `body/sm-medium`

### Do & Don't block
- section label plain text **"DO & DON'T"** (caption/sm-medium tertiary works too)
- each side = VERTICAL gap `space-3`: **preview** frame (fill success/tint or danger/tint, radius xs, padding `space-5`, align center, instance inside) + label **"✓  Do"** / **"✗  Don't"** (`body/sm-medium`, semantic color) + description (`body/sm-regular`, `text/neutral/secondary`)
- pair Do | Don't per row, max 2 per row; reuse the SAME realistic content on both sides.

### Note / info / warning pill — `pill`
- frame HORIZONTAL, padding `spacing/space-4` (16), gap `spacing/space-3` (12), radius `corner-radius/xs` (8)
- info → fill `bg-surface/neutral/floating` or `semantic/{info}`; warning → `bg-surface/semantic/warning/tint` with ⚠ in `text/semantic/warning`
- icon/glyph (`body/sm-medium`, semantic color) + text (`body/sm-regular` or `sm-medium`, `text/neutral/secondary`)

### Keyboard/gesture chip — `chip`
- frame HORIZONTAL, padding V `spacing/space-1`(4) / H `spacing/space-3`(12), radius `corner-radius/xs` (8)
- fill `bg-surface/neutral/floating`, stroke `stroke/neutral/secondary` weight sm
- text `body/sm-medium`, `text/neutral/primary`; glyphs: `⇥ Tab`, `↵ Enter`, `␣ Space` (keyboard) — for touch use tap/long-press/swipe chips
- Focus ring on demo instances = color token `stroke/focus-ring` applied as a stroke.

### Anatomy — exact canon recipe (match precisely; a common miss)
Structure: `card` → **`preview`** (the ONE gray stage: fill `bg-surface/neutral/base`, radius xs, padding `space-4`, align center) → **`diagram`** (a `layoutMode:'NONE'` frame, **`fills=[]` transparent**, fixed size ≈ 664 wide — just a positioning canvas for the instance + pins + leaders) → then **`legend`** → optional note.
- ⛔ **The `diagram` must be transparent.** Giving it its own fill/radius creates a box-in-a-box (gray inside gray) — the #1 anatomy mistake. Only `preview` is gray.
- **pin** = 24×24 frame, `cornerRadius 12` (circle), fill `bg-surface/neutral/base-container` (white), stroke **`icon/neutral/secondary`** (solid #535e6b, opacity 1 — NOT the faint `stroke/neutral/secondary`), weight 1; number text `body/sm-medium` / `text/neutral/primary`, centered.
- **connector leaders** = RECTANGLE 1px filled **`icon/neutral/secondary`** (solid, visible), and they must **actually reach the part** (span pin→part), not float as short stubs. Canon lengths ≈ horizontal 102, vertical 44.
- **layout** (mirror canon): the leftmost part gets a pin to the LEFT with a horizontal leader into it; other parts get pins above/below with vertical leaders. Give ≈40px gap between pin and instance so the leader is visible.
- **legend**: VERTICAL gap `space-3`; each `li` = HORIZONTAL gap `space-3`, align center; number box `n` = 20×20 circle (`cornerRadius 10`), fill white `base-container` + faint stroke `stroke/neutral/secondary`, number `body/sm-medium` primary; label `body/sm-regular` / `text/neutral/secondary`.

---

## 2. Variable ID map (name → VariableID) — bind by ID

```
spacing/space-none        VariableID:ba8d43b1b56b7dc3cb1ce19b81ccd574bf14a894/3446:557
spacing/space-0-5         VariableID:a673f28ad9d3275eb5b42175feefe3be3f763fa8/3446:567
spacing/space-1           VariableID:5b7bf0e69bc86462c3b2a66586721a3b7fd531b4/3446:568
spacing/space-2           VariableID:95a995834838340a78a4fac6f74e24bc706c5561/3446:569
spacing/space-3           VariableID:877167ff6ec45f4f810c7209b2ea26c6f5328004/3446:570
spacing/space-4           VariableID:01ba1b7ff120978666649d2373596b28068b9878/3446:571
spacing/space-5           VariableID:6255e8c1449062570ba8c6926aa1ef4b5d397c33/3446:572
spacing/space-8           VariableID:8dcdd5e669107a4b0328672e3108e44c8d10f662/3446:574
spacing/space-10          VariableID:3915e09464eab6541733891095bb2480aee5f7ca/3446:575
corner-radius/none        VariableID:064bedfef6073fed13edff771db35792d5a3c624/3446:645
corner-radius/xs          VariableID:2701510418e802c3016442019b78740c09365915/3446:648
corner-radius/sm          VariableID:0c6b1457ca082e148c02f6f135ed827848b6e891/3446:649
corner-radius/lg          VariableID:93315ffd301899c05bd3f7140de83a20d90382d4/3446:651
border/width/xs           VariableID:1ec96e3c5018f51131b1ac3bf7e99a577ec00c27/3474:5
border/width/sm           VariableID:f7fbd0ea6622adff0b0d17fb33a1f526fc72da99/3446:697
bg-surface/neutral/base            VariableID:91490344d3ebe5f52ed9583a477dc0c9e27c6484/3446:226
bg-surface/neutral/base-container  VariableID:0a3c000f5d25113ac09ed9c2c29611a15696b4c8/6026:156
bg-surface/neutral/floating        VariableID:ae1e0e6e22356632487a893354b24fde8142ac68/6026:157
bg-surface/semantic/success/tint   VariableID:740ee592d0a4a2ab7ad8b0f4872f7e96fd15e682/6026:322
bg-surface/semantic/warning/tint   VariableID:c2055dd61a62b6932a0a0c16c6cfdf6e3cc02b5c/6026:324
bg-surface/semantic/danger/tint    VariableID:aef2c53b3c6e2ca35b2707b36860c48e028cb3c8/6026:326
text/neutral/primary      VariableID:2cf87952d5d6554bf01fb262baae2f564131bcc1/6026:158
text/neutral/secondary    VariableID:359f4049cf5379da4dcae1291bec3ac1886deb6d/3446:230
text/neutral/tertiary     VariableID:ef9f1d5a8836fadab96bac0324cd222c81342bba/6026:164
text/neutral/disabled     VariableID:4fc8d84a088f0206148994b16f5a8f5a4ac48bdd/6026:160
text/neutral/link         VariableID:e6df5c2111aa38070d9372ba6586d64b1b4f16f1/6026:362
text/semantic/success     VariableID:e08969be55a6ec0d7680828372094e94f3476a00/6026:161
text/semantic/warning     VariableID:a758ba4fcfaefd86b2b6586d6560584988d5a4aa/6026:162
text/semantic/danger      VariableID:16c289e72cbfece76ef8dda363648ecfc3fdf1c9/6026:163
icon/neutral/primary      VariableID:6a7c11e71bcd216089e8c4f71d147990f8e34cd0/6026:194
icon/neutral/secondary    VariableID:b98a5ae96600005278e01f18d0c0cd55ec03f2ed/6026:196
icon/neutral/disabled     VariableID:b91c4b71acc4c641d12ad471dd57d8ec352cfbac/6026:198
stroke/neutral/secondary  VariableID:50f4f96c80ef6740a68fd4d11439fee500b44312/6026:218
stroke/focus-ring         VariableID:c3c2a7888da517c410113d5f214bfe6bfb9c25e6/6026:356
font/family/title         VariableID:31e0d2a1721eb5e3ab67aaf45a6f6f6c9a3ee2b7/56:12
font/family/body          VariableID:c69dadf7e8b9341e786015f126788b204b29979a/56:13
```

## 3. Text style ID map (name → StyleID) — `setTextStyleIdAsync`

```
title/md-medium              S:78d1f5c755a6bfadc24a9623158e0901a51619e3,2003:27
body/lg-regular              S:494cdfb8455c71f23cff383a73e7c6b10c1085ed,2003:33
body/lg-regular-low-height   S:162a1bc9be3ae3a1e6b693042e4f60551113bc2b,2003:34
body/lg-medium               S:dcc1d1cfc7c50da3e3655201f08e3227d1f5ef05,2003:35
body/md-regular              S:4df58100c82dfaeb8b662e367d6ec7ad62f0c9c6,2003:36
body/md-medium               S:17b7218d524a6642685cc6266900e037154fdbdf,2003:37   (Inter Display Medium — used for list-row titles)
body/sm-regular              S:76873e37105711000f5c4b317e459166e75589fb,2003:38
body/sm-medium               S:cc0fd582cd3d129454e704d74fb20351132cc48a,56:43
caption/sm-medium            S:435f82a164907ded63ccaf3c63842e60044d36d9,2003:45
```

**H1 (no style):** `fontName {family:"Okta Neue", style:"Bold"}`, `fontSize 28`, `lineHeight {unit:"PIXELS", value:34}`, `letterSpacing {unit:"PIXELS", value:-0.5}`, fontFamily bound to `font/family/title`.

## 4. Icon component keys (Mўlo Icons lib `6hA6u3FBiihgDnyb9WGIBi`) — `importComponentByKeyAsync`

```
status info      general/Info Filled                  2e316395ad65cdc593fbaf0bdce0576cb6d18f6e
status success   selection/Checkmark. Circle Outline  3efbd1e0257d7db8fdbddb687336ea43219df24e
status warning   main-bunch/Attention. Triangle Filled 68df35b8c7a7029af958cc14ffdd5068467d693d
status danger    general/Danger                       9038299772ef6b218f52a4c2f8cd0dd87fe50f88
close            general/Close                        600cd5234fe79c93a181f41fbd4f9bacd17d467a
default plus     general/+- Plus Simple               a188367ff43071b94018359cc7b533659bfde950
```

## 5. Component reference (grows per component documented)

Page `🧩 alerts` = node `642:13165`, fileKey `UGCOeKehvfoEkWtbXr4Mav`.

### inline-alert — COMPONENT_SET `2853:61658`
- props: `status` VARIANT [info, success, warning, danger] (def info) · `text#2853:25` TEXT (def "text") · `show-close-icon#4559:63` BOOLEAN (def false) · `icon#2853:21` INSTANCE_SWAP (def plus)
- **verified facts** (don't invent beyond these): status icon always present → **обязательно**; text → **обязательно**; close → **опционально** (bool, off by default); container **stroke always on, no toggle → обязательно**. **No focus/state variant exists** — the component does NOT ship a focus ring; the close button's touch-area is **40×40** around a **24** icon.
- behavior: does NOT auto-dismiss; optional close X; width hugs container, height grows with text
- variant component node ids: info `3089:2993` · success `4100:415` · warning `4100:423` · danger `4100:419`
- existing legacy doc `alert-doc` frame `4556:61773` was **deleted by the designer** (2026-07-07) — the old phone mockups are gone; build your own phone frame (see §6a).

### avatar — COMPONENT_SET `1017:7459` on page `🧩 avatars` (`642:13166`) · **DOC finalized `12581:799`**, DEV NOTES `12604:1452`, linked ✅
- description (RU, non-empty — do NOT overwrite): "Аватар - это визуальный способ представления человека или компании в пользовательском интерфейсе."
- props (setProperties keys): `type` VARIANT [initials, image, user-placeholder, car-placeholder] (def initials) · `size` VARIANT [64,48,40,32,24] (def 64) · `initials#1017:10` TEXT (def "ЖЖ", shown only when type=initials) · `show-indicator#5245:6` BOOLEAN (def false).
- variant component node ids (type/size): initials 24 `1017:7460` · 32 `5240:16641` · 40 `1017:7458` · 48 `5263:53995` · 64 `1017:7526`; image 24 `1017:7498` · 32 `5240:16645` · 40 `1017:7496` · 48 `5263:54001` · 64 `1017:7530`; user-placeholder 24 `1017:7470` · 32 `5240:16643` · 40 `1017:7468` · 48 `5263:53998` · 64 `1017:7528`; car-placeholder 24 `5429:6799` · 32 `5429:6775` · 40 `5429:6767` · 48 `5429:6791` · 64 `5429:6783`.
- **verified facts:** container circular, clips content, fixed size (no in-between). Indicator scales with size: 24→6px, 32/40→8px, 48/64→10px; hidden by default; positioned bottom-right. Initials text styles by size: 24=fontSize 8 (no style), 32=body/sm-regular, 40/48/64=body/md-regular. **No focus state** — avatar is not interactive; parent handles tap/focus.
- **⚠️ `type=image` ships an EMPTY (transparent) image slot** → renders as a checkerboard until a photo is set. Its nested `image` INSTANCE = private `.avatar-image` (type [empty,female,male,car]); to show a real photo in docs: `inst.children.find(n=>n.name==='image').setProperties({'type':'female'})`. `type=user-placeholder`/`car-placeholder` are the blue person / gray car illustrations (not photos).
- **Indicator type** (online/offline/selected) is set on the nested `indicator` INSTANCE (private `.avatar-indicator`), NOT exposed on the public avatar: `inst.setProperties({'show-indicator#5245:6':true})` then `inst.children.find(n=>n.name==='indicator').setProperties({'indicator-type':'offline'})`. online=green dot, offline=gray dot (with clear glyph), selected=green circle + white check.
- **Private sub-components (don't document/use directly):** `.avatar-image` SET `1017:7506`, `.avatar-indicator` SET `5245:19235` (both "Скрыт").
- **`avatar-profile-placeholder`** COMPONENT `3372:5140` — standalone 100px person placeholder with a ring; NOT in the avatar set, no props. Documented as its own section inside the avatar doc.
- **multi-platform** (iOS/Android + desktop) — designer confirmed; doc includes a "Behavior by platform" section.

### badges — COMPONENT_SET `218:3215` on page `🧩 badges` (`218:3199`) · **DOC finalized `12608:1037`**, DEV NOTES `12629:1115`, linked ✅
- **Family of 5 types.** Public set `badges` has one prop `type` VARIANT [dot, number, text, ribbon] (def dot) — each type is an INSTANCE_SWAP wrapper around a **private** sub-component. `.filter-badge` is a **separate standalone COMPONENT** (not in the set). description non-empty (RU, ~199 chars — do NOT overwrite): "Отображает короткий текст, числовой статус или категорию…".
- **Private sub-component sets (don't document/instance as public, but fine to instance for doc previews):**
  - `.dot-badge` SET `4568:18092` — 8×8 dot. `status` [success `4568:18090`, warning `4568:18089`, danger `4568:18091`]. **No neutral.**
  - `.number-badge` SET `4568:19805` — circle. props: `number#4568:3` TEXT (def "1") · `size` [md 24, sm 20] · `status` [neutral, danger, persea]. **6 variants:** md/neutral `4568:19826` · md/danger `4568:19806` · md/persea `5263:54021` · sm/neutral `5323:32371` · sm/danger `5323:32374` · sm/persea `5323:32377`.
  - `.text-badge` SET `4574:4986` — pill. props: `label#4568:3` TEXT (def "Text") · `color` [neutral `5025:455`, persea `4574:4987`, success `4574:5001`, loan `4574:5005`, danger `5733:857`].
  - `.ribbon-badge` SET `9327:19822` — pill w/ leading icon. props: `label#4568:3` TEXT · `show-leading-icon#9327:3` BOOL (def true) · `leading-icon#9327:7` INSTANCE_SWAP · `color` [success `9327:19868`, mycar `10402:6117`, mycredit `10402:10882`, yellow `9327:19869`, bonus `9327:19867`]. Colors: success #09ab46, mycar #008eff, mycredit #4f4893, loan/yellow #ffdf36, bonus=`gradients/bonuses`. Text style `label/sm-medium`, radius `corner-radius/lg` (20), text/icon `on-fill` white.
  - `.filter-badge` COMPONENT `4574:5858` — 16×16, prop `#-of-applied#4574:0` TEXT (def "1"); sits on the filter button, **«0» hidden**.
- **verified facts:** badges are NOT interactive (no tap/focus — parent handles it); don't auto-dismiss (host shows/hides by state); number truncates to **99+ / 999+** past a context-dependent threshold; number/filter hide entirely at 0. Ribbon leading-icon is optional (`show-leading-icon`), all other parts обязательно.
- **nav-bar** (bottom nav) main COMPONENT `3359:1942` (`brand=mycar, adaptive=no`), 393×90, ships a live number-badge on the "Сообщения" item — instance it for an in-context number example.
- Old designer doc `badge-doc` `4567:4321` (1440-wide, raster product screenshots per type) predates ribbon. The 4 product screenshots are reusable via `node.clone()` — image rects: dot `4568:13295` · number `4568:13792` · filter `4568:14432` · text `4568:18046`. New doc reuses them framed in our cards ("В интерфейсе" real-examples section) rather than rebuilding bespoke product screens.

### Mockup building blocks (real components — use these, don't hand-draw)
Each component has its OWN page named `🧩 <name>`. Import a variant by key (`importComponentByKeyAsync`).
- **top-nav** — SET `936:4441` on page `🧩 top-nav` (`928:9324`). Screen header w/ large title (393×172): key `dc4c19a0ccc5c1ec14956cfb598386d35ddc5fb2`; compact screen (393×106): `596c0f22a11ed5427e16b9e3e50c4955fe67430c`. Props: `lg-title#936:67`, `subtitle#936:43`, `show-subtitle#936:57`, `show-search`, `show-stepper-bar`, variants `style` (screen/large-modal), `show-lg-title`, `show-segmented-tabs`. Includes the iOS status bar (9:41 + icons). **Hide the nested `right-content` node** (`node.visible=false`) for a clean header — it defaults to a stray badge.
- **text-input** — SET `66:3326` on page `🧩 input-fields` (`54:1899`). Default md/rest key `a51342c32fde5aed0d6b6c97f529ad146e8f2bb6`. Props: `label#3657:35`, `value#3657:109`, `show-hint#84:26`, `show-leading-icon`, `show-trailing-icon`, variants `size` (lg/md), `state` (rest/hover/focused/disabled), `filled` (true/false), `error` (True/False). For a filled field set `filled='true'` + label/value. Other inputs on that page: `cvv-input`, `date-input`, `text-area-input`.
- Same page-per-component convention holds for everything (buttons `1:6`, chips `152:1074`, list-items `209:3150`, modals, tabs, …) — look up the `🧩 <name>` page, grab the SET, import a variant.

### banner-alert — COMPONENT_SET `7569:30943` (canvas label "banner") · **DOC finalized `12164:916`** on `🧩 alerts`, linked ✅
- **Term:** call it **"banner alert"** in copy (H1 "Banner Alert"), NOT bare "banner" — the canvas label says "banner" but the set name is `banner-alert`. Confirm the term from the SET name, not the label. Bind the two words with an nbsp so they don't wrap.
- props (setProperties keys): `title#7569:0` TEXT (def "Title") · `text#7569:2` TEXT (def "Text") · `status` VARIANT [info] only. `createInstance()` on variant `7569:30942`; key order returned is `["text#7569:2","title#7569:0","status"]` — match by `startsWith('title')`/`startsWith('text')`, don't hardcode.
- anatomy (VERIFIED, all **обязательно**, no optional parts): **title** (node `7569:30939`, style `subtitle/lg-medium` = Okta Neue Bold 17) + **text** (node `7569:30940`, style `body/md-regular`), column, gap `spacing/space-1` (4), padding `spacing/space-4` (16), on fill `bg-surface/accent/persea/strong` (#263ad7), both texts `text/neutral/on-fill` (#fff). Width hugs container (stretch it with `layoutSizingHorizontal='FILL'`), height grows with text.
- **NO icon, NO close button, NOT interactive** (no tap/focus target) — the sharp contrast vs inline-alert. Don't invent any.
- intent/behavior: persistent bar pinned to TOP of the page, content flows below; does NOT auto-dismiss; **user can't dismiss it** (no close) — host removes it programmatically when the condition clears.
- **mobile-only**, single status=info today (v1.0.0 "Готов к дизайну"); designer confirmed no semantic statuses planned — document honestly, don't mock up success/warning/danger.

## 6. Reusable snippet library (paste into use_figma)

Compact helpers. `V` = variable-id map, `TS` = text-style map from above. Bind via IDs so no harvest is needed.

```js
// --- token maps (subset; extend from section 2/3) ---
const V = {
  s_none:'VariableID:ba8d43b1b56b7dc3cb1ce19b81ccd574bf14a894/3446:557',
  s1:'VariableID:5b7bf0e69bc86462c3b2a66586721a3b7fd531b4/3446:568',
  s2:'VariableID:95a995834838340a78a4fac6f74e24bc706c5561/3446:569',
  s3:'VariableID:877167ff6ec45f4f810c7209b2ea26c6f5328004/3446:570',
  s4:'VariableID:01ba1b7ff120978666649d2373596b28068b9878/3446:571',
  s5:'VariableID:6255e8c1449062570ba8c6926aa1ef4b5d397c33/3446:572',
  s8:'VariableID:8dcdd5e669107a4b0328672e3108e44c8d10f662/3446:574',
  s10:'VariableID:3915e09464eab6541733891095bb2480aee5f7ca/3446:575',
  rXs:'VariableID:2701510418e802c3016442019b78740c09365915/3446:648',
  rSm:'VariableID:0c6b1457ca082e148c02f6f135ed827848b6e891/3446:649',
  bwSm:'VariableID:f7fbd0ea6622adff0b0d17fb33a1f526fc72da99/3446:697',
  bgBase:'VariableID:91490344d3ebe5f52ed9583a477dc0c9e27c6484/3446:226',
  bgContainer:'VariableID:0a3c000f5d25113ac09ed9c2c29611a15696b4c8/6026:156',
  bgFloating:'VariableID:ae1e0e6e22356632487a893354b24fde8142ac68/6026:157',
  successTint:'VariableID:740ee592d0a4a2ab7ad8b0f4872f7e96fd15e682/6026:322',
  warningTint:'VariableID:c2055dd61a62b6932a0a0c16c6cfdf6e3cc02b5c/6026:324',
  dangerTint:'VariableID:aef2c53b3c6e2ca35b2707b36860c48e028cb3c8/6026:326',
  tPrimary:'VariableID:2cf87952d5d6554bf01fb262baae2f564131bcc1/6026:158',
  tSecondary:'VariableID:359f4049cf5379da4dcae1291bec3ac1886deb6d/3446:230',
  tTertiary:'VariableID:ef9f1d5a8836fadab96bac0324cd222c81342bba/6026:164',
  tSuccess:'VariableID:e08969be55a6ec0d7680828372094e94f3476a00/6026:161',
  tWarning:'VariableID:a758ba4fcfaefd86b2b6586d6560584988d5a4aa/6026:162',
  tDanger:'VariableID:16c289e72cbfece76ef8dda363648ecfc3fdf1c9/6026:163',
  strokeSecondary:'VariableID:50f4f96c80ef6740a68fd4d11439fee500b44312/6026:218',
  focusRing:'VariableID:c3c2a7888da517c410113d5f214bfe6bfb9c25e6/6026:356',
  fTitle:'VariableID:31e0d2a1721eb5e3ab67aaf45a6f6f6c9a3ee2b7/56:12',
  fBody:'VariableID:c69dadf7e8b9341e786015f126788b204b29979a/56:13',
};
const TS = {
  lgMed:'S:dcc1d1cfc7c50da3e3655201f08e3227d1f5ef05,2003:35',
  mdReg:'S:4df58100c82dfaeb8b662e367d6ec7ad62f0c9c6,2003:36',
  smReg:'S:76873e37105711000f5c4b317e459166e75589fb,2003:38',
  smMed:'S:cc0fd582cd3d129454e704d74fb20351132cc48a,56:43',
  capMed:'S:435f82a164907ded63ccaf3c63842e60044d36d9,2003:45',
};
async function vbind(node, prop, id){ const v=await figma.variables.getVariableByIdAsync(id); node.setBoundVariable(prop, v); }
async function fillVar(node, id){ const v=await figma.variables.getVariableByIdAsync(id); const p=JSON.parse(JSON.stringify(node.fills&&node.fills.length?node.fills:[{type:'SOLID',color:{r:0,g:0,b:0}}])); node.fills=[figma.variables.setBoundVariableForPaint(p[0]||{type:'SOLID',color:{r:0,g:0,b:0}}, 'color', v)]; }
async function strokeVar(node, id){ const v=await figma.variables.getVariableByIdAsync(id); const p={type:'SOLID',color:{r:0,g:0,b:0}}; node.strokes=[figma.variables.setBoundVariableForPaint(p,'color',v)]; }

// text with style + color token. Inter Display / Okta Neue must be loaded first.
async function T(chars, styleId, colorId){
  const t=figma.createText();
  await t.setTextStyleIdAsync(styleId);
  t.characters=chars;
  if(colorId) await fillVar(t, colorId);
  return t;
}
// section: eyebrow + subtitle + content
async function section(eyebrow, subtitle, content){
  const s=figma.createAutoLayout('VERTICAL',{name:'section-'+eyebrow.toLowerCase()}); await vbind(s,'itemSpacing',V.s4); s.fills=[];
  const h=figma.createAutoLayout('VERTICAL',{name:'section-header'}); await vbind(h,'itemSpacing',V.s2); h.fills=[];
  h.appendChild(await T(eyebrow, TS.capMed, V.tTertiary));
  h.appendChild(await T(subtitle, TS.lgMed, V.tPrimary));
  s.appendChild(h); s.appendChild(content);
  s.layoutSizingHorizontal='FILL'; h.layoutSizingHorizontal='FILL';
  return s;
}
// card
async function card(){ const c=figma.createAutoLayout('VERTICAL',{name:'card'}); await vbind(c,'itemSpacing',V.s5); for(const p of ['paddingTop','paddingBottom','paddingLeft','paddingRight']) await vbind(c,p,V.s5); await vbind(c,'topLeftRadius',V.rXs); await vbind(c,'topRightRadius',V.rXs); await vbind(c,'bottomLeftRadius',V.rXs); await vbind(c,'bottomRightRadius',V.rXs); await fillVar(c,V.bgContainer); await strokeVar(c,V.strokeSecondary); for(const p of ['strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight']) await vbind(c,p,V.bwSm); return c; }
```

- **Canonical font preload — paste this EXACT block at the top of every text-writing call** (the old shorter list crashed 3× on banner-alert). The text styles resolve to weights that are NOT obvious:
  - `caption/sm-medium` → **Inter Display SemiBold** (one word, no space)
  - `body/sm-medium` → **Inter Display Bold**
  - `body/md-regular`, `body/sm-regular` → Inter Display Regular; `body/lg-medium` → Medium
  - **Okta Neue ships only `Bold` and `Regular`** (no Medium) — `subtitle/lg-medium`, `title/md-medium` and H1 all use Okta Neue Bold.
  ```js
  for(const s of ["Regular","Medium","Semi Bold","SemiBold","Bold"]){try{await figma.loadFontAsync({family:"Inter Display",style:s});}catch(e){}}
  for(const s of ["Regular","Bold"]){try{await figma.loadFontAsync({family:"Okta Neue",style:s});}catch(e){}}
  ```
  The `try/catch` swallows unavailable styles so one bad name can't abort the whole preload.
- Row of 2 cards: parent HORIZONTAL gap `space-4`, each card `layoutSizingHorizontal='FILL'`.

### RU typography pass — paste-in fixer (run once over the finished doc, before finalizing)
Beats hand-editing every node. Skips text inside component INSTANCES (their copy is a component-property override — leave it). Load the canonical font block first.
```js
const NB=' ';
// ⛔ NB MUST be the escape ' ', never a pasted literal — a literal can arrive as U+0020, making the replace a no-op (typo count 0, nothing bound). Read a node back and confirm charCode 160 before trusting the pass.
const HANG=['в','во','на','с','со','к','ко','по','за','из','от','до','о','об','и','а','но','или','что','как','у','же','бы','не','для','при','это','их'];
function fixRU(s){
  const re=new RegExp('(^|[\\s(«"—])('+HANG.join('|')+')[ \\t\\u00A0]+','gi'); // whitespace-run incl. nbsp → idempotent, collapses to one NB
  return s.replace(re,(m,pre,w)=>pre+w+NB).replace(/(\d)[ \t ]+([A-Za-zА-Яа-яё«])/g,(m,d,c)=>d+NB+c); // hanging words + number→word
}
const doc=await figma.getNodeByIdAsync('DOC_FRAME_ID');
function inInst(n){let p=n.parent;while(p&&p.id!==doc.id){if(p.type==='INSTANCE')return true;p=p.parent;}return false;}
for(const t of doc.findAll(n=>n.type==='TEXT'&&!inInst(n))){ const a=fixRU(t.characters); if(a!==t.characters){ for(const sg of t.getStyledTextSegments(['fontName'])){try{await figma.loadFontAsync(sg.fontName);}catch(e){}} t.characters=a; } }
```
The same `inInst`/`findAll` skeleton also does a **rename-the-term pass** (e.g. bare "banner" → "banner"+NB+"alert"): swap `fixRU` for a `.replace(/\bWORD\b/gi, …)`.

### Finalize snippet — link + fill empty description (run on approval)
Sets `documentationLinks` AND fills the component `description` only if blank (`description` is a plain metadata string — no font load needed; not a TEXT node). URL uses the node-id with a **dash** (`662:133` → `node-id=662-133`); one link per component. Read back BOTH (`node.documentationLinks` / `node.description`), not just the setter's return.
```js
const set=await figma.getNodeByIdAsync('SET_ID');
set.documentationLinks=[{uri:'https://www.figma.com/design/UGCOeKehvfoEkWtbXr4Mav/M%D1%9Elo-Mobile-Library?node-id=DOC-ID-WITH-DASH'}];
if(!(set.description||'').trim()) set.description='<short intent, 1–2 sentences, sibling voice/length>'; // NEVER overwrite a non-empty one
const rb=await figma.getNodeByIdAsync('SET_ID'); return {links:rb.documentationLinks, desc:rb.description};
```
Sibling reference: inline-alert's description is one ~180-char intent paragraph (what it does + where it appears) — match that register, no self-naming prefix, no link (the link lives in `documentationLinks`).

## 6a. Build gotchas (hard rules — check every build)

- ⛔ **Doc lives on the SAME page as the component.** `use_figma` resets `figma.currentPage` to the FIRST page of the file each call — if you `createFrame`/`createAutoLayout` without switching, the doc silently lands on the wrong page. **Before creating the doc frame, `await figma.setCurrentPageAsync(componentPage)`**, then append the frame there. Position it to the RIGHT of any existing doc on that page.
- **Preload fonts once per call:** `Inter Display` Regular/Medium/Semi Bold/**Bold** + `Okta Neue` Bold. Missing "Inter Display Bold" is the usual `unloaded font` crash (some styles resolve to Bold).
- **Never `resize()` an auto-layout column to a fixed height** (e.g. `col.resize(361,10)`) — it sets `primaryAxisSizingMode=FIXED` and clips/overlaps children. Set width via `counterAxisSizingMode='FIXED'`+resize, keep `primaryAxisSizingMode='AUTO'` (hug height).
- **Focus ring** needs breathing room: wrap the instance in an auto-layout frame with small padding + `cornerRadius` ≥ alert radius, ring as a bound stroke — an `OUTSIDE` stroke with zero gap gets covered by the instance body and only top/bottom show.
- **Icon swap:** `importComponentByKeyAsync(key)` then `inst.setProperties({'icon#…': comp.id})`. Keys in §4.
- **Deduplicate field mocks:** if you drop in a real `text-input`, set ITS internal label/value (`VIN-код` / a real value) instead of adding a separate label above it.
- ⛔ **`getNodeByIdAsync` needs the target page loaded.** Nodes off the file's first page return `null` unless you `await figma.setCurrentPageAsync(componentPage)` first. Do this at the TOP of every script that reads/edits alerts-page nodes (same call that would create the doc frame).
- ⛔ **Document only VERIFIED component behavior — never invent.** Before writing states/sizes/toggles, read the component: does the variant/prop actually exist? (e.g. inline-alert has NO focus state; close touch-area is 40×40, not the generic "44pt"). If it's a general a11y recommendation, phrase it as guidance ("показывайте…"), not "the component does X".
- ⛔ **Focus ring goes on the INTERACTIVE element, not the whole component.** For inline-alert only the close button is interactive → ring the crest (≈44 frame, `stroke/focus-ring`, `strokeAlign:'CENTER'`, radius ~12) positioned over the close, absolutely inside a transparent `demo` frame. Never ring the entire alert.
- ⛔ **Use existing DS components in mockups — never hand-draw what exists.** Fields → `text-input`, headers → `top-nav`, etc. (see §5 "Mockup building blocks"). Hand-drawn fakes read as lower-quality and drift from the real UI. Find the `🧩 <name>` page, import a variant by key, set its text/variant props.
- 📝 **Russian typography pass (run on the WHOLE draft before finalizing — applies to every text node, not just illustrations):** bind with a non-breaking space ` ` so lines never break badly. See [[feedback_ru_typography]]. Concretely: never leave a 1–2-letter preposition/conjunction (в, на, с, к, по, за, из, от, до, о, и, а, но, или, что, как, у, же, бы) at a line end → ` ` to the next word; keep number+unit together (`3 дня`, `17 символов`, `1–2 строки`, `40×40`); keep an em-dash from starting a line orphaned. Read every wrapped line and fix illogical splits (e.g. "через 3 / дня").
- ⛔ **In-context / placement / composition examples go INSIDE a phone frame** so they don't get lost on the gray stage (the doc-craft "composition/real example" rule). Build a simple phone if none exists: auto-layout VERTICAL, width ~360, white `bg-surface/neutral/base-container`, radius `corner-radius/lg`, `clipsContent:true`, faint border → status-bar row (`9:41` + a few small bar rects) → nav row (`‹` + screen title) → body (padding `space-4`) with the field + the alert. Place the phone on the gray `preview` stage.
- ⛔ **Note / info pills need a visibly distinct background.** `bg-surface/neutral/floating` alone is ≈white and disappears on a white card — add a 1px `stroke/neutral/secondary` border (or use a semantic tint). Warning pill = `warning/tint`.
- ⛔ **Comparison cards must be equal-sized (Do/Don't, side-by-side previews).** Uneven preview heights read as "broken composition". Reliable recipe: build previews at natural (HUG) height, then **measure the tallest and set every preview to that fixed height** (`primaryAxisSizingMode='FIXED'; resize(width, maxH)`) with `primaryAxisAlignItems='CENTER'` so shorter content centers. Do NOT try `layoutAlign='STRETCH'` + preview `layoutSizingVertical='FILL'` to equalize — it can run away to thousands of px. `counterAxisAlignItems` has no `'STRETCH'` (use child `layoutAlign='STRETCH'`).
- ⛔ **Pins in a `layoutMode:'NONE'` diagram frame are positioned by `x`/`y` directly — do NOT set `layoutPositioning='ABSOLUTE'` on them.** ABSOLUTE is only valid when the parent is an auto-layout frame; on a plain NONE frame it throws "Can only set layoutPositioning = ABSOLUTE if the parent node has layoutMode !== NONE". (The anatomy `diagram` is a NONE frame by design — §1 Anatomy recipe.)
- ⛔ **Empty / bring-your-own-content slots render as a transparent checkerboard** in docs (e.g. avatar `type=image` ships an empty image). Don't show the raw empty slot — swap the nested content instance to a realistic variant (see §5 avatar), or pick a type that has visible default content.
- **Nested private-component variants aren't always exposed on the public component.** If a prop you need (e.g. avatar's `indicator-type`) isn't in `componentPropertyDefinitions`, reach into the instance: `inst.children.find(n=>n.name==='<layer>').setProperties({...})`. Editing a nested instance's variant is allowed and doesn't mutate the main component.
- ⛔ **No fixed heights that clip; mind card width.** A ~360-wide half-width card can't hold a wide mobile component (it clips horizontally) — use a FULL-WIDTH card for wide/mobile previews, or set the instance to FILL the preview. Always re-screenshot and confirm nothing is cut.

### Craft rules migrated from the accordion session (canonical here now)
- **Don't `resize()` a cloned annotated block / pins.** Cloned anatomy annotations drift on resize (lines miss the parts). Build pins yourself from each part's real `absoluteBoundingBox`, or keep native size.
- **Hit-zone / overlay shown in full, not a clipped ripple.** `clipsContent` crops a touch illustration to a square — show the whole clickable area (highlight/overlay + glyph), not a corner sliver.
- **Links in copy must be visibly styled.** An invisible hyperlink on a layer reads as plain text — add underline (`setRangeTextDecoration('UNDERLINE')`) + `text/neutral/link` color on the word range.
- **One consistent term for the component unit — take it from the COMPONENT_SET name, not the canvas label.** They can differ (banner-alert's canvas label is "banner" but its real name is `banner-alert` → the doc must say "banner alert", not "banner"). Confirm the term at kickoff; bind multi-word terms with an nbsp so they don't wrap. Fixing this after the fact is a whole rename-pass (see §6 term-rename snippet).
- **Instance-edit churn → re-query loop.** Editing an instance's text/props rebuilds its internal nodes, so a pre-collected node list goes stale (`Node ... not found`). Edit one at a time, re-finding each layer each step; for positional numbering filter by EFFECTIVE visibility (hidden layers skew the order).
- **Don't trust the old doc blindly.** Check it shows the component correctly/fully; if it's wrong or incomplete, do it right our way; if it's pointless, propose better rather than copy.

## 6b. ⚙️ Maintenance rule — audit & grow this kit (run periodically)

**Trigger:** at the end of every component doc build (and any time a build needed a fresh harvest, a new icon, a new component's props, or hit a gotcha not listed here).

**Do:** append what was newly learned so the next build skips the discovery:
1. New **variable IDs / text-style IDs** used → add to §2/§3.
2. New **icon keys** → §4.
3. The **component's prop table + node id** just documented → §5.
4. Any **new gotcha / fix** → §6a.
5. New reusable **snippet** → §6.

Keep it deduplicated and terse. This file is the memory of "things I should never re-derive." If a session spent tokens rediscovering something stable, that's the signal it belonged here.

## 7. Re-harvest script (run ONLY if a bind fails)

```js
const doc = await figma.getNodeByIdAsync('12017:1595'); // canonical accordion doc
const nodes = doc.findAll(()=>true); nodes.push(doc);
const varMap={}, styleMap={}, seen={};
for(const n of nodes){
  if(n.boundVariables) for(const k of Object.keys(n.boundVariables)){ let b=n.boundVariables[k]; b=Array.isArray(b)?b:[b];
    for(const x of b){ if(x&&x.id&&!seen[x.id]){ seen[x.id]=1; const v=await figma.variables.getVariableByIdAsync(x.id); if(v) varMap[v.name]=x.id; } } }
  if(n.type==='TEXT'&&n.textStyleId&&n.textStyleId!==figma.mixed){ const s=await figma.getStyleByIdAsync(n.textStyleId); if(s) styleMap[s.name]=n.textStyleId; }
}
return {varMap, styleMap};
```
