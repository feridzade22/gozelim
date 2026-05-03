const PERSON_NAME = "gözəl qız";

const letter =
  "Ad günün mübarək, gözəlim, göyçəyim. Yaxşı ki tanımışam səni. Düzdür, yanında deyiləm, uzaqdayam deyə əlimdən bu qədəri gəldi. Ümidvaram bəyənərsən. Həyatıma girdiyin üçün təşəkkürlər. İmza: FƏRİD.";

const luckyMessages = [
  "Bu yaşında ən çox sən parıldayacaqsan.",
  "777 bu gün sənə gözəl xəbər gətirir.",
  "Gülümsə, çünki bu gün sənin günündür.",
  "Sənin enerjin bu səhifənin ən gözəl hissəsidir.",
  "Yeni yaşın çox şirin bir başlanğıc olsun.",
  "Hər şey ürəyindəki kimi gözəl alınsın.",
  "Bu gün bütün işıqlar sənin üçün yanır.",
];

const starMessages = [
  "Qoyduğun hörmət mənə özümü dəyərli hiss etdirir.",
  "Göstərdiyin qayğı ən sakit formada ürəyimə toxunur.",
  "Səmimiyyətin və xasiyyətin mənimlə çox uyumludur.",
  "Gözlərin çox gözəldir, bunu demədən keçə bilmərəm.",
  "Mənə qarşı davranışların məni sənə daha da yaxınlaşdırır.",
  "Sadəliyin səni daha da gözəl edir.",
  "Olğunluğunla birlikdə nazlı olmağın ayrı bir gözəllikdir, nazlı gözəlim mənim.",
];

const UNLOCK_AT = new Date("2026-05-20T00:00:00+04:00").getTime();

const nameTargets = document.querySelectorAll("[data-person-name]");
nameTargets.forEach((target) => {
  target.textContent = PERSON_NAME;
});

const typedMessage = document.querySelector("#typedMessage");
let typeIndex = 0;

function typeLetter() {
  if (!typedMessage || typeIndex > letter.length) return;

  typedMessage.textContent = letter.slice(0, typeIndex);
  typeIndex += 1;
  window.setTimeout(typeLetter, typeIndex < 22 ? 42 : 22);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && typeIndex === 0) {
        typeLetter();
      }
    });
  },
  { threshold: 0.35 },
);

const letterSection = document.querySelector("#letter");
if (letterSection) observer.observe(letterSection);

const canvas = document.querySelector("#confetti");
const ctx = canvas.getContext("2d");
const particles = [];
const colors = ["#f2be62", "#fff1d2", "#b86b76", "#0d3d42", "#ffffff"];
let animationFrame = null;
let initialBurstDone = false;

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function createConfetti(amount = 120) {
  for (let i = 0; i < amount; i += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * 120,
      size: 6 + Math.random() * 8,
      speed: 1.4 + Math.random() * 3.5,
      drift: -1.2 + Math.random() * 2.4,
      spin: Math.random() * Math.PI,
      spinSpeed: -0.12 + Math.random() * 0.24,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.72 ? "heart" : "rect",
    });
  }
}

function drawHeart(x, y, size) {
  const scale = size / 18;
  ctx.beginPath();
  ctx.moveTo(x, y + 5 * scale);
  ctx.bezierCurveTo(x - 14 * scale, y - 6 * scale, x - 8 * scale, y - 16 * scale, x, y - 9 * scale);
  ctx.bezierCurveTo(x + 8 * scale, y - 16 * scale, x + 14 * scale, y - 6 * scale, x, y + 5 * scale);
  ctx.fill();
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const particle = particles[i];
    particle.y += particle.speed;
    particle.x += particle.drift;
    particle.spin += particle.spinSpeed;

    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.spin);
    ctx.fillStyle = particle.color;

    if (particle.shape === "heart") {
      drawHeart(0, 0, particle.size);
    } else {
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.58);
    }

    ctx.restore();

    if (particle.y > window.innerHeight + 30) {
      particles.splice(i, 1);
    }
  }

  if (particles.length > 0) {
    animationFrame = requestAnimationFrame(animateConfetti);
  } else {
    animationFrame = null;
  }
}

function burst(amount) {
  createConfetti(amount);
  if (!animationFrame) {
    animationFrame = requestAnimationFrame(animateConfetti);
  }
}

function runInitialBurst(amount = 90) {
  if (initialBurstDone) return;

  initialBurstDone = true;
  burst(amount);
}

function isLaunchLocked() {
  return Date.now() < UNLOCK_AT;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", () => {
  if (!isLaunchLocked()) {
    runInitialBurst(90);
  }
});

const launchGate = document.querySelector("#launchGate");
const countDays = document.querySelector("#countDays");
const countHours = document.querySelector("#countHours");
const countMinutes = document.querySelector("#countMinutes");
const countSeconds = document.querySelector("#countSeconds");
const spinButton = document.querySelector("#spinButton");
const luckyMessage = document.querySelector("#luckyMessage");
const digits = document.querySelector("#digits");
const slotDigits = digits ? Array.from(digits.querySelectorAll("span")) : [];
const toast = document.querySelector("#toast");
const defaultToastMessage = toast ? toast.textContent.trim() : "";
const openPendantButton = document.querySelector("#openPendantButton");
const pendantReveal = document.querySelector("#pendantReveal");
const projectionDisc = document.querySelector("#projectionDisc");
const starButtons = document.querySelectorAll(".star-button");
const starMessage = document.querySelector("#starMessage");
const lensPhrases = [
  "Yaxşı ki varsan",
  "İyi ki varsın",
  "I'm glad you exist",
  "Хорошо, что ты есть",
  "Добре, що ти є",
  "Добра, што ты ёсць",
  "კარგია, რომ არსებობ",
  "خوشحالم که هستی",
  "جميل أنك موجودة",
  "טוב שאת קיימת",
  "Χαίρομαι που υπάρχεις",
  "Schön, dass es dich gibt",
  "Fijn dat je er bent",
  "Godt at du findes",
  "Jag är glad att du finns",
  "Godt at du finnes",
  "Onneksi olet olemassa",
  "Tore, et olemas oled",
  "Labi, ka tu esi",
  "Gera, kad tu esi",
  "Dobrze, że jesteś",
  "Jsem rád, že jsi",
  "Som rád, že si",
  "Lepo je, da obstajaš",
  "Dobro je što postojiš",
  "Добро је што постојиш",
  "Dobro je što postojiš",
  "Добро е што постоиш",
  "Радвам се, че те има",
  "Mă bucur că exiști",
  "Örülök, hogy létezel",
  "Gëzohem që ekziston",
  "Sono felice che tu esista",
  "Je suis heureux que tu existes",
  "Me alegra que existas",
  "Que bom que você existe",
  "M'alegra que existeixis",
  "Alégrome de que existas",
  "Pozten nau existitzen zarela",
  "Tá áthas orm go bhfuil tú ann",
  "Rwy'n falch dy fod ti yma",
  "Tha mi toilichte gu bheil thu ann",
  "Gott að þú ert til",
  "Kemm hu sabiħ li teżisti",
  "Gaudeo te esse",
  "Mi ĝojas, ke vi ekzistas",
  "Senang kamu ada",
  "Gembira kamu ada",
  "Mabuti at nandiyan ka",
  "Thật vui vì có bạn",
  "ดีใจที่มีเธออยู่",
  "ດີໃຈທີ່ມີເຈົ້າ",
  "រីករាយដែលមានអ្នក",
  "မင်းရှိနေလို့ ဝမ်းသာတယ်",
  "很高兴有你",
  "很高興有你",
  "君がいてくれて嬉しい",
  "네가 있어서 좋아",
  "अच्छा है कि तुम हो",
  "اچھا ہے کہ تم ہو",
  "তুমি আছো বলে ভালো লাগে",
  "ਚੰਗਾ ਹੈ ਕਿ ਤੂੰ ਹੈਂ",
  "સારું છે કે તું છે",
  "तू आहेस हे छान आहे",
  "तिमी छौ, खुसी लाग्छ",
  "ඔයා ඉන්න එක සතුටක්",
  "நீ இருப்பது மகிழ்ச்சி",
  "నువ్వు ఉన్నందుకు ఆనందంగా ఉంది",
  "ನೀನು ಇದ್ದೀಯೆ ಎಂಬುದು ಸಂತೋಷ",
  "നീ ഉണ്ടെന്നത് സന്തോഷം",
  "ତୁମେ ଅଛ, ଭଲ ଲାଗେ",
  "ښه ده چې ته شته",
  "Xweş e ku tu heyi",
  "خۆشحاڵم کە تۆ هەیت",
  "Сен бар болғаныңа қуаныштымын",
  "Сен бар болгонуңа кубанычтамын",
  "Yaxshiyamki borsan",
  "Seniň barlygyňa begenýärin",
  "Хушҳолам, ки ту ҳастӣ",
  "Чамайг байгаад баяртай байна",
  "Nafurahi kuwa upo",
  "Ngiyajabula ukuthi ukhona",
  "Ndiyavuya ukuba ukhona",
  "Ek is bly jy bestaan",
  "በመኖርሽ ደስ ይለኛል",
  "Waan ku faraxsanahay inaad jirto",
  "Ina farin ciki da kasancewarki",
  "Inu mi dun pe o wa",
  "Obi dị m ụtọ na ị dị",
  "Ka koa ahau kei konei koe",
  "Hauʻoli au aia ʻoe",
  "Ua ou fiafia o loo e iai",
  "ʻOku ou fiefia ʻoku ke ʻi heni",
  "Faly aho fa misy ianao",
  "Mwen kontan ou la",
  "Ech si frou, datt et dech gëtt",
  "Ik bin bliid datsto der bist",
  "איך בין פריילעך אַז דו ביסטאָ",
  "Ma olen rõõmus, et sa olemas oled",
  "Bine că exiști",
];
let projectionWidth = 0;
let isSlotSpinning = false;
let launchTimer = null;

function showToast(message = defaultToastMessage) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function setCountValue(element, value) {
  if (!element) return;

  element.textContent = String(value).padStart(2, "0");
}

function unlockSite() {
  if (launchTimer) {
    window.clearInterval(launchTimer);
    launchTimer = null;
  }

  document.body.classList.remove("locked");

  if (launchGate) {
    launchGate.hidden = true;
  }

  runInitialBurst(160);
}

function updateLaunchGate() {
  const remaining = UNLOCK_AT - Date.now();

  if (remaining <= 0) {
    unlockSite();
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setCountValue(countDays, days);
  setCountValue(countHours, hours);
  setCountValue(countMinutes, minutes);
  setCountValue(countSeconds, seconds);
}

function initLaunchGate() {
  if (!launchGate) {
    document.body.classList.remove("locked");
    return;
  }

  if (!isLaunchLocked()) {
    unlockSite();
    return;
  }

  launchGate.hidden = false;
  document.body.classList.add("locked");
  updateLaunchGate();
  launchTimer = window.setInterval(updateLaunchGate, 1000);
}

initLaunchGate();

spinButton?.addEventListener("click", () => {
  if (isSlotSpinning || !digits || slotDigits.length === 0) return;

  isSlotSpinning = true;
  spinButton.disabled = true;

  const message = luckyMessages[Math.floor(Math.random() * luckyMessages.length)];
  let tick = 0;
  const totalTicks = 28;

  digits.classList.remove("spinning", "settled");
  digits.classList.add("rolling");
  if (luckyMessage) {
    luckyMessage.textContent = "Şans fırlanır...";
  }

  const spinInterval = window.setInterval(() => {
    slotDigits.forEach((digit, index) => {
      digit.textContent = String(Math.floor(Math.random() * 10));
      digit.style.animationDelay = `${index * 70}ms`;
    });

    tick += 1;

    if (tick >= totalTicks) {
      window.clearInterval(spinInterval);

      slotDigits.forEach((digit) => {
        digit.textContent = "7";
        digit.style.animationDelay = "0ms";
      });

      digits.classList.remove("rolling");
      void digits.offsetWidth;
      digits.classList.add("spinning", "settled");

      if (luckyMessage) {
        luckyMessage.textContent = message;
      }

      burst(160);
      showToast("777 dayandı!");

      window.setTimeout(() => {
        digits.classList.remove("settled");
        spinButton.disabled = false;
        isSlotSpinning = false;
      }, 620);
    }
  }, 58);
});

function buildProjectionWords(force = false) {
  if (!projectionDisc) return;

  const size = Math.round(projectionDisc.getBoundingClientRect().width);
  if (!force && projectionWidth === size && projectionDisc.children.length > 0) {
    return;
  }

  projectionWidth = size;
  projectionDisc.innerHTML = "";

  const fragment = document.createDocumentFragment();
  const ringCounts = [8, 10, 12, 14, 16, 18, 22];
  let phraseIndex = 0;

  for (let ring = 0; ring < ringCounts.length; ring += 1) {
    const count = ringCounts[ring];
    const radius = size * (0.055 + ring * 0.056);

    for (let item = 0; item < count; item += 1) {
      const span = document.createElement("span");
      const angle = (360 / count) * item + ring * 8;
      const speed = 2.6 + ring * 0.32;
      const delay = -((item % 12) * 0.16 + ring * 0.08);

      span.className = "projection-word";
      span.textContent = lensPhrases[phraseIndex % lensPhrases.length];
      span.dir = "auto";
      span.style.setProperty("--angle", `${angle}deg`);
      span.style.setProperty("--radius", `${radius}px`);
      span.style.setProperty("--speed", `${speed}s`);
      span.style.setProperty("--delay", `${delay}s`);
      fragment.appendChild(span);
      phraseIndex += 1;
    }
  }

  projectionDisc.appendChild(fragment);
}

function openPendantReveal() {
  if (!pendantReveal || !projectionDisc) return;

  pendantReveal.hidden = false;
  pendantReveal.classList.add("is-open");
  projectionDisc.classList.remove("is-fresh");

  requestAnimationFrame(() => {
    buildProjectionWords(true);
    projectionDisc.classList.add("is-fresh");
    pendantReveal.scrollIntoView({ behavior: "smooth", block: "start" });
    burst(180);
    showToast("Yaxşı ki varsan!");
  });
}

openPendantButton?.addEventListener("click", openPendantReveal);

starButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.star);
    const message = starMessages[index] || starMessages[0];

    starButtons.forEach((star) => star.classList.remove("active"));
    button.classList.add("active");

    if (starMessage) {
      starMessage.classList.remove("flash");
      void starMessage.offsetWidth;
      starMessage.textContent = message;
      starMessage.classList.add("flash");
    }

    burst(index === 6 ? 140 : 55);
    showToast(index === 6 ? "Nazlı gözəlim mənim!" : "Bir ulduz da parladı!");
  });
});

window.addEventListener("resize", () => {
  if (pendantReveal && !pendantReveal.hidden) {
    buildProjectionWords(true);
  }
});

document.querySelectorAll(".wish-card").forEach((card, index) => {
  card.addEventListener("click", () => {
    card.animate(
      [
        { transform: "translateY(0) scale(1)" },
        { transform: "translateY(-6px) scale(1.02)" },
        { transform: "translateY(0) scale(1)" },
      ],
      { duration: 420, easing: "ease-out" },
    );

    if (index === 7) {
      burst(120);
    }
  });
});
