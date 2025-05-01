import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MapPin, Search } from 'lucide-react';

interface HospitalLocation {
  country: string;
  state: string;
  city: string;
  pincode: string;
}

interface HospitalFinderProps {
  onClose: () => void;
}

export function HospitalFinder({ onClose }: HospitalFinderProps) {
  const [location, setLocation] = useState<HospitalLocation>({
    country: '',
    state: '',
    city: '',
    pincode: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!location.country || !location.city) {
      toast({
        variant: "destructive",
        title: "Required Fields",
        description: "Please enter at least the country and city",
      });
      return;
    }

    const searchQuery = `hospitals in ${location.city}, ${location.state ? location.state + ', ' : ''}${location.country}`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleSearchUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Find Hospitals Near You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                placeholder="Enter country"
                value={location.country}
                onChange={(e) => setLocation(prev => ({ ...prev, country: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                placeholder="Enter state"
                value={location.state}
                onChange={(e) => setLocation(prev => ({ ...prev, state: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="Enter city"
                value={location.city}
                onChange={(e) => setLocation(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Postal/ZIP Code</Label>
              <Input
                id="pincode"
                placeholder="Enter postal code"
                value={location.pincode}
                onChange={(e) => setLocation(prev => ({ ...prev, pincode: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSearch} disabled={isSearching}>
              <Search className="h-4 w-4 mr-2" />
              Find Hospitals
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
