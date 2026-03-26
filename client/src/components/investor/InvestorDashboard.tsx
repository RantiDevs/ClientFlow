import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowUpRight, ArrowDownLeft, Building2, TrendingUp, Wallet, ArrowRight, MoreHorizontal, FileText, PieChart, CreditCard } from "lucide-react";
import { PROJECTS, FINANCIALS } from "../../lib/data";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState } from "react";
import { TransferModal } from "./TransferModal";
import { toast } from "sonner";

interface Transaction {
  id: string;
  title: string;
  type: string;
  amount: string;
  status: string;
  date: string;
}

interface InvestorDashboardProps {
  onNavigate: (page: string) => void;
  balance: number;
  activities: Transaction[];
  onTransfer: (amount: number, recipient: string) => void;
}

export function InvestorDashboard({ onNavigate, balance, activities, onTransfer }: InvestorDashboardProps) {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  
  // Keep quickAmount local as it's UI specific
  const [quickAmount, setQuickAmount] = useState("1250.00");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Left Main Column */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Hero / Wallet Section */}
        <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
           <div className="flex flex-wrap justify-between items-end gap-6 relative z-10">
              <div className="min-w-fit">
                 <p className="text-slate-500 font-medium mb-1">Total Balance</p>
                 <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                    ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                 </h2>
                 <div className="flex items-center mt-3 bg-green-50 w-fit px-3 py-1 rounded-full text-green-700 font-bold text-sm">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    5% more than last month
                 </div>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                 <Button 
                    onClick={() => setIsTransferModalOpen(true)}
                    className="h-12 px-6 sm:px-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-200"
                 >
                    <ArrowUpRight className="mr-2 h-4 w-4" /> Transfer
                 </Button>
                 <Button variant="outline" className="h-12 px-6 sm:px-8 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50">
                    <ArrowDownLeft className="mr-2 h-4 w-4" /> Request
                 </Button>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
              {[
                { label: "USD", amount: "$22,678.00", icon: "$", active: true },
                { label: "EUR", amount: "€18,345.00", icon: "€", active: true },
                { label: "GBP", amount: "£15,000.00", icon: "£", active: false },
              ].map((wallet) => (
                <div key={wallet.label} className={`p-5 rounded-[24px] border transition-all cursor-pointer ${wallet.active ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg ${wallet.active ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'}`}>
                         {wallet.icon}
                      </div>
                      <MoreHorizontal className="h-5 w-5 opacity-50" />
                   </div>
                   <div className="space-y-1">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${wallet.active ? 'text-slate-400' : 'text-slate-400'}`}>{wallet.label} Wallet</p>
                      <p className={`text-lg font-bold ${wallet.active ? 'text-white' : 'text-slate-900'}`}>{wallet.amount}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           <div className="bg-[#DDA04E] rounded-[28px] p-6 text-white shadow-lg shadow-[#DDA04E]/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="h-10 w-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
                 <Wallet className="h-5 w-5 text-white" />
              </div>
              <p className="text-white/80 font-medium text-sm">Total Earnings</p>
              <h3 className="text-2xl font-bold mt-1">$950</h3>
              <p className="text-xs mt-2 bg-white/20 w-fit px-2 py-0.5 rounded-lg">+7% this month</p>
           </div>
           
           <div className="bg-white rounded-[28px] p-6 text-slate-900 shadow-sm border border-slate-100 group hover:border-[#DDA04E]/50 transition-colors">
              <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 text-slate-500 group-hover:bg-[#DDA04E]/10 group-hover:text-[#DDA04E] transition-colors">
                 <CreditCard className="h-5 w-5" />
              </div>
              <p className="text-slate-500 font-medium text-sm">Total Spending</p>
              <h3 className="text-2xl font-bold mt-1">$700</h3>
              <p className="text-xs mt-2 text-red-500 bg-red-50 w-fit px-2 py-0.5 rounded-lg flex items-center"><ArrowUpRight className="h-3 w-3 mr-1 rotate-180" /> 5%</p>
           </div>

           <div className="bg-white rounded-[28px] p-6 text-slate-900 shadow-sm border border-slate-100 group hover:border-[#DDA04E]/50 transition-colors">
              <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 text-slate-500 group-hover:bg-[#DDA04E]/10 group-hover:text-[#DDA04E] transition-colors">
                 <Building2 className="h-5 w-5" />
              </div>
              <p className="text-slate-500 font-medium text-sm">Properties</p>
              <h3 className="text-2xl font-bold mt-1">3</h3>
              <p className="text-xs mt-2 text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-lg flex items-center"><ArrowUpRight className="h-3 w-3 mr-1" /> 8%</p>
           </div>

           <div className="bg-white rounded-[28px] p-6 text-slate-900 shadow-sm border border-slate-100 group hover:border-[#DDA04E]/50 transition-colors">
              <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 text-slate-500 group-hover:bg-[#DDA04E]/10 group-hover:text-[#DDA04E] transition-colors">
                 <FileText className="h-5 w-5" />
              </div>
              <p className="text-slate-500 font-medium text-sm">Documents</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
              <p className="text-xs mt-2 text-slate-400 bg-slate-50 w-fit px-2 py-0.5 rounded-lg">All up to date</p>
           </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-8">
              <div>
                 <h3 className="text-xl font-bold text-slate-900">Profit and Loss</h3>
                 <p className="text-slate-500 text-sm">View your income in a certain period of time</p>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="flex items-center text-sm font-medium text-slate-600">
                    <span className="h-3 w-3 rounded-full bg-[#DDA04E] mr-2"></span> Profit
                 </div>
                 <div className="flex items-center text-sm font-medium text-slate-600">
                    <span className="h-3 w-3 rounded-full bg-slate-900 mr-2"></span> Loss
                 </div>
              </div>
           </div>
           
           <div className="h-[300px] w-full min-w-0 relative">
              <ResponsiveContainer width="100%" height={300} minWidth={0}>
                <BarChart data={FINANCIALS} barSize={20}>
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="income" stackId="a" fill="#DDA04E" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="expense" stackId="a" fill="#1e293b" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Activities List */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Recent Activities</h3>
              <Button variant="ghost" className="text-slate-500">Filter</Button>
           </div>
           
           <div className="space-y-1">
              {activities.map((item, i) => (
                 <div key={item.id} className="grid grid-cols-12 items-center p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                    <div className="col-span-1">
                       <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${item.type === 'Income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {item.type === 'Income' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                       </div>
                    </div>
                    <div className="col-span-4 pl-4">
                       <p className="font-bold text-slate-900">{item.title}</p>
                       <p className="text-xs text-slate-400">{item.id}</p>
                    </div>
                    <div className="col-span-2 text-sm font-semibold text-slate-900">{item.amount}</div>
                    <div className="col-span-2">
                       <span className={`flex items-center text-xs font-bold ${item.status === 'Completed' ? 'text-green-600' : 'text-[#DDA04E]'}`}>
                          <span className={`h-2 w-2 rounded-full mr-2 ${item.status === 'Completed' ? 'bg-green-600' : 'bg-[#DDA04E]'}`}></span>
                          {item.status}
                       </span>
                    </div>
                    <div className="col-span-3 text-right text-sm text-slate-400 group-hover:text-slate-600">
                       {item.date}
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Right Sidebar Column */}
      <div className="lg:col-span-4 space-y-8">
        
        {/* Statistics Card */}
        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 h-fit">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Statistics</h3>
              <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg py-1 px-2 outline-none">
                 <option>This Week</option>
              </select>
           </div>
           
           <div className="relative h-64 w-full flex items-center justify-center">
              {/* Mock Donut Chart using CSS/SVG */}
              <svg viewBox="0 0 100 100" className="h-48 w-48 transform -rotate-90">
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="12" strokeDasharray="180 251" strokeLinecap="round" />
                 <circle cx="50" cy="50" r="40" fill="transparent" stroke="#DDA04E" strokeWidth="12" strokeDasharray="70 251" strokeDashoffset="-180" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total</span>
                 <span className="text-2xl font-bold text-slate-900">$14,810</span>
              </div>
           </div>

           <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-slate-100">
                 <div className="flex items-center">
                    <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600">
                       <Building2 className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                       <p className="text-sm font-bold text-slate-900">Rental Income</p>
                       <p className="text-xs text-slate-500">65% of total</p>
                    </div>
                 </div>
                 <span className="font-bold text-slate-900">$9,560</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-slate-100">
                 <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#DDA04E]/20 rounded-full flex items-center justify-center text-[#DDA04E]">
                       <PieChart className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                       <p className="text-sm font-bold text-slate-900">Investments</p>
                       <p className="text-xs text-slate-500">35% of total</p>
                    </div>
                 </div>
                 <span className="font-bold text-slate-900">$5,250</span>
              </div>
           </div>
        </div>

        {/* Quick Transfer / Contacts */}
        <div className="bg-slate-900 rounded-[32px] p-8 shadow-xl shadow-slate-300 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#DDA04E] rounded-full blur-3xl opacity-20"></div>
           
           <h3 className="text-lg font-bold mb-6 relative z-10">Quick Transfer</h3>
           <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar relative z-10">
              {[1,2,3,4,5].map((i) => (
                 <div key={i} className="flex-shrink-0 flex flex-col items-center space-y-2">
                    <div className="h-14 w-14 rounded-full border-2 border-slate-700 p-1 hover:border-[#DDA04E] cursor-pointer transition-colors">
                       <img src={`https://i.pravatar.cc/150?u=${i}`} className="h-full w-full rounded-full object-cover" />
                    </div>
                    <span className="text-xs text-slate-400">User {i}</span>
                 </div>
              ))}
              <div className="flex-shrink-0 flex flex-col items-center space-y-2">
                 <div className="h-14 w-14 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center hover:bg-slate-800 cursor-pointer">
                    <ArrowRight className="h-6 w-6 text-slate-400" />
                 </div>
                 <span className="text-xs text-slate-400">Add</span>
              </div>
           </div>

           <div className="mt-4 relative z-10">
              <div className="flex items-center bg-slate-800 rounded-2xl p-2 mb-4">
                 <span className="text-slate-400 px-3">$</span>
                 <input type="text" defaultValue="1,250.00" className="bg-transparent border-none text-white font-bold w-full outline-none" />
              </div>
              <Button className="w-full bg-[#DDA04E] hover:bg-[#c48b3d] text-slate-900 font-bold h-12 rounded-xl">
                 Send Money
              </Button>
           </div>
        </div>

      </div>
      
      <TransferModal 
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onTransfer={onTransfer}
        currentBalance={balance}
      />
    </div>
  );
}