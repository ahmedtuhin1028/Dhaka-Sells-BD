'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface ProductProps {
  product: {
    id: string;
    slug: string;
    name: string;
    price: number;
    discountPrice?: number;
    image: string;
    stock: number;
  }
}

export default function ProductCard({ product }: ProductProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock,
    });
  };

  return (
    <div className="group relative bg-white dark:bg-dhaka-navy rounded-2xl p-4 shadow-sm hover:shadow-glass transition-all duration-300 border border-gray-100 dark:border-gray-800">
      <Link href={`/product/${product.slug}`}>
        <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.discountPrice && (
            <span className="absolute top-2 left-2 bg-dhaka-cyan text-white text-xs font-bold px-2 py-1 rounded-md">
              Sale
            </span>
          )}
        </div>
        
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-dhaka-blue dark:text-dhaka-cyan">
              ৳ {product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-400 line-through">
                ৳ {product.price}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button 
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className="mt-4 w-full flex items-center justify-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-2.5 rounded-xl font-medium hover:bg-dhaka-blue dark:hover:bg-dhaka-cyan hover:text-white transition-colors disabled:opacity-50"
      >
        <ShoppingCart size={18} />
        <span className="font-bengali">
          {product.stock > 0 ? "কার্টে যোগ করুন" : "স্টক শেষ"}
        </span>
      </button>
    </div>
  );
}
