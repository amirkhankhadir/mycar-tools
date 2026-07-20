# Mўlo Mobile Library — индекс (fileKeys · гайды · реестр)

> Индекс для скилла `mylo-docs`: fileKeys библиотек, ссылки на референс-гайды и реестр
> документированных компонентов.
> ⚠️ **Реестр — «живой»:** при документировании нового компонента добавляется строка. Так как
> файл едет внутри плагина, обновление реестра = правка + `git push` + бамп версии (см. README
> «Как обновлять»). Позже реестр можно вынести во внешний источник.

## Files (Figma)

| Library | fileKey |
|---|---|
| Mўlo Mobile Library (компоненты + доки — строим здесь) | `UGCOeKehvfoEkWtbXr4Mav` |
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

## Component registry

Status: `⬜ not started` · `🧩 concept` · `🚧 built (awaiting approval)` · `✅ finalized`

| Component | Page | Doc frame node-id | Dev-frame node-id | Status | Linked? |
|---|---|---|---|---|---|
| accordion-item | 🧩 accordions | 12017:1595 | 12097:771 | ✅ finalized | ✅ |
| inline-alert | 🧩 alerts | 12107:771 | — (не нужен) | ✅ finalized | ✅ |
| banner-alert | 🧩 alerts | 12164:916 | — (не нужен) | ✅ finalized | ✅ |
| avatar | 🧩 avatars | 12581:799 | 12604:1452 | ✅ finalized | ✅ |
| badges | 🧩 badges | 12608:1037 | 12629:1115 | ✅ finalized | ✅ |

> Добавляй строку при старте компонента; заполняй node-id по мере создания фреймов; меняй статус на
> approval; ставь **Linked?** ✅ после того как `documentationLinks` задан и прочитан обратно.
