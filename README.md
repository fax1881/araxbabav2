# Discord Profile Card - Vercel Deployment

Bu proje, Discord tarzında bir profil kartı gösteren statik bir web sitesidir. Vercel'de deploy edilmek üzere hazırlanmıştır.

## 🚀 Vercel'e Deploy Etme

### 1. GitHub'a Yükleme
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/kullaniciadi/repo-adi.git
git push -u origin main
```

### 2. Vercel'de Deploy
1. [Vercel.com](https://vercel.com) adresine git
2. GitHub hesabınla giriş yap
3. "New Project" butonuna tıkla
4. GitHub repository'ni seç
5. "Deploy" butonuna tıkla

### 3. Otomatik Deploy
- Her `git push` işleminde otomatik olarak yeniden deploy edilir
- Vercel otomatik olarak `index.html` dosyasını ana sayfa olarak tanır

## 📁 Proje Yapısı

```
├── index.html          # Ana sayfa (PHP'den dönüştürüldü)
├── vercel.json         # Vercel konfigürasyonu
├── css/
│   └── style.css       # Stil dosyası
├── js/
│   ├── main.js         # Ana JavaScript dosyası
│   └── animation.js    # Animasyon dosyası
└── images/
    ├── placeholder.svg      # Banner placeholder
    └── avatar-placeholder.svg # Avatar placeholder
```

## ⚠️ Önemli Notlar

- **PHP Desteği Yok**: Vercel PHP desteklemez, bu yüzden `index.php` dosyası `index.html` olarak dönüştürüldü
- **Resim Dosyaları**: Eğer kendi resimlerinizi kullanmak istiyorsanız, `images/` klasörüne ekleyin
- **Domain**: Vercel otomatik olarak bir domain verir (örn: `proje-adi.vercel.app`)

## 🎨 Özelleştirme

- `css/style.css` dosyasından renkleri ve stilleri değiştirebilirsiniz
- `index.html` dosyasından profil bilgilerini güncelleyebilirsiniz
- `js/` klasöründeki dosyalardan animasyonları özelleştirebilirsiniz

## 🔧 Geliştirme

Yerel olarak test etmek için:
```bash
# Basit HTTP server başlat
python -m http.server 8000
# veya
npx serve .
```

Sonra `http://localhost:8000` adresine git.
