const router = require("express").Router();
let Expense = require("../models/expense");

// Insert expense
http://localhost:8020/expense/add

router.route("/add").post((req, res) => {
    const title = req.body.title;
    const amount = Number(req.body.amount);
    const date = req.body.date;
    const other = req.body.other; 

    const newExpense = new Expense({
        title,
        amount,
        date,
        other,
    });

    newExpense.save()
        .then(() => {
            res.json("Expense Added");
        })
        .catch((err) => {
            console.log(err);
        });
});

// View expenses
router.route("/").get((req, res) => {
    Expense.find()
        .then((expenses) => {
            res.json(expenses);
        })
        .catch((err) => {
            console.log(err);
        });
});

// Update expense
router.route("/update/:id").put(async (req, res) => {
    let expenseId = req.params.id;
    const { title, amount, date, other } = req.body;

    const updateExpense = {
        title,
        amount,
        date,
        other
    };

    try {
        const update = await Expense.findByIdAndUpdate(expenseId, updateExpense);
        res.status(200).send({ status: "Expense Updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating expense", error: err.message });
    }
});

// Delete expense
router.route("/delete/:id").delete(async (req, res) => {
    let expenseId = req.params.id;

    try {
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).send({ status: "Expense deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting expense", error: err.message });
    }
});

// Get details using id
router.route("/get/:id").get(async (req, res) => {
    let expenseId = req.params.id;
    const expense = await Expense.findById(expenseId).then((expense)=>{
        res.status(200).send({status: "Expense fetched" , expense})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with fetching expense" , error: err.message});
    }) 
})

// View expenses amounts
router.route("/amount").get((req, res) => {
    Expense.find({}, { amount: 1, _id: 0 })
        .then((expenses) => {
            const expenseAmounts = expenses.map(expense => expense.amount);
            res.json(expenseAmounts);    
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        });
});


module.exports = router;
