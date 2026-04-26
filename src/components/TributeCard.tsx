export function TributeCard() {
  return (
    <aside className="relative overflow-hidden rounded-sm border-2 border-double border-ink bg-paper p-6 shadow-sm">
      <div className="absolute right-3 top-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        समर्पित • In Memoriam
      </div>
      <div className="mb-2 font-serif-display text-xs italic text-brand">
        ॥ श्रद्धांजलि ॥
      </div>
      <h2 className="font-serif-display text-2xl font-black leading-tight text-ink sm:text-3xl">
        स्वर्गीय श्री हिम्मत राम विश्वकर्मा जी
      </h2>
      <p className="mt-1 text-sm italic text-muted-foreground">
        Late Shri Himmat Ram Vishwakarma — मेरे आदर्श, मेरे दादा जी
      </p>

      <div className="my-4 h-px w-16 bg-ink" />

      <p className="font-serif-display text-[15px] leading-relaxed text-foreground/90">
        वे एक अत्यंत अनुशासित, परिश्रमी और ज्ञानवान व्यक्ति थे — जिन्हें मैंने सदा
        लोगों के लिए जीते देखा। उन्होंने अपने जीवन में <strong>तीन सरकारी सेवाएँ</strong>
        निभाईं, और फिर जनता के अधिकारों के लिए <strong>राजनीति</strong> में कदम रखा।
        हर दिन सुबह अख़बार पढ़ना उनकी आदत थी — नई बातें सीखने की उनकी जिज्ञासा कभी
        कम नहीं हुई।
      </p>

      <p className="mt-3 font-serif-display text-[15px] leading-relaxed text-foreground/90">
        यह छोटा-सा अख़बार उन्हीं की याद में, उनके पोते <strong>सौरभ</strong> द्वारा
        बनाया गया है — ताकि उनकी ज्ञान-पिपासा और जनसेवा की भावना हर पाठक तक पहुँचे।
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-dashed border-sepia pt-3 text-xs text-muted-foreground">
        <span className="font-serif-display italic">— सौरभ विश्वकर्मा</span>
        <span className="uppercase tracking-widest">पोते की ओर से</span>
      </div>
    </aside>
  );
}
