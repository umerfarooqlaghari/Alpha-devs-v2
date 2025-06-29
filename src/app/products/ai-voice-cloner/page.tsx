'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationWidget from '@/components/NotificationWidget';
import VoiceIcon from '@/components/icons/VoiceIcon';
import AIIcon from '@/components/icons/AIIcon';
import SecurityIcon from '@/components/icons/SecurityIcon';

export default function AIVoiceCloner() {
  const { notifications, removeNotification, showSuccess, showInfo } = useNotifications();

  const handleTryVoiceCloning = () => {
    showSuccess('Voice Cloning Started!', 'Redirecting to our voice cloning studio...');
  };

  const handleListenSamples = () => {
    showInfo('Sample Player', 'Opening voice sample library...');
  };



  const handleContactSales = () => {
    showInfo('Contact Sales', 'Redirecting to our sales team contact form...');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <NotificationWidget notifications={notifications} onRemove={removeNotification} />
      
      {/* Hero Section */}
      <section className="gradient-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-8">AI Voice Cloner</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Revolutionary AI technology that creates natural-sounding voice clones from just a few minutes of audio.
              Perfect for content creation, accessibility, and personalized experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={handleTryVoiceCloning}
                className="btn-primary text-xl px-12 py-5 hover-lift"
              >
                Try Voice Cloning
              </button>
              <button
                onClick={handleListenSamples}
                className="btn-secondary text-xl px-12 py-5 hover-lift"
              >
                Listen to Samples
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">Advanced Voice Technology</h2>
            <p className="text-xl text-gray-300">State-of-the-art AI for realistic voice synthesis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <VoiceIcon size={32} className="text-white" animated={true} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Quick Training</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Create high-quality voice clones with just 5-10 minutes of audio samples.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <VoiceIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Natural Sound</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Generate speech that&apos;s virtually indistinguishable from the original voice.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <AIIcon size={32} className="text-white" animated={true} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Multi-Language</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Support for 50+ languages with accurate pronunciation and intonation.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <VoiceIcon size={32} className="text-white" animated={true} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Real-time Generation</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Generate speech in real-time for live applications and streaming.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <AIIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Voice Control</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Fine-tune emotion, pace, and style to match your specific needs.</p>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <div className="w-16 h-16 gradient-accent rounded-2xl mb-8 flex items-center justify-center neon-white">
                <SecurityIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">Privacy First</h3>
              <p className="text-gray-300 text-lg leading-relaxed">Your voice data is encrypted and never shared with third parties.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 gradient-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">Use Cases</h2>
            <p className="text-xl text-gray-300">Endless possibilities for voice cloning technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="card-sleek p-10 hover-lift">
              <h3 className="text-3xl font-bold text-white mb-6">Content Creation</h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Create podcasts, audiobooks, and video narrations without recording sessions.
                Perfect for content creators who want consistent voice quality.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-white mr-3">•</span> Podcast production</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> YouTube narration</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Audiobook creation</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> E-learning content</li>
              </ul>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <h3 className="text-3xl font-bold text-white mb-6">Business Applications</h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Enhance customer experience with personalized voice interactions and
                automated customer service that sounds human.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-white mr-3">•</span> Customer service bots</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Interactive voice response</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Personalized marketing</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Training materials</li>
              </ul>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <h3 className="text-3xl font-bold text-white mb-6">Accessibility</h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Help people with speech disabilities communicate using their own voice,
                or preserve voices for those facing voice loss.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-white mr-3">•</span> Voice preservation</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Speech assistance</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Communication aids</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Therapeutic applications</li>
              </ul>
            </div>

            <div className="card-sleek p-10 hover-lift">
              <h3 className="text-3xl font-bold text-white mb-6">Entertainment</h3>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Create unique entertainment experiences with voice acting,
                character voices, and interactive storytelling.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center"><span className="text-white mr-3">•</span> Voice acting</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Game characters</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Interactive stories</li>
                <li className="flex items-center"><span className="text-white mr-3">•</span> Virtual assistants</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold gradient-text mb-8">Ready to Clone Your Voice?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Join thousands of creators, businesses, and individuals who are already using
            our AI Voice Cloner to transform their audio content.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleTryVoiceCloning}
              className="btn-primary text-xl px-12 py-5 hover-lift"
            >
              Try Voice Cloning
            </button>
            <button
              onClick={handleContactSales}
              className="btn-secondary text-xl px-12 py-5 hover-lift"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
