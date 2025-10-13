// src/app/page.tsx
import { ArrowRight, Zap, ShieldCheck, Heart } from "lucide-react"; 

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">


      {/* Main Content */}
      <main className="flex-grow pt-16">
        {/* Hero Section */}

        <div className="p-6 rounded-xl bg-blue-500 text-white">
          Tailwind is working
        </div>
        {/* Solutions Section */}
        <section id="solutions" className="py-24 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Why Choose Kleanr?</h2>
              <p className="text-lg text-gray-600">Experience the perfect blend of convenience, quality, and sustainability.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
              {/* Card 2 */}
              <div className="group p-8 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Trusted Quality</h3>
                <p className="text-gray-600 leading-relaxed">Every provider is vetted, insured, and rated. Your garments are in safe, professional hands.</p>
              </div>
              
              {/* Card 3 */}
              <div className="group p-8 bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Eco-Friendly</h3>
                <p className="text-gray-600 leading-relaxed">We use sustainable, non-toxic products that are safe for you, your clothes, and our planet.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">How It Works</h2>
              <p className="text-lg text-gray-600">Getting your clothes cleaned has never been easier.</p>
            </div>
            <div className="grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Schedule Pickup</h3>
                <p className="text-gray-600">Choose your preferred time slot and drop off you clothes.</p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">We Clean</h3>
                <p className="text-gray-600">Our professionals handle your garments with expert care.</p>
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
                Founded in 2025, Kleanr was born from a simple idea: cleaning services should be simple, reliable, and sustainable. We leverage technology to create a seamless experience for our customers while promoting practices that protect our environment.
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