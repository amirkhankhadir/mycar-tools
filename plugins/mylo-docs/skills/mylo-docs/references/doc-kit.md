# Mylo DS — Doc Kit (frozen references)

> **Purpose:** everything reusable across doc builds, frozen so we don't re-derive it every session (no re-reading the canonical doc, no re-harvesting variable/style IDs, no re-searching icons). Load this alongside `documentation.md` at the start of any Mylo doc build.
>
> **Key rule (do NOT hardcode full IDs):** a `VariableID:<key>/<local-id>` or `S:<key>,<local-id>` pins the *imported copy inside one file*. When the library is republished or re-imported, the file gets a NEW copy and the old id keeps resolving to the **stale** one - pre-refactor values, missing modes (this is exactly how docs ended up bound to a 2-mode `light-mode/dark-mode` generation of Core after the brand-modes refactor). Below are **keys only** - the key is stable forever. Resolve at build time: `figma.variables.importVariableByKeyAsync(key)` / `figma.importStyleByKeyAsync(key)`. Re-harvest (§7) only to ADD tokens, never to "refresh" ids.
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
- [ ] **Ошибочный образец живёт ТОЛЬКО в Do & Don't.** В тематическом разделе показывай лишь корректные варианты. Проверено на buttons: три одинаково синие кнопки (`Смотреть все авто` / `Смотреть Все Авто` / `СМОТРЕТЬ ВСЕ АВТО`) с нейтральными подписями регистра читались как «все три допустимы» — дизайнер сразу это заметил. Правильная раскладка: правило + корректные образцы в разделе, сравнение с запретом — парой в Do & Don't (в «не так» можно положить два ошибочных образца сразу, `layoutWrap='WRAP'`).
- [ ] **Russian typography pass** over ALL text before finalizing (§6a): nbsp after hanging prepositions/conjunctions, number+unit together (`3 дня`), no illogical breaks. See [[feedback_ru_typography]].
- [ ] **Пилюли собраны с иконкой, а не голым текстом.** Каждая `pill` = иконка-компонент `general/Info Filled` 20×20 (§4) + текст, `counterAxisAlignItems='MIN'`. Голая рамка с текстом — не пилюля, а карточка; текстовый глиф (`!`, `ℹ`) вместо иконки запрещён (§6a). Ошибка проехала во все 4 доки волны A, потому что её не было в эталоне (пользователь, 19.08.2026).
- [ ] **Нет выдуманных нормативов.** Пороги, максимумы и «не длиннее N px» пиши ТОЛЬКО если они есть в компоненте или их дал дизайнер. Отдельно про ширину: если у компонента нет оси ширины — это НЕ значит «ширину задаёт только родитель», её можно и зафиксировать вручную; не превращай наблюдение в правило (пользователь, 19.08.2026).
- [ ] **Ни слова о прототипе.** В тексте нет «прототипом разведено/не собрано», перечисления триггеров файла и т.п. Поведение — на продуктовом уровне (`methodology.md` → What to Skip).
- [ ] **Never mutate the component** — only its text properties.
- [ ] **Платформенная развилка проверена фактом.** Открыт список страниц другой библиотеки, и выбран верный вариант: секция «Поведение по платформам» (компонент общий) ИЛИ блок-указатель на другой файл (компоненты разные) — §1, `methodology.md`. Не оба сразу.
- [ ] **Токены только по ключам.** Ни одного захардкоженного `VariableID:.../local-id` или `S:...,local-id` — только `importVariableByKeyAsync` / `importStyleByKeyAsync` (§2–§3). После сборки проверь: все цветовые привязки ведут в коллекцию с 4 модами (mycar/finance × light/dark), а не в старую с `light-mode/dark-mode`.

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
- **H1 title** — Okta Neue **Bold**, size **28**, lineHeight 34px, letterSpacing −0.5; fill → `text/neutral/primary`; **fontFamily не привязываем** — в Core нет шрифтовых переменных (§2). (No text style is applied to H1 in the canon.)
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
- ⛔ **Иконка обязательна**, не «по желанию»: без неё пилюля визуально неотличима от карточки и теряет смысл акцента.
- frame HORIZONTAL, padding `spacing/space-4` (16), gap `spacing/space-3` (12), radius `corner-radius/xs` (8), `counterAxisAlignItems='MIN'` (иконка держится первой строки)
- info → fill `bg-surface/neutral/floating` or `semantic/{info}`; warning → `bg-surface/semantic/warning/tint` with ⚠ in `text/semantic/warning`
- icon/glyph (`body/sm-medium`, semantic color) + text (`body/sm-regular` or `sm-medium`, `text/neutral/secondary`)

### Keyboard/gesture chip — `chip`
- frame HORIZONTAL, padding V `spacing/space-1`(4) / H `spacing/space-3`(12), radius `corner-radius/xs` (8)
- fill `bg-surface/neutral/floating`, stroke `stroke/neutral/secondary` weight sm
- text `body/sm-medium`, `text/neutral/primary`; glyphs: `⇥ Tab`, `↵ Enter`, `␣ Space` (keyboard) — for touch use tap/long-press/swipe chips
- Focus ring on demo instances = color token `stroke/focus-ring` applied as a stroke.

### Блок-указатель на другую платформу — `section-десктоп` / `section-мобилка`
Нужен, когда у платформ РАЗНЫЕ компоненты в РАЗНЫХ файлах (развилка — `methodology.md` → «Разные компоненты на разных платформах»). Эталон: chips `15519:1866`.
- Ставится последней содержательной секцией — **перед Do & Don't**.
- eyebrow `<COMPONENT> НА ДЕСКТОПЕ` (или `… НА МОБИЛКЕ`); subtitle **«Там другие компоненты — не переносите макет как есть»** — формулировка обкатана, менять без причины не надо.
- один обычный `card`, внутри две строки:
  1. текст `body/sm-regular` / `text/neutral/secondary`: какая библиотека, какая страница, и что **эта** дока описывает свою платформу. Образец: «Десктопные чипсы — самостоятельные компоненты в Mўlo Desktop Library, на своей странице 🧩 chips. Эта документация описывает мобильные.»
  2. строка-ссылка «Открыть страницу `<page>` в Mўlo Desktop Library»: `body/sm-medium`, цвет `text/neutral/link`, `t.setRangeTextDecoration(0, t.characters.length, 'UNDERLINE')` и `t.hyperlink = {type:'URL', value:'<url>'}`. Без подчёркивания и цвета ссылка читается как обычный текст (craft-правило ниже).
- URL: fileKey из `library-index.md` + `node-id` **страницы** другой библиотеки — брать из её `figma.root.children`, не угадывать. Desktop `🧩 chips` = `8160:6203` → `…/M%D1%9Elo-Desktop-Library?node-id=8160-6203`.

### Anatomy — exact canon recipe (match precisely; a common miss)
Structure: `card` → **`preview`** (the ONE gray stage: fill `bg-surface/neutral/base`, radius xs, padding `space-4`, align center) → **`diagram`** (a `layoutMode:'NONE'` frame, **`fills=[]` transparent**, fixed size ≈ 664 wide — just a positioning canvas for the instance + pins + leaders) → then **`legend`** → optional note.
- ⛔ **The `diagram` must be transparent.** Giving it its own fill/radius creates a box-in-a-box (gray inside gray) — the #1 anatomy mistake. Only `preview` is gray.
- **pin** = 24×24 frame, `cornerRadius 12` (circle), fill `bg-surface/neutral/base-container` (white), stroke **`icon/neutral/secondary`** (solid #535e6b, opacity 1 — NOT the faint `stroke/neutral/secondary`), weight 1; number text `body/sm-medium` / `text/neutral/primary`, centered.
- **connector leaders** = RECTANGLE 1px filled **`icon/neutral/secondary`** (solid, visible), and they must **actually reach the part** (span pin→part), not float as short stubs. Canon lengths ≈ horizontal 102, vertical 44.
- **layout** (mirror canon): the leftmost part gets a pin to the LEFT with a horizontal leader into it; other parts get pins above/below with vertical leaders. Give ≈40px gap between pin and instance so the leader is visible.
- **legend**: VERTICAL gap `space-3`; each `li` = HORIZONTAL gap `space-3`, align center; number box `n` = 20×20 circle (`cornerRadius 10`), fill white `base-container` + faint stroke `stroke/neutral/secondary`, number `body/sm-medium` primary; label `body/sm-regular` / `text/neutral/secondary`.

---

## 2. Variable key map (name → variable key) — resolve by key

```
spacing/space-none                  ba8d43b1b56b7dc3cb1ce19b81ccd574bf14a894
spacing/space-0-5                   a673f28ad9d3275eb5b42175feefe3be3f763fa8
spacing/space-1                     5b7bf0e69bc86462c3b2a66586721a3b7fd531b4
spacing/space-2                     95a995834838340a78a4fac6f74e24bc706c5561
spacing/space-3                     877167ff6ec45f4f810c7209b2ea26c6f5328004
spacing/space-4                     01ba1b7ff120978666649d2373596b28068b9878
spacing/space-5                     6255e8c1449062570ba8c6926aa1ef4b5d397c33
spacing/space-8                     8dcdd5e669107a4b0328672e3108e44c8d10f662
spacing/space-10                    3915e09464eab6541733891095bb2480aee5f7ca
corner-radius/none                  064bedfef6073fed13edff771db35792d5a3c624
corner-radius/xs                    2701510418e802c3016442019b78740c09365915
corner-radius/sm                    0c6b1457ca082e148c02f6f135ed827848b6e891
corner-radius/lg                    93315ffd301899c05bd3f7140de83a20d90382d4
border/width/xs                     1ec96e3c5018f51131b1ac3bf7e99a577ec00c27
border/width/sm                     f7fbd0ea6622adff0b0d17fb33a1f526fc72da99
bg-surface/neutral/base             91490344d3ebe5f52ed9583a477dc0c9e27c6484
bg-surface/neutral/base-container   0a3c000f5d25113ac09ed9c2c29611a15696b4c8
bg-surface/neutral/floating         ae1e0e6e22356632487a893354b24fde8142ac68
bg-surface/semantic/success/tint    740ee592d0a4a2ab7ad8b0f4872f7e96fd15e682
bg-surface/semantic/warning/tint    c2055dd61a62b6932a0a0c16c6cfdf6e3cc02b5c
bg-surface/semantic/danger/tint     aef2c53b3c6e2ca35b2707b36860c48e028cb3c8
text/neutral/primary                2cf87952d5d6554bf01fb262baae2f564131bcc1
text/neutral/secondary              359f4049cf5379da4dcae1291bec3ac1886deb6d
text/neutral/tertiary               ef9f1d5a8836fadab96bac0324cd222c81342bba
text/neutral/disabled               4fc8d84a088f0206148994b16f5a8f5a4ac48bdd
text/neutral/link                   e6df5c2111aa38070d9372ba6586d64b1b4f16f1
text/semantic/success               e08969be55a6ec0d7680828372094e94f3476a00
text/semantic/warning               a758ba4fcfaefd86b2b6586d6560584988d5a4aa
text/semantic/danger                16c289e72cbfece76ef8dda363648ecfc3fdf1c9
icon/neutral/primary                6a7c11e71bcd216089e8c4f71d147990f8e34cd0
icon/neutral/secondary              b98a5ae96600005278e01f18d0c0cd55ec03f2ed
icon/neutral/disabled               b91c4b71acc4c641d12ad471dd57d8ec352cfbac
stroke/neutral/secondary            50f4f96c80ef6740a68fd4d11439fee500b44312
stroke/focus-ring                   c3c2a7888da517c410113d5f214bfe6bfb9c25e6
```

**Font family:** Core has **no** font-family variables (checked: `brand-theme-semantics` 181, `display-semantics` 56, `global-primitives` — none match). Earlier versions of this kit bound `fontFamily` to a `typography` collection that is not part of Core and is not even available to the library file. **Do not bind `fontFamily` at all** — set `fontName` explicitly (`Okta Neue` / `Inter Display`) and load the font first.

## 3. Text style key map (name → style key) — `importStyleByKeyAsync` → `setTextStyleIdAsync(style.id)`

```
title/md-medium               78d1f5c755a6bfadc24a9623158e0901a51619e3
body/lg-regular               494cdfb8455c71f23cff383a73e7c6b10c1085ed
body/lg-regular-low-height    162a1bc9be3ae3a1e6b693042e4f60551113bc2b
body/lg-medium                dcc1d1cfc7c50da3e3655201f08e3227d1f5ef05
body/md-regular               4df58100c82dfaeb8b662e367d6ec7ad62f0c9c6
body/md-medium                17b7218d524a6642685cc6266900e037154fdbdf   (Inter Display Medium - used for list-row titles)
body/sm-regular               76873e37105711000f5c4b317e459166e75589fb
body/sm-medium                cc0fd582cd3d129454e704d74fb20351132cc48a
caption/sm-medium             435f82a164907ded63ccaf3c63842e60044d36d9
```

**H1 (no style):** `fontName {family:"Okta Neue", style:"Bold"}`, `fontSize 28`, `lineHeight {unit:"PIXELS", value:34}`, `letterSpacing {unit:"PIXELS", value:-0.5}`, fill → `text/neutral/primary`. No text style and **no fontFamily binding**.

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

### bottom-action-bar — COMPONENT_SET `3507:9485` on page `🧩 bottom-actions` (`3507:9890`) · **DOC finalized `15266:956`**, DEV NOTES — (не собран), linked ✅
- description non-empty (RU, do NOT overwrite): "Компонент, закреплённый в нижней части экрана, содержит основное действие страницы и индикатор системы (Home indicator)."
- **term:** «bottom action bar» / «панель действий» — по имени SET, не по подписи на канвасе.
- public props: `bg` VARIANT [transparent (def), base-no-shadow, base-with-shadow] · `adaptive` VARIANT [false (def), true] · `show-home-indicator#4699:0` BOOL (def true).
- variant node ids: transparent/false `3507:9484` · transparent/true `3507:9645` · base-with-shadow/false `3507:9531` · base-with-shadow/true `3507:9649` · base-no-shadow/false `3507:9588` · base-no-shadow/true `3507:9653`.
- structure: VERTICAL → `buttons` (инстанс приватного сета) + системная зона. **adaptive=false → `iOS-general-home-indicator` (34, style black/white); adaptive=true → `iOS-safari-toolbar` (52, scrolled True/False, домен mycar.kz) = мобильный веб в Safari** (подтверждено дизайнером).
- bg: transparent — без заливки/радиуса; base-no-shadow — fill `bg-surface/neutral/base-container` + верхние радиусы `corner-radius/lg`; base-with-shadow — то же + drop-shadow 0/−4 blur 24 @8% (effect style key `ad9a26eb68013032d219d22f3c31425138a45658` — импортировать через `figma.importStyleByKeyAsync`, затем `setEffectStyleIdAsync(style.id)`).
- **`.bottom-action-bar/buttons` приватный SET `3596:1433`** (Скрыт, v2.0.0): `buttons-layout` VARIANT [1-button `3596:1440`, 2-buttons-vertical `3596:1434` (def), 2-buttons-horizontal `3596:1437`] · `show-slot#4499:36` BOOL (def false) + `slot#11781:0` SLOT (stretchChildOnInsert, дефолтный контент `.progress-bar-with-label`) · INSTANCE_SWAP по позициям: `button-type#3551:22`, `top-button-type#3551:6`, `bottom-button-type#3551:10`, `left-button-type#3551:14`, `right-button-type#3551:18`. Значения свопа: **primary-button `162:2365`, on-container-button `162:2373`**.
- padding панели кнопок 12/16/12/16 (`space-3`/`space-4`), gap 12.
- ⭐ **ПРАВИЛО ПРИОРИТЕТА (закодировано в компоненте):** в `2-buttons-vertical` primary — **снизу**, в `2-buttons-horizontal` — **справа**. Свопы позволяют это сломать → в доке обязателен Do/Don't на эту тему.
- `primary-button` SET `3446:38100`: `size` [lg/md/sm] × `state` [rest/hover/pressed/disabled/loading], `is-focused#3446:606`, `label#3446:611`. У on-container-button ключ лейбла `label#3446:617`. **Фокус есть** (в отличие от inline-alert) и живёт на кнопке, не на панели.
- **композиция:** панель уже встроена в `0.generic-modal-action-sheet` SET `5150:55595` (вариант `type=with-bottom-action-bar` `5150:55600`) и в `onboarding-modal` (`show-bottom-action-bar#5141:13`). ⚠️ Вариант `type=with-keyboard` `5150:55604` панели действий **не содержит** — клавиатура её заменяет; не выдумывать «панель поднимается над клавиатурой» для модалок.
- старая дока `bottom-action-bar-doc` `4601:56838` (1440 шириной) — оставлена, удаляет дизайнер. Её содержание перенесено в новую.

### buttons (семейство) — страница `🧩 buttons` (`1:6`) · дока **CONCEPT `15287:28909`** (ждёт согласования), старая `buttons-doc` `4582:23247` (1440, удаляет дизайнер)
- **11 COMPONENT_SET + 1 COMPONENT.** primary `3446:38100` · on-base `3446:38103` · on-container `3446:38102` · outline `3446:38108` · link `3446:38107` · inverse `3446:38105` · white `3576:13001` · blur `3446:38079` · success `38:1035` · **danger `15271:1893`** · **danger-link `15271:28749`** · integration-button COMPONENT `1430:15768`.
- варианты: `size` [lg 56 / md 44 / sm 32] × `state` [rest/hover/pressed/disabled/loading] = 15. Имя варианта строго `size=lg, state=rest`. **Исключение — blur-button: только `size`, без `state`** (3 варианта) → искать вариант с фолбэком `'size=lg, state=rest' || 'size=lg' || children[0]`.
- ключи свойств отличаются у каждого сета (`label#3446:611` у primary, `#3446:617` у on-container, `#3446:641` у link, `#3446:500` у danger) → **находить по `startsWith('label')`**, не хардкодить. Так же `show-leading-icon`, `show-trailing-icon`, `is-focused`.
- внутренние слои (для анатомии): `focus-ring` FRAME (скрыт, включается `is-focused`) · `leading-icon` INSTANCE 24×24 @16,16 · `label-container` → TEXT `button-label` @44,18 · `trailing-icon` INSTANCE 24×24. У lg с двумя иконками и подписью «Продолжить» габарит 200×56.
- **`integration-button` — НЕ платёжная кнопка** (легко ошибиться): составной компонент, внутри INSTANCE `primary-button` + FRAME `container` с логотипом партнёра. Props: `title#1430:2` TEXT (def «Title»), `show-logo#1430:1` BOOL (def true), `icon#1430:0` INSTANCE_SWAP (дефолт — логотип LiTRO). Описание у компонента **пустое**.
- иконочные кнопки — отдельная страница `🧩 icon-buttons` (`3446:38101`), 8 сетов + **danger-icon-button `15271:29603`**; `shape` [circle/square] × `size` [xl 56/lg 44/md 32/sm 24] × `state` (4, **loading НЕТ**).
- полезные ключи для превью: контрастная подложка `bg-surface/brand/strong` `bce37a7be3b78dd9892d31812298182a07ebc810`; подписи на ней — `text/neutral/on-fill` `7ef201c4f476c76d6fbd94d97ec093ee72962b7e`; чип для сравнения — SET `primary-chip` `3f4e0c29c55eae5a57b973ef9d3df299c75e84a8` (вариант `style=on-container, size=lg, is-selected=False, state=rest`); иконка корзины — `general/Delete` `dc55d51a6899b9cf993128f08761127937cc9fe7`.
- danger-семейство добавлено 12.08.2026 клоном success/link + ремапом на `bg/semantic/danger/strong/*`, `text|icon/semantic/danger`. Прописано в свапы 27 пропертей 12 компонентов (bottom-action-bar, content-block, page-states, list-items, heading, chat, stepper, timeline).

### checkbox (семейство) — страница `🧩 checkbox` (`235:1760`) · дока **CONCEPT `15505:725`** (ждёт согласования), старая `checkbox-doc` `4644:1414` (1440, удаляет дизайнер)
- **`checkbox-button-item`** SET `240:423`, v1.0.0. Props: `state` [rest/hover/pressed/disabled] · `is-selected` [false/true] · `is-indeterminate` [false/true]. **12 вариантов — комбинации `is-selected=true + is-indeterminate=true` НЕТ.** Габарит 28×28, визуальный квадрат — Vector 21×21 внутри. Ключевые варианты: rest/unsel `240:422` · rest/sel `242:60` · rest/ind `242:119` · pressed/unsel `240:426` · pressed/sel `242:64` · disabled/unsel `240:428` · disabled/sel `242:66`.
- **`checkbox-button-block`** COMPONENT `710:13687` (не SET!), v1.0.1, 233×41. Props: `label#3474:0` TEXT · `supporting-text#3474:1` TEXT · `show-supporting-text#710:1` BOOL (def **true**). Внутри HORIZONTAL gap 8, `counterAxisAlignItems='MIN'` (контрол прижат к верху); label = `body/lg-regular-low-height`, supporting = `body/sm-regular`.
- ⚠️ **Блок НЕ выставляет наружу `state`/`is-selected`/`is-indeterminate`** — выбранную строку в доке ставим через вложенный инстанс: `i.children.find(n=>n.name==='checkbox-button-item').setProperties({'is-selected':'true'})`. Флаг дизайнеру: стоит вынести в exposed nested properties.
- **verified прототип:** rest →ON_HOVER→ hover →ON_PRESS→ pressed →ON_CLICK→ переключение. disabled — 0 реакций. ⚠️ `pressed/is-indeterminate` по клику ведёт в **не выбран** (`242:125` → `240:422`), хотя дизайнер подтвердил норму «тап по родителю выделяет всю группу» → в доке пишем норму, разводку правит дизайнер.
- **Состояния по токенам:** невыбранный — прозрачный + `stroke/neutral/primary`, фон `bg/on-container/{hover,pressed,disabled}`; выбранный/частичный — `bg/brand/{rest,hover,pressed,disabled}`, глиф `icon/neutral/on-fill`. **Состояния «фокус» в наборе нет.**
- анатомия блока: 1 контрол (обязательно) · 2 лейбл (обязательно) · 3 описание (опционально, `show-supporting-text`). Multi-platform — дизайнер подтвердил mobile + desktop → секция «Поведение по платформам» обязательна.

### description-lists (семейство) — страница `🧩 description-lists` (`3457:12415`) · дока **finalized `15528:1534`**, старая `description-list-doc` `4653:4495` (1440, удаляет дизайнер)
- **Два публичных компонента, оба слотовые.** `description-list-vertical` COMPONENT `4148:35725` (v2.0.0, слот `rows-slot#11781:5`) · `description-list-horizontal` COMPONENT_SET `4211:3841` (v2.0.0, `type` [horizontal-left `4211:3840` (def), horizontal-right `4211:3839`]; внутри приватные `.left-aligned` `4211:2245` / `.right-aligned` `4211:2810` со слотом `list-slot`).
- **Строки — публичные, их кладут в слот:** `description-list-vertical/description-row` `4148:34854` (GRID на 2 колонки, проп `show-right-info-item#4148:14`, def true) · `description-list-horizontal/description-row-left-aligned` `4211:1530` · `…-right-aligned` `4211:1529`. Во всех строках вложенные `label` / `description` — **exposed instances**: свойства ставятся на них, а не на строке.
- **`description-list-vertical/description-item` `4148:34718`:** `show-leading-icon#4148:7` (def false) · `leading-icon#4148:8` · `label#4148:9` · `description#4148:10` · `show-descr-trailing-icon#4148:11` (def false) · `trailing-icon#4148:12` · `show-right-border#4148:13` (def false — разделитель колонок, `stroke/neutral/primary`).
- **Приватные:** `.description-list-horizontal/label` `4211:1506` (label + show-leading-icon) · `.left-aligned-item` `4211:1505` (description + show-leading-icon) · `.right-aligned-item` `4211:1511` — **только** description, иконки нет (асимметрия с left, дизайнеру озвучена).
- **verified:** реакций нет ни на одном узле → компонент **не интерактивен**, состояний и фокуса не существует. Vertical: `title` FILL + `maxLines=1` + `ENDING` → обрезается корректно, а `value` **HUG** + `maxLines=1` → многоточие НЕ срабатывает, длинное значение вылезает из колонки и наезжает на соседнюю (`clipsContent=false` на всех уровнях). Horizontal: обе текстовки `truncation=DISABLED` и переносятся, строка `counterAxisAlignItems='MIN'` (верх). Стили: vertical `title` = `body/md-regular` tertiary, `value` = `title/sm-medium` primary; horizontal обе = `body/lg-regular-low-height`, лейбл tertiary.
- **Готовые блоки** на `🧩 content-blocks`: `description-vertical-block` `5149:47703`, `description-horizontal-block` `5149:46867` (header + список + footer). Заполненные образцы лежат в секции `ready-to-copy-templates` `4644:20006` (`6997:7628` / `6997:7629`) — их удобно `clone()` в превью вместо ручного набивания контента; там же берутся иконки `cars/Engine` `4497:1314`, `cars/gear box` `4497:1708`, `cars/steering wheel` `4497:1119`, `cars/car brake` `4497:1706`, `general/Document approval` `4497:1115`, галочка `selection/Radio - ON (Checkmark)` `15464:39134`.
- **Переименовано 19.08.2026 по просьбе дизайнера:** `decsription-*` → `description-*`, слой `description-conteiner` → `description-container`, проп `desctiption#4148:10` → `description#4148:10` через `editComponentProperty` (id сохраняется, оверрайды выживают). После такой правки библиотеку надо переопубликовать.
- multi-platform (мобилка + десктоп, дизайнер подтвердил; в Desktop Library страницы description-lists нет) → секция «Платформы», блок-указатель НЕ нужен.

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

Compact helpers. `V` = variable-KEY map, `TS` = text-style-KEY map from above. Everything resolves through `vv()` / `ss()` (import by key) — so a republished library can never leave the doc on a stale token copy.

```js
// --- token KEY maps (subset; extend from section 2/3). Keys only - never VariableID:.../local-id ---
const V = {
  s_none:'ba8d43b1b56b7dc3cb1ce19b81ccd574bf14a894', // spacing/space-none
  s1:'5b7bf0e69bc86462c3b2a66586721a3b7fd531b4', // spacing/space-1
  s2:'95a995834838340a78a4fac6f74e24bc706c5561', // spacing/space-2
  s3:'877167ff6ec45f4f810c7209b2ea26c6f5328004', // spacing/space-3
  s4:'01ba1b7ff120978666649d2373596b28068b9878', // spacing/space-4
  s5:'6255e8c1449062570ba8c6926aa1ef4b5d397c33', // spacing/space-5
  s8:'8dcdd5e669107a4b0328672e3108e44c8d10f662', // spacing/space-8
  s10:'3915e09464eab6541733891095bb2480aee5f7ca', // spacing/space-10
  rXs:'2701510418e802c3016442019b78740c09365915', // corner-radius/xs
  rSm:'0c6b1457ca082e148c02f6f135ed827848b6e891', // corner-radius/sm
  bwSm:'f7fbd0ea6622adff0b0d17fb33a1f526fc72da99', // border/width/sm
  bgBase:'91490344d3ebe5f52ed9583a477dc0c9e27c6484', // bg-surface/neutral/base
  bgContainer:'0a3c000f5d25113ac09ed9c2c29611a15696b4c8', // bg-surface/neutral/base-container
  bgFloating:'ae1e0e6e22356632487a893354b24fde8142ac68', // bg-surface/neutral/floating
  successTint:'740ee592d0a4a2ab7ad8b0f4872f7e96fd15e682', // bg-surface/semantic/success/tint
  warningTint:'c2055dd61a62b6932a0a0c16c6cfdf6e3cc02b5c', // bg-surface/semantic/warning/tint
  dangerTint:'aef2c53b3c6e2ca35b2707b36860c48e028cb3c8', // bg-surface/semantic/danger/tint
  tPrimary:'2cf87952d5d6554bf01fb262baae2f564131bcc1', // text/neutral/primary
  tSecondary:'359f4049cf5379da4dcae1291bec3ac1886deb6d', // text/neutral/secondary
  tTertiary:'ef9f1d5a8836fadab96bac0324cd222c81342bba', // text/neutral/tertiary
  tSuccess:'e08969be55a6ec0d7680828372094e94f3476a00', // text/semantic/success
  tWarning:'a758ba4fcfaefd86b2b6586d6560584988d5a4aa', // text/semantic/warning
  tDanger:'16c289e72cbfece76ef8dda363648ecfc3fdf1c9', // text/semantic/danger
  strokeSecondary:'50f4f96c80ef6740a68fd4d11439fee500b44312', // stroke/neutral/secondary
  focusRing:'c3c2a7888da517c410113d5f214bfe6bfb9c25e6', // stroke/focus-ring
};
const TS = {
  lgMed:'dcc1d1cfc7c50da3e3655201f08e3227d1f5ef05', // body/lg-medium
  mdReg:'4df58100c82dfaeb8b662e367d6ec7ad62f0c9c6', // body/md-regular
  mdMed:'17b7218d524a6642685cc6266900e037154fdbdf', // body/md-medium
  smReg:'76873e37105711000f5c4b317e459166e75589fb', // body/sm-regular
  smMed:'cc0fd582cd3d129454e704d74fb20351132cc48a', // body/sm-medium
  capMed:'435f82a164907ded63ccaf3c63842e60044d36d9', // caption/sm-medium
};
// resolve-by-key with cache. If a key throws, the token was renamed/removed in Core - fix the map, do NOT fall back to a hardcoded id.
const _vc={}, _sc={};
async function vv(key){ if(!_vc[key]) _vc[key]=await figma.variables.importVariableByKeyAsync(key); return _vc[key]; }
async function ss(key){ if(!_sc[key]) _sc[key]=await figma.importStyleByKeyAsync(key); return _sc[key]; }
async function vbind(node, prop, key){ node.setBoundVariable(prop, await vv(key)); }
async function fillVar(node, key){ const v=await vv(key); const base=(node.fills&&node.fills.length)?JSON.parse(JSON.stringify(node.fills))[0]:{type:'SOLID',color:{r:0,g:0,b:0}}; node.fills=[figma.variables.setBoundVariableForPaint(base,'color',v)]; }
async function strokeVar(node, key){ const v=await vv(key); node.strokes=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',v)]; }

// text with style + color token. Inter Display / Okta Neue must be loaded first.
async function T(chars, styleKey, colorKey){
  const t=figma.createText();
  const st=await ss(styleKey);            // import by key -> current copy
  await t.setTextStyleIdAsync(st.id);
  t.characters=chars;
  if(colorKey) await fillVar(t, colorKey);
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
- ⛔ **Не выводи нормативы сам.** Числовые пороги («строка длиннее 640 px читается тяжело»), максимумы и запреты по размерам — только из компонента или от дизайнера. Своё наблюдение оформляй как наблюдение, а лучше спроси. Тот же класс ошибки, что и выдуманное состояние.
- ⛔ **Правка exposed nested instance инвалидирует хендлы всего поддерева.** После `setProperties` на вложенном инстансе нельзя переиспользовать ни родителя, ни его `children`: следующий `inst.findOne(...)` падает с «Node ... not found» на устаревшем узле. Перед каждым шагом заново доставай инстанс по id. Хелпер: `async function setOne(instId, childName, props){const I=await figma.getNodeByIdAsync(instId); I.findOne(n=>n.name===childName).setProperties(props);}` (поймано на description-lists, где каждая строка редактируется дважды — label и description).
- ⛔ **`maxLines` + `textTruncation:'ENDING'` на HUG-тексте НЕ обрезает.** Многоточие включается, только когда ширина ограничена; у HUG-текста её нет, и он просто вылезает за родителя — у `description-list-vertical` значение так наезжает на соседнюю колонку. Никогда не пиши «обрезается многоточием» по одним пропсам: поставь реальное длинное значение и посмотри.
- ⛔ **Версию плагина сверяй по git, а не по одному `cat`.** 19.08.2026 параллельный `cat` кеша и репо вернул одинаковую 0.4.1, хотя в репо было 0.4.4 — дока строилась по устаревшим референсам, и правило «не выводить нормативы самому» пришлось применять постфактум. Рецепт: рядом с `cat` кеша всегда `git -C <repo> log --oneline -3 -- plugins/mylo-docs/.claude-plugin/plugin.json`.
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
- ⛔ **Проверяй, что переменная реально нашлась: `getVariableByIdAsync` может вернуть `null`, и бинд молча не применится.** `setBoundVariableForPaint(paint, 'color', null)` возвращает исходный paint → на канвасе остаётся **чёрная** заливка, ошибки нет. Хелперы `fillVar`/`vbind`/`strokeVar` ОБЯЗАНЫ бросать на `null`. Так на bottom-action-bar все Do/Don't-карточки уехали в чёрный: ID тинтов из §2 были от другого файла (`/6026:*` вместо `/8215:*`). При расхождении — искать переменную **по имени** в коллекции (`col.variableIds` → `getVariableByIdAsync` → сверить `v.name`), а не подставлять ID вслепую.
- ⛔ **Вложенные системные компоненты фиксированной ширины не сжимаются.** `iOS-safari-toolbar` (393) внутри панели при `inst.layoutSizingHorizontal='FILL'` в узкой колонке обрезается по краям (AA, «обновить»). Правило: если превью содержит элемент фиксированной ширины — **не ставить FILL**, показывать в натуральную величину. Для этого годится «широкая карточка»: `card` HORIZONTAL, `preview` FILL + текстовая колонка FIXED 200 → превью ≈476, внутренняя ширина ≈452 ≥ 393.
- ⛔ **Три колонки в ряд не держат мобильный компонент.** 736 / 3 ≈ 235, внутри ≈203 → у `2-buttons-horizontal` подписи режутся пополам. Для превью шириной 393 максимум **2 колонки** (≈320) либо широкая карточка. Три колонки — только для коротких однокнопочных превью.

- ⛔ **Сверку со старой докой делать по ТЕЛУ текста, а не по заголовкам, и ДО сборки.** Заголовки не показывают правил: у buttons в старой доке в теле лежали «не отключайте кнопки отправки форм — оставляйте активной и показывайте валидацию», «избегайте горизонтальной группировки: при локализации подписи расползаются», Sentence case с примерами Title Case / ALL CAPS и эвристика «спросите себя, зачем добавляете компонент». Всё это пришлось доносить уже после сборки. Рецепт: `doc.findAll(n=>n.type==='TEXT'&&n.visible)` → сортировка по `absoluteBoundingBox.y` → читать ВСЁ (у buttons-doc это 186 узлов, влезает в 2 вызова), затем строить.
- ⛔ **Инлайн-скриншот по умолчанию уменьшен (0.5× для узла шириной 736) — по нему НЕЛЬЗЯ судить о тонких визуальных различиях.** На иконочных кнопках я так «увидел», что square и circle не различаются, и почти выкинул рабочую пару Do/Don't; по факту square привязан к `corner-radius` по размеру (xl 20 · lg 16 · md 12 · sm 8), circle — к `corner-radius/round`, и на `screenshot({scale:2})` разница очевидна. Радиусы, контраст, толщину линий и обрезку текста проверять только на scale 1–2.
- ⛔ **`node.screenshot()` рендерит в дефолтном режиме документа (`mycar-light`), а НЕ в том, в котором дизайнер смотрит файл.** У doc-фреймов `explicitVariableModes` пустой (наследование), и у канона тоже — поэтому инлайн-скриншот не воспроизведёт тёмную тему пользователя. Вывод: **визуальные баги в тёмной теме скриншотом не поймать**; проверять привязки токенов (что ни одна краска не осталась несвязанной), а для тёмного превью временно `sect.setExplicitVariableModeForCollection(coll, darkModeId)` → скриншот → `clearExplicitVariableModeForCollection`.
- ⛔ **Свап кнопки в `2-buttons-vertical` у `.bottom-action-bar/buttons` сбрасывает размер вложенной кнопки в HUG** (92 вместо ширины панели); в `2-buttons-horizontal` FILL сохраняется. После свапа ставить `inst.layoutSizingHorizontal='FILL'` и заново находить узел (instance-edit churn). Подписи после свапа тоже дефолтные («Button») — задавать реальные.
- ⛔ **Апостроф в `"Don't"` внутри одинарных кавычек ломает скрипт** (`SyntaxError: expecting ','`). Для строк Do & Don't использовать двойные кавычки.

### Выравнивание высот и «убежавшие» превью (checkbox, 19.08.2026)
- ⛔ **Ось высоты зависит от направления автолейаута.** У HORIZONTAL-превью высота — это **counter**-ось (`counterAxisSizingMode`), а `primaryAxisSizingMode` управляет ШИРИНОЙ. Отпускать высоту в hug надо той осью, которая за неё отвечает, иначе «сброс перед пересчётом» ничего не сбрасывает и максимум замеряется по битому состоянию. Универсальные хелперы: `hugH(n)` → `n.layoutMode==='HORIZONTAL' ? counterAxisSizingMode='AUTO' : primaryAxisSizingMode='AUTO'`; `fixH(n,h)` → `resize(n.width,h)` + та же ось в `'FIXED'`.
- ⛔ **Выравнивай высоты ТОЛЬКО после того как секция добавлена в doc-фрейм.** Пока строка висит открепленной, она hug-ширины (сильно шире 736) → замеренный максимум не соответствует финальной вёрстке.
- ⛔ **`layoutSizingHorizontal='FILL'` на инстансе внутри hug-превью даёт рант-эвей.** На checkbox-блоке это дало превью высотой **1236 px**: инстанс тянется за родителем, родитель — за инстансом. Ширину инстанса задавать `resize(320, inst.height)`, FILL не использовать.

### Иконки в пилюлях и tap-иллюстрация (checkbox, 19.08.2026)
- ⛔ **`resetOverrides()` на инстансе иконки стирает привязку цвета.** Так предупреждающий треугольник посерел. Если ресетишь — сразу перебинди: `icon/semantic/warning` (key `99c79f8e4731136bbb90cc510040040ff5c93429`), `icon/semantic/success` `ff3ee0a7973d74e1a6c7df21f908455f719bf23d`, `icon/semantic/danger` `0189c4ccd51c4033a59b1ba778142d3773649d63`.
- **`general/Info Filled` уже нейтрально-серый — НЕ перекрашивай.** Заливка всех его векторов в `icon/neutral/secondary` превращает иконку в тёмный квадрат-кляксу. Ставь инстанс 20×20 как есть.
- **Не рисуй глиф-заменитель вместо иконки.** Текстовый `ℹ` рендерится цветным эмодзи и выбивается из house-style — только компонент из §4.
- ⛔ **У `.documentation/tap` (COMPONENT `4552:55767`, key `3adc08a67d28e87052613429c76c58139e2d5e3f`) непрозрачное ядро.** Поставленный по центру контрола, он его полностью закрывает. Класть на пустую часть строки (`bi.x + bi.width - 40`) и вставлять `insertChild(0, tap)`, чтобы строка рисовалась поверх.
- **Тофу в чипах.** `␣` (U+2423) в Inter Display нет — в чипах писать `Space` / `Tab` словами. `⇥` рендерится, но без пары выглядит случайно.

### Смена TEXT-свойства схлопывает range-стили (consent-text, 20.08.2026)

Присвоение нового значения TEXT-свойству инстанса **стирает всю посимвольную разметку** внутри строки: подчёркивания, цвета диапазонов, `hyperlink`. Текст становится одним ровным диапазоном, ссылки исчезают.

Следствия:
- Компоненты, у которых ссылка сделана диапазоном внутри абзаца (`consent-text` и подобные), после правки копии требуют **ручного восстановления разметки**. Пишите это в доке явно — дизайнер иначе теряет ссылки молча.
- Тот же эффект даёт прогон RU-типографики, если он переписывает `characters`. Порядок один: сначала типографика, **ссылки и подчёркивания — последними**.
- Не проверяйте наличие ссылки по виду: `hyperlink` у диапазона может быть не задан вовсе, а подчёркивание быть просто оформлением. Адрес в таких компонентах живёт в коде.

### Порядок сборки TEXT и невидимые стенды (tabs, 20.08.2026)

- **TEXT, оформленный до `appendChild`, изредка выпадает из автолейаута** (уезжает в x=y=0 и растягивается на всю ширину). Надёжный порядок: `appendChild` → текст-стиль → `characters` → `textAutoResize='HEIGHT'` → `resize(avail)` → `layoutSizingHorizontal='FILL'`.
- **Компонент с нейтральной поверхностью невидим на сером стенде** — трек `segmented-control` залит тем же `bg-surface/neutral/base`, что и стенд. Клади внутрь стенда белую подложку-экран; менять цвет самого стенда на белый нельзя вслепую, он ломает другие превью (например белый круг `user-placeholder`).
- **Ключ `.documentation/tap` не импортируется в Mobile-файле** (`Component with key not found`) — tap-иллюстрацию там не строить.

### Имена компонентов в тексте — только обычный дефис (OTP-input, 20.08.2026)

Не заменяй дефис в имени компонента на неразрывный U+2011, даже чтобы имя не рвалось по строкам: имя должно остаться копируемым и находимым поиском по файлу. Неразрывный дефис уместен в обычных словах, не в идентификаторах.

**Правка строк — по одной замене за раз.** Пакетная схема «сначала все `insertCharacters`, потом все `deleteCharacters`» ломает текст: каждая вставка сдвигает последующие индексы, и удаление съедает соседний символ (получается `inpu-tfields` вместо `input-fields`). Надёжно так:

```js
while (t.characters.indexOf(bad) >= 0) {
  const i = t.characters.indexOf(bad);          // индекс заново на каждой итерации
  t.insertCharacters(i, good, 'BEFORE');
  t.deleteCharacters(i + good.length, i + good.length + bad.length);
}
```

После любой такой правки прогоняй проверку: собери все токены `/[A-Za-z]+-[A-Za-z][A-Za-z-]*/` и `/[А-Яа-яЁё]+-[А-Яа-яЁё]+/` по фрейму и сверь со списком настоящих имён — сдвинутый дефис глазами в длинной доке не виден.

### Превью и равные высоты — порядок операций (maps, 20.08.2026)

- **Равные высоты карточек в ряду** даёт `layoutSizingVertical='FILL'` на самой карточке. `layoutAlign='STRETCH'` здесь не срабатывает.
- **Центрировать инстанс в превью можно только ПОСЛЕ** того как ряд и карточки получили FILL: до этого ширина превью ещё дефолтная (696), и содержимое уезжает за край.
- **Автолейаут-обёртки клипуют тень** — белая метка с тенью превращается в серый квадрат. Ставь `clipsContent=false` на всех обёртках превью.
- **Вложенный вариант переключается через поиск по имени слоя:** `inst.children.find(n => n.name === 'direction-indicator').setProperties({...})` — когда свойство наружу не выведено.
- **Локальные компоненты файла** (неопубликованные) по ключу не импортируются — только `comp.createInstance()` или `.clone()` мастера.

### Дети SLOT инвалидируются после setProperties (feedback-state, 20.08.2026)

После каждого `setProperties` на вложенном инстансе внутри SLOT остальные дети слота становятся мёртвыми: повторный `findOne` с только что перечитанного родителя отдаёт устаревшие id, и `getNodeByIdAsync` возвращает `null` уже на втором элементе. Ни `slot.children[i]`, ни перечитывание родителя по id внутри одного скрипта не спасают.

**Рабочий путь (уточнено на feedback-state):** брать детей слота по АБСОЛЮТНОМУ id вида `I<инстанс>;<слой-мастера>;<id-ребёнка>` — например `I15679:36084;4797:1009;15679:36438`. Так правятся по нескольку элементов за один вызов, ни одного `null`. Ломается именно путь через `findOne`/`children` ПОСЛЕ мутации — не сам слот.

Альтернатива, когда id собирать не хочется: клонировать готовый инстанс из `ready-to-copy-templates`, где подписи уже расставлены.

Симптом, по которому это ловится в QA: в превью остались дефолтные подписи («Chip», «Label») вместо осмысленных.

### Лимит вызовов Figma MCP — планируй сборку под него

Лимит на seat расходуется на весь сеанс, включая чтения. Крупная дока съедает 60–90 вызовов. Поэтому:
- разведку (дерево, свойства, токены) делай ОДНИМ вызовом с полным дампом, а не десятью точечными;
- собирай секцию за вызов, а не элемент за вызов;
- RU-типографику и простановку ссылок делай последними двумя вызовами — если лимит кончится раньше, недоделанной останется только отделка, а не содержание.

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

## 7. Harvest script (run only to ADD tokens to the maps)

Returns **keys**, never file-local ids. Run it in the library file, paste new rows into §2/§3.

```js
const doc = await figma.getNodeByIdAsync('12017:1595'); // canonical accordion doc
const nodes = doc.findAll(()=>true); nodes.push(doc);
const varMap={}, styleMap={}, seen={};
for(const n of nodes){
  if(n.boundVariables) for(const k of Object.keys(n.boundVariables)){ let b=n.boundVariables[k]; b=Array.isArray(b)?b:[b];
    for(const x of b){ if(x&&x.id&&!seen[x.id]){ seen[x.id]=1; const v=await figma.variables.getVariableByIdAsync(x.id);
      if(v){ const c=await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId);
        varMap[v.name]={key:v.key, collection:c?c.name:null, modes:c?c.modes.length:null}; } } } }
  if(n.type==='TEXT'&&n.textStyleId&&n.textStyleId!==figma.mixed){ const st=await figma.getStyleByIdAsync(n.textStyleId); if(st) styleMap[st.name]=st.key; }
}
return {varMap, styleMap};
```

**Sanity check after harvesting:** every colour variable must report the current Core collection with **4 modes** (`mycar-light, mycar-dark, finance-light, finance-dark`). A 2-mode `light-mode/dark-mode` result means the node you harvested from is itself bound to a stale generation — rebind it first, then re-harvest.
