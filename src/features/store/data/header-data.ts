export type HeaderLink = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

export type CategoryTab = {
  id: string;
  label: string;
  columns: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }>;
};

export const topContacts = [
  { label: "+91 987 654 3210" },
  { label: "+91 987 654 3210" },
] as const;

export const languageOptions = ["English", "Italiano"] as const;
export const currencyOptions = ["Dollar", "Euro"] as const;

export const locationOptions = [
  "Current Location",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "San Diego",
] as const;

export const mainNavLinks: HeaderLink[] = [
  {
    label: "Home",
    children: [
      { label: "Grocery", href: "/" },
      { label: "Fashion", href: "/" },
      { label: "Fashion 2", href: "/" },
    ],
  },
  {
    label: "Categories",
    children: [
      { label: "Left sidebar", href: "/categories" },
      { label: "Right sidebar", href: "/categories" },
      { label: "Full width", href: "/categories" },
    ],
  },
  {
    label: "Products",
    children: [
      { label: "Product left sidebar", href: "/products/sample-item" },
      { label: "Product right sidebar", href: "/products/sample-item" },
      { label: "Product full width", href: "/products/sample-item" },
    ],
  },
  {
    label: "Blog",
    children: [
      { label: "Blog left sidebar", href: "/" },
      { label: "Blog right sidebar", href: "/" },
      { label: "Blog full width", href: "/" },
    ],
  },
  {
    label: "Others",
    children: [
      { label: "About us", href: "/account" },
      { label: "Contact us", href: "/account" },
      { label: "FAQ", href: "/account" },
    ],
  },
];

export const categoryTabs: CategoryTab[] = [
  {
    id: "dairy-bakery",
    label: "Dairy & Bakery",
    columns: [
      {
        title: "Dairy",
        links: [
          { label: "Milk", href: "/categories" },
          { label: "Ice cream", href: "/categories" },
          { label: "Cheese", href: "/categories" },
          { label: "Frozen custard", href: "/categories" },
        ],
      },
      {
        title: "Bakery",
        links: [
          { label: "Cake and Pastry", href: "/categories" },
          { label: "Rusk Toast", href: "/categories" },
          { label: "Bread & Buns", href: "/categories" },
          { label: "Cream Roll", href: "/categories" },
        ],
      },
    ],
  },
  {
    id: "fruits-vegetable",
    label: "Fruits & Vegetable",
    columns: [
      {
        title: "Fruits",
        links: [
          { label: "Apple", href: "/categories" },
          { label: "Orange", href: "/categories" },
          { label: "Banana", href: "/categories" },
          { label: "Kiwi", href: "/categories" },
        ],
      },
      {
        title: "Vegetable",
        links: [
          { label: "Broccoli", href: "/categories" },
          { label: "Cabbage", href: "/categories" },
          { label: "Tomato", href: "/categories" },
          { label: "Pepper", href: "/categories" },
        ],
      },
    ],
  },
  {
    id: "snack-spice",
    label: "Snack & Spice",
    columns: [
      {
        title: "Snacks",
        links: [
          { label: "French fries", href: "/categories" },
          { label: "Potato chips", href: "/categories" },
          { label: "Cookies", href: "/categories" },
          { label: "Popcorn", href: "/categories" },
        ],
      },
      {
        title: "Spice",
        links: [
          { label: "Cinnamon Powder", href: "/categories" },
          { label: "Cumin Powder", href: "/categories" },
          { label: "Pepper Powder", href: "/categories" },
          { label: "Long Pepper", href: "/categories" },
        ],
      },
    ],
  },
  {
    id: "juice-drinks",
    label: "Juice & Drinks",
    columns: [
      {
        title: "Juice",
        links: [
          { label: "Mango Juice", href: "/categories" },
          { label: "Coconut Water", href: "/categories" },
          { label: "Apple Juices", href: "/categories" },
          { label: "Lychee Juice", href: "/categories" },
        ],
      },
      {
        title: "Soft Drink",
        links: [
          { label: "Green Cola", href: "/categories" },
          { label: "Jolt Cola", href: "/categories" },
          { label: "Mecca Cola", href: "/categories" },
          { label: "Topsia Cola", href: "/categories" },
        ],
      },
    ],
  },
];

export const mobileMenuSections = [
  {
    id: "mobile-home",
    label: "Home",
    links: [
      { label: "Grocery", href: "/" },
      { label: "Fashion", href: "/" },
      { label: "Fashion 2", href: "/" },
    ],
  },
  {
    id: "mobile-categories",
    label: "Categories",
    links: [
      { label: "Shop category", href: "/categories" },
      { label: "Banner layout", href: "/categories" },
      { label: "List layout", href: "/categories" },
    ],
  },
  {
    id: "mobile-products",
    label: "Products",
    links: [
      { label: "Product page", href: "/products/sample-item" },
      { label: "Product accordion", href: "/products/sample-item" },
    ],
  },
  {
    id: "mobile-blog",
    label: "Blog",
    links: [
      { label: "Blog list", href: "/" },
      { label: "Blog detail", href: "/" },
    ],
  },
  {
    id: "mobile-others",
    label: "Others",
    links: [
      { label: "Cart", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
      { label: "Account", href: "/account" },
    ],
  },
] as const;
