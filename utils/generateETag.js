import etag from "etag";

export default function generateETag(changePerSecond) {
  if (!changePerSecond || Number.isNaN(changePerSecond)) {
    return etag("generateETag", { weak: true });
  }

  const count = Math.floor(Date.now() / 1000 / changePerSecond);

  return etag(`generateETag_${count}`, { weak: true });
}
