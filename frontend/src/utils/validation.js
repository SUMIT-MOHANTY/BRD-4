export const isValidEmail = (email) => /[^@\s]+@[^@\s]+\.[^@\s]+/.test(email);
export const isValidPhone = (phone) => /^\+?[0-9\-\s]{7,15}$/.test(phone);
