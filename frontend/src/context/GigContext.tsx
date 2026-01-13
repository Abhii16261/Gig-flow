import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Gig, Bid } from '@/types';

interface GigContextType {
  gigs: Gig[];
  bids: Bid[];
  createGig: (gig: Omit<Gig, 'id' | 'createdAt' | 'status'>) => void;
  submitBid: (bid: Omit<Bid, 'id' | 'createdAt' | 'status'>) => void;
  hireBid: (bidId: string) => void;
  getGigBids: (gigId: string) => Bid[];
  getUserGigs: (userId: string) => Gig[];
  getUserBids: (userId: string) => Bid[];
}

const GigContext = createContext<GigContextType | undefined>(undefined);

export const GigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gigs, setGigs] = useState<Gig[]>(() => {
    const stored = localStorage.getItem('gigflow_gigs');
    return stored ? JSON.parse(stored) : [];
  });

  const [bids, setBids] = useState<Bid[]>(() => {
    const stored = localStorage.getItem('gigflow_bids');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('gigflow_gigs', JSON.stringify(gigs));
  }, [gigs]);

  useEffect(() => {
    localStorage.setItem('gigflow_bids', JSON.stringify(bids));
  }, [bids]);

  const createGig = (gigData: Omit<Gig, 'id' | 'createdAt' | 'status'>) => {
    const newGig: Gig = {
      ...gigData,
      id: crypto.randomUUID(),
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setGigs((prev) => [newGig, ...prev]);
  };

  const submitBid = (bidData: Omit<Bid, 'id' | 'createdAt' | 'status'>) => {
    const newBid: Bid = {
      ...bidData,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setBids((prev) => [...prev, newBid]);
  };

  const hireBid = (bidId: string) => {
    const bid = bids.find((b) => b.id === bidId);
    if (!bid) return;

    setBids((prev) =>
      prev.map((b) => {
        if (b.id === bidId) {
          return { ...b, status: 'hired' };
        }
        if (b.gigId === bid.gigId && b.id !== bidId) {
          return { ...b, status: 'rejected' };
        }
        return b;
      })
    );

    setGigs((prev) =>
      prev.map((g) => (g.id === bid.gigId ? { ...g, status: 'assigned' } : g))
    );
  };

  const getGigBids = (gigId: string) => bids.filter((b) => b.gigId === gigId);
  const getUserGigs = (userId: string) => gigs.filter((g) => g.ownerId === userId);
  const getUserBids = (userId: string) => bids.filter((b) => b.freelancerId === userId);

  return (
    <GigContext.Provider
      value={{ gigs, bids, createGig, submitBid, hireBid, getGigBids, getUserGigs, getUserBids }}
    >
      {children}
    </GigContext.Provider>
  );
};

export const useGigs = () => {
  const context = useContext(GigContext);
  if (!context) {
    throw new Error('useGigs must be used within a GigProvider');
  }
  return context;
};
