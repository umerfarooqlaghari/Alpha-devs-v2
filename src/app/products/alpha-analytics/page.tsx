'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationWidget from '@/components/NotificationWidget';
import AnalyticsIcon from '@/components/icons/AnalyticsIcon';
import AIIcon from '@/components/icons/AIIcon';
import IntegrationIcon from '@/components/icons/IntegrationIcon';
import SecurityIcon from '@/components/icons/SecurityIcon';

export default function AlphaAnalytics() {
  const { notifications, removeNotification, showSuccess, showInfo } = useNotifications();



  const handleWatchDemo = () => {
    showInfo('Demo Loading', 'Opening demo video in a new window...');
    // In a real app, this would open a demo video
  };

  const handleGetStarted = (plan: string) => {
    showSuccess('Plan Selected!', `You've selected the ${plan} plan. Redirecting to checkout...`);
  };

  const handleContactSales = () => {
    showInfo('Contact Sales', 'Redirecting to our sales team contact form...');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <NotificationWidget notifications={notifications} onRemove={removeNotification} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-black mb-8">Alpha-analytics</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
              Advanced analytics platform powered by AI to transform your data into actionable insights.
              Make data-driven decisions with confidence using our cutting-edge analytics tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleWatchDemo}
                className="bg-black text-white px-12 py-5 rounded-lg text-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
              >
                Watch Demo
              </button>
              <button
                onClick={handleContactSales}
                className="bg-white text-black border-2 border-black px-12 py-5 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">Powerful Features</h2>
            <p className="text-xl text-gray-300">Everything you need to analyze and understand your data</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <AnalyticsIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Real-time Analytics</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Monitor your data in real-time with live dashboards and instant insights.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <AIIcon size={32} className="text-white" animated={true} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">AI-Powered Insights</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Leverage machine learning to discover patterns and predict trends automatically.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <AnalyticsIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Custom Dashboards</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Create personalized dashboards tailored to your specific business needs.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <IntegrationIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Data Integration</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Connect with 100+ data sources and APIs for comprehensive analysis.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <SecurityIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Enterprise Security</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Bank-level security with encryption, compliance, and access controls.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <AnalyticsIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Mobile Ready</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Access your analytics anywhere with our responsive mobile interface.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">Simple Pricing</h2>
            <p className="text-xl text-gray-300">Choose the plan that fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-sleek p-8 hover-lift">
              <h3 className="text-2xl font-bold text-white mb-4">Starter</h3>
              <div className="text-4xl font-bold text-white mb-6">$29<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Up to 10,000 data points</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">5 custom dashboards</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Basic AI insights</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Email support</span>
                </li>
              </ul>
              <button
                onClick={() => handleGetStarted('Starter')}
                className="w-full btn-primary py-3 rounded-md font-semibold transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            <div className="card-sleek p-8 border-2 border-white/30 relative hover-lift neon-white">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Professional</h3>
              <div className="text-4xl font-bold text-white mb-6">$99<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Up to 100,000 data points</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Unlimited dashboards</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Advanced AI insights</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">API access</span>
                </li>
              </ul>
              <button
                onClick={() => handleGetStarted('Professional')}
                className="w-full btn-primary py-3 rounded-md font-semibold transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            <div className="card-sleek p-8 hover-lift">
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Unlimited data points</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">On-premise deployment</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-300">SLA guarantee</span>
                </li>
              </ul>
              <button
                onClick={handleContactSales}
                className="w-full btn-secondary py-3 rounded-md font-semibold transition-all duration-300"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
