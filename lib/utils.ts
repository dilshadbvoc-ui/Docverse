import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function generateMetaTitle(title: string): string {
  return `${title} | DocVerse - India's #1 PhD Guidance Platform`;
}

export const DISCIPLINES = [
  "Management",
  "Computer Science",
  "Engineering",
  "Commerce",
  "English Literature",
  "Psychology",
  "Education",
  "Biotechnology",
  "Information Technology",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Economics",
  "Sociology",
  "Political Science",
  "Law",
];

export const STATES = [
  "Kerala",
  "Tamil Nadu",
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Telangana",
  "Andhra Pradesh",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Bihar",
  "Odisha",
  "Punjab",
  "Haryana",
  "Assam",
  "Jharkhand",
  "Chhattisgarh",
  "Uttarakhand",
  "Himachal Pradesh",
  "Goa",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
];

export const BUDGET_RANGES = [
  "Below ₹30,000",
  "₹30,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "₹1,00,000 - ₹2,00,000",
  "₹2,00,000+",
];

export const PROGRAM_MODES = [
  { value: "FULL_TIME", label: "Full-time" },
  { value: "PART_TIME", label: "Part-time" },
  { value: "ONLINE", label: "Online" },
  { value: "DISTANCE", label: "Distance" },
];

export const QUALIFICATIONS = [
  "B.A.",
  "B.Sc.",
  "B.Com.",
  "B.Tech",
  "B.E.",
  "BBA",
  "BCA",
  "M.A.",
  "M.Sc.",
  "M.Com.",
  "M.Tech",
  "M.E.",
  "MBA",
  "MCA",
  "M.Phil.",
  "Other",
];
