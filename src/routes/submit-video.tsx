import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Youtube, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/submit-video")({
  head: () => ({ meta: [{ title: "वीडियो से आर्टिकल बनाएं — खबरतक" }] }),
  component: SubmitVideo,
});

const SAMPLE = `नमस्कार दोस्तों, आज हम बात करेंगे भारत की बदलती अर्थव्यवस्था के बारे में। पिछले एक दशक में देश ने जो छलांग लगाई है, वह वाकई काबिले-तारीफ है।

हमने देखा कि कैसे डिजिटल इंडिया मिशन ने गांव-गांव तक इंटरनेट पहुंचाया। UPI ने पेमेंट सिस्टम को बदल दिया। आज हर महीने 10 अरब से ज़्यादा ट्रांज़ैक्शन हो रहे हैं।

स्टार्टअप इकोसिस्टम भी तेज़ी से बढ़ा है। भारत आज दुनिया का तीसरा सबसे बड़ा स्टार्टअप हब बन चुका है। 100 से ज़्यादा यूनिकॉर्न कंपनियां यहां हैं।

लेकिन चुनौतियां भी कम नहीं हैं। महंगाई, बेरोज़गारी और इनकम असमानता पर ध्यान देने की ज़रूरत है। आने वाले सालों में सरकार और प्राइवेट सेक्टर को मिलकर काम करना होगा।`;

function SubmitVideo() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleGenerate = () => {
    if (!url) return;
    setLoading(true);
    setTranscript("");
    setTimeout(() => {
      setTranscript(SAMPLE);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
        <Sparkles className="h-3.5 w-3.5" /> AI टूल
      </div>
      <h1 className="text-3xl font-black text-ink md:text-5xl">
        YouTube वीडियो से <span className="text-brand">हिंदी आर्टिकल</span>
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        किसी भी YouTube वीडियो का लिंक पेस्ट करें, हम उसे पढ़ने योग्य हिंदी आर्टिकल में बदल देंगे।
      </p>

      <div className="mt-8 rounded-md border border-border bg-card p-6 shadow-sm">
        <label className="mb-2 block text-sm font-bold text-ink">YouTube वीडियो लिंक</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Youtube className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand" />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full rounded-md border border-input bg-background py-3 pl-11 pr-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !url}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-bold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "बनाया जा रहा है..." : "आर्टिकल बनाएं"}
          </button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          डेमो: कोई भी लिंक डालें और सैंपल हिंदी ट्रांसक्रिप्ट देखें।
        </p>
      </div>

      {transcript && (
        <div className="mt-8 rounded-md border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-xl font-black text-ink">तैयार आर्टिकल</h2>
            <button
              onClick={() => navigator.clipboard.writeText(transcript)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
            >
              कॉपी करें
            </button>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-foreground">
            {transcript.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
