/* Menu data. Source: zaviyagrill.com food menu (Oct 2026). Descriptions are short summaries of the source.
   Item shape: [name, price, description, options]. Options: g (group label), img (key in images.mjs), mods (modifier groups),
   diet (only values the source states), note, avail (false hides the Add button). */
const sodas = ["Coke", "Pepsi", "Diet Coke", "Sprite", "Pakola", "Thumsup", "Dr. Pepper", "Orange Crush"].map((l) => ({ l }));
const grillPicks = [["Chicken Tikka Leg", 0], ["Chicken Tikka Breast", 2], ["Chicken Malai Boti", 0], ["Chicken Haryali Boti", 0], ["Chicken Tikka Boti", 0], ["Chicken Seekh Kabab", 0], ["Chicken Chapli Kabab", 0], ["Beef Bihari Kabab", 0], ["Beef Seekh Kabab", 0], ["Beef Chapli Kabab", 0]].map(([l, a]) => ({ l, a }));
const size = (m, l, name = "Size") => ({ id: "size", label: name, type: "single", required: true, options: [{ l: `Medium`, a: 0 }, { l: `Large`, a: +(l - m).toFixed(2) }] });

export const MENU = [
  { id: "appetizers-soups", name: "Appetizers and Soups", items: [
    ["Pani Puri", 8.99, "Crispy puris with spiced potatoes and tangy spiced water."],
    ["Dahi Puri", 9.99, "Puris with chickpeas, potatoes, onions, yogurt, and tamarind and mint sauces."],
    ["Bhel Puri", 9.99, "Puffed rice, sev, chickpeas, and tamarind and green sauces."],
    ["Sev Puri", 9.99, ""],
    ["Vegetable Samosa (2 pcs)", 5.99, "Spiced potato and pea filling, fried.", { diet: ["Vegetarian"] }],
    ["Chicken Samosa (2 pcs)", 6.49, "Spiced ground chicken, served with tamarind chutney and raita."],
    ["Beef Samosa (2 pcs)", 6.49, "Spiced ground beef, served with tamarind chutney and raita."],
    ["Vegetable Spring Rolls (4 pcs)", 5.99, "Cabbage, carrot, celery, green onion and noodles."],
    ["Lahori Fish", 15.99, ""],
    ["Mixed Vegetable Pakora", 8.99, "Chickpea-flour vegetable fritters.", { diet: ["Gluten free", "Vegan"] }],
    ["Channa Papdi Chaat", 8.99, "Chickpeas, potatoes, yogurt, wheat chips and chutney."],
    ["Samosa Chaat", 9.99, "Samosas with potatoes, chutneys, yogurt and sev."],
    ["Chicken Wings (6 pcs)", 11.99, "Served in BBQ sauce.", { mods: [{ id: "heat", label: "Heat", type: "single", required: true, options: [{ l: "Mild", a: 0 }, { l: "Medium", a: 0 }] }] }],
    ["Chilli Chicken", 11.99, ""],
    ["Chicken Corn Soup", 4.99, ""],
    ["Chicken Hot N Sour Soup", 4.99, ""],
    ["Beef Shami Kabab (2 pcs)", 6.99, "Minced beef with kebab masala."],
    ["Fried Mirchi", 5.99, ""],
  ] },
  { id: "rolls-burgers", name: "Rolls, Wraps and Burgers", items: [
    ["Chicken Boti Roll", 10.99, "Chicken boti in the bread of your choice, with tamarind chutney and raita."],
    ["Chicken Malai Boti Roll", 10.99, "Malai boti in the bread of your choice, with tamarind chutney and raita."],
    ["Chicken Seekh Kebab Roll", 10.99, "Chicken kebab in the bread of your choice, with tamarind chutney and raita."],
    ["Beef Bihari Roll", 10.99, "Beef bihari in the bread of your choice, with tamarind chutney and raita."],
    ["Beef Seekh Kabab Roll", 10.99, "Beef kebab in the bread of your choice, with tamarind chutney and raita."],
    ["Beef Shami Kabab Roll", 10.99, ""],
    ["Paneer Tikka Roll", 10.99, "Paneer marinated in yogurt and chili paste, in buttery bread."],
    ["Beef Chapli Burger with Fries", 13.99, ""],
    ["Chicken Chapli Burger with Fries", 12.99, ""],
    ["Bun Kabab with Fries", 9.99, ""],
  ] },
  { id: "grill-platters", name: "Mix Grill and Family Platters", items: [
    ["Family Grill Platter", 149.99, "Feeds 6 to 8. Beef bihari kabab, chicken malai boti, beef seekh kabab, chicken tikka leg and chicken boti."],
    ["Family Grill Platter (Chicken)", 139.99, "Feeds 6 to 8. Chicken boti, malai boti, seekh kabab, tikka leg and tikka breast."],
    ["Special Grill Platter", 49.99, "Beef bihari kabab, chicken malai boti, chicken tikka breast, chapli kabab and mutton chops.", { img: "special" }],
    ["Mix Grill Platter (Choose 3)", 22.99, "Pick any three grilled items.", { img: "mix", mods: [{ id: "picks", label: "Choose 3 items", type: "multi", required: true, min: 3, max: 3, options: grillPicks }] }],
  ] },
  { id: "grill-specials", name: "Zaviya Grill Specials", items: [
    ["Mutton Chops", 26.99, "Marinated in fresh spices."],
    ["Chicken Leg", 8.99, "Tandoori masala.", { img: "leg" }],
    ["Chicken Breast", 10.99, "Tandoori masala.", { img: "breast" }],
    ["Chicken Malai Boti (Boneless)", 14.99, "Overnight-marinated barbecued chicken.", { img: "malai" }],
    ["Chicken Haryali Boti (Green Chicken Grill)", 14.99, ""],
    ["Chicken Tikka Boti (Boneless)", 14.99, ""],
    ["Chicken Seekh Kebab", 13.99, "Minced chicken skewers with onion and herbs.", { img: "chseekh" }],
    ["Chicken Chapli Kabab", 14.99, "Tawa-grilled chicken patties."],
    ["Beef Bihari Kebab", 14.99, "Thin barbecued beef slices.", { img: "bihari" }],
    ["Beef Seekh Kebab", 13.99, "Charcoal-grilled beef skewers.", { img: "bseekh" }],
    ["Beef Chapli Kebab", 15.99, "Tawa-grilled beef patties."],
    ["Paneer Tikka", 13.99, "Paneer in a tomato and onion sauce."],
    ["Whole Tandoori Chicken", 24.99, "Needs about one hour to prepare.", { note: "Allow about 1 hour." }],
  ] },
  { id: "beef-curries", name: "Beef Curries", items: [
    ["Beef Nihari", 15.99, "Beef shank simmered slowly overnight."],
    ["Beef Paya", 13.49, "Trotters in spices."],
    ["Aloo Qeema (Beef)", 16.99, "Minced beef with potatoes."],
    ["Beef Seekh Kebab Masala", 16.99, "Minced beef in a yogurt sauce."],
    ["Beef Brain Masala", 24.99, "Bheja fry. Spiced brain in sauce.", { img: "brain" }],
  ] },
  { id: "chicken-curries", name: "Chicken Curries", items: [
    ["Chicken Karahi", 17.99, "Tomato and butter cream sauce with serrano peppers.", { img: "karahi" }],
    ["Chicken White Karahi", 18.99, ""],
    ["Tikka Masala", 17.99, "Grilled chicken in a creamy tomato sauce.", { img: "tikka" }],
    ["Butter Chicken", 17.99, "Tomato cream sauce with bell peppers and onion."],
    ["Chicken 65 (Dry)", 15.99, "Spicy, deep-fried boneless chicken.", { img: "c65" }],
    ["Tawa Chicken", 17.99, "Cooked on a griddle with onion and tomato.", { img: "tawa" }],
    ["Chicken Qorma", 16.99, "Almond, cashew and yogurt sauce.", { img: "qorma" }],
    ["Murgh Chorley", 16.99, "Chicken with chickpeas and tomato."],
  ] },
  { id: "goat-curries", name: "Goat Curries", items: [
    ["Goat Karahi", 22.99, "Tomato and onion gravy with ginger and garlic.", { img: "goatkarahi" }],
    ["Achar Gosht", 22.99, "Lamb in pickled spices."],
    ["Goat Haleem", 15.99, "Slow-cooked porridge of grain and meat.", { img: "haleem" }],
    ["Goat Korma", 20.99, "Yogurt-based curry."],
    ["Daal Gosht", 20.99, "Goat with lentils."],
    ["Palak Gosht", 20.99, ""],
    ["Bhindi Gosht", 20.99, "Goat with okra and green chilies."],
  ] },
  { id: "biryani-rice", name: "Biryani and Rice", items: [
    ["Chicken Biryani", 15.99, "Served with 2 oz of mint raita.", { g: "Biryani" }],
    ["Mutton Biryani (Goat)", 18.49, "Served with 2 oz of mint raita.", { g: "Biryani" }],
    ["Vegetable Biryani", 13.49, "Served with 2 oz of mint raita.", { g: "Biryani" }],
    ["Chicken Fried Rice", 15.99, "", { g: "Fried Rice", img: "friedrice" }],
    ["Shrimp Fried Rice", 18.49, "", { g: "Fried Rice" }],
    ["Vegetable Fried Rice", 13.49, "", { g: "Fried Rice" }],
    ["Zeera Rice", 5.99, "Cumin and onion.", { g: "Plain Rice" }],
    ["Plain Rice", 3.99, "", { g: "Plain Rice" }],
  ] },
  { id: "seafood", name: "Seafood", items: [
    ["Shrimp Masala", 18.99, ""],
    ["Tawa Fish (Sizzler)", 17.99, ""],
  ] },
  { id: "vegetable-curries", name: "Vegetable Curries", items: [
    ["Tarka Daal (Lentils)", 12.99, "Mixed lentils with tempered onion and curry leaves."],
    ["Chana Masala (Garbanzos)", 12.99, "Chickpeas and tomato.", { diet: ["Vegetarian", "Vegan"] }],
    ["Aloo Gobhi (Cauliflower)", 12.99, "Potato and cauliflower.", { diet: ["Vegetarian"] }],
    ["Aloo Palak", 12.99, ""],
    ["Bhindi Dopiaza (Okra)", 12.99, "Okra in an onion and tomato gravy."],
    ["Mixed Vegetables", 12.99, "Peas, carrots, potatoes and green beans."],
    ["Palak Paneer (Saag Paneer)", 14.99, "Spinach sauce with paneer."],
    ["Paneer Karahi", 15.99, ""],
    ["Paneer Tikka Masala", 15.99, "Paneer in a rich tomato sauce."],
  ] },
  { id: "breads", name: "Breads", items: [
    ["Naan (Plain)", 2.99, ""],
    ["Garlic Naan", 4.99, "Butter and cilantro."],
    ["Garlic Bullet Naan", 5.99, ""],
    ["Bullet Naan", 4.99, "Cilantro, jalapeno and garlic."],
    ["Papa Naan", 3.49, "A crisper plain naan."],
    ["Sesame Naan", 4.99, ""],
    ["Paratha", 3.99, "Layered flatbread."],
    ["Chapati", 2.79, "Whole wheat flatbread."],
    ["Puri", 1.99, "Deep-fried bread."],
  ] },
  { id: "drinks", name: "Drinks", items: [
    ["Canned Soda", 2.49, "Choose your soda.", { mods: [{ id: "soda", label: "Soda", type: "single", required: true, options: sodas }] }],
    ["Water Bottle (FIJI)", 2.49, ""],
    ["Chai", 2.99, ""],
    ["Mint Green Tea", 3.99, ""],
    ["Lassi Pitcher", 24.99, "Dine in only.", { note: "Dine in only." }],
    ["Mawa Sweet Lassi", 7.99, ""],
    ["Mango Lassi", 5.99, ""], ["Sweet Lassi", 5.99, ""], ["Strawberry Lassi", 5.99, ""], ["Rose Lassi", 5.99, ""],
    ["Peach Lassi", 5.99, ""], ["Pakola Lassi", 5.99, ""], ["Salt Lassi", 5.99, ""],
    ["Mexican Coke", 4.49, ""], ["Topo Chico", 3.99, ""],
    ["Mint Mojito", 8.99, ""], ["Mango Mojito", 8.99, ""], ["Watermelon Mojito", 8.99, ""],
    ["Mint Lemonade Freeze", 8.99, ""], ["Pina Colada", 8.99, ""], ["Tropical Twist", 8.99, ""], ["Summer Dream", 8.99, ""],
  ] },
  { id: "desserts", name: "Desserts", items: [
    ["Gajjar Halwa with Gulab Jaman", 8.99, ""],
    ["Gajjar Halwa", 6.49, "Carrot pudding with ghee, milk and cardamom."],
    ["Gulab Jaman", 5.99, "Milk-solid dumplings in rose syrup.", { img: "gulab" }],
    ["Kheer", 5.99, "Rice pudding with cardamom and nuts."],
    ["Ras Malai", 5.99, "Cheese dumplings in sweet milk."],
    ["Fruit Custard", 5.99, "Seasonal fruit with custard."],
    ["Ras Gullah", 5.99, ""],
    ["Sooji Halwa", 3.99, "Weekend only.", { img: "halwa", note: "Weekend only." }],
  ] },
  { id: "kids", name: "Kids Menu", items: [
    ["Chicken Nuggets with Fries", 9.99, ""],
    ["Chicken Tenders (3 pcs) with Fries", 10.99, "Organic chicken."],
    ["Fish N' Chips", 10.99, ""],
    ["Fries", 4.99, ""],
  ] },
  { id: "weekend-special", name: "Weekend Special", note: "Served 11:30 AM to 4:00 PM.", items: [
    ["Halwa, Channa, Aloo and 3 Puri", 11.99, "Sooji halwa, channa masala, aloo tarkari and 3 puris.", { note: "Weekends, 11:30 AM to 4:00 PM." }],
  ] },
  { id: "ultimate-faloodas", name: "Ultimate Faloodas", note: "Each comes with an Alpha Signature mug.", items: [
    ["Rose Falooda Ultimate", 15.99, ""], ["Lahori Falooda Ultimate", 15.99, ""], ["Signature Falooda Ultimate", 15.99, ""],
    ["Dry Fruit Falooda Ultimate", 15.99, ""], ["Cream Soda Falooda Ultimate", 15.99, ""],
  ] },
  { id: "alpha-desserts", name: "Alpha Specialty Desserts", items: [
    ["Molten Lava Cake a la Mode", 8.99, ""],
    ["Rabri Delight", 8.99, ""],
    ["Kulfi Delight Plate", 7.99, ""],
    ["Gola Ganda", 6.59, "", { mods: [size(6.59, 8.59)] }],
    ["Ultimate Gola Ganda", 9.99, ""],
    ["Mangonada", 9.99, "", { mods: [{ id: "version", label: "Version", type: "single", required: true, options: [{ l: "Classic", a: 0 }, { l: "Ultimate", a: 6 }] }] }],
  ] },
  { id: "kulfi", name: "Kulfi", items: [
    ["Kulfi", 3.99, "Choose your flavor.", { mods: [{ id: "flavor", label: "Flavor", type: "single", required: true, options: ["Rose", "Khoya", "Mango", "Oreo", "Pistachio", "Chocolate", "Coffee"].map((l) => ({ l, a: 0 })) }] }],
  ] },
  { id: "falooda", name: "Falooda", items: [
    ["Rose Falooda", 7.99, ""], ["Lahori Falooda", 8.99, ""], ["Signature Falooda", 8.99, ""], ["Dry Fruit Falooda", 8.99, ""],
    ["Cream Soda Falooda", 7.99, ""], ["Mango Delight Falooda", 7.99, "Seasonal."],
  ] },
  { id: "ultimate-shakes", name: "Ultimate Shakes", note: "Each is served in an Alpha Signature Mason jar.", items: [
    ["Cold Coffee Shake", 15.99, ""], ["Birthday Cake Shake", 15.99, ""], ["Candy Delight Shake", 15.99, ""],
    ["Cotton Candy Shake", 15.99, "", { img: "cotton" }], ["Cookies n' Cream Shake (Oreo)", 15.99, ""], ["Brownie Shake", 15.99, ""],
  ] },
  { id: "fresh-juices", name: "100% Fresh Juices", note: "No added sugar, preservatives or artificial flavors.", items:
    ["Apple", "Carrot", "Orange", "Pineapple", "Watermelon", "Carrot and Apple", "Orange and Carrot", "Strawberry and Kiwi", "Pineapple and Cucumber", "Apple, Orange and Carrot", "Masala Chat Cocktail", "V5 Cocktail", "Citrus Cocktail", "Kickstart", "Immune Booster", "Red Detox", "Green Goodness"]
      .map((n) => [n + " Juice", 6.99, "", { mods: [size(6.99, 7.49)] }]).concat([["Sugarcane Juice", 6.99, "Seasonal.", { mods: [size(6.99, 7.49)], note: "Seasonal." }]]) },
  { id: "milkshakes", name: "Milkshakes", items:
    ["Banana", "Strawberry", "Chocolate", "Nutella", "Cold Coffee", "Cookies n' Cream (Oreo)", "Almond", "Brownie", "Candy", "Fig Cashew", "Date", "Vanilla", "Red Velvet"].map((n) => [n + " Milkshake", 6.99, ""])
      .concat([["Mango Milkshake", 6.99, "Seasonal.", { note: "Seasonal." }], ["Chikko Milkshake", 6.99, "Seasonal.", { note: "Seasonal." }]]) },
  { id: "smoothies", name: "Smoothies", items: [
    ["Banana Smoothie", 6.99, ""], ["Strawberry Banana Smoothie", 6.99, ""], ["Strawberry Smoothie", 6.99, ""], ["Pina Colada Smoothie", 6.99, ""], ["Mango Smoothie", 6.99, "Seasonal.", { note: "Seasonal." }],
  ] },
];

export const NOTES = ["Auto-gratuity of 15% applies to parties of 4 or more, and 20% to parties of 10 or more.", "Add-on items may take 25 to 30 minutes."];

const slug = (s) => s.toLowerCase().replace(/&/g, "and").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
/* Normalise: stable ids, unique slugs, validate. */
export const CATS = MENU.map((c) => ({
  ...c, slug: c.id,
  items: c.items.map(([name, price, desc, o = {}]) => ({
    id: slug(name), name, price, desc: desc || "", group: o.g || "", img: o.img || "", mods: o.mods || [], diet: o.diet || [], note: o.note || "", available: o.avail !== false, cat: c.id, catName: c.name,
  })),
}));
const seen = new Set();
for (const c of CATS) for (const it of c.items) {
  if (seen.has(it.id)) throw new Error("duplicate item id " + it.id);
  seen.add(it.id);
  if (!(it.price > 0)) throw new Error("bad price " + it.id);
  for (const m of it.mods) if (m.required && m.type === "multi" && m.min > m.options.length) throw new Error("mod " + it.id);
}
export const ITEMS = CATS.flatMap((c) => c.items);
export const FEATURED = ["tikka-masala", "chicken-karahi", "mix-grill-platter-choose-3", "goat-karahi", "chicken-seekh-kebab", "gulab-jaman"];
