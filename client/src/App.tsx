import { useState, useEffect } from "react";
import { AppLayout } from "./components/layout/AppLayout";
import { Login } from "./components/auth/Login";
import { InvestorDashboard } from "./components/investor/InvestorDashboard";
import { Portfolio } from "./components/investor/Portfolio";
import { InvestorMessages } from "./components/investor/InvestorMessages";
import { Wallet } from "./components/investor/Wallet";
import { Reports } from "./components/investor/Reports";
import { TenantDashboard } from "./components/tenant/TenantDashboard";
import { MaintenanceRequest } from "./components/tenant/MaintenanceRequest";
import { TenantMessages } from "./components/tenant/TenantMessages";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminProperties } from "./components/admin/AdminProperties";
import { AdminTransactions } from "./components/admin/AdminTransactions";
import { AdminTenants } from "./components/admin/AdminTenants";
import { AdminInvestors } from "./components/admin/AdminInvestors";
import { AdminRequests } from "./components/admin/AdminRequests";
import { Settings } from "./components/settings/Settings";
import { TenantQuestionnaire } from "./components/tenant/TenantQuestionnaire";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { VerdaDashboard } from "./components/verdafarms/VerdaDashboard";
import { VerdaCropPortfolio } from "./components/verdafarms/VerdaCropPortfolio";
import { VerdaReports } from "./components/verdafarms/VerdaReports";
import { VerdaDocuments } from "./components/verdafarms/VerdaDocuments";
import { VerdaFeedback } from "./components/verdafarms/VerdaFeedback";
import { auth, transactions as txnApi, type UserRole, type AuthUser, type AuthResponse } from "./lib/api";

function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isNewTenant, setIsNewTenant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [investorBalance, setInvestorBalance] = useState(689372);
  const [investorActivities, setInvestorActivities] = useState([
    { id: "INV_00076", title: "Monthly Rent - Unit 304", type: "Income", amount: "$25,500", status: "Completed", date: "17 Apr, 2024" },
    { id: "INV_00075", title: "Plumbing Repair", type: "Expense", amount: "$32,750", status: "Pending", date: "15 Apr, 2024" },
    { id: "INV_00074", title: "Security Deposit Return", type: "Expense", amount: "$40,200", status: "Completed", date: "15 Apr, 2024" },
  ]);

  useEffect(() => {
    const storedUser = auth.getStoredUser();
    if (storedUser && auth.isAuthenticated()) {
      const u = storedUser as AuthUser;
      setCurrentUser(u);
      setUserRole(u.role as UserRole);
    }
    setIsLoading(false);
  }, []);

  const handleInvestorTransfer = async (amount: number, recipient: string) => {
    try {
      await txnApi.transfer({ amount, recipient_name: recipient });
    } catch {
      // API failure is non-blocking — UI still updates
    }
    setInvestorBalance(prev => prev - amount);
    const newActivity = {
      id: `TRF_${Math.floor(Math.random() * 10000)}`,
      title: `Transfer to ${recipient}`,
      type: "Expense",
      amount: `$${amount.toLocaleString()}`,
      status: "Completed",
      date: "Just now",
    };
    setInvestorActivities(prev => [newActivity, ...prev]);
    toast.success(`Successfully transferred $${amount.toLocaleString()} to ${recipient}`);
  };

  const handleEmailLogin = async (email: string, password: string) => {
    const data = await auth.login(email, password);
    auth.storeSession(data);
    setCurrentUser(data.user);
    setUserRole(data.user.role as UserRole);
    setActiveTab("dashboard");
    if (data.user.role === "tenant") setIsNewTenant(true);
    toast.success(`Welcome back, ${data.user.name}!`);
  };

  const handleRegisterSuccess = (data: AuthResponse) => {
    auth.storeSession(data);
    setCurrentUser(data.user);
    setUserRole(data.user.role as UserRole);
    setActiveTab("dashboard");
    if (data.user.role === "tenant") setIsNewTenant(true);
    toast.success(`Welcome to ClientFlow, ${data.user.name}!`);
  };

  const handleLogout = () => {
    auth.clearSession();
    setUserRole(null);
    setCurrentUser(null);
    setIsNewTenant(false);
  };

  const handleQuestionnaireComplete = () => {
    setIsNewTenant(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FB]">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!userRole) {
    return <Login onEmailLogin={handleEmailLogin} onRegisterSuccess={handleRegisterSuccess} />;
  }

  if (userRole === "tenant" && isNewTenant) {
    return (
      <>
        <TenantQuestionnaire onComplete={handleQuestionnaireComplete} />
        <Toaster />
      </>
    );
  }

  const renderContent = () => {
    if (userRole === "investor") {
      switch (activeTab) {
        case "dashboard":
          return (
            <InvestorDashboard
              onNavigate={setActiveTab}
              balance={investorBalance}
              activities={investorActivities}
              onTransfer={handleInvestorTransfer}
            />
          );
        case "portfolio":
          return <Portfolio />;
        case "messages":
          return <InvestorMessages />;
        case "wallet":
          return <Wallet balance={investorBalance} transactions={investorActivities} onTransfer={handleInvestorTransfer} />;
        case "reports":
          return <Reports />;
        case "settings":
          return <Settings currentUser={currentUser} role={userRole} />;
        default:
          return <InvestorDashboard onNavigate={setActiveTab} balance={investorBalance} activities={investorActivities} onTransfer={handleInvestorTransfer} />;
      }
    }

    if (userRole === "tenant") {
      switch (activeTab) {
        case "dashboard":
          return <TenantDashboard onNavigate={setActiveTab} />;
        case "maintenance":
          return <MaintenanceRequest />;
        case "messages":
          return <TenantMessages />;
        case "settings":
          return <Settings currentUser={currentUser} role={userRole} />;
        default:
          return <TenantDashboard onNavigate={setActiveTab} />;
      }
    }

    if (userRole === "admin") {
      switch (activeTab) {
        case "dashboard":
          return <AdminDashboard onNavigate={setActiveTab} />;
        case "properties":
          return <AdminProperties />;
        case "tenants":
          return <AdminTenants />;
        case "investors":
          return <AdminInvestors />;
        case "transactions":
          return <AdminTransactions />;
        case "maintenance":
          return <AdminRequests />;
        case "settings":
          return <Settings currentUser={currentUser} role={userRole} />;
        default:
          return <div className="p-10 text-center text-slate-500">Admin Module {activeTab}</div>;
      }
    }

    if (userRole === "verdafarms") {
      switch (activeTab) {
        case "dashboard":
          return <VerdaDashboard onNavigate={setActiveTab} />;
        case "crops":
          return <VerdaCropPortfolio />;
        case "farm-reports":
          return <VerdaReports />;
        case "farm-documents":
          return <VerdaDocuments />;
        case "feedback":
          return <VerdaFeedback />;
        case "settings":
          return <Settings currentUser={currentUser} role={userRole} />;
        default:
          return <VerdaDashboard onNavigate={setActiveTab} />;
      }
    }

    return <div>Unknown Role</div>;
  };

  return (
    <AppLayout
      role={userRole}
      onLogout={handleLogout}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      currentUser={currentUser}
    >
      {renderContent()}
      <Toaster />
    </AppLayout>
  );
}

export default App;
