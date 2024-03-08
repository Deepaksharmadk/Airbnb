import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is a required field"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
    },
  },
  { timestamps: true, versionKey: false }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.isPasswordValidated=(userpassword){
  return bcrypt.compare(userpassword, this.password)
}
userSchema.methods.getJwtToken=function () {
  return jwt.sign({
    id: this._id
  },process.env.JWT_SECRET)
}
const User = mongoose.model("User", userSchema);
export default User;
