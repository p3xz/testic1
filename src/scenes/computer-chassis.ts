export function buildComputerChassis(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-computer-chassis');
  container.setAttribute('position', '0 0 0');

  // Main High-Detail 3D GLB Model
  const glbModel = document.createElement('a-gltf-model');
  glbModel.setAttribute('src', '#model-computer');
  glbModel.setAttribute('position', '0 0 0');
  container.appendChild(glbModel);

  // Chassis Front Intake RGB Fans (2 Glowing Fans mounted on right side frame)
  for (let i = 0; i < 2; i++) {
    const yPos = 0.65 - i * 0.45;
    const fanRing = document.createElement('a-torus');
    fanRing.setAttribute('position', `1.0 ${yPos} 0`);
    fanRing.setAttribute('rotation', '0 90 0');
    fanRing.setAttribute('radius', '0.18');
    fanRing.setAttribute('radius-tubular', '0.012');
    fanRing.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.9; roughness: 0.2');
    fanRing.setAttribute('animation', 'property: rotation; to: 0 90 360; loop: true; dur: 3000; easing: linear');
    container.appendChild(fanRing);

    const fanHub = document.createElement('a-cylinder');
    fanHub.setAttribute('position', `1.0 ${yPos} 0`);
    fanHub.setAttribute('radius', '0.05');
    fanHub.setAttribute('height', '0.02');
    fanHub.setAttribute('rotation', '0 0 90');
    fanHub.setAttribute('material', 'color: #334155; metalness: 0.9');
    container.appendChild(fanHub);
  }

  // Floating Ambient Data Dust around Computer
  const dustCount = 30;
  for (let i = 0; i < dustCount; i++) {
    const dust = document.createElement('a-sphere');
    const x = (Math.random() - 0.5) * 4.0;
    const y = (Math.random() - 0.5) * 3.0 + 0.5;
    const z = (Math.random() - 0.5) * 4.0 + 1.0;
    dust.setAttribute('position', `${x} ${y} ${z}`);
    dust.setAttribute('radius', `${0.008 + Math.random() * 0.01}`);
    dust.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.8; opacity: 0.6; transparent: true');
    container.appendChild(dust);
  }

  return container;
}
