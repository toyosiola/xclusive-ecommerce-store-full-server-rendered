import Product from "@/models/ProductModel";
import allProducts from "@/data/productsData.json";

export default async function populateDB() {
  await Product.deleteMany();
  const products = await Product.create(allProducts);
  console.log(products);
}
