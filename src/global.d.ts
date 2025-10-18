// global.d.ts
declare global {
  interface Window {
    navigate: (path: string) => void;
  }
}

export {};
