
CREATE OR REPLACE FUNCTION public.get_schema_info()
RETURNS TABLE (
  table_schema text,
  table_name text,
  row_count bigint,
  has_rls boolean,
  policies jsonb
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.table_schema,
    t.table_name,
    (SELECT count(*) FROM information_schema.tables WHERE table_schema = t.table_schema AND table_name = t.table_name) AS row_count,
    obj_description((quote_ident(t.table_schema) || '.' || quote_ident(t.table_name))::regclass, 'pg_class') ~ 'RLS' AS has_rls,
    COALESCE(
      (
        SELECT jsonb_agg(jsonb_build_object(
          'policyname', p.policyname,
          'permissive', p.permissive,
          'roles', p.roles,
          'cmd', p.cmd,
          'qual', p.qual,
          'with_check', p.with_check
        ))
        FROM pg_policies p
        WHERE p.tablename = t.table_name AND p.schemaname = t.table_schema
      ),
      '[]'::jsonb
    ) AS policies
  FROM information_schema.tables t
  WHERE t.table_schema = 'public'
  AND t.table_type = 'BASE TABLE'
  ORDER BY t.table_name;
END;
$$;

-- Grant execute permission to anon users
GRANT EXECUTE ON FUNCTION public.get_schema_info() TO anon;
