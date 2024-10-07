const Income = require('../models/IncomeModel');

exports.addIncome = async (req, res) => {
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

    // Create a new income instance and save to the database
    const income = new Income({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        await income.save(); // Save the document
        res.status(200).json({ message: "Income added successfully" });
    } catch (err) {
        console.error('Error saving income:', err); // Log the error for debugging
        res.status(500).json({ msg: "An error occurred while adding income" }); // Respond with a server error message
    }

    console.log(income); 
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json({ incomes });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await Income.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }
        res.status(200).json({ message: "Income deleted successfully" });
    } catch (err) {
        console.error('Error deleting income:', err);
        res.status(500).json({ message: "Error deleting income" });
    }
};
