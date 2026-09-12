import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, PackageSearch } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-dhaka-navy text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold text-dhaka-cyan tracking-wider">DHAKA SELLS BD</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Panel v1.0</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarLink href="/admin" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          <SidebarLink href="/admin/orders" icon={<ShoppingBag size={20}/>} label="Orders" />
          <SidebarLink href="/admin/products" icon={<PackageSearch size={20}/>} label="Products" />
          <SidebarLink href="/admin/customers" icon={<Users size={20}/>} label="Customers" />
          <SidebarLink href="/admin/settings" icon={<Settings size={20}/>} label="Settings" />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors w-full p-2">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <Link href={href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors">
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
