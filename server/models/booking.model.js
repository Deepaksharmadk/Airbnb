import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    bookeBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
      required: true,
    },
    cheacIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    numberofGuests: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const BookingModel = mongoose.model("BookingModel", bookingSchema);
export default BookingModel;
