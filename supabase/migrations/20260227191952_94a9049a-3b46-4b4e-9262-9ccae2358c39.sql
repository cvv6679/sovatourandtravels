
CREATE TABLE public.blog_prompt_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt TEXT NOT NULL,
  is_used BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_prompt_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access" ON public.blog_prompt_queue
  FOR ALL
  USING (true)
  WITH CHECK (true);
