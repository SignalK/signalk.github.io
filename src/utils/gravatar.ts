import { createHash } from 'crypto';

export default (email: string, options: Record<string, string> = {}) => {
  const hash = createHash('md5').update(email.trim().toLowerCase()).digest('hex');

  const url = new URL('https://www.gravatar.com/avatar/' + hash);
  url.search = new URLSearchParams({
    s: "50",
    d: "identicon",
    ...options,
  }).toString();

  return url.toString();
}
