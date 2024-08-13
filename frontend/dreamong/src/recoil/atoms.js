import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {},
});

export const isListeningState = atom({
  key: 'isListeningState',
  default: false,
});

export const baseURLState = atom({
  key: 'baseURLState',
  default: 'http://localhost:8080',
});

export const socketURLState = atom({
  key: 'socketURLState',
  default: 'wss://i11c106.p.ssafy.io',
});
