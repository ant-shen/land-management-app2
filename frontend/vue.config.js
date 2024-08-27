module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true,
          secure: false
        },
      },
    },
  };


//wihtout cors
/*
module.exports = {
  devServer: {
    proxy: 'http://localhost:5001',
  },
};
*/