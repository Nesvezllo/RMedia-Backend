import mongoose from 'mongoose';

 const PostSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    imageURL: String,
    
  },

  {
    timestamps: true,
  },
 );

 export default mongoose.model("Post", PostSchema);