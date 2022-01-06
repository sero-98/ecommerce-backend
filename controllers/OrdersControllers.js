const Order = require('../models/order');
const Clothe = require('../models/clothe');


// Create new Order
const newOrder = async (req, res) => {

  const { 
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  })

  res.json({ 
    message: 'Order created',
    Order: order,  
  });

}


// Get single order
const getOrder = async (req, res) => {

  const id = req.params.id;

  const order = await Order.findById(id)
    .populate('user', 'name email');

  res.status(200).json({ 
    Order: order,  
    message: 'Order retrieved',
  });

}


// Get logged in user Orders (user, admin)
const myOrders = async (req, res) => {

  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({ 
    Orders: orders,  
    message: 'Order retrieved',
  });

}


// Get all Orders -- Admin
const getOrders = async (req, res) => {

  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({ 
    Orders: orders, 
    TotalAmount: totalAmount, 
    message: 'Order retrieved',
  });

}


async function updateStock(id, quantity) {
  const clothe = await Clothe.findById(id);

  clothe.Stock -= quantity;

  await clothe.save({ validateBeforeSave: false });
}


// Update Order Status -- Admin
const updateOrder = async (req, res) => {

  const { id } = req.params;

  const order = Order.findById(id);

  // Shipped : Enviado
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.clothe, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({ 
    Order: order,  
    message: 'Order updated',
  });

}


// Delete Order -- Admin
const deleteClothe = async (req, res) => {

  const order = await Order.findById(req.params.id);

  await order.remove();

  res.status(200).json({
    success: true,
  });

}


module.exports = {
  newOrder,
  getOrder,
  myOrders,
  getOrders,
  updateOrder,
  deleteClothe,
};