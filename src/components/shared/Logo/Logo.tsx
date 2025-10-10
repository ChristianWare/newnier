// src/icons/Logo/Logo.tsx
import { SVGProps } from "react";

export default function Logo(props: SVGProps<SVGSVGElement>) {
  // Normalize to a 24×24 box, inherit color via currentColor
  // Original art bounds ≈ x:122.332→252.832 (w=130.5), y:135.246→239.496 (h=104.25)
  // Scale = 24 / 130.5 ≈ 0.183942; vertical centering offset ≈ (24 - 104.25*scale)/2 ≈ 2.402
  return (
    <svg
      viewBox='0 0 24 24'
      width='1em'
      height='1em'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
      aria-hidden='true'
      focusable='false'
      {...props}
    >
      <g transform='translate(0 2.402) scale(0.183942) translate(-122.332031 -135.246094)'>
        <path
          d='M 179.1875 239.496094 L 122.355469 239.496094 L 122.355469 135.246094 L 172.742188 135.246094 L 227.53125 190.839844 L 204.15625 190.816406 L 165.753906 151.847656 L 139.015625 151.847656 L 139.015625 222.894531 L 162.523438 222.894531 L 162.523438 211.539062 L 179.1875 228.351562 Z M 195.976562 146.394531 L 212.644531 163.207031 L 212.644531 151.847656 L 236.148438 151.847656 L 236.148438 222.894531 L 209.414062 222.894531 L 171.011719 183.933594 L 147.636719 183.910156 L 202.421875 239.5 L 252.800781 239.5 L 252.800781 135.246094 L 195.976562 135.246094 Z M 195.976562 146.394531 '
          fillRule='nonzero'
        />
      </g>
    </svg>
  );
}
