'use client';
import { useState } from 'react';
import { Search, Package, Truck, CheckCircle } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Call server action / api to fetch order status based on orderId & phone
    // Mocking response for UI demonstration
    setTimeout(() => {
      setStatus('SHIPPED'); 
      setLoading(false);
    }, 1000);
  };

  const steps = [
    { key: 'PENDING', label: 'Order Placed', icon: <Package /> },
    { key: 'PROCESSING', label: 'Processing', icon: <Package /> },
    { key: 'SHIPPED', label: 'Shipped', icon: <Truck /> },
    { key: 'DELIVERED', label: 'Delivered', icon: <CheckCircle /> },
  ];

  const getStepIndex = (st: string) => steps.findIndex(s => s.key === st);
  const currentStep = status ? getStepIndex(status) : -1;

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 min-h-[60vh]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
        <p className="text-gray-500">Enter your order ID and phone number to track delivery status.</p>
      </div>

      <form onSubmit={handleTrack} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-glass flex flex-col md:flex-row gap-4 mb-12">
        <input 
          type="text" 
          placeholder="Order ID (e.g., DSBD-10023)" 
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          className="flex-1 input-field"
        />
        <input 
          type="tel" 
          placeholder="Phone Number (+880)" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="flex-1 input-field"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-dhaka-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-dhaka-blue transition flex items-center justify-center disabled:opacity-50"
        >
          {loading ? 'Searching...' : <><Search size={18} className="mr-2" /> Track</>}
        </button>
      </form>

      {status && (
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="relative flex justify-between">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0" />
            
            {steps.map((step, index) => {
              const isCompleted = index <= currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    isCompleted ? 'bg-dhaka-cyan text-white shadow-lg shadow-cyan-500/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-cyan-500/20' : ''}`}>
                    {step.icon}
                  </div>
                  <span className={`mt-3 text-sm font-bold ${isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
