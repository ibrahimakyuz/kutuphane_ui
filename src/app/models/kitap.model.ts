interface Kitap {
  id: number;
  ad: string;
  yayinevi: string;
  sayfaSayisi: number;
  stok: number;
  yazar: {
    id: number;
    ad: string;
    soyad: string;
  };
  kategori: {
    id: number;
    ad: string;
  };
}