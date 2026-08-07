import CTA from "../components/landing/CTA";
import DashboardPreview from "../components/landing/DashboardPreview";
import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Navbar from "../components/landing/Navbar";
import Testimonials from "../components/landing/Testimonials";
import TrustedCompanies from "../components/landing/TrustedCompanies";

const Landing = () => <div className="min-h-screen bg-white font-sans text-slate-900"><Navbar /><main><Hero /><TrustedCompanies /><Features /><HowItWorks /><DashboardPreview /><Testimonials /><CTA /></main><Footer /></div>;
export default Landing;
