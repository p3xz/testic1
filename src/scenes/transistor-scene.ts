export function buildTransistorScene(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-transistor');
  container.setAttribute('position', '0 0 -10.8');

  // Main Transistor Container (Interactive Target)
  const txGroup = document.createElement('a-entity');
  txGroup.setAttribute('id', 'comp-transistor_core');
  txGroup.setAttribute('class', 'interactive-target');
  txGroup.setAttribute('data-component-id', 'transistor_core');
  txGroup.setAttribute('position', '0 0 0');

  // 1. Silicon Substrate Bed (P-Type Base)
  const substrate = document.createElement('a-box');
  substrate.setAttribute('position', '0 -0.25 0');
  substrate.setAttribute('width', '1.6');
  substrate.setAttribute('height', '0.35');
  substrate.setAttribute('depth', '1.2');
  substrate.setAttribute('material', 'color: #0c1524; metalness: 0.6; roughness: 0.4');
  txGroup.appendChild(substrate);

  // Substrate Atomic Lattice Matrix
  const lattice = document.createElement('a-plane');
  lattice.setAttribute('position', '0 -0.07 0');
  lattice.setAttribute('rotation', '-90 0 0');
  lattice.setAttribute('width', '1.55');
  lattice.setAttribute('height', '1.15');
  lattice.setAttribute('material', 'color: #7c3aed; opacity: 0.2; transparent: true; wireframe: true; wireframeLinewidth: 1');
  txGroup.appendChild(lattice);

  // 2. SOURCE Terminal (Left N+ Well & Gold Contact)
  const sourceWell = document.createElement('a-box');
  sourceWell.setAttribute('position', '-0.5 -0.06 0');
  sourceWell.setAttribute('width', '0.42');
  sourceWell.setAttribute('height', '0.12');
  sourceWell.setAttribute('depth', '0.8');
  sourceWell.setAttribute('material', 'color: #1a2f45; metalness: 0.7; roughness: 0.3');
  txGroup.appendChild(sourceWell);

  const sourceContact = document.createElement('a-box');
  sourceContact.setAttribute('position', '-0.5 0.08 0');
  sourceContact.setAttribute('width', '0.35');
  sourceContact.setAttribute('height', '0.16');
  sourceContact.setAttribute('depth', '0.6');
  sourceContact.setAttribute('material', 'color: #ffd166; metalness: 0.95; roughness: 0.15');
  txGroup.appendChild(sourceContact);

  const sourceLabel = document.createElement('a-text');
  sourceLabel.setAttribute('value', 'SOURCE\n[ e⁻ IN ]');
  sourceLabel.setAttribute('align', 'center');
  sourceLabel.setAttribute('position', '-0.5 0.22 0');
  sourceLabel.setAttribute('scale', '0.22 0.22 0.22');
  sourceLabel.setAttribute('color', '#ffd166');
  txGroup.appendChild(sourceLabel);

  // 3. DRAIN Terminal (Right N+ Well & Gold Contact)
  const drainWell = document.createElement('a-box');
  drainWell.setAttribute('position', '0.5 -0.06 0');
  drainWell.setAttribute('width', '0.42');
  drainWell.setAttribute('height', '0.12');
  drainWell.setAttribute('depth', '0.8');
  drainWell.setAttribute('material', 'color: #1a2f45; metalness: 0.7; roughness: 0.3');
  txGroup.appendChild(drainWell);

  const drainContact = document.createElement('a-box');
  drainContact.setAttribute('position', '0.5 0.08 0');
  drainContact.setAttribute('width', '0.35');
  drainContact.setAttribute('height', '0.16');
  drainContact.setAttribute('depth', '0.6');
  drainContact.setAttribute('material', 'color: #ffd166; metalness: 0.95; roughness: 0.15');
  txGroup.appendChild(drainContact);

  const drainLabel = document.createElement('a-text');
  drainLabel.setAttribute('value', 'DRAIN\n[ e⁻ OUT ]');
  drainLabel.setAttribute('align', 'center');
  drainLabel.setAttribute('position', '0.5 0.22 0');
  drainLabel.setAttribute('scale', '0.22 0.22 0.22');
  drainLabel.setAttribute('color', '#ffd166');
  txGroup.appendChild(drainLabel);

  // 4. GATE DIELECTRIC & CONTROL GATE (Center)
  const oxideLayer = document.createElement('a-box');
  oxideLayer.setAttribute('position', '0 -0.01 0');
  oxideLayer.setAttribute('width', '0.48');
  oxideLayer.setAttribute('height', '0.02');
  oxideLayer.setAttribute('depth', '0.7');
  oxideLayer.setAttribute('material', 'color: #3b82f6; opacity: 0.5; transparent: true; roughness: 0.1');
  txGroup.appendChild(oxideLayer);

  // Metal Gate Electrode (Glows intensely when Gate Voltage is ON)
  const gateElectrode = document.createElement('a-box');
  gateElectrode.setAttribute('id', 'transistor-3d-gate');
  gateElectrode.setAttribute('position', '0 0.12 0');
  gateElectrode.setAttribute('width', '0.44');
  gateElectrode.setAttribute('height', '0.2');
  gateElectrode.setAttribute('depth', '0.6');
  gateElectrode.setAttribute('material', 'color: #1e3a5f; emissive: #00e5ff; emissiveIntensity: 0.8; metalness: 0.9; roughness: 0.1');
  txGroup.appendChild(gateElectrode);

  const gateLabel = document.createElement('a-text');
  gateLabel.setAttribute('id', 'transistor-3d-gate-label');
  gateLabel.setAttribute('value', 'GATE\n[ VOLTAGE: ON ]');
  gateLabel.setAttribute('align', 'center');
  gateLabel.setAttribute('position', '0 0.28 0');
  gateLabel.setAttribute('scale', '0.22 0.22 0.22');
  gateLabel.setAttribute('color', '#00e5ff');
  txGroup.appendChild(gateLabel);

  // 5. CONDUCTIVE INVERSION CHANNEL (Electrons flow when ON)
  const channel = document.createElement('a-box');
  channel.setAttribute('id', 'transistor-3d-channel');
  channel.setAttribute('position', '0 -0.04 0');
  channel.setAttribute('width', '0.65');
  channel.setAttribute('height', '0.04');
  channel.setAttribute('depth', '0.6');
  channel.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 1.0; opacity: 0.9; transparent: true');
  txGroup.appendChild(channel);

  // 6. Streaming Electron Wave Particles across the Channel
  for (let e = 0; e < 12; e++) {
    const electron = document.createElement('a-sphere');
    electron.setAttribute('class', 'transistor-electron-particle');
    electron.setAttribute('position', `${-0.35 + (e % 6) * 0.14} -0.04 ${(Math.floor(e / 6) - 0.5) * 0.2}`);
    electron.setAttribute('radius', '0.018');
    electron.setAttribute('material', 'color: #ffffff; emissive: #00e5ff; emissiveIntensity: 1.0');
    electron.setAttribute('animation', `property: position; from: -0.45 -0.04 ${(Math.floor(e / 6) - 0.5) * 0.2}; to: 0.45 -0.04 ${(Math.floor(e / 6) - 0.5) * 0.2}; loop: true; dur: ${1000 + (e % 3) * 300}; easing: linear`);
    txGroup.appendChild(electron);
  }

  container.appendChild(txGroup);

  return container;
}
