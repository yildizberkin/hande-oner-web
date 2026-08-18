PRAGMA foreign_keys = ON;
ALTER TABLE posts ADD COLUMN content_json TEXT;
ALTER TABLE posts ADD COLUMN references_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE posts ADD COLUMN revision INTEGER NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS post_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  revision INTEGER NOT NULL,
  snapshot_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_post_revisions_post ON post_revisions(post_id, revision DESC);

INSERT OR IGNORE INTO posts (
slug, language, title, excerpt, content, content_json, references_json,
category_id, seo_title, seo_description, status, published_at, updated_at
)
SELECT 'kaygiyi-anlamak', 'tr', 'Kaygıyı anlamak: Ne zaman bir sinyale dönüşür?', 'Kaygı, tehlike veya belirsizlik karşısında ortaya çıkabilen doğal bir duygudur. Ancak yoğunluğu arttığında gündelik yaşamı, ilişkileri ve kişinin kendisiyle kurduğu bağı zorlayabilir.', '', '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Kaygının işlevi"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Kaygı her zaman ortadan kaldırılması gereken bir duygu değildir. Bazen yaklaşan bir riski fark etmemize, hazırlanmamıza veya sınırlarımızı görmemize yardımcı olur. Zorlayıcı hale geldiği noktada ise düşünceler sürekli olası tehditlere yönelir ve beden de bu alarm durumuna eşlik edebilir."}]}, {"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Ne zaman destek düşünülmeli?"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Kaygı kişinin uyku düzenini, işlevselliğini, ilişkilerini veya karar verme biçimini belirgin biçimde etkiliyorsa bu deneyimi daha yakından ele almak faydalı olabilir. Psikoterapi sürecinde yalnızca belirtilere değil, kaygının kişinin yaşamındaki anlamına ve tekrar eden örüntülere de bakılabilir."}]}]}', '[]',
c.id, 'Kaygıyı anlamak: Ne zaman bir sinyale dönüşür?', 'Kaygının işlevini, yoğunlaştığında gündelik yaşam üzerindeki etkilerini ve terapi sürecinde nasıl ele alınabileceğini anlatan bilgilendirici bir yazı.', 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM categories c WHERE c.slug='kaygi' AND c.language='tr';

INSERT OR IGNORE INTO posts (
slug, language, title, excerpt, content, content_json, references_json,
category_id, seo_title, seo_description, status, published_at, updated_at
)
SELECT 'iliskilerde-tekrar-eden-oruntuler', 'tr', 'İlişkilerde tekrar eden örüntüler', 'Bazı ilişkiler değişse de kişinin kendisini benzer çatışmaların, uzaklaşmaların veya hayal kırıklıklarının içinde bulması mümkün olabilir.', '', '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Örüntüler nasıl oluşur?"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "İlişkilerde beklentilerimiz, yakınlıkla kurduğumuz bağ ve kendimizi koruma biçimlerimiz geçmiş deneyimlerden etkilenebilir. Kişi farkında olmadan tanıdık gelen ilişki biçimlerine yönelebilir veya aynı savunma yollarını tekrar kullanabilir."}]}, {"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Terapi neye alan açar?"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Psikoterapi, bu tekrarları yargılamadan fark edebilmek ve kişinin ilişkiler içinde nasıl konumlandığını anlamlandırmak için bir alan sunabilir. Farkındalık arttıkça daha esnek ve kişinin ihtiyaçlarıyla daha uyumlu ilişki kurma biçimleri geliştirmek mümkün hale gelebilir."}]}]}', '[]',
c.id, 'İlişkilerde tekrar eden örüntüler', 'Yakın ilişkilerde benzer çatışmaların neden tekrar edebildiğini ve ilişkisel örüntülerin psikoterapide nasıl ele alınabileceğini anlatan bir yazı.', 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM categories c WHERE c.slug='iliskiler' AND c.language='tr';

INSERT OR IGNORE INTO posts (
slug, language, title, excerpt, content, content_json, references_json,
category_id, seo_title, seo_description, status, published_at, updated_at
)
SELECT 'goc-aidiyet-ve-uyum', 'tr', 'Göç, aidiyet ve yeni bir yaşam düzenine uyum', 'Göç yalnızca bir yer değişikliği değildir. Dil, sosyal çevre, gündelik rutinler, aidiyet hissi ve kişinin kendisini tanımlama biçimi aynı anda değişebilir.', '', '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Birden fazla kaybı aynı anda taşımak"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Yeni bir yaşam kurmak heyecan verici olabilse de geride bırakılan ilişkiler, alışkanlıklar ve tanıdık çevre için bir yas süreci de yaşanabilir. Bu iki duygunun aynı anda bulunması bir çelişki olmak zorunda değildir."}]}, {"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Aidiyet yeniden kurulabilir mi?"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Yeni bir yerde aidiyet geliştirmek çoğu zaman zaman alan ve doğrusal ilerlemeyen bir süreçtir. Psikoterapi, kişinin hem geride bıraktıklarıyla hem de yeni yaşamıyla kurduğu ilişkiyi anlamlandırabileceği güvenli bir alan sağlayabilir."}]}]}', '[]',
c.id, 'Göç, aidiyet ve yeni bir yaşam düzenine uyum', 'Göç sonrası aidiyet, kimlik, yalnızlık ve uyum deneyimlerini ele alan bilgilendirici bir psikoloji yazısı.', 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM categories c WHERE c.slug='yasam-degisiklikleri' AND c.language='tr';

INSERT OR IGNORE INTO posts (
slug, language, title, excerpt, content, content_json, references_json,
category_id, seo_title, seo_description, status, published_at, updated_at
)
SELECT 'understanding-anxiety', 'en', 'Understanding anxiety: When does it become a signal?', 'Anxiety is a natural emotion that can arise in response to danger or uncertainty. When it becomes more intense, however, it may begin to affect daily life and relationships.', '', '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "The function of anxiety"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Anxiety is not always something that needs to be eliminated. At times it can help us notice possible risks, prepare ourselves or recognise our limits. When it becomes overwhelming, thoughts may become increasingly focused on potential threats while the body remains in a heightened state of alert."}]}, {"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "When might support be helpful?"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "If anxiety is significantly affecting sleep, daily functioning, relationships or decision-making, it may be useful to explore the experience more closely. Psychotherapy can look not only at symptoms, but also at the meaning of anxiety in a person''s life and the patterns that may be maintaining it."}]}]}', '[]',
c.id, 'Understanding anxiety: When does it become a signal?', 'An introduction to the role of anxiety, its impact on everyday life and how it may be explored in psychotherapy.', 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM categories c WHERE c.slug='anxiety' AND c.language='en';

INSERT OR IGNORE INTO posts (
slug, language, title, excerpt, content, content_json, references_json,
category_id, seo_title, seo_description, status, published_at, updated_at
)
SELECT 'recurring-patterns-in-relationships', 'en', 'Recurring patterns in relationships', 'Even when relationships change, a person may find themselves facing similar conflicts, emotional distance or disappointments.', '', '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "How do patterns develop?"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Our expectations in relationships, the way we experience closeness and the strategies we use to protect ourselves can all be shaped by earlier experiences. Without fully realising it, a person may gravitate towards familiar relational dynamics or repeatedly rely on the same defensive responses."}]}, {"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "What can therapy make space for?"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Psychotherapy can offer a space to notice these repetitions without judgement and to understand how a person positions themselves within relationships. As awareness grows, it may become possible to develop more flexible ways of relating that are more consistent with the person''s current needs."}]}]}', '[]',
c.id, 'Recurring patterns in relationships', 'An article on why similar conflicts may recur in close relationships and how relational patterns can be explored in psychotherapy.', 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM categories c WHERE c.slug='relationships' AND c.language='en';

INSERT OR IGNORE INTO posts (
slug, language, title, excerpt, content, content_json, references_json,
category_id, seo_title, seo_description, status, published_at, updated_at
)
SELECT 'migration-belonging-and-adjustment', 'en', 'Migration, belonging and adjusting to a new life', 'Migration is more than a change of location. Language, social networks, everyday routines and a sense of belonging may all change at the same time.', '', '{"type": "doc", "content": [{"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Carrying several losses at once"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Building a new life can be exciting while also bringing a sense of grief for relationships, routines and familiar surroundings that have been left behind. Experiencing both of these emotional realities at the same time does not have to be a contradiction."}]}, {"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Can belonging be rebuilt?"}]}, {"type": "paragraph", "content": [{"type": "text", "text": "Developing a sense of belonging in a new place often takes time and rarely follows a completely linear path. Psychotherapy can provide a safe space to make sense of the relationship a person has with both what they have left behind and the new life they are building."}]}]}', '[]',
c.id, 'Migration, belonging and adjusting to a new life', 'An article exploring belonging, identity, loneliness and adjustment following migration.', 'published', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
FROM categories c WHERE c.slug='life-changes' AND c.language='en';
