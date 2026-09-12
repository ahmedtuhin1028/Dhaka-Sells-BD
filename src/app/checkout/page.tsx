'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';

const DIVISIONS = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna", "Barisal", "Rangpur", "Mymensingh"];

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [division, setDivision] = useState('Dhaka');
  const [paymentMethod, setPaymentMethod] = useState('COD');

  // Dynamic Delivery Logic
  const deliveryCharge = division === 'Dhaka' ? 60 : 120; 
  const subTotal = getTotal();
  const grandTotal = subTotal + deliveryCharge;

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Submit to Server Action / API Route
    // 2. If bKash -> Redirect to bKash PGW
    // 3. If COD -> Redirect to Success Page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form Section */}
      <form onSubmit={handleOrderSubmit} className="lg:col-span-8 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" required className="input-field" />
            <input type="tel" placeholder="Phone (+880)" required className="input-field" />
            
            <select 
              value={division} 
              onChange={(e) => setDivision(e.target.value)}
              className="input-field"
            >
              {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            
            <input type="text" placeholder="District" required className="input-field" />
            <textarea placeholder="Full Address (House, Road, Area)" required className="input-field md:col-span-2" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <div className="space-y-3">
            {['COD', 'BKASH', 'NAGAD', 'SSLCOMMERZ'].map((method) => (
              <label key={method} className="flex items-center space-x-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                  className="w-5 h-5 text-dhaka-blue"
                />
                <span className="font-medium">{method === 'COD' ? 'Cash on Delivery' : method}</span>
              </label>
            ))}
          </div>
        </div>
      </form>

      {/* Order Summary */}
      <div className="lg:col-span-4">
        <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 border-b pb-4 mb-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>৳ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>৳ {subTotal}</span></div>
            <div className="flex justify-between"><span>Delivery (Outside Dhaka = ৳120)</span><span>৳ {deliveryCharge}</span></div>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
            <span>Total</span>
            <span className="text-dhaka-blue">৳ {grandTotal}</span>
          </div>
          
          <button 
            onClick={handleOrderSubmit}
            className="w-full mt-6 bg-dhaka-navy text-white py-3 rounded-xl font-bold hover:bg-dhaka-blue transition-colors shadow-lg shadow-blue-500/30"
          >
            অর্ডার করুন (Place Order)
          </button>
        </div>
      </div>
    </div>
  );
}
