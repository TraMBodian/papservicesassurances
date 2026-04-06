import { motion } from "framer-motion";
import { Users, Shield, FileText, Banknote, TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import AppLayout from "@/components/AppLayout";
import { mockStats, mockChartData, mockRecentActivity } from "@/data/mockData";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users size={22} />,
  shield: <Shield size={22} />,
  "file-text": <FileText size={22} />,
  banknote: <Banknote size={22} />,
};

const pieData = [
  { name: "Consultation", value: 35, color: "#3B82F6" },
  { name: "Pharmacie", value: 25, color: "#8B5CF6" },
  { name: "Hospitalisation", value: 20, color: "#10B981" },
  { name: "Analyses", value: 15, color: "#F59E0B" },
  { name: "Autres", value: 5, color: "#6B7280" },
];

const activityIcons: Record<string, React.ReactNode> = {
  creation: <Shield size={14} />,
  validation: <FileText size={14} />,
  payment: <Banknote size={14} />,
  medical: <Activity size={14} />,
};

const activityColors: Record<string, string> = {
  creation: "bg-primary/10 text-primary",
  validation: "bg-info/10 text-info",
  payment: "bg-success/10 text-success",
  medical: "bg-secondary/10 text-secondary-foreground",
};

export default function Dashboard() {
  return (
    <AppLayout title="Tableau de bord">
      <div className="space-y-6 max-w-7xl">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockStats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {iconMap[stat.icon]}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                {stat.trend === "up" ? (
                  <TrendingUp size={14} className="text-success" />
                ) : (
                  <TrendingDown size={14} className="text-destructive" />
                )}
                <span className={`text-xs font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">vs mois dernier</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-card rounded-xl p-5 shadow-card border border-border"
          >
            <h3 className="font-display font-semibold text-sm mb-4">Sinistres & Remboursements</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="mois" tick={{ fontSize: 12 }} stroke="hsl(215, 14%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 14%, 46%)" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid hsl(214, 20%, 90%)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="sinistres" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Sinistres" />
                <Bar dataKey="remboursements" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Remboursements" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-xl p-5 shadow-card border border-border"
          >
            <h3 className="font-display font-semibold text-sm mb-4">Répartition par type</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {pieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-5 shadow-card border border-border"
        >
          <h3 className="font-display font-semibold text-sm mb-4">Activité récente</h3>
          <div className="space-y-3">
            {mockRecentActivity.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${activityColors[item.type]}`}>
                  {activityIcons[item.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                  <Clock size={12} />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
