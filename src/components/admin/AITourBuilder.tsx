import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Plus, Trash2, X, Upload, ArrowLeft } from "lucide-react";
import { ImageUpload, GalleryUpload } from "@/components/admin/ImageUpload";

interface AITourBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface ItineraryDay {
  day_number: number;
  title: string;
  description: string;
}

const AITourBuilder = ({ open, onOpenChange, onSuccess }: AITourBuilderProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Step 1 fields
  const [prompt, setPrompt] = useState("");
  const [category, setCategory] = useState("Domestic");
  const [hotelType, setHotelType] = useState("Budget");
  const [startCity, setStartCity] = useState("Kolkata");
  const [durationDays, setDurationDays] = useState(5);
  const [targetPrice, setTargetPrice] = useState("");
  const [useUnsplash, setUseUnsplash] = useState(true);

  // Step 2 fields (generated)
  const [formData, setFormData] = useState({
    title: "", slug: "", destination: "", category: "Domestic",
    duration_days: 5, start_city: "Kolkata", original_price_inr: 0,
    discounted_price_inr: 0, best_season: "", hotel_type: "Budget",
    transport: "", overview: "", hero_image_url: "", is_featured: false, is_active: false,
  });
  const [inclusionsText, setInclusionsText] = useState("");
  const [exclusionsText, setExclusionsText] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: "Error", description: "Please enter a prompt", variant: "destructive" });
      return;
    }

    setGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-tour`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            prompt, category, hotel_type: hotelType,
            start_city: startCity, duration_days: durationDays,
            target_price: targetPrice || undefined, use_unsplash: useUnsplash,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed");

      const { tour, images } = data;

      setFormData({
        title: tour.title || "",
        slug: tour.slug || "",
        destination: tour.destination || "",
        category: tour.category || category,
        duration_days: tour.duration_days || durationDays,
        start_city: tour.start_city || startCity,
        original_price_inr: tour.original_price_inr || 0,
        discounted_price_inr: tour.discounted_price_inr || 0,
        best_season: tour.best_season || "",
        hotel_type: tour.hotel_type || hotelType,
        transport: tour.transport || "",
        overview: tour.overview || "",
        hero_image_url: images?.hero?.url || "",
        is_featured: false,
        is_active: false,
      });
      setInclusionsText((tour.inclusions || []).join("\n"));
      setExclusionsText((tour.exclusions || []).join("\n"));
      setItinerary(
        (tour.itinerary || []).map((d: any, i: number) => ({
          day_number: d.day_number || i + 1,
          title: d.title || "",
          description: d.description || "",
        }))
      );
      setGalleryUrls((images?.gallery || []).map((img: any) => img.url).filter(Boolean));

      setStep(2);
      toast({ title: "Draft Generated!", description: "Review and edit the tour details below." });
    } catch (err: any) {
      toast({ title: "Generation Failed", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    try {
      const tourData = {
        ...formData,
        inclusions: inclusionsText.split("\n").filter(Boolean),
        exclusions: exclusionsText.split("\n").filter(Boolean),
        gallery_images: galleryUrls.filter(Boolean),
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        is_active: publish,
        ai_generated: true,
      };

      const { data, error } = await supabase
        .from("tours")
        .insert(tourData)
        .select()
        .single();

      if (error) throw error;

      if (itinerary.length > 0 && data) {
        await supabase.from("itinerary_days").insert(
          itinerary.map((day) => ({
            tour_id: data.id,
            day_number: day.day_number,
            title: day.title,
            description: day.description,
          }))
        );
      }

      toast({
        title: publish ? "Tour Published!" : "Draft Saved!",
        description: publish ? "Tour is now live." : "Tour saved as draft (inactive).",
      });
      resetAndClose();
      onSuccess();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setPrompt("");
    setCategory("Domestic");
    setHotelType("Budget");
    setStartCity("Kolkata");
    setDurationDays(5);
    setTargetPrice("");
    setUseUnsplash(true);
    onOpenChange(false);
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
    setItinerary(itinerary.filter((_, i) => i !== index).map((d, i) => ({ ...d, day_number: i + 1 })));
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Tour Builder
            {step === 2 && (
              <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="ml-4">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Prompt
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Describe the tour you want to create *</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="e.g., A 7-day Kashmir tour with houseboat stay in Dal Lake, Gulmarg skiing, Pahalgam valley tour. Budget-friendly for families from Kolkata."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Domestic">Domestic</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                    <SelectItem value="Pilgrimage">Pilgrimage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Hotel Type</Label>
                <Select value={hotelType} onValueChange={setHotelType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Budget">Budget</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Start City</Label>
                <Input value={startCity} onChange={(e) => setStartCity(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration (Days)</Label>
                <Input type="number" min={1} value={durationDays} onChange={(e) => setDurationDays(parseInt(e.target.value) || 1)} />
              </div>
              <div className="space-y-2">
                <Label>Target Price Range (₹, optional)</Label>
                <Input value={targetPrice} onChange={(e) => setTargetPrice(e.target.value)} placeholder="e.g., 15000" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={useUnsplash} onCheckedChange={setUseUnsplash} />
              <Label>Generate images using Unsplash</Label>
            </div>

            <Button onClick={handleGenerate} disabled={generating} className="w-full" size="lg">
              {generating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Tour Draft...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Generate Tour Draft</>
              )}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tour Name *</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Destination *</Label>
                <Input value={formData.destination} onChange={(e) => setFormData({ ...formData, destination: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Domestic">Domestic</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                    <SelectItem value="Pilgrimage">Pilgrimage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duration (Days)</Label>
                <Input type="number" min={1} value={formData.duration_days} onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) || 1 })} />
              </div>
              <div className="space-y-2">
                <Label>Start City</Label>
                <Input value={formData.start_city} onChange={(e) => setFormData({ ...formData, start_city: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Regular Price (₹)</Label>
                <Input type="number" min={0} value={formData.original_price_inr} onChange={(e) => setFormData({ ...formData, original_price_inr: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Offer Price (₹)</Label>
                <Input type="number" min={0} value={formData.discounted_price_inr} onChange={(e) => setFormData({ ...formData, discounted_price_inr: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="space-y-2">
                <Label>Best Season</Label>
                <Input value={formData.best_season} onChange={(e) => setFormData({ ...formData, best_season: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Hotel Type</Label>
                <Select value={formData.hotel_type} onValueChange={(v) => setFormData({ ...formData, hotel_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
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
                <Input value={formData.transport} onChange={(e) => setFormData({ ...formData, transport: e.target.value })} />
              </div>
              <ImageUpload
                label="Hero Image"
                value={formData.hero_image_url}
                onChange={(url) => setFormData({ ...formData, hero_image_url: url })}
                folder="hero"
              />
            </div>

            <div className="space-y-2">
              <Label>Overview</Label>
              <Textarea value={formData.overview} onChange={(e) => setFormData({ ...formData, overview: e.target.value })} rows={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Inclusions (one per line)</Label>
                <Textarea value={inclusionsText} onChange={(e) => setInclusionsText(e.target.value)} rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Exclusions (one per line)</Label>
                <Textarea value={exclusionsText} onChange={(e) => setExclusionsText(e.target.value)} rows={4} />
              </div>
            </div>

            <GalleryUpload label="Gallery Images" urls={galleryUrls} onChange={setGalleryUrls} />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Day-by-Day Itinerary</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItineraryDay}>
                  <Plus className="w-4 h-4 mr-1" /> Add Day
                </Button>
              </div>
              {itinerary.map((day, index) => (
                <Card key={index}>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Day {day.day_number}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeItineraryDay(index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <Input placeholder="Day title" value={day.title} onChange={(e) => updateItineraryDay(index, "title", e.target.value)} />
                    <Textarea placeholder="Day description..." value={day.description} onChange={(e) => updateItineraryDay(index, "description", e.target.value)} rows={2} />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={formData.is_featured} onCheckedChange={(v) => setFormData({ ...formData, is_featured: v })} />
                <Label>Featured Tour</Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={resetAndClose}>Cancel</Button>
              <Button type="button" variant="secondary" onClick={() => handleSave(false)} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Save as Draft
              </Button>
              <Button type="button" onClick={() => handleSave(true)} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Review & Publish
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AITourBuilder;
