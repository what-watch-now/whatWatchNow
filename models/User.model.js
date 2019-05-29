const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    favList: [{
      type: Schema.Types.ObjectId,
      ref: "Movie"
    }],
    blackList: [{
      type: Schema.Types.ObjectId,
      ref: "Movie"
    }],
    viewList: [{
      type: Schema.Types.ObjectId,
      ref: "Movie"
    }]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
