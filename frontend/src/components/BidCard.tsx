import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bid } from '@/types';
import { DollarSign, User, Calendar } from 'lucide-react';

interface BidCardProps {
  bid: Bid;
  isOwner: boolean;
  gigStatus: 'open' | 'assigned';
  onHire?: (bidId: string) => void;
}

const BidCard: React.FC<BidCardProps> = ({ bid, isOwner, gigStatus, onHire }) => {
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
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{bid.freelancerName}</span>
              <Badge variant={getStatusVariant(bid.status)}>{bid.status}</Badge>
            </div>
            <p className="text-muted-foreground mb-3">{bid.message}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-foreground">${bid.price}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(bid.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          {isOwner && gigStatus === 'open' && bid.status === 'pending' && onHire && (
            <Button onClick={() => onHire(bid.id)}>Hire</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BidCard;
