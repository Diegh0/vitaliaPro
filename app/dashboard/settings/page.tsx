"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { teamMembers } from "@/data/team";
import { User, Building2, Bell, Shield, Moon, Sun, Monitor, Mail, Phone, Globe, Save, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "clinic", label: "Clinic", icon: Building2 },
  { id: "team", label: "Team", icon: Star },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-10 h-5.5 rounded-full transition-all duration-200 relative shrink-0",
        checked ? "bg-primary" : "bg-border"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200",
          checked ? "left-5.5" : "left-0.5"
        )}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [notifications, setNotifications] = useState({
    appointments: true,
    patientUpdates: true,
    billing: false,
    weeklyReport: true,
    smsAlerts: false,
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage your account, clinic and preferences" />

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar tabs */}
        <div className="lg:w-48 shrink-0">
          <nav className="space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        <div className="flex-1 min-w-0 space-y-4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Profile */}
            {activeTab === "profile" && (
              <div className="space-y-4">
                <ChartCard title="Profile Information">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Avatar name="Centro Vitalia" size="xl" />
                      <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs hover:bg-primary/90 transition-colors">
                        +
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Centro Vitalia</p>
                      <p className="text-sm text-muted-foreground">admin@vitaliapro.com</p>
                      <p className="text-xs text-primary mt-1 cursor-pointer hover:underline">Change avatar</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="First Name" defaultValue="Carlos" />
                    <Input label="Last Name" defaultValue="Ruiz" />
                    <Input label="Email" leftIcon={<Mail size={13} />} defaultValue="admin@vitaliapro.com" type="email" />
                    <Input label="Phone" leftIcon={<Phone size={13} />} defaultValue="+34 612 345 678" type="tel" />
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button icon={<Save size={14} />}>Save Changes</Button>
                  </div>
                </ChartCard>

                <ChartCard title="Appearance">
                  <p className="text-sm text-muted-foreground mb-4">Choose how Vitalia Pro looks for you.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setTheme(id as "light" | "dark" | "system")}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all",
                          theme === id ? "border-primary bg-primary/6" : "border-border hover:border-border/80 hover:bg-secondary/40"
                        )}
                      >
                        <Icon size={20} className={theme === id ? "text-primary" : "text-muted-foreground"} />
                        <span className={cn("text-xs font-medium", theme === id ? "text-primary" : "text-muted-foreground")}>
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                </ChartCard>
              </div>
            )}

            {/* Clinic */}
            {activeTab === "clinic" && (
              <ChartCard title="Clinic Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Clinic Name" defaultValue="Centro Vitalia Pro" className="sm:col-span-2" />
                  <Input label="Address" defaultValue="Calle Mayor 42, Madrid" className="sm:col-span-2" />
                  <Input label="City" defaultValue="Madrid" />
                  <Input label="Postal Code" defaultValue="28001" />
                  <Input label="Phone" leftIcon={<Phone size={13} />} defaultValue="+34 91 234 5678" />
                  <Input label="Website" leftIcon={<Globe size={13} />} defaultValue="vitaliapro.com" />
                  <Input label="Tax ID / NIF" defaultValue="B12345678" />
                  <Input label="Specialty" defaultValue="Physiotherapy & Sports Medicine" />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button icon={<Save size={14} />}>Save Clinic Info</Button>
                </div>
              </ChartCard>
            )}

            {/* Team */}
            {activeTab === "team" && (
              <ChartCard title="Team Members" description="Manage professionals and staff">
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-4 p-3 bg-secondary/40 rounded-xl">
                      <Avatar name={member.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role} · {member.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 shrink-0">
                        <Star size={12} className="fill-amber-400" />
                        <span className="text-xs font-semibold text-foreground">{member.rating}</span>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full">+ Invite Team Member</Button>
                </div>
              </ChartCard>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <ChartCard title="Notification Preferences">
                <div className="space-y-4">
                  {[
                    { key: "appointments", label: "Appointment Reminders", desc: "Get notified 30 minutes before each appointment" },
                    { key: "patientUpdates", label: "Patient Updates", desc: "Notifications for treatment milestones and alerts" },
                    { key: "billing", label: "Billing Alerts", desc: "Invoice status and payment notifications" },
                    { key: "weeklyReport", label: "Weekly Report", desc: "Summary of clinic performance every Monday" },
                    { key: "smsAlerts", label: "SMS Alerts", desc: "Critical alerts sent via SMS" },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between gap-4 py-3 border-b border-border/40 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                      </div>
                      <Toggle
                        checked={notifications[key as keyof typeof notifications]}
                        onChange={(v) => setNotifications((prev) => ({ ...prev, [key]: v }))}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button icon={<Save size={14} />}>Save Preferences</Button>
                </div>
              </ChartCard>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="space-y-4">
                <ChartCard title="Change Password">
                  <div className="space-y-4 max-w-sm">
                    <Input label="Current Password" type="password" placeholder="••••••••" />
                    <Input label="New Password" type="password" placeholder="••••••••" />
                    <Input label="Confirm New Password" type="password" placeholder="••••••••" />
                    <Button>Update Password</Button>
                  </div>
                </ChartCard>

                <ChartCard title="Two-Factor Authentication">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Authenticator App</p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                        Use Google Authenticator or Authy to add an extra layer of security to your account.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">Enabled</span>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </ChartCard>

                <ChartCard title="Active Sessions">
                  <div className="space-y-3">
                    {[
                      { device: "MacBook Pro", location: "Madrid, Spain", current: true, time: "Now" },
                      { device: "iPhone 15", location: "Madrid, Spain", current: false, time: "2h ago" },
                    ].map(({ device, location, current, time }) => (
                      <div key={device} className="flex items-center justify-between gap-4 p-3 bg-secondary/40 rounded-xl">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-foreground">{device}</p>
                            {current && (
                              <span className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded-md font-medium">Current</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{location} · {time}</p>
                        </div>
                        {!current && (
                          <Button variant="danger" size="sm">Revoke</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </ChartCard>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
