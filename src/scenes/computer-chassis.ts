export function buildComputerChassis(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-computer-chassis');
  container.setAttribute('position', '0 0 0');

  // Chassis Main Outer Frame (Dark Metallic Matte Tower)
  const caseFrame = document.createElement('a-box');
  caseFrame.setAttribute('position', '0 0 0');
  caseFrame.setAttribute('width', '1.6');
  caseFrame.setAttribute('height', '2.2');
  caseFrame.setAttribute('depth', '2.0');
  caseFrame.setAttribute('material', 'color: #0b1118; metalness: 0.8; roughness: 0.25; opacity: 0.85; transparent: true');
  container.appendChild(caseFrame);

  // Inner Dark Chamber
  const innerChamber = document.createElement('a-box');
  innerChamber.setAttribute('position', '0 0 0');
  innerChamber.setAttribute('width', '1.5');
  innerChamber.setAttribute('height', '2.1');
  innerChamber.setAttribute('depth', '1.9');
  innerChamber.setAttribute('material', 'color: #05070a; side: back; roughness: 0.6');
  container.appendChild(innerChamber);

  // Glass Side Panel (Slightly open / transparent so camera dives through effortlessly)
  const glassPanel = document.createElement('a-plane');
  glassPanel.setAttribute('position', '0 0 1.01');
  glassPanel.setAttribute('width', '1.55');
  glassPanel.setAttribute('height', '2.15');
  glassPanel.setAttribute('material', 'color: #00e5ff; opacity: 0.12; transparent: true; roughness: 0.05; metalness: 0.9; side: double');
  container.appendChild(glassPanel);

  // Chassis Front Intake RGB Fans (3 Glowing Dual-Ring Fans)
  for (let i = 0; i < 3; i++) {
    const yPos = 0.6 - i * 0.6;
    const fanRing = document.createElement('a-torus');
    fanRing.setAttribute('position', `0 ${yPos} 0.98`);
    fanRing.setAttribute('radius', '0.22');
    fanRing.setAttribute('radius-tubular', '0.012');
    fanRing.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.9; roughness: 0.2');
    fanRing.setAttribute('animation', 'property: rotation; to: 0 0 360; loop: true; dur: 3000; easing: linear');
    container.appendChild(fanRing);

    const fanHub = document.createElement('a-cylinder');
    fanHub.setAttribute('position', `0 ${yPos} 0.98`);
    fanHub.setAttribute('radius', '0.06');
    fanHub.setAttribute('height', '0.03');
    fanHub.setAttribute('rotation', '90 0 0');
    fanHub.setAttribute('material', 'color: #111822; metalness: 0.9');
    container.appendChild(fanHub);
  }

  // Top Exhaust Radiator Grille
  const radiator = document.createElement('a-box');
  radiator.setAttribute('position', '0 1.08 0');
  radiator.setAttribute('width', '1.3');
  radiator.setAttribute('height', '0.04');
  radiator.setAttribute('depth', '1.7');
  radiator.setAttribute('material', 'color: #0d1622; wireframe: true; wireframeLinewidth: 1');
  container.appendChild(radiator);

  // Floating Ambient Data Dust around Computer
  const dustCount = 40;
  for (let i = 0; i < dustCount; i++) {
    const dust = document.createElement('a-sphere');
    const x = (Math.random() - 0.5) * 4.0;
    const y = (Math.random() - 0.5) * 3.5;
    const z = (Math.random() - 0.5) * 4.0 + 1.0;
    dust.setAttribute('position', `${x} ${y} ${z}`);
    dust.setAttribute('radius', `${0.008 + Math.random() * 0.012}`);
    dust.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.8; opacity: 0.6; transparent: true');
    container.appendChild(dust);
  }

  return container;
}
