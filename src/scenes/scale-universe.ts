export function buildScaleUniverse(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-scale-universe');
  container.setAttribute('position', '0 0 0');

  // Deep Space Grid Lines running along Z-axis from 5 to -15
  const gridCount = 24;
  for (let g = 0; g < gridCount; g++) {
    const zPos = 4.0 - g * 0.8;
    const ring = document.createElement('a-torus');
    ring.setAttribute('position', `0 0 ${zPos}`);
    ring.setAttribute('radius', '3.8');
    ring.setAttribute('radius-tubular', '0.003');
    ring.setAttribute('material', 'color: #0b1c2d; opacity: 0.35; transparent: true');
    container.appendChild(ring);
  }

  // Floating ambient cybernetic dust particles across the entire depth tunnel
  const totalDust = 120;
  for (let i = 0; i < totalDust; i++) {
    const p = document.createElement('a-sphere');
    const x = (Math.random() - 0.5) * 6.0;
    const y = (Math.random() - 0.5) * 5.0;
    const z = 5.0 - Math.random() * 18.0;
    const size = 0.006 + Math.random() * 0.01;
    const isViolet = Math.random() > 0.65;

    p.setAttribute('position', `${x} ${y} ${z}`);
    p.setAttribute('radius', `${size}`);
    p.setAttribute('material', `color: ${isViolet ? '#7c3aed' : '#00e5ff'}; emissive: ${isViolet ? '#7c3aed' : '#00e5ff'}; emissiveIntensity: 0.8; opacity: 0.5; transparent: true`);
    container.appendChild(p);
  }

  return container;
}
