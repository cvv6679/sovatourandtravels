import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";

interface AIBlogBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AIBlogBuilder = ({ open, onOpenChange, onSuccess }: AIBlogBuilderProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Step 1
  const [prompt, setPrompt] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [includeBengali, setIncludeBengali] = useState(true);
  const [useUnsplash, setUseUnsplash] = useState(true);

  // Step 2
  const [formData, setFormData] = useState({
    title: "", slug: "", category: "", author: "Sova Tours",
    publish_date: new Date().toISOString().split("T")[0],
    featured_image_url: "", excerpt: "", content: "", content_bn_html: "",
    meta_title: "", meta_description: "", og_title: "", og_description: "",
    og_image: "", focus_keyword: "", is_published: false,
  });

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

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
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            prompt, category: blogCategory, focus_keyword: focusKeyword,
            include_bengali: includeBengali, use_unsplash: useUnsplash,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed");

      const { blog, image } = data;

      setFormData({
        title: blog.title || "",
        slug: blog.slug || generateSlug(blog.title || ""),
        category: blog.category || blogCategory,
        author: "Sova Tours",
        publish_date: new Date().toISOString().split("T")[0],
        featured_image_url: image?.url || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        content_bn_html: blog.content_bn_html || "",
        meta_title: blog.meta_title || "",
        meta_description: blog.meta_description || "",
        og_title: blog.og_title || "",
        og_description: blog.og_description || "",
        og_image: image?.url || "",
        focus_keyword: blog.focus_keyword || focusKeyword,
        is_published: false,
      });

      setStep(2);
      toast({ title: "Draft Generated!", description: "Review and edit the blog post below." });
    } catch (err: any) {
      toast({ title: "Generation Failed", description: err.message, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async (publish: boolean) => {
    setSaving(true);
    try {
      const postData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        og_image: formData.og_image || formData.featured_image_url || null,
        is_published: publish,
        ai_generated: true,
      };

      const { error } = await supabase.from("blog_posts").insert(postData);
      if (error) throw error;

      toast({
        title: publish ? "Blog Published!" : "Draft Saved!",
        description: publish ? "Post is now live." : "Post saved as draft.",
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
    setBlogCategory("");
    setFocusKeyword("");
    setIncludeBengali(true);
    setUseUnsplash(true);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Blog Builder
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
              <Label>What should the blog post be about? *</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="e.g., Top 10 places to visit in Darjeeling during winter. Include tips for budget travelers from Bengal."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={blogCategory} onChange={(e) => setBlogCategory(e.target.value)} placeholder="e.g., Travel Tips, Destinations" />
              </div>
              <div className="space-y-2">
                <Label>Focus Keyword</Label>
                <Input value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} placeholder="e.g., Darjeeling winter travel" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Switch checked={includeBengali} onCheckedChange={setIncludeBengali} />
                <Label>Generate English + Bengali content</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={useUnsplash} onCheckedChange={setUseUnsplash} />
                <Label>Generate featured image (Unsplash)</Label>
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={generating} className="w-full" size="lg">
              {generating ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Blog Draft...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Generate Blog Draft</>
              )}
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: formData.slug || generateSlug(e.target.value) })} required />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Publish Date</Label>
                <Input type="date" value={formData.publish_date} onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })} />
              </div>
              <ImageUpload
                label="Featured Image"
                value={formData.featured_image_url}
                onChange={(url) => setFormData({ ...formData, featured_image_url: url })}
                folder="blog"
              />
            </div>

            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={2} />
            </div>

            <div className="space-y-2">
              <Label>Content (HTML supported)</Label>
              <Textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={12} />
            </div>

            {formData.content_bn_html && (
              <div className="space-y-2">
                <Label>Bengali Content (HTML supported)</Label>
                <Textarea value={formData.content_bn_html} onChange={(e) => setFormData({ ...formData, content_bn_html: e.target.value })} rows={8} />
              </div>
            )}

            <Accordion type="single" collapsible>
              <AccordionItem value="seo">
                <AccordionTrigger className="text-base font-semibold">SEO Settings</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <Input value={formData.meta_title} onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })} maxLength={60} />
                      <p className="text-xs text-muted-foreground">{formData.meta_title.length}/60</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Focus Keyword</Label>
                      <Input value={formData.focus_keyword} onChange={(e) => setFormData({ ...formData, focus_keyword: e.target.value })} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea value={formData.meta_description} onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })} rows={2} maxLength={160} />
                    <p className="text-xs text-muted-foreground">{formData.meta_description.length}/160</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>OG Title</Label>
                      <Input value={formData.og_title} onChange={(e) => setFormData({ ...formData, og_title: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>OG Description</Label>
                      <Input value={formData.og_description} onChange={(e) => setFormData({ ...formData, og_description: e.target.value })} />
                    </div>
                  </div>
                  <ImageUpload
                    label="OG Image (defaults to featured image)"
                    value={formData.og_image}
                    onChange={(url) => setFormData({ ...formData, og_image: url })}
                    folder="blog-og"
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

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

export default AIBlogBuilder;
