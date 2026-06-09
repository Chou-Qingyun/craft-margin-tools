import { mkdir, writeFile } from "node:fs/promises";

const site = "https://craftmargintools.com";

const guides = [
  {
    slug: "etsy-fees-explained-for-beginners",
    title: "Etsy Fees Explained for Beginners",
    description: "A beginner-friendly guide to Etsy listing fees, transaction fees, payment processing, offsite ads, and seller profit.",
    category: "Etsy fees",
    intro:
      "Etsy fees can feel confusing because one order can include listing fees, marketplace fees, payment processing, shipping costs, and advertising costs. This guide explains the main fee buckets in plain language so you can estimate profit before publishing a listing.",
    sections: [
      {
        heading: "The main Etsy fee categories",
        body:
          "Most sellers should think about fees in layers. First there is the listing fee for publishing or renewing a listing. Then there are percentage-based marketplace fees on the order value. Payment processing can add another percentage and fixed fee. If an order comes through offsite ads, that can add another percentage cost.",
      },
      {
        heading: "A simple example",
        body:
          "If a buyer pays $30 for an item and shipping, the money you keep is not $30 minus product cost. You also need to subtract the listing fee, transaction fee, processing fee, shipping cost, packaging, and any ad cost. That is why a listing that looks profitable at first can become thin after the full fee stack is included.",
      },
      {
        heading: "How to use this guide",
        body:
          "Use this page to understand the fee categories, then run your real numbers through the calculator. Keep your own shop country, payment setup, and ad settings in mind because fee details can vary.",
      },
    ],
    bullets: ["Do not ignore shipping charged to the buyer.", "Include payment fixed fees on low-price items.", "Model offsite ads separately if your shop uses them."],
    tool: { href: "../../etsy-fee-calculator/", label: "Calculate Etsy fees" },
  },
  {
    slug: "etsy-transaction-fee-vs-payment-processing-fee",
    title: "Etsy Transaction Fee vs Payment Processing Fee",
    description: "Learn the difference between Etsy transaction fees and payment processing fees, and why both matter for seller profit.",
    category: "Etsy fees",
    intro:
      "Etsy transaction fees and payment processing fees are easy to mix up. They both reduce order profit, but they represent different parts of the order cost. Understanding the difference helps you price items more accurately.",
    sections: [
      {
        heading: "What the transaction fee represents",
        body:
          "The transaction fee is the marketplace fee Etsy charges on an order. For margin planning, sellers usually treat it as a percentage-based cost tied to the amount the buyer pays.",
      },
      {
        heading: "What payment processing represents",
        body:
          "Payment processing is the cost of handling the payment itself. It can include a percentage and a fixed fee, which is especially important for low-priced digital downloads, stickers, and small accessories.",
      },
      {
        heading: "Why the distinction matters",
        body:
          "If you only model the transaction fee, your projected profit will be too high. If you only model payment processing, you will miss the marketplace fee. Use both when setting prices or comparing products.",
      },
    ],
    bullets: ["Transaction fees and payment fees can both apply to the same order.", "Fixed payment fees hurt low-ticket products more.", "Use editable rates for your country and shop setup."],
    tool: { href: "../../etsy-fee-calculator/", label: "Compare fee types" },
  },
  {
    slug: "does-etsy-charge-fees-on-shipping",
    title: "Does Etsy Charge Fees on Shipping?",
    description: "Understand how shipping charged to the buyer affects Etsy fee and profit calculations for sellers.",
    category: "Etsy shipping",
    intro:
      "Shipping is one of the easiest places for Etsy sellers to miscalculate profit. The buyer may pay shipping, but that does not mean the shipping amount is pure profit. You still need to model marketplace fees and your real shipping cost.",
    sections: [
      {
        heading: "Why shipping changes profit math",
        body:
          "A paid shipping order increases the amount the buyer pays, while your real label or fulfillment cost reduces what you keep. If percentage fees apply to the buyer-paid order value, shipping can also affect the fee total.",
      },
      {
        heading: "Paid shipping vs free shipping",
        body:
          "Paid shipping makes the shipping amount visible to the buyer. Free shipping usually means the seller has moved shipping cost into the item price. Both models can work, but you need to calculate them instead of guessing.",
      },
      {
        heading: "How to model shipping",
        body:
          "Enter shipping charged as buyer-paid revenue and shipping cost as your actual cost. Then compare the net profit with a free-shipping version where shipping charged is zero and the item price is higher.",
      },
    ],
    bullets: ["Shipping charged is not the same as shipping profit.", "Free shipping still has a real cost.", "Compare both models before changing pricing."],
    tool: { href: "../../etsy-fee-calculator/", label: "Calculate shipping impact" },
  },
  {
    slug: "etsy-offsite-ads-fee-calculator-guide",
    title: "Etsy Offsite Ads Fee Calculator Guide",
    description: "Learn how to estimate Etsy offsite ads fees and understand their impact on order profit.",
    category: "Etsy ads",
    intro:
      "Offsite ads can turn a profitable-looking Etsy order into a much thinner sale. This guide explains how to think about offsite ads as an order-level cost and when to model them in your pricing.",
    sections: [
      {
        heading: "When offsite ads matter",
        body:
          "If an order is attributed to offsite ads, an additional percentage fee can apply. Sellers should model this scenario when deciding whether a listing can survive paid traffic and still keep enough margin.",
      },
      {
        heading: "How to calculate offsite ads impact",
        body:
          "Treat offsite ads as another percentage fee on the buyer-paid order value. Add the rate to your other percentage fees, then subtract it from revenue alongside product cost, shipping, and processing.",
      },
      {
        heading: "Pricing with ad risk",
        body:
          "If a listing only works when offsite ads are zero, it may be risky. Test the same listing with no offsite ads, a higher ad rate, and a higher item price to see whether the margin still makes sense.",
      },
    ],
    bullets: ["Run a no-ad and offsite-ad scenario.", "Watch low-margin POD products carefully.", "Use target pricing if ad fees erase profit."],
    tool: { href: "../../etsy-fee-calculator/", label: "Model offsite ads" },
  },
  {
    slug: "how-to-price-etsy-products-for-profit",
    title: "How to Price Etsy Products for Profit",
    description: "A practical Etsy pricing guide for sellers who want to include fees, shipping, product cost, ads, and target profit.",
    category: "Etsy pricing",
    intro:
      "Pricing Etsy products for profit means more than copying competitor prices. You need to know your costs, fees, shipping model, ad costs, and target profit before deciding whether a listing is worth launching.",
    sections: [
      {
        heading: "Start with your true costs",
        body:
          "Include materials, production, packaging, shipping, listing fees, payment fees, platform fees, and ad cost. If you sell handmade products, also decide how you want to value labor time.",
      },
      {
        heading: "Choose a target profit",
        body:
          "A target profit gives you a pricing floor. If the market price is below your profitable price, the problem may be the product, cost structure, or positioning rather than the calculator.",
      },
      {
        heading: "Compare scenarios",
        body:
          "Run paid shipping, free shipping, and ad-supported pricing separately. A product that works without ads may not work with ads, and a product that works domestically may not work internationally.",
      },
    ],
    bullets: ["Use costs first, competitors second.", "Set a target profit before publishing.", "Recalculate after changing shipping or ads."],
    tool: { href: "../../etsy-pricing-calculator/", label: "Find an Etsy price" },
  },
  {
    slug: "etsy-pricing-formula-handmade-sellers",
    title: "Etsy Pricing Formula for Handmade Sellers",
    description: "A pricing formula for handmade Etsy sellers that includes materials, labor, shipping, fees, and desired profit.",
    category: "Handmade pricing",
    intro:
      "Handmade Etsy pricing needs to include more than materials. A sustainable price should also consider labor, packaging, shipping, marketplace fees, payment processing, overhead, and profit.",
    sections: [
      {
        heading: "The basic handmade pricing formula",
        body:
          "A practical starting point is materials plus labor plus packaging plus shipping cost plus fees plus desired profit. The challenge is that percentage fees depend on the final selling price, so reverse pricing can be more accurate than simple addition.",
      },
      {
        heading: "Why labor matters",
        body:
          "If you leave labor out, a product may look profitable while paying you very little for your time. Even a simple hourly estimate can help you decide which products deserve more production time.",
      },
      {
        heading: "When to adjust the formula",
        body:
          "Premium handmade products may support higher margins because buyers care about customization, materials, quality, and story. Commodity products may need tighter cost control.",
      },
    ],
    bullets: ["Do not price handmade items by materials alone.", "Include packaging and overhead.", "Use reverse pricing for target profit."],
    tool: { href: "../../etsy-pricing-calculator/", label: "Calculate handmade pricing" },
  },
  {
    slug: "etsy-pricing-formula-pod-sellers",
    title: "Etsy Pricing Formula for POD Sellers",
    description: "A practical Etsy pricing formula for POD sellers using Printify, Printful, Gelato, or similar providers.",
    category: "POD pricing",
    intro:
      "POD pricing can be tricky because the provider handles production and fulfillment, but your margin still depends on base cost, shipping, marketplace fees, payment processing, and advertising.",
    sections: [
      {
        heading: "The POD pricing formula",
        body:
          "A useful POD formula is provider base cost plus provider shipping plus marketplace fees plus payment processing plus ad cost plus desired profit. If you offer free shipping, the item price needs to absorb the provider shipping cost.",
      },
      {
        heading: "Why variants matter",
        body:
          "A shirt in a larger size or a product shipped to a different country can have a different cost. Model your best-selling variants and destinations instead of assuming one cost works everywhere.",
      },
      {
        heading: "Pricing for ads",
        body:
          "If you plan to run Etsy ads or external ads, include expected ad cost per order. A product with a small margin can become unprofitable after only a few dollars of ad spend.",
      },
    ],
    bullets: ["Use provider base cost and shipping cost.", "Test free shipping separately.", "Add ad cost before scaling traffic."],
    tool: { href: "../../pod-profit-calculator/", label: "Calculate POD margin" },
  },
  {
    slug: "printify-profit-margin-calculator-guide",
    title: "Printify Profit Margin Calculator Guide",
    description: "Learn how to estimate Printify profit margins for POD products sold on Etsy or other marketplaces.",
    category: "Printify margins",
    intro:
      "Printify sellers need to know whether a product has enough margin after base cost, shipping, marketplace fees, payment processing, and ads. This guide shows how to think about Printify order profit before listing a product.",
    sections: [
      {
        heading: "What to include in Printify margin",
        body:
          "Use the product base cost for the exact print provider and variant, add Printify shipping, then subtract marketplace fees, payment processing, ad cost, and any returns allowance.",
      },
      {
        heading: "Why provider choice matters",
        body:
          "Different print providers can have different base costs, shipping prices, production times, and available variants. A cheaper base cost is not always better if shipping or quality hurts conversion.",
      },
      {
        heading: "How to compare products",
        body:
          "Run the same selling price through several product types, such as shirts, mugs, sweatshirts, and posters. Keep the products with enough margin after ads and fulfillment costs.",
      },
    ],
    bullets: ["Use exact variant costs.", "Include shipping and ads.", "Compare several providers or product types."],
    tool: { href: "../../pod-profit-calculator/", label: "Calculate Printify profit" },
  },
  {
    slug: "printful-vs-printify-profit-margin",
    title: "Printful vs Printify Profit Margin",
    description: "Compare Printful and Printify profit margins by modeling base cost, shipping, fees, and selling price.",
    category: "POD comparison",
    intro:
      "Printful and Printify can both work for POD sellers, but the better choice depends on product type, cost, shipping, quality, and margin. A simple profit comparison can make the decision clearer.",
    sections: [
      {
        heading: "Compare cost, not just price",
        body:
          "Look at the exact product base cost, shipping cost, and variant cost. Then add marketplace fees and payment processing. The provider with the lowest base cost may not always create the best net profit.",
      },
      {
        heading: "Compare margin by product",
        body:
          "A provider might be better for shirts while another is better for mugs, posters, or sweatshirts. Model each product separately instead of choosing one provider for everything.",
      },
      {
        heading: "Include operational factors",
        body:
          "Profit margin is important, but quality, mockups, production speed, support, and fulfillment reliability also affect reviews and conversion. Use margin as one decision input.",
      },
    ],
    bullets: ["Run the same sale price for both providers.", "Use actual shipping costs.", "Compare net profit and customer experience."],
    tool: { href: "../../pod-profit-calculator/", label: "Compare POD providers" },
  },
  {
    slug: "best-pod-products-with-high-margins",
    title: "Best POD Products with High Margins",
    description: "Ideas for POD products with stronger margin potential and tips for checking profitability before listing.",
    category: "POD products",
    intro:
      "The best POD products with high margins are not always the cheapest products. Strong margin often comes from a mix of reasonable base cost, buyer demand, personalization, giftability, and pricing power.",
    sections: [
      {
        heading: "Product types to test",
        body:
          "T-shirts, sweatshirts, mugs, posters, wall art, tote bags, stickers, and personalized gifts can all work. The better product is the one that keeps margin after shipping, marketplace fees, and ads.",
      },
      {
        heading: "Why personalization can help",
        body:
          "Personalized POD products can support higher prices because shoppers compare them less directly with generic items. Names, dates, occasions, and niche designs can improve pricing power.",
      },
      {
        heading: "How to choose products",
        body:
          "Shortlist products by demand and then run each through a margin calculator. If a product needs perfect ad performance to break even, it may not be a good first product.",
      },
    ],
    bullets: ["Test giftable niches.", "Model shipping before listing.", "Use margin, demand, and conversion together."],
    tool: { href: "../../pod-profit-calculator/", label: "Check POD product profit" },
  },
  {
    slug: "how-much-profit-should-you-make-on-etsy",
    title: "How Much Profit Should You Make on Etsy?",
    description: "Learn how to think about Etsy profit per order, profit margin, ads, fees, and sustainable pricing.",
    category: "Etsy profit",
    intro:
      "There is no single correct Etsy profit number. The right target depends on product type, labor, costs, competition, ad strategy, and how much margin you need to make the shop worth running.",
    sections: [
      {
        heading: "Profit per order vs profit margin",
        body:
          "Profit per order tells you how many dollars you keep. Profit margin tells you how efficient the listing is. A high-margin low-dollar item and a lower-margin high-dollar item can both be useful in different shops.",
      },
      {
        heading: "Include the hidden costs",
        body:
          "Sellers often forget packaging, samples, software, refunds, returns, ads, and time. These costs can turn a seemingly healthy listing into a weak one.",
      },
      {
        heading: "Set a minimum profit rule",
        body:
          "Choose a minimum profit per order that makes sense for your shop. Then use calculators to reject products that cannot reach that number after fees and costs.",
      },
    ],
    bullets: ["Track dollars and margin.", "Include ads and overhead.", "Set a minimum profit before launching products."],
    tool: { href: "../../etsy-fee-calculator/", label: "Estimate Etsy profit" },
  },
  {
    slug: "etsy-digital-product-pricing-guide",
    title: "Etsy Digital Product Pricing Guide",
    description: "A guide to pricing Etsy digital products such as printables, templates, planners, SVGs, and downloads.",
    category: "Digital products",
    intro:
      "Digital products have no physical shipping cost, but they still need smart pricing. Sellers should include marketplace fees, payment processing, listing fees, ads, software subscriptions, and support time.",
    sections: [
      {
        heading: "What affects digital product pricing",
        body:
          "Pricing depends on the product's usefulness, niche, buyer intent, competition, bundle size, design quality, and whether it saves the buyer time or helps them make money.",
      },
      {
        heading: "Watch fixed fees",
        body:
          "Low-priced downloads can be sensitive to payment fixed fees and listing fees. A $2 product may need much higher sales volume than a $9 product to justify the same support and software costs.",
      },
      {
        heading: "Think monthly",
        body:
          "Digital product shops often pay for design tools, keyword tools, mockups, and email platforms monthly. Model monthly profit, not just one sale.",
      },
    ],
    bullets: ["Include software costs.", "Avoid underpricing useful templates.", "Track profit by product line."],
    tool: { href: "../../digital-product-profit-calculator/", label: "Calculate digital profit" },
  },
  {
    slug: "how-to-price-svg-files-on-etsy",
    title: "How to Price SVG Files on Etsy",
    description: "Learn how to price SVG files and bundles on Etsy while accounting for fees, ads, software, and support.",
    category: "SVG pricing",
    intro:
      "SVG files can sell at low prices, but low prices can make fees and ad costs painful. A better pricing strategy considers bundle size, commercial use, niche demand, and monthly shop costs.",
    sections: [
      {
        heading: "Single SVG vs bundle pricing",
        body:
          "A single SVG may need a lower price to stay competitive, while bundles can support a higher price and better fee efficiency. Bundles also give buyers more perceived value.",
      },
      {
        heading: "Commercial use and licensing",
        body:
          "If you include commercial use terms, make them clear and price accordingly. Buyers may pay more when the product helps them create items for resale.",
      },
      {
        heading: "Profit checks for SVG sellers",
        body:
          "Include listing fees, payment processing, ad cost per sale, software subscriptions, and support time. Small products can be profitable, but only when volume and costs make sense.",
      },
    ],
    bullets: ["Bundles can improve fee efficiency.", "Clarify license terms.", "Use monthly profit to judge the shop."],
    tool: { href: "../../digital-product-profit-calculator/", label: "Calculate SVG profit" },
  },
  {
    slug: "how-to-price-printable-planners",
    title: "How to Price Printable Planners",
    description: "A pricing guide for printable planners, worksheets, journals, and digital downloads sold on Etsy.",
    category: "Printable pricing",
    intro:
      "Printable planners can support stronger pricing when they solve a specific problem for a specific buyer. Pricing should reflect usefulness, design quality, page count, niche, and seller costs.",
    sections: [
      {
        heading: "What makes a printable valuable",
        body:
          "A printable planner is more valuable when it saves time, organizes a stressful task, supports a business workflow, or fits a clear niche such as weddings, budgeting, homeschooling, or small business planning.",
      },
      {
        heading: "Avoid racing to the bottom",
        body:
          "Very low prices can attract volume, but fees, ads, and support still apply. If your planner is useful and differentiated, test a price that leaves room for profit.",
      },
      {
        heading: "Use bundles carefully",
        body:
          "Bundles can raise average order value, but only if the pages are relevant together. A focused bundle usually beats a large unfocused bundle.",
      },
    ],
    bullets: ["Price around the problem solved.", "Include marketplace and ad costs.", "Use bundles to raise order value."],
    tool: { href: "../../digital-product-profit-calculator/", label: "Calculate printable profit" },
  },
  {
    slug: "etsy-listing-seo-checklist-guide",
    title: "Etsy Listing SEO Checklist Guide",
    description: "A practical Etsy listing SEO checklist for titles, tags, photos, descriptions, variations, and buyer clarity.",
    category: "Etsy SEO",
    intro:
      "An Etsy listing needs to be clear to both search engines and shoppers. A practical checklist helps you catch missing tags, weak titles, unclear descriptions, and poor product presentation before publishing.",
    sections: [
      {
        heading: "Start with buyer language",
        body:
          "Use words shoppers would actually type. A creative product name can be useful for branding, but the title should still describe what the item is, who it is for, and what occasion or use case it fits.",
      },
      {
        heading: "Use tags strategically",
        body:
          "Tags should cover product type, audience, occasion, style, material, and use case. Avoid repeating the exact same phrase in every tag slot if broader related terms would help coverage.",
      },
      {
        heading: "Make the listing trustworthy",
        body:
          "Photos, variations, shipping clarity, and ordering instructions help conversion. SEO traffic is less useful if shoppers cannot quickly understand what they are buying.",
      },
    ],
    bullets: ["Use descriptive titles.", "Fill relevant tag slots.", "Make ordering steps clear."],
    tool: { href: "../../etsy-listing-seo-checklist/", label: "Run the SEO checklist" },
  },
  {
    slug: "etsy-title-and-tag-examples",
    title: "Etsy Title and Tag Examples",
    description: "Examples of Etsy listing titles and tags for gifts, POD products, digital downloads, and handmade items.",
    category: "Etsy SEO",
    intro:
      "Good Etsy titles and tags help shoppers understand your product quickly. The goal is not keyword stuffing. The goal is clear buyer language that covers product type, audience, occasion, and useful variations.",
    sections: [
      {
        heading: "Gift product example",
        body:
          "For a bridesmaid mug, a clear title might include personalized bridesmaid mug, wedding party gift, custom name cup, and bridal party favor. Tags can cover bridesmaid mug, wedding party gift, custom mug, maid of honor, bridal party, and personalized cup.",
      },
      {
        heading: "Digital product example",
        body:
          "For a printable budget planner, the title can mention printable budget planner, finance worksheet, savings tracker, and instant download. Tags can include budget planner, printable planner, savings tracker, finance printable, and money worksheet.",
      },
      {
        heading: "POD product example",
        body:
          "For a niche sweatshirt, include product type, audience, design theme, and occasion. Avoid vague tags that do not describe the buyer's search intent.",
      },
    ],
    bullets: ["Use product type in the title.", "Tags should cover different angles.", "Avoid unrelated trendy terms."],
    tool: { href: "../../etsy-listing-seo-checklist/", label: "Check title and tags" },
  },
  {
    slug: "how-many-etsy-tags-should-i-use",
    title: "How Many Etsy Tags Should I Use?",
    description: "Learn how to think about Etsy tags, keyword coverage, and listing relevance before publishing.",
    category: "Etsy tags",
    intro:
      "Etsy sellers should use tag slots to cover relevant buyer searches. The best tags are not random keywords. They are phrases that describe the product, audience, occasion, style, material, and use case.",
    sections: [
      {
        heading: "Use relevant tag coverage",
        body:
          "A listing with only a few tags has fewer chances to match buyer language. Fill relevant slots with phrases that describe what the product is and why someone would buy it.",
      },
      {
        heading: "Avoid tag repetition",
        body:
          "Repeating the same phrase in slightly different ways can waste coverage. Use related but distinct phrases when they accurately describe the product.",
      },
      {
        heading: "Tag ideas to test",
        body:
          "Think about product type, recipient, occasion, material, style, room, holiday, personalization, and buyer problem. Then choose the terms that match the listing best.",
      },
    ],
    bullets: ["Use as many relevant tags as practical.", "Avoid unrelated keywords.", "Review tags when search queries change."],
    tool: { href: "../../etsy-listing-seo-checklist/", label: "Check Etsy tags" },
  },
  {
    slug: "etsy-seo-mistakes-beginners-make",
    title: "Etsy SEO Mistakes Beginners Make",
    description: "Common Etsy SEO mistakes that hurt listing clarity, keyword coverage, and buyer conversion.",
    category: "Etsy SEO",
    intro:
      "Beginner Etsy sellers often focus on one keyword and miss the bigger listing picture. Strong Etsy SEO is about clear product language, good photos, relevant tags, helpful descriptions, and conversion-friendly details.",
    sections: [
      {
        heading: "Mistake 1: vague titles",
        body:
          "A title that sounds cute but does not describe the product can make it harder for shoppers to find or understand the listing. Put clear product language first.",
      },
      {
        heading: "Mistake 2: weak tag coverage",
        body:
          "Using only a few tags or repeating the same idea reduces keyword coverage. Tags should describe product type, recipient, occasion, and use case.",
      },
      {
        heading: "Mistake 3: ignoring conversion",
        body:
          "SEO traffic needs product clarity. Poor mockups, unclear variations, missing shipping information, and weak descriptions can reduce sales even when the listing gets impressions.",
      },
    ],
    bullets: ["Write for buyers first.", "Use relevant keyword variety.", "Improve listing clarity, not just keywords."],
    tool: { href: "../../etsy-listing-seo-checklist/", label: "Find listing gaps" },
  },
  {
    slug: "pod-t-shirt-pricing-example",
    title: "POD T-Shirt Pricing Example",
    description: "A practical POD t-shirt pricing example for Etsy and print-on-demand sellers.",
    category: "POD pricing",
    intro:
      "A POD t-shirt price needs to cover provider base cost, shipping, marketplace fees, payment processing, ads, and profit. This example shows how to think through the numbers before publishing.",
    sections: [
      {
        heading: "Start with customer revenue",
        body:
          "If the shirt sells for $24.99 and the buyer pays $3.99 shipping, customer-paid revenue is $28.98. That number is the starting point, not the profit.",
      },
      {
        heading: "Subtract POD and selling costs",
        body:
          "Next subtract the shirt base cost, provider shipping, marketplace fee, payment processing, ad cost, and returns allowance. The remaining amount is the estimated order profit.",
      },
      {
        heading: "Test higher and lower prices",
        body:
          "Run the same shirt at $22.99, $24.99, and $29.99. A small price change can make a big difference when your costs and fees are fixed.",
      },
    ],
    bullets: ["Customer revenue is not profit.", "Include provider shipping.", "Test several prices before publishing."],
    tool: { href: "../../pod-profit-calculator/", label: "Calculate t-shirt profit" },
  },
  {
    slug: "mug-pricing-calculator-example",
    title: "Mug Pricing Calculator Example",
    description: "A practical mug pricing example for Etsy POD sellers and personalized gift shops.",
    category: "POD pricing",
    intro:
      "Mugs are popular POD and gift products, but shipping, packaging, marketplace fees, and ads can reduce profit quickly. A pricing example helps you decide whether a mug listing is worth launching.",
    sections: [
      {
        heading: "Model the full mug order",
        body:
          "Enter the mug sale price, shipping charged, POD base cost, provider shipping, marketplace fees, processing, and ad cost. For personalized mugs, include any extra design or support time you want to track.",
      },
      {
        heading: "Personalization can improve pricing power",
        body:
          "A generic mug may compete mostly on price. A personalized mug for a specific audience or occasion can support a higher price because it solves a more specific gifting need.",
      },
      {
        heading: "Watch shipping cost",
        body:
          "Mugs can have meaningful shipping costs. If you offer free shipping, make sure the item price absorbs the provider shipping charge and still leaves profit.",
      },
    ],
    bullets: ["Use provider-specific mug costs.", "Include shipping and ads.", "Test personalized pricing separately."],
    tool: { href: "../../pod-profit-calculator/", label: "Calculate mug profit" },
  },
];

const basePages = [
  "/",
  "/etsy-fee-calculator/",
  "/pod-profit-calculator/",
  "/etsy-pricing-calculator/",
  "/digital-product-profit-calculator/",
  "/etsy-listing-seo-checklist/",
];

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const renderGuide = (guide) => {
  const related = guides
    .filter((item) => item.slug !== guide.slug && item.category === guide.category)
    .slice(0, 3);
  const fallbackRelated = guides.filter((item) => item.slug !== guide.slug).slice(0, 3);
  const relatedGuides = related.length ? related : fallbackRelated;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(guide.title)} | CraftMarginTools.com</title>
    <meta name="description" content="${escapeHtml(guide.description)}">
    <link rel="canonical" href="${site}/guides/${guide.slug}/">
    <link rel="stylesheet" href="../../styles.css">
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="../../" aria-label="CraftMarginTools.com home">
        <span class="brand-mark">CM</span>
        <span>CraftMarginTools.com</span>
      </a>
      <nav class="top-nav" aria-label="Primary navigation">
        <a href="../../#tools">Tools</a>
        <a href="../../#guides">Guides</a>
      </nav>
    </header>

    <main>
      <article class="guide-page">
        <header class="guide-hero">
          <p class="eyebrow">${escapeHtml(guide.category)}</p>
          <h1>${escapeHtml(guide.title)}</h1>
          <p class="hero-lede">${escapeHtml(guide.intro)}</p>
          <a class="button primary" href="${guide.tool.href}">${escapeHtml(guide.tool.label)}</a>
        </header>

        <div class="guide-layout">
          <div class="guide-body">
            ${guide.sections
              .map(
                (section) => `<section class="content-block">
              <h2>${escapeHtml(section.heading)}</h2>
              <p>${escapeHtml(section.body)}</p>
            </section>`,
              )
              .join("\n")}

            <section class="content-block">
              <h2>Quick checklist</h2>
              <ul>
                ${guide.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n                ")}
              </ul>
            </section>
          </div>

          <aside class="guide-sidebar">
            <h2>Use the free tool</h2>
            <p>Run the numbers with the calculator that matches this topic.</p>
            <a class="button primary" href="${guide.tool.href}">${escapeHtml(guide.tool.label)}</a>
            <h2>Related guides</h2>
            <ul>
              ${relatedGuides
                .map((item) => `<li><a href="../${item.slug}/">${escapeHtml(item.title)}</a></li>`)
                .join("\n              ")}
            </ul>
          </aside>
        </div>
      </article>
    </main>

    <footer class="site-footer">
      <span>CraftMarginTools.com</span>
      <a href="../../">All seller tools</a>
    </footer>
  </body>
</html>
`;
};

const renderSitemap = () => {
  const urls = [...basePages, ...guides.map((guide) => `/guides/${guide.slug}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>\n    <loc>${site}${url}</loc>\n  </url>`).join("\n")}
</urlset>
`;
};

await mkdir("guides", { recursive: true });

for (const guide of guides) {
  const dir = `guides/${guide.slug}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, renderGuide(guide));
}

await writeFile("sitemap.xml", renderSitemap());

console.log(`Generated ${guides.length} long-tail SEO pages.`);
