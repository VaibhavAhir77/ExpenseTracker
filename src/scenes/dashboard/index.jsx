import { Typography, Box, Button, useTheme } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../components/StatBox";
import Header from "../../components/header";
import PieChart from "../../components/piechart";
import BarChart from "../BarChart"; // Import your BarChart component
import { tokens } from "../../themes";

const Dashboard = ({ expenses = [] }) => {
    console.log("Expenses passed to Dashboard:", expenses);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Calculate total balance and recent expenses
    const totalBalance = expenses.reduce((acc, expense) => acc + Number(expense.amount || 0), 0); // Ensure amount is valid
    const last7Days = expenses
        .filter(expense => new Date(expense.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Filter last 7 days
        .reduce((acc, expense) => acc + Number(expense.amount || 0), 0); // Ensure amount is valid
    const last30Days = expenses
        .filter(expense => new Date(expense.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Filter last 30 days
        .reduce((acc, expense) => acc + Number(expense.amount || 0), 0); // Ensure amount is valid

    return (
        <Box m="20px">
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome To Your Profile" />
            </Box>

            {/* Download Reports Button */}
            <Box mb="20px">
                <Button
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                    }}
                >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Reports
                </Button>
            </Box>

            {/* Stat Boxes */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={`₹${totalBalance.toLocaleString()}`}
                        subtitle="Total Balance"
                        progress="0.75"
                        icon={
                            <MonetizationOnIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={`₹${last7Days.toLocaleString()}`}
                        subtitle="Last 7 days"
                        progress="0.50"
                        icon={
                            <MonetizationOnIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={`₹${last30Days.toLocaleString()}`}
                        subtitle="Last 30 days"
                        progress="0.30"
                        icon={
                            <MonetizationOnIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
            </Box>

            {/* Charts Section */}
            <Box mt="20px" display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
                
                {/* PieChart Section */}
                <Box gridColumn="span 6" backgroundColor={colors.primary[400]} height="400px">
                    <Typography
                        variant="h6"
                        color="#ffffff"
                        sx={{ m: "15px 0 5px 20px" }}
                    >
                        PIECHART
                    </Typography>
                    <PieChart expenses={expenses} /> {/* Pass expenses to PieChart */}
                </Box>

                {/* BarChart Section */}
                <Box gridColumn="span 6" backgroundColor={colors.primary[400]} height="400px">
                    <Typography
                        variant="h6"
                        color="#ffffff"
                        sx={{ m: "15px 0 5px 20px" }}
                    >
                        BARCHART
                    </Typography>
                    <BarChart expenses={expenses} /> {/* Pass expenses to BarChart */}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;
