import { useState, useEffect } from "react";

const QUESTIONS = [
  {
    id: 1,
    text: "পরীক্ষায় খারাপ result করলে তোমার প্রথম reaction কী?",
    sub: "Be honest — no one's watching.",
    options: [
      { text: "নিজেকে blame করি, মনে হয় আমি-ই worthless", weight: { wounded: 3, fearful: 1, resilient: 0, grounded: 0 } },
      { text: "Panic করি — বাবা-মা কী বলবে সেটা নিয়ে বেশি চিন্তা হয়", weight: { wounded: 0, fearful: 3, resilient: 0, grounded: 0 } },
      { text: "কষ্ট পাই, কিন্তু বুঝি এটা শেষ না", weight: { wounded: 0, fearful: 0, resilient: 2, grounded: 1 } },
      { text: "Analyze করি — কোথায় ভুল হলো সেটা বোঝার চেষ্টা করি", weight: { wounded: 0, fearful: 0, resilient: 1, grounded: 3 } },
    ],
  },
  {
    id: 2,
    text: "কেউ যদি তোমার failure-এর কথা জানে, তুমি কেমন feel করো?",
    sub: "সমাজের চোখে নিজেকে দেখো একটু।",
    options: [
      { text: "লজ্জায় মরে যেতে ইচ্ছে করে — judge করবে মনে হয়", weight: { wounded: 2, fearful: 2, resilient: 0, grounded: 0 } },
      { text: "খুব uncomfortable — লুকিয়ে রাখতে চাই", weight: { wounded: 1, fearful: 3, resilient: 0, grounded: 0 } },
      { text: "Awkward লাগে, কিন্তু hide করি না", weight: { wounded: 0, fearful: 0, resilient: 2, grounded: 1 } },
      { text: "এটা আমার story-র একটা part — লুকানোর কিছু নেই", weight: { wounded: 0, fearful: 0, resilient: 1, grounded: 3 } },
    ],
  },
  {
    id: 3,
    text: "তুমি কি কখনো কিছু try করোনি শুধু fail করার ভয়ে?",
    sub: "যেই সুযোগটা তুমি ছেড়ে দিয়েছিলে।",
    options: [
      { text: "হ্যাঁ, অনেকবার — safe থাকাটাই ভালো মনে হয়", weight: { wounded: 1, fearful: 3, resilient: 0, grounded: 0 } },
      { text: "হ্যাঁ, কারণ fail করলে সবাই কী ভাববে", weight: { wounded: 2, fearful: 2, resilient: 0, grounded: 0 } },
      { text: "মাঝে মাঝে, কিন্তু পরে regret হয় তাই এখন try করি", weight: { wounded: 0, fearful: 0, resilient: 3, grounded: 1 } },
      { text: "না — fail হওয়াটাও একটা result, কিছু না করা worse", weight: { wounded: 0, fearful: 0, resilient: 1, grounded: 3 } },
    ],
  },
  {
    id: 4,
    text: "কোনো বড় failure-এর পর তুমি নিজেকে কতদিন ধরে blame করো?",
    sub: "সেই রাতগুলোর কথা মনে করো।",
    options: [
      { text: "অনেকদিন — sometimes বছরের পর বছরও মাথায় থাকে", weight: { wounded: 3, fearful: 1, resilient: 0, grounded: 0 } },
      { text: "যতদিন মানুষ মনে রাখে ততদিন", weight: { wounded: 1, fearful: 3, resilient: 0, grounded: 0 } },
      { text: "কিছুদিন কষ্ট পাই, তারপর move on করার চেষ্টা করি", weight: { wounded: 0, fearful: 0, resilient: 3, grounded: 1 } },
      { text: "Process করি, lesson নিই, তারপর ছেড়ে দিই", weight: { wounded: 0, fearful: 0, resilient: 1, grounded: 3 } },
    ],
  },
  {
    id: 5,
    text: "বাবা-মা বা society-র expectation পূরণ করতে না পারলে তুমি কী ভাবো?",
    sub: "এই pressure-টা real — তুমি কীভাবে carry করো?",
    options: [
      { text: "মনে হয় আমি তাদের disappoint করেছি — নিজেকে ক্ষমা করতে পারি না", weight: { wounded: 3, fearful: 1, resilient: 0, grounded: 0 } },
      { text: "খুব ভয় লাগে — তাদের reaction-ই আমার সবচেয়ে বড় চিন্তা", weight: { wounded: 0, fearful: 3, resilient: 0, grounded: 0 } },
      { text: "কষ্ট লাগে, কিন্তু আমি জানি আমার নিজের path আছে", weight: { wounded: 0, fearful: 0, resilient: 2, grounded: 2 } },
      { text: "তাদের expectation আর আমার reality-র মধ্যে balance খুঁজি", weight: { wounded: 0, fearful: 0, resilient: 1, grounded: 3 } },
    ],
  },
  {
    id: 6,
    text: "Failure তোমাকে কী শিখিয়েছে — সত্যি করে বলো?",
    sub: "কোনো motivational quote দরকার নেই।",
    options: [
      { text: "শিখিয়েছে যে আমি যথেষ্ট ভালো না", weight: { wounded: 3, fearful: 0, resilient: 0, grounded: 0 } },
      { text: "শিখিয়েছে সবসময় safe play করতে", weight: { wounded: 0, fearful: 3, resilient: 0, grounded: 0 } },
      { text: "শিখিয়েছে যে আমি ভাবতাম তার চেয়ে আমি stronger", weight: { wounded: 0, fearful: 0, resilient: 3, grounded: 1 } },
      { text: "শিখিয়েছে failure হলো data — emotion না", weight: { wounded: 0, fearful: 0, resilient: 1, grounded: 3 } },
    ],
  },
];

const RESULTS = {
  wounded: {
    title: "The Wounded Fighter",
    bangla: "আহত যোদ্ধা",
    emoji: "🩹",
    tagline: "তুমি অনেক কিছু বহন করছো — একা।",
    gradient: ["#4A0E8F", "#8B1A6B", "#C2185B"],
    accent: "#F48FB1",
    light: "#FCE4EC",
    description: "Failure তোমার কাছে শুধু একটা event না — এটা তোমার identity-র সাথে মিশে গেছে। যখনই কিছু ভুল হয়, তুমি নিজেকে জিজ্ঞেস করো: 'আমি কি আসলেই যথেষ্ট?' এই প্রশ্নটা তোমাকে অনেক আগে কেউ শিখিয়েছে — হয়তো consciously না, কিন্তু শিখিয়েছে। তোমার pain real। কিন্তু তুমি তোমার worst moment না।",
    truths: ["তুমি deeply sensitive — এটা weakness না, এটা depth", "তোমার empathy অসাধারণ — তুমি অন্যের pain বোঝো", "তুমি নিজের জন্য যতটা harsh, অন্যের জন্য ততটা না"],
    shift: "একটাই কাজ করো: পরের বার fail করলে নিজেকে জিজ্ঞেস করো — 'আমার best friend হলে কী বলতো?' সেই compassion তোমার নিজেরও প্রাপ্য।",
    quote: "তুমি তোমার scars-এর চেয়ে অনেক বেশি কিছু।",
  },
  fearful: {
    title: "The Approval Seeker",
    bangla: "স্বীকৃতির সন্ধানী",
    emoji: "🪞",
    tagline: "তুমি নিজের জন্য বাঁচছো নাকি অন্যের চোখের জন্য?",
    gradient: ["#1A237E", "#4527A0", "#7B1FA2"],
    accent: "#CE93D8",
    light: "#F3E5F5",
    description: "তোমার failure-এর সবচেয়ে বড় ভয়টা result নিয়ে না — মানুষ কী ভাববে সেটা নিয়ে। বাবা-মা, relatives, বন্ধুরা — তাদের reaction তোমার মাথায় তোমার নিজের reaction-এর আগেই আসে। এটা Bangladeshi society-তে বড় হওয়ার একটা natural consequence। কিন্তু এই mirror-এ বারবার নিজেকে দেখতে দেখতে তুমি ভুলে যাচ্ছো তুমি আসলে কে।",
    truths: ["তুমি অবিশ্বাস্যরকম socially aware — এটা একটা skill", "তুমি relationship-এ deeply invested — loyalty তোমার strength", "তুমি others-এর জন্য অনেক কিছু করো — নিজের জন্যও সেটা deserve করো"],
    shift: "একটা ছোট experiment করো: এমন একটা decision নাও যেটা সম্পূর্ণ তোমার নিজের জন্য — কেউ জানবে না, কেউ judge করবে না। দেখো সেটা কেমন feel হয়।",
    quote: "অন্যের approval ছাড়াও তুমি valid।",
  },
  resilient: {
    title: "The Rising One",
    bangla: "উঠে দাঁড়ানো মানুষ",
    emoji: "🌱",
    tagline: "তুমি ভেঙে পড়ো, কিন্তু থেমে থাকো না।",
    gradient: ["#0D47A1", "#1565C0", "#6A1B9A"],
    accent: "#90CAF9",
    light: "#E3F2FD",
    description: "Failure তোমাকে hurt করে — তুমি সেটা deny করো না। কিন্তু সেই pain-এর মধ্যেও তোমার ভেতরে কিছু একটা আছে যেটা বলে 'এখানেই শেষ না।' এটা courage। তুমি হয়তো জানো না, কিন্তু তোমার এই quality অনেকেরই নেই। তুমি failure-কে personally নাও, process করো, এবং তারপর উঠে দাঁড়ানোর চেষ্টা করো। এই cycle-টাই তোমাকে এগিয়ে নিয়ে যাবে।",
    truths: ["তোমার emotional intelligence অনেক বেশি", "তুমি discomfort-এ grow করো — even when it doesn't feel like it", "তোমার story-তে comebacks আছে — setbacks-এর চেয়ে বেশি"],
    shift: "এখন যেটা দরকার: নিজের progress document করো। Failure-গুলো না, বরং প্রতিটা 'উঠে দাঁড়ানো'-র মুহূর্তগুলো। সেটাই তোমার real track record।",
    quote: "প্রতিবার উঠে দাঁড়ানোটাই তোমার সবচেয়ে বড় achievement।",
  },
  grounded: {
    title: "The Clear-Eyed One",
    bangla: "স্থির দৃষ্টির মানুষ",
    emoji: "🧭",
    tagline: "তুমি failure-কে ভয় পাও না — তুমি এটাকে বোঝো।",
    gradient: ["#004D40", "#00695C", "#1A237E"],
    accent: "#80CBC4",
    light: "#E0F2F1",
    description: "তোমার কাছে failure একটা event — তোমার identity না। এই distinction-টা অনেক বড়, এবং এটা develop করতে অনেকের সারাজীবন লেগে যায়। তুমি হয়তো এটা naturally পেয়েছো, হয়তো কঠিন অভিজ্ঞতা থেকে শিখেছো — যেভাবেই হোক, এটা তোমার একটা rare strength। তোমার চারপাশে অনেকে আছে যারা তোমার এই clarity থেকে উপকৃত হতে পারে।",
    truths: ["তোমার self-awareness exceptionally high", "তুমি pressure-এ logical থাকতে পারো — এটা leadership quality", "তুমি long-term ভাবো, short-term reactions-এ হারিয়ে যাও না"],
    shift: "তোমার জন্য challenge হলো: এই clarity শুধু নিজের জন্য না রেখে যারা struggle করছে তাদের সাথে share করো। তোমার grounded presence অন্যদের জন্য anchor হতে পারে।",
    quote: "Failure তোমার গল্পের একটা chapter — পুরো বইটা না।",
  },
};

function GradientBg({ colors, children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Radial glow top */}
      <div style={{ position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(ellipse, ${colors[1]}55 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      {/* Radial glow bottom */}
      <div style={{ position: "fixed", bottom: "-10%", right: "-10%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(ellipse, ${colors[2]}44 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div style={{ width: "100%", maxWidth: 560, margin: "0 auto 36px", padding: "0 4px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Question {current} of {total}</span>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, rgba(255,255,255,0.5), rgba(255,255,255,0.9))", borderRadius: 99, transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </div>
    </div>
  );
}

function IntroScreen({ onStart }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 60); }, []);

  const items = [
    { delay: "0s", content: (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 99, padding: "8px 20px", marginBottom: 32 }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F48FB1", display: "inline-block", boxShadow: "0 0 10px #F48FB1" }} />
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, letterSpacing: "0.14em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase" }}>Self-Discovery Quiz</span>
      </div>
    )},
    { delay: "0.1s", content: (
      <h1 style={{ fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif", fontSize: "clamp(40px, 9vw, 76px)", fontWeight: 700, lineHeight: 1.05, color: "#fff", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
        Failure-কে তুমি<br />
        <span style={{ background: "linear-gradient(90deg, #F48FB1, #CE93D8, #90CAF9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>কীভাবে দেখো?</span>
      </h1>
    )},
    { delay: "0.2s", content: (
      <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: "24px 0 44px", maxWidth: 440 }}>
        ৬টা honest question। তোমার mindset, self-worth, আর resilience সম্পর্কে একটা সত্যিকারের picture।
      </p>
    )},
    { delay: "0.3s", content: (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <button
          onClick={onStart}
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 16,
            fontWeight: 600,
            color: "#3a0a6e",
            background: "#fff",
            border: "none",
            borderRadius: 99,
            padding: "18px 52px",
            cursor: "pointer",
            letterSpacing: "0.02em",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            transition: "all 0.25s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05) translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.35)"; }}
        >
          Begin Your Journey &nbsp;›
        </button>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: "0.06em" }}>~2 minutes · No right answers</span>
      </div>
    )},
    { delay: "0.4s", content: (
      <div style={{ marginTop: 48, display: "flex", alignItems: "center", gap: 10, justifyContent: "center" }}>
        <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.15)" }} />
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.22)", letterSpacing: "0.12em" }}>by Nazim Fuhad · Student Coach</span>
        <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.15)" }} />
      </div>
    )},
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 28px", textAlign: "center" }}>
      {items.map((item, i) => (
        <div key={i} style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${item.delay}, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${item.delay}` }}>
          {item.content}
        </div>
      ))}
    </div>
  );
}

function QuestionScreen({ question, qIndex, total, onAnswer, selected }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [qIndex]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ width: "100%", maxWidth: 580, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(22px)", transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)" }}>
        <ProgressBar current={qIndex + 1} total={total} />

        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif", fontSize: "clamp(20px, 4.5vw, 28px)", fontWeight: 600, color: "#fff", lineHeight: 1.35, margin: "0 0 10px", letterSpacing: "-0.01em" }}>
            {question.text}
          </h2>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.38)", fontStyle: "italic", margin: 0 }}>
            {question.sub}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {question.options.map((opt, idx) => {
            const isSel = selected === idx;
            const isHov = hovered === idx;
            return (
              <button
                key={idx}
                onClick={() => onAnswer(idx)}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isSel ? "rgba(255,255,255,0.18)" : isHov ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
                  border: isSel ? "1.5px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 16,
                  padding: "16px 20px",
                  cursor: "pointer",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  transition: "all 0.18s ease",
                  transform: isSel ? "scale(1.015)" : isHov ? "scale(1.007)" : "scale(1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isSel ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                  border: isSel ? "1.5px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.2)",
                  fontSize: isSel ? 14 : 12,
                  color: isSel ? "#fff" : "rgba(255,255,255,0.4)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  transition: "all 0.18s ease",
                }}>
                  {isSel ? "✓" : String.fromCharCode(65 + idx)}
                </span>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, lineHeight: 1.6, color: isSel ? "#fff" : "rgba(255,255,255,0.65)", transition: "color 0.18s ease", fontWeight: isSel ? 500 : 400 }}>
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ResultScreen({ resultKey, onRetake }) {
  const r = RESULTS[resultKey];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    [0, 150, 350, 600, 900].forEach((d, i) => setTimeout(() => setStage(i + 1), d));
  }, []);

  const fade = (s, extra = "") => ({
    opacity: stage >= s ? 1 : 0,
    transform: stage >= s ? "translateY(0)" : "translateY(18px)",
    transition: `all 0.65s cubic-bezier(0.16,1,0.3,1) ${extra}`,
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "64px 24px 80px" }}>
      <div style={{ width: "100%", maxWidth: 600 }}>

        {/* Result header */}
        <div style={{ ...fade(1), textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 56, marginBottom: 20, filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))" }}>{r.emoji}</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: r.accent, textTransform: "uppercase", marginBottom: 10, opacity: 0.9 }}>তোমার failure mindset</div>
          <h1 style={{ fontFamily: "'Clash Display', 'Plus Jakarta Sans', sans-serif", fontSize: "clamp(30px, 7vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 6px", lineHeight: 1.1 }}>
            {r.bangla}
          </h1>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: "italic", fontSize: 17, color: "rgba(255,255,255,0.45)", margin: 0 }}>"{r.tagline}"</p>
        </div>

        {/* Description */}
        <div style={{ ...fade(2), background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20, padding: "28px", marginBottom: 16 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15.5, lineHeight: 1.85, color: "rgba(255,255,255,0.72)", margin: 0 }}>
            {r.description}
          </p>
        </div>

        {/* Truths */}
        <div style={{ ...fade(3), background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "24px 28px", marginBottom: 16 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, letterSpacing: "0.18em", color: r.accent, textTransform: "uppercase", marginBottom: 18, fontWeight: 600 }}>তোমার সত্যিকারের strength</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {r.truths.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: r.accent, fontSize: 16, flexShrink: 0, marginTop: 1 }}>◈</span>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, lineHeight: 1.65, color: "rgba(255,255,255,0.62)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth shift */}
        <div style={{ ...fade(4), background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "24px 28px", marginBottom: 24 }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, letterSpacing: "0.18em", color: r.accent, textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>এখন একটাই কাজ</div>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14.5, lineHeight: 1.75, color: "rgba(255,255,255,0.62)", margin: 0 }}>{r.shift}</p>
        </div>

        {/* Quote */}
        <div style={{ ...fade(5), borderLeft: `3px solid ${r.accent}`, paddingLeft: 22, marginBottom: 44 }}>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.7, color: "rgba(255,255,255,0.75)", margin: 0, fontWeight: 500 }}>
            "{r.quote}"
          </p>
        </div>

        {/* Retake */}
        <div style={{ ...fade(5), textAlign: "center" }}>
          <button
            onClick={onRetake}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.45)", background: "transparent", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 99, padding: "13px 36px", cursor: "pointer", transition: "all 0.2s ease", letterSpacing: "0.03em" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "transparent"; }}
          >
            আবার চেষ্টা করো
          </button>
          <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.18)", marginTop: 24, letterSpacing: "0.06em" }}>by Nazim Fuhad · Student Coach</p>
        </div>
      </div>
    </div>
  );
}

function Overlay({ active }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#1a0533", zIndex: 999, pointerEvents: active ? "all" : "none", opacity: active ? 1 : 0, transition: "opacity 0.3s ease" }} />
  );
}

const BASE_COLORS = ["#2D0B6B", "#5B0E91", "#8B1A6B"];

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [bgColors, setBgColors] = useState(BASE_COLORS);
  const [transitioning, setTransitioning] = useState(false);

  const go = (fn) => {
    setTransitioning(true);
    setTimeout(() => { fn(); setTimeout(() => setTransitioning(false), 320); }, 300);
  };

  const handleStart = () => go(() => { setPhase("quiz"); setQIndex(0); setAnswers([]); setSelected(null); });

  const handleAnswer = (idx) => {
    setSelected(idx);
    const newAnswers = [...answers];
    newAnswers[qIndex] = idx;

    setTimeout(() => {
      if (qIndex < QUESTIONS.length - 1) {
        go(() => { setAnswers(newAnswers); setQIndex(q => q + 1); setSelected(newAnswers[qIndex + 1] ?? null); });
      } else {
        const scores = { wounded: 0, fearful: 0, resilient: 0, grounded: 0 };
        QUESTIONS.forEach((q, i) => {
          const a = i === qIndex ? idx : newAnswers[i];
          if (a !== undefined && a !== null) Object.entries(q.options[a].weight).forEach(([k, v]) => { scores[k] += v; });
        });
        const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
        go(() => { setResult(top); setBgColors(RESULTS[top].gradient); setPhase("result"); });
      }
    }, 260);
  };

  const handleRetake = () => go(() => { setPhase("intro"); setQIndex(0); setAnswers([]); setSelected(null); setResult(null); setBgColors(BASE_COLORS); });

  return (
    <GradientBg colors={bgColors}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; }
        body { overflow-x: hidden; }
      `}</style>
      <Overlay active={transitioning} />
      {phase === "intro" && <IntroScreen onStart={handleStart} />}
      {phase === "quiz" && (
        <QuestionScreen
          key={qIndex}
          question={QUESTIONS[qIndex]}
          qIndex={qIndex}
          total={QUESTIONS.length}
          onAnswer={handleAnswer}
          selected={selected}
        />
      )}
      {phase === "result" && result && <ResultScreen resultKey={result} onRetake={handleRetake} />}
    </GradientBg>
  );
}
