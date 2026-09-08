"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initialMockData,
  User,
  Publisher,
  Advertiser,
  Offer,
  Campaign,
  Conversion,
  Provider,
  AppEntity,
  Withdrawal,
  Deposit,
  Gateway,
  FraudAlert,
  CallbackLog,
  ClickLog,
  QueueJob,
  SystemLog,
  AuditLog,
  NotificationItem,
  ContactMessage,
  Ticket,
  Subscriber,
  Announcement
} from "../data/initialMockData";

interface AppContextType {
  // Users
  users: User[];
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  // Publishers
  publishers: Publisher[];
  updatePublisher: (id: string, updates: Partial<Publisher>) => void;
  // Advertisers
  advertisers: Advertiser[];
  updateAdvertiser: (id: string, updates: Partial<Advertiser>) => void;
  // Offers
  offers: Offer[];
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  // Campaigns
  campaigns: Campaign[];
  approveCampaign: (id: string, notes?: string) => void;
  rejectCampaign: (id: string, reason: string) => void;
  bulkApproveCampaigns: (ids: string[]) => void;
  bulkRejectCampaigns: (ids: string[], reason: string) => void;
  // Conversions
  conversions: Conversion[];
  // Providers
  providers: Provider[];
  updateProvider: (id: string, updates: Partial<Provider>) => void;
  // Apps
  apps: AppEntity[];
  updateApp: (id: string, updates: Partial<AppEntity>) => void;
  // Financial
  withdrawals: Withdrawal[];
  approveWithdrawal: (id: string) => void;
  rejectWithdrawal: (id: string) => void;
  bulkApproveWithdrawals: (ids: string[]) => void;
  bulkRejectWithdrawals: (ids: string[]) => void;
  deposits: Deposit[];
  updateDeposit: (id: string, updates: Partial<Deposit>) => void;
  gateways: Gateway[];
  updateGateway: (id: string, updates: Partial<Gateway>) => void;
  toggleGatewaySandbox: (id: string) => void;
  // Monitoring
  fraudAlerts: FraudAlert[];
  resolveFraudAlert: (id: string) => void;
  dismissFraudAlert: (id: string) => void;
  callbacks: CallbackLog[];
  retryCallback: (id: string) => void;
  clicks: ClickLog[];
  queueJobs: QueueJob[];
  retryQueueJob: (id: string) => void;
  deleteQueueJob: (id: string) => void;
  retryAllQueueJobs: () => void;
  flushAllQueueJobs: () => void;
  logs: SystemLog[];
  cleanupLogs: (days: number) => void;
  auditLogs: AuditLog[];
  // Communication
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  contacts: ContactMessage[];
  deleteContact: (id: string) => void;
  updateContactStatus: (id: string, status: ContactMessage['status']) => void;
  tickets: Ticket[];
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  subscribers: Subscriber[];
  toggleSubscriber: (id: string) => void;
  deleteSubscriber: (id: string) => void;
  bulkDeactivateSubscribers: (ids: string[]) => void;
  bulkDeleteSubscribers: (ids: string[]) => void;
  announcements: Announcement[];
  addAnnouncement: (item: Omit<Announcement, 'id'>) => void;
  toggleAnnouncement: (id: string) => void;
  deleteAnnouncement: (id: string) => void;
  // Settings
  settings: typeof initialMockData.settings;
  updateSettings: <K extends keyof typeof initialMockData.settings>(
    section: K,
    updates: Partial<typeof initialMockData.settings[K]>
  ) => void;
  runCronJob: (id: string) => void;
  // Auth
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  // Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(initialMockData.users);
  const [publishers, setPublishers] = useState<Publisher[]>(initialMockData.publishers);
  const [advertisers, setAdvertisers] = useState<Advertiser[]>(initialMockData.advertisers);
  const [offers, setOffers] = useState<Offer[]>(initialMockData.offers);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialMockData.campaigns);
  const [conversions, setConversions] = useState<Conversion[]>(initialMockData.conversions);
  const [providers, setProviders] = useState<Provider[]>(initialMockData.providers);
  const [apps, setApps] = useState<AppEntity[]>(initialMockData.apps);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>(initialMockData.withdrawals);
  const [deposits, setDeposits] = useState<Deposit[]>(initialMockData.deposits);
  const [gateways, setGateways] = useState<Gateway[]>(initialMockData.gateways);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>(initialMockData.fraudAlerts);
  const [callbacks, setCallbacks] = useState<CallbackLog[]>(initialMockData.callbacks);
  const [clicks, setClicks] = useState<ClickLog[]>(initialMockData.clicks);
  const [queueJobs, setQueueJobs] = useState<QueueJob[]>(initialMockData.queueJobs);
  const [logs, setLogs] = useState<SystemLog[]>(initialMockData.logs);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialMockData.auditLogs);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialMockData.notifications);
  const [contacts, setContacts] = useState<ContactMessage[]>(initialMockData.contacts);
  const [tickets, setTickets] = useState<Ticket[]>(initialMockData.tickets);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialMockData.subscribers);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialMockData.announcements);
  const [settings, setSettings] = useState(initialMockData.settings);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const login = (email: string, pass: string) => {
    if (email === "admin@admin.com") {
      setIsAuthenticated(true);
      showToast("Signed in successfully as Admin", "success");
      return true;
    }
    showToast("Invalid email or password", "error");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast("Signed out", "info");
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    showToast(`User ${id} updated`, "success");
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast(`User ${id} deleted`, "info");
  };

  const updatePublisher = (id: string, updates: Partial<Publisher>) => {
    setPublishers((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast(`Publisher updated`, "success");
  };

  const updateAdvertiser = (id: string, updates: Partial<Advertiser>) => {
    setAdvertisers((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    showToast(`Advertiser updated`, "success");
  };

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
    showToast(`Offer updated`, "success");
  };

  const approveCampaign = (id: string, notes?: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Approved", approvalNotes: notes } : c))
    );
    showToast(`Campaign approved`, "success");
  };

  const rejectCampaign = (id: string, reason: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Rejected", rejectionReason: reason } : c))
    );
    showToast(`Campaign rejected`, "info");
  };

  const bulkApproveCampaigns = (ids: string[]) => {
    setCampaigns((prev) =>
      prev.map((c) => (ids.includes(c.id) ? { ...c, status: "Approved" } : c))
    );
    showToast(`Approved ${ids.length} campaigns`, "success");
  };

  const bulkRejectCampaigns = (ids: string[], reason: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        ids.includes(c.id) ? { ...c, status: "Rejected", rejectionReason: reason } : c
      )
    );
    showToast(`Rejected ${ids.length} campaigns`, "info");
  };

  const updateProvider = (id: string, updates: Partial<Provider>) => {
    setProviders((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    showToast(`Provider updated`, "success");
  };

  const updateApp = (id: string, updates: Partial<AppEntity>) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
    showToast(`App updated`, "success");
  };

  const approveWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "Approved" } : w))
    );
    showToast(`Withdrawal approved`, "success");
  };

  const rejectWithdrawal = (id: string) => {
    setWithdrawals((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "Rejected" } : w))
    );
    showToast(`Withdrawal rejected`, "info");
  };

  const bulkApproveWithdrawals = (ids: string[]) => {
    setWithdrawals((prev) =>
      prev.map((w) => (ids.includes(w.id) ? { ...w, status: "Approved" } : w))
    );
    showToast(`Approved ${ids.length} withdrawals`, "success");
  };

  const bulkRejectWithdrawals = (ids: string[]) => {
    setWithdrawals((prev) =>
      prev.map((w) => (ids.includes(w.id) ? { ...w, status: "Rejected" } : w))
    );
    showToast(`Rejected ${ids.length} withdrawals`, "info");
  };

  const updateDeposit = (id: string, updates: Partial<Deposit>) => {
    setDeposits((prev) => prev.map((d) => (d.id === id ? { ...d, ...updates } : d)));
    showToast(`Deposit updated`, "success");
  };

  const updateGateway = (id: string, updates: Partial<Gateway>) => {
    setGateways((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
    showToast(`Payment Gateway updated`, "success");
  };

  const toggleGatewaySandbox = (id: string) => {
    setGateways((prev) =>
      prev.map((g) => (g.id === id ? { ...g, sandbox: !g.sandbox } : g))
    );
    showToast(`Gateway environment toggled`, "info");
  };

  const resolveFraudAlert = (id: string) => {
    setFraudAlerts((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "Resolved" } : f))
    );
    showToast(`Fraud alert marked as Resolved`, "success");
  };

  const dismissFraudAlert = (id: string) => {
    setFraudAlerts((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "Dismissed" } : f))
    );
    showToast(`Fraud alert dismissed`, "info");
  };

  const retryCallback = (id: string) => {
    setCallbacks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Delivered", http: 200, retries: c.retries + 1 } : c))
    );
    showToast(`Callback resent successfully (200 OK)`, "success");
  };

  const retryQueueJob = (id: string) => {
    setQueueJobs((prev) => prev.filter((j) => j.id !== id));
    showToast(`Job retried and completed`, "success");
  };

  const deleteQueueJob = (id: string) => {
    setQueueJobs((prev) => prev.filter((j) => j.id !== id));
    showToast(`Job deleted from queue`, "info");
  };

  const retryAllQueueJobs = () => {
    const count = queueJobs.length;
    setQueueJobs([]);
    showToast(`Retried all ${count} failed jobs`, "success");
  };

  const flushAllQueueJobs = () => {
    setQueueJobs([]);
    showToast(`Flushed queue jobs completely`, "info");
  };

  const cleanupLogs = (days: number) => {
    showToast(`Cleaned up logs older than ${days} days`, "success");
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast(`Marked all notifications as read`, "info");
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showToast(`Contact message deleted`, "info");
  };

  const updateContactStatus = (id: string, status: ContactMessage['status']) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    showToast(`Contact marked as ${status}`, "success");
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    showToast(`Ticket updated`, "success");
  };

  const toggleSubscriber = (id: string) => {
    setSubscribers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Unsubscribed" : "Active" }
          : s
      )
    );
    showToast(`Subscriber status changed`, "info");
  };

  const deleteSubscriber = (id: string) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
    showToast(`Subscriber deleted`, "info");
  };

  const bulkDeactivateSubscribers = (ids: string[]) => {
    setSubscribers((prev) =>
      prev.map((s) => (ids.includes(s.id) ? { ...s, status: "Unsubscribed" } : s))
    );
    showToast(`Deactivated ${ids.length} subscribers`, "info");
  };

  const bulkDeleteSubscribers = (ids: string[]) => {
    setSubscribers((prev) => prev.filter((s) => !ids.includes(s.id)));
    showToast(`Deleted ${ids.length} subscribers`, "info");
  };

  const addAnnouncement = (item: Omit<Announcement, 'id'>) => {
    const newItem: Announcement = {
      id: `ann_${Date.now()}`,
      ...item
    };
    setAnnouncements((prev) => [newItem, ...prev]);
    showToast(`Announcement created`, "success");
  };

  const toggleAnnouncement = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === "Active" ? "Expired" : "Active" }
          : a
      )
    );
    showToast(`Announcement status changed`, "info");
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    showToast(`Announcement deleted`, "info");
  };

  const updateSettings = <K extends keyof typeof initialMockData.settings>(
    section: K,
    updates: Partial<typeof initialMockData.settings[K]>
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates
      }
    }));
    showToast(`Settings for ${String(section)} saved successfully`, "success");
  };

  const runCronJob = (id: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setSettings((prev) => ({
      ...prev,
      cron: prev.cron.map((c) => (c.id === id ? { ...c, lastRun: now } : c))
    }));
    showToast(`Cron job executed successfully at ${now}`, "success");
  };

  return (
    <AppContext.Provider
      value={{
        users,
        updateUser,
        deleteUser,
        publishers,
        updatePublisher,
        advertisers,
        updateAdvertiser,
        offers,
        updateOffer,
        campaigns,
        approveCampaign,
        rejectCampaign,
        bulkApproveCampaigns,
        bulkRejectCampaigns,
        conversions,
        providers,
        updateProvider,
        apps,
        updateApp,
        withdrawals,
        approveWithdrawal,
        rejectWithdrawal,
        bulkApproveWithdrawals,
        bulkRejectWithdrawals,
        deposits,
        updateDeposit,
        gateways,
        updateGateway,
        toggleGatewaySandbox,
        fraudAlerts,
        resolveFraudAlert,
        dismissFraudAlert,
        callbacks,
        retryCallback,
        clicks,
        queueJobs,
        retryQueueJob,
        deleteQueueJob,
        retryAllQueueJobs,
        flushAllQueueJobs,
        logs,
        cleanupLogs,
        auditLogs,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        contacts,
        deleteContact,
        updateContactStatus,
        tickets,
        updateTicket,
        subscribers,
        toggleSubscriber,
        deleteSubscriber,
        bulkDeactivateSubscribers,
        bulkDeleteSubscribers,
        announcements,
        addAnnouncement,
        toggleAnnouncement,
        deleteAnnouncement,
        settings,
        updateSettings,
        runCronJob,
        isAuthenticated,
        login,
        logout,
        toast,
        showToast
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl animate-fade-in transition-all">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              toast.type === "success"
                ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                : toast.type === "error"
                ? "bg-rose-400 shadow-[0_0_8px_#f87171]"
                : "bg-blue-400 shadow-[0_0_8px_#60a5fa]"
            }`}
          />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppStateProvider");
  }
  return context;
}
