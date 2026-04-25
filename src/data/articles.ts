import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";
import news6 from "@/assets/news-6.jpg";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  authorId: string;
  publishedAt: string;
  readTime: string;
  body: string[];
};

export const authors = [
  {
    id: "ankit-sharma",
    name: "अंकित शर्मा",
    bio: "राजनीतिक पत्रकार। पिछले 10 साल से दिल्ली से रिपोर्टिंग। JNU से पत्रकारिता में स्नातक।",
    avatar: "AS",
  },
  {
    id: "neha-verma",
    name: "नेहा वर्मा",
    bio: "खेल और मनोरंजन की दुनिया पर पैनी नज़र। क्रिकेट और बॉलीवुड पर विशेष लेखन।",
    avatar: "NV",
  },
  {
    id: "rahul-mishra",
    name: "राहुल मिश्रा",
    bio: "बिज़नेस और टेक्नोलॉजी रिपोर्टर। स्टार्टअप इकोसिस्टम और मार्केट पर लिखते हैं।",
    avatar: "RM",
  },
];

export const articles: Article[] = [
  {
    slug: "delhi-rally-2024",
    title: "दिल्ली में ऐतिहासिक रैली, लाखों की भीड़ ने भरा हुंकार",
    summary: "राजधानी में आज की महारैली ने राजनीतिक समीकरण बदल दिए। जानिए पूरा विश्लेषण।",
    category: "राजनीति",
    image: news1,
    authorId: "ankit-sharma",
    publishedAt: "2 घंटे पहले",
    readTime: "5 मिनट",
    body: [
      "दिल्ली के रामलीला मैदान में आज जो दृश्य देखने को मिला, वह पिछले एक दशक में सबसे बड़ी राजनीतिक सभाओं में से एक मानी जा रही है। सुबह से ही देश के अलग-अलग हिस्सों से लोगों का आना शुरू हो गया था।",
      "आयोजकों के मुताबिक करीब 8 लाख से अधिक लोग इस रैली में शामिल हुए। मंच से कई बड़ी घोषणाएँ की गईं जो आने वाले चुनावों में निर्णायक भूमिका निभा सकती हैं।",
      "विशेषज्ञों का मानना है कि यह रैली केवल शक्ति प्रदर्शन नहीं थी, बल्कि एक स्पष्ट राजनीतिक संदेश था कि ज़मीनी स्तर पर माहौल बदल रहा है।",
    ],
  },
  {
    slug: "india-cricket-victory",
    title: "भारत की धमाकेदार जीत, ऑस्ट्रेलिया को 7 विकेट से हराया",
    summary: "वानखेड़े स्टेडियम में टीम इंडिया का शानदार प्रदर्शन। कप्तान का अर्धशतक।",
    category: "खेल",
    image: news2,
    authorId: "neha-verma",
    publishedAt: "4 घंटे पहले",
    readTime: "3 मिनट",
    body: [
      "मुंबई के वानखेड़े स्टेडियम में खेले गए तीसरे वनडे मैच में भारत ने ऑस्ट्रेलिया को 7 विकेट से हराकर सीरीज़ अपने नाम कर ली।",
      "टीम इंडिया के कप्तान ने 78 रनों की शानदार पारी खेली और गेंदबाज़ों ने भी कमाल का प्रदर्शन किया। तेज़ गेंदबाज़ ने 4 विकेट चटकाए।",
    ],
  },
  {
    slug: "mumbai-monsoon-update",
    title: "मुंबई में मूसलाधार बारिश, लोकल ट्रेन सेवा प्रभावित",
    summary: "महानगर में 24 घंटों से रुक-रुक कर बारिश। निचले इलाकों में जलभराव।",
    category: "शहर",
    image: news3,
    authorId: "ankit-sharma",
    publishedAt: "6 घंटे पहले",
    readTime: "4 मिनट",
    body: [
      "मुंबई में पिछले 24 घंटों से लगातार हो रही बारिश ने जनजीवन अस्त-व्यस्त कर दिया है। कई निचले इलाकों में पानी भर गया है।",
      "BMC ने हाई अलर्ट जारी किया है और लोगों से घरों में रहने की अपील की है। हार्बर लाइन पर ट्रेन सेवा 2 घंटे से बंद है।",
    ],
  },
  {
    slug: "agritech-revolution",
    title: "गांव-गांव पहुंची तकनीक, किसानों की बदल रही ज़िंदगी",
    summary: "AI और सैटेलाइट से कैसे बढ़ रही है फसल की पैदावार। ग्राउंड रिपोर्ट।",
    category: "टेक्नोलॉजी",
    image: news4,
    authorId: "rahul-mishra",
    publishedAt: "8 घंटे पहले",
    readTime: "7 मिनट",
    body: [
      "उत्तर प्रदेश के एक छोटे से गांव में किसान अब टैबलेट से अपनी फसल की निगरानी कर रहे हैं। AgriTech स्टार्टअप्स ने तस्वीर बदल दी है।",
      "सैटेलाइट डेटा और AI की मदद से किसान सही समय पर सिंचाई और कीटनाशक का इस्तेमाल कर पा रहे हैं, जिससे पैदावार 30% तक बढ़ी है।",
    ],
  },
  {
    slug: "bollywood-blockbuster",
    title: "बॉलीवुड का नया धमाका, पहले दिन ही 50 करोड़ की कमाई",
    summary: "इस साल की सबसे बड़ी ओपनिंग। थिएटर्स में हाउसफुल का बोर्ड।",
    category: "मनोरंजन",
    image: news5,
    authorId: "neha-verma",
    publishedAt: "12 घंटे पहले",
    readTime: "3 मिनट",
    body: [
      "इस शुक्रवार रिलीज़ हुई फिल्म ने बॉक्स ऑफिस पर तहलका मचा दिया है। पहले ही दिन 50 करोड़ रुपए की कमाई कर डाली।",
      "क्रिटिक्स ने भी फिल्म की जमकर तारीफ की है। निर्देशक का यह तीसरा प्रयास सुपरहिट साबित हो रहा है।",
    ],
  },
  {
    slug: "sensex-record-high",
    title: "सेंसेक्स ने तोड़े सारे रिकॉर्ड, पहली बार 80 हज़ार के पार",
    summary: "बाज़ार में जश्न का माहौल। निवेशकों को मिला बड़ा रिटर्न।",
    category: "बिज़नेस",
    image: news6,
    authorId: "rahul-mishra",
    publishedAt: "1 दिन पहले",
    readTime: "5 मिनट",
    body: [
      "भारतीय शेयर बाज़ार ने आज इतिहास रच दिया। सेंसेक्स पहली बार 80,000 के स्तर के पार बंद हुआ।",
      "विदेशी निवेशकों की लगातार खरीदारी और मज़बूत आर्थिक संकेतकों के चलते बाज़ार में तेज़ी देखी जा रही है।",
    ],
  },
];

export const getAuthor = (id: string) => authors.find((a) => a.id === id);
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getArticlesByAuthor = (authorId: string) =>
  articles.filter((a) => a.authorId === authorId);
