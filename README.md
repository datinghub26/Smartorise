# Smartorise — Enterprise Offerwall & Rewards Monetization Platform

A full-stack, enterprise-grade **Get-Paid-To (GPT) Offerwall & Rewards Platform** built with **Next.js 14, React, TypeScript, and Tailwind CSS**. Features a sleek dark glassmorphism design, a public user-facing earning portal, and a complete 38-page administration maintenance suite.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** / **pnpm**

### 2. Installation & Running Locally
```bash
# Clone repository
git clone https://github.com/datinghub26/Smartorise.git
cd Smartorise

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit the website at: **[http://localhost:3000](http://localhost:3000)**

## 🧭 Platform Architecture

### 1. Public User Rewards Portal (`/`)
- **Offerwalls Hub:** Direct integration with BitLabs, Torox, CPALead, AdGate Media, Wannads, Lootably, AdGem, and OfferToro.
- **Task Simulator:** Real-time completion modal that simulates S2S (Server-to-Server) postbacks, automatically crediting user balances and logging transactions in the admin panel.
- **Cashout Shop:** Users can redeem accumulated coins for PayPal Cash, Litecoin (LTC), Bitcoin (BTC), Tether USDT (TRC-20), Amazon Gift Cards, and Steam Wallet codes.
- **Daily Leaderboard:** Real-time top earners race with bonus rewards for #1, #2, and #3 podium positions.
- **Affiliate & Referral System:** 10% lifetime referral commission engine with copyable referral links.

### 2. Admin Maintenance Suite (`/admin`)
Full control across **38 interactive modules** categorized into 6 core management groups:

#### 📊 MANAGEMENT
* `/admin/dashboard`: Executive KPI control center (Revenue, Conversions, Users, Review Queue, Fraud rate).
* `/admin/users`: Master directory with role assignment, status transitions (Active, Pending, Suspended, Banned), and manual balance adjustment modal.
* `/admin/publishers`: Publisher partner verification, linked apps count & commission rate audits.
* `/admin/advertisers`: Direct advertiser accounts, lifetime spending ledger & active offer caps.
* `/admin/offers`: Global offer repository with filtering across Categories (CPI, CPA, Survey) and Providers.
* `/admin/campaign-approvals`: Direct advertiser campaign review queue with **Bulk Approve**, **Bulk Reject**, and compliance notes.
* `/admin/conversions`: Real-time transaction audit ledger with raw payload inspection.
* `/admin/providers`: CPA ad network configurations, S2S postback hooks & revenue share multipliers.
* `/admin/apps`: Publisher SDK app keys, secret generation & platform monitoring (Android, iOS, Web, Unity).

#### 💳 FINANCIAL
* `/admin/financial`: High-level financial reporting, gross margins & unpaid publisher liabilities.
* `/admin/financial/withdrawals`: Payout approval pipeline with multi-select bulk processing.
* `/admin/deposits`: Advertiser pre-funding transaction history and bank wire approval.
* `/admin/payment-gateways`: Gateway configurations (Stripe, PayPal, Binance Pay, Bank Transfer) with one-click **Go Live / Sandbox** toggle.

#### 🛡️ MONITORING
* `/admin/analytics`: Geographical traffic yield breakdown and top converting campaigns.
* `/admin/fraud`: Automated security alerts (VPN/proxy detection, device spoofing, multi-accounts) with live resolution.
* `/admin/callbacks`: Outbound S2S postback delivery status (HTTP 200, 500), retries & resend button.
* `/admin/clicks`: High-velocity click stream logger with real-time fraud verdicts.
* `/admin/queue`: Background job queue monitor (failed jobs, Retry All, Flush All).
* `/admin/health`: Infrastructure runtime diagnostics (Database 40 tables, PHP 8.3, Laravel 11.51, disk and memory).
* `/admin/logs`: Centralized application log cleaner with retention period threshold.
* `/admin/audit-logs`: Comprehensive security action audit trail.

#### 💬 COMMUNICATION
* `/admin/notifications`: Central alert drawer with category filters and Mark All Read.
* `/admin/contacts`: Public contact form submissions and reply manager.
* `/admin/tickets`: Helpdesk ticket tracker with priority SLAs (Urgent, High, Medium, Low).
* `/admin/newsletter`: Subscriber email lists with bulk deactivation and deletion.
* `/admin/announcements`: Platform broadcast notice banners with audience targeting.

#### ⚙️ SETTINGS
* `/admin/settings`: Global branding, anti-fraud shields, reCAPTCHA keys & SEO meta tags.
* `/admin/settings/withdrawal`: Global cashout thresholds, fixed/percent fees & custom payout rails.
* `/admin/settings/payments`: API credentials for Stripe, PayPal, USDT, and Bitcoin wallets.
* `/admin/settings/sdk`: Client SDK version minimums, offer cache duration & fraud checks.
* `/admin/settings/api`: REST API throttling rate limits, CORS whitelist & timeouts.
* `/admin/settings/maintenance`: Site maintenance lockdown mode and developer IP whitelist.
* `/admin/settings/localization`: Timezones, currencies, symbol ($) and number formatting.
* `/admin/settings/cron`: Scheduled tasks with instant **Run Now** triggers.
* `/admin/documentation`: Developer documentation and SDK integration configurator.
* `/admin/pages`: Static CMS page manager (Terms of Service, Privacy Policy).

#### 🔒 SYSTEM
* `/admin/roles`: Role-Based Access Control (RBAC) permissions matrix.
* `/admin/staff`: Administrative staff user accounts and permissions.

---

## 🎨 Design System & Customization

The project uses a modern glassmorphic dark palette configured in `src/app/globals.css` and `tailwind.config.ts`:

| Token | Value | Purpose |
| :--- | :--- | :--- |
| **Background Body** | `#05080F` | Deep dark aesthetic |
| **Card Surface** | `rgba(11, 17, 32, 0.75)` | Translucent glass panel with `backdrop-blur-xl` |
| **Borders** | `rgba(255, 255, 255, 0.08)` | Subtle glass border |
| **Primary Gradient** | `#3B82F6` to `#9333EA` | Blue-to-purple CTA buttons and accents |
| **Text Primary** | `#F8FAFC` | High-contrast headers |
| **Text Secondary** | `#94A3B8` | Muted labels |
| **Success/Reward** | `#10B981` | Coins, earnings & active badges |

---

## 📦 Deployment

The application is built on standard Next.js and can be deployed with one click to **Vercel**, **Railway**, **Render**, or any Ubuntu VPS running **Docker** or **Node.js**:

```bash
# Production Build
npm run build

# Start Production Server
npm start
```
