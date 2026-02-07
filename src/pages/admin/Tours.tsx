import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration_days: number;
  start_city: string;
  category: string;
  best_season: string | null;
  original_price_inr: number;
  discounted_price_inr: number;
  overview: string | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  transport: string | null;
  hotel_type: string | null;
  hero_image_url: string | null;
  gallery_images: string[] | null;
  is_featured: boolean | null;
  is_active: boolean | null;
}

interface ItineraryDay {
  day_number: number;
  title: string;
  description: string;
}

const defaultTour = {
  title: "",
  slug: "",
  destination: "",
  duration_days: 3,
  start_city: "Rampurhat",
  category: "Domestic",
  best_season: "",
  original_price_inr: 0,
  discounted_price_inr: 0,
  overview: "",
  inclusions: [] as string[],
  exclusions: [] as string[],
  transport: "",
  hotel_type: "Budget",
  hero_image_url: "",
  gallery_images: [] as string[],
  is_featured: false,
  is_active: true,
};

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState(defaultTour);
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [saving, setSaving] = useState(false);
  const [inclusionsText, setInclusionsText] = useState("");
  const [exclusionsText, setExclusionsText] = useState("");
  const [galleryText, setGalleryText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const { data, error } = await supabase
      .from("tours")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setTours(data || []);
    }
    setLoading(false);
  };

  const fetchItinerary = async (tourId: string) => {
    const { data } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("tour_id", tourId)
      .order("day_number");
    
    if (data) {
      setItinerary(data.map(d => ({
        day_number: d.day_number,
        title: d.title,
        description: d.description || "",
      })));
    }
  };

  const openCreateDialog = () => {
    setEditingTour(null);
    setFormData(defaultTour);
    setItinerary([{ day_number: 1, title: "", description: "" }]);
    setInclusionsText("");
    setExclusionsText("");
    setGalleryText("");
    setIsDialogOpen(true);
  };

  const openEditDialog = async (tour: Tour) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      slug: tour.slug,
      destination: tour.destination,
      duration_days: tour.duration_days,
      start_city: tour.start_city,
      category: tour.category,
      best_season: tour.best_season || "",
      original_price_inr: tour.original_price_inr,
      discounted_price_inr: tour.discounted_price_inr,
      overview: tour.overview || "",
      inclusions: tour.inclusions || [],
      exclusions: tour.exclusions || [],
      transport: tour.transport || "",
      hotel_type: tour.hotel_type || "Budget",
      hero_image_url: tour.hero_image_url || "",
      gallery_images: tour.gallery_images || [],
      is_featured: tour.is_featured || false,
      is_active: tour.is_active !== false,
    });
    setInclusionsText((tour.inclusions || []).join("\n"));
    setExclusionsText((tour.exclusions || []).join("\n"));
    setGalleryText((tour.gallery_images || []).join("\n"));
    await fetchItinerary(tour.id);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const tourData = {
      ...formData,
      inclusions: inclusionsText.split("\n").filter(Boolean),
      exclusions: exclusionsText.split("\n").filter(Boolean),
      gallery_images: galleryText.split("\n").filter(Boolean),
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    };

    try {
      if (editingTour) {
        const { error } = await supabase
          .from("tours")
          .update(tourData)
          .eq("id", editingTour.id);

        if (error) throw error;

        // Update itinerary
        await supabase.from("itinerary_days").delete().eq("tour_id", editingTour.id);
        if (itinerary.length > 0) {
          await supabase.from("itinerary_days").insert(
            itinerary.map(day => ({
              tour_id: editingTour.id,
              day_number: day.day_number,
              title: day.title,
              description: day.description,
            }))
          );
        }

        toast({ title: "Success", description: "Tour updated successfully" });
      } else {
        const { data, error } = await supabase
          .from("tours")
          .insert(tourData)
          .select()
          .single();

        if (error) throw error;

        // Add itinerary
        if (itinerary.length > 0 && data) {
          await supabase.from("itinerary_days").insert(
            itinerary.map(day => ({
              tour_id: data.id,
              day_number: day.day_number,
              title: day.title,
              description: day.description,
            }))
          );
        }

        toast({ title: "Success", description: "Tour created successfully" });
      }

      setIsDialogOpen(false);
      fetchTours();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (tour: Tour) => {
    const { error } = await supabase
      .from("tours")
      .update({ is_active: !tour.is_active })
      .eq("id", tour.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      fetchTours();
    }
  };

  const deleteTour = async (tour: Tour) => {
    if (!confirm(`Delete "${tour.title}"? This cannot be undone.`)) return;

    const { error } = await supabase.from("tours").delete().eq("id", tour.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Tour deleted successfully" });
      fetchTours();
    }
  };

  const addItineraryDay = () => {
    setItinerary([...itinerary, { day_number: itinerary.length + 1, title: "", description: "" }]);
  };

  const updateItineraryDay = (index: number, field: keyof ItineraryDay, value: string | number) => {
    const updated = [...itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setItinerary(updated);
  };

  const removeItineraryDay = (index: number) => {
    const updated = itinerary.filter((_, i) => i !== index);
    setItinerary(updated.map((day, i) => ({ ...day, day_number: i + 1 })));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tour Packages</h1>
          <p className="text-muted-foreground">Manage your tour packages</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Tour
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTour ? "Edit Tour" : "Create New Tour"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tour Name *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated if empty"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Destination *</Label>
                  <Input
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Domestic">Domestic</SelectItem>
                      <SelectItem value="International">International</SelectItem>
                      <SelectItem value="Pilgrimage">Pilgrimage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration (Days) *</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start City</Label>
                  <Input
                    value={formData.start_city}
                    onChange={(e) => setFormData({ ...formData, start_city: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Regular Price (₹) *</Label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.original_price_inr}
                    onChange={(e) => setFormData({ ...formData, original_price_inr: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Offer Price (₹) *</Label>
                  <Input
                    type="number"
                    min={0}
                    value={formData.discounted_price_inr}
                    onChange={(e) => setFormData({ ...formData, discounted_price_inr: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Best Season</Label>
                  <Input
                    value={formData.best_season}
                    onChange={(e) => setFormData({ ...formData, best_season: e.target.value })}
                    placeholder="e.g., March to October"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hotel Type</Label>
                  <Select value={formData.hotel_type} onValueChange={(v) => setFormData({ ...formData, hotel_type: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Budget">Budget</SelectItem>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Deluxe">Deluxe</SelectItem>
                      <SelectItem value="Luxury">Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Transport</Label>
                  <Input
                    value={formData.transport}
                    onChange={(e) => setFormData({ ...formData, transport: e.target.value })}
                    placeholder="e.g., Flight + Private Cab"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hero Image URL</Label>
                  <Input
                    value={formData.hero_image_url}
                    onChange={(e) => setFormData({ ...formData, hero_image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Overview</Label>
                <Textarea
                  value={formData.overview}
                  onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Inclusions (one per line)</Label>
                  <Textarea
                    value={inclusionsText}
                    onChange={(e) => setInclusionsText(e.target.value)}
                    rows={4}
                    placeholder="Hotel accommodation&#10;Daily breakfast&#10;All transfers"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exclusions (one per line)</Label>
                  <Textarea
                    value={exclusionsText}
                    onChange={(e) => setExclusionsText(e.target.value)}
                    rows={4}
                    placeholder="Lunch & dinner&#10;Personal expenses&#10;Tips"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gallery Images (URLs, one per line)</Label>
                <Textarea
                  value={galleryText}
                  onChange={(e) => setGalleryText(e.target.value)}
                  rows={3}
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Day-by-Day Itinerary</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Day
                  </Button>
                </div>
                {itinerary.map((day, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Day {day.day_number}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItineraryDay(index)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Day title (e.g., Arrival in Srinagar)"
                        value={day.title}
                        onChange={(e) => updateItineraryDay(index, "title", e.target.value)}
                      />
                      <Textarea
                        placeholder="Day description..."
                        value={day.description}
                        onChange={(e) => updateItineraryDay(index, "description", e.target.value)}
                        rows={2}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_featured}
                    onCheckedChange={(v) => setFormData({ ...formData, is_featured: v })}
                  />
                  <Label>Featured Tour</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
                  />
                  <Label>Active</Label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingTour ? "Update Tour" : "Create Tour"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour Name</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell className="font-medium">
                    {tour.title}
                    {tour.is_featured && (
                      <Badge variant="secondary" className="ml-2">Featured</Badge>
                    )}
                  </TableCell>
                  <TableCell>{tour.destination}</TableCell>
                  <TableCell>{tour.category}</TableCell>
                  <TableCell>{tour.duration_days} Days</TableCell>
                  <TableCell>
                    <span className="line-through text-muted-foreground text-xs mr-1">
                      ₹{tour.original_price_inr.toLocaleString()}
                    </span>
                    <span className="font-medium">₹{tour.discounted_price_inr.toLocaleString()}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={tour.is_active ? "default" : "outline"}>
                      {tour.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleActive(tour)}>
                        {tour.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(tour)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteTour(tour)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {tours.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No tours found. Create your first tour package.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tours;
