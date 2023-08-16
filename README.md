### Prepare installation, and setup environment

- install Nodejs >= 16.0 LTS
- install pm2@latest
- clone project di github: https://github.com/cobategit/jpj_hrm_cronjob_nodejs
- masuk ke root project dan install package npm: npm install
- cek enviroment di file .env
- build project: npm run build
- jalankan services insertinto dan update cronjob di pm2: pm2 start dist/handlers/present/cron-present-insert.js & pm2 start dist/handlers/present/cron-present-update.js
- jalankan services api di pm2: pm2 start dist/app.js

### Folder Structure

Let's use files and folders to structure our application. Doing this allows us to communicate architecture intent:

```
/public
|── docs (penyimpanan file hasil export khusus untuk di windows)

/src
│── app.ts (main fungsi)
│── config (konfigurasi database atau konfigurasi lainnya)
├── data (folder yang berkaitan dengan database, query-query yang dibuat)
|── handlers (folder yang mendapatkan data dari hasil logic bisnis pada folder 'services')
|── interfaces (model untuk response atau request dari data-data)
|── routes (endpoint untuk api yang akan diakses)
|── services (folder yang mendapatkan data dari query-query yang dieksekusi dari folder 'data' atau bisa menambahkan logic bisnis)
└── utils (fungsi global untuk digunakan disemua logic)
```
