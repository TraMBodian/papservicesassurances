import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Shield, FileText, Building2, CreditCard,
  Stethoscope, Pill, ClipboardList, Receipt, ChevronDown, ChevronRight,
  Menu, X, Heart, LogOut
} from "lucide-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  { label: "Tableau de bord", icon: <LayoutDashboard size={20} />, path: "/" },
  {
    label: "Production",
    icon: <Shield size={20} />,
    children: [
      { label: "Polices", path: "/polices" },
      { label: "Maladie Famille", path: "/maladie-famille" },
      { label: "Maladie Groupe", path: "/maladie-groupe" },
    ],
  },
  { label: "Assurés", icon: <Users size={20} />, path: "/assures" },
  { label: "Prestataires", icon: <Stethoscope size={20} />, path: "/prestataires" },
  {
    label: "Sinistres",
    icon: <FileText size={20} />,
    children: [
      { label: "Liste sinistres", path: "/sinistres" },
      { label: "Remboursements", path: "/remboursements" },
    ],
  },
  { label: "Cartes", icon: <CreditCard size={20} />, path: "/cartes" },
  { label: "Consultations", icon: <ClipboardList size={20} />, path: "/consultations" },
  { label: "Prescriptions", icon: <Pill size={20} />, path: "/prescriptions" },
];

export default function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Production", "Sinistres"]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    );
  };

  const isActive = (path?: string) => path === location.pathname;
  const isChildActive = (children?: { path: string }[]) =>
    children?.some((c) => c.path === location.pathname);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <button 
        onClick={() => navigate("/")} 
        className="flex items-center gap-3 px-5 py-6 border-b border-sidebar-border hover:bg-sidebar-accent transition-colors w-full text-left"
      >
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <Heart size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-display text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SantéAssur</h1>
            <p className="text-[10px] text-sidebar-muted">Gestion Assurance Maladie</p>
          </div>
        )}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) =>
          item.children ? (
            <div key={item.label}>
              <button
                onClick={() => toggleMenu(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isChildActive(item.children)
                    ? "text-white bg-gradient-to-r from-blue-600 to-purple-600"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                {item.icon}
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {openMenus.includes(item.label) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </>
                )}
              </button>
              <AnimatePresence>
                {openMenus.includes(item.label) && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-8 mt-1 space-y-0.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                            isActive(child.path)
                              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 font-medium"
                              : "text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              key={item.path}
              to={item.path!}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-white bg-gradient-to-r from-blue-600 to-purple-600"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        )}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="px-4 py-4 border-t border-sidebar-border">
          <button
            onClick={() => navigate("/profile")}
            className="w-full flex items-center gap-3 mb-3 hover:bg-sidebar-accent rounded-lg p-2 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xs font-semibold text-white">
              AD
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-medium text-sidebar-foreground truncate">Admin</p>
              <p className="text-[10px] text-sidebar-muted truncate">admin@santeassur.sn</p>
            </div>
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            <span>Déconnexion</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-card shadow-card border border-border"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/30 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] bg-sidebar z-50 lg:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-sidebar-muted hover:text-sidebar-foreground"
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
          collapsed ? "w-[68px]" : "w-[260px]"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
