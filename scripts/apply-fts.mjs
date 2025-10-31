import { neon } from '@neondatabase/serverless'

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL não definido')
  }
  const sql = neon(url)

  console.log('Aplicando FTS no banco...')

  await sql(`ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "searchVector" tsvector;`)

  await sql(`UPDATE "Product"
    SET "searchVector" =
      setweight(to_tsvector('simple', coalesce("title", '')), 'A') ||
      setweight(to_tsvector('simple', coalesce("description", '')), 'B');`)

  await sql(`CREATE INDEX IF NOT EXISTS product_search_vector_gin
    ON "Product" USING GIN ("searchVector");`)

  await sql(`CREATE OR REPLACE FUNCTION product_searchvector_trigger() RETURNS trigger AS $$
  begin
    new."searchVector" :=
      setweight(to_tsvector('simple', coalesce(new."title", '')), 'A') ||
      setweight(to_tsvector('simple', coalesce(new."description", '')), 'B');
    return new;
  end
  $$ LANGUAGE plpgsql;`)

  await sql(`DROP TRIGGER IF EXISTS product_searchvector_update ON "Product";`)

  await sql(`CREATE TRIGGER product_searchvector_update
    BEFORE INSERT OR UPDATE OF "title", "description"
    ON "Product"
    FOR EACH ROW EXECUTE PROCEDURE product_searchvector_trigger();`)

  console.log('FTS aplicado com sucesso.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})


