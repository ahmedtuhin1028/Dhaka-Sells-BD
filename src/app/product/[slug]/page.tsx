import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/client/AddToCartButton'; // Client Component
import ImageGallery from '@/components/client/ImageGallery';       // Client Component
import { BadgeCheck } from 'lucide-react';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: true,
      variants: true,
      category: true,
    }
  });

  if (!product) return notFound();

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left: Image Gallery */}
        <ImageGallery images={product.images} />

        {/* Right: Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm font-bold text-dhaka-blue uppercase tracking-wider">
              {product.category.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 flex items-center space-x-2">
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span className="flex items-center text-green-600 font-medium">
                <BadgeCheck size={16} className="mr-1" /> Authentic
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-4 border-y border-gray-100 dark:border-gray-800 py-4">
            <span className="text-4xl font-bold text-dhaka-blue dark:text-dhaka-cyan">
              ৳ {product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-xl text-gray-400 line-through">
                ৳ {product.price}
              </span>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.shortDesc}
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 dark:text-white">Availability:</span>
              <span className={`font-bold ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                {isOutOfStock ? 'স্টক শেষ (Out of Stock)' : `স্টকে আছে (${product.stock} left)`}
              </span>
            </div>

            {/* Client Component handling state (Quantity, Variants) */}
            <AddToCartButton 
              product={{
                id: product.id,
                name: product.name,
                price: product.discountPrice || product.price,
                stock: product.stock,
                image: product.images.find(i => i.isThumb)?.url || product.images[0]?.url,
                variants: product.variants
              }} 
            />
          </div>
        </div>
      </div>

      {/* Full Description / Specifications Tabs */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-10">
        <h3 className="text-2xl font-bold mb-6">Product Description</h3>
        <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: product.fullDesc }} />
      </div>
    </div>
  );
}
