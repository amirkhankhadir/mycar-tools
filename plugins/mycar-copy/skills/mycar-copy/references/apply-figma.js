// mycar-copy · канонический APPLY-скрипт (запись правок аудита в Figma одним вызовом use_figma).
// Сиблинг read-figma.js. Тело для use_figma (top-level await + return). Ветка → fileKey=branchKey.
//
// Заполняешь ДВА входа и запускаешь:
//   ROOT_IDS   — те же корневые ноды, что и при чтении.
//   EXACT      — точные замены [{was, now}] для находок, требующих СМЫСЛА/суждения:
//                «ё» (объём/сохранён/удалён), десятичная запятая (2.5→2,5), формулировки
//                (Кастомное→Своё), тире/кавычки, хвостовые/двойные пробелы. Одна пара
//                покрывает ВСЕ инстансы с этой строкой — перечислять ноды не нужно.
//   SAFE_TYPO  — true, если среди выбранных есть СИСТЕМНАЯ находка «неразрывные пробелы».
//                Тогда по всем видимым нодам прогоняется безопасный NBSP-нормализатор
//                (тысячи/валюта/единицы/№/%). Он идемпотентен и НЕ трогает ё/десятичную/смысл.
//
// Почему так, а не регэкспом на лету:
//  • `\b` в JS основан на ASCII `\w` → после кириллической единицы («км», «л») границы слова
//    НЕТ, лукахед `(?=…\b)` молча не срабатывает. NBSP перед единицей ставим ПОсимвольным
//    сканом кодов, а не регуляркой.
//  • `/g`-регэксп в `.test()` статичен (двигает lastIndex) → ложные пропуски в цикле по нодам.
//  • Скрипт САМ возвращает коды изменённых строк — отдельный вызов на верификацию не нужен.

figma.skipInvisibleInstanceChildren = true;
const ROOT_IDS = ["ПОДСТАВЬ:NODE-IDS"];

const EXACT = [
  // { was: "Объем двигателя, От", now: "Объём двигателя, От" },
  // { was: "2.5 л",              now: "2,5 л" },
];
const SAFE_TYPO = false;

// ——— защита нод: только видимый текст инстансов, мастер-компоненты НЕ трогаем ———
function visibleChain(n){ let p=n; while(p && p.type!=="PAGE"){ if(p.visible===false) return false; p=p.parent; } return true; }
function inMaster(n){ let p=n.parent; while(p && p.type!=="PAGE"){ if(p.type==="COMPONENT"||p.type==="COMPONENT_SET") return true; p=p.parent; } return false; }

// ——— безопасный NBSP-нормализатор (по кодам символов, без регэкспов с \b) ———
// Единицы, «прилипающие» к числу слева. Позиция вставки не зависит от того, какой юнит совпал.
const UNITS = ["км","см","мм","кг","м²","мл","л","т","га","кВт","л.с."];
function nbspFix(s){
  const a = [...s]; let out = "";
  for(let i=0;i<a.length;i++){
    const ch = a[i], prev = a[i-1]||"", rest = a.slice(i+1).join("");
    // № слитно с номером: «№124» → «№ 124»
    if(ch==="№" && /[0-9A-Za-zА-Яа-яЁё]/.test(rest[0]||"")){ out+="№ "; continue; }
    if(ch===" "){
      if(prev==="№"){ out+=" "; continue; }                                 // № + значение
      if(/[0-9]/.test(prev)){
        if(/^[0-9]/.test(rest)){ out+=" "; continue; }                      // разряды тысяч
        if(rest[0]==="₸"||rest[0]==="$"){ out+=" "; continue; }             // валюта
        if(rest[0]==="%"){ continue; }                                            // % пишем слитно (NUM-05) — пробел убираем
        const u = UNITS.find(u=>rest.startsWith(u) && !/[а-яёa-z0-9]/i.test(rest[u.length]||""));
        if(u){ out+=" "; continue; }                                         // число + единица
      }
    }
    out += ch;
  }
  return out;
}

const codeOf = ch=>{const cp=ch.codePointAt(0); return cp===0x20?"·SP":cp===0xA0?"·NBSP":cp===0x2009?"·THIN":ch;};
const exactMap = new Map(EXACT.map(e=>[e.was, e.now]));

// ——— сбор целей + шрифтов, затем одна батч-правка ———
const targets = []; const fonts = new Map();
for(const id of ROOT_IDS){
  const root = await figma.getNodeByIdAsync(id); if(!root) continue;
  for(const t of root.findAllWithCriteria({types:["TEXT"]})){
    if(!t.visible || !visibleChain(t) || inMaster(t)) continue;
    const c = t.characters;
    let nc = exactMap.has(c) ? exactMap.get(c) : (SAFE_TYPO ? nbspFix(c) : c);
    if(nc===c) continue;
    targets.push({t, nc});
    for(const seg of t.getStyledTextSegments(["fontName"])){ const f=seg.fontName; fonts.set(f.family+"|"+f.style, f); }
  }
}
for(const f of fonts.values()){ await figma.loadFontAsync(f); }

const applied = []; const errors = [];
for(const {t, nc} of targets){
  try{ t.characters = nc; applied.push({id:t.id, now:nc, codes:Array.from(nc).map(codeOf).join("|")}); }
  catch(e){ errors.push({id:t.id, err:String(e)}); }
}
// самопроверка: покажи новые коды уникальных строк — сверь ·SP/·NBSP/запятую глазами не нужно
const uniq = [...new Map(applied.map(a=>[a.now,a])).values()].slice(0,20);
return { targetCount:targets.length, appliedCount:applied.length, errors,
         mutatedNodeIds:applied.map(a=>a.id), verify:uniq.map(a=>({now:a.now, codes:a.codes})) };
