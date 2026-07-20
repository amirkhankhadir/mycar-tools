# Тест-корпус для AUDIT (золотой набор)

> Экзамен с ответами для плагина. Это реальные дефекты, найденные вручную во флоу «Регистрация авто»
> (`2048:8416`) и «Предодобрение» (`2048:20745`). Когда плагин готов — прогнать AUDIT по этим экранам
> и сверить с ожиданиями ниже.
>
> **Как мерить:**
> - **Recall (полнота)** = сколько из ожидаемых находок плагин поймал / всего ожидаемых. Цель ≥ 90% для `blocker`/`major`.
> - **Precision (точность)** = сколько находок плагина верны / всего выданных. Ложные срабатывания снижают точность.
> - `type: rule` — обязан поймать с верным `rule_id`. `type: heuristic` — достаточно пометить как `info`/«проверьте».
>
> Формат ожидаемой находки: `{node, rule_id, severity, type, quote → suggestion}`.

## Флоу 1 — Регистрация авто (`2048:8416`)

```json
[
  {"node":"2048:8439","rule_id":"LNG-01","severity":"blocker","type":"rule","quote":"Item title","suggestion":"настоящий текст пункта (не плейсхолдер)"},
  {"node":"2048:8439","rule_id":"LNG-03","severity":"minor","type":"rule","quote":"Выберите откуда хотите забрать госномер","suggestion":"Выберите, откуда хотите забрать госномер"},
  {"node":"2048:8679","rule_id":"LNG-01","severity":"blocker","type":"rule","quote":"Chip","suggestion":"настоящий лейбл чипа (не плейсхолдер)"},
  {"node":"2048:8508","rule_id":"LNG-03","severity":"major","type":"rule","quote":"в течении 30 мин","suggestion":"в течение 30 минут"},
  {"node":"2048:8508","rule_id":"LNG-03","severity":"major","type":"rule","quote":"Рассчет стоимости госпошлины","suggestion":"Расчёт стоимости госпошлины"},
  {"node":"2048:8508","rule_id":null,"severity":"info","type":"heuristic","quote":"Итого 227 000 ₸","suggestion":"проверьте: сумма строк = 218 000 + 4 000 + 1 000 = 223 000 ₸"},
  {"node":"2048:8458","rule_id":"LNG-03","severity":"major","type":"rule","quote":"Оплачиваете за оформление номера","suggestion":"Оплачиваете оформление номера"},
  {"node":"2048:8458","rule_id":"LNG-03","severity":"major","type":"rule","quote":"Онлайн регистрация авто","suggestion":"Онлайн-регистрация автомобиля"},
  {"node":"2048:8458","rule_id":"STL-02","severity":"minor","type":"rule","quote":"в удобном для вас … в удобное для вас","suggestion":"убрать повтор «для вас»"},
  {"node":"2048:8612","rule_id":"LNG-03","severity":"major","type":"rule","quote":"уведомлене","suggestion":"уведомление"},
  {"node":"2048:8612","rule_id":"LNG-03","severity":"major","type":"rule","quote":"прилежении","suggestion":"приложении"},
  {"node":"2048:8612","rule_id":"TXT-02","severity":"major","type":"rule","quote":"Заявка принята госорганом ожидайте уведомления","suggestion":"Заявка принята госорганом. Ожидайте уведомления"},
  {"node":"2048:8426","rule_id":"LNG-03","severity":"major","type":"rule","quote":"Онлайн регистрация авто не доступна","suggestion":"Онлайн-регистрация автомобиля недоступна"},
  {"node":"2048:8588","rule_id":"LNG-03","severity":"minor","type":"rule","quote":"видео-проверка","suggestion":"видеопроверка"},
  {"node":"2048:8588","rule_id":"STL-02","severity":"minor","type":"rule","quote":"смотрите ровно … располагайтесь ровно","suggestion":"убрать повтор «ровно»"},
  {"node":"2048:8474","rule_id":"TYP-02","severity":"minor","type":"rule","quote":"Задний знак – квадратный","suggestion":"Задний знак — квадратный (длинное тире)"},
  {"node":"2048:8562","rule_id":"NUM-03","severity":"major","type":"rule","quote":"350KB","suggestion":"350 КБ"},
  {"node":"2048:8422","rule_id":"NUM-05","severity":"minor","type":"rule","quote":"20 %","suggestion":"20%"},
  {"node":"2048:8660","rule_id":"LNG-03","severity":"minor","type":"rule","quote":"Сеййлина","suggestion":"Сейфуллина"},
  {"node":"2048:8705","rule_id":"TYP-05","severity":"minor","type":"rule","quote":"1 189  000 ₸","suggestion":"1 189 000 ₸ (двойной пробел)"}
]
```

## Флоу 2 — Предодобрение (`2048:20745`)

```json
[
  {"node":"2048:21378","rule_id":"LNG-03","severity":"major","type":"rule","quote":"Убедитесь, чтобы ваше лицо было достаточно освещено","suggestion":"Убедитесь, что ваше лицо достаточно освещено"},
  {"node":"2048:21378","rule_id":"TYP-06","severity":"minor","type":"rule","quote":"попробуйте еще раз","suggestion":"попробуйте ещё раз"},
  {"node":"2048:21378","rule_id":"STL-03","severity":"minor","type":"rule","quote":"Пожалуйста, попробуйте ещё раз","suggestion":"Попробуйте ещё раз (ошибка на стороне пользователя — без «Пожалуйста»)"},
  {"node":"2048:21444","rule_id":"LNG-03","severity":"major","type":"rule","quote":"Для продолжение вам необходимо","suggestion":"Для продолжения отсканируйте QR-код"},
  {"node":"2048:20848","rule_id":"LNG-03","severity":"major","type":"rule","quote":"Договор купли продажи","suggestion":"Договор купли-продажи"},
  {"node":"2048:20785","rule_id":"TYP-04","severity":"major","type":"rule","quote":"\"Далее\" … \"Mycar Group\"","suggestion":"«Далее» … «Mycar Group» (ёлочки, закрыть кавычку)"},
  {"node":"2048:20785","rule_id":null,"severity":"info","type":"heuristic","quote":"Нажимая на кнопку \"Далее\"","suggestion":"кнопка называется «Продолжить» — сноска и кнопка расходятся"},
  {"node":"2048:20785","rule_id":"TXT-01","severity":"major","type":"rule","quote":"С помощью ИИН система заполнит данные в анкете за вас","suggestion":"По ИИН заполним анкету автоматически"},
  {"node":"2048:20785","rule_id":"STL-02","severity":"minor","type":"rule","quote":"Введите свой ИИН","suggestion":"Введите ИИН"},
  {"node":"2048:20785","rule_id":"FRM-02","severity":"minor","type":"rule","quote":"плейсхолдер: ИИН","suggestion":"пример формата, напр. 990101300123"},
  {"node":"2048:20760","rule_id":"NUM-03","severity":"major","type":"rule","quote":"350KB","suggestion":"350 КБ"},
  {"node":"2048:21287","rule_id":"NUM-02","severity":"major","type":"rule","quote":"От 0.1%","suggestion":"От 0,1%"},
  {"node":"2048:21287","rule_id":"NUM-04","severity":"minor","type":"rule","quote":"21-23%","suggestion":"21 – 23%"},
  {"node":"2048:20908","rule_id":"TYP-08","severity":"minor","type":"rule","quote":"Заявка №124","suggestion":"Заявка № 124"},
  {"node":"2048:20908","rule_id":"LNG-03","severity":"minor","type":"rule","quote":"Банка-Партнера","suggestion":"банка-партнёра"},
  {"node":"2048:20908","rule_id":"TXT-03","severity":"minor","type":"rule","quote":"Вам необходимо закончить процесс оформления","suggestion":"Закончите оформление кредита"},
  {"node":"2048:21293","rule_id":"STL-02","severity":"minor","type":"rule","quote":"Список дилерских центров","suggestion":"Дилерские центры (убрать «Список»)"},
  {"node":"2048:21293","rule_id":"LNG-01","severity":"minor","type":"rule","quote":"г. Алматы, ул.","suggestion":"полный адрес (обрезанная заглушка)"},
  {"node":"2048:20748","rule_id":"STL-01","severity":"minor","type":"rule","quote":"Выписка предоставляется … и направляется напрямую в банки","suggestion":"Выписку отправим напрямую в банки"},
  {"node":"2048:20748","rule_id":"TYP-06","severity":"minor","type":"rule","quote":"со счета","suggestion":"со счёта"},
  {"node":"2048:21462","rule_id":null,"severity":"info","type":"heuristic","quote":"Сумма займа 11 200 000 ₸","suggestion":"проверьте: стоимость 15 200 000 − взнос 5 000 000 = 10 200 000 ₸"},
  {"node":"2048:21462","rule_id":"TXT-03","severity":"minor","type":"rule","quote":"для дальнейших действий","suggestion":"чтобы продолжить"},
  {"node":"2048:20914","rule_id":"TXT-03","severity":"minor","type":"rule","quote":"на текущий момент","suggestion":"сейчас"}
]
```

## Заметки
- Термины (госномер, ЦОН, кредит/займ, бренд Mycar) НЕ включены — ждут решения/глоссария; добавить после.
- Heuristic-находки (`type: heuristic`) — плагин НЕ обязан знать точные данные; достаточно поднять флаг «проверьте».
- Набор расширять по мере обкатки новых флоу.
