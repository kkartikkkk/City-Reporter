import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import floods from "../assets/floods/floods.jpg";
import { FaRobot } from "react-icons/fa6";
import video from "../assets/videos/video.mp4";

import {
  Sun,
  Moon,
  MapPin,
  Camera,
  Brain,
  Clock,
  AlertTriangle,
  Vote,
  LayoutDashboard,
  Recycle,
  ChevronRight,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

// Framer Motion Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={fadeIn}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
  >
    <div className="inline-flex p-3 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 mb-4">
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, description, icon: Icon }) => (
  <motion.div variants={fadeIn} className="flex items-start gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Icon size={18} className="text-indigo-500" />
      </div>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ quote, name, role, avatar }) => (
  <motion.div
    variants={fadeIn}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700"
  >
    <p className="italic text-gray-600 dark:text-gray-300 mb-4">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold">
        {avatar || name.charAt(0)}
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  </motion.div>
);

const AnalyticsChart = ({ title, data }) => (
  <motion.div
    variants={fadeIn}
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
  >
    <h3 className="font-semibold mb-4">{title}</h3>
    <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md opacity-90 flex items-center justify-center">
      <p className="text-white font-medium">Interactive Chart Visualization</p>
    </div>
    <div className="mt-3 grid grid-cols-3 gap-2">
      {data.map((item, index) => (
        <div key={index} className="text-center">
          <p className="text-2xl font-bold">{item.value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </motion.div>
);

const IssueSliderCard = ({ image, caption }) => (
  <motion.div
    variants={fadeIn}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col items-center"
  >
    <div className="w-full h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      {image ? (
        <img
          src={image}
          alt={caption}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <span className="text-gray-400 text-6xl">
          <Camera size={48} />
        </span>
      )}
    </div>
    <div className="p-4 w-full text-center">
      <p className="text-gray-700 dark:text-gray-200 font-medium">{caption}</p>
    </div>
  </motion.div>
);

const issuesData = [
  { image: "floods", caption: "Pothole reported on MG Road" },
  { image: "", caption: "Overflowing garbage bin near Park" },
  { image: "", caption: "Broken streetlight at Sector 12" },
  { image: "", caption: "Water leakage in main market" },
  { image: "", caption: "Illegal dumping spotted" },
  { image: "", caption: "Damaged footpath near school" },
];

export default function CityReporterLanding() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Sample data for analytics
  const analyticsData = [
    [
      { label: "Issues Reported", value: "2.4K" },
      { label: "Resolution Rate", value: "78%" },
      { label: "Avg. Time", value: "3.2d" },
    ],
    [
      { label: "Active Users", value: "945" },
      { label: "Top Category", value: "Roads" },
      { label: "This Month", value: "+32%" },
    ],
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 ${
          isScrolled ? "shadow-md py-3" : "py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold">
              CR
            </div>
            <span className="font-bold text-xl">CityReporter</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
            >
              Home
            </a>
            <a
              href="#features"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Features
            </a>
            {/* <a
              href="#how-it-works"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              How It Works
            </a> */}
            <Link to="/login">
              <a
                href="#report"
                className="hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Report Issue
              </a>
            </Link>
            <a
              href="#issues"
              className="hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Recent Issues
            </a>

            <Link to="/bot">
              <a
                href="#chatbot"
                className=" hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <FaRobot className="text-4xl" />
              </a>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button> */}
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
              >
                Login/Register
              </motion.button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white overflow-hidden">
        
        <div className="absolute inset-0 opacity-20">
          <div>
          <video src={video} autoPlay loop muted object-cover/>
        </div>
          <div className="w-full h-full bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center filter blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
            >
              Empowering Citizens. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Fixing Cities.
              </span>
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl mb-8 text-gray-200"
            >
              Report issues like potholes, garbage, broken lights – and track
              resolutions.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-indigo-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Report Now
              </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-all"
              >
                See Issues
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Powerful Features
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Our platform offers a comprehensive suite of tools to empower
              citizens and authorities alike.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <FeatureCard
              icon={Camera}
              title="Smart Upload"
              description="Take a photo, add details, and get your issue registered in seconds"
            />
            <FeatureCard
              icon={Brain}
              title="AI Classification"
              description="Our NLP engine automatically categorizes issues for faster routing"
            />
            <FeatureCard
              icon={MapPin}
              title="Location Tracking"
              description="Precise GPS mapping helps authorities locate and address problems"
            />
            <FeatureCard
              icon={Clock}
              title="Real-time Updates"
              description="Get notifications as your reported issue moves toward resolution"
            />
            <FeatureCard
              icon={AlertTriangle}
              title="Emergency Alerts"
              description="Critical issues get immediate attention with priority routing"
            />
            <FeatureCard
              icon={Vote}
              title="Community Voting"
              description="Upvote important issues to help prioritize city resources"
            />
            <FeatureCard
              icon={LayoutDashboard}
              title="Admin Dashboard"
              description="Powerful insights for civic authorities to manage resources efficiently"
            />
            <FeatureCard
              icon={Recycle}
              title="Waste Management"
              description="Advanced tools for garbage segregation and sustainable disposal"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      {/* <section
        id="how-it-works"
        className="py-20 bg-indigo-50 dark:bg-gray-800/30"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Our streamlined process makes reporting and tracking city issues
              effortless.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-12"
          >
            <StepCard
              number="1"
              title="Upload and describe the issue"
              description="Take a photo of the problem and add relevant details to help authorities understand."
              icon={Camera}
            />
            <StepCard
              number="2"
              title="Auto-detect location & classify"
              description="Our AI automatically tags your location and categorizes the issue type."
              icon={MapPin}
            />
            <StepCard
              number="3"
              title="Get ticket ID & track updates"
              description="Receive a unique tracking ID and follow progress until resolution."
              icon={Clock}
            />
            <StepCard
              number="4"
              title="Vote, comment, or escalate if needed"
              description="Engage with the community and ensure important issues get attention."
              icon={Vote}
            />
          </motion.div>
        </div>
      </section> */}

      {/* Live Issue Map */}
      <section id="issue-map" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Live Issue Map
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              See what's happening in your city with our real-time issue
              visualization.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="aspect-video relative bg-gray-200 dark:bg-gray-700">
              <div className="absolute inset-0 bg-[url('/api/placeholder/1200/600')] bg-cover bg-center opacity-80"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-purple-600/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg text-center">
                  <p className="font-medium">Interactive City Map</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Displaying 347 active issues
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      {/* <section
        id="dashboard"
        className="py-20 bg-indigo-50 dark:bg-gray-800/30"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Analytics Dashboard
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Powerful insights for civic authorities to make data-driven
              decisions.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <AnalyticsChart
              title="Issue Resolution Analytics"
              data={analyticsData[0]}
            />
            <AnalyticsChart
              title="Community Engagement Metrics"
              data={analyticsData[1]}
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Advanced analytics help authorities prioritize resources and track
              performance.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg"
            >
              Explore Full Dashboard
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        </div>
      </section> */}

      {/* const IssueSliderCard = ({ image, caption }) => (
  <motion.div
    variants={fadeIn}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col items-center"
  >
    <div className="w-full h-56 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
      {image ? (
        <img
          src={image}
          alt={caption}
          className="object-cover w-full h-full"
          onError={e => { e.target.style.display = 'none'; }}
        />
      ) : (
        <span className="text-gray-400 text-6xl">
          <Camera size={48} />
        </span>
      )}
    </div>
    <div className="p-4 w-full text-center">
      <p className="text-gray-700 dark:text-gray-200 font-medium">{caption}</p>
    </div>
  </motion.div>
);

const issuesData = [
  { image: "", caption: "Pothole reported on MG Road" },
  { image: "", caption: "Overflowing garbage bin near Park" },
  { image: "", caption: "Broken streetlight at Sector 12" },
  { image: "", caption: "Water leakage in main market" },
  { image: "", caption: "Illegal dumping spotted" },
  { image: "", caption: "Damaged footpath near school" },
]; */}

      <section id="issues" className="py-20 bg-indigo-50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Recent Issues
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              Explore the latest issues reported by citizens in your city.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="overflow-x-auto"
          >
            <div
              className="flex gap-6 w-full pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {issuesData.map((issue, idx) => (
                <div key={idx} className="min-w-[260px] max-w-xs flex-shrink-0">
                  <IssueSliderCard
                    image={issue.image}
                    caption={issue.caption}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Citizen Feedback
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            >
              See what our community is saying about CityReporter.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <TestimonialCard
              quote="City Reporter helped fix the streetlight in my area within 2 days! Much faster than my previous attempts through traditional channels."
              name="Priya Sharma"
              role="Local Resident"
            />
            <TestimonialCard
              quote="So much easier than calling the ward office. I love that I can track the status and see when my issue will be resolved."
              name="Rahul Verma"
              role="Community Member"
            />
            <TestimonialCard
              quote="As a neighborhood association president, this tool has revolutionized how we collaborate with city officials on local issues."
              name="Anita Desai"
              role="Community Leader"
            />
          </motion.div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Community Leaders
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-gray-200 max-w-2xl mx-auto"
            >
              Earn badges and recognition for making your city better.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-bold mb-1">Ravi Kumar</h3>
                <p className="text-sm text-gray-200">42 Issues Reported</p>
                <div className="flex justify-center gap-1 mt-2">
                  <span className="inline-block w-6 h-6 rounded-full bg-green-500"></span>
                  <span className="inline-block w-6 h-6 rounded-full bg-blue-500"></span>
                  <span className="inline-block w-6 h-6 rounded-full bg-purple-500"></span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-bold mb-1">Meera Patel</h3>
                <p className="text-sm text-gray-200">38 Issues Reported</p>
                <div className="flex justify-center gap-1 mt-2">
                  <span className="inline-block w-6 h-6 rounded-full bg-green-500"></span>
                  <span className="inline-block w-6 h-6 rounded-full bg-yellow-500"></span>
                  <span className="inline-block w-6 h-6 rounded-full bg-red-500"></span>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-red-500 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-bold mb-1">Arjun Singh</h3>
                <p className="text-sm text-gray-200">31 Issues Reported</p>
                <div className="flex justify-center gap-1 mt-2">
                  <span className="inline-block w-6 h-6 rounded-full bg-purple-500"></span>
                  <span className="inline-block w-6 h-6 rounded-full bg-blue-500"></span>
                  <span className="inline-block w-6 h-6 rounded-full bg-pink-500"></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's build smarter cities together.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of citizens making a difference in their
              communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-gray-800 border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-bold py-3 px-8 rounded-lg shadow-lg"
              >
                Partner With Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white font-bold">
                  CR
                </div>
                <span className="font-bold text-xl">CityReporter</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering citizens to improve their communities through
                technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Report Issue
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Connect</h4>
              <div className="flex gap-4 mb-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Contact: contact@cityreporter.in
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2025 City Reporter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
