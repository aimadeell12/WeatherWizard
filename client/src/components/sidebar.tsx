import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", icon: "fas fa-home", label: "الصفحة الرئيسية" },
    { href: "/favorites", icon: "fas fa-star", label: "المدن المفضلة" },
    { href: "/settings", icon: "fas fa-cog", label: "الإعدادات" },
  ];

  const policyItems = [
    { href: "/privacy-policy", icon: "fas fa-shield-alt", label: "سياسة الخصوصية" },
    { href: "/terms-of-use", icon: "fas fa-file-contract", label: "سياسة الاستخدام" },
    { href: "/terms-conditions", icon: "fas fa-gavel", label: "الشروط والأحكام" },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-gray-200">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">القائمة</h2>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <i className={`${item.icon} ml-3`}></i>
                  {item.label}
                </a>
              </Link>
            ))}
            
            <hr className="my-4" />
            
            {policyItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className="menu-item"
                  onClick={() => setIsOpen(false)}
                >
                  <i className={`${item.icon} ml-3`}></i>
                  {item.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
