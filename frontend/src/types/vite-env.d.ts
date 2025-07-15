/// <reference types="vite/client" />

// 这是一个全新的环境变量定义文件
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
