import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/db/connection';
import User from '../../../../lib/db/models/User';
import Order from '../../../../lib/db/models/Order';
import Chain from '../../../../lib/db/models/Chain';
import ChipotleOrder from '../../../../lib/db/models/ChipotleOrder';
import AndPizzaOrder from '../../../../lib/db/models/AndPizzaOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const foundUser = await User.findOne({ _id: req.body.userId });
    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const createdOrder = await Order.create(req.body.order);

    // Dynamically get the OrderContent model
    let OrderContent;
    if (createdOrder.contentSchema === 'ChipotleOrder') {
      OrderContent = ChipotleOrder;
    } else if (createdOrder.contentSchema === 'AndPizzaOrder') {
      OrderContent = AndPizzaOrder;
    }

    const createdOrderContent = await OrderContent.create(req.body.order);

    const updatedChain = await Chain.findOne({ name: createdOrder.chainName });
    if (updatedChain) {
      updatedChain.orders.push(createdOrder._id);
      createdOrder.chain.push(updatedChain._id);
      await updatedChain.save();
    }

    foundUser.orders.push(createdOrder._id);
    createdOrder.orderContent.push(createdOrderContent._id);
    createdOrder.users.push(foundUser._id);

    await foundUser.save();
    await createdOrder.save();

    res.status(200).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}
