// src/app/page.tsx
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ArrowRight, Zap, ShieldCheck, Heart } from "lucide-react"; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform">
              K
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Kleanr
            </span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How It Works</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
          </nav>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-5 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Login
                </button>
              </SignInButton>
              <button className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 rounded-full hover:shadow-lg hover:scale-105 transition-all">
                Get Started
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative text-center py-24 sm:py-32 lg:py-40 bg-gray-50 animate-fadeIn">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1),_transparent_40%)] -z-10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 text-balance animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Effortless Cleaning, <span className="text-blue-500">Redefined</span>.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Kleanr provides modern, eco-friendly solutions to keep your space sparkling. Join us and experience the future of clean.
            </p>
            <div className="mt-10 flex justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-transform hover:scale-105">
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-20 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Solutions</h2>
              <p className="mt-4 text-lg text-gray-600">Designed for efficiency and peace of mind.</p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Card 1 */}
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-500 rounded-lg">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Fast & Efficient</h3>
                <p className="mt-2 text-gray-600">Our advanced platform connects you with services in minutes, not hours.</p>
              </div>
              {/* Card 2 */}
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-500 rounded-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Verified & Trusted</h3>
                <p className="mt-2 text-gray-600">Every provider is vetted and insured, guaranteeing you quality and safety.</p>
              </div>
              {/* Card 3 */}
              <div className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-500 rounded-lg">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Eco-Friendly Focus</h3>
                <p className="mt-2 text-gray-600">We prioritize using sustainable products that are safe for you and the planet.</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">About Kleanr</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Founded in 2024, Kleanr was born from a simple idea: cleaning services should be simple, reliable, and sustainable. We leverage technology to create a seamless experience for our customers while promoting practices that protect our environment.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is to build a cleaner world, one space at a time. Join thousands of satisfied customers who trust Kleanr for their cleaning needs.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold">
                K
              </div>
              <span className="text-2xl font-bold">Kleanr</span>
            </div>
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Kleanr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}