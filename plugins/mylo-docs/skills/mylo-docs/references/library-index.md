# Mўlo libraries — индекс (fileKeys · гайды · реестры)

> Индекс для скилла `mylo-docs`: fileKeys библиотек, ссылки на референс-гайды и реестр
> документированных компонентов.
> ⚠️ **Реестр — «живой»:** при документировании нового компонента добавляется строка. Так как
> файл едет внутри плагина, обновление реестра = правка + `git push` + бамп версии (см. README
> «Как обновлять»). Позже реестр можно вынести во внешний источник.

## Files (Figma)

| Library | fileKey |
|---|---|
| Mўlo Mobile Library (компоненты + доки — строим здесь) | `UGCOeKehvfoEkWtbXr4Mav` |
| Mўlo Desktop Library (компоненты + доки — строим здесь; см. `desktop-delta.md`) | `dzG9fy1i8Z2Gdb5hyRYsPU` |
| Mўlo Core Variables & Styles | `jXo59TFA8kmeIVzJf2fh9l` |
| Mўlo Text Styles | `O6u2I2dRfC9T5Z508Edy40` |
| Mўlo Icons | `6hA6u3FBiihgDnyb9WGIBi` |
| Mўlo Design Assets | `t3OMLcqg72wsMTk7DcLW4z` |
| Mўlo Visuals | `oKFEdj5FxOkIYpON0kCJyV` |

## Reference guides

- **Mўlo Date & Time Formats guide** (RU & KZ) — https://www.figma.com/design/5stkPCttcpi0PDp8pOzRH1/?node-id=0-1
  — content-стандарт для любого компонента, показывающего даты/время. Следовать в Content Guidelines /
  Behavior (см. `methodology.md` → «Date & time content»).
- **DS onboarding deck** (архитектура, 3 слоя переменных, категории цвета, версии/статусы, темы) —
  https://www.figma.com/slides/6MpmUsPVGwXxgf9MsO6GkZ

## Component registry — Mobile (`UGCOeKehvfoEkWtbXr4Mav`)

Status: `⬜ not started` · `🧩 concept` · `🚧 built (awaiting approval)` · `✅ finalized`

| Component | Page | Doc frame node-id | Dev-frame node-id | Status | Linked? |
|---|---|---|---|---|---|
| accordion-item | 🧩 accordions | 12017:1595 | 12097:771 | ✅ finalized | ✅ |
| inline-alert | 🧩 alerts | 12107:771 | — (не нужен) | ✅ finalized | ✅ |
| banner-alert | 🧩 alerts | 12164:916 | — (не нужен) | ✅ finalized | ✅ |
| avatar | 🧩 avatars | 12581:799 | 12604:1452 | ✅ finalized | ✅ |
| badges | 🧩 badges | 12608:1037 | 12629:1115 | ✅ finalized | ✅ |
| bottom-action-bar | 🧩 bottom-actions | 15266:956 | — (не собран) | ✅ finalized | ✅ |
| buttons (семейство, 12 компонентов) | 🧩 buttons | 15287:28909 | — | ✅ finalized | ✅ |
| icon-buttons (семейство, 9 компонентов) | 🧩 icon-buttons | 15321:1138 | — | ✅ finalized | ✅ |
| checkbox (item + block) | 🧩 checkbox | 15505:725 | — (не нужен) | ✅ finalized | ✅ |
| chips (primary · inverse · group · autocheck) | 🧩 chips | 15506:27876 | — (не нужен) | ✅ finalized | ✅ |
| description-lists (vertical + horizontal) | 🧩 description-lists | 15528:1534 | — (не нужен) | ✅ finalized | ✅ |

> Добавляй строку при старте компонента; заполняй node-id по мере создания фреймов; меняй статус на
> approval; ставь **Linked?** ✅ после того как `documentationLinks` задан и прочитан обратно.

## Component registry — Desktop (`dzG9fy1i8Z2Gdb5hyRYsPU`)

Те же статусы. Мобильные и десктопные строки не смешивать: `documentationLinks` ведёт в свой файл.

| Component | Page | Doc frame node-id | Dev-frame node-id | Status | Linked? |
|---|---|---|---|---|---|
| breadcrumbs | 🧩 breadcrumbs | — | — | ⬜ not started | — |
| primary-chip · autocheck-chip · chips-group | 🧩 chips (`8160:6203`) | — | — | ⬜ not started | — |
| color-picker | 🧩 color-picker | — | — | ⏸ отложено: сейчас только блок-указатель на Mobile; полную доку возможно сделаем позже | — |
| dropdown-input · menu-item · menu-category-item · range-dropdown-input · dropdown-menu (default/no-results/loading) · on-container-dropdown-button | 🧩 dropdowns | — | — | ⬜ not started | — |
| empty-state | 🧩 empty-state | — | — | ⬜ not started | — |
| text-input · text-area-input · range-input | 🧩 input-fields | — | — | ⬜ not started | — |
| brand-link | 🧩 links | — | — | ⬜ not started | — |
| modal · modal-with-overlay · status-modal · overlay · select-city-modal | 🧩 modals | — | — | ⬜ not started | — |
| OTP-input | 🧩 OTP-input | — | — | ⬜ not started | ⚠️ ссылка ведёт в MOBILE (`4699-3824`) — заменить на десктопную при финализации |
| pagination-panel | 🧩 pagination | — | — | ⬜ not started | — |
| progress-bar · segmented-progress-bar | 🧩 progress-indicators | — | — | ⬜ not started | — |
| search-input | 🧩 search-input | 8442:722 | — (не нужен) | ✅ finalized | ✅ |
| text-segmented-control · icon-segmented-control | 🧩 segmented-controls | — | — | ⬜ not started | — |
| scrollbar-vertical · scrollbar-horizontal | 🧩 scrollbars | — | — | ⬜ not started | — |
