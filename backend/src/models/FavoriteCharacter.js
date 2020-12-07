import mongoose, { Schema, model } from 'mongoose';

const FavoriteCharacterSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    characterId: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('FavoriteCharacter', FavoriteCharacterSchema);
