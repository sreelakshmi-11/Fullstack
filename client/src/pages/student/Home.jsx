import React from "react";
import Hero from "../../components/student/Hero";
import SearchBar from "../../components/student/SearchBar";
import Companies from "../../components/student/Companies";
import TestimonialSection from "../../components/student/TestimonialSection";
import CallToAction from "../../components/student/CallToAction";
import Footer from "../../components/student/Footer";
import CoursesSection from "../../components/student/CoursesSection";
const Home = () => {
  return (
    <div className="flex flex-col gap-[60px]">
      <Hero />
      <Companies />
      <CoursesSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
