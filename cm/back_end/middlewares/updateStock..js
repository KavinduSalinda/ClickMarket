const Product = require('../models/products');

exports.updateStock =async(req, res) => {
    try {
      const newStockCount = req.body.stockCount;
      const id = req.body.id;
      console.log(newStockCount)
      console.log(id)
  
      await Product.updateOne({ id: id }, { stockCount: newStockCount });
  
      // Send a success response
      res.status(200).json({ message: 'Stock count updated successfully' });
    } catch (error) {
      console.error('Error updating stock count:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

