const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const percent = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
});

const numberValue = (form, name) => {
  const field = form.elements[name];
  return field ? Number(field.value || 0) : 0;
};

const rateValue = (form, name) => numberValue(form, name) / 100;

const classifyProfit = (value) => (value < 0 ? "bad" : value < 5 ? "warn" : "good");

const renderResults = (target, items) => {
  if (!target) return;

  target.innerHTML = items
    .map(
      (item) => `
        <div class="result-card ${item.tone || ""}">
          <strong>${item.label}</strong>
          <span>${item.value}</span>
        </div>
      `,
    )
    .join("");
};

const calculateEtsy = (form) => {
  const revenue = numberValue(form, "price") + numberValue(form, "shippingCharged");
  const costs = numberValue(form, "productCost") + numberValue(form, "shippingCost");
  const fees =
    numberValue(form, "listingFee") +
    numberValue(form, "processingFixed") +
    numberValue(form, "adCost") +
    revenue * (rateValue(form, "transactionRate") + rateValue(form, "processingRate") + rateValue(form, "offsiteRate"));
  const profit = revenue - costs - fees;
  const margin = revenue > 0 ? profit / revenue : 0;

  renderResults(document.querySelector("#etsy-results"), [
    { label: "Gross revenue", value: money.format(revenue) },
    { label: "Total fees", value: money.format(fees) },
    { label: "Net profit", value: money.format(profit), tone: classifyProfit(profit) },
    { label: "Profit margin", value: percent.format(margin), tone: classifyProfit(profit) },
  ]);
};

const calculatePod = (form) => {
  const revenue = numberValue(form, "price") + numberValue(form, "shippingCharged");
  const costs =
    numberValue(form, "baseCost") +
    numberValue(form, "shippingCost") +
    numberValue(form, "adCost") +
    numberValue(form, "returnsCost");
  const fees =
    numberValue(form, "processingFixed") +
    revenue * (rateValue(form, "platformRate") + rateValue(form, "processingRate"));
  const profit = revenue - costs - fees;
  const margin = revenue > 0 ? profit / revenue : 0;

  renderResults(document.querySelector("#pod-results"), [
    { label: "Customer pays", value: money.format(revenue) },
    { label: "POD + ads cost", value: money.format(costs) },
    { label: "Net profit", value: money.format(profit), tone: classifyProfit(profit) },
    { label: "Profit margin", value: percent.format(margin), tone: classifyProfit(profit) },
  ]);
};

const calculatePricing = (form) => {
  const desiredProfit = numberValue(form, "desiredProfit");
  const shippingCharged = numberValue(form, "shippingCharged");
  const fixedCosts =
    numberValue(form, "productCost") +
    numberValue(form, "shippingCost") +
    numberValue(form, "listingFee") +
    numberValue(form, "processingFixed") +
    numberValue(form, "adCost");
  const totalRate = rateValue(form, "transactionRate") + rateValue(form, "processingRate") + rateValue(form, "offsiteRate");
  const denominator = 1 - totalRate;
  const targetPrice = denominator > 0 ? (desiredProfit + fixedCosts - shippingCharged * denominator) / denominator : 0;
  const roundedPrice = Math.max(0, targetPrice);
  const totalRevenue = roundedPrice + shippingCharged;
  const estimatedFees = numberValue(form, "listingFee") + numberValue(form, "processingFixed") + totalRevenue * totalRate + numberValue(form, "adCost");

  renderResults(document.querySelector("#pricing-results"), [
    { label: "Suggested item price", value: money.format(roundedPrice), tone: "good" },
    { label: "Customer pays", value: money.format(totalRevenue) },
    { label: "Estimated fees", value: money.format(estimatedFees) },
    { label: "Target profit", value: money.format(desiredProfit), tone: "good" },
  ]);
};

const calculateDigital = (form) => {
  const price = numberValue(form, "price");
  const sales = numberValue(form, "sales");
  const revenue = price * sales;
  const perSaleFees =
    price * (rateValue(form, "marketplaceRate") + rateValue(form, "processingRate")) +
    numberValue(form, "processingFixed") +
    numberValue(form, "listingFee") +
    numberValue(form, "adCost") +
    numberValue(form, "supportCost");
  const totalFees = perSaleFees * sales + numberValue(form, "softwareCost");
  const profit = revenue - totalFees;
  const margin = revenue > 0 ? profit / revenue : 0;

  renderResults(document.querySelector("#digital-results"), [
    { label: "Monthly revenue", value: money.format(revenue) },
    { label: "Total costs", value: money.format(totalFees) },
    { label: "Monthly profit", value: money.format(profit), tone: classifyProfit(profit) },
    { label: "Profit margin", value: percent.format(margin), tone: classifyProfit(profit) },
  ]);
};

const contains = (text, keyword) => keyword && text.toLowerCase().includes(keyword.toLowerCase());

const calculateSeo = (form) => {
  const keyword = form.elements.keyword.value.trim();
  const title = form.elements.title.value.trim();
  const description = form.elements.description.value.trim();
  const tags = form.elements.tags.value
    .split("\n")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const checks = [
    title.length >= 45 && title.length <= 140,
    contains(title, keyword),
    tags.length >= 10,
    tags.some((tag) => contains(tag, keyword)),
    description.length >= 120,
    contains(description, keyword),
    form.elements.photos.checked,
    form.elements.variations.checked,
    form.elements.shipping.checked,
    form.elements.cta.checked,
  ];
  const passed = checks.filter(Boolean).length;
  const score = Math.round((passed / checks.length) * 100);
  const nextStep =
    tags.length < 10
      ? "Add more tags"
      : description.length < 120
        ? "Expand description"
        : score >= 80
          ? "Ready to refine"
          : "Cover missing basics";

  renderResults(document.querySelector("#seo-results"), [
    { label: "SEO score", value: `${score}%`, tone: score >= 80 ? "good" : score >= 60 ? "warn" : "bad" },
    { label: "Checks passed", value: `${passed}/10` },
    { label: "Tag count", value: `${tags.length}/13` },
    { label: "Next step", value: nextStep, tone: score >= 80 ? "good" : "warn" },
  ]);
};

const calculators = {
  etsy: calculateEtsy,
  pod: calculatePod,
  pricing: calculatePricing,
  digital: calculateDigital,
  seo: calculateSeo,
};

document.querySelectorAll("[data-calculator]").forEach((form) => {
  const update = () => calculators[form.dataset.calculator](form);
  form.addEventListener("input", update);
  update();
});

document.querySelectorAll(".tool-tab[data-tool]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const selected = tab.dataset.tool;
    document.querySelectorAll(".tool-tab").forEach((item) => item.classList.toggle("active", item === tab));
    document.querySelectorAll(".tool-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === selected);
    });
  });
});
