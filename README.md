# Wise-Wise Lojistik Yönetim Platformu (Logistics Management Platform)

Bu proje, lojistik ve taşımacılık firmalarının saha operasyonlarını dijitalleştirmek amacıyla geliştirilmiş, **web tabanlı** ve **mobil destekli** bir platformdur.

This project is a **web-based** and **mobile-supported** platform developed to digitize field operations of logistics and transportation companies.

## Özellikler (Features)

### Şoför Tarafı (Driver Side)
- ✅ Günlük harcamaları sisteme girme (Enter daily expenses)
- ✅ Araç arıza bildirimlerini oluşturma (Create vehicle breakdown reports)
- ✅ Kendi kayıtlarını görüntüleme (View own records)
- ✅ Mobil uyumlu arayüz (Mobile-responsive interface)

### Yönetici Tarafı (Manager Side)
- ✅ Tüm harcamaları anlık takip (Real-time expense tracking)
- ✅ Harcamaları onaylama veya reddetme (Approve or reject expenses)
- ✅ Arıza bildirimlerini görüntüleme ve yönetme (View and manage breakdown reports)
- ✅ Arıza durumlarını güncelleme (Update breakdown statuses)
- ✅ Filtreleme ve arama özellikleri (Filtering and search capabilities)

## Teknoloji Yığını (Technology Stack)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router
- Axios
- CSS3 (Responsive Design)

## Kurulum (Installation)

### Ön Gereksinimler (Prerequisites)
- Node.js (v14 veya üzeri / v14 or higher)
- MongoDB (yerel veya cloud / local or cloud)
- npm veya yarn

### Backend Kurulumu (Backend Setup)

```bash
cd backend
npm install
cp .env.example .env
# .env dosyasını düzenleyin (Edit .env file)
npm start
```

Backend varsayılan olarak `http://localhost:5000` adresinde çalışacaktır.
(Backend will run on `http://localhost:5000` by default)

### Frontend Kurulumu (Frontend Setup)

```bash
cd frontend
npm install
cp .env.example .env
# .env dosyasını düzenleyin (Edit .env file)
npm start
```

Frontend varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.
(Frontend will run on `http://localhost:3000` by default)

## Kullanım (Usage)

1. **Kayıt Olun (Register)**: Şoför veya yönetici olarak kayıt olun (Register as driver or manager)
2. **Giriş Yapın (Login)**: Email ve şifre ile giriş yapın (Login with email and password)
3. **Şoför İşlemleri (Driver Operations)**:
   - Harcama ekleyin (Add expenses)
   - Arıza bildirin (Report breakdowns)
   - Kayıtlarınızı görüntüleyin (View your records)
4. **Yönetici İşlemleri (Manager Operations)**:
   - Tüm harcamaları görüntüleyin (View all expenses)
   - Harcamaları onaylayın/reddedin (Approve/reject expenses)
   - Arızaları yönetin (Manage breakdowns)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı (User registration)
- `POST /api/auth/login` - Giriş yapma (Login)
- `GET /api/auth/me` - Mevcut kullanıcı bilgisi (Current user info)

### Expenses
- `POST /api/expenses` - Harcama oluştur (Create expense)
- `GET /api/expenses` - Harcamaları listele (List expenses)
- `GET /api/expenses/:id` - Harcama detayı (Expense detail)
- `PUT /api/expenses/:id` - Harcamayı güncelle (Update expense)
- `DELETE /api/expenses/:id` - Harcamayı sil (Delete expense)
- `POST /api/expenses/:id/approve` - Harcamayı onayla (Approve expense)
- `POST /api/expenses/:id/reject` - Harcamayı reddet (Reject expense)

### Breakdowns
- `POST /api/breakdowns` - Arıza bildir (Report breakdown)
- `GET /api/breakdowns` - Arızaları listele (List breakdowns)
- `GET /api/breakdowns/:id` - Arıza detayı (Breakdown detail)
- `PUT /api/breakdowns/:id` - Arızayı güncelle (Update breakdown)
- `DELETE /api/breakdowns/:id` - Arızayı sil (Delete breakdown)
- `POST /api/breakdowns/:id/acknowledge` - Arızayı onayla (Acknowledge breakdown)
- `POST /api/breakdowns/:id/status` - Arıza durumunu güncelle (Update breakdown status)

## Güvenlik (Security)

- JWT tabanlı kimlik doğrulama (JWT-based authentication)
- Şifreler bcrypt ile hash'lenir (Passwords hashed with bcrypt)
- Rol tabanlı yetkilendirme (Role-based authorization)
- CORS koruması (CORS protection)

## Lisans (License)

MIT License - Detaylar için LICENSE dosyasına bakın (See LICENSE file for details)

