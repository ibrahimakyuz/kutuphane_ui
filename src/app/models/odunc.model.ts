// export interface Odunc {
//   id?: number;
//   kullaniciId?: number;
//   kitapId: number;
//   alisTarihi?: string | Date;
//   iadeTarihi?: string | Date | null;
//   iadeEdildi?: boolean;
//   kitapAdi?: string;  // Eğer API kitap adını dönerse kullanılabilir
// }
export interface Odunc {
  id?: number;
  kullaniciId?: number;
  kitapId: number;
  alisTarihi?: string | Date;
  iadeTarihi?: string | Date | null;
  iadeEdildi?: boolean;
  kitapAdi?: string;         // ✅ Kitap adı gösterimi için
  kullaniciAdi?: string;     // ✅ Kullanıcı adı gösterimi için
}
