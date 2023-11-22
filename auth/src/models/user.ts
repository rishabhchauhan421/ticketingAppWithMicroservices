import mongoose from 'mongoose';
import { Password } from '../services/password';

//Define attributes interface
interface UserAttr {
  email: String;
  password: String;
}

//Define UserModel interface extending mongoose model to assign userAttributes
interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc;
}

//Defines properties that userDoc has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

//Define UserSchema
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttr) => {
  return new User(attrs);
};

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    this.set('password', hashedPassword);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User, UserAttr };
