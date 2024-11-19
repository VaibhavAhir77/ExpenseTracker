import { ResponsivePie } from "@nivo/pie";
import { useLocation } from "react-router-dom"; // Import useLocation

const PieChart = () => {
    const location = useLocation(); // Get the location
    const expenses = location.state?.expenses || []; // Access expenses from state

    // Function to transform expenses to pie chart data
    const getPieChartData = () => {
        const dataMap = expenses.reduce((acc, expense) => {
            const { category, amount } = expense;
            acc[category] = (acc[category] || 0) + parseFloat(amount);
            return acc;
        }, {});

        return Object.entries(dataMap).map(([id, value]) => ({
            id,
            label: id,
            value,
        }));
    };

    // Custom tooltip function
    const arcTooltip = (datum) => (
        <div style={{ color: 'white' }}>
            <strong>{datum.id}</strong>: ${datum.value.toFixed(2)}
        </div>
    );

    return (
        <div style={{ height: '500px' }}>
            <ResponsivePie
                data={getPieChartData()}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={7}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]],
                }}
                arcLinkLabelsTextOffset={12}
                arcLinkLabelsTextColor="white" // Set arc link labels text color to white
                arcLinkLabelsDiagonalLength={14}
                arcLinkLabelsStraightLength={20}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
                arcLabelsRadiusOffset={0.55}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="white" // Set arc labels text color to white
                arcTooltip={arcTooltip} // Set the custom tooltip
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 56,
                        itemsSpacing: 0,
                        itemWidth: 100,
                        itemHeight: 18,
                        itemTextColor: 'white', // Set legend item text color to white
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [{
                            on: 'hover',
                            style: { itemTextColor: '#000' },
                        }],
                    },
                ]}
            />
        </div>
    );
};

export default PieChart;
