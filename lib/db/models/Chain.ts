import mongoose from 'mongoose';

const ChainSchema = new mongoose.Schema(
  {
    name: { type: String },
    cuisine: { type: String },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Chain || mongoose.model('Chain', ChainSchema);
