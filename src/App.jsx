import React, { useMemo, useRef, useState } from "react";

const families = ["Inter", "Roboto", "Poppins", "System UI"];
const weights = [400, 500, 600, 700];
const shadowMap = { none: "", small: "shadow", medium: "shadow-md", large: "shadow-xl" };

const themes = {
  Aurora: {
    grad: "from-fuchsia-500 via-indigo-500 to-sky-500",
    surface: "bg-white/70 backdrop-blur",
    primary: "#6D28D9",
    accent: "#22D3EE",
    textOnPrimary: "#FFFFFF",
  },
  Sunset: {
    grad: "from-rose-500 via-orange-500 to-amber-400",
    surface: "bg-white/70 backdrop-blur",
    primary: "#EA580C",
    accent: "#F59E0B",
    textOnPrimary: "#111827",
  },
  Ocean: {
    grad: "from-cyan-500 via-blue-500 to-indigo-500",
    surface: "bg-white/70 backdrop-blur",
    primary: "#0EA5E9",
    accent: "#6366F1",
    textOnPrimary: "#FFFFFF",
  },
  Forest: {
    grad: "from-emerald-500 via-teal-500 to-cyan-500",
    surface: "bg-white/70 backdrop-blur",
    primary: "#059669",
    accent: "#14B8A6",
    textOnPrimary: "#FFFFFF",
  },
};

const presets = {
  Clean: {
    typography: { family: "Inter", weight: 400, size: 16 },
    button: { radius: 12, shadow: "medium", align: "left", bg: "#111827", text: "#ffffff" },
    gallery: { align: "center", gap: 12, radius: 14 },
    layout: { cardRadius: 20, padding: 28, bg: "#ffffff" },
    stroke: { color: "#e5e7eb", weight: 1 },
    currentLayout: "A",
  },
  Commerce: {
    typography: { family: "Poppins", weight: 500, size: 18 },
    button: { radius: 20, shadow: "large", align: "center", bg: "#4f46e5", text: "#ffffff" },
    gallery: { align: "center", gap: 14, radius: 16 },
    layout: { cardRadius: 24, padding: 32, bg: "#f9fafb" },
    stroke: { color: "#e2e8f0", weight: 1 },
    currentLayout: "A",
  },
  Contrast: {
    typography: { family: "Roboto", weight: 700, size: 18 },
    button: { radius: 24, shadow: "large", align: "right", bg: "#111827", text: "#fbbf24" },
    gallery: { align: "right", gap: 16, radius: 20 },
    layout: { cardRadius: 28, padding: 32, bg: "#f3f4f6" },
    stroke: { color: "#1f2937", weight: 2 },
    currentLayout: "B",
  },
};

const defaultConfig = structuredClone(presets.Commerce);

const DeviceFrame = ({ device, children }) => {
  const cls = useMemo(() => {
    const base = "mx-auto border border-white/20 bg-white/70 backdrop-blur overflow-hidden shadow-lg";
    if (device === "Desktop") return base + " w-full rounded-2xl";
    if (device === "Tablet") return base + " w-[768px] max-w-full rounded-2xl";
    return base + " w-[390px] max-w-full rounded-3xl";
  }, [device]);
  return <div className={cls}>{children}</div>;
};

const Tag = ({ children }) => (
  <span className="px-2 py-1 text-[10px] rounded-full bg-black/5 border border-black/10">
    {children}
  </span>
);

// --- Layout A (patched) ---
const LayoutA = ({ cfg, palette }) => {
  const btnJustify =
    cfg.button.align === "left" ? "justify-start" :
    cfg.button.align === "center" ? "justify-center" : "justify-end";
  const galleryJustify =
    cfg.gallery.align === "left" ? "justify-start" :
    cfg.gallery.align === "center" ? "justify-center" : "justify-end";

  return (
    <section
      style={{
        backgroundColor: cfg.layout.bg,
        fontFamily: cfg.typography.family,
        padding: cfg.layout.padding  // <- dynamic container padding
      }}
    >
      <div
        className="max-w-5xl mx-auto rounded-3xl border"
        style={{
          borderColor: cfg.stroke.color,
          borderWidth: cfg.stroke.weight,
          borderRadius: cfg.layout.cardRadius, // <- dynamic card radius
          background: "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.8))",
          boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
          padding: cfg.layout.padding   // <- dynamic inner padding
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-[10px] rounded-full bg-black/5 border border-black/10">Featured</span>
              <span className="px-2 py-1 text-[10px] rounded-full bg-black/5 border border-black/10">New</span>
            </div>
            <h1
              style={{ fontWeight: cfg.typography.weight, fontSize: cfg.typography.size + 8 }}
              className="text-gray-900 leading-tight"
            >
              Product Card
            </h1>
            <p style={{ fontSize: cfg.typography.size }} className="text-gray-600">
              Edit typography, spacing, borders and button style. Changes show up immediately.
            </p>
            <div className={`flex ${btnJustify}`}>
              <button
                className={`${shadowMap[cfg.button.shadow]} px-6 py-3 transition-all hover:opacity-95 active:scale-95`}
                style={{
                  background: cfg.button.bg || palette.primary,
                  color: cfg.button.text || palette.textOnPrimary,
                  borderRadius: cfg.button.radius
                }}
              >
                Explore
              </button>
            </div>
          </div>

          <div className={`flex w-full ${galleryJustify}`}>
            <div className="grid grid-cols-3" style={{ gap: cfg.gallery.gap }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <img
                  key={i}
                  alt="demo"
                  className="object-cover w-28 h-20 md:w-32 md:h-24"
                  style={{
                    borderRadius: cfg.gallery.radius,
                    border: `${cfg.stroke.weight}px solid ${cfg.stroke.color}`,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                  }}
                  src={`https://picsum.photos/seed/a${i}/256/192`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Layout B (patched) ---
const LayoutB = ({ cfg, palette }) => {
  const btnJustify =
    cfg.button.align === "left" ? "justify-start" :
    cfg.button.align === "center" ? "justify-center" : "justify-end";
  const galleryJustify =
    cfg.gallery.align === "left" ? "justify-start" :
    cfg.gallery.align === "center" ? "justify-center" : "justify-end";

  return (
    <section
      style={{
        backgroundColor: cfg.layout.bg,
        fontFamily: cfg.typography.family,
        padding: cfg.layout.padding  // <- dynamic container padding
      }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside
          className="md:col-span-1 rounded-2xl border"
          style={{
            borderColor: cfg.stroke.color,
            borderWidth: cfg.stroke.weight,
            borderRadius: cfg.layout.cardRadius, // <- dynamic card radius
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(6px)",
            padding: cfg.layout.padding  // <- dynamic inner padding
          }}
        >
          <h2
            style={{ fontWeight: cfg.typography.weight, fontSize: cfg.typography.size + 6 }}
            className="text-gray-900 mb-2"
          >
            Collection
          </h2>
          <p style={{ fontSize: cfg.typography.size }} className="text-gray-600">
            Sidebar variant with adjustable borders and shadows.
          </p>
          <div className={`mt-5 flex ${btnJustify}`}>
            <button
              className={`${shadowMap[cfg.button.shadow]} px-5 py-2.5 transition-all hover:opacity-95 active:scale-95`}
              style={{
                background: cfg.button.bg || palette.primary,
                color: cfg.button.text || palette.textOnPrimary,
                borderRadius: cfg.button.radius
              }}
            >
              Buy Now
            </button>
          </div>
        </aside>

        <main
          className="md:col-span-2 rounded-2xl border"
          style={{
            borderColor: cfg.stroke.color,
            borderWidth: cfg.stroke.weight,
            borderRadius: cfg.layout.cardRadius, // <- dynamic card radius
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(6px)",
            padding: cfg.layout.padding  // <- dynamic inner padding
          }}
        >
          <div className={`w-full ${galleryJustify} flex`}>
            <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: cfg.gallery.gap }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <img
                  key={i}
                  alt="demo"
                  className="object-cover w-40 h-28 md:w-44 md:h-32"
                  style={{
                    borderRadius: cfg.gallery.radius,
                    border: `${cfg.stroke.weight}px solid ${cfg.stroke.color}`,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                  }}
                  src={`https://picsum.photos/seed/b${i}/320/224`}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};


const Field = ({ label, children, help }) => (
  <div className="space-y-1">
    <div className="text-sm font-medium text-gray-800 flex items-center gap-2">
      <span>{label}</span>
      {help && <span className="text-xs text-gray-400">{help}</span>}
    </div>
    {children}
  </div>
);

const Section = ({ title, children }) => (
  <div className="rounded-2xl p-4 border border-white/30 bg-white/60 backdrop-blur shadow-sm overflow-hidden">
    <h3 className="text-sm font-semibold text-gray-900 mb-3 tracking-wide uppercase">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

//
function PrettyRange({ value, min = 0, max = 100, step = 1, onChange, label, unit = "" }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-xs text-gray-700">
          <span>{label}</span>
          <span>{value}{unit}</span>
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="pretty-range"
          style={{ "--percent": `${percent}%` }}
        />
        <span className="range-bubble" style={{ left: `calc(${percent}% - 0px)` }}>
          {value}{unit}
        </span>
      </div>
    </div>
  );
}
//
export default function App() {
  const [cfg, setCfg] = useState(defaultConfig);
  const [device, setDevice] = useState("Desktop");
  const [theme, setTheme] = useState("Aurora");
  const fileRef = useRef(null);

  const palette = themes[theme];

  const update = (path, value) => {
    setCfg(prev => {
      const next = structuredClone(prev);
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys.at(-1)] = value;
      return next;
    });
  };

  const exportJSON = () => {
    const data = JSON.stringify({ cfg, theme }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ui-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = file => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (parsed.cfg) setCfg(parsed.cfg);
        if (parsed.theme && themes[parsed.theme]) setTheme(parsed.theme);
      } catch {
        alert("Invalid JSON");
      }
    };
    reader.readAsText(file);
  };

  const reset = () => setCfg(structuredClone(defaultConfig));
  const Layout = cfg.currentLayout === "A" ? LayoutA : LayoutB;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${palette.grad}`}>
      <header className={`sticky top-0 z-10 border-b border-white/20 ${themes[theme].surface}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl" style={{ background: palette.accent }} />
            <div>
              <h1 className="text-lg font-semibold">UI Editor</h1>
              <p className="text-xs text-gray-600">Live preview • JSON config • Layout A/B</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select className="border rounded-lg px-3 py-2 text-sm" value={theme} onChange={e => setTheme(e.target.value)}>
              {Object.keys(themes).map(t => <option key={t}>{t}</option>)}
            </select>
            <select className="border rounded-lg px-3 py-2 text-sm" value={device} onChange={e => setDevice(e.target.value)}>
              {["Desktop", "Tablet", "Mobile"].map(d => <option key={d}>{d}</option>)}
            </select>
            <button className="px-3 py-2 text-sm rounded-lg border" onClick={reset}>Reset</button>
            <button className="px-3 py-2 text-sm rounded-lg border" onClick={exportJSON}>Export JSON</button>
            <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={e => e.target.files?.[0] && importJSON(e.target.files[0])} />
            <button className="px-3 py-2 text-sm rounded-lg border" onClick={() => fileRef.current?.click()}>Import JSON</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 p-4">
        <div className="space-y-4">
          {/* Theme */}
<Field label="Theme">
  <div className="flex flex-wrap gap-2">   {/* ← was: flex gap-2 */}
    {Object.keys(themes).map(t => (
      <button
        key={t}
        className={`inline-flex items-center justify-center px-3 py-2 rounded-lg border text-sm whitespace-nowrap min-w-[104px] ${theme === t ? "bg-white/70" : "bg-white/50"}`}
        onClick={() => setTheme(t)}
      >
        {t}
      </button>
    ))}
  </div>
</Field>

{/* Preset */}
<Field label="Preset">
  <div className="flex flex-wrap gap-2">    {/* ← was: flex gap-2 */}
    {Object.keys(presets).map(k => (
      <button
        key={k}
        className="inline-flex items-center justify-center px-3 py-2 rounded-lg border text-sm whitespace-nowrap min-w-[104px] bg-white/60"
        onClick={() => setCfg(structuredClone(presets[k]))}
      >
        {k}
      </button>
    ))}
  </div>
</Field>
{/* Layout Selector */}
<Field label="Layout">
  <div className="flex gap-2">
    {["A", "B"].map(l => (
      <button
        key={l}
        className={`px-3 py-2 rounded-lg border text-sm font-medium ${
          cfg.currentLayout === l
            ? "bg-white/80 text-gray-800 shadow"
            : "bg-white/50 text-gray-600"
        }`}
        onClick={() => update("currentLayout", l)}
      >
        Layout {l}
      </button>
    ))}
  </div>
</Field>


          <Section title="Typography">
            <Field label="Font Family">
              <select className="w-full border rounded-lg px-3 py-2 bg-white/80" value={cfg.typography.family} onChange={e => update("typography.family", e.target.value)}>
                {families.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Font Weight">
              <select className="w-full border rounded-lg px-3 py-2 bg-white/80" value={cfg.typography.weight} onChange={e => update("typography.weight", Number(e.target.value))}>
                {weights.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </Field>
            <Field label="Font Size">
                <PrettyRange
                    value={cfg.typography.size}
                    min={10}
                    max={60}
                    onChange={(v) => update("typography.size", v)}
                    unit="px"
                />
            </Field>

          </Section>

          <Section title="Button">
            <Field label="Button Radius">
            <PrettyRange
                value={cfg.button.radius}
                min={0}
                max={40}
                onChange={(v) => update("button.radius", v)}
                unit="px"
            />
            </Field>

            <Field label="Shadow">
              <select className="w-full border rounded-lg px-3 py-2 bg-white/80" value={cfg.button.shadow} onChange={e => update("button.shadow", e.target.value)}>
                {Object.keys(shadowMap).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Alignment">
              <select className="w-full border rounded-lg px-3 py-2 bg-white/80" value={cfg.button.align} onChange={e => update("button.align", e.target.value)}>
                {["left", "center", "right"].map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
            <Field label="Background Color">
              <input type="color" value={cfg.button.bg} onChange={e => update("button.bg", e.target.value)} />
            </Field>
            <Field label="Text Color">
              <input type="color" value={cfg.button.text} onChange={e => update("button.text", e.target.value)} />
            </Field>
          </Section>

          <Section title="Gallery / Images">
            <Field label="Gallery Alignment">
              <select className="w-full border rounded-lg px-3 py-2 bg-white/80" value={cfg.gallery.align} onChange={e => update("gallery.align", e.target.value)}>
                {["left", "center", "right"].map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
            <Field label="Spacing">
            <PrettyRange
                value={cfg.gallery.gap}
                min={0}
                max={32}
                onChange={(v) => update("gallery.gap", v)}
                unit="px"
            />
            </Field>

            <Field label="Image Radius">
            <PrettyRange
                value={cfg.gallery.radius}
                min={0}
                max={36}
                onChange={(v) => update("gallery.radius", v)}
                unit="px"
            />
            </Field>

          </Section>

          <Section title="General Layout">
            <Field label="Card Corner Radius">
            <PrettyRange
                value={cfg.layout.cardRadius}
                min={0}
                max={36}
                onChange={(v) => update("layout.cardRadius", v)}
                unit="px"
            />
            </Field>

            <Field label="Container Padding">
            <PrettyRange
                value={cfg.layout.padding}
                min={0}
                max={48}
                onChange={(v) => update("layout.padding", v)}
                unit="px"
            />
            </Field>

            <Field label="Section Background">
              <input type="color" value={cfg.layout.bg} onChange={e => update("layout.bg", e.target.value)} />
            </Field>
          </Section>

          <Section title="Stroke / Border">
            <Field label="Stroke Color">
              <input type="color" value={cfg.stroke.color} onChange={e => update("stroke.color", e.target.value)} />
            </Field>
            <Field label="Stroke Weight">
            <PrettyRange
                value={cfg.stroke.weight}
                min={0}
                max={6}
                onChange={(v) => update("stroke.weight", v)}
                unit="px"
            />
            </Field>

          </Section>
        </div>

        <div className={`${themes[theme].surface} rounded-2xl border border-white/30 p-4 shadow-xl`}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-700">Live Preview</div>
            <div className="text-xs text-gray-500">Layout {cfg.currentLayout} • {device}</div>
          </div>
          <DeviceFrame device={device}>
            <div style={{ fontFamily: cfg.typography.family }}>
              <Layout cfg={cfg} palette={palette} />
            </div>
          </DeviceFrame>
        </div>
      </div>

      <footer className="py-6 text-center text-xs text-white/80">
        Polished UI • Themes • Glass panels • Soft shadows
      </footer>
    </div>
  );
}
