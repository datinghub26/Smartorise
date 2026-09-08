export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Publisher' | 'Advertiser' | 'Admin' | 'User';
  status: 'Active' | 'Pending' | 'Suspended' | 'Banned';
  publisherId?: string;
  balance: number;
  joined: string;
}

export interface Publisher {
  id: string;
  code: string;
  company: string;
  email: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  appsCount: number;
}

export interface Advertiser {
  id: string;
  company: string;
  contact: string;
  offersCount: number;
  spent: number;
  status: 'Active' | 'Suspended';
}

export interface Offer {
  id: string;
  title: string;
  externalId: string;
  thumbnail: string;
  provider: string;
  category: 'CPI' | 'CPA' | 'Survey';
  payout: number;
  reward: number;
  status: 'Active' | 'Pending' | 'Paused';
}

export interface Campaign {
  id: string;
  title: string;
  targetUrl: string;
  advertiser: string;
  type: 'CPI' | 'CPA' | 'CPC' | 'CPM';
  payout: number;
  dailyCap: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Paused';
  created: string;
  approvalNotes?: string;
  rejectionReason?: string;
}

export interface Conversion {
  id: string;
  transactionId: string;
  offer: string;
  user: string;
  payout: number;
  provider: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  date: string;
}

export interface Provider {
  id: string;
  name: string;
  code: string;
  postbackUrl: string;
  payoutShare: number;
  offersCount: number;
  status: 'Active' | 'Inactive';
}

export interface AppEntity {
  id: string;
  title: string;
  appKey: string;
  publisher: string;
  platform: 'Android' | 'iOS' | 'Web' | 'Unity';
  status: 'Active' | 'Pending' | 'Suspended';
  clicks: number;
  conversions: number;
}

export interface Withdrawal {
  id: string;
  user: string;
  email: string;
  amount: number;
  method: 'PayPal' | 'Crypto' | 'Bank' | 'Payoneer';
  accountDetails: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Processed';
  date: string;
}

export interface Deposit {
  id: string;
  reference: string;
  advertiser: string;
  date: string;
  method: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Gateway {
  id: string;
  name: string;
  type: string;
  desc: string;
  min: number;
  max: number;
  feePercent: number;
  fixedFee: number;
  sandbox: boolean;
  active: boolean;
}

export interface FraudAlert {
  id: string;
  type: 'Vpn proxy' | 'Multi-account' | 'Fast completion' | 'Device spoof';
  user: string;
  ip: string;
  risk: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Investigating' | 'Resolved' | 'Dismissed';
  date: string;
}

export interface CallbackLog {
  id: string;
  app: string;
  status: 'Delivered' | 'Pending' | 'Failed' | 'Retrying';
  http: number;
  retries: number;
  error: string;
  date: string;
}

export interface ClickLog {
  id: string;
  offer: string;
  user: string;
  ip: string;
  country: string;
  fraud: 'Clean' | 'Suspicious' | 'Blocked';
  time: string;
}

export interface QueueJob {
  id: string;
  connection: string;
  queue: string;
  exception: string;
  failedAt: string;
}

export interface SystemLog {
  id: string;
  type: 'API' | 'Error' | 'Activity' | 'Security' | 'System';
  level: 'Debug' | 'Info' | 'Warning' | 'Error' | 'Critical';
  message: string;
  user: string;
  ip: string;
  date: string;
}

export interface AuditLog {
  id: string;
  time: string;
  level: 'Info' | 'Warning' | 'Error' | 'Critical';
  channel: string;
  message: string;
  ip: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  category: 'System' | 'Payments' | 'Deposits' | 'Withdrawals' | 'Publishers' | 'Advertisers' | 'Campaigns' | 'Security' | 'Fraud';
  message: string;
  time: string;
  isRead: boolean;
}

export interface ContactMessage {
  id: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  status: 'New' | 'Read' | 'Replied' | 'Closed';
  date: string;
  message: string;
}

export interface Ticket {
  id: string;
  subject: string;
  user: string;
  category: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Pending' | 'Closed';
  assigned: string;
  date: string;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Unsubscribed';
  source: string;
  subscribedDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  type: 'Info' | 'Warning' | 'Critical' | 'Maintenance';
  audience: 'All' | 'Publishers' | 'Advertisers';
  status: 'Active' | 'Scheduled' | 'Expired';
  start: string;
  end: string;
}

export interface RoleEntity {
  id: string;
  role: string;
  slug: string;
  superAdmin: boolean;
  permissionsCount: number;
  usersCount: number;
}

export interface StaffEntity {
  id: string;
  user: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

export const initialMockData = {
  users: [
    { id: "usr_1", name: "Admin", email: "admin@admin.com", avatar: "A", role: "Admin" as const, status: "Active" as const, balance: 1450.00, joined: "2026-01-10" },
    { id: "usr_2", name: "Facebook", email: "cpamarketinggrip@gmail.com", avatar: "F", role: "Publisher" as const, status: "Active" as const, publisherId: "#7", balance: 520.40, joined: "2026-02-14" },
    { id: "usr_3", name: "tope", email: "ahmedgemy267@gmail.com", avatar: "T", role: "Publisher" as const, status: "Active" as const, publisherId: "#4", balance: 340.00, joined: "2026-03-01" },
    { id: "usr_4", name: "Bazel", email: "support@smartorise.com", avatar: "B", role: "Publisher" as const, status: "Active" as const, publisherId: "#1", balance: 110.25, joined: "2026-03-12" },
    { id: "usr_5", name: "freshl", email: "freshl@adclient.net", avatar: "F", role: "Advertiser" as const, status: "Pending" as const, balance: 250.00, joined: "2026-04-05" },
    { id: "usr_6", name: "AlphaMedia", email: "contact@alphamedia.io", avatar: "A", role: "Advertiser" as const, status: "Active" as const, balance: 1200.00, joined: "2026-04-18" }
  ],
  publishers: [
    { id: "pub_7", code: "#7", company: "Facebook", email: "cpamarketinggrip@gmail.com", status: "Verified" as const, appsCount: 0 },
    { id: "pub_4", code: "#4", company: "tope", email: "ahmedgemy267@gmail.com", status: "Verified" as const, appsCount: 3 },
    { id: "pub_1", code: "#1", company: "Bazel", email: "support@smartorise.com", status: "Verified" as const, appsCount: 1 }
  ],
  advertisers: [
    { id: "adv_1", company: "freshl", contact: "freshl@adclient.net", offersCount: 2, spent: 450.00, status: "Active" as const },
    { id: "adv_2", company: "AlphaMedia", contact: "contact@alphamedia.io", offersCount: 4, spent: 1890.00, status: "Active" as const }
  ],
  offers: [
    { id: "off_1", title: "Raid: Shadow Legends RPG", externalId: "EXT-84920", thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop", provider: "BitLabs", category: "CPI" as const, payout: 12.50, reward: 8.75, status: "Active" as const },
    { id: "off_2", title: "Tiktok User Registration", externalId: "EXT-33012", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop", provider: "Torox", category: "CPA" as const, payout: 2.40, reward: 1.68, status: "Active" as const },
    { id: "off_3", title: "Global Consumer Survey 2026", externalId: "EXT-99214", thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&h=100&fit=crop", provider: "Wannads", category: "Survey" as const, payout: 3.10, reward: 2.15, status: "Active" as const },
    { id: "off_4", title: "Crypto.com App Download & KYC", externalId: "EXT-55201", thumbnail: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=100&h=100&fit=crop", provider: "CPALead", category: "CPA" as const, payout: 25.00, reward: 17.50, status: "Active" as const },
    { id: "off_5", title: "Monopoly GO! Reach Board 25", externalId: "EXT-10944", thumbnail: "https://images.unsplash.com/photo-1612287233207-681b439c7e09?w=100&h=100&fit=crop", provider: "AdGate", category: "CPI" as const, payout: 18.00, reward: 12.60, status: "Active" as const },
    { id: "off_6", title: "NordVPN 2-Year Plan Subscription", externalId: "EXT-77218", thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop", provider: "Lootably", category: "CPA" as const, payout: 35.00, reward: 24.50, status: "Pending" as const },
    { id: "off_7", title: "Daily Habits & Fitness Survey", externalId: "EXT-44021", thumbnail: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&h=100&fit=crop", provider: "AdGem", category: "Survey" as const, payout: 1.50, reward: 1.05, status: "Active" as const },
    { id: "off_8", title: "AliExpress First Order Deal", externalId: "EXT-12984", thumbnail: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&h=100&fit=crop", provider: "OfferToro", category: "CPA" as const, payout: 4.80, reward: 3.36, status: "Paused" as const }
  ],
  campaigns: [
    { id: "cmp_1", title: "test camp", targetUrl: "https://track.freshl.com/click?cid=90", advertiser: "freshl", type: "CPA" as const, payout: 1.80, dailyCap: 250, status: "Pending" as const, created: "2026-05-10" },
    { id: "cmp_2", title: "Crypto Casino Install & Spin", targetUrl: "https://spinandwin.io/aff?ref=smart", advertiser: "AlphaMedia", type: "CPI" as const, payout: 8.50, dailyCap: 500, status: "Pending" as const, created: "2026-05-12" },
    { id: "cmp_3", title: "Survey Pro Plus Qualification", targetUrl: "https://surveyproplus.com/start", advertiser: "freshl", type: "CPA" as const, payout: 2.20, dailyCap: 100, status: "Pending" as const, created: "2026-05-14" },
    { id: "cmp_4", title: "Fintech Wallet Sign up", targetUrl: "https://wallet.example.com", advertiser: "AlphaMedia", type: "CPA" as const, payout: 5.00, dailyCap: 300, status: "Approved" as const, created: "2026-04-20" },
    { id: "cmp_5", title: "Gaming Hub Android", targetUrl: "https://play.google.com/store/apps/details?id=com.gamehub", advertiser: "freshl", type: "CPI" as const, payout: 1.20, dailyCap: 1000, status: "Approved" as const, created: "2026-04-25" },
    { id: "cmp_6", title: "Auto Insurance Quote", targetUrl: "https://quotes.example.com", advertiser: "AlphaMedia", type: "CPC" as const, payout: 0.45, dailyCap: 200, status: "Approved" as const, created: "2026-04-28" }
  ],
  conversions: [
    { id: "cnv_1", transactionId: "TX-990142-BL", offer: "Raid: Shadow Legends RPG", user: "ahmedgemy267@gmail.com", payout: 12.50, provider: "BitLabs", status: "Approved" as const, date: "2026-05-15 11:20:10" },
    { id: "cnv_2", transactionId: "TX-990143-TR", offer: "Tiktok User Registration", user: "cpamarketinggrip@gmail.com", payout: 2.40, provider: "Torox", status: "Approved" as const, date: "2026-05-15 11:45:33" },
    { id: "cnv_3", transactionId: "TX-990144-AG", offer: "Monopoly GO! Reach Board 25", user: "support@smartorise.com", payout: 18.00, provider: "AdGate", status: "Pending" as const, date: "2026-05-15 12:10:04" }
  ],
  providers: [
    { id: "prv_1", name: "BitLabs", code: "bitlabs", postbackUrl: "https://prize.infy.click/api/v1/callbacks/bitlabs?uid={uid}&tx={tx_id}&val={val}", payoutShare: 80, offersCount: 1420, status: "Active" as const },
    { id: "prv_2", name: "Torox", code: "torox", postbackUrl: "https://prize.infy.click/api/v1/callbacks/torox?user_id={user_id}&amount={amount}", payoutShare: 75, offersCount: 840, status: "Active" as const },
    { id: "prv_3", name: "CPALead", code: "cpalead", postbackUrl: "https://prize.infy.click/api/v1/callbacks/cpalead?subid={subid}&payout={payout}", payoutShare: 70, offersCount: 310, status: "Active" as const },
    { id: "prv_4", name: "AdGate Media", code: "adgate", postbackUrl: "https://prize.infy.click/api/v1/callbacks/adgate?aff_sub={aff_sub}&point_value={point_value}", payoutShare: 75, offersCount: 224, status: "Active" as const },
    { id: "prv_5", name: "Wannads", code: "wannads", postbackUrl: "https://prize.infy.click/api/v1/callbacks/wannads?subId={subId}&reward={reward}", payoutShare: 80, offersCount: 190, status: "Active" as const },
    { id: "prv_6", name: "OfferToro", code: "offertoro", postbackUrl: "https://prize.infy.click/api/v1/callbacks/offertoro?oid={oid}&amount={amount}", payoutShare: 70, offersCount: 110, status: "Active" as const }
  ],
  apps: [
    { id: "app_1", title: "offerslucky", appKey: "app_sec_78fa9b201a", publisher: "Facebook", platform: "Android" as const, status: "Active" as const, clicks: 14, conversions: 2 },
    { id: "app_2", title: "RewardsDaily", appKey: "app_sec_110aef7319", publisher: "tope", platform: "iOS" as const, status: "Active" as const, clicks: 4, conversions: 0 },
    { id: "app_3", title: "GemRush Games", appKey: "app_sec_5548cbe992", publisher: "tope", platform: "Unity" as const, status: "Active" as const, clicks: 2, conversions: 1 },
    { id: "app_4", title: "CryptoTap Web", appKey: "app_sec_99182ab341", publisher: "tope", platform: "Web" as const, status: "Active" as const, clicks: 1, conversions: 0 },
    { id: "app_5", title: "SurveyKing Global", appKey: "app_sec_00281b6724", publisher: "Bazel", platform: "Android" as const, status: "Active" as const, clicks: 0, conversions: 0 }
  ],
  withdrawals: [
    { id: "wth_1", user: "cpamarketinggrip@gmail.com", email: "cpamarketinggrip@gmail.com", amount: 150.00, method: "Crypto" as const, accountDetails: "LTC: Ldp29Gk90...", status: "Pending" as const, date: "2026-05-14 09:12" },
    { id: "wth_2", user: "ahmedgemy267@gmail.com", email: "ahmedgemy267@gmail.com", amount: 50.00, method: "PayPal" as const, accountDetails: "ahmedgemy267@gmail.com", status: "Pending" as const, date: "2026-05-15 08:30" },
    { id: "wth_3", user: "support@smartorise.com", email: "support@smartorise.com", amount: 200.00, method: "Bank" as const, accountDetails: "IBAN: GB29NWBK...", status: "Processed" as const, date: "2026-05-10 14:20" }
  ],
  deposits: [
    { id: "dep_1", reference: "DEP-90812", advertiser: "freshl", date: "2026-05-01 10:22", method: "Bank Transfer", amount: 250.00, status: "Completed" as const },
    { id: "dep_2", reference: "DEP-90813", advertiser: "AlphaMedia", date: "2026-05-03 14:15", method: "Stripe", amount: 500.00, status: "Completed" as const },
    { id: "dep_3", reference: "DEP-90814", advertiser: "AlphaMedia", date: "2026-05-08 16:40", method: "Binance Pay", amount: 1000.00, status: "Completed" as const },
    { id: "dep_4", reference: "DEP-90815", advertiser: "freshl", date: "2026-05-11 11:05", method: "PayPal", amount: 200.00, status: "Completed" as const },
    { id: "dep_5", reference: "DEP-90816", advertiser: "AlphaMedia", date: "2026-05-13 09:30", method: "Bank Transfer", amount: 390.00, status: "Completed" as const },
    { id: "dep_6", reference: "DEP-90817", advertiser: "freshl", date: "2026-05-15 15:10", method: "Bank Transfer", amount: 250.00, status: "Pending" as const }
  ],
  gateways: [
    { id: "gw_1", name: "Stripe", type: "online", desc: "Accept credit and debit cards via Stripe", min: 5.00, max: 10000.00, feePercent: 2.90, fixedFee: 0.30, sandbox: true, active: true },
    { id: "gw_2", name: "PayPal", type: "online", desc: "Accept payments via PayPal", min: 5.00, max: 10000.00, feePercent: 3.49, fixedFee: 0.49, sandbox: true, active: true },
    { id: "gw_3", name: "Coinbase Commerce", type: "crypto", desc: "Accept decentralized multi-crypto payments", min: 10.00, max: 25000.00, feePercent: 1.00, fixedFee: 0.00, sandbox: true, active: true },
    { id: "gw_4", name: "Binance Pay", type: "crypto", desc: "Accept instant zero-gas payments via Binance Pay", min: 10.00, max: 50000.00, feePercent: 0.50, fixedFee: 0.00, sandbox: true, active: true },
    { id: "gw_5", name: "Cryptocurrency (Direct)", type: "crypto", desc: "Direct on-chain wallet addresses (BTC, ETH, USDT)", min: 20.00, max: 100000.00, feePercent: 0.00, fixedFee: 0.00, sandbox: true, active: true },
    { id: "gw_6", name: "Bank Transfer", type: "manual", desc: "Manual bank transfer / wire payment with receipt verification", min: 50.00, max: 100000.00, feePercent: 0.00, fixedFee: 0.00, sandbox: false, active: true }
  ],
  fraudAlerts: [
    { id: "frd_1", type: "Vpn proxy" as const, user: "guest_9921@tmpmail.com", ip: "185.220.101.5", risk: 94, severity: "Critical" as const, status: "Open" as const, date: "2026-05-15 13:01" },
    { id: "frd_2", type: "Multi-account" as const, user: "bot_farm_02@gmail.com", ip: "45.154.255.88", risk: 88, severity: "High" as const, status: "Open" as const, date: "2026-05-15 12:44" },
    { id: "frd_3", type: "Fast completion" as const, user: "speedy_user@yahoo.com", ip: "194.26.29.112", risk: 75, severity: "Medium" as const, status: "Investigating" as const, date: "2026-05-15 11:15" },
    { id: "frd_4", type: "Vpn proxy" as const, user: "cpamarketinggrip@gmail.com", ip: "103.152.18.2", risk: 68, severity: "Medium" as const, status: "Resolved" as const, date: "2026-05-14 18:22" },
    { id: "frd_5", type: "Device spoof" as const, user: "emulator_x9@gmail.com", ip: "91.240.118.4", risk: 96, severity: "Critical" as const, status: "Open" as const, date: "2026-05-14 15:30" }
  ],
  callbacks: [
    { id: "clb_1", app: "offerslucky", status: "Delivered" as const, http: 200, retries: 0, error: "-", date: "2026-05-15 11:20:12" },
    { id: "clb_2", app: "GemRush Games", status: "Delivered" as const, http: 200, retries: 0, error: "-", date: "2026-05-15 11:45:35" },
    { id: "clb_3", app: "RewardsDaily", status: "Failed" as const, http: 500, retries: 3, error: "Connection timed out (10s)", date: "2026-05-14 20:11:00" }
  ],
  clicks: [
    { id: "clk_1", offer: "Raid: Shadow Legends RPG", user: "ahmedgemy267@gmail.com", ip: "156.197.80.12", country: "US", fraud: "Clean" as const, time: "2026-05-15 13:10" },
    { id: "clk_2", offer: "Tiktok User Registration", user: "cpamarketinggrip@gmail.com", ip: "41.47.19.88", country: "EG", fraud: "Clean" as const, time: "2026-05-15 13:05" },
    { id: "clk_3", offer: "Monopoly GO! Reach Board 25", user: "guest_9921@tmpmail.com", ip: "185.220.101.5", country: "DE", fraud: "Blocked" as const, time: "2026-05-15 13:01" },
    { id: "clk_4", offer: "NordVPN 2-Year Plan Subscription", user: "speedy_user@yahoo.com", ip: "194.26.29.112", country: "GB", fraud: "Suspicious" as const, time: "2026-05-15 12:48" },
    { id: "clk_5", offer: "Global Consumer Survey 2026", user: "support@smartorise.com", ip: "197.35.40.11", country: "US", fraud: "Clean" as const, time: "2026-05-15 12:30" }
  ],
  queueJobs: [
    { id: "job_1", connection: "redis", queue: "postbacks", exception: "GuzzleHttp\\Exception\\ConnectException: Connection refused", failedAt: "2026-05-14 22:15:00" }
  ],
  systemHealth: {
    database: { status: "Connected", tablesCount: 40 },
    cache: { status: "operational", driver: "file" },
    redis: { status: "not loaded", fallback: "file cache" },
    storage: { status: "write/read OK" },
    queue: { status: "Database queue ready" },
    ssl: { status: "HTTPS active" },
    phpVersion: "8.3.19",
    laravelVersion: "11.51.0",
    serverInfo: "Apache / Next.js Enterprise Engine",
    diskUsed: "12.4 GB / 80 GB (15%)",
    memory: "52 MB / 512 MB (Peak: 52 MB)"
  },
  logs: [
    { id: "log_1", type: "Security" as const, level: "Warning" as const, message: "Multiple failed login attempts from IP 185.220.101.5", user: "guest", ip: "185.220.101.5", date: "2026-05-15 13:02" },
    { id: "log_2", type: "API" as const, level: "Info" as const, message: "BitLabs postback received: 1450 coins credited to usr_3", user: "system", ip: "54.210.12.8", date: "2026-05-15 11:20" },
    { id: "log_3", type: "System" as const, level: "Error" as const, message: "SMTP connection failed: Unable to connect to tls://smtp.gmail.com:587", user: "system", ip: "127.0.0.1", date: "2026-05-14 20:05" }
  ],
  auditLogs: [
    { id: "adt_1", time: "2026-05-15 12:00:15", level: "Info" as const, channel: "ADMIN", message: "Admin approved campaign 'Fintech Wallet Sign up'", ip: "127.0.0.1" },
    { id: "adt_2", time: "2026-05-14 16:22:04", level: "Warning" as const, channel: "ADMIN", message: "Admin suspended publisher app 'RewardsDaily'", ip: "127.0.0.1" },
    { id: "adt_3", time: "2026-05-13 10:11:49", level: "Info" as const, channel: "ADMIN", message: "Payment Gateway 'Binance Pay' credentials updated", ip: "127.0.0.1" }
  ],
  notifications: [
    { id: "notif_1", title: "New Campaign Submitted", category: "Campaigns" as const, message: "Advertiser 'freshl' submitted campaign 'test camp' for approval.", time: "10 minutes ago", isRead: false },
    { id: "notif_2", title: "New Deposit Request", category: "Deposits" as const, message: "Advertiser 'freshl' submitted a deposit of $250 via Bank Transfer.", time: "2 hours ago", isRead: false },
    { id: "notif_3", title: "New Advertiser Registration", category: "Advertisers" as const, message: "Advertiser 'freshl' has registered on the platform.", time: "1 day ago", isRead: false },
    { id: "notif_4", title: "New Publisher Registration", category: "Publishers" as const, message: "Publisher 'Facebook' has registered and is awaiting approval.", time: "2 days ago", isRead: true }
  ],
  contacts: [
    { id: "cnt_1", fromName: "billing department", fromEmail: "billing@alphamedia.io", subject: "Invoice request for April deposit", status: "Replied" as const, date: "2026-05-12", message: "Could you please send us the official VAT invoice for our recent bank wire transfer?" },
    { id: "cnt_2", fromName: "Marcus Vance", fromEmail: "marcus@appstudio.org", subject: "Custom Unity SDK Placement support", status: "New" as const, date: "2026-05-15", message: "We are integrating your Unity Offerwall SDK into our top-grossing game and had a question regarding the reward callback parameters." }
  ],
  tickets: [
    { id: "tkt_1", subject: "where to get smtp host", user: "ahmedgemy267@gmail.com", category: "Technical", priority: "High" as const, status: "Open" as const, assigned: "Admin", date: "2026-05-14" },
    { id: "tkt_2", subject: "Postback signature mismatch on Torox", user: "cpamarketinggrip@gmail.com", category: "API Integration", priority: "High" as const, status: "Open" as const, assigned: "Admin", date: "2026-05-14" },
    { id: "tkt_3", subject: "Withdrawal processing timeline inquiry", user: "support@smartorise.com", category: "Financial", priority: "High" as const, status: "Open" as const, assigned: "Admin", date: "2026-05-15" }
  ],
  subscribers: [
    { id: "sub_1", name: "Alex Turner", email: "alex@leadspire.com", status: "Active" as const, source: "Website Footer", subscribedDate: "2026-03-20" },
    { id: "sub_2", name: "Dmitry Kozlov", email: "dmitry@cpa-pro.net", status: "Active" as const, source: "Publisher Modal", subscribedDate: "2026-04-11" }
  ],
  announcements: [
    { id: "ann_1", title: "Payments Problem Fixed", type: "Warning" as const, audience: "All" as const, status: "Active" as const, start: "Immediate", end: "No end" }
  ],
  settings: {
    general: {
      platform_name: "Smartorise",
      support_email: "support@smartorise.com",
      admin_commission_rate: 20,
      min_withdrawal: 5,
      recaptcha_enabled: false,
      recaptcha_version: "v2",
      recaptcha_site_key: "6Lc_mock_site_key",
      recaptcha_secret_key: "••••••••",
      vpn_detection: true,
      email_verification: true,
      manual_approval: true,
      fraud_detection: true,
      ipqualityscore_api_key: "",
      vpnapi_api_key: "",
      max_login_attempts: 5,
      lockout_duration: 15,
      meta_title: "Smartorise - Premium Offerwall Network",
      meta_description: "Monetize your mobile app and website with high-yielding CPI, CPA and survey campaigns.",
      meta_keywords: "offerwall, monetization, cpa, cpi, surveys, rewarded ads",
      google_analytics_id: "G-SMART990"
    },
    withdrawal: {
      min_withdrawal: 5,
      max_withdrawal: 1000,
      withdrawal_fee_percent: 2.0,
      withdrawal_fee_fixed: 0.25,
      processing_time_days: 1,
      withdrawals_enabled: true,
      manual_approval_required: true,
      methods: [
        { name: "PayPal", type: "Online", enabled: true, is_default: true },
        { name: "Bitcoin (BTC)", type: "Crypto", enabled: true, is_default: false },
        { name: "Litecoin (LTC)", type: "Crypto", enabled: true, is_default: false },
        { name: "Tether USDT (TRC-20)", type: "Crypto", enabled: true, is_default: false },
        { name: "Bank Wire Transfer", type: "Manual", enabled: true, is_default: false }
      ]
    },
    payments: {
      paypal_enabled: true,
      paypal_client_id: "AU_mock_paypal_id_99",
      paypal_client_secret: "••••••••",
      paypal_environment: "sandbox",
      stripe_enabled: true,
      stripe_publishable_key: "pk_test_mock_stripe_99",
      stripe_secret_key: "••••••••",
      crypto_enabled: true,
      usdt_trc20_address: "T9yD14Nj9j7xAB4dbGeiX9hEAadAk29vm7",
      btc_address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      eth_address: "0x71C...8976Fb",
      confirmations: 3
    },
    sdk: {
      sdk_min_android: "2.4.0",
      sdk_min_ios: "2.1.0",
      sdk_min_unity: "1.9.5",
      sdk_offer_cache_minutes: 30,
      sdk_reward_multiplier: 1.0,
      sdk_max_offers_per_request: 50,
      sdk_tracking_enabled: true,
      sdk_fraud_check: true,
      sdk_signature_required: true,
      sdk_force_update: false,
      sdk_sandbox_mode: true
    },
    api: {
      api_rate_limit: 120,
      api_rate_limit_window: 1,
      api_key_expiry_days: 365,
      api_timeout_seconds: 30,
      api_max_payload_mb: 10,
      api_cors_origins: "*",
      api_require_https: true,
      api_log_requests: true
    },
    maintenance: {
      maintenance_mode: false,
      maintenance_message: "We are currently performing scheduled maintenance. Please check back shortly!",
      maintenance_allowed_ips: "127.0.0.1, 192.168.1.1, 10.0.0.1",
      sandbox_mode_global: true,
      sandbox_test_publisher_id: "pub_7",
      sandbox_test_conversion_value: 5.00
    },
    localization: {
      default_locale: "en_US",
      default_timezone: "UTC",
      default_currency: "USD",
      currency_symbol: "$",
      date_format: "Y-m-d",
      datetime_format: "Y-m-d H:i:s",
      number_format_decimal: ".",
      number_format_thousands: ","
    },
    cron: [
      { id: "cron_1", job: "Offer Sync", command: "offers:sync", schedule: "*/30 * * * *", lastRun: "2026-05-15 11:59:24", status: "Active" },
      { id: "cron_2", job: "Postback Retry Engine", command: "callbacks:retry", schedule: "*/5 * * * *", lastRun: "2026-05-15 12:05:00", status: "Active" },
      { id: "cron_3", job: "Fraud Scanner Daily", command: "fraud:aggregate", schedule: "0 0 * * *", lastRun: "2026-05-15 00:00:00", status: "Active" }
    ],
    docs: {
      platform_name: "Smartorise",
      site_name: "Smartorise Monetization",
      support_email: "support@smartorise.com",
      api_base_url: "https://prize.infy.click/api/v1",
      sdk_version: "v2.5.0",
      sdk_class_name: "SmartoriseOfferwall",
      android_package_name: "com.smartorise.sdk",
      ios_bundle_id: "com.smartorise.sdk.ios",
      offerwall_endpoint: "/offerwall/load",
      doc_hero_title: "Developer Integration & Offerwall API Hub",
      doc_hero_badge_prefix: "v2.5 Release",
      doc_hero_desc: "Integrate our high-converting mobile Offerwall SDK into your Android, iOS, or Unity game in under 15 minutes.",
      doc_hero_btn_primary: "Get Started",
      doc_hero_btn_secondary: "View SDK Github",
      doc_quickstart_title: "5-Minute Quickstart",
      doc_quickstart_desc: "Initialize the SDK and show your first offerwall with just 3 lines of code.",
      doc_s2s_title: "Server-to-Server (S2S) Callback Specification"
    },
    pages: [
      { id: "pg_1", title: "Terms of Service", slug: "terms-of-service", status: "Published", footer: true },
      { id: "pg_2", title: "Privacy Policy", slug: "privacy-policy", status: "Published", footer: true },
      { id: "pg_3", title: "Publisher Agreement", slug: "publisher-agreement", status: "Published", footer: false }
    ],
    roles: [
      { id: "rol_1", role: "Super Admin", slug: "super-admin", superAdmin: true, permissionsCount: 42, usersCount: 1 },
      { id: "rol_2", role: "Financial Manager", slug: "financial-manager", superAdmin: false, permissionsCount: 12, usersCount: 0 },
      { id: "rol_3", role: "Support Staff", slug: "support-staff", superAdmin: false, permissionsCount: 8, usersCount: 0 },
      { id: "rol_4", role: "Offer Moderator", slug: "offer-moderator", superAdmin: false, permissionsCount: 6, usersCount: 0 }
    ],
    staff: [
      { id: "stf_1", user: "Admin", email: "admin@admin.com", role: "Admin", status: "Active" as const }
    ]
  }
};
