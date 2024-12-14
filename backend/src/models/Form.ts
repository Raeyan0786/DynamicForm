import mongoose, { Document, Schema } from 'mongoose';

interface Input {
    id:number;
    type: string;
    title: string;
    placeholder: string;
  }
  
  // Define the Form type
  export interface Form extends Document {
    title: string;
    inputs: Input[];
    createdAt: Date;
  }

const formSchema = new mongoose.Schema<Form>({
  title:{ type: String, required: true },
  inputs: [{
    id: { type: Number, required: true },
      type: { type: String, required: true },
      title: { type: String, required: true },
      placeholder: { type: String }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', formSchema);

const Form = mongoose.model<Form>('Form', formSchema);

export default Form;