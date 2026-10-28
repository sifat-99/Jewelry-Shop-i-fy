# Jewelry Shop - Shopify থিম ডকুমেন্টেশন

এই থিমটি **https://le-velair.nl/en** ওয়েবসাইটের সম্পূর্ণ ডিজাইন, লেআউট, অ্যানিমেশন, কালার কম্বিনেশন এবং ইউজার এক্সপেরিয়েন্স হুবহু (১:১ সেইম টু সেইম) অনুসরণ করে একটি সম্পূর্ণ স্বাধীন ও ফ্রেশ Shopify Online Store 2.0 থিম হিসেবে তৈরি করা হয়েছে।

> **বিশেষ দ্রষ্টব্য:** আপনার আগের প্রজেক্ট ফোল্ডার (`/Users/sifat/Project/BSS_Shopify`) সম্পূর্ণ অপরিবর্তিত ও সুরক্ষিত রাখা হয়েছে। এই নতুন থিমটি সম্পূর্ণ আলাদা ফোল্ডার `/Users/sifat/Project/Le_Velair_Shopify` তে তৈরি করা হয়েছে।

---

## ১. থিম আর্কিটেকচার ও ফিচারসমূহ

### ক. অ্যানাউন্সমেন্ট বার (`sections/announcement.liquid`)
- রোটেটিং টিকার/স্লাইডার অ্যানিমেশন:
  1. `CYBER MONDAY WEEK SALE 20% OFF ~ CODE: CYBER20`
  2. `Free shipping from €39`
- ব্যাকগ্রাউন্ড ও টেক্সট কালার থিম এডিটর থেকে পরিবর্তনযোগ্য।

### খ. হেডার ও মেগা মেনু (`sections/header.liquid`)
- অরিজিনাল Jewelry Shop ট্রান্সপারেন্ট ও স্টিকি হেডার।
- হাই-রেজোলিউশন ব্র্যান্ড লোগো (`assets/logo.png`)।
- মেগা মেনু ড্রপডাউন:
  - **BESTSELLERS**: ৪টি ভিজ্যুয়াল প্রোমো কার্ড (Chains, Rings, Bracelets, Earrings) হোভার জুম এফেক্টসহ।
  - **ENGRAVABLE JEWELRY**: পারসোনালাইজেশন ক্যাটাগরি তালিকা (Kettingen, Armbanden, Ringen, Bangles, Sleutelhangers)।
  - **JEWELLERY**: মাল্টি-কলাম অল-প্রোডাক্টস ক্যাটাগরি ও পিয়ার্সিংস।
  - **NEW**, **VINGERAFDRUK SIERADEN**, **GENTLEMEN**, **OUTLET**, **PERMANENTE SIERADEN**।
- লাইভ প্রেডিক্টিভ সার্চ পপডাউন মোডাল।
- মোবাইল হ্যামবার্গার ড্রয়ার নেভিগেশন।

### গ. হিরো স্লাইডশো (`sections/section-slideshow.liquid`)
- Jewelry Shop-এর অরিজিনাল হাই-রেজ ব্যানার (`hero_banner_1.jpg`, `hero_banner_2.png`)।
- অটো-প্লে, ডটস ইন্ডিকেটর ও প্রিভিয়াস/নেক্সট কন্ট্রোল।
- কল-টু-অ্যাকশন বোতাম ("Discover Now", "Shop Collection")।

### ঘ. প্রোডাক্ট গ্রিড ও কুইক অ্যাড (`snippets/product-grid-item.liquid` & `sections/section-collection.liquid`)
- **NIEUWE COLLECTIE** সেকশন।
- প্রোডাক্ট কার্ডে সেকেন্ডারি ইমেজ হোভার ফ্লিপ এফেক্ট।
- সেল ডিসকাউন্ট পারসেন্টেজ ব্যাজ (যেমন `-28%`)।
- ডেস্কটপ হোভারে স্মুথ স্লাইড-আপ "Add to Cart" / "Choose Options" বোতাম।

### ঙ. মোজাইক গ্রিড (`sections/section-mosaic.liquid`)
- ৩-কলাম ইন্টারঅ্যাক্টিভ ক্যাটাগরি টাইলস (Bestsellers, The Ring, Handchains)।
- অরিজিনাল মোজাইক ইমেজ্রি (`mosaic_1.jpg`, `mosaic_2.jpg`, `mosaic_3.jpg`)।
- স্মুথ স্কেলিং হোভার অ্যানিমেশন ও স্টাইলিশ অ্যাকশন বোতাম।

### চ. স্প্লিট কালেকশন শোকেস (`sections/collection-split.liquid`)
- ১. **Engravable jewelry**: বামে হাই-ফ্যাশন স্টিকি ব্যানার (`split_banner_1.jpg`), ডানে ২-কলাম প্রোডাক্ট গ্রিড।
- ২. **The ring**: ডানে স্টিকি ব্যানার (`split_banner_2.jpg`), বামে রিংস প্রোডাক্ট গ্রিড।

### ছ. ইনস্টাগ্রাম লাইফস্টাইল ফিড (`sections/instagram-feed.liquid`)
- "Follow us - Jewelry Shop" ভিজ্যুয়াল জুয়েলারি লাইফস্টাইল গ্রিড।

### জ. ট্রাস্ট ব্যাজ ও ভ্যালু প্রপোজিশন (`sections/section-icons.liquid`)
- ৪টি মূল ব্র্যান্ড গ্যারান্টি:
  1. Free Shipping from €39
  2. 100% Waterproof (Stainless steel)
  3. Personal Touch (Custom engraving)
  4. 14 Days Returns

### ঝ. এজ্যাক্স কার্ট ড্রয়ার (`snippets/cart-drawer.liquid`)
- পেজ রিলোড ছাড়াই ইন্সট্যান্ট কার্ট আপডেট।
- **€39 ফ্রি শিপিং প্রগ্রেস বার** (অর্ডার অ্যামাউন্ট অনুযায়ী ডাইনামিক বার ও মেসেজ ক্যালকুলেশন)।
- কোয়ান্টিটি ইনক্রিমেন্ট/ডিক্রিমেন্ট (+ / -) এবং রিমুভ ফিচার।
- ডাইনামিক সাবটোটাল ও "To Settle" চেকআউট বোতাম।
- ইউরোপিয়ান পেমেন্ট মেথড ব্যাজ (iDEAL, Bancontact, Klarna, Visa, Mastercard, Shop Pay, PayPal)।

### ঞ. সিঙ্গেল প্রোডাক্ট পেজ (`sections/main-product.liquid`)
- থাম্বনেইল গ্যালারি ইমেজ প্রিভিউ।
- ভ্যারিয়েন্ট সিলেক্টর (সাইজ/লেংথ/কালার)।
- পারসোনালাইজড জুয়েলারির জন্য কাস্টম এনগ্রেভিং ইনপুট ফিল্ড।
- কোয়ান্টিটি সিলেক্টর ও এজ্যাক্স অ্যাড-টু-কার্ট।
- ডিটেইলস অ্যাকর্ডিয়নস (Description, Shipping & Returns, Materials & Care)।

---

## ২. এক্সপোর্ট করা প্রোডাক্ট ডেটা (CSV & JSON)

Jewelry Shop-এর সব প্রোডাক্ট ও ইমেজ এক্সপোর্ট করে প্রস্তুত রাখা হয়েছে:
1. **`shopify_products_import.csv`**:
   - শপিফাইয়ের অফিশিয়াল CSV ফরম্যাটে মোট **৬৭২টি প্রোডাক্ট** এবং তাদের সব ভ্যারিয়েন্ট, অপশন ও ইমেজ (১৭৯২ রো)।
   - শপিফাই অ্যাডমিনের **Products > Import** এ গিয়ে এই CSV ফাইলটি সিলেক্ট করলেই সব প্রোডাক্ট আপনার স্টোরে ১ ক্লিকে আপলোড হয়ে যাবে।
2. **`products_full.json`**:
   - সব প্রোডাক্টের র ডেটা ব্যাকআপ।

---

## ৩. লোকালি রান করার নিয়মাবলী

আপনার মেশিনে Shopify CLI ইনস্টল করা আছে। লোকালি থিমটি রান করে প্রিভিউ দেখার জন্য:

```bash
# ১. নতুন থিম ফোল্ডারে যান
cd /Users/sifat/Project/Le_Velair_Shopify

# ২. লোকাল ডেভেলপমেন্ট সার্ভার চালু করুন
shopify theme dev --store your-store-name.myshopify.com
```

> কমান্ডটি রান করলে টার্মিনালে একটি লোকাল URL (`http://127.0.0.1:9292`) আসবে। ব্রাউজারে সেই লিংকে ঢুকলে আপনি সম্পূর্ণ থিমটি লাইভ দেখতে ও টেস্ট করতে পারবেন।

---

## ৪. লাইভ স্টোরে পুশ করার নিয়মাবলী

লোকালি চেক করার পর থিমটি আপনার শপিফাই স্টোরে আপলোড করতে:

```bash
cd /Users/sifat/Project/Le_Velair_Shopify

# স্টোরে থিম পুশ করতে
shopify theme push --store your-store-name.myshopify.com
```

---

## ৫. থিম কোড ভ্যালিডেশন
থিমটি Shopify-এর অফিশিয়াল `shopify theme check` টুলে রান করা হয়েছে:
- **Result:** `38 files inspected with no offenses found` (০ এরর, ০ ওয়ার্নিং)।
- Online Store 2.0 স্ট্যান্ডার্ড পুরোপুরি মেনে তৈরি।
