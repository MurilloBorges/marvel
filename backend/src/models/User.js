import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { isNotEmpty } from '../helpers/functions';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  if (isNotEmpty(this.getUpdate().password)) {
    const hash = await bcrypt.hash(this.getUpdate().password, 10);
    this.getUpdate().password = hash;
  }

  next();
});

module.exports = model('User', UserSchema);
