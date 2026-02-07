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
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  destination: string | null;
  avatar_url: string | null;
  is_active: boolean | null;
  created_at: string;
}

const defaultTestimonial = {
  name: "",
  text: "",
  rating: 5,
  destination: "",
  avatar_url: "",
  is_active: true,
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState(defaultTestimonial);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    setFormData(defaultTestimonial);
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      text: testimonial.text,
      rating: testimonial.rating,
      destination: testimonial.destination || "",
      avatar_url: testimonial.avatar_url || "",
      is_active: testimonial.is_active !== false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingTestimonial) {
        const { error } = await supabase
          .from("testimonials")
          .update(formData)
          .eq("id", editingTestimonial.id);

        if (error) throw error;
        toast({ title: "Success", description: "Testimonial updated successfully" });
      } else {
        const { error } = await supabase
          .from("testimonials")
          .insert(formData);

        if (error) throw error;
        toast({ title: "Success", description: "Testimonial created successfully" });
      }

      setIsDialogOpen(false);
      fetchTestimonials();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (testimonial: Testimonial) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_active: !testimonial.is_active })
      .eq("id", testimonial.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      fetchTestimonials();
    }
  };

  const deleteTestimonial = async (testimonial: Testimonial) => {
    if (!confirm(`Delete testimonial from "${testimonial.name}"? This cannot be undone.`)) return;

    const { error } = await supabase.from("testimonials").delete().eq("id", testimonial.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Testimonial deleted successfully" });
      fetchTestimonials();
    }
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
          <h1 className="text-2xl font-bold">Reviews / Testimonials</h1>
          <p className="text-muted-foreground">Manage customer reviews and testimonials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Review
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? "Edit Review" : "Add New Review"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Reviewer Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Review Text *</Label>
                <Textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Star Rating (1-5) *</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tour / Destination</Label>
                <Input
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="e.g., Kashmir, Ladakh, Dubai"
                />
              </div>

              <div className="space-y-2">
                <Label>Reviewer Photo URL</Label>
                <Input
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
                {formData.avatar_url && (
                  <img
                    src={formData.avatar_url}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover mt-2"
                  />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label>Published (visible on website)</Label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {editingTestimonial ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {testimonials.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No testimonials yet</p>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Review
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reviewer</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {testimonial.avatar_url ? (
                        <img
                          src={testimonial.avatar_url}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-semibold text-primary">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <span className="font-medium">{testimonial.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{testimonial.text}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{testimonial.destination || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={testimonial.is_active ? "default" : "secondary"}>
                      {testimonial.is_active ? "Published" : "Hidden"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleActive(testimonial)}>
                        {testimonial.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(testimonial)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(testimonial)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

export default Testimonials;
