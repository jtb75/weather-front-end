export default {
  rootDir: './',
  nodeResolve: true,
  watch: true,
  open: true,
  appIndex: './index.html',
  plugins: [],
  middleware: [
    (ctx, next) => {
      if (ctx.url.startsWith('/background-simple.jpg')) {
        ctx.url = `/public${ctx.url}`;
      }
      return next();
    },
  ],
};

