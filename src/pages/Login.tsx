
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Lock, AlertTriangle, Server, Database, FileText, LogIn, Laptop, BarChart3 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthPopoverOpen, setIsAuthPopoverOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    if (email && password) {
      navigate('/dashboard');
      toast({
        title: "Success",
        description: "Logged in successfully"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Top Navigation Bar */}
      <header className="w-full p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-blue-500 mr-2" />
          <h1 className="text-xl font-bold text-white">SecureGuard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Popover open={isAuthPopoverOpen} onOpenChange={setIsAuthPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="text-white border-gray-700 bg-purple-600 hover:bg-purple-700">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <Card className="border-0 shadow-none">
                <CardContent className="p-4">
                  <h2 className="text-lg font-bold mb-4">Sign in to your account</h2>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Sign In</Button>
                  </form>
                  <div className="text-center text-sm mt-4">
                    <span className="text-gray-500">Don't have an account?</span>{" "}
                    <Link 
                      to="/register" 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                      onClick={() => setIsAuthPopoverOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          <Link to="/register">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Register
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 px-6 py-12 gap-8">
        {/* Left side: Hero section */}
        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            <div className="inline-block bg-blue-500/20 px-4 py-2 rounded-full text-blue-400 font-medium text-sm">
              Advanced Ransomware Protection
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Protect Your Business from Ransomware Attacks
            </h1>
            <p className="text-xl text-gray-300">
              Our intelligent system detects and prevents ransomware threats before they can encrypt your valuable data.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">99.8%</div>
                <div className="text-gray-400 text-sm">Detection Rate</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">
                  <span className="text-red-400">-85%</span>
                </div>
                <div className="text-gray-400 text-sm">Ransomware Risk</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm">Active Monitoring</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side: Features and stats */}
        <div className="flex flex-col space-y-8">
          {/* Top image */}
          <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-blue-900/30 border border-blue-900/50">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Cybersecurity Protection" 
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>
              <div className="absolute inset-0 p-8 flex flex-col justify-center text-white">
                <h3 className="text-2xl font-bold mb-2">Real-time Threat Analytics</h3>
                <p className="text-gray-300">Advanced visualization of attack patterns and network behavior</p>
              </div>
            </div>
          </div>
          
          {/* Key features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
              <div className="mb-3 flex">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Advanced Protection</h3>
              <p className="text-gray-400 text-sm">Early detection of encryption attempts with behavior-based analysis</p>
            </div>
            
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
              <div className="mb-3 flex">
                <div className="bg-green-500/20 p-2 rounded-lg">
                  <Database className="h-6 w-6 text-green-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Backups</h3>
              <p className="text-gray-400 text-sm">Automated immutable backups to ensure rapid recovery after incidents</p>
            </div>
            
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
              <div className="mb-3 flex">
                <div className="bg-yellow-500/20 p-2 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Early Warning</h3>
              <p className="text-gray-400 text-sm">Proactive alerts about suspicious activities before damage occurs</p>
            </div>
            
            <div className="bg-gray-800/50 p-5 rounded-xl border border-gray-700">
              <div className="mb-3 flex">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Detailed Analytics</h3>
              <p className="text-gray-400 text-sm">Comprehensive reporting and threat intelligence to improve security</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Threat information section */}
      <div className="bg-gray-900 py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6">Latest Ransomware Threats</h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-900/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">BlackCat Ransomware</h3>
                  </div>
                  <p className="text-gray-300 text-sm">A sophisticated ransomware variant targeting critical infrastructure with double-extortion techniques.</p>
                </div>
                
                <div className="p-4 bg-orange-500/10 border border-orange-900/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">LockBit 3.0</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Ransomware-as-a-Service platform with advanced evasion capabilities targeting Windows environments.</p>
                </div>
                
                <div className="p-4 bg-yellow-500/10 border border-yellow-900/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                    <h3 className="text-lg font-semibold text-white">Cl0p Ransomware</h3>
                  </div>
                  <p className="text-gray-300 text-sm">Targets MOVEit Transfer vulnerabilities to exfiltrate and encrypt sensitive business data.</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Ransomware Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Ransom Payment</span>
                    <span className="text-white font-semibold">$1.5M</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Attacks Targeting SMBs</span>
                    <span className="text-white font-semibold">71%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Recovery Rate Without Paying</span>
                    <span className="text-white font-semibold">65%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Annual Increase in Attacks</span>
                    <span className="text-white font-semibold">150%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-white font-semibold">SecureGuard</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2023 SecureGuard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
