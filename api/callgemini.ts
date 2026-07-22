export default {
  async fetch(request: Request) {
    console.log(request);
    const response = await fetch('https://api.vercel.app/products');
    const products = await response.json();
    return Response.json(products);
  },
};