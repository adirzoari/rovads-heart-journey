export interface Question {
  id: number;
  text: string;
  type: 'either-or' | 'open';
}

export interface Level {
  id: number;
  title: string;
  emoji: string;
  questions: Question[];
  unlockAt: number; // total questions answered to unlock
}

export interface SpecialCard {
  id: number;
  text: string;
}

export const specialCards: SpecialCard[] = [
  { id: 1, text: "תנו מחמאה על משהו ששמתם לב אליו בחיצוניות או באנרגיה של הצד השני" },
  { id: 2, text: "ספרו על דבר אחד שהפתיע אתכם לטובה בדייט הזה" },
  { id: 3, text: "שתפו בתחושה אחת שעוברת עליכם ממש עכשיו, ברגע זה" },
  { id: 4, text: "מה התכונה הכי בולטת שזיהיתם בצד השני שהייתם רוצים לאמץ לעצמכם?" },
  { id: 5, text: "שתפו בסיפור קצר על רגע של השגחה פרטית שחוויתם לאחרונה" },
  { id: 6, text: "תגידו תודה על משהו ספציפי שהצד השני אמר או עשה בדקות האחרונות" },
  { id: 7, text: "מה הדבר שהכי גורם לכם להרגיש בנוח בשיחה הזו?" },
  { id: 8, text: "מצאו 3 דברים משותפים ב-30 שניות!" },
  { id: 9, text: "תארו את הצד השני במילה אחת – ואז הסבירו למה" },
  { id: 10, text: "שתפו בתפילה קצרה שהייתם רוצים להתפלל ביחד" },
];

export const levels: Level[] = [
  {
    id: 1,
    title: "גישוש מהיר",
    emoji: "⚡",
    unlockAt: 0,
    questions: [
      { id: 101, text: "צפון או דרום?", type: 'either-or' },
      { id: 102, text: "ספר או סרט?", type: 'either-or' },
      { id: 103, text: "מבולגן או מסודר?", type: 'either-or' },
      { id: 104, text: "שיחה או הודעה?", type: 'either-or' },
      { id: 105, text: "חורף או קיץ?", type: 'either-or' },
      { id: 106, text: "שכל או רגש?", type: 'either-or' },
      { id: 107, text: "תפילה בנץ או בשקיעה?", type: 'either-or' },
      { id: 108, text: "ברסלב או חב״ד?", type: 'either-or' },
      { id: 109, text: "יישוב או עיר?", type: 'either-or' },
      { id: 110, text: "לשטוף כלים או לבשל?", type: 'either-or' },
      { id: 111, text: "גן אירועים או אולם?", type: 'either-or' },
      { id: 112, text: "חלבי או בשרי?", type: 'either-or' },
      { id: 113, text: "כפכפים או סנדלים?", type: 'either-or' },
      { id: 114, text: "לעבוד או ללמוד?", type: 'either-or' },
      { id: 115, text: "להתארח או לארח?", type: 'either-or' },
      { id: 116, text: "פשרה או דין?", type: 'either-or' },
      { id: 117, text: "בריכה או ים?", type: 'either-or' },
      { id: 118, text: "טיול או מוזיאון?", type: 'either-or' },
      { id: 119, text: "חוף או דשא?", type: 'either-or' },
      { id: 120, text: "חתולים או כלבים?", type: 'either-or' },
      { id: 121, text: "קפה או תה?", type: 'either-or' },
      { id: 122, text: "מים או מיץ?", type: 'either-or' },
      { id: 123, text: "שירים או ניגונים?", type: 'either-or' },
      { id: 124, text: "לדבר או להקשיב?", type: 'either-or' },
      { id: 125, text: "יום או לילה?", type: 'either-or' },
      { id: 126, text: "משפחה קטנה או גדולה?", type: 'either-or' },
      { id: 127, text: "מלוח או מתוק?", type: 'either-or' },
      { id: 128, text: "קור או חום?", type: 'either-or' },
      { id: 129, text: "בטן-גב או מסלול בטבע?", type: 'either-or' },
      { id: 130, text: "ספונטני או מתוכנן?", type: 'either-or' },
      { id: 131, text: "פזרן או חסכן?", type: 'either-or' },
      { id: 132, text: "שבת בבית או אצל ההורים?", type: 'either-or' },
      { id: 133, text: "סוכות במדבר או בירושלים?", type: 'either-or' },
      { id: 134, text: "תפילה אישית או מתוך סידור?", type: 'either-or' },
      { id: 135, text: "הדלקת נרות מוקדם או מאוחר?", type: 'either-or' },
      { id: 136, text: "חלות מתוקות או מלוחות?", type: 'either-or' },
      { id: 137, text: "מניין קטן או גדול?", type: 'either-or' },
      { id: 138, text: "ראש השנה בארץ או באומן?", type: 'either-or' },
      { id: 139, text: "חסידי או ליטאי?", type: 'either-or' },
      { id: 140, text: "חג בבית או בחו״ל?", type: 'either-or' },
      { id: 141, text: "שבת עם אורחים או שקטה?", type: 'either-or' },
      { id: 142, text: "שיעור תורה או ספר טוב?", type: 'either-or' },
      { id: 143, text: "מעגלי שירה או ניגונים שקטים?", type: 'either-or' },
      { id: 144, text: "ללמוד לבד או בחברותא?", type: 'either-or' },
      { id: 145, text: "צדקה או גמילות חסדים?", type: 'either-or' },
      { id: 146, text: "טיול בארץ או בחו״ל?", type: 'either-or' },
      { id: 147, text: "ספרי מוסר או ספרי אמונה?", type: 'either-or' },
    ],
  },
  {
    id: 2,
    title: "שוברים את הקרח",
    emoji: "🧊",
    unlockAt: 10,
    questions: [
      { id: 201, text: "מה הדבר שהכי הצחיק אותך לאחרונה?", type: 'open' },
      { id: 202, text: "מהי העבודה הכי הזויה שעבדת בה?", type: 'open' },
      { id: 203, text: "איזה חפץ קשור אליך מאוד?", type: 'open' },
      { id: 204, text: "מהי החופשה המושלמת עבורך?", type: 'open' },
      { id: 205, text: "איזה ספר אפשר למצוא בארונית שלך?", type: 'open' },
      { id: 206, text: "למה כדאי להיתקע איתך באי בודד?", type: 'open' },
      { id: 207, text: "מה הדבר הכי משונה והזוי שעשית?", type: 'open' },
      { id: 208, text: "מהו הדבר הכי משוגע שאכלת פעם?", type: 'open' },
      { id: 209, text: "מה הדבר הכי לא צפוי שעשית?", type: 'open' },
      { id: 210, text: "מה הספר האחרון שקראת?", type: 'open' },
      { id: 211, text: "היכן את/ה אוהב/ת לבלות?", type: 'open' },
      { id: 212, text: "מה את/ה עושה בשעות הפנאי?", type: 'open' },
      { id: 213, text: "מה זה ״יום מנוצל״ עבורך?", type: 'open' },
      { id: 214, text: "איך את/ה נוהג/ת לפנק את עצמך?", type: 'open' },
      { id: 215, text: "בשבילי קפה זה...", type: 'open' },
      { id: 216, text: "לא הולך לישון בלי...", type: 'open' },
      { id: 217, text: "מה עושה בילוי חברתי למהנה בעיניך?", type: 'open' },
      { id: 218, text: "האם היית רוצה להיות מפורסם? ולמה?", type: 'open' },
      { id: 219, text: "במה השם שלך מייצג אותך?", type: 'open' },
      { id: 220, text: "איזה חוויה או מקום שראית הרשים אותך מאוד?", type: 'open' },
    ],
  },
  {
    id: 3,
    title: "צוללים לעומק",
    emoji: "💎",
    unlockAt: 20,
    questions: [
      { id: 301, text: "איך את/ה רואה את הבית שלך בעתיד?", type: 'open' },
      { id: 302, text: "מה את/ה מחפש/ת בזוגיות?", type: 'open' },
      { id: 303, text: "מה המוטו שלך לחיים?", type: 'open' },
      { id: 304, text: "באיזו החלטה שקיבלת את/ה הכי גאה?", type: 'open' },
      { id: 305, text: "מה הדבר הראשון שעובר לך בראש כשאת/ה חושב/ת על העתיד?", type: 'open' },
      { id: 306, text: "איך את/ה נוהג/ת להראות אהבה?", type: 'open' },
      { id: 307, text: "מהי מטרת החיים לדעתך?", type: 'open' },
      { id: 308, text: "מה הדבר שהכי היית רוצה לעשות? ולמה?", type: 'open' },
      { id: 309, text: "איזה זיכרון מיוחד חרוט בזיכרונך?", type: 'open' },
      { id: 310, text: "איזו תכונה הכי בולטת אצלך?", type: 'open' },
      { id: 311, text: "אם יכולת לקבל תכונה אחת לעצמך, מה היית מבקש/ת?", type: 'open' },
      { id: 312, text: "איזו משאלה היית רוצה להגשים?", type: 'open' },
      { id: 313, text: "מה אתה הכי אוהב בעצמך?", type: 'open' },
      { id: 314, text: "מה הדבר שאתה הכי מעריך אצל אנשים?", type: 'open' },
      { id: 315, text: "איזה ערך הוא מבחינתך הכי חשוב?", type: 'open' },
      { id: 316, text: "איזו דמות השפיעה עליך מאוד?", type: 'open' },
      { id: 317, text: "איזה לימוד לקחת איתך לחיים?", type: 'open' },
      { id: 318, text: "ספר על חוויה משמעותית בחייך", type: 'open' },
      { id: 319, text: "אם יכולת לתקן מידה אחת בעצמך, מה היית מתקן/ת?", type: 'open' },
      { id: 320, text: "איזה תקופה בחיים הייתה עבורך הכי משמעותית?", type: 'open' },
      { id: 321, text: "מה ההישג הגדול ביותר של חייך?", type: 'open' },
      { id: 322, text: "עד כמה סדר וארגון חשובים לך בבית?", type: 'open' },
      { id: 323, text: "איך נראה יום מושלם עם בן/בת הזוג?", type: 'open' },
      { id: 324, text: "מה יותר חשוב לך בזוגיות – תקשורת טובה או תחומי עניין משותפים?", type: 'open' },
      { id: 325, text: "בשבילי אחים זה...", type: 'open' },
      { id: 326, text: "מה הדבר שהכי מרגש אותך כשעושים למענך?", type: 'open' },
      { id: 327, text: "איפה היית רוצה להיות בעוד 10 שנים?", type: 'open' },
      { id: 328, text: "במה את/ה רוצה לעבוד בעתיד?", type: 'open' },
      { id: 329, text: "אם לא היו לך מגבלות כלכליות, באיזה עיסוק היית בוחר/ת?", type: 'open' },
      { id: 330, text: "אם יכולת לפתח כישרון חדש, איזה היית בוחר/ת?", type: 'open' },
      { id: 331, text: "מה החלום שלך?", type: 'open' },
      { id: 332, text: "כשאני כועס אני...", type: 'open' },
      { id: 333, text: "אני שמח כאשר...", type: 'open' },
      { id: 334, text: "בזמן לחץ אני...", type: 'open' },
      { id: 335, text: "מה מכעיס אותך?", type: 'open' },
      { id: 336, text: "ממה את/ה הכי חושש/ת?", type: 'open' },
      { id: 337, text: "איזו תקופה בחיים היית מעדיף לשכוח?", type: 'open' },
    ],
  },
];

export const getTotalQuestions = () => {
  return levels.reduce((sum, level) => sum + level.questions.length, 0);
};
