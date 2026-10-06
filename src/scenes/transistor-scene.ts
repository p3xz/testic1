export function buildTransistorScene(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-transistor');
  container.setAttribute('position', '0 0 -24.5');

  // Main Transistor Container (Interactive Target)
  const txGroup = document.createElement('a-entity');
  txGroup.setAttribute('id', 'comp-transistor_core');
  txGroup.setAttribute('class', 'interactive-target');
  txGroup.setAttribute('data-component-id', 'transistor_core');
  txGroup.setAttribute('position', '0 0 0');

  // Main High-Detail 3D Transistor GLB Model
  const glbModel = document.createElement('a-gltf-model');
  glbModel.setAttribute('src', '#model-transistor');
  glbModel.setAttribute('position', '0 0 0');
  container.appendChild(glbModel);

  // Substrate Atomic Lattice Matrix
  const lattice = document.createElement('a-plane');
  lattice.setAttribute('position', '0 -0.068 0');
  lattice.setAttribute('rotation', '-90 0 0');
  lattice.setAttribute('width', '1.75');
  lattice.setAttribute('height', '1.25');
  lattice.setAttribute('material', 'color: #7c3aed; opacity: 0.25; transparent: true; wireframe: true; wireframeLinewidth: 1');
  txGroup.appendChild(lattice);

  // 2. SOURCE Terminal (Left N+ Well & Gold Contact)
  const sourceWell = document.createElement('a-box');
  sourceWell.setAttribute('position', '-0.55 -0.06 0');
  sourceWell.setAttribute('width', '0.45');
  sourceWell.setAttribute('height', '0.14');
  sourceWell.setAttribute('depth', '0.85');
  sourceWell.setAttribute('material', 'color: #274768; metalness: 0.7; roughness: 0.25');
  txGroup.appendChild(sourceWell);

  const sourceContact = document.createElement('a-box');
  sourceContact.setAttribute('position', '-0.55 0.09 0');
  sourceContact.setAttribute('width', '0.38');
  sourceContact.setAttribute('height', '0.18');
  sourceContact.setAttribute('depth', '0.65');
  sourceContact.setAttribute('material', 'color: #ffd166; metalness: 0.95; roughness: 0.15');
  txGroup.appendChild(sourceContact);

  const sourceLabel = document.createElement('a-text');
  sourceLabel.setAttribute('value', 'SOURCE\n[ e⁻ IN ]');
  sourceLabel.setAttribute('align', 'center');
  sourceLabel.setAttribute('position', '-0.55 0.24 0');
  sourceLabel.setAttribute('scale', '0.24 0.24 0.24');
  sourceLabel.setAttribute('color', '#ffd166');
  txGroup.appendChild(sourceLabel);

  // 3. DRAIN Terminal (Right N+ Well & Gold Contact)
  const drainWell = document.createElement('a-box');
  drainWell.setAttribute('position', '0.55 -0.06 0');
  drainWell.setAttribute('width', '0.45');
  drainWell.setAttribute('height', '0.14');
  drainWell.setAttribute('depth', '0.85');
  drainWell.setAttribute('material', 'color: #274768; metalness: 0.7; roughness: 0.25');
  txGroup.appendChild(drainWell);

  const drainContact = document.createElement('a-box');
  drainContact.setAttribute('position', '0.55 0.09 0');
  drainContact.setAttribute('width', '0.38');
  drainContact.setAttribute('height', '0.18');
  drainContact.setAttribute('depth', '0.65');
  drainContact.setAttribute('material', 'color: #ffd166; metalness: 0.95; roughness: 0.15');
  txGroup.appendChild(drainContact);

  const drainLabel = document.createElement('a-text');
  drainLabel.setAttribute('value', 'DRAIN\n[ e⁻ OUT ]');
  drainLabel.setAttribute('align', 'center');
  drainLabel.setAttribute('position', '0.55 0.24 0');
  drainLabel.setAttribute('scale', '0.24 0.24 0.24');
  drainLabel.setAttribute('color', '#ffd166');
  txGroup.appendChild(drainLabel);

  // 4. GATE DIELECTRIC & CONTROL GATE (Center)
  const oxideLayer = document.createElement('a-box');
  oxideLayer.setAttribute('position', '0 -0.01 0');
  oxideLayer.setAttribute('width', '0.52');
  oxideLayer.setAttribute('height', '0.025');
  oxideLayer.setAttribute('depth', '0.75');
  oxideLayer.setAttribute('material', 'color: #38bdf8; opacity: 0.6; transparent: true; roughness: 0.1');
  txGroup.appendChild(oxideLayer);

  // Metal Gate Electrode (Glows intensely when Gate Voltage is ON)
  const gateElectrode = document.createElement('a-box');
  gateElectrode.setAttribute('id', 'transistor-3d-gate');
  gateElectrode.setAttribute('position', '0 0.13 0');
  gateElectrode.setAttribute('width', '0.48');
  gateElectrode.setAttribute('height', '0.22');
  gateElectrode.setAttribute('depth', '0.65');
  gateElectrode.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.85; metalness: 0.9; roughness: 0.1');
  txGroup.appendChild(gateElectrode);

  const gateLabel = document.createElement('a-text');
  gateLabel.setAttribute('id', 'transistor-3d-gate-label');
  gateLabel.setAttribute('value', 'GATE\n[ VOLTAGE: ON ]');
  gateLabel.setAttribute('align', 'center');
  gateLabel.setAttribute('position', '0 0.3 0');
  gateLabel.setAttribute('scale', '0.24 0.24 0.24');
  gateLabel.setAttribute('color', '#00e5ff');
  txGroup.appendChild(gateLabel);

  // 5. CONDUCTIVE INVERSION CHANNEL (Electrons flow when ON)
  const channel = document.createElement('a-box');
  channel.setAttribute('id', 'transistor-3d-channel');
  channel.setAttribute('position', '0 -0.038 0');
  channel.setAttribute('width', '0.7');
  channel.setAttribute('height', '0.045');
  channel.setAttribute('depth', '0.65');
  channel.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 1.0; opacity: 0.9; transparent: true');
  txGroup.appendChild(channel);

  // 6. Streaming Electron Wave Particles across the Channel
  for (let e = 0; e < 12; e++) {
    const electron = document.createElement('a-sphere');
    electron.setAttribute('class', 'transistor-electron-particle');
    electron.setAttribute('position', `${-0.4 + (e % 6) * 0.16} -0.038 ${(Math.floor(e / 6) - 0.5) * 0.22}`);
    electron.setAttribute('radius', '0.022');
    electron.setAttribute('material', 'color: #ffffff; emissive: #00e5ff; emissiveIntensity: 1.2');
    electron.setAttribute('animation', `property: position; from: -0.5 -0.038 ${(Math.floor(e / 6) - 0.5) * 0.22}; to: 0.5 -0.038 ${(Math.floor(e / 6) - 0.5) * 0.22}; loop: true; dur: ${900 + (e % 3) * 250}; easing: linear`);
    txGroup.appendChild(electron);
  }

  container.appendChild(txGroup);

  return container;
}
