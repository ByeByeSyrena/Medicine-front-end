const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle filename
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Add TypeScript file extensions
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "images", // Output directory for images
            },
          },
        ], // Close the 'use' array
      },
      {
        test: /\.(ts|tsx)$/, // TypeScript files
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ], // Close the 'rules' array
  },
};
