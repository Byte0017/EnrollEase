import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Navbar from '../../Common/Navbar';
import Footer from '../../Common/Footer';
import { FaRocket, FaHeadset, FaRegClock, FaGraduationCap } from 'react-icons/fa';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 120 }
  }
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-default"
    whileHover={{ scale: 1.05 }}
  >
    <div className={`text-4xl mb-4 ${color}`}>{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

interface StatItemProps {
  value: number;
  suffix?: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, suffix = '', label }) => (
  <div className="text-center">
    <div className="text-4xl font-bold mb-2">
      <CountUp end={value} duration={2.5} suffix={suffix} />
    </div>
    <div className="text-sm opacity-90">{label}</div>
  </div>
);

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Revolutionizing College Admissions
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EnrollEase transforms the admission journey with cutting-edge technology and student-centric design.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="relative bg-white rounded-2xl shadow-lg p-8 mb-16 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-xl" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're democratizing access to higher education through intuitive tools and personalized guidance. 
                Our platform eliminates barriers, empowering students to focus on what really matters - their future.
              </p>
            </div>
          </motion.section>

          {/* Features Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            <FeatureCard
              icon={<FaRocket />}
              title="Instant Applications"
              description="Submit to multiple institutions in minutes"
              color="text-blue-600"
            />
            <FeatureCard
              icon={<FaHeadset />}
              title="24/7 Support"
              description="Real human assistance whenever you need"
              color="text-purple-600"
            />
            <FeatureCard
              icon={<FaRegClock />}
              title="Real-Time Tracking"
              description="Live updates on your application status"
              color="text-blue-600"
            />
            <FeatureCard
              icon={<FaGraduationCap />}
              title="Smart Matching"
              description="AI-powered program recommendations"
              color="text-purple-600"
            />
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 mb-16"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatItem value={500} suffix="K+" label="Successful Applications" />
              <StatItem value={95} suffix="%" label="Satisfaction Rate" />
              <StatItem value={300} suffix="+" label="Partner Institutions" />
              <StatItem value={24} suffix="/7" label="Support Availability" />
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ready to Begin Your Journey?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-transform"
              aria-label="Start your application"
            >
              Start Your Application
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;