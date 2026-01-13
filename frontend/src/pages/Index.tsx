import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import { Briefcase, Users, DollarSign } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to GigFlow
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            A mini-freelance marketplace where clients post jobs and freelancers bid on them.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/gigs">
              <Button size="lg">Browse Gigs</Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <Button size="lg" variant="outline">Get Started</Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Post Jobs</h3>
            <p className="text-muted-foreground text-sm">
              Create job listings with title, description, and budget
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Receive Bids</h3>
            <p className="text-muted-foreground text-sm">
              Freelancers submit proposals with their price and message
            </p>
          </div>
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
              <DollarSign className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Hire Talent</h3>
            <p className="text-muted-foreground text-sm">
              Review bids and hire the best freelancer for your project
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
