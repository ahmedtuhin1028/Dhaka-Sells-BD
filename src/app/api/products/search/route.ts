import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const sort = searchParams.get('sort') || 'newest';
  
  // Build dynamic Prisma query object
  const query: any = {
    where: {
      isActive: true,
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { tags: { has: q } } // Assuming you add tags to Prisma model as String[]
      ]
    },
    include: { images: true }
  };

  if (category) {
    query.where.category = { slug: category };
  }

  if (minPrice || maxPrice) {
    query.where.price = {
      ...(minPrice && { gte: parseFloat(minPrice) }),
      ...(maxPrice && { lte: parseFloat(maxPrice) }),
    };
  }

  // Sorting
  if (sort === 'price_asc') query.orderBy = { price: 'asc' };
  else if (sort === 'price_desc') query.orderBy = { price: 'desc' };
  else query.orderBy = { createdAt: 'desc' }; // 'newest'

  try {
    const products = await prisma.product.findMany(query);
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database Error' }, { status: 500 });
  }
}
