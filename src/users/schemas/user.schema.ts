import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

// auto create id from uuid
@Schema({ _id: true, id: false })
export class User {
  @Prop({
    index: true,
    unique: true,
    default: uuid(),
  })
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  username: string;
}

// hash password pre save

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hash = bcrypt.hashSync(this.password, 10);

  this.password = hash;

  next();
});

// exclude _id from response
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export { UserSchema };
