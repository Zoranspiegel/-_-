export function splitUsername (username: string): string[] {
  const hash = `#${Math.random().toString(16).slice(2)}#`;
  if (username.includes('_')) {
    return username.split('_').join(hash + '_' + hash).split(hash);
  }
  if (username.includes('@')) {
    return username.split('@').join(hash + '@' + hash).split(hash);
  }
  if (username.includes('#')) {
    return username.split('#').join(hash + '#' + hash).split(hash);
  }
  if (username.includes('-')) {
    return username.split('-').join(hash + '-' + hash).split(hash);
  }
  if (username.includes('.')) {
    return username.split('.').join(hash + '.' + hash).split(hash);
  }
  return [username];
}
