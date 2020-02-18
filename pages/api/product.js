import Product from '../../models/Product';
import Cart from '../../models/Cart';
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await handleGetReq(req, res)
      break;
    case 'POST':
      await handlePostReq(req, res)
      break;
    case 'DELETE':
      await handleDeleteReq(req, res)
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`);
      break;
  }  
}

async function handleGetReq(req, res) {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}

async function handlePostReq(req, res) {
  const {name, price, description, mediaUrl} = req.body;
  try {
    if(!name || !price || !description || !mediaUrl) {
      return res.status(422).send("Product missing one or more fields");
    }
  
    const product = new Product({
      name,
      price,
      description,
      mediaUrl
    });
  
    await product.save();
  
    res.status(201).json(product)
  } catch (error) {
    res.status(500).send('Server error in creating product')
  }
}

async function handleDeleteReq(req, res) {
  const { _id } = req.query;
  try {
    await Product.findOneAndDelete({ _id });
    await Cart.updateMany(
      { "products.product": _id },
      { $pull: { products: { product: _id } } }
    )
    res.status(204).json({});
  } catch (error) {
    res.status(500).send('error deleting product');
  }

}