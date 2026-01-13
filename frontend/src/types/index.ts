export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  ownerId: string;
  ownerName: string;
  status: 'open' | 'assigned';
  createdAt: string;
}

export interface Bid {
  id: string;
  gigId: string;
  freelancerId: string;
  freelancerName: string;
  message: string;
  price: number;
  status: 'pending' | 'hired' | 'rejected';
  createdAt: string;
}
