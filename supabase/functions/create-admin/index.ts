import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Create admin client with service role
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { email, password, role, action } = await req.json();

    if (action === "create_admin") {
      // Create user
      const { data: userData, error: userError } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

      if (userError) {
        // Check if user already exists
        if (userError.message.includes("already been registered")) {
          // Get existing user
          const { data: existingUsers } =
            await supabaseAdmin.auth.admin.listUsers();
          const existingUser = existingUsers?.users?.find(
            (u) => u.email === email
          );

          if (existingUser) {
            // Check if role already exists
            const { data: existingRole } = await supabaseAdmin
              .from("user_roles")
              .select("*")
              .eq("user_id", existingUser.id)
              .single();

            if (existingRole) {
              return new Response(
                JSON.stringify({
                  message: "Admin already exists",
                  user_id: existingUser.id,
                }),
                {
                  headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
              );
            }

            // Add role to existing user
            const { error: roleError } = await supabaseAdmin
              .from("user_roles")
              .insert({
                user_id: existingUser.id,
                role: role || "super_admin",
              });

            if (roleError) {
              throw roleError;
            }

            return new Response(
              JSON.stringify({
                message: "Role added to existing user",
                user_id: existingUser.id,
              }),
              {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
              }
            );
          }
        }
        throw userError;
      }

      // Add role to new user
      const { error: roleError } = await supabaseAdmin
        .from("user_roles")
        .insert({
          user_id: userData.user.id,
          role: role || "super_admin",
        });

      if (roleError) {
        throw roleError;
      }

      return new Response(
        JSON.stringify({
          message: "Admin created successfully",
          user_id: userData.user.id,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
