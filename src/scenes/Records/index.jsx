import { Box, Button, TextField, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import Header from "../../components/header";

const Records = ({ addExpense }) => {
    const location = useLocation();
    const accounts = location.state?.accounts || []; // Default to an empty array if null
    const [expenses, setExpenses] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [newExpense, setNewExpense] = useState({
        name: '',
        category: '',
        amount: '',
        date: new Date().toISOString().split("T")[0],
        account: '',
    });

    const navigate = useNavigate(); 

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "category", headerName: "Category", flex: 1 },
        { field: "amount", headerName: "Amount", flex: 1 },
        { field: "date", headerName: "Date", flex: 1 },
        { field: "account", headerName: "Account", flex: 1 },
    ];

    const handleAddExpense = () => {
        if (!newExpense.name || !newExpense.category || !newExpense.amount || !newExpense.account) {
            alert("Please fill in all fields.");
            return;   
        }
        
        const newExpenseData = {
            id: Date.now(), // Use a unique id
            ...newExpense,
        };
        
        setExpenses([...expenses, newExpenseData]); // Add expense to state
        if (addExpense) {
            addExpense(newExpenseData); // Call the prop method to add expense if provided
        }
        setNewExpense({ name: '', category: '', amount: '', date: new Date().toISOString().split("T")[0], account: '' });
    };

    const handleRemoveExpense = () => {
        setExpenses(expenses.filter(expense => !selectedRows.includes(expense.id)));
        setSelectedRows([]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewExpense({ ...newExpense, [name]: value });
    };

    const handleViewPieChart = () => {
        navigate('/piechart', { state: { expenses } });
    };

    const handleViewBarChart = () => {
        navigate('/BarChart', { state: { expenses } }); // Pass expenses to BarChart page
    };

    const handleViewAccount = () => {
        navigate('/Accounts', { state: { expenses } });
    };

    const handleRowClick = (params) => {
        navigate('/BarChart', { state: { expenses } }); // Navigate to BarChart with expenses data
    };

    return (
        <Box m="20px">
            <Header title="EXPENSES" subtitle="Add Your Expenses" />
            <Box m="20px 0">
                <TextField
                    name="name"
                    label="Expense Name"
                    value={newExpense.name}
                    onChange={handleInputChange}
                    sx={{ marginRight: "10px" }}
                />
                <TextField
                    name="category"
                    label="Category"
                    value={newExpense.category}
                    onChange={handleInputChange}
                    sx={{ marginRight: "10px" }}
                />
                <TextField
                    name="amount"
                    label="Amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={handleInputChange}
                    sx={{ marginRight: "10px" }}
                />
                <TextField
                    name="date"
                    label="Date"
                    type="date"
                    value={newExpense.date}
                    onChange={handleInputChange}
                    sx={{ marginRight: "10px" }}
                />
                <TextField
                    name="account"
                    label="Select Account"
                    select
                    value={newExpense.account}
                    onChange={handleInputChange}
                    sx={{ marginRight: "10px", minWidth: "150px" }}
                >
                    {accounts.map((account) => (
                        <MenuItem key={account.id} value={account.name}>
                            {account.name}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="secondary" onClick={handleAddExpense}>
                    Add Expense
                </Button>
                <Button variant="contained" color="secondary" onClick={handleRemoveExpense} sx={{ marginLeft: "10px" }}>
                    Remove Expense
                </Button>
                <Button variant="contained" color="secondary" onClick={handleViewPieChart} sx={{ marginLeft: "5px" }}>
                    View Pie Chart
                </Button>
                <Button variant="contained" color="secondary" onClick={handleViewBarChart} sx={{ marginLeft: "5px" }}>
                    View Bar Chart
                </Button>
                <Button variant="contained" color="secondary" onClick={handleViewAccount} sx={{ marginLeft: "5px" }}>
                    Goto Accounts
                </Button>
            </Box>

            {/* DataGrid to display expenses */}
            <Box m="40px 0 0 0" height="75vh">
                <DataGrid
                    rows={expenses}
                    columns={columns}
                    onRowClick={handleRowClick}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectedRows(newSelectionModel);
                    }}
                    selectionModel={selectedRows}
                />
            </Box>
        </Box>
    );
};

export default Records;
