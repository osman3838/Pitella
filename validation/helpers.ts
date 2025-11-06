export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const normalizePhone = (v: string) =>
  v.replace(/[^\d+]/g, '')
   .replace(/^00/, '+');

export const strongPassword = (v: string) => {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v);
};

export const MSG = {
  required: 'Bu alan zorunludur',
  email: 'Geçerli bir e-posta girin',
  phone: 'Geçerli bir telefon girin',
  name: 'Geçerli bir ad girin',
  surname: 'Geçerli bir soyad girin',
  password:
    'Şifre en az 8 karakter olmalı ve en az bir harf ile bir rakam içermeli',
  passwordsNotMatch: 'Parolalar eşleşmiyor',
  kvkk: 'KVKK metnini onaylamalısınız',
  contract: 'Kullanıcı sözleşmesini onaylamalısınız',
};
