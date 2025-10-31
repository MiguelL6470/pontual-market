-- Full Text Search para products
-- Executar após migrar o schema base

-- Criar coluna tsvector se necessário (usamos coluna nativa no Prisma como Unsupported)
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "searchVector" tsvector;

-- Popular vetor inicial
UPDATE "Product"
SET "searchVector" =
  setweight(to_tsvector('simple', coalesce("title", '')), 'A') ||
  setweight(to_tsvector('simple', coalesce("description", '')), 'B');

-- Índice GIN
CREATE INDEX IF NOT EXISTS product_search_vector_gin
  ON "Product" USING GIN ("searchVector");

-- Trigger para manter vetor
CREATE OR REPLACE FUNCTION product_searchvector_trigger() RETURNS trigger AS $$
begin
  new."searchVector" :=
    setweight(to_tsvector('simple', coalesce(new."title", '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(new."description", '')), 'B');
  return new;
end
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS product_searchvector_update ON "Product";
CREATE TRIGGER product_searchvector_update
BEFORE INSERT OR UPDATE OF "title", "description"
ON "Product"
FOR EACH ROW EXECUTE PROCEDURE product_searchvector_trigger();


