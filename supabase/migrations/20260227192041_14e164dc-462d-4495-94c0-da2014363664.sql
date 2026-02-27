
DROP POLICY "Service role has full access" ON public.blog_prompt_queue;

CREATE POLICY "Admins can manage blog prompt queue" ON public.blog_prompt_queue
  FOR ALL
  USING (is_super_or_admin(auth.uid()))
  WITH CHECK (is_super_or_admin(auth.uid()));
