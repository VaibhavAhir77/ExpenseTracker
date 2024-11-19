// import { tokens } from "../themes";

// export const mockDataTeam = [
//   {
//     id: 1,
//     name: "Jon Snow",
//     email: "jonsnow@gmail.com",
//     age: 35,
//     phone: "(665)121-5454",
//     access: "admin",
//   }
// ]

export const mockDataTeam = Array.from({ length: 800 }, (_, i) => ({
  id: i + 1,
  name: [
    'Office Supplies',
    'Client Lunch',
    'Electricity Bill',
    'Web Hosting',
    'Team Outing',
    'Software Subscription',
    'Printer Ink',
    'Internet Bill',
    'Conference Tickets',
    'Office Furniture',
    'Marketing Materials',
    'Travel Expenses',
    'Fuel Reimbursement',
    'Employee Bonus',
    'Laptop Purchase',
    'Cloud Service Fee',
    'Office Renovation',
    'Coffee Supplies',
    'Business Meeting',
    'Courier Charges',
  ][Math.floor(Math.random() * 20)],
  category: [
    'Office',
    'Meals',
    'Utilities',
    'IT Services',
    'Entertainment',
    'Marketing',
    'Travel',
    'Salaries',
    'Supplies',
    'Miscellaneous',
  ][Math.floor(Math.random() * 10)],
  amount: (Math.random() * 1000).toFixed(2),
  date: new Date(
    2024,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  )
    .toISOString()
    .split('T')[0], // Format as YYYY-MM-DD
  status: Math.random() > 0.5 ? 'Paid' : 'Unpaid',
}));

