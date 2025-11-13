const Order = require("../model/order.model");

const getOrder = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 50;

    const skip = (page - 1) * limit;

    const data = await Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
    const totalCount = await Order.countDocuments();

    return res.status(200).json({
      message: "Order data fetched",
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      dataCount: data.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch order data" });
  }
};

module.exports = {
  getOrder
};
