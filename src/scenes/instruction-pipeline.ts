export function buildInstructionPipelineScene(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-instruction-pipeline');
  container.setAttribute('position', '0 0 -5.8');

  // Pipeline Platform / Rail
  const rail = document.createElement('a-box');
  rail.setAttribute('position', '0 -0.15 0');
  rail.setAttribute('width', '2.4');
  rail.setAttribute('height', '0.04');
  rail.setAttribute('depth', '1.6');
  rail.setAttribute('material', 'color: #090e17; roughness: 0.4; metalness: 0.6');
  container.appendChild(rail);

  // Pipeline Stage 1: FETCH / INSTRUCTION (ADD R1, R2)
  const stage1 = document.createElement('a-entity');
  stage1.setAttribute('position', '-0.8 0 0.4');

  const block1 = document.createElement('a-box');
  block1.setAttribute('position', '0 0 0');
  block1.setAttribute('width', '0.45');
  block1.setAttribute('height', '0.14');
  block1.setAttribute('depth', '0.35');
  block1.setAttribute('material', 'color: #101c2b; metalness: 0.8; roughness: 0.2');
  stage1.appendChild(block1);

  const text1 = document.createElement('a-text');
  text1.setAttribute('value', 'INSTRUCTION\nADD R1, R2');
  text1.setAttribute('align', 'center');
  text1.setAttribute('position', '0 0.12 0');
  text1.setAttribute('scale', '0.22 0.22 0.22');
  text1.setAttribute('color', '#00e5ff');
  stage1.appendChild(text1);
  container.appendChild(stage1);

  // Pipeline Stage 2: DECODE / OPERANDS (R1=5, R2=3)
  const stage2 = document.createElement('a-entity');
  stage2.setAttribute('position', '-0.25 0 0.4');

  const block2 = document.createElement('a-box');
  block2.setAttribute('position', '0 0 0');
  block2.setAttribute('width', '0.45');
  block2.setAttribute('height', '0.14');
  block2.setAttribute('depth', '0.35');
  block2.setAttribute('material', 'color: #101c2b; metalness: 0.8; roughness: 0.2');
  stage2.appendChild(block2);

  const text2 = document.createElement('a-text');
  text2.setAttribute('value', 'OPERANDS\n[ 5 ]  [ 3 ]');
  text2.setAttribute('align', 'center');
  text2.setAttribute('position', '0 0.12 0');
  text2.setAttribute('scale', '0.22 0.22 0.22');
  text2.setAttribute('color', '#00e5ff');
  stage2.appendChild(text2);
  container.appendChild(stage2);

  // Pipeline Stage 3: EXECUTE / ALU (5 + 3)
  const stage3 = document.createElement('a-entity');
  stage3.setAttribute('position', '0.3 0 0.4');

  const block3 = document.createElement('a-box');
  block3.setAttribute('position', '0 0 0');
  block3.setAttribute('width', '0.45');
  block3.setAttribute('height', '0.14');
  block3.setAttribute('depth', '0.35');
  block3.setAttribute('material', 'color: #201138; metalness: 0.8; roughness: 0.2');
  stage3.appendChild(block3);

  const text3 = document.createElement('a-text');
  text3.setAttribute('value', 'ALU EXEC\n5 + 3');
  text3.setAttribute('align', 'center');
  text3.setAttribute('position', '0 0.12 0');
  text3.setAttribute('scale', '0.22 0.22 0.22');
  text3.setAttribute('color', '#7c3aed');
  stage3.appendChild(text3);
  container.appendChild(stage3);

  // Pipeline Stage 4: WRITEBACK / RESULT (8 -> R3)
  const stage4 = document.createElement('a-entity');
  stage4.setAttribute('position', '0.85 0 0.4');

  const block4 = document.createElement('a-box');
  block4.setAttribute('position', '0 0 0');
  block4.setAttribute('width', '0.45');
  block4.setAttribute('height', '0.14');
  block4.setAttribute('depth', '0.35');
  block4.setAttribute('material', 'color: #0f2824; metalness: 0.8; roughness: 0.2');
  stage4.appendChild(block4);

  const text4 = document.createElement('a-text');
  text4.setAttribute('value', 'RESULT\n[ 8 ]');
  text4.setAttribute('align', 'center');
  text4.setAttribute('position', '0 0.12 0');
  text4.setAttribute('scale', '0.22 0.22 0.22');
  text4.setAttribute('color', '#00e5ff');
  stage4.appendChild(text4);
  container.appendChild(stage4);

  // Animated Data Packets Flowing across the Pipeline
  const packet = document.createElement('a-sphere');
  packet.setAttribute('position', '-0.8 0.1 0.4');
  packet.setAttribute('radius', '0.04');
  packet.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 1.0');
  packet.setAttribute('animation', 'property: position; from: -0.8 0.1 0.4; to: 0.85 0.1 0.4; loop: true; dur: 2400; easing: easeInOutSine');
  container.appendChild(packet);

  // Pipeline Overhead Philosophical Banner in 3D
  const banner = document.createElement('a-text');
  banner.setAttribute('value', 'COMPLEX COMPUTATION IS BUILT FROM SIMPLER OPERATIONS');
  banner.setAttribute('align', 'center');
  banner.setAttribute('position', '0 0.4 -0.2');
  banner.setAttribute('scale', '0.24 0.24 0.24');
  banner.setAttribute('color', '#8b98a7');
  container.appendChild(banner);

  return container;
}
