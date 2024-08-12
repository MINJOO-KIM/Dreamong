import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [
    react(),
    // mkcert(),
    VitePWA({
      // PWA 플러그인 설정
      strategies: 'injectManifest', // 서비스 워커 전략: 사용자 정의 서비스 워커 사용
      srcDir: 'public', // 서비스 워커 파일 위치
      filename: './firebase-message-sw.js', // 서비스 워커 파일명
      injectManifest: {
        injectionPoint: undefined,
      },
      registerType: 'autoUpdate', // 서비스 워커 자동 업데이트 설정
      devOptions: {
        // 개발 환경 옵션
        enabled: true, // 개발 중에도 PWA 활성화
        type: 'module', // ES 모듈 형식 사용
      },
      includeAssets: ['apple-touch-icon.png'],
      manifest: {
        name: '드리-몽',
        short_name: '드리-몽',
        description: 'AI-based dream interpretation app',
        theme_color: '#737DFE',
        icons: [
          {
            src: '/drea-mong_192px.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: '/drea-mong_512px.png',
            type: 'image/png',
            sizes: '512x512',
          },
          {
            src: '/apple-touch-icon.png',
            type: 'image/png',
            size: '180x180',
          },
        ],
      },
      server: {
        headers: {
          'Service-Worker-Allowed': '/',
        },
        proxy: {
          '/socket.io': {
            target: 'https://i11c106.p.ssafy.io',
            changeOrigin: true,
            ws: true,
            secure: true,
            rewrite: (path) => path.replace(/^\/socket.io/, '/socket.io'),
          },
        },
      },
    }),
  ],
});
