export function buildCPUInternalsScene(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-cpu-internals');
  container.setAttribute('position', '0 0 -3.4');

  // Microscopic Silicon Die Substrate Bed
  const dieFloor = document.createElement('a-box');
  dieFloor.setAttribute('position', '0 -0.05 0');
  dieFloor.setAttribute('width', '2.2');
  dieFloor.setAttribute('height', '0.04');
  dieFloor.setAttribute('depth', '2.2');
  dieFloor.setAttribute('material', 'color: #070d18; roughness: 0.3; metalness: 0.7');
  container.appendChild(dieFloor);

  // Micro-circuit Trace Grid
  const traceGrid = document.createElement('a-plane');
  traceGrid.setAttribute('position', '0 -0.028 0');
  traceGrid.setAttribute('rotation', '-90 0 0');
  traceGrid.setAttribute('width', '2.1');
  traceGrid.setAttribute('height', '2.1');
  traceGrid.setAttribute('material', 'color: #00e5ff; opacity: 0.15; transparent: true; wireframe: true; wireframeLinewidth: 1');
  container.appendChild(traceGrid);

  // 1. CONTROL UNIT (Coordinates instruction execution)
  const cuGroup = document.createElement('a-entity');
  cuGroup.setAttribute('id', 'comp-control_unit');
  cuGroup.setAttribute('class', 'interactive-target');
  cuGroup.setAttribute('data-component-id', 'control_unit');
  cuGroup.setAttribute('position', '-0.55 0.05 0.4');

  const cuBlock = document.createElement('a-box');
  cuBlock.setAttribute('position', '0 0 0');
  cuBlock.setAttribute('width', '0.6');
  cuBlock.setAttribute('height', '0.12');
  cuBlock.setAttribute('depth', '0.5');
  cuBlock.setAttribute('material', 'color: #0f2238; metalness: 0.8; roughness: 0.2');
  cuGroup.appendChild(cuBlock);

  const cuPillar = document.createElement('a-box');
  cuPillar.setAttribute('position', '0 0.065 0');
  cuPillar.setAttribute('width', '0.54');
  cuPillar.setAttribute('height', '0.02');
  cuPillar.setAttribute('depth', '0.44');
  cuPillar.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.7; opacity: 0.8; transparent: true');
  cuGroup.appendChild(cuPillar);

  container.appendChild(cuGroup);

  // 2. ALU (Arithmetic Logic Unit - Performs math and logic)
  const aluGroup = document.createElement('a-entity');
  aluGroup.setAttribute('id', 'comp-alu');
  aluGroup.setAttribute('class', 'interactive-target');
  aluGroup.setAttribute('data-component-id', 'alu');
  aluGroup.setAttribute('position', '0.55 0.05 0.4');

  const aluBlock = document.createElement('a-box');
  aluBlock.setAttribute('position', '0 0 0');
  aluBlock.setAttribute('width', '0.6');
  aluBlock.setAttribute('height', '0.12');
  aluBlock.setAttribute('depth', '0.5');
  aluBlock.setAttribute('material', 'color: #1f1338; metalness: 0.8; roughness: 0.2');
  aluGroup.appendChild(aluBlock);

  const aluPillar = document.createElement('a-box');
  aluPillar.setAttribute('position', '0 0.065 0');
  aluPillar.setAttribute('width', '0.54');
  aluPillar.setAttribute('height', '0.02');
  aluPillar.setAttribute('depth', '0.44');
  aluPillar.setAttribute('material', 'color: #7c3aed; emissive: #7c3aed; emissiveIntensity: 0.8; opacity: 0.8; transparent: true');
  aluGroup.appendChild(aluPillar);

  container.appendChild(aluGroup);

  // 3. REGISTERS (Ultra-fast storage locations)
  const regGroup = document.createElement('a-entity');
  regGroup.setAttribute('id', 'comp-registers');
  regGroup.setAttribute('class', 'interactive-target');
  regGroup.setAttribute('data-component-id', 'registers');
  regGroup.setAttribute('position', '0.55 0.05 -0.45');

  const regBlock = document.createElement('a-box');
  regBlock.setAttribute('position', '0 0 0');
  regBlock.setAttribute('width', '0.6');
  regBlock.setAttribute('height', '0.12');
  regBlock.setAttribute('depth', '0.5');
  regBlock.setAttribute('material', 'color: #0f2238; metalness: 0.8; roughness: 0.2');
  regGroup.appendChild(regBlock);

  // 4 Register Cell Slots
  for (let r = 0; r < 4; r++) {
    const regCell = document.createElement('a-box');
    regCell.setAttribute('position', `${(r - 1.5) * 0.12} 0.065 0`);
    regCell.setAttribute('width', '0.09');
    regCell.setAttribute('height', '0.02');
    regCell.setAttribute('depth', '0.4');
    regCell.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.8; opacity: 0.8; transparent: true');
    regGroup.appendChild(regCell);
  }
  container.appendChild(regGroup);

  // 4. CACHE (L1/L2 High-speed SRAM storage)
  const cacheGroup = document.createElement('a-entity');
  cacheGroup.setAttribute('id', 'comp-cache');
  cacheGroup.setAttribute('class', 'interactive-target');
  cacheGroup.setAttribute('data-component-id', 'cache');
  cacheGroup.setAttribute('position', '-0.55 0.05 -0.45');

  const cacheBlock = document.createElement('a-box');
  cacheBlock.setAttribute('position', '0 0 0');
  cacheBlock.setAttribute('width', '0.6');
  cacheBlock.setAttribute('height', '0.12');
  cacheBlock.setAttribute('depth', '0.5');
  cacheBlock.setAttribute('material', 'color: #0f2238; metalness: 0.8; roughness: 0.2');
  cacheGroup.appendChild(cacheBlock);

  const cachePillar = document.createElement('a-box');
  cachePillar.setAttribute('position', '0 0.065 0');
  cachePillar.setAttribute('width', '0.54');
  cachePillar.setAttribute('height', '0.02');
  cachePillar.setAttribute('depth', '0.44');
  cachePillar.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.6; opacity: 0.7; transparent: true');
  cacheGroup.appendChild(cachePillar);

  container.appendChild(cacheGroup);

  // High-Speed Silicon Data Buses (Interconnecting the 4 Units)
  const busH = document.createElement('a-plane');
  busH.setAttribute('position', '0 -0.02 0.4');
  busH.setAttribute('rotation', '-90 0 0');
  busH.setAttribute('width', '0.8');
  busH.setAttribute('height', '0.08');
  busH.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.9; opacity: 0.75; transparent: true');
  container.appendChild(busH);

  const busV = document.createElement('a-plane');
  busV.setAttribute('position', '0.55 -0.02 0');
  busV.setAttribute('rotation', '-90 0 0');
  busV.setAttribute('width', '0.08');
  busV.setAttribute('height', '0.6');
  busV.setAttribute('material', 'color: #7c3aed; emissive: #7c3aed; emissiveIntensity: 0.9; opacity: 0.75; transparent: true');
  container.appendChild(busV);

  const busDiag = document.createElement('a-plane');
  busDiag.setAttribute('position', '-0.55 -0.02 0');
  busDiag.setAttribute('rotation', '-90 0 0');
  busDiag.setAttribute('width', '0.08');
  busDiag.setAttribute('height', '0.6');
  busDiag.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.9; opacity: 0.75; transparent: true');
  container.appendChild(busDiag);

  return container;
}
