'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationWidget from '@/components/NotificationWidget';

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  const plans = {
    starter: {
      name: 'Starter',
      monthly: 99,
      yearly: 990,
      features: ['Basic Analytics', 'Email Support', '5 Projects', '10GB Storage']
    },
    professional: {
      name: 'Professional',
      monthly: 299,
      yearly: 2990,
      features: ['Advanced Analytics', 'Priority Support', '25 Projects', '100GB Storage', 'API Access']
    },
    enterprise: {
      name: 'Enterprise',
      monthly: 599,
      yearly: 5990,
      features: ['Full Analytics Suite', '24/7 Support', 'Unlimited Projects', '1TB Storage', 'Custom Integrations', 'Dedicated Manager']
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
       addNotification('success', 'Payment Successful', 'Payment successful!', 3000);

      // Redirect to success page or dashboard
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);

    } catch (error) {
      console.log(error)
      addNotification('error', 'Payment Failed', 'Payment failed. Please try again.', 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  const currentPlan = plans[selectedPlan as keyof typeof plans];
  const price = billingCycle === 'monthly' ? currentPlan.monthly : currentPlan.yearly;
  const savings = billingCycle === 'yearly' ? (currentPlan.monthly * 12 - currentPlan.yearly) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <NotificationWidget notifications={notifications} onRemove={removeNotification} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-4">Complete Your Purchase</h1>
            <p className="text-xl text-gray-700">
              You&apos;re just one step away from accessing Alpha-analytics
            </p>
          </div>
        </div>
      </section>

      {/* Checkout Form */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>
              
              {/* Plan Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Plan</label>
                <div className="space-y-3">
                  {Object.entries(plans).map(([key, plan]) => (
                    <div
                      key={key}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPlan === key
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPlan(key)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-black">{plan.name}</h3>
                          <p className="text-sm text-gray-600">{plan.features.length} features included</p>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-black">
                            ${billingCycle === 'monthly' ? plan.monthly : plan.yearly}
                          </div>
                          <div className="text-sm text-gray-600">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Cycle */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Billing Cycle</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      billingCycle === 'yearly'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Yearly
                    {savings > 0 && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Save ${savings}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-black mb-3">Included Features</h3>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{currentPlan.name} Plan</span>
                  <span className="font-medium text-black">${price}</span>
                </div>
                {billingCycle === 'yearly' && savings > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-600">Annual Discount</span>
                    <span className="font-medium text-green-600">-${savings}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold text-black border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>${price}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Payment Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Payment Method</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Billing Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">Processing Payment...</span>
                    </>
                  ) : (
                    `Complete Purchase - $${price}`
                  )}
                </button>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-600">
                  <div className="flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure 256-bit SSL encryption
                  </div>
                  <p>Your payment information is secure and encrypted</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
