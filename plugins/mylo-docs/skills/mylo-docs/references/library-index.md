# Mўlo libraries — индекс (fileKeys · гайды · реестры)

> Индекс для скилла `mylo-docs`: fileKeys библиотек, ссылки на референс-гайды и реестр
> документированных компонентов.
> ⚠️ **Реестр — «живой»:** при документировании нового компонента добавляется строка. Так как
> файл едет внутри плагина, обновление реестра = правка + `git push` + бамп версии (см. README
> «Как обновлять»). Позже реестр можно вынести во внешний источник.

## Files (Figma)

| Library | fileKey |
|---|---|
| Mўlo Shared Library (компоненты для обеих платформ; см. `shared-delta.md`) | `LxMK9OD6jvgPWPVg25EZAM` |
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

## Component registry — Shared (`LxMK9OD6jvgPWPVg25EZAM`) — ✅ БИБЛИОТЕКА ФИНАЛИЗИРОВАНА 20.08.2026

64 публичных компонента: у всех заполнено `description` с префиксом `[Shared]`, у всех живой `documentationLinks`, чипов CONCEPT нет, битых ссылок нет.

| Страница | Doc frame | Компоненты |
|---|---|---|
| 🧩 accordions | `13:11904` | accordion-item |
| 🧩 alerts | `13:15110` | inline-alert |
| 🧩 avatars | `4:8732` | avatar · avatar-profile-placeholder |
| 🧩 badges | `4:9770` | badges |
| 🧩 buttons | `4:3152` | 13 компонентов семейства |
| 🧩 checkbox | `4:4946` | checkbox-button-item · checkbox-button-block |
| 🧩 consent-text | `88:658` | consent-text |
| 🧩 file-upload | `46:2102` | file-upload-input · file-card · file-placeholder · media-placeholder |
| 🧩 headings | `134:9194` | heading |
| 🧩 icon-buttons | `4:6379` | 9 компонентов семейства |
| 🧩 loaders | `84:9888` | loading-spinner |
| 🧩 page-states | `13:17371` (empty-state) · `96:1802` (status + loading) | empty-state · status-state · loading-state |
| 🧩 progress-indicators | `46:7279` | progress-circle · segmented-progress-circle · progress-circle-with-label |
| 🧩 radio | `61:7968` | radio-button-item · radio-button-block |
| 🧩 skeleton | `84:9991` | skeleton-shimmer |
| 🧩 steppers | `46:7335` | stepper-vertical · stepper-vertical-sm · stepper-horizontal |
| 🧩 tags | `42:6127` | 13 тегов: 3 статусных · 5 нейтральных · 5 фирменных |
| 🧩 timeline | `68:835` | timeline-vertical |
| 🧩 tooltip | `54:1186` | tooltip |
| 🧩 toggle-switch | `63:850` | toggle-switch |

⚠️ `toast` **уехал в Mobile** 20.08.2026 (страница и дока целиком). Десктопный тост будут делать отдельно. При переезде компонента менять префикс в `description`.

⚠️ Пороги ожидания заданы ОДИН раз — в доке `loaders` `84:9888`, секция «КОГДА ЧТО ПОКАЗЫВАТЬ» `145:1143`. `skeleton` и `progress-indicators` на неё ссылаются, чисел не дублируют.

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
| breadcrumbs | 🧩 breadcrumbs | 8501:8415 | — | ✅ finalized | ✅ (старая дока 8054:4400 — удаляет дизайнер) |
| primary-chip · autocheck-chip · chips-group | 🧩 chips (`8160:6203`) | 8529:727 | — | ✅ finalized | ✅ |
| color-picker | 🧩 color-picker | — | — | ⏸ отложено: сейчас только блок-указатель на Mobile; полную доку возможно сделаем позже | — |
| dropdown-input · menu-item · menu-category-item · range-dropdown-input · dropdown-menu (default/no-results/loading) · on-container-dropdown-button | 🧩 dropdowns | — | — | ⬜ not started | — |
| empty-state | 🧩 page-states (страница переименована) | 8502:667 | — | ✅ finalized | ✅ |
| text-input · text-area-input · range-input | 🧩 input-fields | — | — | ⬜ not started | — |
| brand-link | 🧩 links | — | — | ⬜ not started | — |
| modal · modal-with-overlay · status-modal · overlay · select-city-modal | 🧩 modals | — | — | ⬜ not started | — |
| OTP-input | 🧩 OTP-input | 8528:1099 | — | ✅ finalized | ✅ (ссылка переведена с Mobile) |
| pagination-panel | 🧩 pagination | 8502:5319 | — | ✅ finalized | ✅ |
| progress-bar · segmented-progress-bar | 🧩 progress-indicators | — | — | ⬜ not started | — |
| search-input | 🧩 search-input | 8442:722 | — (не нужен) | ✅ finalized | ✅ |
| text-segmented-control · icon-segmented-control | 🧩 tabs (страница переименована) | 8529:6766 | — | ✅ finalized | ✅ |
| scrollbar-vertical · scrollbar-horizontal | 🧩 scrollbars | 8501:8405 | — | ✅ finalized | ✅ |
