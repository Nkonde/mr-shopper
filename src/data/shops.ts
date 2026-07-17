export type ShopMenuItem = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  description: string;
};

export type Shop = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  time: string;
  delivery: string;
  emoji: string;
  color: string;
  menu: ShopMenuItem[];
};

export const SHOPS: Shop[] = [
  {
    id: 'mamas-kitchen', name: "Mama's Kitchen", cuisine: 'African • Home-style', rating: 4.9, time: '20-30 min', delivery: 'Free delivery', emoji: '🥘', color: '#FFF0E4',
    menu: [
      { id: 'mama-pap-chicken', name: 'Pap & Grilled Chicken', price: 89, emoji: '🍗', description: 'Grilled chicken, pap and chakalaka' },
      { id: 'mama-beef-stew', name: 'Traditional Beef Stew', price: 95, emoji: '🥘', description: 'Slow-cooked beef with seasonal vegetables' },
      { id: 'mama-vetkoek', name: 'Mince Vetkoek', price: 42, emoji: '🥙', description: 'Golden vetkoek filled with savoury mince' },
    ],
  },
  {
    id: 'urban-slice', name: 'Urban Slice', cuisine: 'Pizza • Italian', rating: 4.8, time: '25-35 min', delivery: 'R15 delivery', emoji: '🍕', color: '#FFEDEC',
    menu: [
      { id: 'urban-margherita', name: 'Margherita Pizza', price: 85, emoji: '🍕', description: 'Tomato, mozzarella and fresh basil' },
      { id: 'urban-pepperoni', name: 'Pepperoni Pizza', price: 105, emoji: '🍕', description: 'Pepperoni, mozzarella and tomato sauce' },
      { id: 'urban-pasta', name: 'Creamy Chicken Pasta', price: 92, emoji: '🍝', description: 'Penne, chicken and parmesan cream' },
    ],
  },
  {
    id: 'burger-yard', name: 'Burger Yard', cuisine: 'Burgers • Fast food', rating: 4.7, time: '15-25 min', delivery: 'Free delivery', emoji: '🍔', color: '#FFF5DC',
    menu: [
      { id: 'yard-beef', name: 'Classic Beef Burger', price: 68, emoji: '🍔', description: 'Beef patty, cheese, lettuce and house sauce' },
      { id: 'yard-chicken', name: 'Crispy Chicken Burger', price: 64, emoji: '🍔', description: 'Crispy chicken, slaw and spicy mayo' },
      { id: 'yard-fries', name: 'Loaded Fries', price: 45, emoji: '🍟', description: 'Fries topped with cheese and burger sauce' },
    ],
  },
  {
    id: 'green-bowl', name: 'Green Bowl', cuisine: 'Healthy • Salads', rating: 4.6, time: '10-20 min', delivery: 'R10 delivery', emoji: '🥗', color: '#EAF8EF',
    menu: [
      { id: 'green-chicken', name: 'Grilled Chicken Bowl', price: 76, emoji: '🥗', description: 'Chicken, avocado, grains and greens' },
      { id: 'green-veggie', name: 'Rainbow Veggie Bowl', price: 65, emoji: '🥙', description: 'Roasted vegetables, hummus and quinoa' },
      { id: 'green-smoothie', name: 'Green Smoothie', price: 38, emoji: '🥤', description: 'Spinach, mango, banana and apple' },
    ],
  },
];

export function getShop(id?: string) {
  return SHOPS.find((shop) => shop.id === id);
}
