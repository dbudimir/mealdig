import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';
import deepPopulate from 'mongoose-deep-populate';

const deepPopulatePlugin = deepPopulate(mongoose);

const UserSchema = new mongoose.Schema(
  {
    accessLevel: { type: String, default: 'user' },
    userFullName: { type: String },
    userName: { type: String, required: true, unique: true, maxlength: 20 },
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String },
    orders: [
      {
        ref: 'Order',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    favorites: [
      {
        ref: 'Order',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(deepPopulatePlugin);
UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (plaintext: string, callback: any) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
