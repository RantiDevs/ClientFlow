import { 
  Building2, 
  Home, 
  LandPlot, 
  CreditCard, 
  Wrench, 
  FileText, 
  MessageSquare,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";

export type UserRole = "investor" | "tenant" | "admin" | "verdafarms";

export const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export const PROJECTS = [
  {
    id: "p1",
    name: "The Pavilion Hostel",
    type: "Hostel",
    location: "University District, Zone A",
    status: "Active",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
    progress: 100,
    occupancy: 92,
    totalUnits: 50,
    roi: 12.5,
  },
  {
    id: "p2",
    name: "Green Valley Estate",
    type: "Land",
    location: "North Hills",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    progress: 100,
    occupancy: 0,
    totalUnits: 20,
    roi: 18.2,
  },
  {
    id: "p3",
    name: "Sunrise Apartments",
    type: "Construction",
    location: "Downtown Edge",
    status: "Under Management",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    progress: 65,
    milestones: [
      { name: "Foundation", completed: true },
      { name: "Structure", completed: true },
      { name: "Roofing", completed: true },
      { name: "Plumbing/Elec", completed: false },
      { name: "Finishing", completed: false },
    ],
    occupancy: 0,
    totalUnits: 12,
    roi: 0,
  }
];

export const FINANCIALS = [
  { month: "Jan", income: 12500, expense: 3200 },
  { month: "Feb", income: 13200, expense: 2800 },
  { month: "Mar", income: 12800, expense: 4100 },
  { month: "Apr", income: 14000, expense: 3000 },
  { month: "May", income: 14500, expense: 3500 },
  { month: "Jun", income: 14200, expense: 2900 },
];

export const TRANSACTIONS = [
  { id: 1, date: "2024-06-15", description: "Monthly Rent - Unit 304", amount: 850, type: "income", status: "completed" },
  { id: 2, date: "2024-06-12", description: "Plumbing Repair - Pavilion", amount: -120, type: "expense", status: "completed" },
  { id: 3, date: "2024-06-10", description: "Management Fee (10%)", amount: -450, type: "expense", status: "completed" },
  { id: 4, date: "2024-06-01", description: "Monthly Rent - Unit 102", amount: 850, type: "income", status: "completed" },
];

export const MAINTENANCE_TICKETS = [
  { id: "t1", title: "AC Not Cooling", property: "Pavilion - Unit 304", status: "In Progress", date: "2024-06-14", priority: "High" },
  { id: "t2", title: "Leaking Faucet", property: "Pavilion - Unit 201", status: "Pending", date: "2024-06-15", priority: "Low" },
  { id: "t3", title: "Internet Outage", property: "Pavilion - Common Area", status: "Resolved", date: "2024-06-10", priority: "Medium" },
];

export const MESSAGES = [
  { id: 1, from: "Admin Support", content: "Your maintenance request has been scheduled for tomorrow at 10 AM.", time: "2h ago", unread: true },
  { id: 2, from: "System", content: "Rent payment received. Thank you!", time: "1d ago", unread: false },
];

export const DOCUMENTS = [
  { id: 1, name: "Lease Agreement.pdf", type: "PDF", size: "2.4 MB", date: "2024-01-01" },
  { id: 2, name: "Monthly Statement - May.xlsx", type: "Excel", size: "1.1 MB", date: "2024-06-01" },
  { id: 3, name: "Property Photos.zip", type: "ZIP", size: "15 MB", date: "2024-02-15" },
];

// ===== VERDA FARMS MOCK DATA =====

export type CropStatus = "Preparing" | "Planted" | "Growing" | "Harvesting" | "Sold";

export interface FarmPlot {
  id: string;
  plotName: string;
  sizeSqm: number;
  crop: string;
  plantingDate: string;
  expectedHarvestDate: string;
  roiProjection: number;
  farmManager: string;
  farmManagerAvatar: string;
  status: CropStatus;
  image: string;
}

export interface FarmReport {
  id: string;
  month: string;
  growthStage: string;
  photoUrl: string;
  expenses: { label: string; amount: number }[];
  weatherNotes: string;
  yieldProjection: string;
  date: string;
}

export interface FarmDocument {
  id: string;
  name: string;
  type: "upload" | "download";
  category: string;
  size: string;
  date: string;
  status: "Signed" | "Pending" | "Available";
}

export const FARM_PLOTS: FarmPlot[] = [
  {
    id: "fp1",
    plotName: "Plot A — Sector North",
    sizeSqm: 2500,
    crop: "Cashew",
    plantingDate: "2025-03-15",
    expectedHarvestDate: "2026-09-20",
    roiProjection: 22.5,
    farmManager: "Adebayo Ogunleye",
    farmManagerAvatar: "https://i.pravatar.cc/150?u=adebayo",
    status: "Growing",
    image: "https://images.unsplash.com/photo-1697567464321-3c152e4ba831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNoZXclMjB0cmVlJTIwcGxhbnRhdGlvbiUyMHRyb3BpY2FsfGVufDF8fHx8MTc3MjYyNTQyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "fp2",
    plotName: "Plot B — Riverside",
    sizeSqm: 1800,
    crop: "Cassava",
    plantingDate: "2025-06-01",
    expectedHarvestDate: "2026-02-15",
    roiProjection: 18.0,
    farmManager: "Ngozi Eze",
    farmManagerAvatar: "https://i.pravatar.cc/150?u=ngozi",
    status: "Planted",
    image: "https://images.unsplash.com/photo-1758614312118-4f7cd900ab26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwZmFybSUyMGhhcnZlc3QlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzI2MjU0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "fp3",
    plotName: "Plot C — Hilltop",
    sizeSqm: 3200,
    crop: "Managed Portfolio",
    plantingDate: "2025-01-10",
    expectedHarvestDate: "2025-12-01",
    roiProjection: 25.3,
    farmManager: "Adebayo Ogunleye",
    farmManagerAvatar: "https://i.pravatar.cc/150?u=adebayo",
    status: "Harvesting",
    image: "https://images.unsplash.com/photo-1686008674009-876c599f1fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBmYXJtJTIwcGxhbnRhdGlvbiUyMGdyZWVuJTIwY3JvcHN8ZW58MXx8fHwxNzcyNjI1NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "fp4",
    plotName: "Plot D — Eastern Valley",
    sizeSqm: 1500,
    crop: "Cashew",
    plantingDate: "2025-11-01",
    expectedHarvestDate: "2027-05-15",
    roiProjection: 20.0,
    farmManager: "Ngozi Eze",
    farmManagerAvatar: "https://i.pravatar.cc/150?u=ngozi",
    status: "Preparing",
    image: "https://images.unsplash.com/photo-1697567464321-3c152e4ba831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNoZXclMjB0cmVlJTIwcGxhbnRhdGlvbiUyMHRyb3BpY2FsfGVufDF8fHx8MTc3MjYyNTQyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export const FARM_REPORTS: FarmReport[] = [
  {
    id: "fr1",
    month: "February 2026",
    growthStage: "Flowering",
    photoUrl: "https://images.unsplash.com/photo-1697567464321-3c152e4ba831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNoZXclMjB0cmVlJTIwcGxhbnRhdGlvbiUyMHRyb3BpY2FsfGVufDF8fHx8MTc3MjYyNTQyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    expenses: [
      { label: "Labor", amount: 1200 },
      { label: "Fertilizer", amount: 450 },
      { label: "Irrigation", amount: 300 },
      { label: "Pest Control", amount: 180 },
    ],
    weatherNotes: "Dry season extended by 2 weeks. Supplemental irrigation deployed. No crop damage reported.",
    yieldProjection: "On track — estimated 2.8 tonnes/hectare",
    date: "2026-02-28",
  },
  {
    id: "fr2",
    month: "January 2026",
    growthStage: "Vegetative Growth",
    photoUrl: "https://images.unsplash.com/photo-1686008674009-876c599f1fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBmYXJtJTIwcGxhbnRhdGlvbiUyMGdyZWVuJTIwY3JvcHN8ZW58MXx8fHwxNzcyNjI1NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    expenses: [
      { label: "Labor", amount: 1100 },
      { label: "Fertilizer", amount: 600 },
      { label: "Equipment Maintenance", amount: 250 },
    ],
    weatherNotes: "Good rainfall. Soil moisture levels optimal. Growth rate above average.",
    yieldProjection: "Above average — estimated 3.0 tonnes/hectare",
    date: "2026-01-31",
  },
  {
    id: "fr3",
    month: "December 2025",
    growthStage: "Seedling Establishment",
    photoUrl: "https://images.unsplash.com/photo-1758614312118-4f7cd900ab26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwZmFybSUyMGhhcnZlc3QlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzI2MjU0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    expenses: [
      { label: "Seedlings", amount: 2000 },
      { label: "Land Preparation", amount: 1500 },
      { label: "Labor", amount: 900 },
    ],
    weatherNotes: "Transition to dry season. Mulching applied to retain moisture.",
    yieldProjection: "Early stage — projections pending",
    date: "2025-12-31",
  },
];

export const FARM_DOCUMENTS: FarmDocument[] = [
  { id: "fd1", name: "Investment Contract", type: "download", category: "Agreement", size: "1.8 MB", date: "2025-03-01", status: "Signed" },
  { id: "fd2", name: "Land Allocation Certificate", type: "download", category: "Certificate", size: "2.1 MB", date: "2025-03-01", status: "Available" },
  { id: "fd3", name: "Farm Management Agreement", type: "download", category: "Agreement", size: "1.5 MB", date: "2025-03-15", status: "Signed" },
  { id: "fd4", name: "Q4 2025 Harvest Report", type: "download", category: "Report", size: "3.2 MB", date: "2025-12-31", status: "Available" },
  { id: "fd5", name: "Sales Receipt — Batch #12", type: "download", category: "Receipt", size: "0.8 MB", date: "2026-01-15", status: "Available" },
  { id: "fd6", name: "Government ID", type: "upload", category: "KYC", size: "—", date: "2025-03-01", status: "Signed" },
  { id: "fd7", name: "Signed Agreement Copy", type: "upload", category: "Agreement", size: "—", date: "—", status: "Pending" },
];

export const CROP_PORTFOLIO = [
  {
    id: "crop1",
    name: "Cashew",
    description: "High-value tree crop with 18-month cycle. Excellent long-term ROI with global demand.",
    cycleDuration: "18 months",
    avgRoi: "20-25%",
    riskLevel: "Low",
    image: "https://images.unsplash.com/photo-1697567464321-3c152e4ba831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNoZXclMjB0cmVlJTIwcGxhbnRhdGlvbiUyMHRyb3BpY2FsfGVufDF8fHx8MTc3MjYyNTQyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "crop2",
    name: "Cassava",
    description: "Staple food crop with 8-12 month cycle. Strong local and industrial demand.",
    cycleDuration: "8-12 months",
    avgRoi: "15-20%",
    riskLevel: "Low",
    image: "https://images.unsplash.com/photo-1758614312118-4f7cd900ab26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNzYXZhJTIwZmFybSUyMGhhcnZlc3QlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NzI2MjU0Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "crop3",
    name: "Managed Portfolio",
    description: "Let Verda Farms experts decide the optimal crop mix based on soil, market conditions, and climate.",
    cycleDuration: "Variable",
    avgRoi: "22-28%",
    riskLevel: "Medium",
    image: "https://images.unsplash.com/photo-1686008674009-876c599f1fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBmYXJtJTIwcGxhbnRhdGlvbiUyMGdyZWVuJTIwY3JvcHN8ZW58MXx8fHwxNzcyNjI1NDI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export const FARM_YIELD_DATA = [
  { month: "Sep", projected: 0, actual: 0 },
  { month: "Oct", projected: 200, actual: 180 },
  { month: "Nov", projected: 450, actual: 420 },
  { month: "Dec", projected: 800, actual: 750 },
  { month: "Jan", projected: 1200, actual: 1150 },
  { month: "Feb", projected: 1800, actual: 1720 },
];