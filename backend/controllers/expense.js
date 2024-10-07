const ExpenseSchema = require('../models/ExpenseModel');

exports.addExpense = async (req, res) => {
    let { title, amount, category, description, date } = req.body;

    // Convert amount to number
    amount = Number(amount);

    // Validation
    if (!title || !category || !description || !date) {
        return res.status(400).json({ msg: "Please fill all fields" });
    }
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).json({ msg: "Amount must be a positive number" });
    }

    // Create a new expense instance and save to the database
    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        await expense.save(); // Save the document
        res.status(200).json({ message: "Expense added successfully" });
    } catch (err) {
        console.error('Error saving expense:', err); // Log the error for debugging
        res.status(500).json({ msg: "An error occurred while adding expense" }); // Respond with a server error message
    }

    console.log(expense); 
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json({ expenses });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        const expense = await ExpenseSchema.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        console.error('Error deleting expense:', err);
        res.status(500).json({ message: "Error deleting expense" });
    }
};
