import mongoose from "mongoose";

/*
    TODO:   Complete the TransactionSchema which will contain the name,
            reference number, and the amount of a transaction in the database.
*/
const TransactionSchema = new mongoose.Schema({
    // your code here
    name: {
        type: String,
        required: true,
    },
    refNumber: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Assuming the amount cannot be negative
    },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;