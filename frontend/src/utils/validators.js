export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  // Rwanda phone number format: 078XXXXXXX or 079XXXXXXX or 072XXXXXXX or 073XXXXXXX
  const re = /^(078|079|072|073)\d{7}$/;
  return re.test(phone);
};

export const validateNationalId = (id) => {
  // Rwanda National ID: 16 digits
  const re = /^\d{16}$/;
  return re.test(id);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8 &&
         /[A-Z]/.test(password) &&
         /[a-z]/.test(password) &&
         /\d/.test(password);
};