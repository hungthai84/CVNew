# Mindmap Infographic Design Patterns & Formulas

Tài liệu tham khảo các công thức hình học, tỷ lệ hiển thị và mẫu SVG cho Sơ đồ tư duy dạng Infographic.

## 1. Công thức tính tọa độ tỏa tròn (Radial Layout Formula)

```typescript
/**
 * Phân bổ N nhánh xung quanh tâm theo vòng tròn hoặc bán nguyệt
 */
export function calculateRadialPositions(
  centerX: number,
  centerY: number,
  radius: number,
  count: number,
  startAngle: number = -Math.PI / 2
) {
  const angleStep = (2 * Math.PI) / count;
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + i * angleStep;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
      angle,
    };
  });
}
```

## 2. Đường dẫn SVG hạt photon chuyển động (Flowing Particle Effect)

```tsx
<svg className="absolute inset-0 pointer-events-none w-full h-full">
  <defs>
    <linearGradient id="branch-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
    </linearGradient>
    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <path
    d={bezierPathString}
    fill="none"
    stroke="url(#branch-gradient)"
    strokeWidth="2.5"
    filter="url(#neon-glow)"
    className="transition-all duration-500"
  />
</svg>
```
