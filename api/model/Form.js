import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  mobile: {
    type: String,
    required: true,
    unique:true,
    match: /^[0-9]{10}$/, // Validates 10-digit mobile numbers
  },
  address: {
    type: String,
    required: true,
  },
  seatNo: {
    type: Number,
    required: true,
    unique:true,
    min: 1,
    max: 400, // Assuming 40 seats
  },
  isSeatOccupied: {
    type: Boolean,
    default: false, // Seat is initially unoccupied
  },
  timeSlot: {
    type: String,
    required: true,
    enum: [
      "9 AM - 3 PM",
      "9 AM - 6 PM",
      "10 AM - 10 PM",
      "12 PM - 1 PM",
      "1 PM - 2 PM",
    ], // Ensures valid time slots
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= this.startDate; // Ensures endDate is after startDate
      },
      message: "End date must be after start date",
    },
  },
},{
  timestamps:true,
}
);

const Form = mongoose.model("Form", FormSchema);

export default Form;
