import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export const ImageUpload = ({ label, value, onChange, folder = "hero" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({ title: "Error", description: "Please select an image file", variant: "destructive" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Error", description: "Image must be less than 5MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage.from("tour-images").upload(fileName, file);

    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("tour-images").getPublicUrl(fileName);
    onChange(urlData.publicUrl);
    setUploading(false);
    toast({ title: "Uploaded", description: "Image uploaded successfully" });
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Upload className="w-4 h-4 mr-1" />}
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>
      {value && (
        <div className="relative w-32 h-20 rounded-md overflow-hidden border">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
      {!value && (
        <div className="w-32 h-20 rounded-md border border-dashed flex items-center justify-center text-muted-foreground">
          <ImageIcon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
};

interface GalleryUploadProps {
  label: string;
  urls: string[];
  onChange: (urls: string[]) => void;
}

export const GalleryUpload = ({ label, urls, onChange }: GalleryUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls = [...urls];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) continue;

      const fileExt = file.name.split(".").pop();
      const fileName = `gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error } = await supabase.storage.from("tour-images").upload(fileName, file);
      if (error) continue;

      const { data: urlData } = supabase.storage.from("tour-images").getPublicUrl(fileName);
      newUrls.push(urlData.publicUrl);
    }

    onChange(newUrls);
    setUploading(false);
    toast({ title: "Uploaded", description: "Gallery images uploaded" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onChange(urls.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Upload className="w-4 h-4 mr-1" />}
        {uploading ? "Uploading..." : "Upload Images"}
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {urls.map((url, i) => (
            <div key={i} className="relative w-24 h-16 rounded-md overflow-hidden border group">
              <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-bl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
