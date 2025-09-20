
import React from 'react' // if you only used JSX you can usually remove this whole line entirely

export default function IllustrationLeft({ className = '' }: { className?: string }) {
return (
<div className={`w-full h-full flex items-center justify-center ${className}`}>
<svg viewBox="0 0 640 800" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden>
<defs>
<linearGradient id="g1" x1="0" x2="1">
<stop offset="0%" stopColor="#fff" stopOpacity="0.98" />
<stop offset="100%" stopColor="#f7f7f8" />
</linearGradient>
<linearGradient id="g2" x1="0" x2="1">
<stop offset="0%" stopColor="#f0f7ff" />
<stop offset="100%" stopColor="#eefaf3" />
</linearGradient>
</defs>


{/* background soft panel */}
<rect x="0" y="0" width="640" height="800" fill="url(#g1)" />


{/* bookshelf blocks */}
<g transform="translate(40,60)">
{[0,1,2,3,4].map((r)=> (
<g key={r} transform={`translate(0, ${r*120})`}>
<rect x="0" y="0" width="560" height="18" rx="4" fill="#efecef" />
<g transform="translate(12,26)">
{[...Array(10)].map((_,i)=> (
<rect key={i} x={i*52} y={0} width={40} height={60} rx={4} fill={i%3===0? '#f6f7fb' : '#ffffff'} stroke="#efeef0" />
))}
</g>
</g>
))}
</g>


{/* stylized people silhouettes (simple, abstract) */}
<g transform="translate(120,420)">
{/* person 1 */}
<g>
<circle cx="40" cy="30" r="28" fill="#f1f5f9" />
<rect x="10" y="58" width="60" height="88" rx="18" fill="#ffffff" stroke="#e6eef6" />
<rect x="-12" y="120" width="120" height="18" rx="9" fill="#e9f7f0" />
</g>


{/* laptop/table */}
<g transform="translate(120,30)">
<rect x="0" y="40" width="180" height="12" rx="4" fill="#e6eef6" />
<rect x="10" y="-6" width="160" height="80" rx="8" fill="#ffffff" stroke="#e6eef6" />
</g>


{/* person 2 */}
<g transform="translate(320,0)">
<circle cx="40" cy="30" r="28" fill="#fff7f1" />
<rect x="10" y="58" width="60" height="88" rx="18" fill="#ffffff" stroke="#f6ebe6" />
<rect x="-12" y="120" width="120" height="18" rx="9" fill="#fff3e6" />
</g>
</g>


{/* decorative rounded rectangle to mimic white card edge */}
<g>
<rect x="360" y="20" width="260" height="760" rx="16" fill="rgba(255,255,255,0.95)" />
</g>


</svg>
</div>
)
}

