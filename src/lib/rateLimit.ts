type Bucket = { tokens: number; last: number }
const buckets = new Map<string, Bucket>()

export function rateLimit(key: string, limit = 20, refillMs = 60_000) {
  const now = Date.now()
  const bucket = buckets.get(key) ?? { tokens: limit, last: now }
  const elapsed = now - bucket.last
  if (elapsed > refillMs) {
    bucket.tokens = limit
    bucket.last = now
  }
  if (bucket.tokens <= 0) {
    buckets.set(key, bucket)
    return false
  }
  bucket.tokens -= 1
  buckets.set(key, bucket)
  return true
}


