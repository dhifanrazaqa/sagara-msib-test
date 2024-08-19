# sagara-msib-test

Backend Project-based Test

**Cara Install & Setup**
- git clone https://github.com/dhifanrazaqa/sagara-msib-test.git
- Siapkan file .env
- npx prisma migrate dev --name init
- npm install
- npm run dev

**Tech Stack: Express TS dan PostgreSQL**

List Endpoint:
- **Create Clothing**  
  endpoint: http://localhost:5000/api/v1/clothing  
  method: POST  
  body: {  
    "title": "Kaos Metal",  
    "color": "Hijau",  
    "size": "M",  
    "price": 20000,  
    "stock": 26  
  }
  
- **Get Single Clothing**
  endpoint: http://localhost:5000/api/v1/clothing/:id  
  method: GET
  
- **Update Clothing**  
  endpoint: http://localhost:5000/api/v1/clothing/:id  
  method: PUT  
  body: Lampirkan field apapun (boleh satu atau lebih)
  
- **Delete Clothing**  
  endpoint: http://localhost:5000/api/v1/clothing/:id  
  method: DELETE
  
- **Get All Clothing**  
  endpoint: http://localhost:5000/api/v1/clothing  
      atau  http://localhost:5000/api/v1/clothing?color=hijau  
      atau  http://localhost:5000/api/v1/clothing?size=m  
      atau  http://localhost:5000/api/v1/clothing?color=hij&size=m  
  method: GET
  
- **Add Stock**  
  endpoint: http://localhost:5000/api/v1/clothing/add-stock/:id  
  method: POST  
  body: {  
    "quantity": 1  
  }
  
- **Reduce Stock**  
  endpoint: http://localhost:5000/api/v1/clothing/reduce-stock/:id  
  method: POST  
  body: {  
    "quantity": 1  
  }
  
- **Get Out Of Stock Clothing**  
  endpoint: http://localhost:5000/api/v1/clothing/out-of-stock  
  method: GET
  
- **Get Lower than 5 Stock Clothing**  
  endpoint: http://localhost:5000/api/v1/clothing/below-five-stock  
  method: GET  

# Ketentuan
Deskripsi
Anda diminta untuk mengembangkan backend untuk sistem manajemen inventaris sebuah toko baju. Sistem ini harus dapat menangani pembaruan stok baju, penambahan baju baru, dan pencarian baju berdasarkan warna dan ukuran.

Spesifikasi (WAJIB)
- Sistem harus dapat menangani operasi CRUD untuk baju. ✅
- Setiap baju memiliki atribut warna, ukuran, harga, dan stok. ✅
- Sistem harus dapat mencari baju berdasarkan warna dan ukuran. ✅
- Sistem harus dapat menambahkan stok baju. ✅
- Sistem harus dapat mengurangi stok baju. ✅
- Sistem harus dapat menampilkan semua baju yang tersedia. ✅

Spesifikasi (Optional, mendapat nilai tambahan jika dikerjakan)
- Sistem dapat menampilkan semua baju yang stoknya habis. ✅
- Sistem dapat menampilkan semua baju yang stoknya kurang dari 5. ✅

Tech Stack
Dibebaskan untuk menggunakan tech stack apapun yang menurut Anda cocok untuk menyelesaikan tugas ini. Recommended stack: Node.js, Express.js, MongoDB or Go, Gin/Echo, Gorm, PostgreSQL.

Key points
- Penerapan SOLID Principles menjadi nilai plus. ✅
- Penerapan unit testing menjadi nilai plus. ✅ (Hanya Services)
- Penerapan Depedency Injection menjadi nilai plus. ✅

Deliverables
Silakan fork repository ini dan submit link repository hasil pengerjaan Anda ke https://bit.ly/study-case-backend-developer-msib
