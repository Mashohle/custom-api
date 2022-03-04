import { Schema, model } from 'mongoose';
import { Password } from '@/utils/password';
import UserDoc from '@/resources/user/user.interface';

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
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
              delete ret.password;
              delete ret.__v;
            }
          }
    }
);

UserSchema.pre<UserDoc>('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }

    const hashed = await Password.toHash(this.get('password'));
      
    this.set('password', hashed);

    next();
});

UserSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await Password.compare(
        this.get('password'),
        password
    );
}

export default model<UserDoc>('User', UserSchema);