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
    match: /^[0-9]{10}$/, 
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
    max: 400, 
  },
  isSeatOccupied: {
    type: Boolean,
    default: false, 
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
    ], 
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
        return value >= this.startDate; 
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
