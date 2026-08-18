HANDE ÖNER — CMS V2 / EASY BLOG EDITOR

AMAÇ
Hande'nin kod, GitHub veya Markdown bilmeden blogu tek başına yönetebilmesi.

V2 İLE GELENLER
- Word benzeri gerçek rich text editör (Tiptap)
- Mevcut yazıya tıklayıp doğrudan düzenleme
- Yeni yazı oluşturma
- Küçük metin ekleme / silme / değiştirme
- Kalın, italik, altı çizili
- Başlık / alt başlık
- Madde listesi / numaralı liste
- Alıntı
- Metni seçip gerçek tıklanabilir link verme
- Link kaldırma
- Geri al / ileri al
- Canlı yazı önizlemesi
- Taslak kaydetme
- Yayınlama
- Yayındaki yazıyı tekrar düzenleyip kaydetme
- TR / EN içerik
- Kategori
- Arama ve filtre
- Kaynaklar / Referanslar sekmesi
- Her kaynak için ad + URL + isteğe bağlı not
- Kaynakların public yazının sonunda otomatik görünmesi
- Sürüm geçmişi
- Her kayıttan önce eski halin otomatik saklanması
- Eski sürüme geri dönme
- Kaydedilmemiş değişiklik uyarısı
- Ctrl+S ile kaydet
- Kolay Google / SEO ekranı
- Google sonuç önizlemesi
- Structured JSON içerik saklama

MEVCUT BLOG YAZILARI
Eski 3 Türkçe + 3 İngilizce örnek yazı D1'e migration ile eklenir.
Böylece admin panelinden açılıp düzenlenebilirler.

KURULUM
1) Zip içeriğini hande-oner-web proje root'una çıkar ve dosyaların üzerine yaz.
2) Proje root'unda çalıştır:

   powershell -ExecutionPolicy Bypass -File .\setup-cms-v2.ps1

Script:
- eski hard-coded blog route klasörlerini kaldırır,
- npm install çalıştırır,
- local D1 migration 0002'yi uygular.

3) Sonra:
   npm run dev

4) Aç:
   http://localhost:3000/admin

TEST
- Soldaki listede eski TR/EN yazıları görünmeli.
- "Kaygıyı anlamak..." yazısını aç.
- Bir cümle değiştir ve Kaydet.
- Geçmiş sekmesine gir; eski sürüm görünmeli.
- Bir metni seç -> Link -> URL gir.
- Kaynaklar -> + Kaynak Ekle.
- Yayınla.
- /blog/kaygiyi-anlamak adresini aç ve değişiklikleri doğrula.

NOT
Görsel upload/media library henüz R2 bağlanmadığı için URL/path alanı olarak kalıyor.
Final Cloudflare hesabı geldiğinde bunu gerçek "Görsel Yükle" akışına çevireceğiz.
