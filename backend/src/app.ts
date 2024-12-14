import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotEnv from 'dotenv';
// import eventRoutes from './routes/eventRoutes';
// import authRoutes from './routes/authRoutes'
// import medicineRoutes from './routes/medicineRoutes'
// import salesExecutiveRoutes from './routes/salesExecutiveRoutes'
// import orderRoutes from './routes/orderRoutes'

import formRoutes from './routes/formRoutes'

const app = express();
dotEnv.config();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/form-builder', { useUnifiedTopology: true, useNewUrlParser: true} as any)
// .then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch(err => {
//   console.error(err.message);
// });

// app.use('/api/events', eventRoutes);

// app.use('/api/auth', authRoutes);
// app.use('/api/medicines', medicineRoutes);
// app.use('/api/sales-executives', salesExecutiveRoutes);
// app.use('/api/orders', orderRoutes);
app.use('/api/forms', formRoutes)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const PORT = process.env.PORT || 5000;

// mongoose.connect('mongodb://localhost:27017/event-management', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })

