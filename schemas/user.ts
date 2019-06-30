import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "../interfaces/Iuser";
import bcrypt from "bcrypt";

export interface IUserModel extends IUser, Document{};

export var UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre<IUserModel>("save", async function (next) {
  const user = this;
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    
    // Generate a password hash (salt + hash)
    const passwordHash = await bcrypt.hash(this.password, salt);
    this.password = passwordHash;
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function (newPassword: string) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
}

export const User: Model<IUserModel> = model<IUserModel>("users", UserSchema);