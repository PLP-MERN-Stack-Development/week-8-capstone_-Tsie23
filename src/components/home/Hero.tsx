import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, BookOpen, Code, User, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

export const Hero: React.FC = () => {
  const [showDemo, setShowDemo] = React.useState(false);

  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Navigate Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Coding Journey
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Learn how to structure full coding projects step by step. From file organization to dependencies, 
              we'll guide you through building professional applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl">
                  Get Started
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowDemo(true)}
                className="border-white text-white hover:bg-white/10 shadow-xl"
              >
                <Play className="mr-2" size={20} />
                Watch Demo
              </Button>
              
              <Link to="/dashboard">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="text-white hover:bg-white/10 shadow-xl"
                >
                  <BookOpen className="mr-2" size={20} />
                  Start Learning
                </Button>
              </Link>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <Code className="h-8 w-8 text-blue-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Visual File Structure</h3>
                <p className="text-blue-100">See how files and folders should be organized in real projects</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <BookOpen className="h-8 w-8 text-cyan-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Step-by-Step Guide</h3>
                <p className="text-blue-100">Learn the creation order and dependencies between files</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <ArrowRight className="h-8 w-8 text-indigo-400 mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
                <p className="text-blue-100">Click files to see boilerplate code and explanations</p>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-20 space-y-20">
              {/* Features Section */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Everything You Need to Build Projects
                </h2>
                <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
                  From project structure to deployment, Code Compass provides comprehensive guidance for every step of your coding journey.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Interactive Project Builder</h3>
                    <p className="text-blue-100 text-sm">Generate complete project structures with proper file organization and dependencies</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Step-by-Step Guidance</h3>
                    <p className="text-blue-100 text-sm">Follow clear instructions with beginner-friendly explanations and code examples</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Multiple Tech Stacks</h3>
                    <p className="text-blue-100 text-sm">Support for MERN, Firebase, Next.js, and static site projects</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Beginner Friendly</h3>
                    <p className="text-blue-100 text-sm">Toggle between beginner and intermediate modes for personalized learning</p>
                  </div>
                </div>
              </div>

              {/* How It Works Section */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
                <p className="text-xl text-blue-100 mb-12">Simple steps to master project development</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Choose Your Project</h3>
                    <p className="text-blue-100">Select from MERN stack, Firebase, Next.js, or static site projects</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Follow the Structure</h3>
                    <p className="text-blue-100">Get a complete file structure with creation order and dependencies</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Build & Learn</h3>
                    <p className="text-blue-100">Use boilerplate code and step-by-step guidance to complete your project</p>
                  </div>
                </div>
              </div>

              {/* Testimonials Section */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">What Developers Say</h2>
                <p className="text-xl text-blue-100 mb-12">Join thousands of developers who've accelerated their learning</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-blue-100 mb-4 italic">
                      "Code Compass helped me understand project structure better than any tutorial. The visual approach is amazing!"
                    </p>
                    <div>
                      <p className="font-semibold">Sarah Chen</p>
                      <p className="text-blue-300 text-sm">Self-taught Developer</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-blue-100 mb-4 italic">
                      "Finally, a tool that shows you the big picture. I wish I had this when I started coding."
                    </p>
                    <div>
                      <p className="font-semibold">Marcus Johnson</p>
                      <p className="text-blue-300 text-sm">Bootcamp Graduate</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-blue-100 mb-4 italic">
                      "The dependency mapping feature is incredible. It made complex projects feel manageable."
                    </p>
                    <div>
                      <p className="font-semibold">Elena Rodriguez</p>
                      <p className="text-blue-300 text-sm">Career Changer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final CTA Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your First Project?</h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join Code Compass today and start building projects with confidence
                </p>
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-xl px-8 py-4 text-lg">
                    Get Started Free
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <Modal
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        title="Code Compass Demo"
        size="xl"
      >
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Demo video would be embedded here
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Showing file structure visualization, interactive tooltips, and code flow explanations
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};