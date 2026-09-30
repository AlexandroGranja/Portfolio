import { brandMarkPaths } from "@/lib/ag-monogram";

export function BrandMark() {
  return <svg className="brand-mark" viewBox="0 10 44 44" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
    {brandMarkPaths.map((path, index) => <path key={index} d={path} />)}
    <circle cx="39" cy="15" r="3" fill="currentColor" stroke="none" />
  </svg>;
}
