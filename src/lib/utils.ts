import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function normalizePhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

export function phoneHref(phone: string) {
  const normalized = normalizePhone(phone).replace(/^00/, "+");
  return `tel:${normalized}`;
}

export function whatsappHref(phone: string, message: string) {
  const normalized = normalizePhone(phone).replace(/^00/, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
