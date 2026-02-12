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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { format } from "date-fns";
import AIBlogBuilder from "@/components/admin/AIBlogBuilder";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  category: string | null;
  author: string | null;
  is_published: boolean | null;
  publish_date: string;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  focus_keyword: string | null;
}

const defaultPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image_url: "",
  category: "",
  author: "Sova Tours",
  is_published: false,
  publish_date: new Date().toISOString().split("T")[0],
  meta_title: "",
  meta_description: "",
  og_title: "",
  og_description: "",
  og_image: "",
  focus_keyword: "",
};

const BlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState(defaultPost);
  const [saving, setSaving] = useState(false);
  const [aiBuilderOpen, setAiBuilderOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const openCreateDialog = () => {
    setEditingPost(null);
    setFormData(defaultPost);
    setIsDialogOpen(true);
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      featured_image_url: post.featured_image_url || "",
      category: post.category || "",
      author: post.author || "Sova Tours",
      is_published: post.is_published || false,
      publish_date: post.publish_date ? post.publish_date.split("T")[0] : new Date().toISOString().split("T")[0],
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
      og_title: post.og_title || "",
      og_description: post.og_description || "",
      og_image: post.og_image || "",
      focus_keyword: post.focus_keyword || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const postData = {
      ...formData,
      slug: formData.slug || generateSlug(formData.title),
      og_image: formData.og_image || formData.featured_image_url || null,
    };

    try {
      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);
        if (error) throw error;
        toast({ title: "Success", description: "Blog post updated" });
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert(postData);
        if (error) throw error;
        toast({ title: "Success", description: "Blog post created" });
      }
      setIsDialogOpen(false);
      fetchPosts();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from("blog_posts")
      .update({ is_published: !post.is_published })
      .eq("id", post.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      fetchPosts();
    }
  };

  const deletePost = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", post.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Blog post deleted" });
      fetchPosts();
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
          <h1 className="text-2xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setAiBuilderOpen(true)}>
            <Sparkles className="w-4 h-4 mr-2" />
            Create Post with AI
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug: formData.slug || generateSlug(e.target.value),
                      });
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Slug (URL)</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated from title"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Travel Tips, Destinations"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Publish Date</Label>
                  <Input
                    type="date"
                    value={formData.publish_date}
                    onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  />
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
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Short summary for blog listing..."
                />
              </div>

              <div className="space-y-2">
                <Label>Content (HTML supported)</Label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  placeholder="Write your blog post content here. HTML tags like <h2>, <p>, <ul>, <li>, <strong>, <em>, <img> are supported..."
                />
              </div>

              {/* SEO Fields */}
              <Accordion type="single" collapsible>
                <AccordionItem value="seo">
                  <AccordionTrigger className="text-base font-semibold">
                    SEO Settings
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Meta Title</Label>
                        <Input
                          value={formData.meta_title}
                          onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                          placeholder="Leave blank to use post title"
                          maxLength={60}
                        />
                        <p className="text-xs text-muted-foreground">{formData.meta_title.length}/60</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Focus Keyword</Label>
                        <Input
                          value={formData.focus_keyword}
                          onChange={(e) => setFormData({ ...formData, focus_keyword: e.target.value })}
                          placeholder="e.g., Kashmir tour packages"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <Textarea
                        value={formData.meta_description}
                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                        rows={2}
                        placeholder="Leave blank to use excerpt"
                        maxLength={160}
                      />
                      <p className="text-xs text-muted-foreground">{formData.meta_description.length}/160</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>OG Title</Label>
                        <Input
                          value={formData.og_title}
                          onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                          placeholder="Leave blank to use meta title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>OG Description</Label>
                        <Input
                          value={formData.og_description}
                          onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                          placeholder="Leave blank to use meta description"
                        />
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

              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.is_published}
                  onCheckedChange={(v) => setFormData({ ...formData, is_published: v })}
                />
                <Label>Published</Label>
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </form>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      <AIBlogBuilder open={aiBuilderOpen} onOpenChange={setAiBuilderOpen} onSuccess={fetchPosts} />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {post.title}
                  </TableCell>
                  <TableCell>{post.category || "-"}</TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(post.publish_date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={post.is_published ? "default" : "secondary"}>
                      {post.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => togglePublish(post)}>
                        {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(post)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deletePost(post)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No blog posts yet. Create your first one!
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

export default BlogPosts;
