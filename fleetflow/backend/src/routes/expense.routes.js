import express from 'express';
import {
    createExpense,
    getExpenses,
    getExpensesByVehicle,
    updateExpense,
    deleteExpense
} from '../controllers/expense.controller.js';

const router = express.Router();

router.post('/', createExpense);
router.get('/', getExpenses);
router.get('/vehicle/:vehicleId', getExpensesByVehicle);
router.patch('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
