import express from 'express';
import {
  getMedicines,
  getSpecificForm,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} from '../controllers/formController';
import { protect, storeManagerOnly } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(createMedicine).get(getMedicines);
router.route('/:id').get(getSpecificForm);
router
  .route('/:id')
  .put( updateMedicine)
  .delete(deleteMedicine);

export default router;