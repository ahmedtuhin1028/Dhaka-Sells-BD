import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ui/ProductCard';
import { Zap, ShieldCheck, Truck, Clock } from 'lucide-react';

// Server Component fetching DB directly
export default async function HomePage() {
  // Fetch Featured Products
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true, isActive: true },
    take: 8,
    include: { images: true }
  });

  // Fetch Categories
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
    take: 6
  });

  return (
    <div className="min-h-screen bg-dhaka-light dark:bg-dhaka-dark">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center bg-dhaka-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dhaka-navy to-transparent z-10" />
        {/* Placeholder for Hero Banner Image - Configure in Admin later */}
        <Image 
          src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2070&auto=format&fit=crop" 
          alt="Premium Gadgets" 
          fill 
          priority
          className="object-cover opacity-50"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Next-Gen Tech, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-dhaka-cyan to-dhaka-blue">
                Delivered in BD
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Discover premium smartphones, smartwatches, and audiophile gear with official warranty.
            </p>
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-dhaka-blue rounded-full hover:bg-dhaka-cyan transition-all duration-300 shadow-[0_0_20px_rgba(28,78,216,0.5)]">
              Shop Now (অর্ডার করুন)
            </Link>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <Feature icon={<Truck />} title="Fast Delivery" subtitle="All over Bangladesh" />
          <Feature icon={<ShieldCheck />} title="Genuine Products" subtitle="100% Brand Warranty" />
          <Feature icon={<Zap />} title="Flash Sales" subtitle="Daily exciting deals" />
          <Feature icon={<Clock />} title="24/7 Support" subtitle="Always here for you" />
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
          <Link href="/categories" className="text-dhaka-blue hover:underline font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.slug}`} className="group flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-glass transition-all border border-gray-100 dark:border-gray-700">
              <div className="w-16 h-16 relative mb-4 rounded-full bg-gray-50 dark:bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                {/* Fallback to initials if no image */}
                {cat.image ? (
                  <Image src={cat.image} alt={cat.name} fill className="object-contain p-2" />
                ) : (
                  <span className="font-bold text-gray-400">{cat.name.charAt(0)}</span>
                )}
              </div>
              <span className="text-sm font-medium text-center dark:text-gray-200">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Gadgets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                discountPrice: product.discountPrice || undefined,
                image: product.images.find(i => i.isThumb)?.url || product.images[0]?.url || '/placeholder.png',
                stock: product.stock
              }} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Feature({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-dhaka-blue dark:text-dhaka-cyan p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
