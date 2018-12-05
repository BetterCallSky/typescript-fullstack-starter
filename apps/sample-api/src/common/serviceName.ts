import Path from 'path';

export function serviceName(name: string) {
  if (!module.parent) {
    throw new Error('No parent module');
  }
  const service = Path.basename(module.parent.filename, '.ts');
  return `${service}#${name}`;
}

// no caching for module.parent.filename
delete require.cache[__filename];
