import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Loader2, Phone, Mail, Calendar, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  tour_id: string | null;
  travellers: number | null;
  preferred_date: string | null;
  status: string;
  created_at: string;
  is_read: boolean | null;
}
const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  converted: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-800",
};

const Inquiries = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchInquiries();
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();
      
      if (data) {
        setUserRole(data.role);
      }
    }
  };

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setInquiries((data || []) as Inquiry[]);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("inquiries")
      .update({ status, is_read: true })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated", description: "Inquiry status updated" });
      fetchInquiries();
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;

    const { error } = await supabase.from("inquiries").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Inquiry deleted" });
      fetchInquiries();
    }
  };

  const canDelete = userRole === "super_admin" || userRole === "admin";
  const canUpdateStatus = userRole !== "moderator";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Inquiries</h1>
        <p className="text-muted-foreground">Manage customer inquiries ({inquiries.length} total)</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow 
                  key={inquiry.id} 
                  className={!inquiry.is_read ? "bg-blue-50" : ""}
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <TableCell className="font-medium cursor-pointer">
                    {inquiry.name}
                    {!inquiry.is_read && (
                      <Badge className="ml-2 bg-blue-500">New</Badge>
                    )}
                  </TableCell>
                  <TableCell className="cursor-pointer">
                    <div className="text-sm">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {inquiry.phone}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {inquiry.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="cursor-pointer">
                    <div className="text-sm max-w-xs truncate">
                      {inquiry.message || "No message"}
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      {inquiry.travellers && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {inquiry.travellers}
                        </span>
                      )}
                      {inquiry.preferred_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(inquiry.preferred_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    {canUpdateStatus ? (
                      <Select
                        value={inquiry.status}
                        onValueChange={(v) => updateStatus(inquiry.id, v)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge className={statusColors[inquiry.status]}>
                        {inquiry.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground cursor-pointer">
                    {new Date(inquiry.created_at).toLocaleDateString()}
                    <div className="text-xs">
                      {new Date(inquiry.created_at).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteInquiry(inquiry.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {inquiries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No inquiries yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedInquiry.status]}>
                    {selectedInquiry.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${selectedInquiry.phone}`} className="font-medium text-primary">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-medium text-primary">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.travellers && (
                  <div>
                    <p className="text-sm text-muted-foreground">Travellers</p>
                    <p className="font-medium">{selectedInquiry.travellers}</p>
                  </div>
                )}
                {selectedInquiry.preferred_date && (
                  <div>
                    <p className="text-sm text-muted-foreground">Preferred Date</p>
                    <p className="font-medium">
                      {new Date(selectedInquiry.preferred_date).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              {selectedInquiry.message && (
                <div>
                  <p className="text-sm text-muted-foreground">Message</p>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{selectedInquiry.message}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Received</p>
                <p className="font-medium">
                  {new Date(selectedInquiry.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 pt-4">
                <a href={`tel:${selectedInquiry.phone}`} className="flex-1">
                  <Button className="w-full" variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                </a>
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full">
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inquiries;
