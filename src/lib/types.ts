export const SERVICE_CATEGORIES = [
  "Photography & Videography",
  "Wedding Venues",
  "Decoration & Florist",
  "Catering Services",
  "Makeup & Styling",
  "Wedding Fashion",
] as const;
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

export type VendorSummary = {
  _id: string;
  name: string;
  image?: string | null;
  businessName?: string;
  subscriptionPlan?: "free" | "premium";
  subscriptionExpiresAt?: string | null;
};

export type Service = {
  _id: string;
  vendorId: VendorSummary | string;
  serviceName: string;
  category: ServiceCategory;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: "pending" | "approved" | "rejected" | "suspended";
  isAvailable: boolean;
  rejectionReason?: string;
  createdAt: string;
};

export type BookingStatus = "pending" | "accepted" | "rejected" | "cancelled";
