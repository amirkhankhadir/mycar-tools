# mycar-tools — инструменты Mycar Design для Claude Code

Публичный маркетплейс плагинов Claude Code для команды Mycar Design. Подключается по ссылке одной
командой; каждый инструмент ставится отдельно и обновляется через маркетплейс. Всё — Markdown по
спецификации Agent Skills, без кода, серверов и API-ключей; работает на местах Claude Max.

## Инструменты

### 🖊 `mycar-copy` — интерфейсные тексты (RU)
Проверка, генерация и улучшение UI-текстов по гайду **Mycar UX Content**. Три режима: аудит /
генерация / улучшение; работает «на рельсах» правил. Команда — `/mycar-copy`.
Подробно для пользователей → `how-to-use.md`. Есть и витрина для Figma (`figma/mycar-copy.md`,
публикуется в Figma-агент отдельно).

### 📐 `mylo-docs` — документация компонентов Figma
Строит **doc-фреймы для дизайнеров** в Mўlo Mobile Library (Figma-only, без кода): по компоненту —
структура, состояния, токены, контент-гайдлайны, с house-style и §0 QA-чеклистом. Команда —
`/mylo-docs` (или «Mylo: документируем <компонент> <ссылка>»).

## Как подключить (один раз)

```
/plugin marketplace add amirkhankhadir/mycar-tools
```
Дальше поставить нужные инструменты:
```
/plugin install mycar-copy@mycar-tools
/plugin install mylo-docs@mycar-tools
```

## Как обновлять

Правишь файлы плагина → `git commit` + `git push` + бамп `version` в его `plugin.json`.
Коллеги: `/plugin marketplace update mycar-tools` (или авто-обновление). Правка без пуша живёт только
локально — у команды останется старая версия.

## Структура репозитория

```
.claude-plugin/marketplace.json        каталог (сюда ведёт ссылка)
plugins/
  mycar-copy/                          плагин: SKILL.md + правила (content-guide, date-time) внутри
  mylo-docs/                           плагин: SKILL.md + references (methodology, doc-kit, library-index)
figma/mycar-copy.md                    витрина mycar-copy для Figma (снимок)
how-to-use.md                          инструкция пользователям (mycar-copy)
HANDOFF.md                             заметки по размещению/раздаче
eval-corpus.md, screens-audit.md/.json тест-корпуса/регрессия mycar-copy (для сопровождающих)
open-questions.md                      журнал обкатки (внутреннее)
```

## Добавить ещё инструмент

Новый плагин: папка `plugins/<name>/` со своим `.claude-plugin/plugin.json` и `skills/<name>/` →
дописать запись в `.claude-plugin/marketplace.json` → push. Коллеги подключают маркетплейс один раз,
новые инструменты появляются в нём.
