import { useState } from 'react';
import { useGigs } from '@/context/GigContext';
import { Input } from '@/components/ui/input';
import GigCard from '@/components/GigCard';
import Header from '@/components/Header';
import { Search } from 'lucide-react';

const Gigs = () => {
  const { gigs } = useGigs();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGigs = gigs.filter(
    (gig) =>
      gig.status === 'open' &&
      gig.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Gigs</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search gigs by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredGigs.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No gigs found. Be the first to post one!
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGigs.map((gig) => (
              <GigCard key={gig.id} gig={gig} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Gigs;
