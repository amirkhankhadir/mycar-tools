# Desktop delta — надстройка для Mўlo Desktop Library

> **File roles (one fact, one home):** этот файл = **только переопределения для Desktop**. Методология
> (что/зачем/когда документировать, набор секций, тон, lifecycle) остаётся в `methodology.md`;
> исполнение (хаус-стайл, карты ключей, сниппеты, §0 QA, гоча) — в `doc-kit.md`;
> fileKeys и реестры — в `library-index.md`. Здесь **не повторять** правила, которые не меняются:
> если пункта нет ниже — он действует в мобильной формулировке.
>
> **Когда читать:** при работе в файле `dzG9fy1i8Z2Gdb5hyRYsPU` — вместе со SKILL.md и обоими
> референсами, до первого `use_figma` на запись.

### Уточнение D7 (20.08.2026): указатель нужен и когда аналог назван иначе

Правило «страницы в Mobile нет → блок-указатель не ставим» имело в виду случай, когда мобильного аналога не существует вовсе. Но бывает третий случай: **аналог есть, только называется по-другому и лежит на другой странице.** Пример — десктопные `dropdowns`: страницы с таким именем в Mobile нет, а функцию выбора там закрывают `select-list-item` на `🧩 list-items` и `wheel-picker`.

В таком случае указатель СТАВИМ: он предупреждает, что мобильный аналог — другой компонент, и не даёт перенести десктопный макет как есть. Это ровно то, ради чего правило и написано.

Не ставим указатель только тогда, когда аналога нет ни под каким именем — и это надо проверить поиском по компонентам, а не по именам страниц.

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
| on-container-dropdown-button · **on-base-dropdown-button** | `width: auto/custom` у публичной обёртки. Вся визуальная работа — в приватных наборах `.on-container-dropdown-button` `8146:6479` / `.on-base-dropdown-button` `8836:56668`: `size: md/sm` · `state: rest/hover/pressed/disabled/loading/selected` · `menu: none/bottom-left-default/bottom-right/top-left/top-right` + `is-focused`, `show-leading-icon`, `leading-icon`, `label#3446:617`. 18 вариантов; `selected` = открытое меню |
| text-input | `style: on-container/on-base` · `size: lg/md` · `state: rest/hover/focused/disabled` · `filled` · `error` |
| text-area-input | то же, `size: lg` только |
| brand-link | `type: standalone/inline` — на публичном компоненте больше ничего. ⚠️ **Состояния есть**, но на вынесенном вложенном инстансе `link`: `size` md/sm/xs, `state` rest/hover/pressed/disabled, `is-focused`, у inline ещё `is-visited`. Набора `.old-reference 8050:963` в файле НЕТ |
| modal-with-overlay | `full-height` |
| specialty/select-city-modal | `state: default/filtered/search-loading/search/search-no-results` |
| OTP-input | `type: on-container/on-base` · `filled` · `disabled` — hover нет |
| progress-bar, segmented-progress-bar | `with-label` |
| search-input | `style` · `size: lg/md` · `state: rest/hover/focused` — disabled нет |
| text-segmented-control, icon-segmented-control | `size: lg/md` · `width: auto/custom` · `#-of-buttons: 2–5` |
| tabbar (слотовый) | у публичного компонента осей НЕТ — только слот `tabs-slot` (minChildren 2, allowPreferredValuesOnly, дефолт — 3 вкладки). Оси у приватного `.tabbar-item`: `state: rest/hover/disabled` (⚠️ `pressed` нет) · `is-selected` (⚠️ пар «hover + True» и «disabled + True» нет) · `is-focused` · `tab-title` · `show-leading-icon` + swap · `show-badge`. Линия под рядом — обводка на слоте, выключателя нет |
| scrollbar-vertical / horizontal | `position` |
| filter-button | `is-multi-select` · `is-quick-filter` · `state: rest/hover/pressed/selected` · `is-applied` + булев `is-focused`, TEXT `label#8811:0`, INSTANCE_SWAP `menu-type#8810:179`. 22 варианта: у быстрого фильтра НЕТ `selected`, пары «мульти + быстрый» тоже нет, `disabled` не существует. ⚠️ `pressed` и `selected` залиты одним `bg/on-container/pressed` — различает только присутствие меню |
| filters-panel | осей НЕТ — только слот `filters-slot` (HORIZONTAL, **`layoutWrap: WRAP`**, гэп 12, `allowPreferredValuesOnly: false`, preferred = filter-button + search-input). Дефолт слота: search-input 300 + 2 кнопки + быстрый фильтр |
| date-picker-input | `range-picker` · `size: 56/48` · `state: rest/hover/focused/disabled` · `filled` · `error` · `menu-position: collapsed/below-default/above/**external**` + булевы `show-label#8863:205` (def true), `show-hint#84:26`, `is-clearable#8119:19`, TEXT `label#3657:35` / `value#3657:109` / `range-label#8765:23` / `range-value#8765:96`. 88 вариантов |
| .dropdown-menu/calendar (приватный) | свойств-осей нет: BOOL `show-week-6#187:1` (def true) + TEXT `month-title#8765:22`. Габарит 280×336 |
| .dropdown-menu/calendar/day (приватный) | `state: rest/hover/disabled` · `is-selected` · `is-today` · `range-state: none/start/middle/end` · `is-outside-month` + булев `is-focused#8765:6`. 16 вариантов |
| filter-menu/default | `show-search` (def true) · `show-scrollbar` (def false) · `show-button` (def true, гасит сразу `button-spacer` и `button-container`) · слот `list-slot` (`allowPreferredValuesOnly: true`, только `dropdown-menu-items/base` и `/category`) |
| filter-menu/no-results · /loading | свойств НЕТ вовсе; 300×112, поиск `filled=true, focused`, текст «Ничего не найдено» / «Загрузка…» |

## D8a. Справка по задокументированным Desktop-компонентам

### date-picker-input — SET `8762:6427` на странице `🧩 date-picker` (`8762:6426`) · **DOC finalized `8874:7199`**, linked ✅
- Дока построена как **дельта к MUI**, а не как полный набор секций: карточка «Поведение взято у MUI X» со ссылкой + секция «Отличия от MUI» из шести пунктов, дальше только наше (размеры, состояния, встраивание, тексты, доступность). Разбор строки, min/max, недоступные дни и локаль намеренно НЕ переписаны — на них ссылка. Приём годится любому компоненту, у которого есть внешний первоисточник.
- **verified 28.08.2026:** кнопки-триггера нет, иконка календаря декоративная; одна месячная сетка и для одной даты, и для периода; заголовок календаря не кликается (views только day); дни соседних месяцев скрыты; шесть строк недель всегда; отступ поле↔календарь 4; календарь всегда 280 и прижат влево (`calX=0`, `counterAxisAlignItems=MIN`) независимо от ширины поля; у поля оси ширины нет, мастер 361.
- ⚠️ **`show-label` разведён не во всех вариантах:** 68 из 88. В 20 вариантах (`filled=false` + `rest`/`hover`/`disabled`) у слоя `label` нет ссылки `visible`, и подпись остаётся видимой — в пустом покое она работает плейсхолдером. Похоже на осознанный выбор, дизайнеру озвучено. Следствие для доки: пример «выключили подпись» строить на `filled=true`, иначе свойство молча не сработает.
- ⚠️ **`is-clearable=true` добавляет крестик РЯДОМ с иконкой календаря**, а не вместо неё: `clear-button-container` (HORIZONTAL, `clipsContent=false`) расширяется с 24 до 64. Проверено временным инстансом.
- **Разделитель периода исправлен 28.08.2026:** было длинное тире с обычными пробелами (`03.08.2026 — 13.08.2026`), стало среднее `–` (U+2013) с узкими неразрывными пробелами (U+202F) — по `TYP-02`/`NUM-04`/`DT-16` гайда mycar-copy. Правились дефолт `range-value#8765:96` через `editComponentProperty` и 12 текстовых слоёв `placeholder`/`text-value` в вариантах `range-picker=true`. U+202F в Inter Display рендерится нормально, тофу нет. В `filter-menu/date` строка наследуется — своих копий там не оказалось.
- Поле — floating label: в покое и пустое подпись стоит по центру вместо значения (`label-container` 20), в фокусе и заполненном — уезжает наверх, под ней маска `ДД.ММ.ГГГГ` или значение (`label-container` 40). Маска — не свойство.
- Подсказка и ошибка — вложенные инстансы `.input-hint-text` / `.input-error-text` со своими TEXT-свойствами (`hint-text#3657:34`, `error-text#3657:32`), дефолты английские «Hint text» / «Error text».
- Заливки: `bg/on-container/*` — значит стенд под превью белый `bg-surface/neutral/base-container` + обводка (серое на сером иначе).
- **Правка компонента по согласованию (28.08.2026):** 16 вариантов `state=focused, menu-position=collapsed` переименованы в `menu-position=external` — служебное значение для встраивания, когда календарь рисует контейнер (`filter-menu/date`). Комбинации «в фокусе и без календаря» в наборе больше нет. После правки библиотеку надо переопубликовать.


### search-input — SET `8378:1067` на странице `🧩 search-input` (`8245:1218`) · **DOC finalized `8442:722`**, linked ✅
- 24 варианта: `style` (on-container/on-base) × `size` (lg/md) × `state` (rest/hover/focused) × `filled`.
- **verified:** состояний `disabled` и `error` НЕТ (в отличие от `text-input`) — не дорисовывать.
  Кнопка очистки `.input-button` существует только при `filled=true`. Хинт — инстанс `.input-hint-text`,
  скрыт по умолчанию (`show-hint`), дефолтный текст английский «Hint text» — заменять на русский.
  `placeholder` и `value` — два отдельных TEXT-свойства. Оси ширины нет.
- анатомия: иконка поиска (обязательно) · плейсхолдер/значение (обязательно) · кнопка очистки (при
  filled) · подсказка (опционально).

### tabs (семейство) — страница `🧩 tabs` (`8012:7247`) · дока **finalized `8743:1546`** (семейная, на оба компонента), linked ✅
- **Два публичных компонента:** `tabbar` COMPONENT `8738:2473` (слотовый, не сет) + `text-segmented-control` / `icon-segmented-control`.
  Приватная вкладка — `.tabbar-item` SET `8723:2117` (4 варианта).
- **verified 27.08.2026:** высота 40 (`sizing/size-10`), паддинги 16 (`spacing/space-4`), верхние радиусы `corner-radius/xs`,
  подпись `action/md-medium`, индикатор — нижняя обводка 2 (`stroke/neutral/strong`), линия под рядом — обводка на слоте
  (`stroke/neutral/secondary` + `border/width/sm`). Счётчик — инстанс **Shared** `badges` → `.number-badge`
  (ключи `dbda6cf858961e3b886efd58e9b4a8424275f09a` / `825bf132a86a2f30d5d7d646198ef61fb2482120`; НЕ мобильные — у мобильного
  `.number-badge` ключ `7a69157f77e9c16203806e03d28e666cf91f94bc`). У активной вкладки счётчик брендовый, у остальных нейтральный.
- **verified поведение ширины:** у корня ширина фиксированная — при вставке вкладки в слот бар НЕ расширяется, хвост уходит
  за край, пока бар не растянут вручную. Вкладки хагают подписи и прижаты влево, линия идёт по всей ширине бара.
- ⚠️ **расхождение с семейством, озвучено дизайнеру:** наведение залито `bg-surface/neutral/pressed-overlay`, тогда как
  сегмент-контролы используют `bg/on-base/hover` для наведения, а `pressed-overlay` — для нажатия.
- **Старая дока сегмент-контролов `8529:6766` удалена дизайнером 27.08.2026**; её содержание целиком перенесено в семейную доку
  **клонированием** фрейма (не переписыванием) — приём дешевле и без потерь, когда новая дока поглощает финализированную.
  Eyebrow'ы клонированных секций переименованы в «… ПЕРЕКЛЮЧАТЕЛЯ», чтобы не путались с семейным «два компонента».

### filters (семейство) — страница `🧩 filters` (`8792:30735`) · дока **finalized `8812:1096`** (семейная, на все пять), linked ✅
- **Пять публичных компонентов:** `filters-panel` COMPONENT `8800:53651` · `filter-button` SET `8792:50407` · `filter-dropdown-menu/default` COMPONENT `8792:46839` · `/no-results` `8810:54011` · `/loading` `8810:54012`. Старой доки на странице не было — переносить было нечего.
- **verified 28.08.2026:** `state=selected` — это РАСКРЫТОЕ МЕНЮ: инстанс меню вшит в вариант, `layoutPositioning='ABSOLUTE'`, `x=0, y=44`, приходит с `show-button=false`, сам вариант с `clipsContent=false`. Свап меню сделан ссылкой `componentPropertyReferences.mainComponent → menu-type`.
- **verified:** `is-applied=true` меняет заливку на `bg/accent/blue/tint/rest` + `stroke/brand` и заменяет шеврон парой «`badges` (number, sm, brand) + `click-target-container` 24×24 с `general/Close`»; правый паддинг падает с `space-3` до `space-2`. Габарит 40, радиус `corner-radius/md`, обводка 2 `stroke/neutral/primary`, подпись `action/md-medium`.
- ⚠️ **Разница одиночного и мульти-выбора видна ТОЛЬКО внутри меню:** у одиночного строки идут с `show-checkmark=true`, у мульти — `show-selector=true`. Сама кнопка в покое идентична, дефолт счётчика 1 против 3. В доке это проговаривать явно, иначе по макету панели тип не угадать.
- **Правила дизайнера (28.08.2026):** крестик применённого фильтра при наведении показывает подсказку «Очистить фильтр» (компонент `tooltip` из Shared) — обязательно в доке. Кнопка «Очистить фильтр» ВНУТРИ меню стоит только пока выбран хотя бы один вариант; очищать нечего — кнопки нет. Состояние `disabled` кнопке не нужно (кейса нет).
- **Правки компонента по согласованию:** `is-milti-select` → `is-multi-select` (`editComponentProperty` на SET) и вывод подписи наружу свойством `label#8811:0`. Дефолты остались английские («Filter» у кнопки, «Option» у строк меню) — дизайнер сознательно ограничил правку.
- ⛔ **Мобильная страница `🧩 filters` тоже существует** (`4142:23916`), и там ТОЖЕ есть компонент с именем `filters-panel` — но это другой компонент (393×56, иконочные кнопки + ряд чипсов). Ставим блок-указатель, а совпадение имён в нём проговариваем отдельно. Указатель в мобильной доке `15657:31486` при этом устарел («страницы filters на десктопе нет») — поправлен 28.08.2026 в обе стороны.

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
