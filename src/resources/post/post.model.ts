import { Schema, Model, model } from 'mongoose';
import PostDoc from '@/resources/post/post.interface';

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
              ret.id = ret._id;
              delete ret._id;
              delete ret.__v;
            }
          }
    }
);

export default model<PostDoc>('Post', PostSchema);