import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    avatar: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    },

    password: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  //  Google user → bỏ qua
  if (!this.password) return next;

  // ✅ Chỉ hash khi password thay đổi
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next;
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
