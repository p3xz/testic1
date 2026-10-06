export function buildCPUPackagingScene(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-cpu-packaging');
  container.setAttribute('position', '0 0 -3.5');

  // Green/Black Organic Semiconductor Substrate Carrier
  const substrate = document.createElement('a-box');
  substrate.setAttribute('position', '0 0 0');
  substrate.setAttribute('width', '1.4');
  substrate.setAttribute('height', '0.05');
  substrate.setAttribute('depth', '1.4');
  substrate.setAttribute('material', 'color: #113824; roughness: 0.4; metalness: 0.3');
  container.appendChild(substrate);

  // Gold Wire Bond / Contact Pad Perimeter (LGA / BGA Array)
  const pinArray = document.createElement('a-plane');
  pinArray.setAttribute('position', '0 0.028 0');
  pinArray.setAttribute('rotation', '-90 0 0');
  pinArray.setAttribute('width', '1.3');
  pinArray.setAttribute('height', '1.3');
  pinArray.setAttribute('material', 'color: #ffd166; roughness: 0.2; metalness: 0.95; wireframe: true; wireframeLinewidth: 2');
  container.appendChild(pinArray);

  // Silicon Die (The Shiny Raw Silicon Crystal)
  const siliconDie = document.createElement('a-box');
  siliconDie.setAttribute('position', '0 0.055 0');
  siliconDie.setAttribute('width', '0.85');
  siliconDie.setAttribute('height', '0.04');
  siliconDie.setAttribute('depth', '0.85');
  siliconDie.setAttribute('material', 'color: #1e293b; metalness: 0.95; roughness: 0.1');
  container.appendChild(siliconDie);

  // Die Floorplan Etched Micro-circuits (Multi-core layout with cyan luminescence)
  const floorplan = document.createElement('a-plane');
  floorplan.setAttribute('position', '0 0.078 0');
  floorplan.setAttribute('rotation', '-90 0 0');
  floorplan.setAttribute('width', '0.82');
  floorplan.setAttribute('height', '0.82');
  floorplan.setAttribute('material', 'color: #00e5ff; opacity: 0.7; transparent: true; wireframe: true; wireframeLinewidth: 1');
  container.appendChild(floorplan);

  // 8 Core Quadrants represented by glowing rectangular compute clusters
  const corePositions = [
    [-0.24, -0.24], [0.24, -0.24], [-0.24, 0.24], [0.24, 0.24],
    [-0.24, 0.0], [0.24, 0.0], [0.0, -0.24], [0.0, 0.24]
  ];

  corePositions.forEach(([cx, cz]) => {
    const core = document.createElement('a-box');
    core.setAttribute('position', `${cx} 0.082 ${cz}`);
    core.setAttribute('width', '0.18');
    core.setAttribute('height', '0.012');
    core.setAttribute('depth', '0.18');
    core.setAttribute('material', 'color: #7c3aed; emissive: #7c3aed; emissiveIntensity: 0.7; opacity: 0.85; transparent: true');
    container.appendChild(core);
  });

  // Microscopic Zoom Tunnel Rings (Visual portal drawing camera into silicon)
  for (let r = 0; r < 6; r++) {
    const tunnelRing = document.createElement('a-torus');
    tunnelRing.setAttribute('position', `0 0 ${-0.3 - r * 0.3}`);
    tunnelRing.setAttribute('radius', `${0.6 - r * 0.05}`);
    tunnelRing.setAttribute('radius-tubular', '0.005');
    tunnelRing.setAttribute('material', `color: ${r % 2 === 0 ? '#00e5ff' : '#7c3aed'}; emissive: ${r % 2 === 0 ? '#00e5ff' : '#7c3aed'}; emissiveIntensity: 0.8; opacity: 0.7; transparent: true`);
    container.appendChild(tunnelRing);
  }

  return container;
}
