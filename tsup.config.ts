import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    server: 'src/server.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  tsconfig: 'tsconfig.build.json',
  external: [
    'react',
    'react-dom',
    'framer-motion',
    'tailwindcss',
    'styled-components',
  ],
});
