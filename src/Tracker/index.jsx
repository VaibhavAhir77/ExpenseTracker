import { useState } from "react";
import Records from "../scenes/Records";
import Dashboard from "../scenes/dashboard";
const Tracker = () => {
    const [expenses, setExpenses] = useState([]);

    const addExpense = (newExpense) => {
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    };

    const removeExpenses = (ids) => {
        setExpenses((prevExpenses) => prevExpenses.filter(expense => !ids.includes(expense.id)));
    };

    return (
        <div>
            <Records addExpense={addExpense} removeExpenses={removeExpenses} />
            <Dashboard expenses={expenses} />
        </div>
    );
};

export default Tracker;