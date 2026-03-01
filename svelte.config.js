import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: false
    }),
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH ?? ''
    },
    prerender: {
      handleHttpError: ({ path }) => {
        // Modules 3-20 don't exist yet — they'll be added in future waves
        if (path.includes('/modulo/')) return;
        throw new Error(`Unexpected 404: ${path}`);
      }
    }
  }
};

export default config;
