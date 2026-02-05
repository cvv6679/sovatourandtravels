 import { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import { supabase } from "@/integrations/supabase/client";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { useToast } from "@/hooks/use-toast";
 import { Loader2, LogIn, LogOut, Inbox, Eye } from "lucide-react";
 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 
 const Admin = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [user, setUser] = useState<any>(null);
   const [inquiries, setInquiries] = useState<any[]>([]);
   const { toast } = useToast();
 
   useEffect(() => {
     supabase.auth.getSession().then(({ data }) => setUser(data.session?.user || null));
     const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
       setUser(session?.user || null);
     });
     return () => subscription.unsubscribe();
   }, []);
 
   useEffect(() => {
     if (user) fetchInquiries();
   }, [user]);
 
   const fetchInquiries = async () => {
     const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
     if (data) setInquiries(data);
   };
 
   const handleLogin = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     const { error } = await supabase.auth.signInWithPassword({ email, password });
     if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
     else toast({ title: "Welcome!", description: "Logged in successfully" });
     setLoading(false);
   };
 
   const handleLogout = async () => {
     await supabase.auth.signOut();
     toast({ title: "Logged out" });
   };
 
   if (!user) {
     return (
       <div className="min-h-screen bg-background">
         <Header />
         <div className="container mx-auto px-4 py-24">
           <div className="max-w-md mx-auto bg-card p-8 rounded-2xl card-shadow">
             <h1 className="font-display text-2xl font-bold mb-6 text-center">Admin Login</h1>
             <form onSubmit={handleLogin} className="space-y-4">
               <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
               <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
               <Button type="submit" className="w-full" disabled={loading}>
                 {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                 Login
               </Button>
             </form>
             <p className="text-xs text-muted-foreground text-center mt-4">Admin access only. Contact support for credentials.</p>
           </div>
         </div>
         <Footer />
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <div className="container mx-auto px-4 py-12">
         <div className="flex items-center justify-between mb-8">
           <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
           <Button variant="outline" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
         </div>
         <div className="bg-card rounded-2xl p-6 card-shadow">
           <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2"><Inbox className="w-5 h-5" />Inquiries ({inquiries.length})</h2>
           {inquiries.length === 0 ? (
             <p className="text-muted-foreground">No inquiries yet.</p>
           ) : (
             <div className="space-y-4">
               {inquiries.map((inq) => (
                 <div key={inq.id} className="border rounded-lg p-4">
                   <div className="flex justify-between items-start mb-2">
                     <div>
                       <p className="font-semibold">{inq.name}</p>
                       <p className="text-sm text-muted-foreground">{inq.email} • {inq.phone}</p>
                     </div>
                     <span className="text-xs text-muted-foreground">{new Date(inq.created_at).toLocaleDateString()}</span>
                   </div>
                   {inq.message && <p className="text-sm mt-2">{inq.message}</p>}
                   {inq.travellers && <p className="text-xs text-muted-foreground mt-1">Travellers: {inq.travellers}</p>}
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>
       <Footer />
     </div>
   );
 };
 
 export default Admin;