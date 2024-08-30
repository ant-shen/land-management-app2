module.exports = {
  //for production
  publicPath: process.env.NODE_ENV === 'production'
    ? '/land-management-app2/' // Path where app is hosted
    : '/',

    //for local testing
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true,
          secure: false
        },
      },
    },
    outputDir: 'docs'
  };


//wihtout cors
/*
module.exports = {
  devServer: {
    proxy: 'http://localhost:5001',
  },
};
*/
