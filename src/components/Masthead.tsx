import { Link } from "@tanstack/react-router";

const HINDI_DAYS = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
const HINDI_MONTHS = [
  "जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून",
  "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर",
];

function formatHindiDate(d: Date) {
  return `${HINDI_DAYS[d.getDay()]}, ${d.getDate()} ${HINDI_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function Masthead() {
  const today = new Date();
  const dateStr = formatHindiDate(today);
  const enDate = today.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <section className="border-b-4 border-double border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-3">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>स्थापना • २०२५</span>
          <span className="hidden sm:inline">हिंदी दैनिक • स्वतंत्र पत्रकारिता</span>
          <span>मूल्य ₹ ०</span>
        </div>

        <Link to="/" className="block text-center">
          <h1 className="masthead-title mt-2 text-6xl text-ink sm:text-7xl md:text-8xl">
            अख़बार
          </h1>
          <p className="mt-1 font-serif-display text-sm italic text-muted-foreground sm:text-base">
            Akhbaar — सच्ची खबर, साफ़ शब्दों में
          </p>
        </Link>

        <div className="divider-double mt-4 flex flex-col items-center justify-between gap-1 text-xs font-semibold text-ink sm:flex-row sm:text-sm">
          <span className="font-serif-display italic">आज का अख़बार</span>
          <span className="tracking-wide">{dateStr}</span>
          <span className="hidden font-serif-display italic sm:inline">{enDate}</span>
        </div>
      </div>
    </section>
  );
}
