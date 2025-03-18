"use client"

import type React from "react"

import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  BellIcon,
  BookOpen,
  CandlestickChart,
  ChevronLeft,
  Cog,
  CreditCard,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  PieChart,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeProvider } from "@/components/theme-provider"
import { useTheme } from "next-themes"
import KeyboardShortcuts from "@/components/keyboard-shortcuts"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const { setTheme, theme } = useTheme()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Gestiamo le scorciatoie da tastiera per la navigazione
  // Aggiungeremo questo come una funzione globale con useEffect nella versione completa

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: true,
      shortcut: "Alt+D",
    },
    {
      title: "Trading",
      icon: <CandlestickChart className="h-5 w-5" />,
      active: false,
      shortcut: "Alt+G",
    },
    {
      title: "Analisi",
      icon: <BarChart3 className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Portfolio",
      icon: <PieChart className="h-5 w-5" />,
      active: false,
      shortcut: "Alt+P",
    },
    {
      title: "Strategie",
      icon: <BookOpen className="h-5 w-5" />,
      active: false,
      shortcut: "Alt+T",
    },
    {
      title: "Mercati",
      icon: <Globe className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Transazioni",
      icon: <CreditCard className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Messaggi",
      icon: <MessageSquare className="h-5 w-5" />,
      active: false,
    },
    {
      title: "Impostazioni",
      icon: <Settings className="h-5 w-5" />,
      active: false,
    },
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 transform bg-card shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
            sidebarOpen || isDesktop ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center">
              <CandlestickChart className="h-6 w-6 text-primary" />
              <span className="ml-2 text-xl font-bold">TradingSuite AI</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          <div className="space-y-1 p-2">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  item.active ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50",
                )}
                title={item.shortcut ? `${item.title} (${item.shortcut})` : item.title}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
                {item.shortcut && (
                  <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded hidden md:inline-block">
                    {item.shortcut}
                  </kbd>
                )}
              </Button>
            ))}
          </div>
          <div className="absolute bottom-0 w-full border-t p-4">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">Trader Pro</p>
                <p className="text-xs text-muted-foreground">Piano Premium</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="flex h-16 items-center justify-between border-b px-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden mr-2">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Cerca..." className="pl-8 w-full" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <KeyboardShortcuts />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title="Cambia tema (Alt+T)"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Cog className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Il mio account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profilo</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Impostazioni</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
