import { Request, Response } from 'express';
import Form from '../models/Form'

export const getMedicines = async (req: Request, res: Response) => {
    try {
        const forms = await Form.find();
        res.json(forms);
      } catch (error:any) {
        res.status(500).json({ message: error.message });
      }
};

export const createMedicine = async (req: Request, res: Response) => {
    const form = new Form({
        title: req.body.title,
        inputs: req.body.inputs
      });
    
      try {
        const newForm = await form.save();
        res.status(201).json(newForm);
      } catch (error:any) {
        res.status(400).json({ message: error.message });
      }

//   const createdMedicine = await medicine.save();
//   res.status(201).json(createdMedicine);
};
export const getSpecificForm=async (req: Request, res: Response) => {
    try {
      const form = await Form.findById(req.params.id);
      if (form) {
        res.json(form);
      } else {
        res.status(404).json({ message: 'Form not found' });
      }
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }


export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id);
    if (form) {
      form.title = req.body.title || form.title;
      form.inputs = req.body.inputs || form.inputs;
      const updatedForm = await form.save();
      res.json(updatedForm);
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMedicine = async (req: Request, res: Response) => {
  
  try {
    const form = await Form.findById(req.params.id);
    if (form) {
      await form.deleteOne();
      res.json({ message: 'Form deleted successfully' });
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }

};