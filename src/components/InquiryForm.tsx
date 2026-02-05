 import { useState } from "react";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
 import { z } from "zod";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { useToast } from "@/hooks/use-toast";
 import { supabase } from "@/integrations/supabase/client";
 import { Loader2, Send } from "lucide-react";
 
 const inquirySchema = z.object({
   name: z.string().min(2, "Name must be at least 2 characters").max(100),
   email: z.string().email("Please enter a valid email").max(255),
   phone: z.string().min(10, "Please enter a valid phone number").max(15),
   travellers: z.coerce.number().min(1).max(100).optional(),
   preferred_date: z.string().optional(),
   message: z.string().max(1000).optional(),
 });
 
 type InquiryFormData = z.infer<typeof inquirySchema>;
 
 interface InquiryFormProps {
   tourId?: string;
   tourTitle?: string;
 }
 
 const InquiryForm = ({ tourId, tourTitle }: InquiryFormProps) => {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { toast } = useToast();
 
   const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
   } = useForm<InquiryFormData>({
     resolver: zodResolver(inquirySchema),
   });
 
   const onSubmit = async (data: InquiryFormData) => {
     setIsSubmitting(true);
     try {
       const { error } = await supabase.from("inquiries").insert({
         tour_id: tourId || null,
         name: data.name,
         email: data.email,
         phone: data.phone,
         travellers: data.travellers || null,
         preferred_date: data.preferred_date || null,
         message: data.message || null,
       });
 
       if (error) throw error;
 
       toast({
         title: "Inquiry Submitted!",
         description: "We'll get back to you within 24 hours.",
       });
       reset();
     } catch (error) {
       toast({
         title: "Error",
         description: "Failed to submit inquiry. Please try again.",
         variant: "destructive",
       });
     } finally {
       setIsSubmitting(false);
     }
   };
 
   return (
     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       {tourTitle && (
         <div className="bg-travel-teal-light rounded-lg p-3 mb-4">
           <p className="text-sm text-muted-foreground">Inquiring about:</p>
           <p className="font-medium text-foreground">{tourTitle}</p>
         </div>
       )}
 
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
           <Input
             placeholder="Your Name *"
             {...register("name")}
             className="bg-background"
           />
           {errors.name && (
             <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
           )}
         </div>
         <div>
           <Input
             type="email"
             placeholder="Email Address *"
             {...register("email")}
             className="bg-background"
           />
           {errors.email && (
             <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
           )}
         </div>
       </div>
 
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div>
           <Input
             type="tel"
             placeholder="Phone Number *"
             {...register("phone")}
             className="bg-background"
           />
           {errors.phone && (
             <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>
           )}
         </div>
         <div>
           <Input
             type="number"
             placeholder="Number of Travellers"
             {...register("travellers")}
             className="bg-background"
           />
         </div>
       </div>
 
       <div>
         <Input
           type="date"
           {...register("preferred_date")}
           className="bg-background"
         />
       </div>
 
       <div>
         <Textarea
           placeholder="Your Message (optional)"
           {...register("message")}
           className="bg-background min-h-[100px]"
         />
       </div>
 
       <Button
         type="submit"
         disabled={isSubmitting}
         className="w-full bg-gradient-sunset hover:opacity-90 text-secondary-foreground font-semibold"
       >
         {isSubmitting ? (
           <Loader2 className="w-4 h-4 animate-spin mr-2" />
         ) : (
           <Send className="w-4 h-4 mr-2" />
         )}
         {isSubmitting ? "Submitting..." : "Send Inquiry"}
       </Button>
     </form>
   );
 };
 
 export default InquiryForm;