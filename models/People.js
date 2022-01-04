// eslint-disable-next-line prettier/prettier
const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Role",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const People = mongoose.model("People", peopleSchema);

module.exports = People;
