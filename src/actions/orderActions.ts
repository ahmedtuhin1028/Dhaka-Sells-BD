'use server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

export async function createOrder(data: any) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    throw new Error('You must be logged in to place an order.');
  }

  // 1. Transaction to guarantee inventory is accurately deducted
  try {
    const result = await prisma.$transaction(async (tx) => {
      let total = 0;

      // Validate Stock & Calculate Total on SERVER SIDE (Security against cart tampering)
      for (const item of data.items) {
        const product = await tx.product.findUnique({ where: { id: item.productId }});
        if (!product || product.stock < item.quantity) {
          throw new Error(`Product ${item.name} is out of stock.`);
        }
        total += (product.discountPrice || product.price) * item.quantity;
        
        // Deduct inventory
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      const deliveryCharge = data.division === 'Dhaka' ? 60 : 120;
      const grandTotal = total + deliveryCharge;

      // Create the order
      const order = await tx.order.create({
        data: {
          orderNumber: `DSBD-${Math.floor(100000 + Math.random() * 900000)}`, // Generate Secure ID
          userId: session.user.id,
          paymentMethod: data.paymentMethod,
          subtotal: total,
          deliveryCharge,
          total: grandTotal,
          shippingAddress: data.address,
          items: {
            create: data.items.map((item: any) => ({
              productId: item.productId,
              productName: item.name,
              price: item.price,
              quantity: item.quantity
            }))
          }
        }
      });

      return order;
    });

    revalidatePath('/admin/orders'); // Update admin panel in real-time
    return { success: true, orderId: result.orderNumber };

  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
