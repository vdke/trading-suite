"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, FileText, RefreshCw, Database, Brain, Settings, User, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export default function MainNavigation() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // Controlla se il dispositivo è mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Test",
      href: "/test",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Ripasso",
      href: "/ripasso",
      icon: <RefreshCw className="h-5 w-5" />,
    },
    {
      title: "Database",
      href: "/database",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "AI",
      href: "/ai",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      title: "Impostazioni",
      href: "/impostazioni",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  // Componente per il menu item
  const NavItem = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href

    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
          isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
        )}
      >
        {item.icon}
        <span>{item.title}</span>
      </Link>
    )
  }

  // Menu per dispositivi desktop
  const DesktopNav = () => (
    <div className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}

      <div className="ml-4 border-l pl-4">
        <Link href="/profilo">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profilo" />
            <AvatarFallback>UT</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  )

  // Menu per dispositivi mobili
  const MobileNav = () => (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px] sm:w-[300px]">
          <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <SheetClose key={item.title} asChild>
                  <NavItem item={item} />
                </SheetClose>
              ))}

              <SheetClose asChild>
                <Link
                  href="/profilo"
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                    pathname === "/profilo" ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                  )}
                >
                  <User className="h-5 w-5" />
                  <span>Profilo</span>
                </Link>
              </SheetClose>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg hidden sm:inline-block">TradingSuite AI</span>
          </Link>
        </div>

        <DesktopNav />

        {/* Avatar per mobile (visibile solo su mobile) */}
        <div className="md:hidden">
          <Link href="/profilo">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profilo" />
              <AvatarFallback>UT</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  )
}
