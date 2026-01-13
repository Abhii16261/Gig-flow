import { useNavigate } from 'react-router-dom';
import { useGigs } from '@/context/GigContext';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GigCard from '@/components/GigCard';
import Header from '@/components/Header';
import { Briefcase, Send, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { getUserGigs, getUserBids, gigs } = useGigs();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground mb-4">Please login to view your dashboard</p>
          <Button onClick={() => navigate('/login')}>Login</Button>
        </main>
      </div>
    );
  }

  const myGigs = getUserGigs(user!.id);
  const myBids = getUserBids(user!.id);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'hired':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <Tabs defaultValue="my-gigs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="my-gigs" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              My Gigs ({myGigs.length})
            </TabsTrigger>
            <TabsTrigger value="my-bids" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              My Bids ({myBids.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-gigs">
            {myGigs.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground mb-4">You haven't posted any gigs yet</p>
                  <Button onClick={() => navigate('/post-gig')}>Post Your First Gig</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {myGigs.map((gig) => (
                  <GigCard key={gig.id} gig={gig} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-bids">
            {myBids.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-muted-foreground mb-4">You haven't submitted any bids yet</p>
                  <Button onClick={() => navigate('/gigs')}>Browse Gigs</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {myBids.map((bid) => {
                  const gig = gigs.find((g) => g.id === bid.gigId);
                  return (
                    <Card key={bid.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/gigs/${bid.gigId}`)}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{gig?.title || 'Unknown Gig'}</CardTitle>
                          <Badge variant={getStatusVariant(bid.status)}>{bid.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-2">{bid.message}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">${bid.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
