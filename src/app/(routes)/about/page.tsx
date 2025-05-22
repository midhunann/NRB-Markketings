"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Star, 
  Lightbulb, 
  ArrowRight,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  TrendingUp,
  Award,
  Globe,
  ThumbsUp,
  Archive
} from "lucide-react";
import { 
  fadeIn, 
  slideUp, 
  cardHover 
} from "@/app/lib/animations";

export default function AboutPage() {
  // State for timeline slider
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const timelineRef = useRef(null);

const milestones = [
  {
    year: "2018",
    title: "Foundation",
    description: "NRB Markketings founded as a 1-person startup on 12 October 2018, with a vision to bridge government surplus and market needs.",
    icon: <Calendar className="h-6 w-6" />
  },
  {
    year: "2021",
    title: "Service Excellence",
    description: "Achieved 100 % client satisfaction across all Central and State government departments, backed by strict QA and after-sales service protocols.",
    icon: <Award className="h-6 w-6" />
  },
  {
    year: "2022",
    title: "Catalog Expansion",
    description: "Expanded our catalog to over 100 distinct SKUs spanning six major categories—electronics, chemicals, plumbing, seafood, PSDAS, and lighting & electrical.",  
    icon: <Archive className="h-6 w-6" />
  },
  {
    year: "2024",
    title: "PSDAS Launch",
    description: "Launched our PSDAS (Public Sector Digital Asset System), delivering smart, eco-friendly water and power management solutions for government facilities.",
    icon: <Lightbulb className="h-6 w-6" />
  },
  {
    year: "2025",
    title: "Pan-India Network",
    description: "Established an all-India distribution network with operational partnerships in every major state and union territory, reinforcing our tagline as Trend Setter in the industry.",
    icon: <Globe className="h-6 w-6" />
  }
];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Integrity",
      description: "Transparent bidding, honest pricing."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Quality",
      description: "Strict inspections, robust warranties."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Service",
      description: "Responsive teams, rapid after-sales."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Tech-driven solutions like PSDAS."
    }
  ];

  const stats = [
    {
      value: 6,
      label: "Years in Business",
      suffix: "+",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      value: 460408,
      label: "Total Units Liquidated",
      suffix: "+",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      value: 8,
      label:"Departments Served",
      suffix: "",
      icon: <Globe className="h-6 w-6" />
    },
    {
      value: 100,
      label: "Client Satisfaction",
      suffix: "%",
      icon: <ThumbsUp className="h-6 w-6" />
    }
  ];

  // Refs for scroll animations
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const missionRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  // Check if sections are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.5 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  // Enhanced counter animation for stats with thousands separator
  const [countedStats, setCountedStats] = useState(stats.map(() => 0));
  
  interface NumberFormatter {
    (num: number): string;
  }

  const formatNumber: NumberFormatter = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  useEffect(() => {
    if (statsInView) {
      stats.forEach((stat, index) => {
        const duration = 2000; // Animation duration in ms
        const steps = 50; // Number of steps in animation
        const stepValue = stat.value / steps;
        let currentStep = 0;
        
        const interval = setInterval(() => {
          currentStep++;
          if (currentStep <= steps) {
            setCountedStats(prev => {
              const newStats = [...prev];
              newStats[index] = Math.round(stepValue * currentStep);
              return newStats;
            });
          } else {
            clearInterval(interval);
            setCountedStats(prev => {
              const newStats = [...prev];
              newStats[index] = stat.value;
              return newStats;
            });
          }
        }, duration / steps);
        
        return () => clearInterval(interval);
      });
    }
  }, [statsInView]);

  // Advance timeline with auto-pause when hovered
  const [autoAdvance, setAutoAdvance] = useState(true);
  
  useEffect(() => {
    if (storyInView && autoAdvance) {
      const interval = setInterval(() => {
        setCurrentMilestone((prev) => (prev + 1) % milestones.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [storyInView, autoAdvance]);

  // Horizontal slide navigation functions
  const nextMilestone = () => {
    setCurrentMilestone((prev) => (prev + 1) % milestones.length);
    setAutoAdvance(false);
    // Resume auto-advance after 10 seconds of inactivity
    setTimeout(() => setAutoAdvance(true), 10000);
  };

  const prevMilestone = () => {
    setCurrentMilestone((prev) => (prev - 1 + milestones.length) % milestones.length);
    setAutoAdvance(false);
    // Resume auto-advance after 10 seconds of inactivity
    setTimeout(() => setAutoAdvance(true), 10000);
  };

  // Touch and mouse drag handling for timeline slider
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (e.type === "touchstart") {
      setStartX((e as React.TouchEvent).touches[0].clientX);
    } else {
      setStartX((e as React.MouseEvent).clientX);
    }
    setIsDragging(true);
    setAutoAdvance(false);
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    const clientX = e.type === "touchmove" 
      ? (e as React.TouchEvent).touches[0].clientX 
      : (e as React.MouseEvent).clientX;
    const diff = startX - clientX;
    
    // Threshold for swipe detection (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextMilestone();
      } else {
        prevMilestone();
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Resume auto-advance after 10 seconds of inactivity
    setTimeout(() => setAutoAdvance(true), 10000);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (storyInView) {
        if (e.key === "ArrowRight") {
          nextMilestone();
        } else if (e.key === "ArrowLeft") {
          prevMilestone();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [storyInView, nextMilestone, prevMilestone]);

  // Accessibility improvement - pause auto-advance on hover
  const handleTimelineHover = () => {
    setAutoAdvance(false);
  };

  const handleTimelineLeave = () => {
    setAutoAdvance(true);
  };

  return (
    <div className="bg-[var(--nude)] min-h-screen">
      {/* 3.1 Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-[var(--nude)] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div
          initial="initial"
          animate={heroInView ? "animate" : "initial"}
          variants={fadeIn}
          className="max-w-5xl mx-auto relative z-10"
        >
          <motion.h1 
            variants={slideUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 text-center"
          >
            NRB Markketings: The Trend Setter in Government‑Surplus Trading
          </motion.h1>
          <motion.p
            variants={slideUp}
            className="text-lg md:text-xl text-foreground/80 text-center max-w-3xl mx-auto mb-10"
          >
            Years of excellence supplying Central & State Governments across India—turning excess assets into opportunity.
          </motion.p>
          <motion.div 
            variants={slideUp}
            className="flex justify-center gap-4"
          >
            <motion.a
              href="/contact"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-lg font-medium shadow-md transition-all duration-300 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Quote
              <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a
              href="/products"
              className="bg-transparent border border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-lg font-medium transition-all duration-300 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Our Services
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Enhanced semi-transparent layered background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 top-0 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse"></div>
          <div className="absolute left-20 bottom-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
      </section>

      {/* 3.2 Timeline Slider */}
      <section 
        ref={storyRef}
        className="relative bg-[var(--nude)] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div
          initial="initial"
          animate={storyInView ? "animate" : "initial"}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center"
          >
            Our Origin <span className="text-secondary">Story</span>
          </motion.h2>
          <motion.p
            variants={slideUp}
            className="text-lg text-foreground/80 text-center max-w-3xl mx-auto mb-12"
          >
            Founded in 2023 to bridge the gap between government surplus and market needs, we&apos;ve grown from a 1‑person startup to an all‑India distributor with 100% client satisfaction.
          </motion.p>
          
          {/* Enhanced timeline slider with horizontal navigation */}
          <div className="relative" 
            ref={timelineRef}
            onMouseEnter={handleTimelineHover}
            onMouseLeave={handleTimelineLeave}
            role="region"
            aria-label="Company milestones timeline"
          >
            <div className="flex justify-center mb-8">
              <div className="h-1 bg-muted rounded-full w-full max-w-3xl relative">
                {milestones.map((_, index) => (
                  <div 
                    key={index}
                    className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 cursor-pointer transition-all duration-300 ${index === currentMilestone ? 'bg-secondary border-secondary scale-125' : 'bg-muted border-primary'}`}
                    style={{ left: `${(index / (milestones.length - 1)) * 100}%` }}
                    onClick={() => {
                      setCurrentMilestone(index);
                      setAutoAdvance(false);
                      setTimeout(() => setAutoAdvance(true), 10000);
                    }}
                    aria-label={`View milestone from ${milestones[index].year}: ${milestones[index].title}`}
                    aria-current={index === currentMilestone ? "true" : "false"}
                  />
                ))}
              </div>
            </div>
            
            {/* Left navigation button */}
            <button 
              onClick={prevMilestone} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary hover:text-secondary rounded-full p-2 shadow-md transition-all duration-300 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-secondary"
              aria-label="Previous milestone"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            {/* Touch and mouse drag enabled card */}
            <div 
              className="overflow-hidden"
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              style={{ touchAction: "pan-y" }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentMilestone}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg mx-auto max-w-2xl border border-muted/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/20 text-secondary rounded-full">
                        {milestones[currentMilestone].icon}
                      </div>
                      <h3 className="text-2xl font-bold text-primary">
                        {milestones[currentMilestone].title}
                      </h3>
                    </div>
                    <span className="text-xl font-bold px-4 py-1 bg-secondary/20 text-secondary-foreground rounded-full">
                      {milestones[currentMilestone].year}
                    </span>
                  </div>
                  <p className="text-lg text-foreground/80">
                    {milestones[currentMilestone].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Right navigation button */}
            <button 
              onClick={nextMilestone} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary hover:text-secondary rounded-full p-2 shadow-md transition-all duration-300 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-secondary"
              aria-label="Next milestone"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            
            <div className="flex justify-center mt-6 gap-2">
              {milestones.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentMilestone ? 'bg-secondary w-8' : 'bg-white'}`}
                  onClick={() => {
                    setCurrentMilestone(index);
                    setAutoAdvance(false);
                    setTimeout(() => setAutoAdvance(true), 10000);
                  }}
                  aria-label={`Go to milestone ${index + 1}`}
                  aria-current={index === currentMilestone ? "true" : "false"}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3.3 Mission & Vision Section */}
      <section 
        ref={missionRef}
        className="relative bg-[var(--nude)] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div
          initial="initial"
          animate={missionInView ? "animate" : "initial"}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center"
          >
            Mission & <span className="text-secondary">Vision</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-muted/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 transform scale-95 rounded-xl group-hover:scale-100 transition-all duration-500"></div>
              <h3 className="text-2xl font-bold text-primary mb-4 relative z-10 flex items-center gap-3">
                <Shield className="h-6 w-6 text-secondary" />
                Our Mission
              </h3>
              <p className="text-lg text-foreground/80 mb-4 relative z-10">
                To innovate asset liquidation through seamless auctions, superior logistics, and rigorous quality control—always ensuring value and trust.
              </p>
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full -mr-8 -mt-8"></div>
            </motion.div>
            
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-muted/50 relative overflow-hidden md:mt-8 group"
            >
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 to-secondary/5 transform scale-95 rounded-xl group-hover:scale-100 transition-all duration-500"></div>
              <h3 className="text-2xl font-bold text-primary mb-4 relative z-10 flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-secondary" />
                Our Vision
              </h3>
              <p className="text-lg text-foreground/80 mb-4 relative z-10">
                To set the global benchmark in surplus trading, expanding our reach and raising service standards worldwide.
              </p>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full -ml-8 -mb-8"></div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Enhanced subtle wave SVG background with animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto opacity-10 text-primary">
            <path fill="currentColor" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
              <animate 
                attributeName="d" 
                dur="20s" 
                repeatCount="indefinite"
                values="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                       M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,176C672,149,768,107,864,112C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                       M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </path>
          </svg>
        </div>
      </section>

      {/* 3.4 Core Values Section */}
      <section 
        ref={valuesRef}
        className="relative bg-[var(--nude)] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div
          initial="initial"
          animate={valuesInView ? "animate" : "initial"}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center"
          >
            Core <span className="text-secondary">Values</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                custom={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-muted/50 group hover:border-secondary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-primary group-hover:text-secondary transition-colors duration-300 mb-4 bg-primary/5 p-3 rounded-full inline-block">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition-all duration-300">
                  {value.title}
                </h3>
                <p className="text-foreground/80">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* 3.5 Stats Section */}
      <section 
        ref={statsRef}
        className="relative bg-primary text-primary-foreground py-16 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial="initial"
          animate={statsInView ? "animate" : "initial"}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            variants={slideUp}
            className="text-3xl md:text-4xl font-bold mb-10 text-center"
          >
            Our <span className="text-secondary">Impact</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                custom={index}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                <div className="mb-4 p-3 bg-white/20 rounded-full">
                  {stat.icon}
                </div>
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 flex items-center">
                  {formatNumber(countedStats[index])}{stat.suffix}
                </span>
                <span className="text-xl text-primary-foreground/80 text-center">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-secondary/10 rounded-full -mr-32 -mb-32 blur-3xl"></div>
          <div className="absolute left-0 top-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
        </div>
      </section>
      
      {/* 3.6 CTA Section */}
      <section 
        ref={ctaRef}
        className="relative bg-nude py-20 px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial="initial"
          animate={ctaInView ? "animate" : "initial"}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-lg border border-muted/50 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 transform"></div>
            
            <motion.h2 
              variants={slideUp}
              className="text-3xl md:text-4xl font-bold text-primary mb-6 relative z-10"
            >
              Ready to Partner with <span className="text-secondary">NRB Markketings</span>?
            </motion.h2>
            
            <motion.p
              variants={slideUp}
              className="text-lg text-foreground/80 mb-10 max-w-2xl mx-auto relative z-10"
            >
              Join hundreds of satisfied government departments and businesses across India. 
              Contact us today to discuss your requirements.
            </motion.p>
            
            <motion.div
              variants={slideUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10"
            >
              <motion.a
                href="/contact"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-lg font-medium shadow-md transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Our Team
                <ArrowRight className="h-5 w-5" />
              </motion.a>
              
              <motion.a
                href="/products"
                className="inline-flex items-center gap-2 bg-transparent border border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore Our Services
                <ArrowRight className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Enhanced subtle background elements with animations */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>
        </div>
      </section>
    </div>
  );
}