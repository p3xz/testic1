export function buildCPUPackagingScene(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-cpu-packaging');
  container.setAttribute('position', '0 0 -1.0');

  // Green/Black Organic Semiconductor Substrate Carrier
  const substrate = document.createElement('a-box');
  substrate.setAttribute('position', '0 0 0');
  substrate.setAttribute('width', '1.2');
  substrate.setAttribute('height', '0.04');
  substrate.setAttribute('depth', '1.2');
  substrate.setAttribute('material', 'color: #0c1a16; roughness: 0.5; metalness: 0.2');
  container.appendChild(substrate);

  // Gold Wire Bond / Contact Pad Perimeter (LGA / BGA Array)
  const pinArray = document.createElement('a-plane');
  pinArray.setAttribute('position', '0 0.022 0');
  pinArray.setAttribute('rotation', '-90 0 0');
  pinArray.setAttribute('width', '1.1');
  pinArray.setAttribute('height', '1.1');
  pinArray.setAttribute('material', 'color: #ffd166; roughness: 0.2; metalness: 0.9; wireframe: true; wireframeLinewidth: 2');
  container.appendChild(pinArray);

  // Silicon Die (The Shiny Raw Silicon Crystal)
  const siliconDie = document.createElement('a-box');
  siliconDie.setAttribute('position', '0 0.045 0');
  siliconDie.setAttribute('width', '0.75');
  siliconDie.setAttribute('height', '0.03');
  siliconDie.setAttribute('depth', '0.75');
  siliconDie.setAttribute('material', 'color: #121927; metalness: 0.95; roughness: 0.05');
  container.appendChild(siliconDie);

  // Die Floorplan Etched Micro-circuits (Multi-core layout with cyan/violet luminescence)
  const floorplan = document.createElement('a-plane');
  floorplan.setAttribute('position', '0 0.062 0');
  floorplan.setAttribute('rotation', '-90 0 0');
  floorplan.setAttribute('width', '0.72');
  floorplan.setAttribute('height', '0.72');
  floorplan.setAttribute('material', 'color: #00e5ff; opacity: 0.6; transparent: true; wireframe: true; wireframeLinewidth: 1');
  container.appendChild(floorplan);

  // 8 Core Quadrants represented by glowing rectangular compute clusters
  const corePositions = [
    [-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2],
    [-0.2, 0.0], [0.2, 0.0], [0.0, -0.2], [0.0, 0.2]
  ];

  corePositions.forEach(([cx, cz]) => {
    const core = document.createElement('a-box');
    core.setAttribute('position', `${cx} 0.065 ${cz}`);
    core.setAttribute('width', '0.14');
    core.setAttribute('height', '0.008');
    core.setAttribute('depth', '0.14');
    core.setAttribute('material', 'color: #7c3aed; emissive: #7c3aed; emissiveIntensity: 0.6; opacity: 0.8; transparent: true');
    container.appendChild(core);
  });

  // Microscopic Zoom Tunnel Rings (Visual portal drawing camera into silicon)
  for (let r = 0; r < 8; r++) {
    const tunnelRing = document.createElement('a-torus');
    tunnelRing.setAttribute('position', `0 0 ${-0.2 - r * 0.2}`);
    tunnelRing.setAttribute('radius', `${0.45 - r * 0.03}`);
    tunnelRing.setAttribute('radius-tubular', '0.004');
    tunnelRing.setAttribute('material', `color: ${r % 2 === 0 ? '#00e5ff' : '#7c3aed'}; emissive: ${r % 2 === 0 ? '#00e5ff' : '#7c3aed'}; emissiveIntensity: 0.7; opacity: 0.6; transparent: true`);
    container.appendChild(tunnelRing);
  }

  return container;
}
