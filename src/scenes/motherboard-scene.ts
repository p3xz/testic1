export function buildMotherboardScene(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-motherboard');
  container.setAttribute('position', '0 0 0');

  // Main Motherboard PCB Base (Dark Matte Multi-Layer Substrate)
  const pcb = document.createElement('a-box');
  pcb.setAttribute('position', '0 0 -0.1');
  pcb.setAttribute('width', '1.6');
  pcb.setAttribute('height', '0.04');
  pcb.setAttribute('depth', '1.6');
  pcb.setAttribute('material', 'color: #081018; roughness: 0.4; metalness: 0.3');
  container.appendChild(pcb);

  // PCB SilkScreen / Grid Traces Grid overlay
  const pcbGrid = document.createElement('a-plane');
  pcbGrid.setAttribute('position', '0 0.021 -0.1');
  pcbGrid.setAttribute('rotation', '-90 0 0');
  pcbGrid.setAttribute('width', '1.58');
  pcbGrid.setAttribute('height', '1.58');
  pcbGrid.setAttribute('material', 'color: #00e5ff; opacity: 0.08; transparent: true; wireframe: true; wireframeLinewidth: 1');
  container.appendChild(pcbGrid);

  // 1. CPU (Central Processing Unit) - Main Destination Component
  const cpuGroup = document.createElement('a-entity');
  cpuGroup.setAttribute('id', 'comp-cpu');
  cpuGroup.setAttribute('class', 'interactive-target');
  cpuGroup.setAttribute('data-component-id', 'cpu');
  cpuGroup.setAttribute('position', '0 0.04 -0.1');

  // CPU Socket Base & LGA Retention Frame
  const cpuSocket = document.createElement('a-box');
  cpuSocket.setAttribute('position', '0 0 0');
  cpuSocket.setAttribute('width', '0.42');
  cpuSocket.setAttribute('height', '0.03');
  cpuSocket.setAttribute('depth', '0.42');
  cpuSocket.setAttribute('material', 'color: #1a2330; metalness: 0.8; roughness: 0.3');
  cpuGroup.appendChild(cpuSocket);

  // CPU Integrated Heat Spreader (IHS) - Nickel Copper Cap
  const cpuIHS = document.createElement('a-box');
  cpuIHS.setAttribute('position', '0 0.02 0');
  cpuIHS.setAttribute('width', '0.36');
  cpuIHS.setAttribute('height', '0.02');
  cpuIHS.setAttribute('depth', '0.36');
  cpuIHS.setAttribute('material', 'color: #2b394a; metalness: 0.9; roughness: 0.15');
  cpuGroup.appendChild(cpuIHS);

  // CPU Golden Corner Accent Marker
  const cpuMarker = document.createElement('a-triangle');
  cpuMarker.setAttribute('position', '-0.14 0.032 -0.14');
  cpuMarker.setAttribute('rotation', '-90 0 0');
  cpuMarker.setAttribute('vertex-a', '0 0.03 0');
  cpuMarker.setAttribute('vertex-b', '-0.03 -0.03 0');
  cpuMarker.setAttribute('vertex-c', '0.03 -0.03 0');
  cpuMarker.setAttribute('material', 'color: #ffb703; metalness: 0.9; roughness: 0.2');
  cpuGroup.appendChild(cpuMarker);

  // CPU Subtle Glow Ring
  const cpuGlow = document.createElement('a-torus');
  cpuGlow.setAttribute('position', '0 0.025 0');
  cpuGlow.setAttribute('rotation', '90 0 0');
  cpuGlow.setAttribute('radius', '0.24');
  cpuGlow.setAttribute('radius-tubular', '0.005');
  cpuGlow.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.8; opacity: 0.7; transparent: true');
  cpuGroup.appendChild(cpuGlow);

  container.appendChild(cpuGroup);

  // 2. RAM (Random Access Memory) - High Speed Memory Modules
  const ramGroup = document.createElement('a-entity');
  ramGroup.setAttribute('id', 'comp-ram');
  ramGroup.setAttribute('class', 'interactive-target');
  ramGroup.setAttribute('data-component-id', 'ram');
  ramGroup.setAttribute('position', '0.45 0.04 -0.1');

  // 2x DDR5 DIMM Slots & Sticks
  for (let i = 0; i < 2; i++) {
    const xOffset = (i - 0.5) * 0.08;
    // DIMM Slot
    const slot = document.createElement('a-box');
    slot.setAttribute('position', `${xOffset} 0 0`);
    slot.setAttribute('width', '0.04');
    slot.setAttribute('height', '0.02');
    slot.setAttribute('depth', '0.52');
    slot.setAttribute('material', 'color: #111822; roughness: 0.7');
    ramGroup.appendChild(slot);

    // RAM Module PCB + Heat Spreader
    const stick = document.createElement('a-box');
    stick.setAttribute('position', `${xOffset} 0.08 0`);
    stick.setAttribute('width', '0.025');
    stick.setAttribute('height', '0.14');
    stick.setAttribute('depth', '0.5');
    stick.setAttribute('material', 'color: #1e293b; metalness: 0.8; roughness: 0.2');
    ramGroup.appendChild(stick);

    // RGB Top Diffuser Light Bar
    const rgbBar = document.createElement('a-box');
    rgbBar.setAttribute('position', `${xOffset} 0.155 0`);
    rgbBar.setAttribute('width', '0.027');
    rgbBar.setAttribute('height', '0.015');
    rgbBar.setAttribute('depth', '0.49');
    rgbBar.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.9; opacity: 0.85; transparent: true');
    ramGroup.appendChild(rgbBar);
  }
  container.appendChild(ramGroup);

  // 3. GPU (Graphics Processing Unit) - Massive Compute Accelerator
  const gpuGroup = document.createElement('a-entity');
  gpuGroup.setAttribute('id', 'comp-gpu');
  gpuGroup.setAttribute('class', 'interactive-target');
  gpuGroup.setAttribute('data-component-id', 'gpu');
  gpuGroup.setAttribute('position', '-0.5 0.04 0.25');

  // PCIe Slot
  const pcieSlot = document.createElement('a-box');
  pcieSlot.setAttribute('position', '0 0 0');
  pcieSlot.setAttribute('width', '0.04');
  pcieSlot.setAttribute('height', '0.02');
  pcieSlot.setAttribute('depth', '0.65');
  pcieSlot.setAttribute('material', 'color: #0b121b; roughness: 0.6');
  gpuGroup.appendChild(pcieSlot);

  // GPU Card Body / Shroud
  const gpuCard = document.createElement('a-box');
  gpuCard.setAttribute('position', '0 0.12 0');
  gpuCard.setAttribute('width', '0.18');
  gpuCard.setAttribute('height', '0.22');
  gpuCard.setAttribute('depth', '0.62');
  gpuCard.setAttribute('material', 'color: #131c28; metalness: 0.7; roughness: 0.3');
  gpuGroup.appendChild(gpuCard);

  // GPU Dual Axial Fans
  for (let f = 0; f < 2; f++) {
    const zOffset = (f - 0.5) * 0.26;
    const fanRing = document.createElement('a-torus');
    fanRing.setAttribute('position', `-0.092 0.12 ${zOffset}`);
    fanRing.setAttribute('rotation', '0 90 0');
    fanRing.setAttribute('radius', '0.08');
    fanRing.setAttribute('radius-tubular', '0.005');
    fanRing.setAttribute('material', 'color: #7c3aed; emissive: #7c3aed; emissiveIntensity: 0.7');
    fanRing.setAttribute('animation', 'property: rotation; to: 0 90 360; loop: true; dur: 2500; easing: linear');
    gpuGroup.appendChild(fanRing);
  }

  // GPU Backplate RGB Branding
  const gpuGlowBar = document.createElement('a-box');
  gpuGlowBar.setAttribute('position', '0.091 0.18 0');
  gpuGlowBar.setAttribute('width', '0.01');
  gpuGlowBar.setAttribute('height', '0.02');
  gpuGlowBar.setAttribute('depth', '0.4');
  gpuGlowBar.setAttribute('material', 'color: #7c3aed; emissive: #7c3aed; emissiveIntensity: 0.9');
  gpuGroup.appendChild(gpuGlowBar);

  container.appendChild(gpuGroup);

  // 4. STORAGE (M.2 NVMe SSD)
  const storageGroup = document.createElement('a-entity');
  storageGroup.setAttribute('id', 'comp-storage');
  storageGroup.setAttribute('class', 'interactive-target');
  storageGroup.setAttribute('data-component-id', 'storage');
  storageGroup.setAttribute('position', '0.35 0.035 0.35');

  const ssdShield = document.createElement('a-box');
  ssdShield.setAttribute('position', '0 0 0');
  ssdShield.setAttribute('width', '0.12');
  ssdShield.setAttribute('height', '0.015');
  ssdShield.setAttribute('depth', '0.34');
  ssdShield.setAttribute('material', 'color: #1f2a38; metalness: 0.85; roughness: 0.2');
  storageGroup.appendChild(ssdShield);

  // SSD Controller Chip
  const ssdChip = document.createElement('a-box');
  ssdChip.setAttribute('position', '0 0.01 0.08');
  ssdChip.setAttribute('width', '0.06');
  ssdChip.setAttribute('height', '0.01');
  ssdChip.setAttribute('depth', '0.06');
  ssdChip.setAttribute('material', 'color: #0b1118; metalness: 0.5');
  storageGroup.appendChild(ssdChip);

  container.appendChild(storageGroup);

  // 5. POWER (VRMs & Solid Capacitors)
  const powerGroup = document.createElement('a-entity');
  powerGroup.setAttribute('id', 'comp-power');
  powerGroup.setAttribute('class', 'interactive-target');
  powerGroup.setAttribute('data-component-id', 'power');
  powerGroup.setAttribute('position', '-0.38 0.04 -0.42');

  // VRM Aluminum Heat Sink Block
  const vrmHeatsink = document.createElement('a-box');
  vrmHeatsink.setAttribute('position', '0 0.04 0');
  vrmHeatsink.setAttribute('width', '0.28');
  vrmHeatsink.setAttribute('height', '0.08');
  vrmHeatsink.setAttribute('depth', '0.22');
  vrmHeatsink.setAttribute('material', 'color: #182332; metalness: 0.85; roughness: 0.25');
  powerGroup.appendChild(vrmHeatsink);

  // Row of Solid Polymer Capacitors
  for (let c = 0; c < 5; c++) {
    const cap = document.createElement('a-cylinder');
    cap.setAttribute('position', `${0.18} 0.03 ${(c - 2) * 0.06}`);
    cap.setAttribute('radius', '0.02');
    cap.setAttribute('height', '0.06');
    cap.setAttribute('material', 'color: #2e3d4f; metalness: 0.9; roughness: 0.1');
    powerGroup.appendChild(cap);
  }
  container.appendChild(powerGroup);

  // 6. DATA BUS (High-Speed Copper Interconnect Traces)
  const dataBusGroup = document.createElement('a-entity');
  dataBusGroup.setAttribute('id', 'comp-data_bus');
  dataBusGroup.setAttribute('class', 'interactive-target');
  dataBusGroup.setAttribute('data-component-id', 'data_bus');
  dataBusGroup.setAttribute('position', '0.12 0.025 0.1');

  // Trace Buses: Cyan glowing conductive paths linking CPU to RAM, GPU, Storage
  const trace1 = document.createElement('a-plane');
  trace1.setAttribute('position', '0.1 0 -0.1');
  trace1.setAttribute('rotation', '-90 0 0');
  trace1.setAttribute('width', '0.35');
  trace1.setAttribute('height', '0.06');
  trace1.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.8; opacity: 0.7; transparent: true');
  dataBusGroup.appendChild(trace1);

  const trace2 = document.createElement('a-plane');
  trace2.setAttribute('position', '-0.2 0 0.1');
  trace2.setAttribute('rotation', '-90 0 45');
  trace2.setAttribute('width', '0.45');
  trace2.setAttribute('height', '0.04');
  trace2.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.8; opacity: 0.7; transparent: true');
  dataBusGroup.appendChild(trace2);

  container.appendChild(dataBusGroup);

  return container;
}
