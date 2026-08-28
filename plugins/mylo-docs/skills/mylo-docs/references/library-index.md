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

### ⚠️ Размерная сетка 2.0 (28.08.2026) — ось `size` переведена на числа

Правило и полная спецификация — в `doc-kit.md` §1a; технические грабли переименования — в §6a.
Затронуто 45 наборов в трёх библиотеках.

| Библиотека | Наборы | Было → стало |
|---|---|---|
| Shared | button ×12 | lg→56, md→44, sm→32 · **новые 48 и 40** |
| Shared | icon-button ×9 | xl→56, lg→44, md→32, sm→24 · **новые 48 и 40** |
| Shared | tag ×8 | md→32, sm→24 |
| Desktop | text-input, dropdown-input, date-picker-input | lg→56, md→48 |
| Desktop | text-area-input | lg→76 |
| Desktop | search-input | lg→56, md→48, sm→40 |
| Desktop | primary-chip, autocheck-chip | md→40, sm→32, xs→24 |
| Desktop | text-/icon-segmented-control | lg→40, md→32 |
| Desktop | `.on-container-dropdown-button`, `.on-base-dropdown-button` | md→40, sm→32 |
| Mobile | text-input, cvv-input, date-input | lg→56, md→48 |
| Mobile | primary-chip, inverse-chip | xl→56, lg→48, md→40, sm→32, xs→24 |
| Mobile | `.top-nav/square-button` | sm→32 |

Версии **всех переименованных семейств** подняты до **2.0.0** (46 наборов). Отчёт для разработчиков (с машиночитаемым
блоком) — фрейм `323:803` на отдельной странице `📖 release-notes` (`323:802`) в Shared.

Попутно исправлено: Mobile `primary-chip` и `inverse-chip` на высоте 40 имели радиус
`corner-radius/sm` вместо `md` — выровнено с десктопными чипсами. У `primary-button` удалены два
дублирующихся бейджа версии; в описаниях `on-container-button` / `on-base-button` литералы
`&amp;nbsp;` заменены на настоящие неразрывные пробелы.

Доки, переписанные под числа: Shared Buttons `4:3152`, Icon Buttons `4:6379`, Tags `42:6127`;
Desktop input-fields `8562:775`, dropdowns `8562:2978`, chips `8529:727`, tabs `8743:1546`,
search-input `8442:722`; Mobile Chips `15506:27876`.

⚠️ Публикация сделана дизайнером 28.08.2026 **до** финальной правки: `.on-base-dropdown-button`
был найден с буквенными размерами уже после паблиша и переименован — **Desktop нужен повторный
republish**. Shared и Mobile после паблиша получили только бейджи версий (аннотации на странице,
не компоненты) — им republish не нужен.

Финальный свип по всем трём библиотекам: буквенных значений `size` у контролов не осталось.
У `.top-nav/square-button` бейджа версии нет — поднимать нечего.

## Component registry — Shared (`LxMK9OD6jvgPWPVg25EZAM`) — ✅ БИБЛИОТЕКА ФИНАЛИЗИРОВАНА 20.08.2026

65 публичных компонентов: у всех заполнено `description` с префиксом `[Shared]`, у всех живой `documentationLinks`, чипов CONCEPT нет, битых ссылок нет.

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
| 🧩 links | `175:12723` | brand-link (ось `type [standalone\|inline]`) |
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

⚠️ `brand-link` **приехал из Desktop** 20.08.2026: ссылка на доку переставлена, литералы `&nbsp;` в описаниях приватных наборов заменены на настоящий U+00A0, добавлена секция «Ссылка или кнопка-ссылка» `191:1541` и указатель на неё из доки кнопок. Примеры многострочного переноса **склонированы из старой доки** `links-doc` — своими средствами перенос в Figma не воспроизводится.

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
| ~~buttons (семейство)~~ | — | — | — | ↗️ уехало в Shared: страница `🧩 buttons` (`3:1392`), дока `4:3152` | — |
| ~~icon-buttons (семейство)~~ | — | — | — | ↗️ уехало в Shared: страница `🧩 icon-buttons` (`4:5483`), дока `4:6379` | — |
| checkbox (item + block) | 🧩 checkbox | 15505:725 | — (не нужен) | ✅ finalized | ✅ |
| chips (primary · inverse · group · autocheck) | 🧩 chips | 15506:27876 | — (не нужен) | ✅ finalized | ✅ |
| description-lists (vertical + horizontal) | 🧩 description-lists | 15528:1534 | — (не нужен) | ✅ finalized | ✅ |

> Добавляй строку при старте компонента; заполняй node-id по мере создания фреймов; меняй статус на
> approval; ставь **Linked?** ✅ после того как `documentationLinks` задан и прочитан обратно.

## Component registry — Desktop (`dzG9fy1i8Z2Gdb5hyRYsPU`) — ✅ ГОТОВ К ПУБЛИКАЦИИ 20.08.2026

12 страниц, 30 публичных компонентов: описания с префиксом `[Desktop]`, статус «готов-к-разработке», ссылки на доки живые, чипов CONCEPT нет, битых инстансов нет, все привязки цвета в текущем поколении.
⚠️ Единственное исключение: `color-picker` без доки — по решению пользователя её не пишем, на странице только указатель на Mobile.
⚠️ `brand-link` (страница `🧩 links`) **уехал в Shared** 20.08.2026.
⚠️ 28.08.2026 на страницу `🧩 dropdowns` добавлен `on-base-dropdown-button` (дубликат on-container, перекрашен на `bg/on-base/*`); дока и описания обновлены, раздел «Компактные кнопки» теперь про пару.
⚠️ С 28.08.2026 в файле появились ещё две страницы, которых нет в таблице ниже: `🧩 date-picker` (`8762:6426`) — не документирована, и `🧩 filters` (`8792:30735`) — документирована.


Те же статусы. Мобильные и десктопные строки не смешивать: `documentationLinks` ведёт в свой файл.

| Component | Page | Doc frame node-id | Dev-frame node-id | Status | Linked? |
|---|---|---|---|---|---|
| breadcrumbs | 🧩 breadcrumbs | 8501:8415 | — | ✅ finalized | ✅ (старая дока 8054:4400 — удаляет дизайнер) |
| primary-chip · autocheck-chip · chips-group | 🧩 chips (`8160:6203`) | 8529:727 | — | ✅ finalized | ✅ |
| color-picker | 🧩 color-picker | — | — | ⏸ отложено: сейчас только блок-указатель на Mobile; полную доку возможно сделаем позже | — |
| dropdowns (9 публичных) | 🧩 dropdowns | 8562:2978 | — | ✅ finalized | ✅ |
| empty-state | 🧩 page-states (страница переименована) | 8502:667 | — | ✅ finalized | ✅ |
| text-input · text-area-input · range-input | 🧩 input-fields | 8562:775 | — | ✅ finalized | ✅ |
| ~~brand-link~~ | — | — | — | ↗️ уехал в Shared | — |
| modal · modal-with-overlay · status-modal · overlay | 🧩 modals | 8562:7906 | — | ✅ finalized | ✅ |
| specialty/select-city-modal | 🧩 modals | 8672:2509 (отдельная дока семейства) | — | ✅ finalized | ✅ |
| OTP-input | 🧩 OTP-input | 8528:1099 | — | ✅ finalized | ✅ (ссылка переведена с Mobile) |
| pagination-panel | 🧩 pagination | 8502:5319 | — | ✅ finalized | ✅ |
| progress-bar · segmented-progress-bar | 🧩 progress-indicators | 8562:7911 | — | ✅ finalized | ✅ |
| search-input | 🧩 search-input | 8442:722 | — (не нужен) | ✅ finalized | ✅ |
| tabbar · text-segmented-control · icon-segmented-control | 🧩 tabs (`8012:7247`) | 8743:1546 — семейная дока на оба компонента | — | ✅ finalized 27.08.2026 | ✅ все три ведут на семейную доку; старая 8529:6766 удалена дизайнером |
| scrollbar-vertical · scrollbar-horizontal | 🧩 scrollbars | 8501:8405 | — | ✅ finalized | ✅ |
| filters-panel · filter-button · filter-dropdown-menu/default · /no-results · /loading | 🧩 filters (`8792:30735`) | 8812:1096 — семейная дока на все пять | — | ✅ finalized 28.08.2026 | ✅ все пять ведут на семейную доку; старой доки на странице не было |
