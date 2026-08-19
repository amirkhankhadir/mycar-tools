# Desktop delta — надстройка для Mўlo Desktop Library

> **File roles (one fact, one home):** этот файл = **только переопределения для Desktop**. Методология
> (что/зачем/когда документировать, набор секций, тон, lifecycle) остаётся в `methodology.md`;
> исполнение (хаус-стайл, карты ключей, сниппеты, §0 QA, гоча) — в `doc-kit.md`;
> fileKeys и реестры — в `library-index.md`. Здесь **не повторять** правила, которые не меняются:
> если пункта нет ниже — он действует в мобильной формулировке.
>
> **Когда читать:** при работе в файле `dzG9fy1i8Z2Gdb5hyRYsPU` — вместе со SKILL.md и обоими
> референсами, до первого `use_figma` на запись.

## D1. Файл, токены, финализация

- Целевой файл: **Mўlo Desktop Components Library**, fileKey `dzG9fy1i8Z2Gdb5hyRYsPU`.
- ⛔ **Finalize-сниппет `doc-kit` §6 содержит мобильный fileKey в URL.** В Desktop подставлять
  `dzG9fy1i8Z2Gdb5hyRYsPU`, иначе `documentationLinks` живого Desktop-компонента уедет на мобильный
  файл. Это **единственная** ошибка из всей дельты, которую не видно на скриншоте — read-back ссылки
  после установки обязателен.
- Токены и текст-стили — **те же**, Desktop подписан на те же Core Variables и Text Styles.
  Карты ключей `doc-kit` §2–§3 применимы без изменений, свой набор ключей заводить не нужно.
- ⛔ **Только по ключам, `importVariableByKeyAsync` / `importStyleByKeyAsync`.** Проверено 19.08.2026
  на этом файле: старые хардкод-ID вида `VariableID:<key>/6026:xxx` в Desktop **резолвятся успешно**,
  но ведут на другую импортированную копию, не на актуальную. По ключу те же токены приходят
  в `brand-theme-semantics` с 4 модами (`mycar-light/dark`, `finance-light/dark`) и другими local-id
  (`text/neutral/primary` → `8215:802`, `bg-surface/neutral/base-container` → `8215:768`,
  `stroke/focus-ring` → `8215:725`). Спейсинги совпали (`display-semantics` не переиздавался) — именно
  поэтому баг тихий: половина привязок выглядит правильной. Пункт §0 «все цветовые привязки ведут
  в коллекцию с 4 модами» на Desktop проверять особенно строго.

## D2. Превью: телефона нет, карточки шире

- ⛔ **Отменяется правило `doc-kit` §6a «composition / real example → внутрь телефонного фрейма ~360»**
  вместе с рецептом сборки телефона со status-bar `9:41`. На Desktop телефонная рамка не строится.
- Контекстный пример = **фрагмент десктопной поверхности**: auto-layout, ширина по содержимому
  до 736, фон `bg-surface/neutral/base`, радиус `corner-radius/lg`, `clipsContent: true`,
  паддинг `space-4`. Без имитации окна браузера и без фейковой шапки.
- **Ширина карточек инвертируется относительно мобильной доки:** по умолчанию **full-width карточка**
  для любого превью компонента. Ряд 2×360 остаётся для текстовых карточек и для Do/Don't мелких
  атомов (chip, scrollbar, link). Причина: `dropdown-input`, `text-input`, модалки
  и `segmented-control` в 360 не помещаются и клипаются, а §0 клиппинг запрещает.
- Правило «равновысокие сравнительные карточки» (§0) не меняется и на full-width парах тоже.

## D3. Состояния: hover первичен — но только там, где он есть

- В **States** порядок изложения для Desktop: `rest → hover → pressed / focused → disabled`.
  Hover — главное состояние, а не приписка.
- ⛔ **Verify-don't-invent строже обычного.** Перед написанием прочитать `variantGroupProperties`
  набора. Оси `state` нет — так и писать: «интерактивных состояний компонент не несёт, их отрабатывает
  родитель». Hover компоненту без hover не дорисовывать, даже если в вебе он очевидно будет.
- Реальный разрыв библиотеки проговаривать честно: у **чипов и menu-item** есть `pressed`, но нет
  `focused`; у **полей ввода и dropdown** — наоборот. Это состояние библиотеки, не дефект доки.
  Выглядит как пробел в компоненте — флагать дизайнеру, компонент не трогать.
- Демо-фокус рисуется тем же токеном `stroke/focus-ring`.

## D4. Чипы взаимодействия: курсор и клавиатура вместо тача

- ⛔ Отменяется «touch первичен (tap / long-press / swipe), клавиатура дополнением»
  (`doc-kit` §1, methodology → Keyboard/touch illustrations).
- На Desktop первично **указательное + клавиатура**. Глифы: `⇥ Tab`, `↵ Enter`, `␣ Space`, `Esc`,
  `↑ ↓` (навигация по меню), `click`, `hover`, `right-click` — где применимо.
- Указывать **тип курсора**, если он не дефолтный (`pointer`, `text`, `col-resize`): на Desktop это
  часть аффорданса и в Dev Mode не видно.
- Чипы `tap` / `long-press` / `swipe` на Desktop не используются.

## D5. Секция 10 — «Ресайз и ширина» вместо «Responsive»

- ⛔ Убрать `safe-area`, `orientation`, «mobile-first».
- Покрывать: ось `width: auto / custom` (есть у `on-container-dropdown-button`,
  `text-segmented-control`, `icon-segmented-control`), min/max-ширину, поведение длинной русской
  строки (перенос / усечение / растяжение), поведение при ресайзе окна, появление скролла.
- Счётные оси (`#-of-pages` у breadcrumbs, `#-of-buttons` у segmented-control) описывать здесь же:
  до скольких элементов набор рассчитан и что делать за пределом.

## D6. Секция 9 Accessibility — другой набор

- ⛔ Убрать `touch-target`, VoiceOver / TalkBack.
- Покрывать: порядок обхода Tab, видимость focus-visible, роль и доступное имя, поведение Esc
  для оверлеев, скринридеры NVDA / JAWS.
- Объём прежний — **кратко**, не полный WCAG-аудит.

## D7. Платформенная развилка — зеркало мобильного правила

Развилка и обе её ветки описаны в `methodology.md` → «Разные компоненты на разных платформах»;
рецепт блока-указателя — в `doc-kit.md` §1. Здесь только десктопная сторона зеркала.

- ⛔ **Определять фактом, не памятью:** открыть `figma.root.children` Mobile-библиотеки
  (`UGCOeKehvfoEkWtbXr4Mav`) и посмотреть, есть ли там страница этого компонента.
- **Страницы в Mobile нет** → компонент десктопный собственный. Ни секции «Поведение по платформам»,
  ни блока-указателя.
- **Страница в Mobile есть** → это, как правило, **самостоятельные компоненты в разных файлах** →
  **блок-указатель** на Mobile-библиотеку, последней содержательной секцией перед Do & Don't.
  Eyebrow `<COMPONENT> НА МОБИЛКЕ`, subtitle «Там другие компоненты — не переносите макет как есть»,
  ссылка на страницу Mobile по её node-id. Секцию «Поведение по платформам» в этом случае
  **НЕ пишем** — она утверждала бы, что компонент один.
- **Секция «Поведение по платформам» — только если компонент буквально общий** (в другом файле
  своей страницы нет, а компонент переиспользуется). На Desktop это редкий случай; прежде чем писать
  секцию, подтвердить у дизайнера.
- ⛔ **Не оба сразу** — либо секция, либо указатель.

**Сверка страниц на 19.08.2026** (Desktop → есть ли одноимённая страница в Mobile). Отправная точка;
если страница с тех пор появилась или исчезла — верна проверка, а не таблица.

| Desktop-страница | Страница в Mobile | Что ставим |
|---|---|---|
| chips · color-picker · input-fields · modals · OTP-input · progress-indicators · search-input | есть | блок-указатель |
| breadcrumbs · dropdowns · links · pagination · scrollbars | нет | ничего |
| empty-state · segmented-controls | одноимённой нет, но есть близкие по смыслу (`page-states`, `tabs`) | проверить по компонентам, не по имени страницы |

## D8. Проверенные оси Desktop-компонентов

Снято с файла 19.08.2026. Отправная точка, а не замена проверке — перед финализацией перечитывать
`variantGroupProperties` компонента.

| Компонент | Оси |
|---|---|
| breadcrumbs | `#-of-pages: 2–5, #-of-items5, #-of-items6` — ⚠️ значения считают РАЗНОЕ: 2–5 = все элементы вместе с текущей страницей, `#-of-items5/6` = только кликабельные ссылки. Приватные части: `.breadcrumbs/page-item` `8049:539`, `/current-page-item` `8011:13944`, `/divider-item` `8049:526`. Узла `.breadcrumb-separator 8011:12656` больше НЕТ |
| primary-chip | `style: on-container/outline` · `size: md/sm/xs` · `is-selected` · `state: rest/hover/pressed/disabled` |
| specialty/autocheck-chip | `size: md/sm` · `is-selected` · `state: rest/hover/pressed/disabled` |
| chips-group | `type: on-container/outline` |
| dropdown-input | `combobox` · `size: lg/md` · `state: rest/hover/focused/disabled` · `filled` · `error` · `menu-position: collapsed/below-default/above` |
| menu-item | `is-selected` · `state: rest/hover/pressed/disabled` |
| on-container-dropdown-button | `width: auto/custom` |
| text-input | `style: on-container/on-base` · `size: lg/md` · `state: rest/hover/focused/disabled` · `filled` · `error` |
| text-area-input | то же, `size: lg` только |
| brand-link | `type: standalone/inline` — состояний нет |
| modal-with-overlay | `full-height` |
| specialty/select-city-modal | `state: default/filtered/search-loading/search/search-no-results` |
| OTP-input | `type: on-container/on-base` · `filled` · `disabled` — hover нет |
| progress-bar, segmented-progress-bar | `with-label` |
| search-input | `style` · `size: lg/md` · `state: rest/hover/focused` — disabled нет |
| text-segmented-control, icon-segmented-control | `size: lg/md` · `width: auto/custom` · `#-of-buttons: 2–5` |
| scrollbar-vertical / horizontal | `position` |

## D8a. Справка по задокументированным Desktop-компонентам

### search-input — SET `8378:1067` на странице `🧩 search-input` (`8245:1218`) · **DOC finalized `8442:722`**, linked ✅
- 24 варианта: `style` (on-container/on-base) × `size` (lg/md) × `state` (rest/hover/focused) × `filled`.
- **verified:** состояний `disabled` и `error` НЕТ (в отличие от `text-input`) — не дорисовывать.
  Кнопка очистки `.input-button` существует только при `filled=true`. Хинт — инстанс `.input-hint-text`,
  скрыт по умолчанию (`show-hint`), дефолтный текст английский «Hint text» — заменять на русский.
  `placeholder` и `value` — два отдельных TEXT-свойства. Оси ширины нет.
- анатомия: иконка поиска (обязательно) · плейсхолдер/значение (обязательно) · кнопка очистки (при
  filled) · подсказка (опционально).

### ⛔ Стенд подбирается под `style`, иначе превью растворяется
`on-container` на сером `bg-surface/neutral/base` — это серое на сером, поле исчезает целиком
(поймано на search-input). Правило: во всех обычных секциях ставь `on-base` на серый стенд;
в секции «Типы», где смысл именно в поверхности, крась стенд под каждый тип — `on-base` на
`bg-surface/neutral/base`, `on-container` на `bg-surface/neutral/base-container`.

### ⛔ Эмодзи в тексте доки не рендерятся
🧩 и подобные в Inter Display дают пустое место. В блоке-указателе и везде в тексте писать имя
страницы словами, без эмодзи (ср. тофу-гоча про `␣` в `doc-kit` §6a).

## D8b. Фокус в Desktop-компонентах (добавлен 19.08.2026)

Ранее фокуса не было ни в одном интерактивном Desktop-компоненте. Добавлен по мобильному паттерну
в 9 наборов / 108 вариантов: pagination (page-button, jump-button), chips (primary, autocheck),
segmented-controls (4 набора кнопок), breadcrumbs (page-item).

**Паттерн — копия мобильных кнопок, не изобретать свой:**
- булево свойство `is-focused`, по умолчанию выключено
- слой `focus-ring` первым ребёнком, `visible=false`, ссылка `componentPropertyReferences = {visible: <propId>}`
- обводка на токене `stroke/focus-ring`, вес 1, `strokeAlign='OUTSIDE'`
- габарит = компонент + 4, позиция `x=-2, y=-2`, радиус = радиус компонента + 2
- `layoutPositioning='ABSOLUTE'` и ⛔ **`constraints = {horizontal:'STRETCH', vertical:'STRETCH'}`** —
  без этого кольцо не тянется за компонентом, который хагает содержимое
- ⛔ у компонента нужно снять `clipsContent`, иначе внешнее кольцо срезается клипом

⚠️ **Исключение — `brand-link`:** его кольцо раздуто только по горизонтали (x=-2, высота равна высоте
компонента). Это не ошибка сборки, а особенность текстовой ссылки — при копировании паттерна
на текстовые элементы проверяй, не выглядит ли равномерное раздутие хуже.

В доках фокус описывается как свойство, независимое от оси `state`: оно может совпасть с любым состоянием.

## D9. Что НЕ меняется — явным списком

Фрейм 800 / колонка 736 / гэп 16; шапка, дивайдер, карточка, pill, chip, рецепт анатомии; привязка
токенов и текст-стилей по ключам; «каждое поведение — с визуальным примером»; реалистичный контент
вместо «Label»; instance-swap осмысленных иконок; ошибочный образец только в Do & Don't; Do/Don't
парами в конце; запрет статус-бейджей; DEV NOTES отдельным фреймом; строить **справа**
и **на странице компонента**; §0 QA-чеклист перед каждым скриншотом; RU-типографика перед
финализацией; компонент не мутировать, старую доку не трогать.
