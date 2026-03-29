import { motion } from "motion/react";
import { Building2, Leaf, Shield, ArrowRight, TrendingUp, LineChart, Globe, Lock } from "lucide-react";

interface LandingPageProps {
  onLoginClick: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] font-sans selection:bg-[#DDA04E]/30 text-slate-900">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/20">
              <span className="text-[#DDA04E] font-bold text-sm">CF</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">ClientFlow</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLoginClick}
            className="px-6 py-2.5 bg-slate-900 text-white font-medium rounded-full shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 transition-all flex items-center gap-2"
          >
            Portal Login <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#DDA04E]/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DDA04E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DDA04E]"></span>
              </span>
              <span className="text-sm font-medium text-slate-600">The Modern Standard for Portfolio Management</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Manage your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DDA04E] to-amber-700">Wealth</span> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Investments</span> with confidence.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              ClientFlow provides full transparency, seamless communication, and real-time ROI tracking for modern property and agricultural investments.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onLoginClick}
                className="w-full sm:w-auto px-8 py-4 bg-[#DDA04E] hover:bg-amber-600 text-white font-semibold rounded-full shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-full border border-slate-200 shadow-sm transition-all"
              >
                Explore Features
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need in one portal</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Purpose-built tools for investors, tenants, and farm operators, brought together in a single intuitive platform.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real Estate */}
            <motion.div whileHover={{ y: -5 }} className="bg-[#F8F9FB] rounded-3xl p-8 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="h-14 w-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Property Management</h3>
              <p className="text-slate-600 leading-relaxed">Complete oversight of your real estate portfolio. Track occupancy, streamline maintenance requests, and automate rent collection seamlessly.</p>
            </motion.div>

            {/* Farm Investments */}
            <motion.div whileHover={{ y: -5 }} className="bg-[#F8F9FB] rounded-3xl p-8 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="h-14 w-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Verda Farms</h3>
              <p className="text-slate-600 leading-relaxed">Direct access to agricultural portfolios. Monitor crop yields, environmental reports, and track your agricultural asset performance.</p>
            </motion.div>

            {/* ROI Tracking */}
            <motion.div whileHover={{ y: -5 }} className="bg-[#F8F9FB] rounded-3xl p-8 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="h-14 w-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="h-7 w-7 text-[#DDA04E]" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live ROI Analytics</h3>
              <p className="text-slate-600 leading-relaxed">Interactive dashboards with real-time financial tracking. View income, expenses, and overall portfolio wealth at a glance.</p>
            </motion.div>

            {/* Financial Security */}
            <motion.div whileHover={{ y: -5 }} className="bg-[#F8F9FB] rounded-3xl p-8 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="h-14 w-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bank-Grade Security</h3>
              <p className="text-slate-600 leading-relaxed">Your data and financial transactions are protected by industry-leading encryption and role-based access controls.</p>
            </motion.div>

            {/* Global Access */}
            <motion.div whileHover={{ y: -5 }} className="bg-[#F8F9FB] rounded-3xl p-8 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="h-14 w-14 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-7 w-7 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accessible Anywhere</h3>
              <p className="text-slate-600 leading-relaxed">Optimized for both desktop and mobile devices. Manage your investments seamlessly whether at home or on the go.</p>
            </motion.div>

            {/* Tenant Success */}
            <motion.div whileHover={{ y: -5 }} className="bg-[#F8F9FB] rounded-3xl p-8 border border-slate-200/60 hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="h-14 w-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tenant Success</h3>
              <p className="text-slate-600 leading-relaxed">A dedicated portal for tenants to communicate, pay rent securely, and file maintenance requests, improving retention.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DDA04E] rounded-full blur-[150px] opacity-20" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to scale your portfolio?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of modern investors and property managers who trust ClientFlow to run their operations.
          </p>
          <button 
            onClick={onLoginClick}
            className="px-8 py-4 bg-[#DDA04E] hover:bg-amber-500 text-white font-bold rounded-full shadow-xl shadow-amber-500/20 transition-all text-lg flex items-center gap-2 mx-auto group"
          >
            Create Your Account
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-slate-800 rounded-lg flex items-center justify-center">
              <span className="text-[#DDA04E] font-bold text-xs">CF</span>
            </div>
            <span className="text-lg font-semibold text-white">ClientFlow</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} ClientFlow Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Terms</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
