import db from '../models/db.js';
import Transaction from '../models/TransactionModel.js';

const controller = {

    
    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `index.hbs` with all
            transactions currently stored in the database.
    */
    getIndex: async function(req, res) {
        // your code here
        try {
            const transactions = await Transaction.find({}).lean(); 
            res.render('index', { transactions });
        } catch (error) {
            console.error('Error getting index:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } // This is to load the page initially. You are expected to eventually replace this with your own code.
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckRefNo`. This function checks if a
            specific reference number is stored in the database. If the number
            is stored in the database, it returns an object containing the
            reference number, otherwise, it returns an empty string.
    */
    getCheckRefNo: async function(req, res) {
        const refNumber = req.query.refNumber;
        try {
            const transaction = await Transaction.findOne({ refNumber }).lean();
            if (transaction) {
                res.json({ refNumber, existsInDatabase: true });
            } else {
                res.json({ refNumber: '', existsInDatabase: false });
            }
        } catch (error) {
            console.error('Error checking reference number:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the transaction
            sent by the client to the database, then appends the new
            transaction to the list of transactions in `index.hbs`.
    */
        getAdd: async function(req, res) {
            const { name, refNumber, amount } = req.body;
        
            try {
                const newTransaction = new Transaction({ name, refNumber, amount });
                await newTransaction.save();
        
                res.render('transactionPartial', newTransaction.toObject(), (error, html) => {
                    if (error) {
                        console.error('Error rendering transaction:', error);
                        res.status(500).json({ error: 'Internal Server Error' });
                    } else {
                        res.send(html);
                    }
                });
            } catch (error) {
                console.error('Error adding transaction:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        },
            

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the transaction
            from the database, then removes the transaction from the list of
            transactions in `index.hbs`.
    */
    getDelete: async function (req, res) {
        // your code here
        const transactionId = req.body.transactionId;
        try {
            await Transaction.findByIdAndDelete(transactionId);
            res.status(200).end();
        } catch (error) {
            console.error('Error deleting transaction:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

export default controller;