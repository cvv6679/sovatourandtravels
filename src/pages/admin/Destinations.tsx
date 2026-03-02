import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Image, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageUpload, GalleryUpload } from "@/components/admin/ImageUpload";

interface TopSpot {
  name: string;
  description: string;
  image: string;
}

interface DestinationRow {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  card_image: string | null;
  hero_image: string | null;
  best_time: string;
  ideal_duration: string;
  overview: string;
  top_spots: TopSpot[];
  things_to_do: string[];
  travel_tips: string[];
  gallery: string[];
  seo_title: string;
  seo_description: string;
  content: string;
  is_active: boolean;
  sort_order: number;
}

const defaultForm = {
  name: "",
  slug: "",
  tagline: "",
  card_image: "",
  hero_image: "",
  best_time: "",
  ideal_duration: "",
  overview: "",
  seo_title: "",
  seo_description: "",
  content: "",
  is_active: true,
  sort_order: 0,
};

const Destinations = () => {
  const [destinations, setDestinations] = useState<DestinationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editing, setEditing] = useState<DestinationRow | null>(null);
  const [formData, setFormData] = useState(defaultForm);
  const [topSpots, setTopSpots] = useState<TopSpot[]>([]);
  const [thingsText, setThingsText] = useState("");
  const [tipsText, setTipsText] = useState("");
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchDestinations(); }, []);

  const fetchDestinations = async () => {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setDestinations((data || []) as unknown as DestinationRow[]);
    }
    setLoading(false);
  };

  const openCreate = () => {
    setEditing(null);
    setFormData(defaultForm);
    setTopSpots([{ name: "", description: "", image: "" }]);
    setThingsText("");
    setTipsText("");
    setGalleryUrls([]);
    setIsDialogOpen(true);
  };

  const openEdit = (dest: DestinationRow) => {
    setEditing(dest);
    setFormData({
      name: dest.name,
      slug: dest.slug,
      tagline: dest.tagline,
      card_image: dest.card_image || "",
      hero_image: dest.hero_image || "",
      best_time: dest.best_time || "",
      ideal_duration: dest.ideal_duration || "",
      overview: dest.overview || "",
      seo_title: dest.seo_title || "",
      seo_description: dest.seo_description || "",
      content: dest.content || "",
      is_active: dest.is_active !== false,
      sort_order: dest.sort_order || 0,
    });
    setTopSpots(dest.top_spots?.length ? dest.top_spots : [{ name: "", description: "", image: "" }]);
    setThingsText((dest.things_to_do || []).join("\n"));
    setTipsText((dest.travel_tips || []).join("\n"));
    setGalleryUrls(dest.gallery || []);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      tagline: formData.tagline,
      card_image: formData.card_image || null,
      hero_image: formData.hero_image || null,
      best_time: formData.best_time,
      ideal_duration: formData.ideal_duration,
      overview: formData.overview,
      top_spots: JSON.parse(JSON.stringify(topSpots.filter(s => s.name))),
      things_to_do: thingsText.split("\n").filter(Boolean),
      travel_tips: tipsText.split("\n").filter(Boolean),
      gallery: galleryUrls.filter(Boolean),
      seo_title: formData.seo_title,
      seo_description: formData.seo_description,
      content: formData.content,
      is_active: formData.is_active,
      sort_order: formData.sort_order,
    };

    try {
      if (editing) {
        const { error } = await supabase.from("destinations").update(payload).eq("id", editing.id);
        if (error) throw error;
        toast({ title: "Success", description: "Destination updated" });
      } else {
        const { error } = await supabase.from("destinations").insert(payload);
        if (error) throw error;
        toast({ title: "Success", description: "Destination created" });
      }
      setIsDialogOpen(false);
      fetchDestinations();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (dest: DestinationRow) => {
    const { error } = await supabase.from("destinations").update({ is_active: !dest.is_active }).eq("id", dest.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else fetchDestinations();
  };

  const deleteDest = async (dest: DestinationRow) => {
    if (!confirm(`Delete "${dest.name}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("destinations").delete().eq("id", dest.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); fetchDestinations(); }
  };

  const addSpot = () => setTopSpots([...topSpots, { name: "", description: "", image: "" }]);
  const updateSpot = (i: number, field: keyof TopSpot, value: string) => {
    const updated = [...topSpots];
    updated[i] = { ...updated[i], [field]: value };
    setTopSpots(updated);
  };
  const removeSpot = (i: number) => setTopSpots(topSpots.filter((_, idx) => idx !== i));

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Destination Guides</h1>
          <p className="text-muted-foreground">Manage destination pages with images, spots, tips & more</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}><Plus className="w-4 h-4 mr-2" />Add Destination</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Destination" : "Create Destination"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="auto-generated" />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input value={formData.tagline} onChange={e => setFormData({ ...formData, tagline: e.target.value })} placeholder="e.g. Sun, Sand & Culture" />
                </div>
                <div className="space-y-2">
                  <Label>Best Time to Visit</Label>
                  <Input value={formData.best_time} onChange={e => setFormData({ ...formData, best_time: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Ideal Duration</Label>
                  <Input value={formData.ideal_duration} onChange={e => setFormData({ ...formData, ideal_duration: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} />
                </div>
              </div>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ImageUpload label="Card Image (Thumbnail)" value={formData.card_image} onChange={url => setFormData({ ...formData, card_image: url })} folder="destinations" />
                <ImageUpload label="Hero Image (Banner)" value={formData.hero_image} onChange={url => setFormData({ ...formData, hero_image: url })} folder="destinations" />
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <Label>Overview</Label>
                <Textarea value={formData.overview} onChange={e => setFormData({ ...formData, overview: e.target.value })} rows={5} placeholder="Detailed description of the destination..." />
              </div>

              {/* Top Spots */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold flex items-center gap-2"><MapPin className="w-4 h-4" />Top Spots / Places</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addSpot}><Plus className="w-4 h-4 mr-1" />Add Spot</Button>
                </div>
                {topSpots.map((spot, i) => (
                  <Card key={i}>
                    <CardContent className="pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Spot {i + 1}</span>
                        {topSpots.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => removeSpot(i)}><Trash2 className="w-4 h-4 text-destructive" /></Button>}
                      </div>
                      <Input placeholder="Spot name" value={spot.name} onChange={e => updateSpot(i, "name", e.target.value)} />
                      <Input placeholder="Short description" value={spot.description} onChange={e => updateSpot(i, "description", e.target.value)} />
                      <ImageUpload label="Spot Image" value={spot.image} onChange={url => updateSpot(i, "image", url)} folder="destinations/spots" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Things to do & Tips */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Things To Do (one per line)</Label>
                  <Textarea value={thingsText} onChange={e => setThingsText(e.target.value)} rows={6} placeholder="Relax on the beach&#10;Explore old town&#10;Try local food" />
                </div>
                <div className="space-y-2">
                  <Label>Travel Tips (one per line)</Label>
                  <Textarea value={tipsText} onChange={e => setTipsText(e.target.value)} rows={6} placeholder="Carry sunscreen&#10;Book in advance&#10;Dress modestly at temples" />
                </div>
              </div>

              {/* Gallery */}
              <GalleryUpload label="Photo Gallery" urls={galleryUrls} onChange={setGalleryUrls} />

              {/* SEO */}
              <div className="space-y-4">
                <h3 className="font-semibold text-base">SEO Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>SEO Title</Label>
                    <Input value={formData.seo_title} onChange={e => setFormData({ ...formData, seo_title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>SEO Description</Label>
                    <Input value={formData.seo_description} onChange={e => setFormData({ ...formData, seo_description: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_active} onCheckedChange={v => setFormData({ ...formData, is_active: v })} />
                  <Label>Active (visible on website)</Label>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : editing ? "Update Destination" : "Create Destination"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Tagline</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Spots</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {destinations.map(dest => (
              <TableRow key={dest.id}>
                <TableCell className="font-medium">{dest.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{dest.tagline}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Image className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{(dest.gallery?.length || 0) + (dest.card_image ? 1 : 0) + (dest.hero_image ? 1 : 0)}</span>
                  </div>
                </TableCell>
                <TableCell>{dest.top_spots?.length || 0}</TableCell>
                <TableCell>
                  <Badge variant={dest.is_active ? "default" : "secondary"}>
                    {dest.is_active ? "Active" : "Hidden"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm" onClick={() => toggleActive(dest)} title={dest.is_active ? "Hide" : "Show"}>
                      {dest.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => openEdit(dest)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteDest(dest)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {destinations.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No destinations yet. Add your first one!</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Destinations;
