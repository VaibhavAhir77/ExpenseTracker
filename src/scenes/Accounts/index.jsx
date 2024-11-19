import { Box, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../../components/header";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]); // State to store accounts
    const [accountName, setAccountName] = useState(""); // State for account name input
    const [balance, setBalance] = useState(""); // State for balance input
    const navigate = useNavigate();

    // Columns for DataGrid
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Account Name", width: 150 },
        { field: "balance", headerName: "Balance (₹)", width: 150 },
        {
            field: "action",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteAccount(params.row.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    // Function to handle account creation
    const handleCreateAccount = () => {
        if (accountName && balance) {
            const newAccount = {
                id: accounts.length + 1, // Simple ID assignment, consider using UUID for uniqueness
                name: accountName,
                balance: parseFloat(balance),
            };
            setAccounts([...accounts, newAccount]); // Add new account to state
            setAccountName(""); // Clear input fields
            setBalance("");
        } else {
            alert("Please fill in both fields.");
        }
    };

    // Function to handle account deletion
    const handleDeleteAccount = (id) => {
        const updatedAccounts = accounts.filter(account => account.id !== id);
        setAccounts(updatedAccounts);
    };

    // Function to navigate to Records with accounts data
    const handleNavigateToRecords = () => {
        navigate('/records', { state: { accounts } });
    };

    return (
        <Box m="20px">
            <Header title="ACCOUNTS" subtitle="Manage Your Accounts" />
            <Box display="flex" flexDirection="column" mb="20px">
                <TextField
                    label="Account Type"
                    variant="outlined"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    sx={{ mb: "10px" }}
                />
                <TextField
                    label="Balance"
                    variant="outlined"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    sx={{ mb: "10px" }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateAccount}
                    sx={{ mb: "20px" }} // Add margin bottom for spacing
                >
                    Create Account
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleNavigateToRecords}
                >
                    Go to Records
                </Button>
            </Box>
            <Box height={400} width="100%">
                <DataGrid
                    rows={accounts}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </Box>
        </Box>
    );
};

export default Accounts;
