const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    text: {
      type: Number,
    },
    votes: {
      type: Number,
    },
    link: {
      type: String,
    },
  },
  {
    timeStamps: true,
  }
);

const Options = mongoose.model("Options", optionSchema);
module.exports = Options;
