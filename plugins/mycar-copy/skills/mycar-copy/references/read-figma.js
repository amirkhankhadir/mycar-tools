// mycar-copy · канонический read-скрипт для АУДИТА (один вызов use_figma вместо нескольких).
// Тело для use_figma (top-level await + return). Подставь ROOT_IDS — id корневых секций/фреймов
// с экранами (nodeId из URL `7023-36231` → `7023:36231`). Ветка `/branch/<branchKey>/` → fileKey=branchKey.
//
// Возвращает УНИКАЛЬНЫЕ видимые строки (дедуп по characters), для каждой:
//   { chars, m, screens, codes?, case?, flags? }
//   m       — «Мест»: сколько ВИДИМЫХ нод с этой строкой (учтена видимость всей цепочки родителей);
//             ← бери это число прямо в виджет (сумма m по всем строкам находки), не оценивай на глаз.
//   screens — на каких экранах встречается;
//   codes   — коды символов (·SP/·NBSP/·THIN + сам символ) ТОЛЬКО для «подозрительных» строк
//             (есть цифра / ₸ $ % № / точка / тире) — по ним сверяется типографика TYP/NUM/LOC.
//   case    — стиль регистра ноды (UPPER/LOWER/TITLE/MIXED), если НЕ ORIGINAL. Значит регистр
//             задаёт СТИЛЬ, а не текст → рассинхрон регистра в исходнике пользователю НЕ виден,
//             как правило НЕ флагаем (в «Проверить» — максимум с оговоркой).
//   flags   — авто-подсказки очевидной механики (не приговор, сверь): 'NUM-02?' (десятичная точка),
//             'NBSP?' (обычный пробел в числе/перед валютой), 'TYP-08?' (№ слитно),
//             'TYP-05?' (двойной/хвостовой пробел), 'NUM-05?' (% с пробелом).
// Дедуп даёт и скорость, и полноту: одинаковые строки схлопываются, РАЗЛИЧАЮЩИЕСЯ (A/B-варианты
// заголовков, тогглов) остаются — их не теряем. Сырые ноды НЕ выгружаем.

figma.skipInvisibleInstanceChildren = true;
const ROOT_IDS = ["ПОДСТАВЬ:NODE-IDS"];

// видимость всей цепочки родителей — скрытый фрейм исключает свои ноды (иначе «Мест» врёт)
function visibleChain(n){ let p=n; while(p && p.type!=="PAGE"){ if(p.visible===false) return false; p=p.parent; } return true; }
// имя экрана: верхний FRAME под секцией, иначе — секция
function screenName(n){ let p=n,last=null; while(p&&p.type!=="PAGE"){ if(p.type==="FRAME")last=p; if(p.type==="SECTION")return last?last.name:p.name; p=p.parent;} return last?last.name:"?"; }

// системщина/раскладка/декор — не копирайт, пропускаем молча
const SKIP=new Set(["space","Go","123","9:41","return","search","・"]);
const isKey=s=>/^[QWERTYUIOPASDFGHJKLZXCVBNM]$/.test(s);
// где типографику надо смотреть по кодам: цифры, валюта, %, №, точка, любое тире/дефис/минус
const suspicious=s=>/[0-9₸$%№.‐‑‒–—−-]/.test(s);
const codeOf=ch=>{const cp=ch.codePointAt(0); return cp===0x20?"·SP":cp===0xA0?"·NBSP":cp===0x2009?"·THIN":ch;};
// стиль регистра: если ORIGINAL — регистр из текста; иначе его задаёт СТИЛЬ (пользователю виден именно он)
const caseOf=t=>{ try{ const c=t.textCase; return typeof c==="string"?c:"MIXED"; }catch(e){ return "?"; } };
// авто-подсказки очевидной механики — по ОБЫЧНОМУ пробелу U+0020 (NBSP U+00A0 не флагаем)
function flagsOf(s){
  const f=[];
  if(/\d\.\d/.test(s)) f.push("NUM-02?");
  if(/\d \d/.test(s) || /\d [₸$]/.test(s)) f.push("NBSP?");
  if(/№[0-9A-Za-zА-Яа-яЁё]/.test(s)) f.push("TYP-08?");
  if(/  /.test(s) || /^ | $/.test(s)) f.push("TYP-05?");
  if(/\d %/.test(s)) f.push("NUM-05?");
  return f;
}

const map=new Map();
for(const id of ROOT_IDS){
  const root=await figma.getNodeByIdAsync(id); if(!root) continue;
  for(const t of root.findAllWithCriteria({types:["TEXT"]})){
    if(!t.visible || !visibleChain(t)) continue;
    const c=t.characters; const ct=(c||"").trim();
    if(!ct || SKIP.has(ct) || isKey(ct)) continue;
    if(!map.has(c)){ const m=t.absoluteTransform; map.set(c,{count:0,screens:new Set(),cases:new Set(),y:m[1][2],x:m[0][2]}); }
    const e=map.get(c); e.count++; e.screens.add(screenName(t)); e.cases.add(caseOf(t));
  }
}
const list=[...map.entries()]
  .sort((a,b)=> a[1].y-b[1].y || a[1].x-b[1].x)  // порядок чтения: сверху вниз, слева направо
  .map(([chars,e])=>{
    const o={chars, m:e.count, screens:[...e.screens]};
    if(suspicious(chars)){ o.codes=Array.from(chars).map(codeOf).join("|"); const fl=flagsOf(chars); if(fl.length) o.flags=fl; }
    const cs=[...e.cases].filter(x=>x!=="ORIGINAL"); if(cs.length) o.case=cs.length>1?"MIXED":cs[0];
    return o;
  });
return { unique:list.length, list };
