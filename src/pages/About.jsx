import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaRocket, FaHeadset, FaRegClock, FaGraduationCap } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
              Revolutionizing College Admissions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              EnrollEase transforms the admission journey with cutting-edge technology and student-centric design.
            </p>
          </div>

          {/* Mission Section */}
          <div className="relative bg-white rounded-2xl shadow-lg p-8 mb-16 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We're democratizing access to higher education through intuitive tools and personalized guidance. 
                Our platform eliminates barriers, empowering students to focus on what really matters - their future.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FaRocket className="text-blue-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Applications</h3>
              <p className="text-gray-600">Submit to multiple institutions in minutes</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FaHeadset className="text-purple-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Real human assistance whenever you need</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FaRegClock className="text-blue-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600">Live updates on your application status</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FaGraduationCap className="text-purple-600 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">AI-powered program recommendations</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500K+</div>
                <div className="text-sm opacity-90">Successful Applications</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-sm opacity-90">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">300+</div>
                <div className="text-sm opacity-90">Partner Institutions</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Support Availability</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Begin Your Journey?</h2>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform">
              Start Your Application
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;