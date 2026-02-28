import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    console.log("FUNCTION TRIGGERED");

    const apiKey = req.headers.get("x-api-key");
    const expectedKey = Deno.env.get("INTERNAL_API_SECRET");

    if (!apiKey || apiKey !== expectedKey) {
      console.log("Unauthorized access");
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    const body = await req.json();
    console.log("Incoming body:", body);

    return new Response(JSON.stringify({ debug: "Handler working" }), { status: 200 });
  } catch (error) {
    console.log("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
