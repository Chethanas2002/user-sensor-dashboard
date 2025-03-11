
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Lock, AlertTriangle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Left side: Cybersecurity content */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Ransomware Defense System</h1>
          <p className="text-gray-300 text-lg mb-6">Secure your organization against evolving ransomware threats with real-time monitoring and advanced detection.</p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Shield className="h-8 w-8 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white">Advanced Protection</h3>
              <p className="text-gray-400">Our system monitors file activity patterns to detect and prevent ransomware encryption attempts before they spread.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <AlertTriangle className="h-8 w-8 text-yellow-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white">Early Warning</h3>
              <p className="text-gray-400">Get alerts about suspicious activities before they become critical security incidents.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <Lock className="h-8 w-8 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-white">Secure Dashboard</h3>
              <p className="text-gray-400">Role-based access controls ensure that only authorized personnel can view sensitive data and system settings.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 p-4 border border-gray-700 rounded-lg bg-gray-800/50">
          <h3 className="text-red-400 font-semibold flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" /> Ransomware Alert
          </h3>
          <p className="text-gray-300 text-sm">Ransomware attacks increased by 150% in the past year. The average ransom payment is now over $200,000 per incident.</p>
        </div>
      </div>
      
      {/* Right side: Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter">Welcome back</h1>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="text-center text-sm">
            <span className="text-gray-500">Don't have an account?</span>{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
