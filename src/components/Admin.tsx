import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Users,
  Mail,
  Phone,
  Building2,
  Calendar,
  Database,
  Download,
  Trash2,
  TrendingUp,
  Lock,
} from "lucide-react";
import { GlowCard } from "./UI";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  clinicName: string;
  date: string;
}

export const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("aeons_admin_auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [chartData, setChartData] = useState<
    { label: string; count: number; date: string }[]
  >([]);

  const calculateChartData = (currentLeads: Lead[]) => {
    const days = [];
    let max = 0;
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const count = currentLeads.filter((l) =>
        l.date.startsWith(dateStr),
      ).length;
      if (count > max) max = count;
      days.push({
        date: dateStr,
        label: d.toLocaleDateString(undefined, { weekday: "short" }),
        count,
      });
    }
    setChartData(days);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("aeons_leads") || "[]");
    setLeads(stored);
    calculateChartData(stored);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      const updated = leads.filter((l) => l.id !== id);
      setLeads(updated);
      localStorage.setItem("aeons_leads", JSON.stringify(updated));
      calculateChartData(updated);
    }
  };

  const handleExport = () => {
    if (leads.length === 0) return;

    const headers = ["Name", "Clinic Name", "Email", "Phone", "Date Joined"];
    const rows = leads.map((lead) => [
      `"${lead.name.replace(/"/g, '""')}"`,
      `"${lead.clinicName.replace(/"/g, '""')}"`,
      `"${lead.email.replace(/"/g, '""')}"`,
      `"${lead.phone.replace(/"/g, '""')}"`,
      `"${new Date(lead.date).toISOString()}"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `aeons_leads_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("aeons_admin_auth", "true");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-primary/30 selection:text-brand-glow flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        <GlowCard
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-3xl w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-brand-primary shadow-[0_0_30px_rgba(59,130,246,0.2)]">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold font-heading">Admin Access</h1>
            <p className="text-brand-muted text-sm mt-2">
              Enter your password to manage leads
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-5 py-3.5 bg-black/20 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-primary/50 focus:bg-white/5 transition-all outline-none"
              />
              {error && (
                <p className="text-red-400 text-sm mt-2 px-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-black font-medium rounded-xl hover:bg-brand-glow transition-colors mt-2"
            >
              Verify Secure Access
            </button>
            <a
              href="#"
              className="text-center text-sm text-brand-muted hover:text-white mt-4 flex justify-center items-center gap-2"
            >
              <ArrowLeft size={14} /> Back to website
            </a>
          </form>
        </GlowCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-brand-primary/30 selection:text-brand-glow p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Background glow for admin context */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b border-brand-border pb-6">
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={18} className="text-brand-muted" />
            </a>
            <div>
              <h1 className="text-3xl font-heading font-bold tracking-tight">
                Admin Portal
              </h1>
              <p className="text-brand-muted text-sm mt-1">
                Early Access Waitlist Signups
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
              <span className="text-sm font-medium text-brand-muted">
                System Active
              </span>
            </div>
            <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-3">
              <Users size={16} className="text-brand-primary" />
              <span className="text-sm font-medium">
                {leads.length} Total Leads
              </span>
            </div>
            {leads.length > 0 && (
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-xl flex items-center gap-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-glow border border-brand-primary/20 transition-all font-medium text-sm"
              >
                <Download size={16} />
                Export CSV
              </button>
            )}
            <button
              onClick={() => {
                setIsAuthenticated(false);
                sessionStorage.removeItem("aeons_admin_auth");
              }}
              className="px-4 py-2 rounded-xl flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all font-medium text-sm"
            >
              Log Out
            </button>
          </div>
        </header>

        {leads.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center glass-panel rounded-3xl"
          >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-brand-muted mb-4">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Signups Yet</h3>
            <p className="text-brand-muted max-w-sm">
              Lead data will automatically populate here once visitors submit
              the early access form.
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col xl:flex-row gap-6 items-start">
            {/* Main Table */}
            <GlowCard
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel rounded-3xl overflow-hidden flex-1 w-full"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left relative z-10 border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Users size={14} /> Name
                        </div>
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Building2 size={14} /> Clinic Name
                        </div>
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Mail size={14} /> Email
                        </div>
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Phone size={14} /> Phone
                        </div>
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} /> Date Joined
                        </div>
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold text-brand-muted uppercase tracking-wider text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <AnimatePresence>
                      {leads.map((lead) => (
                        <motion.tr
                          key={lead.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="font-medium text-white">
                              {lead.name}
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-white/80">
                              {lead.clinicName}
                            </div>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-brand-glow hover:underline"
                            >
                              {lead.email}
                            </a>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className="text-brand-muted font-numbers">
                              {lead.phone}
                            </span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className="text-sm text-brand-muted">
                              {new Date(lead.date).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ml-auto"
                              title="Delete Lead"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </GlowCard>

            {/* Analytics Sidebar */}
            <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
              <GlowCard
                as={motion.div}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-6 rounded-3xl"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Signups Trend</h3>
                    <p className="text-xs text-brand-muted">Last 7 days</p>
                  </div>
                </div>

                <div className="flex items-end justify-between h-32 gap-2 mt-4">
                  {chartData.map((day, idx) => {
                    const maxCount = Math.max(
                      ...chartData.map((d) => d.count),
                      1,
                    );
                    const heightPercent = `${(day.count / maxCount) * 100}%`;

                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-2 flex-1 group"
                      >
                        <div className="relative w-full flex justify-center h-full items-end pb-1 text-xs text-brand-glow font-numbers opacity-0 group-hover:opacity-100 transition-opacity">
                          {day.count > 0 ? day.count : ""}
                        </div>
                        <div className="w-full bg-white/5 rounded-t-sm rounded-b-sm relative overflow-hidden group-hover:bg-white/10 transition-colors h-full flex items-end justify-center">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: heightPercent }}
                            transition={{
                              duration: 1,
                              delay: idx * 0.1,
                              ease: "easeOut",
                            }}
                            className="w-full bg-brand-primary rounded-t-sm opacity-80"
                          />
                        </div>
                        <span className="text-[10px] text-brand-muted uppercase font-medium">
                          {day.label.charAt(0)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </GlowCard>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
