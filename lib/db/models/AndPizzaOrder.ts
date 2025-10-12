import mongoose from 'mongoose';

const AndPizzaOrderSchema = new mongoose.Schema({
  dough: { type: String },
  sauce: [],
  cheese: [],
  veggies: [],
  proteins: { type: Array },
  finishes: [],
});

export default mongoose.models.AndPizzaOrder || mongoose.model('AndPizzaOrder', AndPizzaOrderSchema);
