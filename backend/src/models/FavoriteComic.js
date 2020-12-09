import mongoose, { Schema, model } from 'mongoose';

const FavoriteComicSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comicId: {
      type: mongoose.Schema.Types.Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('FavoriteComic', FavoriteComicSchema);
