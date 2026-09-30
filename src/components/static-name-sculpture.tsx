import { useId } from 'react';
import { agStrokes } from '@/lib/ag-monogram';
import { fsStrokes } from '@/lib/fs-monogram';

function curve(points: number[][]) {
  let path = `M ${points[0][0]} ${-points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[Math.max(0, i - 1)], b = points[i], c = points[i + 1], d = points[Math.min(points.length - 1, i + 2)];
    path += ` C ${b[0] + (c[0] - a[0]) / 6} ${-(b[1] + (c[1] - a[1]) / 6)} ${c[0] - (d[0] - b[0]) / 6} ${-(c[1] - (d[1] - b[1]) / 6)} ${c[0]} ${-c[1]}`;
  }
  return path;
}

export function StaticNameSculpture({ kind }: { kind: 'name' | 'signature' }) {
  const id = useId().replace(/:/g, '');
  return <svg className={`static-name-sculpture static-name-sculpture--${kind}`} viewBox="-2 -1.6 4 3.5" aria-hidden="true">
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#b8baf0"/><stop offset=".3" stopColor="#86e3df"/>
        <stop offset=".6" stopColor="#a5e9b0"/><stop offset=".8" stopColor="#f3e89e"/><stop offset="1" stopColor="#efb3cd"/>
      </linearGradient>
    </defs>
    <g fill="none" stroke={`url(#${id})`} strokeWidth=".48" strokeLinecap="round" strokeLinejoin="round">
      {(kind === 'name' ? agStrokes : fsStrokes).map((points, index) => <path key={index} d={curve(points)} />)}
    </g>
  </svg>;
}

export function StaticMenuSculptures() {
  const id = useId().replace(/:/g, '');
  return <svg className="static-menu-sculptures" viewBox="0 0 320 440" aria-hidden="true">
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8ce8c2"/><stop offset=".35" stopColor="#83dcdf"/><stop offset=".65" stopColor="#bbb8eb"/><stop offset="1" stopColor="#f0b7cc"/></linearGradient></defs>
    <g fill="none" stroke={`url(#${id})`} strokeWidth="48" strokeLinecap="round">
      <path d="M45 120 C145 130 99 29 226 43"/>
      <path d="M57 186 C-12 232 39 304 97 252"/>
      <path d="M193 164 C286 118 315 242 245 275 C216 289 197 274 186 258"/>
      <path d="M108 392 C104 293 225 313 221 377"/>
    </g><circle cx="221" cy="108" r="24" fill={`url(#${id})`}/>
  </svg>;
}

export function StaticHomeSculptures() {
  const id = useId().replace(/:/g, '');
  return <svg className="static-home-sculptures" viewBox="0 0 320 600" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a8eeb9"/><stop offset=".3" stopColor="#80e1d9"/><stop offset=".6" stopColor="#b7b5ef"/><stop offset="1" stopColor="#efb5ce"/></linearGradient></defs>
    <g fill="none" stroke={`url(#${id})`} strokeWidth="56" strokeLinecap="round">
      <path d="M-24 171 C107 157 9 62 120 -8"/>
      <path d="M276 -15 C217 34 355 60 283 117"/>
      <path d="M-28 452 C119 437 99 549 23 577"/>
      <path d="M222 482 C149 585 331 619 319 496"/>
    </g><circle cx="162" cy="100" r="27" fill={`url(#${id})`}/>
  </svg>;
}
