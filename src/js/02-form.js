console.log("02-form yüklendi ✅");

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Form verilerini al
let formData = { email: '', message: '' };

// Sayfa yüklendiğinde localStorage'dan veri al ve formu doldur
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    formData = JSON.parse(savedData) || {};
    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
  } catch (e) {
    console.error('LocalStorage verisi çözülemedi:', e);
  }
}

// Form input olayında veriyi güncelle ve kaydet
form.addEventListener('input', event => {
  const { name, value } = event.target;

  // Form verisini güncelle
  formData[name] = value.trimStart();

  // LocalStorage'a kaydet
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Form submit olayı
form.addEventListener('submit', event => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!email || !message) {
    alert('Please fill in both fields!');
    return;
  }

  console.log({ email, message });

  // LocalStorage temizle, formu resetle
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
});
