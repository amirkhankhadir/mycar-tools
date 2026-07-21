// mycar-copy · канонический read-скрипт для АУДИТА (один вызов use_figma вместо нескольких).
// Тело для use_figma (top-level await + return). Подставь ROOT_IDS — id корневых секций/фреймов
// с экранами (nodeId из URL `7023-36231` → `7023:36231`). Ветка `/branch/<branchKey>/` → fileKey=branchKey.
//
// Возвращает УНИКАЛЬНЫЕ видимые строки (дедуп по characters), для каждой:
//   { chars, m, screens, codes? }
//   m       — «Мест»: сколько ВИДИМЫХ нод с этой строкой (учтена видимость всей цепочки родителей);
//   screens — на каких экранах встречается;
//   codes   — коды символов (·SP/·NBSP/·THIN + сам символ) ТОЛЬКО для «подозрительных» строк
//             (есть цифра / ₸ $ % № / точка / тире) — по ним сверяется типографика TYP/NUM/LOC.
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

const map=new Map();
for(const id of ROOT_IDS){
  const root=await figma.getNodeByIdAsync(id); if(!root) continue;
  for(const t of root.findAllWithCriteria({types:["TEXT"]})){
    if(!t.visible || !visibleChain(t)) continue;
    const c=t.characters; const ct=(c||"").trim();
    if(!ct || SKIP.has(ct) || isKey(ct)) continue;
    if(!map.has(c)){ const m=t.absoluteTransform; map.set(c,{count:0,screens:new Set(),y:m[1][2],x:m[0][2]}); }
    const e=map.get(c); e.count++; e.screens.add(screenName(t));
  }
}
const list=[...map.entries()]
  .sort((a,b)=> a[1].y-b[1].y || a[1].x-b[1].x)  // порядок чтения: сверху вниз, слева направо
  .map(([chars,e])=>{ const o={chars, m:e.count, screens:[...e.screens]}; if(suspicious(chars)) o.codes=Array.from(chars).map(codeOf).join("|"); return o; });
return { unique:list.length, list };
