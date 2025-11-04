# Features Overview / Özellikler

## 🚛 Wise-Wise Logistics Management Platform

### Kullanıcı Rolleri (User Roles)

#### 1. Şoför (Driver)
Saha operasyonlarında çalışan şoförler için özellikler:

**Harcama Yönetimi:**
- ✅ Günlük harcamaları sisteme girme
- ✅ Harcama kategorileri: Yakıt, Yemek, Geçiş Ücreti, Park, Bakım, Diğer
- ✅ Harcama tutarı ve açıklaması
- ✅ Fiş/fatura URL'si ekleme (opsiyonel)
- ✅ Tarih seçimi
- ✅ Kendi harcamalarını görüntüleme
- ✅ Bekleyen, onaylanan ve reddedilen harcamaları filtreleme

**Arıza Yönetimi:**
- ✅ Araç arızalarını bildirme
- ✅ Araç ID, konum ve detaylı açıklama girişi
- ✅ Önem derecesi seçimi (Düşük, Orta, Yüksek, Kritik)
- ✅ Fotoğraf URL'leri ekleme
- ✅ Kendi arıza bildirimlerini görüntüleme
- ✅ Arıza durumunu takip etme

**Dashboard:**
- ✅ Toplam harcama sayısı
- ✅ Bekleyen harcama sayısı
- ✅ Onaylanan harcama sayısı
- ✅ Toplam arıza sayısı
- ✅ Son harcamalar ve arızalar listesi

#### 2. Yönetici (Manager)
Operasyon yöneticileri için özellikler:

**Harcama Onay Sistemi:**
- ✅ Tüm şoförlerin harcamalarını görüntüleme
- ✅ Harcamaları onaylama
- ✅ Harcamaları reddetme (sebep ile)
- ✅ Harcama detaylarını inceleme
- ✅ Durum bazlı filtreleme (Bekleyen, Onaylanan, Reddedilen)
- ✅ Şoför bazlı görüntüleme

**Arıza Takip Sistemi:**
- ✅ Tüm arıza bildirimlerini görüntüleme
- ✅ Arızaları onaylama (acknowledge)
- ✅ Arıza durumunu güncelleme
  - Bildirildi (Reported)
  - Onaylandı (Acknowledged)
  - Devam Ediyor (In Progress)
  - Çözüldü (Resolved)
- ✅ Çözüm notları ekleme
- ✅ Tahmini maliyet girişi
- ✅ Önem derecesine göre filtreleme

**Dashboard:**
- ✅ Toplam harcama sayısı
- ✅ Bekleyen harcama sayısı
- ✅ Toplam arıza sayısı
- ✅ Bildirilen (yeni) arıza sayısı
- ✅ Tüm operasyonlara genel bakış

### 🎨 Kullanıcı Arayüzü (User Interface)

**Responsive Tasarım:**
- ✅ Masaüstü bilgisayarlar için optimize edilmiş
- ✅ Tablet cihazlar için uyumlu
- ✅ Mobil telefonlar için optimize edilmiş (saha kullanımı)
- ✅ Her ekran boyutunda mükemmel görünüm

**Navigasyon:**
- ✅ Üst menü çubuğu
- ✅ Ana Sayfa (Dashboard)
- ✅ Harcamalar sayfası
- ✅ Arızalar sayfası
- ✅ Kullanıcı bilgileri gösterimi
- ✅ Çıkış butonu

**Renk Kodlaması:**
- 🟡 Bekleyen (Pending) - Sarı
- 🟢 Onaylanan/Çözüldü (Approved/Resolved) - Yeşil
- 🔴 Reddedilen (Rejected) - Kırmızı
- 🔵 Devam Ediyor (In Progress) - Mavi
- 🟠 Orta Önem (Medium) - Turuncu

**Tablolar:**
- ✅ Sıralanabilir sütunlar
- ✅ Tıklanabilir satırlar (detay görünümü)
- ✅ Durum rozetleri
- ✅ Tarih formatlaması (Türkçe)
- ✅ Para birimi formatlaması (₺)

### 🔐 Güvenlik (Security)

**Kimlik Doğrulama:**
- ✅ Email ve şifre ile kayıt
- ✅ Email ve şifre ile giriş
- ✅ JWT token tabanlı oturum yönetimi
- ✅ 7 günlük token geçerliliği
- ✅ Şifre hashleme (bcryptjs)
- ✅ Otomatik oturum kontrolü

**Yetkilendirme:**
- ✅ Rol tabanlı erişim kontrolü
- ✅ Şoförler sadece kendi kayıtlarını görebilir
- ✅ Yöneticiler tüm kayıtları görebilir
- ✅ Korumalı rotalar (Protected Routes)
- ✅ API seviyesinde yetki kontrolü

### 📱 Mobil Özellikler

**Saha Kullanımı İçin Optimize:**
- ✅ Büyük dokunma alanları
- ✅ Kolay form girişi
- ✅ Hızlı harcama ekleme
- ✅ Anlık arıza bildirimi
- ✅ Düşük veri kullanımı
- ✅ Hızlı yükleme süreleri

### 🌐 Çok Dilli Destek

**İki Dil:**
- ✅ Türkçe (Ana dil)
- ✅ İngilizce (İkincil dil)
- ✅ Tüm etiketler iki dilde
- ✅ Hata mesajları iki dilde

### 📊 İstatistikler ve Raporlama

**Dashboard Kartları:**
- ✅ Toplam sayılar
- ✅ Bekleyen işlemler
- ✅ Onaylanan işlemler
- ✅ Gerçek zamanlı güncellemeler

**Liste Görünümleri:**
- ✅ Son 5 harcama
- ✅ Son 5 arıza
- ✅ Tıklayarak detay görme
- ✅ Durum bazlı filtreleme

### 🔄 Workflow (İş Akışı)

**Harcama İş Akışı:**
1. Şoför harcama oluşturur → **Bekleyen**
2. Yönetici görür ve inceler
3. Yönetici onaylar → **Onaylanan**
4. VEYA Yönetici reddeder (sebep ile) → **Reddedilen**

**Arıza İş Akışı:**
1. Şoför arıza bildirir → **Bildirildi**
2. Yönetici arızayı onaylar → **Onaylandı**
3. Yönetici işlemi başlatır → **Devam Ediyor**
4. Yönetici çözümü tamamlar → **Çözüldü**

### 🚀 Performans

**Optimizasyonlar:**
- ✅ Tek sayfa uygulaması (SPA)
- ✅ Hızlı sayfa geçişleri
- ✅ Minimum API çağrıları
- ✅ Verimli veri yükleme
- ✅ CSS optimizasyonu
- ✅ Production build optimizasyonu

### 📝 Veri Modelleri

**Kullanıcı (User):**
- Kullanıcı adı
- Email
- Şifre (hashlenmiş)
- Rol (driver/manager)
- Tam ad
- Oluşturulma tarihi

**Harcama (Expense):**
- Şoför ID
- Miktar
- Kategori
- Açıklama
- Tarih
- Durum (pending/approved/rejected)
- Onaylayan kişi
- Onay tarihi
- Red nedeni
- Fiş URL'si

**Arıza (Breakdown):**
- Şoför ID
- Araç ID
- Konum
- Açıklama
- Önem derecesi
- Durum (reported/acknowledged/in_progress/resolved)
- Onaylayan kişi
- Onay tarihi
- Çözüm tarihi
- Çözüm notları
- Tahmini maliyet
- Fotoğraf URL'leri

### 🎯 Kullanım Senaryoları

**Senaryo 1: Günlük Harcama Kaydı**
1. Şoför sahada bir yakıt alımı yapar
2. Mobil cihazdan sisteme giriş yapar
3. "Yeni Harcama" butonuna tıklar
4. Kategori: Yakıt, Miktar: 500₺, Açıklama: "Ankara-İstanbul arası"
5. Tarih ve fiş fotoğrafını ekler
6. Kaydeder
7. Yönetici anlık bildirim alır
8. Yönetici harcamayı inceler ve onaylar

**Senaryo 2: Araç Arızası Bildirimi**
1. Şoför yolda lastik patlaması yaşar
2. Mobil cihazdan "Arıza Bildir" sayfasına girer
3. Araç plakası, konum (GPS koordinatları), açıklama yazar
4. Önem derecesi: Yüksek
5. Lastik fotoğraflarını ekler
6. Bildirir
7. Yönetici anında görür
8. Yönetici servis ekibini yönlendirir
9. Durum "Devam Ediyor" olarak güncellenir
10. Servis tamamlandığında "Çözüldü" olarak işaretlenir

### 🔧 Teknik Özellikler

**Backend:**
- Node.js 14+
- Express.js 5.1.0
- MongoDB (Mongoose 8.19.3)
- JWT Authentication
- RESTful API
- CORS koruması

**Frontend:**
- React 19.2.0
- React Router 7.9.5
- Axios 1.13.1
- Context API
- Hooks
- CSS3 (Responsive)

**Veritabanı:**
- MongoDB
- 3 ana koleksiyon (users, expenses, breakdowns)
- İlişkisel referanslar
- Zaman damgaları
- Validasyon kuralları

### 📦 Paketler

**Backend Bağımlılıklar:**
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- cors: Cross-origin resource sharing
- dotenv: Environment variables

**Frontend Bağımlılıklar:**
- react: UI library
- react-dom: React DOM rendering
- react-router-dom: Client-side routing
- axios: HTTP client

### 🎉 Sonuç

Wise-Wise, lojistik firmaları için tam özellikli, güvenli ve kullanımı kolay bir dijital operasyon platformudur. Şoförler sahada kolayca harcama ve arıza bildirebilir, yöneticiler ise anlık olarak tüm operasyonları takip edip yönetebilir.
