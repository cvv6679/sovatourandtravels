import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
  console.log("EDGE FUNCTION WORKING");
  return new Response(JSON.stringify({ test: "edge ok" }), { status: 200 });
});
