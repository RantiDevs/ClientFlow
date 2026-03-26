import React from "react";
import {
  LayoutDashboard,
  Building,
  Wallet,
  FileText,
  MessageSquare,
  LogOut,
  Bell,
  Menu,
  Wrench,
  CreditCard,
  Users,
  Search,
  Settings,
  ChevronDown,
  Briefcase,
  Sprout,
  Leaf,
  BarChart3,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { MOCK_USER, UserRole } from "../../lib/data";

interface AppLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentUser?: { name: string; email: string; avatar?: string } | null;
}

export function AppLayout({
  children,
  role,
  onLogout,
  activeTab,
  onTabChange,
  currentUser,
}: AppLayoutProps) {
  const displayUser = currentUser || MOCK_USER;
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const getNavItems = (role: UserRole) => {
    switch (role) {
      case "investor":
        return [
          { id: "dashboard", label: "Overview", icon: LayoutDashboard },
          { id: "portfolio", label: "Portfolio", icon: Building },
          { id: "wallet", label: "Wallet", icon: Wallet },
          { id: "messages", label: "Messages", icon: MessageSquare },
          { id: "documents", label: "Reports", icon: FileText },
        ];
      case "tenant":
        return [
          { id: "dashboard", label: "Overview", icon: LayoutDashboard },
          { id: "payments", label: "Payments", icon: CreditCard },
          { id: "maintenance", label: "Services", icon: Wrench },
          { id: "messages", label: "Messages", icon: MessageSquare },
        ];
      case "admin":
        return [
          { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
          { id: "properties", label: "Properties", icon: Building },
          { id: "tenants", label: "Tenants", icon: Users },
          { id: "investors", label: "Investors", icon: Briefcase },
          { id: "transactions", label: "Transactions", icon: Wallet },
          { id: "maintenance", label: "Requests", icon: Wrench },
        ];
      case "verdafarms":
        return [
          { id: "dashboard", label: "Overview", icon: LayoutDashboard },
          { id: "crops", label: "Crop Portfolio", icon: Sprout },
          { id: "farm-reports", label: "Reports", icon: BarChart3 },
          { id: "farm-documents", label: "Documents", icon: FileText },
          { id: "feedback", label: "Feedback", icon: MessageSquare },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems(role);

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      {/* Logo Area */}
      <div className="flex h-24 items-center px-8">
        <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-slate-200">
          <span className="text-[#DDA04E] font-bold text-sm">CF</span>
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">
          ClientFlow
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-4 space-y-2">
        <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Menu
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              onTabChange(item.id);
              setIsMobileOpen(false);
            }}
            className={`group flex w-full items-center px-4 py-3.5 text-sm font-medium rounded-[18px] transition-all duration-300 ${
              activeTab === item.id
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <item.icon
              className={`mr-4 h-5 w-5 transition-colors ${
                activeTab === item.id
                  ? "text-[#DDA04E]"
                  : "text-slate-400 group-hover:text-slate-600"
              }`}
            />
            {item.label}
          </button>
        ))}

        <div className="pt-8">
          <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Settings
          </p>
          <button
            onClick={() => {
              onTabChange("settings");
              setIsMobileOpen(false);
            }}
            className={`flex w-full items-center px-4 py-3.5 text-sm font-medium rounded-[18px] transition-all ${
              activeTab === "settings"
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Settings
              className={`mr-4 h-5 w-5 transition-colors ${
                activeTab === "settings" ? "text-[#DDA04E]" : "text-slate-400"
              }`}
            />
            Settings
          </button>
          <button
            onClick={onLogout}
            className="flex w-full items-center px-4 py-3.5 text-sm font-medium rounded-[18px] text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="mr-4 h-5 w-5 text-slate-400 group-hover:text-red-600" />
            Log out
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="p-6">
        <div className="bg-slate-50 rounded-[24px] p-4 flex items-center border border-slate-100">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src={displayUser.avatar} />
            <AvatarFallback>
              {displayUser.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">
              {displayUser.name}
            </p>
            <p className="text-xs text-slate-500 truncate capitalize">
              {role === "verdafarms" ? "Verda Farms" : role} Account
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F2F4F7]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-[280px] md:flex-col shrink-0 m-4 ml-0 md:ml-4 rounded-[32px] overflow-hidden shadow-sm">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Header */}
        <header className="flex h-16 md:h-24 items-center justify-between px-4 md:px-8 z-10">
          {/* Mobile: hamburger */}
          <div className="flex items-center md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-slate-600" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-[280px] border-r-0 rounded-r-[32px]"
              >
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu for mobile devices
                </SheetDescription>
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile: centered logo */}
          <div className="flex md:hidden items-center absolute left-1/2 -translate-x-1/2">
            <div className="h-8 w-8 bg-slate-900 rounded-xl flex items-center justify-center mr-2 shadow-lg shadow-slate-200">
              <span className="text-[#DDA04E] font-bold text-xs">CF</span>
            </div>
            <span className="text-base font-bold text-slate-900 tracking-tight">ClientFlow</span>
          </div>

          {/* Desktop: greeting */}
          <div className="hidden md:flex flex-col">
            <h1 className="text-2xl font-bold text-slate-900">
              Good morning, {displayUser.name?.split(" ")[0] || "there"}! 👋
            </h1>
            <p className="text-slate-500 text-sm">
              {role === "verdafarms"
                ? "Here is what's happening with your farm investments today."
                : "Here is what's happening with your portfolio today."}
            </p>
          </div>

          {/* Desktop: search + bell */}
          <div className="hidden md:flex items-center space-x-4 bg-white p-2 pr-6 rounded-full shadow-sm">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search anything..."
                className="pl-11 border-none bg-transparent shadow-none w-64 focus-visible:ring-0"
              />
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-500 hover:text-[#DDA04E]"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
          </div>

          {/* Mobile: bell icon only */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-500"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto px-4 md:px-8 pb-24 md:pb-8">
          <div className="mx-auto max-w-[1600px] animate-in fade-in duration-500">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-lg z-50">
          <div className="flex items-center justify-around px-2 py-2">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all min-w-0 flex-1 ${
                  activeTab === item.id
                    ? "text-slate-900"
                    : "text-slate-400"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  activeTab === item.id ? "bg-slate-900" : ""
                }`}>
                  <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-[#DDA04E]" : "text-slate-400"}`} />
                </div>
                <span className={`text-[10px] font-medium mt-0.5 truncate ${
                  activeTab === item.id ? "text-slate-900" : "text-slate-400"
                }`}>
                  {item.label}
                </span>
              </button>
            ))}
            <button
              onClick={() => onTabChange("settings")}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all min-w-0 flex-1 ${
                activeTab === "settings" ? "text-slate-900" : "text-slate-400"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${
                activeTab === "settings" ? "bg-slate-900" : ""
              }`}>
                <Settings className={`h-5 w-5 ${activeTab === "settings" ? "text-[#DDA04E]" : "text-slate-400"}`} />
              </div>
              <span className={`text-[10px] font-medium mt-0.5 ${
                activeTab === "settings" ? "text-slate-900" : "text-slate-400"
              }`}>
                Settings
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
