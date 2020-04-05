import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res, next) => {
  if (req.method === 'GET') {
    const { page, size } = req.query
    const pageNum = Number(page);
    const pageSize = Number(size);
    let products = [];
    const totalDocs = await Product.countDocuments();
    // const totalDocs = 20
    const totalPages = Math.ceil(totalDocs / pageSize)
    if (pageNum === 1) {
      products = await Product.find().limit(pageSize);
    } else {
      const skips = pageSize * (pageNum - 1)
      products = await Product.find().skip(skips).limit(pageSize);
    }
    res.status(200).json({ products, totalPages });
  }
}