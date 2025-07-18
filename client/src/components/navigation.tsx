import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: "fas fa-home", label: "الرئيسية" },
    { href: "/favorites", icon: "fas fa-star", label: "المفضلة" },
    { href: "/map", icon: "fas fa-map", label: "الخريطة" },
    { href: "/settings", icon: "fas fa-cog", label: "الإعدادات" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "nav-item",
                location === item.href && "active"
              )}
            >
              <i className={`${item.icon} text-xl`}></i>
              <span className="text-xs mt-1">{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
