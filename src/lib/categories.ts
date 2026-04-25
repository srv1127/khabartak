export type CategoryKey =
  | "weather"
  | "health"
  | "education"
  | "ai_knowledge"
  | "gapshap"
  | "motivation"
  | "student_motivators";

export type Category = {
  key: CategoryKey;
  hindi: string;
  slug: string;
  tagline: string;
};

export const CATEGORIES: Category[] = [
  { key: "weather", hindi: "मौसम", slug: "weather", tagline: "देश-दुनिया का ताज़ा मौसम और चेतावनियाँ" },
  { key: "health", hindi: "स्वास्थ्य", slug: "health", tagline: "सेहत, फिटनेस और मेडिकल अपडेट्स" },
  { key: "education", hindi: "शिक्षा", slug: "education", tagline: "परीक्षा, करियर और शिक्षा जगत की खबरें" },
  { key: "ai_knowledge", hindi: "AI ज्ञान", slug: "ai-knowledge", tagline: "आर्टिफिशियल इंटेलिजेंस की दुनिया हिंदी में" },
  { key: "gapshap", hindi: "गपशप", slug: "gapshap", tagline: "मनोरंजन, सेलेब्स और हल्की-फुल्की बातें" },
  { key: "motivation", hindi: "प्रेरक कहानियाँ", slug: "motivation", tagline: "ज़िंदगी बदल देने वाली असली कहानियाँ" },
  { key: "student_motivators", hindi: "स्टूडेंट प्रेरक", slug: "student-motivators", tagline: "वो लोग जो छात्रों को आगे बढ़ने की प्रेरणा देते हैं" },
];

export const getCategoryByKey = (key: string) => CATEGORIES.find((c) => c.key === key);
export const getCategoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const getCategoryHindi = (key: string) => getCategoryByKey(key)?.hindi ?? key;
