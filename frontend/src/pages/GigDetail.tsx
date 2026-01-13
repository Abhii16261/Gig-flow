import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGigs } from '@/context/GigContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import BidCard from '@/components/BidCard';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { DollarSign, Calendar, User } from 'lucide-react';

const GigDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { gigs, getGigBids, submitBid, hireBid } = useGigs();
  const { user, isAuthenticated } = useAuth();
  
  const [bidMessage, setBidMessage] = useState('');
  const [bidPrice, setBidPrice] = useState('');

  const gig = gigs.find((g) => g.id === id);
  const gigBids = id ? getGigBids(id) : [];
  const isOwner = user?.id === gig?.ownerId;
  const hasAlreadyBid = gigBids.some((b) => b.freelancerId === user?.id);

  if (!gig) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Gig not found</p>
          <Button onClick={() => navigate('/gigs')} className="mt-4">
            Back to Gigs
          </Button>
        </main>
      </div>
    );
  }

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to submit a bid');
      return;
    }

    submitBid({
      gigId: gig.id,
      freelancerId: user.id,
      freelancerName: user.name,
      message: bidMessage,
      price: parseFloat(bidPrice),
    });

    setBidMessage('');
    setBidPrice('');
    toast.success('Bid submitted successfully');
  };

  const handleHire = (bidId: string) => {
    hireBid(bidId);
    toast.success('Freelancer hired successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-2xl">{gig.title}</CardTitle>
                <Badge variant={gig.status === 'open' ? 'default' : 'secondary'}>
                  {gig.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 whitespace-pre-wrap">
                {gig.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Budget:</span>
                  <span className="font-medium text-foreground">${gig.budget}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>Posted by:</span>
                  <span className="font-medium text-foreground">{gig.ownerName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(gig.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {isAuthenticated && !isOwner && gig.status === 'open' && !hasAlreadyBid && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Submit Your Bid</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitBid} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Your Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={bidPrice}
                      onChange={(e) => setBidPrice(e.target.value)}
                      required
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={bidMessage}
                      onChange={(e) => setBidMessage(e.target.value)}
                      required
                      rows={4}
                      placeholder="Describe why you're the best fit for this gig..."
                    />
                  </div>
                  <Button type="submit">Submit Bid</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {hasAlreadyBid && (
            <Card className="mb-8 border-primary">
              <CardContent className="pt-4">
                <p className="text-center text-muted-foreground">
                  You have already submitted a bid for this gig
                </p>
              </CardContent>
            </Card>
          )}

          {(isOwner || gigBids.length > 0) && (
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Bids ({gigBids.length})
              </h2>
              {gigBids.length === 0 ? (
                <p className="text-muted-foreground">No bids yet</p>
              ) : (
                <div className="space-y-4">
                  {gigBids.map((bid) => (
                    <BidCard
                      key={bid.id}
                      bid={bid}
                      isOwner={isOwner}
                      gigStatus={gig.status}
                      onHire={handleHire}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GigDetail;
