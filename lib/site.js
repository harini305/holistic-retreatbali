import images from "@/lib/images.json";

export { images };

// Contact details verified in docs/source-audit/03-content-inventory.md §1.1.
export const contact = {
  whatsappNumber: "6281236057888",
  phoneDisplay: "+62 812 3605 7888",
  phoneHref: "tel:+6281236057888",
  email: "info@baliholistic.com",
  addressLines: ["Jl Batur Sari, Gang VI No. 4", "Sanur, Bali, Indonesia 80227"],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Holistic+Retreat+Bali+Sanur",
  entity: "A subsidiary of PT Harmoni Indah Bali",
};

export function whatsappUrl(text) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const siteName = "Holistic Retreat Bali";
