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
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-purple-200 bottom-nav-shadow">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "nav-item transition-all duration-300 hover:scale-105 relative",
                location === item.href && "active"
              )}
            >
              <div className={cn(
                "p-3 rounded-full transition-all duration-300 relative",
                location === item.href 
                  ? "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg" 
                  : "text-gray-600 hover:bg-purple-50"
              )}>
                <i className={`${item.icon} text-lg`}></i>
                {location === item.href && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className={cn(
                "text-xs mt-1 font-medium transition-colors duration-300",
                location === item.href ? "text-purple-600" : "text-gray-600"
              )}>
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
