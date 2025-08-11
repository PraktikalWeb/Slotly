import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Trash2, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Alert from "@/components/Alert";
import { type DtlcCenter } from "@shared/schema";

export default function ManageCentersPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCenterId, setSelectedCenterId] = useState<string>("");

  useEffect(() => {
    if (!user) {
      setLocation("/login");
    }
  }, [user, setLocation]);

  const { data: allCenters, isLoading: centersLoading } = useQuery({
    queryKey: ["/api/centers"],
  });

  const { data: userCenters, isLoading: userCentersLoading } = useQuery({
    queryKey: ["/api/user-centers", user?.id],
    enabled: !!user?.id,
  });

  const addCenterMutation = useMutation({
    mutationFn: async (centerId: string) => {
      return apiRequest("POST", "/api/user-centers", {
        userId: user!.id,
        centerId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-centers", user?.id] });
      toast({
        title: "Success",
        description: "Center added to your monitoring list",
      });
      setSelectedCenterId("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add center",
        variant: "destructive",
      });
    },
  });

  const removeCenterMutation = useMutation({
    mutationFn: async (centerId: string) => {
      return apiRequest("DELETE", `/api/user-centers/${user!.id}/${centerId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user-centers", user?.id] });
      toast({
        title: "Success",
        description: "Center removed from your monitoring list",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to remove center",
        variant: "destructive",
      });
    },
  });

  if (!user) {
    return null;
  }

  const handleAddCenter = () => {
    if (selectedCenterId) {
      addCenterMutation.mutate(selectedCenterId);
    }
  };

  const handleRemoveCenter = (centerId: string) => {
    removeCenterMutation.mutate(centerId);
  };

  // Get centers that are not already added by the user
  const availableCenters = allCenters?.filter((center: DtlcCenter) => 
    !userCenters?.some((uc: any) => uc.centerId === center.id)
  ) || [];

  const isLoading = centersLoading || userCentersLoading;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Manage DTLC Centers</h1>
          <p className="text-slate-600">Add or remove DTLC centers to monitor for available test slots.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Center */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2" size={20} />
                Add New Center
              </CardTitle>
              <CardDescription>
                Choose a DTLC center to monitor for available slots
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-slate-600">Loading centers...</p>
                </div>
              ) : availableCenters.length > 0 ? (
                <div className="space-y-4">
                  <Select value={selectedCenterId} onValueChange={setSelectedCenterId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a DTLC center" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCenters.map((center: DtlcCenter) => (
                        <SelectItem key={center.id} value={center.id}>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <p className="font-medium">{center.name}</p>
                              <p className="text-sm text-slate-500">{center.location}, {center.province}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={handleAddCenter}
                    disabled={!selectedCenterId || addCenterMutation.isPending}
                    className="w-full"
                  >
                    {addCenterMutation.isPending ? "Adding..." : "Add Center"}
                  </Button>
                </div>
              ) : (
                <Alert 
                  type="info" 
                  message="All available DTLC centers are already being monitored." 
                />
              )}
            </CardContent>
          </Card>

          {/* Current Centers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" size={20} />
                Your Monitored Centers
              </CardTitle>
              <CardDescription>
                {userCenters?.length || 0} centers currently being monitored
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-2 text-slate-600">Loading your centers...</p>
                </div>
              ) : userCenters && userCenters.length > 0 ? (
                <div className="space-y-4">
                  {userCenters.map((uc: any) => (
                    <div key={uc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h3 className="font-medium text-slate-900">{uc.center?.name}</h3>
                            <p className="text-sm text-slate-600">{uc.center?.location}, {uc.center?.province}</p>
                          </div>
                        </div>
                        <div className="flex items-center mt-2 space-x-3">
                          <Badge variant={uc.center?.available ? "default" : "secondary"}>
                            {uc.center?.available ? "Slots Available" : "No Slots"}
                          </Badge>
                          <div className="flex items-center text-xs text-slate-500">
                            <Clock size={12} className="mr-1" />
                            Last checked: {new Date(uc.center?.lastUpdated).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveCenter(uc.centerId)}
                        disabled={removeCenterMutation.isPending}
                        className="ml-4 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MapPin className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="mt-2 text-slate-600">No centers added yet</p>
                  <p className="text-sm text-slate-500">
                    Add your first DTLC center to start monitoring slots
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Real-time Availability */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Real-time Slot Availability</CardTitle>
            <CardDescription>
              Current availability status across all South African DTLC centers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-slate-600">Loading availability data...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allCenters?.map((center: DtlcCenter) => (
                  <div key={center.id} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{center.name}</h4>
                      <Badge variant={center.available ? "default" : "secondary"}>
                        {center.available ? "Available" : "Full"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{center.location}, {center.province}</p>
                    <div className="flex items-center mt-2 text-xs text-slate-500">
                      <Clock size={12} className="mr-1" />
                      Updated: {new Date(center.lastUpdated).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
