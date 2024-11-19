import Topbar from "./scenes/Global/Topbar";
import { ColorModeContext, useMode } from "./themes"; // Ensure the path is correct
import CssBaseline from "@mui/material/CssBaseline"; // Correctly import CssBaseline
import { ThemeProvider } from "@mui/material/styles"; // Make sure this is imported
import SidebarV from "./scenes/Global/SidebarV";
import Dashboard from './scenes/dashboard/index';
import { Routes } from "react-router-dom";
import Records from "./scenes/Records";
import Form from "./scenes/Form";
import PieChart from "./components/piechart";
// import Accounts from "./scenes/Accounts";
import Accounts from "./scenes/Accounts";
// import BarChart from "./scenes/BarChart";
import BarChart from "./scenes/BarChart";
import Tracker from "./Tracker";

import { Route } from "react-router-dom";
function App() {
    const [theme, colorMode] = useMode();
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <SidebarV/>
                    <main className="content">
                        <Topbar />
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>
                        <Route path="/records" element={<Records/>}/>
                        <Route path="/accounts" element={<Accounts/>}/>
                        <Route path="/barchart" element={<BarChart/>}/>
                        {/* <Route path="/contacts" element={<Contacts/>}/> */}
                        {/* <Route path="/bar" element={<Bar/>}/> */}
                        <Route path="/form" element={<Form/>}/> 
                        {/* <Route path="/accounts" element={<Accounts/>}/> */}
                        <Route path="/piechart" element={<PieChart/>}/> 
                        {/* <Route path="/piechartdisplay" element={<PieChartDisplay/>}/>   */}
                        <Route path="/tracker" element={<Tracker/>}/>  
                    </Routes>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
