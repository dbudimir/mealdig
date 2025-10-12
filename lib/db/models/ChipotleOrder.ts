import mongoose from 'mongoose';

const ChipotleOrderSchema = new mongoose.Schema({
  mealType: { type: String },
  tortilla: { type: String },
  fillings: [],
  rice: { type: String },
  beans: { type: String },
  toppings: [],
});

export default mongoose.models.ChipotleOrder || mongoose.model('ChipotleOrder', ChipotleOrderSchema);
