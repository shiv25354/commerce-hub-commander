
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingBasket, LayoutDashboard, Package, ShoppingCart, Users, Tag, Percent, BarChart2, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const roleAccessMap: Record<string, UserRole[]> = {
  '/': ['admin', 'vendor', 'delivery'],
  '/products': ['admin', 'vendor'],
  '/orders': ['admin', 'vendor', 'delivery'],
  '/users': ['admin'],
  '/categories': ['admin', 'vendor'],
  '/offers': ['admin', 'vendor'],
  '/reports': ['admin', 'vendor'],
  '/settings': ['admin'],
};

const NavItem = ({ icon: Icon, label, href, active, collapsed }: NavItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          collapsed ? "justify-center px-2" : "px-4",
          active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  const userRole = user?.role || 'admin';
  
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Package, label: "Products", href: "/products" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Tag, label: "Categories", href: "/categories" },
    { icon: Percent, label: "Offers", href: "/offers" },
    { icon: BarChart2, label: "Reports", href: "/reports" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];
  
  // Filter sidebar items based on user role
  const filteredItems = sidebarItems.filter(item => 
    roleAccessMap[item.href]?.includes(userRole)
  );

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-sidebar border-r transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className={cn(
        "flex h-16 items-center border-b px-4",
        collapsed ? "justify-center" : "gap-2"
      )}>
        <ShoppingBasket className="h-6 w-6 text-sidebar-foreground" />
        {!collapsed && <span className="font-bold text-sidebar-foreground">GroceryCommerce</span>}
      </div>
      
      <ScrollArea className="flex-1 dashboard-scrollbar">
        <div className="space-y-1 p-2">
          {filteredItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={location.pathname === item.href}
              collapsed={collapsed}
            />
          ))}
        </div>
      </ScrollArea>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-4 top-20 h-8 w-8 rounded-full border bg-background shadow-md"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
