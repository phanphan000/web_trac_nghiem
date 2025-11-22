import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // cần để tạo alias

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // alias @ trỏ đến thư mục src
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:8000"
    }
  }
});
