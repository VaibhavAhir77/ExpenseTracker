import { useLocation } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = () => {
  const location = useLocation();
  const expenses = location.state?.expenses || [];

  const getBarChartData = () => {
    const dataMap = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      acc[category] = (acc[category] || 0) + parseFloat(amount);
      return acc;
    }, {});

    return Object.entries(dataMap).map(([category, totalAmount]) => ({
      category,
      totalAmount,
    }));
  };

  const data = getBarChartData();

  return (
    <div style={{ height: "400px" }}> {/* Set fixed height here */}
      <ResponsiveBar
        data={data}
        keys={['totalAmount']}
        indexBy="category"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Expense Category",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Total Amount",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Expense Bar Chart"
        barAriaLabel={(e) =>
          `${e.id}: ${e.formattedValue} in category: ${e.indexValue}`
        }
      />
    </div>
  );
};

export default BarChart;
