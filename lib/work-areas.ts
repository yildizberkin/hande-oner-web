export type WorkAreaSection = { heading: string; body: string };

export type WorkArea = {
  id: string;
  trSlug: string;
  enSlug: string;
  trTitle: string;
  enTitle: string;
  trShort: string;
  enShort: string;
  trIntro: string;
  enIntro: string;
  trSections: WorkAreaSection[];
  enSections: WorkAreaSection[];
};

export const workAreas: WorkArea[] = [
  {
    id: "kaygi",
    trSlug: "kaygi-bozukluklari",
    enSlug: "anxiety-disorders",
    trTitle: "Kaygı Bozuklukları",
    enTitle: "Anxiety Disorders",
    trShort: "Yoğun kaygı, endişe ve belirsizlikle ilişkili güçlükler.",
    enShort: "Difficulties related to intense anxiety, worry and uncertainty.",
    trIntro: "Kaygı yaşamın doğal bir parçasıdır. Ancak yoğunlaştığında kişinin düşüncelerini, ilişkilerini, günlük işlevselliğini ve kendisiyle kurduğu bağı etkileyebilir.",
    enIntro: "Anxiety is a natural part of life. When it becomes intense, however, it may affect thoughts, relationships, day-to-day functioning and the way a person relates to themselves.",
    trSections: [
      { heading: "Kaygı nasıl deneyimlenebilir?", body: "Sürekli endişe, belirsizliğe tahammül etmekte zorlanma, zihinsel olarak olumsuz olasılıklara odaklanma, bedensel gerginlik veya belirli durumlardan kaçınma gibi farklı biçimlerde yaşanabilir. Her kişinin deneyimi ve bu deneyime verdiği anlam farklıdır." },
      { heading: "Terapi sürecinde nasıl ele alınabilir?", body: "Terapi sürecinde kaygının ne zaman arttığı, hangi ilişkisel veya duygusal örüntülerle bağlantı kurduğu ve kişinin kendisini korumak için geliştirdiği yollar birlikte incelenebilir. Amaç yalnızca belirtileri bastırmak değil, kaygının kişisel anlamını daha iyi anlayabilmek için güvenli bir alan oluşturmaktır." },
      { heading: "Ne zaman destek düşünülebilir?", body: "Kaygı gündelik yaşamı, ilişkileri, işi veya kişinin yaşamdan aldığı doyumu belirgin biçimde etkilemeye başladığında psikolojik destek düşünmek yararlı olabilir." },
    ],
    enSections: [
      { heading: "How can anxiety be experienced?", body: "It may appear as persistent worry, difficulty tolerating uncertainty, a strong focus on negative possibilities, physical tension or avoidance of certain situations. The experience and its personal meaning can be different for each person." },
      { heading: "How may it be explored in therapy?", body: "Therapy can explore when anxiety becomes stronger, the emotional or relational patterns connected with it and the ways a person has learned to protect themselves. The aim is not simply to suppress symptoms, but to create a safe space to understand the personal meaning of anxiety more deeply." },
      { heading: "When might support be considered?", body: "Psychological support may be worth considering when anxiety begins to have a noticeable impact on everyday life, relationships, work or a person's overall quality of life." },
    ],
  },
  {
    id: "depresyon",
    trSlug: "depresyon",
    enSlug: "depression",
    trTitle: "Depresyon",
    enTitle: "Depression",
    trShort: "Duygudurum, isteksizlik ve yaşam enerjisindeki değişimler.",
    enShort: "Changes in mood, motivation and engagement with daily life.",
    trIntro: "Depresif dönemler yalnızca üzgün hissetmekten ibaret olmayabilir; kişinin enerjisini, ilgisini, ilişkilerini, kendilik algısını ve gündelik yaşamla kurduğu bağı etkileyebilir.",
    enIntro: "Depressive periods may involve more than feeling sad; they can affect energy, interests, relationships, self-perception and a person's connection with everyday life.",
    trSections: [
      { heading: "Depresif yaşantı nasıl görünebilir?", body: "İsteksizlik, keyif almakta zorlanma, geri çekilme, yoğun öz eleştiri, umutsuzluk veya gündelik sorumlulukları sürdürmekte güçlük gibi farklı deneyimler görülebilir." },
      { heading: "Terapi sürecinde nasıl ele alınabilir?", body: "Terapi, depresif duyguların kişinin yaşam öyküsü, ilişkileri ve kendisiyle kurduğu bağ içindeki anlamını araştırabileceği bir alan sunar. Tekrar eden duygusal örüntüler ve kişinin ihtiyaçlarını nasıl deneyimlediği birlikte ele alınabilir." },
      { heading: "Süreç kişiye özeldir", body: "Depresif deneyimin nedenleri ve etkileri herkes için aynı değildir. Bu nedenle terapi süreci kişinin ihtiyaçlarına, yaşam koşullarına ve terapiye getirdiği konulara göre şekillenir." },
    ],
    enSections: [
      { heading: "What can a depressive experience look like?", body: "It may include reduced motivation, difficulty experiencing pleasure, withdrawal, strong self-criticism, hopelessness or difficulty maintaining everyday responsibilities." },
      { heading: "How may it be explored in therapy?", body: "Therapy offers space to explore the meaning of depressive feelings within a person's life history, relationships and relationship with themselves. Recurring emotional patterns and the way personal needs are experienced can be considered together." },
      { heading: "The process is individual", body: "The causes and effects of depressive experiences are not the same for everyone. Therapy therefore develops around the person's needs, circumstances and the themes they bring into the work." },
    ],
  },
  {
    id: "iliskisel-zorluklar",
    trSlug: "iliskisel-zorluklar",
    enSlug: "relationship-difficulties",
    trTitle: "İlişkisel Zorluklar",
    enTitle: "Relationship Difficulties",
    trShort: "Yakın ilişkilerde tekrar eden çatışmalar ve bağ kurma güçlükleri.",
    enShort: "Recurring conflict and difficulties forming or maintaining close connections.",
    trIntro: "Yakın ilişkilerde tekrar eden çatışmalar, uzaklaşma, güvenmekte zorlanma veya yakınlık kurarken yaşanan güçlükler kişinin geçmiş ve güncel ilişkisel deneyimleriyle bağlantılı olabilir.",
    enIntro: "Recurring conflict, emotional distance, difficulty trusting or challenges with closeness may be connected with both past and present relational experiences.",
    trSections: [
      { heading: "Tekrar eden ilişki örüntüleri", body: "Bazen kişiler veya ilişkiler değişse bile benzer duygular, çatışmalar ya da beklentiler tekrar edebilir. Bu örüntüleri fark etmek, ilişkiler içinde kişinin kendi rolünü ve ihtiyaçlarını daha açık görebilmesine yardımcı olabilir." },
      { heading: "Terapi neye alan açar?", body: "Terapi sürecinde yakınlık, güven, sınırlar, terk edilme korkusu, çatışma biçimleri veya ifade edilmemiş ihtiyaçlar gibi temalar güvenli bir ilişki içinde ele alınabilir." },
      { heading: "Daha farklı ilişki kurma ihtimali", body: "Amaç kusursuz ilişkiler oluşturmak değil; kişinin ilişkilerdeki deneyimini daha iyi anlayabilmesi ve daha açık, esnek ve kendisiyle uyumlu seçimler yapabilmesi için alan yaratmaktır." },
    ],
    enSections: [
      { heading: "Recurring relational patterns", body: "Even when people or relationships change, similar feelings, conflicts or expectations can sometimes return. Noticing these patterns may help a person understand their own role and needs within relationships more clearly." },
      { heading: "What can therapy make space for?", body: "Themes such as closeness, trust, boundaries, fear of abandonment, patterns of conflict or unspoken needs can be explored within the safety of the therapeutic relationship." },
      { heading: "The possibility of relating differently", body: "The aim is not to create perfect relationships, but to help a person understand their relational experience and make choices that feel more open, flexible and consistent with their needs." },
    ],
  },
  {
    id: "ozsaygi",
    trSlug: "ozsaygi-ve-benlik-algisi",
    enSlug: "self-esteem-and-self-perception",
    trTitle: "Özsaygı ve Benlik Algısı",
    enTitle: "Self-Esteem & Self-Perception",
    trShort: "Kendilik değeri, öz eleştiri ve benlik algısıyla ilgili güçlükler.",
    enShort: "Difficulties related to self-worth, self-criticism and self-perception.",
    trIntro: "Kişinin kendisini nasıl gördüğü; ilişkilerini, kararlarını, sınırlarını ve yaşam içindeki yerini nasıl deneyimlediğini önemli ölçüde etkileyebilir.",
    enIntro: "The way a person sees themselves can strongly influence their relationships, decisions, boundaries and the way they experience their place in life.",
    trSections: [
      { heading: "Yoğun öz eleştiri", body: "Kendini sürekli yetersiz görmek, başarıları küçümsemek veya hatalara karşı çok sert olmak kişinin kendilik algısını zaman içinde daraltabilir." },
      { heading: "Benlik algısının kaynaklarını anlamak", body: "Terapi sürecinde kişinin kendisi hakkında geliştirdiği inançların nereden geldiği, ilişkiler içinde nasıl pekiştiği ve bugün hangi durumlarda etkili olduğu araştırılabilir." },
      { heading: "Daha esnek bir kendilik ilişkisi", body: "Çalışmanın amacı yalnızca daha olumlu düşünmek değil; kişinin güçlü ve zorlayıcı yanlarını birlikte görebildiği, daha gerçekçi ve daha şefkatli bir kendilik ilişkisine alan açmaktır." },
    ],
    enSections: [
      { heading: "Intense self-criticism", body: "Repeatedly seeing oneself as inadequate, minimising achievements or responding very harshly to mistakes can narrow a person's sense of self over time." },
      { heading: "Understanding the origins of self-perception", body: "Therapy can explore where beliefs about the self developed, how they may have been reinforced through relationships and the situations in which they continue to shape experience today." },
      { heading: "A more flexible relationship with the self", body: "The work is not simply about thinking more positively, but about making space for a more realistic and compassionate relationship with the self that can hold both strengths and difficulties." },
    ],
  },
  {
    id: "yalnizlik",
    trSlug: "yalnizlik",
    enSlug: "loneliness",
    trTitle: "Yalnızlık",
    enTitle: "Loneliness",
    trShort: "Bağ kurmakta zorlanma ve duygusal yalnızlık deneyimleri.",
    enShort: "Difficulty feeling connected and experiences of emotional loneliness.",
    trIntro: "Yalnızlık yalnızca fiziksel olarak tek başına olmak değildir. İnsan ilişkilerin içindeyken de anlaşılmadığını, görülmediğini veya gerçek bir bağ kuramadığını hissedebilir.",
    enIntro: "Loneliness is not limited to being physically alone. A person can also feel unseen, misunderstood or unable to form a meaningful connection while surrounded by others.",
    trSections: [
      { heading: "Duygusal yalnızlık", body: "Yakın ilişkilerin varlığı her zaman duygusal yakınlık hissi yaratmayabilir. Kişinin ihtiyaçlarını paylaşmakta zorlanması veya anlaşılmayacağı beklentisi yalnızlık deneyimini güçlendirebilir." },
      { heading: "Bağ kurma biçimlerini keşfetmek", body: "Terapi, kişinin yakınlık ve mesafeyle nasıl ilişki kurduğunu, kendisini ne zaman geri çektiğini ve başkalarına hangi beklentilerle yaklaştığını keşfedebileceği bir alan olabilir." },
      { heading: "Aidiyet ve ilişki", body: "Yalnızlık deneyimini anlamak, yalnızca daha fazla insanla tanışmakla ilgili değildir. Kişinin kendisini ilişkiler içinde nasıl konumlandırdığı ve aidiyeti nasıl deneyimlediği de sürecin önemli bir parçası olabilir." },
    ],
    enSections: [
      { heading: "Emotional loneliness", body: "Having close relationships does not always create a sense of emotional closeness. Difficulty sharing needs or expecting not to be understood can intensify the experience of loneliness." },
      { heading: "Exploring ways of connecting", body: "Therapy can offer space to notice how a person approaches closeness and distance, when they withdraw and what they expect when they move towards other people." },
      { heading: "Belonging and relationship", body: "Understanding loneliness is not simply about meeting more people. The way a person positions themselves within relationships and experiences belonging can also be an important part of the work." },
    ],
  },
  {
    id: "ofke",
    trSlug: "ofke-yonetimi",
    enSlug: "anger-management",
    trTitle: "Öfke Yönetimi",
    enTitle: "Anger Management",
    trShort: "Öfkeyi anlamlandırma, ifade etme ve düzenleme güçlükleri.",
    enShort: "Difficulties understanding, expressing and regulating anger.",
    trIntro: "Öfke çoğu zaman sınırların ihlali, incinme, hayal kırıklığı, tehdit algısı veya karşılanmayan ihtiyaçlarla bağlantılı olabilen önemli bir duygudur.",
    enIntro: "Anger is an important emotion that can be connected with violated boundaries, hurt, disappointment, perceived threat or unmet needs.",
    trSections: [
      { heading: "Öfkenin altında ne olabilir?", body: "Öfke bazen daha kırılgan duyguların önünde yer alabilir. Kırgınlık, değersizlik, utanç veya çaresizlik gibi deneyimler öfkenin içinde veya arkasında bulunabilir." },
      { heading: "Tetikleyicileri ve örüntüleri anlamak", body: "Terapi sürecinde öfkenin hangi durumlarda ortaya çıktığı, nasıl ifade edildiği ve sonrasında kişide veya ilişkilerinde neler yarattığı birlikte incelenebilir." },
      { heading: "Düzenleme ve ifade", body: "Amaç öfkeyi tamamen ortadan kaldırmak değil; bu duygunun taşıdığı bilgiyi anlayabilmek ve kişinin kendisine ya da ilişkilerine zarar vermeden daha işlevsel biçimde ifade edebilmesine alan açmaktır." },
    ],
    enSections: [
      { heading: "What may sit beneath anger?", body: "Anger can sometimes stand in front of more vulnerable feelings. Experiences such as hurt, shame, helplessness or feeling devalued may be present within or beneath it." },
      { heading: "Understanding triggers and patterns", body: "Therapy can explore the situations in which anger appears, how it is expressed and what happens afterwards for the person and within their relationships." },
      { heading: "Regulation and expression", body: "The aim is not to eliminate anger completely, but to understand the information it carries and create room for expressing it in ways that are less harmful to the person or their relationships." },
    ],
  },
  {
    id: "yas-kayip",
    trSlug: "yas-ve-kayip-surecleri",
    enSlug: "grief-and-loss",
    trTitle: "Yas ve Kayıp Süreçleri",
    enTitle: "Grief & Loss",
    trShort: "Kayıp, ayrılık ve değişim sonrasında yaşanan duygusal süreçler.",
    enShort: "Emotional processes following loss, separation and significant change.",
    trIntro: "Yasın tek bir doğru biçimi veya herkes için geçerli sabit bir süresi yoktur. Kayıp, kişinin yaşamında ve kendilik deneyiminde farklı biçimlerde iz bırakabilir.",
    enIntro: "There is no single correct way to grieve and no fixed timeline that applies to everyone. Loss can leave different kinds of marks on a person's life and sense of self.",
    trSections: [
      { heading: "Kayıp yalnızca ölüm değildir", body: "Bir ilişkinin sona ermesi, göç, sağlık veya iş yaşamındaki önemli değişimler ve kişinin geçmişte sahip olduğu bir yaşam biçiminin kaybı da yas deneyimi yaratabilir." },
      { heading: "Duygulara yer açmak", body: "Yas sırasında üzüntü, öfke, suçluluk, rahatlama, özlem veya uyuşukluk gibi birbiriyle çelişebilen duygular birlikte bulunabilir. Terapi bu duyguların yargılanmadan ele alınabileceği bir alan sunabilir." },
      { heading: "Değişen yaşamla yeniden ilişki kurmak", body: "Amaç kaybı unutmak değil; kişinin kayıpla kurduğu ilişkinin zaman içinde dönüşebilmesine ve değişen yaşamla kendi hızında yeniden bağ kurabilmesine destek olmaktır." },
    ],
    enSections: [
      { heading: "Loss is not limited to bereavement", body: "The end of a relationship, migration, significant changes in health or work, or the loss of a previous way of life can also create experiences of grief." },
      { heading: "Making room for emotion", body: "Grief can include emotions that seem contradictory, such as sadness, anger, guilt, relief, longing or numbness. Therapy can offer a space where these experiences may be considered without judgement." },
      { heading: "Reconnecting with a changed life", body: "The aim is not to forget the loss, but to support the possibility for the person's relationship with it to change over time and for them to reconnect with life at their own pace." },
    ],
  },
  {
    id: "goc-uyum",
    trSlug: "goc-ve-uyum-surecleri",
    enSlug: "migration-and-adjustment",
    trTitle: "Göç ve Uyum Süreçleri",
    enTitle: "Migration & Adjustment",
    trShort: "Yeni bir ülke, kültür veya yaşam düzenine uyum süreçleri.",
    enShort: "Adjusting to a new country, culture or way of life.",
    trIntro: "Göç yalnızca fiziksel bir yer değişikliği değildir; aidiyet, kimlik, dil, ilişkiler, alışkanlıklar ve gündelik yaşamın birçok alanında eş zamanlı değişimler yaratabilir.",
    enIntro: "Migration is more than a physical change of place. It can bring simultaneous changes in belonging, identity, language, relationships, routines and many aspects of everyday life.",
    trSections: [
      { heading: "İki yaşam arasında kalmak", body: "Yeni bir yere uyum sağlarken eski yaşamla bağın sürmesi, kişinin kendisini iki kültür veya iki farklı hayat arasında hissedebilmesine neden olabilir." },
      { heading: "Aidiyet ve kimlik", body: "Göç deneyimi kişinin 'ev', 'ait olmak' veya 'kendim olmak' gibi kavramlara verdiği anlamları yeniden düşünmesine yol açabilir. Bu süreç zaman zaman yalnızlık, yabancılık veya suçluluk duygularıyla birlikte yaşanabilir." },
      { heading: "Uyum sürecine psikolojik alan", body: "Terapi, göçün yarattığı kayıplar kadar yeni imkânları da ele alabilecek; kişinin değişen yaşamındaki ilişkileri, kimliği ve ihtiyaçları üzerine düşünebileceği bir alan sağlayabilir." },
    ],
    enSections: [
      { heading: "Living between two lives", body: "While adjusting to a new place, continuing ties with a previous life can leave a person feeling between two cultures or two different versions of life." },
      { heading: "Belonging and identity", body: "Migration can change the meaning of ideas such as home, belonging and being oneself. This process may at times be accompanied by loneliness, unfamiliarity or guilt." },
      { heading: "Psychological space for adjustment", body: "Therapy can make room for both the losses and the possibilities that come with migration, allowing a person to reflect on relationships, identity and needs within a changing life." },
    ],
  },
];

export function getTurkishWorkArea(slug: string) {
  return workAreas.find((area) => area.trSlug === slug);
}

export function getEnglishWorkArea(slug: string) {
  return workAreas.find((area) => area.enSlug === slug);
}
