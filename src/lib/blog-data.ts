export interface BlogPost {
  slug: string;
  titleEn: string;
  titleFa: string;
  excerptEn: string;
  excerptFa: string;
  contentEn: string[];
  contentFa: string[];
  date: string;
  categoryEn: string;
  categoryFa: string;
  readTimeMin: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'understanding-ipl-technology',
    titleEn: 'Understanding IPL Technology',
    titleFa: 'آشنایی با فناوری IPL',
    excerptEn:
      'Intense Pulsed Light (IPL) is a broadband light technology used for at-home hair reduction. Learn how melanin absorption and targeted wavelengths make IPL effective on darker hair.',
    excerptFa:
      'نور پالسی شدید (IPL) یک فناوری نور گسترده برای کاهش موهای زائد در خانه است. یاد بگیرید چگونه جذب ملانین و طول موج‌های هدفمند IPL را روی موهای تیره مؤثر می‌سازد.',
    date: '2025-07-01',
    categoryEn: 'Science',
    categoryFa: 'علم',
    readTimeMin: 5,
    contentEn: [
      'Intense Pulsed Light, commonly abbreviated as IPL, is a non-laser light-based technology that has become widely adopted for at-home hair reduction. Unlike traditional laser devices that emit a single, focused wavelength of light, IPL devices produce a broad spectrum of wavelengths — typically in the range of 510 to 1200 nanometers. This broad-spectrum approach allows the light to penetrate the skin at varying depths, reaching the melanin-rich hair follicles beneath the surface.',
      'The fundamental mechanism behind IPL hair-reduction relies on selective photothermolysis. Melanin, the natural pigment that gives hair its color, selectively absorbs the light energy emitted by the device. When the melanin in the hair shaft and surrounding follicle absorbs this energy, it converts it into heat. This localized heating gently disrupts the hair follicle and interferes with its growth cycle, specifically targeting hair in the active anagen (growth) phase.',
      'IPL technology is most effective on darker hair colors — specifically brown and black hair — because these hair types contain higher concentrations of melanin. Lighter hair colors such as blonde, red, gray, and white have significantly less melanin, making them poor absorbers of the light energy. As a result, IPL hair-reduction is not considered effective on these lighter hair colors, regardless of skin tone.',
      'Modern IPL devices incorporate features such as integrated cooling systems to enhance user comfort, smart skin sensors that ensure light is only emitted when proper skin contact is detected, and adjustable intensity levels that allow users to personalize their treatment. The wavelength range of 510–1100 nm is designed to balance effective melanin absorption with safety for Fitzpatrick skin tones I through V. It is important to note that IPL is a hair-reduction technology, not a hair-removal technology. Individual results vary based on hair color, skin tone, hormonal factors, and treatment consistency.',
    ],
    contentFa: [
      'نور پالسی شدید که معمولاً به صورت IPL مخفف می‌شود، یک فناوری مبتنی بر نور غیرلیزری است که به‌ورود گسترده‌ای برای کاهش موهای زائد در خانه استتفاده می‌شود. برخلاف دستگاه‌های لیزری سنتی که یک طول موج متمرکز ساطع می‌کنند، دستگاه‌های IPL طیف وسیعی از طول موج‌ها در محدوده 510 تا 1200 نانومتر تولید می‌کنند.',
      'مکانیزم اساسی کاهش مو با IPL بر فوتوترمولیز انتخابی متکی است. ملانین، رنگدانه طبیعی که رنگ مو را تعیین می‌کند، انرژی نوری ساطع‌شده توسط دستگاه را به‌وروز انتخابی جذب می‌کند. وقتی ملانین در ساقته مو و فولیکل اطراف آن این انرژی را جذب می‌کند، آن را به گرما تبدیل می‌کند. این گرمایش موضعی به آرامی فولیکل مو را مختل کرده و با چرخه رشد آن تداخل می‌کند.',
      'فناوری IPL بیشترین اثربخشی را روی رنگ‌های تیره‌تر مو دارد زیرا این انواع مو غلظت بالاتری از ملانین دارند. رنگ‌های روشن‌تر مو مانند بلوند، قرمز، خاکستری و سفید ملانین بسیار کمتری دارند و جذب‌کننده‌های ضعیف انرژی نوری هستند. در نتیجه، کاهش مو با IPL روی این رنگ‌های روشن مؤثر در نظر گرفته نمی‌شود.',
      'دستگاه‌های IPL مدرن ویژگی‌هایی مانند سیستم خنک‌کننده یکپارچه، سنسور هوشمند پوست و سطوح شدت قابل تنظیم را ارائه می‌دهند. محدوده طول موج 510 تا 1100 نانومتر برای تعادل بین جذب مؤثر ملانین و ایمنی برای تناژهای پوست فیتزپاتریک I تا V طراحی شده است. این نکته مهم است که IPL یک فناوری کاهش مو است، نه حذف مو. نتایج فردی بر اساس رنگ مو، تناژ پوست، عوامل هورمونی و یکنواختی درمان متفاوت است.',
    ],
  },
  {
    slug: 'preparing-for-first-ipl-session',
    titleEn: 'Preparing for Your First IPL Session',
    titleFa: 'آماده‌سازی برای اولین جلسه IPL',
    excerptEn:
      'A step-by-step preparation guide for your first at-home IPL treatment. Learn about shaving, skin preparation, patch testing, and selecting the right intensity level.',
    excerptFa:
      'راهنمای گام‌به‌گام آماده‌سازی برای اولین درمان IPL خانگی. درباره اصلاح، آماده‌سازی پوست، تست حساسیت و انتخاب سطح شدت مناسب بیشتر بدانید.',
    date: '2025-07-03',
    categoryEn: 'Guide',
    categoryFa: 'راهنما',
    readTimeMin: 4,
    contentEn: [
      'Preparing properly before your first IPL hair-reduction session can contribute to a more comfortable experience. The most important step is to shave the treatment area approximately 24 hours before your planned session. Shaving removes the hair above the skin surface while leaving the hair shaft and follicle intact beneath the skin — this is precisely where the IPL light energy needs to reach. Avoid waxing, plucking, or epilating, as these methods remove the hair root and follicle, leaving no melanin target for the light to absorb.',
      'On the day of your session, ensure your skin is clean, completely dry, and free of any lotions, deodorants, makeup, perfumes, or skincare products. Any substance on the skin surface can interfere with light transmission or cause unwanted reactions. It is also important to avoid recent sun exposure — if you have been in strong sunlight or used a tanning bed within the past two weeks, it is advisable to postpone your IPL session. Tanned skin carries a higher risk of adverse reactions because it contains more melanin at the surface.',
      'Before treating a large area for the first time, it is strongly recommended to perform a patch test. Select a small, discreet area of skin and apply one flash at the lowest intensity setting. Wait 24 to 48 hours and observe the area for any unusual reactions. If no adverse reactions occur, you can proceed with your full treatment. Additionally, review any medications you are taking — certain photosensitizing medications can increase skin sensitivity to light.',
      'When you are ready to begin, select the lowest intensity level for your first session. During the treatment, you can expect to feel a warm sensation on the skin, similar to a rubber band snapping lightly against the surface. After a few treatments, you can gradually increase the intensity to the highest level that remains comfortable. Position the device firmly against the treatment area, ensuring full contact with the skin surface, and treat each area once per week for the initial phase.',
    ],
    contentFa: [
      'آماده‌سازی صحیح قبل از اولین جلسه کاهش مو با IPL می‌تواند به تجربه‌ای راحت‌تر کمک کند. مهم‌ترین مرحله این است که ناحیه درمان را تقریباً 24 ساعت قبل از جلسه بتراشید. اصلاح موهای بالای سطح پوست را حذف کرده و ساقته و فولیکل مو را در زیر پوست باقی می‌گذارد. از اپیلاسیون، بندانداختن یا موم اجتناب کنید زیرا این روش‌ها ریشه و فولیکل مو را حذف کرده و هدف ملانینی برای جذب نور باقی نمی‌گذارند.',
      'در روز جلسه، مطمئن شوید پوست شما تمیز، کاملاً خشک و بدون هرگونه لوسیون، دئودورانت، آرایش، عطر یا محصولات مراقبت از پوست است. هرگونه ماده روی سطح پوست می‌تواند در انتقال نور تداخل ایجاد کند. همچنین از تماس اخیر با نور آفتاب اجتناب کنید. اگر در دو هفته گذشته در معرض نور شدید آفتاب یا سولاریوم بوده‌اید، به تأخیر انداختن جلسه IPL توصیه می‌شود. پوست برنزه خطر عوارض جانبی بیشتری دارد.',
      'قبل از درمان یک ناحیه بزرگ برای اولین بار، انجام تست حساسیت به‌شدت توصیه می‌شود. یک ناحیه کوچک و نامحسوس از پوست را انتخاب کرده و یک فلش در پایین‌ترین سطح شدت اعمال کنید. 24 تا 48 ساعت صبر کرده و ناحیه را بررسی کنید. اگر هیچ واکنش نامطلوبی رخ نداد، می‌توانید به درمان کامل ادامه دهید. همچنین داروهای مصرفی خود را بررسی کنید زیرا برخی داروهای حساس‌کننده به نور می‌توانند حساسیت پوست را افزایش دهند.',
      'وقتی آماده شروع شدید، پایین‌ترین سطح شدت را برای اولین جلسه انتخاب کنید. در هنگام درمان، ممکن است حس گرمی روی پوست حس کنید، مشابه ضربه خفیف استیک به سطح پوست. پس از چند درمان، می‌توانید تدریجاً شدت را تا بالاترین سطحی که برای پوست شما راحت است افزایش دهید. دستگاه را محکم روی ناحیه درمان قرار داده و تماس کامل با سطح پوست را تضمین کنید.',
    ],
  },
  {
    slug: 'ipl-aftercare-best-practices',
    titleEn: 'IPL Aftercare Best Practices',
    titleFa: 'بهترین روش‌های مراقبت پس از IPL',
    excerptEn:
      'Post-treatment care is essential for comfort and optimal results. Learn about moisturizing, sun protection, managing mild redness, and scheduling follow-up sessions.',
    excerptFa:
      'مراقبت پس از درمان برای راحتی و بهترین نتایج ضروری است. درباره مرطوب‌سازی، محافظت از آفتاب، مدیریت قرمزی خفیف و برنامه‌ریزی جلسات بعدی بیشتر بدانید.',
    date: '2025-07-05',
    categoryEn: 'Guide',
    categoryFa: 'راهنما',
    readTimeMin: 4,
    contentEn: [
      'After completing an IPL hair-reduction session, proper aftercare helps support skin comfort. The most common immediate aftereffect is mild redness in the treated area, which typically resolves within a few hours. Applying a gentle, fragrance-free moisturizer or aloe vera gel can help soothe the skin. Avoid applying any harsh chemicals, exfoliants, retinoids, or active skincare ingredients to the treated area for at least 24 hours, as the skin may be temporarily more sensitive.',
      'Sun protection is particularly important following IPL treatment. The treated skin may be more susceptible to UV damage, so applying a broad-spectrum sunscreen with SPF 30 or higher is strongly recommended when going outdoors. If possible, avoid direct sun exposure on treated areas for at least 48 hours after each session. Wearing protective clothing and seeking shade are additional precautions that can help minimize the risk of pigmentation changes.',
      'In the days following treatment, you may notice that treated hairs begin to shed naturally. This is a normal part of the process and is not a cause for concern. The hair appears to grow out as the follicle releases it. You can gently shave as needed between sessions — but never wax or pluck, as this would remove the hair root that IPL needs to target in subsequent sessions.',
      'For scheduling, treat each area once per week for the initial phase, then allow at least one week between sessions. As you observe a reduction in hair density, you can gradually space out your sessions. Many users transition to maintenance treatments once per month or less frequently after the initial phase. Consistency is a commonly cited factor in achieving satisfactory results, so try to maintain a regular treatment schedule. If you experience any persistent discomfort, blistering, or unusual skin reactions beyond mild redness, discontinue use and consult a healthcare professional.',
    ],
    contentFa: [
      'پس از تکمیل یک جلسه کاهش مو با IPL، مراقبت صحیح به راحتی پوست کمک می‌کند. شایع‌ترین عارضه فوری قرمزی خفیف در ناحیه درمان‌شده است که معمولاً در طول چند ساعت برطرف می‌شود. استفاده از یک مرطوب‌کننده ملایم بدون عطر یا ژل آلوه‌ورا می‌تواند به آرام کردن پوست کمک کند. از اعمال هرگونه شیمیایی سخت، لیفت‌کننده، رتینوئیدها یا مواد مراقبت از پوست فعال به ناحیه درمان‌شده برای حداقل 24 ساعت اجتناب کنید.',
      'محافظت از آفتاب پس از درمان IPL به‌ویژه مهم است. پوست درمان‌شده ممکن است حساس‌تر به آسیب UV باشد، بنابراین استفاده از کرم انتخابی با SPF 30 یا بالاتر هنگام خروج از خانه به‌شدت توصیه می‌شود. اگر ممکن است، از تماس مستقیم با آفتاب بر روی نواحی درمان‌شده برای حداقل 48 ساعت اجتناب کنید. پوشیدن لباس محافظتی و جستجوی سایه اقدامات تکمیلی مفیدی هستند.',
      'در روزهای پس از درمان، ممکن است متوجه شوید که موهای درمان‌شده شروع به ریزش طبیعی می‌کنند. این بخشی طبیعی فرآیند است و نیازی به نگرانی نیست. می‌توانید بین جلسات در صورت لزوم بتراشید — اما هرگز موم یا بند نکنید زیرا این کار ریشه مویی را که IPL در جلسات بعدی به آن نیاز دارد حذف می‌کند.',
      'برای برنامه‌ریزی، هر ناحیه را در مرحله اولیه هفته‌ای یکبار درمان کنید، سپس حداقل یک هفته بین جلسات فاصله بیندازید. هنگام کاهش در تراکم مو مشاهده کردید، می‌توانید تدریجاً فاصله جلسات را بیشتر کنید. بسیاری از کاربران پس از مرحله اولیه به درمان‌های نگهداری ماهانه یا کمتر منتقل می‌شوند. اگر دچار ناراحتی مداوم، تولید تال یا واکنش‌های غیرعادی پوست شدید، استفاده را متوقف کرده و با یک متخصص بهداشت مشورت کنید.',
    ],
  },
  {
    slug: 'ipl-vs-laser-difference',
    titleEn: 'IPL vs Laser: What’s the Difference?',
    titleFa: 'IPL در برابر لیزر: تفاوت چیست؟',
    excerptEn:
      'Understanding the key differences between IPL and laser hair-reduction technologies. Compare wavelength, cost, convenience, and suitability to make an informed choice.',
    excerptFa:
      'درک تفاوت‌های کلیدی بین فناوری‌های IPL و لیزر. مقایسه طول موج، هزینه، راحتی و مناسبت برای انتخاب آگاهانه.',
    date: '2025-07-07',
    categoryEn: 'Science',
    categoryFa: 'علم',
    readTimeMin: 6,
    contentEn: [
      'One of the most common questions in light-based hair reduction is the difference between IPL and laser technologies. While both approaches rely on the principle of selective photothermolysis — using light energy absorbed by melanin to target hair follicles — they differ significantly in how that light is generated and delivered. Laser devices emit a single, coherent wavelength of light, which is highly focused and can be precisely calibrated for specific tissue depths. IPL devices, by contrast, emit a broad spectrum of light across multiple wavelengths simultaneously.',
      'This difference in light delivery has practical implications. Lasers, with their single-wavelength precision, are often used in professional clinical settings and can be highly effective for specific combinations of skin tone and hair color. However, professional laser treatments typically require multiple sessions at a clinic, each costing significantly more than a home IPL session. IPL devices, on the other hand, are designed for at-home use, offering greater convenience and a lower cost per session. The broad-spectrum nature of IPL means it can address a wider area with each flash, potentially making session times shorter for large treatment areas.',
      'It is important to clarify that Mercury GP uses IPL technology, not laser technology. IPL and laser are distinct technologies, and conflating the two can lead to incorrect expectations. IPL uses a xenon flash lamp to produce broad-spectrum pulsed light, while laser devices use stimulated emission from a specific medium to produce monochromatic light. Both technologies target melanin, but the mechanisms of light generation, the nature of the light produced, and the typical use settings are fundamentally different.',
      'When choosing between IPL and professional laser treatment, consider factors such as convenience, budget, skin tone, hair color, and the areas you wish to treat. Home-use IPL devices like Mercury GP offer the advantage of treating on your own schedule without clinic visits, with no ongoing costs for replacement cartridges in the case of unlimited flash designs. Professional laser treatments may offer more targeted energy delivery but come at a substantially higher cost and require visits to a trained practitioner. Both approaches yield variable results depending on individual factors, and neither should be described as offering assured outcomes. Always consult the instruction manual and a qualified professional when making decisions about hair-reduction treatments.',
    ],
    contentFa: [
      'یکی از شایع‌ترین سؤالات در کاهش مو مبتنی بر نور تفاوت بین فناوری‌های IPL و لیزر است. در حالی که هر دو رویکرد بر اصل فوتوترمولیز انتخابی متکی هستند، در نحوه تولید و تحویل آن نور تفاوت قابل توجهی دارند. دستگاه‌های لیزری یک طول موج متمایز ساطع می‌کنند که کاملاً متمرکز است. دستگاه‌های IPL از طیف گسترده نور در طول موج‌های متعدد به‌وروز همزمان ساطع می‌کنند.',
      'این تفاوت در تحویل نور معنای عملی دارد. لیزرها با دقت طول موج تکی خود معمولاً در محیط‌های حرفه‌ای استفاده می‌شوند. دستگاه‌های IPL برای استفاده در خانه طراحی شده‌اند و راحتی بیشتر و هزینه کمتر به ازای هر جلسه ارائه می‌دهند. طبیعت طیف گسترده IPL به این معنی است که می‌تواند ناحیه گسترده‌تری را با هر فلش پوشش دهد و زمان جلسات را برای نواحی درمان بزرگ کوتاه‌تر کند.',
      'مهم است وضح کنیم که مرکوری GP از فناوری IPL استفاده می‌کند، نه فناوری لیزری. IPL و لیزر فناوری‌های متمایزی هستند و خلط کردن آنها می‌تواند به انتظارات نادرست منجر شود. IPL از لامپ فلش زنون برای تولید نور پالسی طیف گسترده استفاده می‌کند، در حالی که دستگاه‌های لیزری از نور تک‌رنگی استفاده می‌کنند. هر دو فناوری ملانین را هدف قرار می‌دهند، اما مکانیزم تولید نور، طبیعت نور تولیدشده و محیط‌های استفاده معمول بنیاداً متفاوت هستند.',
      'هنگام انتخاب بین IPL و درمان لیزری حرفه‌ای، عواملی مانند راحتی، بودجه، تناژ پوست، رنگ مو و نواحی مورد نظر را مورد بررسی قرار دهید. دستگاه‌های IPL خانگی مانند مرکوری GP مزیت درمان در برنامه خود بدون مراجعه به کلینیک، بدون هزینه‌های جاری برای تعویض کارتریج در طراحی‌های فلش نامحدود را ارائه می‌دهند. درمان‌های لیزری حرفه‌ای ممکن است تحویل انرژی هدفمندتری ارائه دهند اما هزینه بسیار بالاتری دارند. هر دو رویکرد نتایج متفاوتی دارند و هیچکدام نباید به عنوان ارائه‌دهنده نتایج تضمینی توصیف شوند.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
