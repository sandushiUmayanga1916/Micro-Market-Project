const express = require('express');
const Payment = require('../models/Payment');
const router = express.Router(); 
const Cart = require('../models/Carts');
const mongoose = require('mongoose'); 

const ObjectId = mongoose.Types.ObjectId;

// token
const verifyToken = require('../middleware/verifyToken');

// post payment information to db
router.post('/', verifyToken, async (req, res) => {
    const payment = req.body;
    try {
        const paymentRequest = await Payment.create(payment);

        // deremove cart items after payment
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({_id: {$in: cartIds}});

        res.status(200).json({paymentRequest, deleteCartRequest});    
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.get('/', verifyToken, async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    try {
        const decodedEmail = req.decoded.email;
        if (email !== decodedEmail) {
            return res.status(403).json({message: "Forbidden Access"});
        }
    } catch (error) {
        return res.status(404).json({message:"Forbidden Access"});
    }
    const result = await Payment.find(query).sort({createdAt:-1}).exec();
    res.status(200).json(result);
});


// get all payments
router.get('/all', async (req, res) => {
    try {
        const payment = await Payment.find({}).sort({createdAt: -1}).exec();
        res.status(200).json(payment);
    } catch (error) {
        res.status(404).json({message:"Forbidden Access"});
    }
});

// confirm payment status
router.patch('/:id', async (req, res) => {
    const payId = req.params.id;
    const { status } = req.body;
  
    try {
      const updatedStatus = await Payment.findByIdAndUpdate(payId, { status: "confirmed" }, 
      { new: true, runValidators: true });
      // Check if payment is found
      if (!updatedStatus) {
        return res.status(404).json({ message: "Payment not found" });
      }
      // Send updated payment status
      res.status(200).json(updatedStatus);
    } catch (error) {
      // Error handling
      res.status(404).json({ message: "Forbidden Access" });
    }
  });

  // delete payment by ID
router.delete('/:id', verifyToken, async (req, res) => {
    const paymentId = req.params.id;
    try {
        const deletedPayment = await Payment.findByIdAndDelete(paymentId);
        if (!deletedPayment) {
            return res.status(404).json({message: "Payment not found"});
        }
        res.status(200).json({message: "Payment deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

module.exports = router;
