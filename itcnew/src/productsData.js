const products = [
  {
    id: 1,
    name: "Sunfeast Farmlite Oats and Almonds, 150g",
    price: 160,
    discountPrice: 90,
    weight: "150 g",
    locations: ['Kolkata'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2F1%2F1%2F11996067-farmlite-oats-_-almonds-300g_3000x3000_fop.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 2,
    name: "Sunfeast Farmlite Super Multi Millet, 75g",
    price: 45,
    discountPrice: 44,
    weight: "75 g",
    locations: ['Kolkata'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku_1783.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 3,
    name: "Sunfeast Farmlite Super Choco Chip Millet, 75g",
    price: 45,
    discountPrice: 34,
    weight: "75 g",
    locations:['Kolkata'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku_1782.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 4,
    name: "Sunfeast Farmlite Oats and Raisins, 150g",
    price: 64,
    discountPrice: 50,
    weight: "150 g",
    locations: ['Bengaluru Urban'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku1782.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 5,
    name: "Sunfeast Farmlite Oats and Chocolate, 150g",
    price: 64,
    discountPrice: 40,
    weight: "150 g",
    locations: ['Bengaluru Urban'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku1781.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 6,
    name: "Sunfeast Farmlite Oats and Almonds, 150g",
    price: 64,
    discountPrice: 50,
    weight: "150 g",
    locations: ['Bengaluru Urban'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku1780.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 7,
    name: "Sunfeast All Rounder Biscuits : Thin Potato Biscuits - Cream & Herb, 28.2g",
    price: 10,
    discountPrice: 9,
    weight: "28.2 g",
    locations: ['Bengaluru Urban'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku1776_1.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 8,
    name: "Sunfeast Farmlite Digestive High Fibre, 50g",
    price: 10,
    discountPrice: 5,
    weight: "50 g",
    locations:['Bengaluru Urban', 'Kolkata'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku1774.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 9,
    name: "Sunfeast Caker Swiss Roll Cake, Chocolate, 23g",
    price: 10,
    discountPrice: 5,
    weight: "23 g",
    locations: ['Bengaluru Urban', 'Kolkata'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku_671.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 10,
    name: "Sunfeast Caker Trinity Cake, Triple Chocolate, 23g",
    price: 10,
    discountPrice: 5,
    weight: "23 g",
    locations: ['Bengaluru Urban', 'Kolkata'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku_670.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 11,
    name: "Sunfeast All Rounder Biscuits : Thin Potato Biscuits - Cream & Herb, 75g",
    price: 20,
    discountPrice: 10,
    weight: "75 g",
    locations: ['Kolkata', 'Bengaluru Urban'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku_660.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
  {
    id: 12,
    name: "Sunfeast Glucose, 1Kg",
    price: 120,
    discountPrice: 100,
    weight: "1 kg",
    locations: ['Kolkata', 'Bengaluru Urban'],
    image:
      "https://www.itcstore.in/_next/image?url=https%3A%2F%2Fadmin.itcstore.in%2Fmedia%2Fcatalog%2Fproduct%2Fs%2Fk%2Fsku_659.png%3Foptimize%3Dmedium%26fit%3Dbounds%26height%3D%26width%3D%26height%3D200%26width%3D200&w=1920&q=75",
  },
];

export default products;
