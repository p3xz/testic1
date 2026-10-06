export function buildLogicGatesScene(): HTMLElement {
  const container = document.createElement('a-entity');
  container.setAttribute('id', 'scene-logic-gates');
  container.setAttribute('position', '0 0 -18.5');

  // Ground Grid Substrate
  const grid = document.createElement('a-plane');
  grid.setAttribute('position', '0 -0.4 0');
  grid.setAttribute('rotation', '-90 0 0');
  grid.setAttribute('width', '3.5');
  grid.setAttribute('height', '2.5');
  grid.setAttribute('material', 'color: #00e5ff; opacity: 0.15; transparent: true; wireframe: true; wireframeLinewidth: 1');
  container.appendChild(grid);

  // 1. AND GATE (Left: -0.95, 0, 0)
  const andGroup = document.createElement('a-entity');
  andGroup.setAttribute('id', 'comp-gate_and');
  andGroup.setAttribute('class', 'interactive-target');
  andGroup.setAttribute('data-component-id', 'gate_and');
  andGroup.setAttribute('position', '-0.95 0 0');

  // Gate Housing Body
  const andBody = document.createElement('a-box');
  andBody.setAttribute('position', '0 0 0');
  andBody.setAttribute('width', '0.65');
  andBody.setAttribute('height', '0.24');
  andBody.setAttribute('depth', '0.55');
  andBody.setAttribute('material', 'color: #1e3a5f; metalness: 0.85; roughness: 0.2');
  andGroup.appendChild(andBody);

  // Gate Top Symbol / Label
  const andLabel = document.createElement('a-text');
  andLabel.setAttribute('value', 'AND [ · ]\nA · B = Y');
  andLabel.setAttribute('align', 'center');
  andLabel.setAttribute('position', '0 0.15 0');
  andLabel.setAttribute('scale', '0.22 0.22 0.22');
  andLabel.setAttribute('color', '#00e5ff');
  andGroup.appendChild(andLabel);

  // Dual Input Terminal Pins
  const andInA = document.createElement('a-cylinder');
  andInA.setAttribute('id', 'gate-and-pin-a');
  andInA.setAttribute('position', '-0.16 0 0.3');
  andInA.setAttribute('rotation', '90 0 0');
  andInA.setAttribute('radius', '0.025');
  andInA.setAttribute('height', '0.12');
  andInA.setAttribute('material', 'color: #475569; emissive: #00e5ff; emissiveIntensity: 0.2');
  andGroup.appendChild(andInA);

  const andInB = document.createElement('a-cylinder');
  andInB.setAttribute('id', 'gate-and-pin-b');
  andInB.setAttribute('position', '0.16 0 0.3');
  andInB.setAttribute('rotation', '90 0 0');
  andInB.setAttribute('radius', '0.025');
  andInB.setAttribute('height', '0.12');
  andInB.setAttribute('material', 'color: #475569; emissive: #00e5ff; emissiveIntensity: 0.2');
  andGroup.appendChild(andInB);

  // Output Terminal Pin
  const andOut = document.createElement('a-cylinder');
  andOut.setAttribute('id', 'gate-and-pin-out');
  andOut.setAttribute('position', '0 0 -0.3');
  andOut.setAttribute('rotation', '90 0 0');
  andOut.setAttribute('radius', '0.03');
  andOut.setAttribute('height', '0.12');
  andOut.setAttribute('material', 'color: #475569; emissive: #00e5ff; emissiveIntensity: 0.2');
  andGroup.appendChild(andOut);

  container.appendChild(andGroup);

  // 2. OR GATE (Center: 0, 0, 0)
  const orGroup = document.createElement('a-entity');
  orGroup.setAttribute('id', 'comp-gate_or');
  orGroup.setAttribute('class', 'interactive-target');
  orGroup.setAttribute('data-component-id', 'gate_or');
  orGroup.setAttribute('position', '0 0 0');

  const orBody = document.createElement('a-box');
  orBody.setAttribute('position', '0 0 0');
  orBody.setAttribute('width', '0.65');
  orBody.setAttribute('height', '0.24');
  orBody.setAttribute('depth', '0.55');
  orBody.setAttribute('material', 'color: #1e3a5f; metalness: 0.85; roughness: 0.2');
  orGroup.appendChild(orBody);

  const orLabel = document.createElement('a-text');
  orLabel.setAttribute('value', 'OR [ + ]\nA + B = Y');
  orLabel.setAttribute('align', 'center');
  orLabel.setAttribute('position', '0 0.15 0');
  orLabel.setAttribute('scale', '0.22 0.22 0.22');
  orLabel.setAttribute('color', '#00e5ff');
  orGroup.appendChild(orLabel);

  // OR Input Terminal Pins
  const orInA = document.createElement('a-cylinder');
  orInA.setAttribute('id', 'gate-or-pin-a');
  orInA.setAttribute('position', '-0.16 0 0.3');
  orInA.setAttribute('rotation', '90 0 0');
  orInA.setAttribute('radius', '0.025');
  orInA.setAttribute('height', '0.12');
  orInA.setAttribute('material', 'color: #475569; emissive: #00e5ff; emissiveIntensity: 0.2');
  orGroup.appendChild(orInA);

  const orInB = document.createElement('a-cylinder');
  orInB.setAttribute('id', 'gate-or-pin-b');
  orInB.setAttribute('position', '0.16 0 0.3');
  orInB.setAttribute('rotation', '90 0 0');
  orInB.setAttribute('radius', '0.025');
  orInB.setAttribute('height', '0.12');
  orInB.setAttribute('material', 'color: #475569; emissive: #00e5ff; emissiveIntensity: 0.2');
  orGroup.appendChild(orInB);

  // OR Output Terminal Pin
  const orOut = document.createElement('a-cylinder');
  orOut.setAttribute('id', 'gate-or-pin-out');
  orOut.setAttribute('position', '0 0 -0.3');
  orOut.setAttribute('rotation', '90 0 0');
  orOut.setAttribute('radius', '0.03');
  orOut.setAttribute('height', '0.12');
  orOut.setAttribute('material', 'color: #475569; emissive: #00e5ff; emissiveIntensity: 0.2');
  orGroup.appendChild(orOut);

  container.appendChild(orGroup);

  // 3. NOT GATE (Right: 0.95, 0, 0)
  const notGroup = document.createElement('a-entity');
  notGroup.setAttribute('id', 'comp-gate_not');
  notGroup.setAttribute('class', 'interactive-target');
  notGroup.setAttribute('data-component-id', 'gate_not');
  notGroup.setAttribute('position', '0.95 0 0');

  const notBody = document.createElement('a-box');
  notBody.setAttribute('position', '0 0 0');
  notBody.setAttribute('width', '0.55');
  notBody.setAttribute('height', '0.24');
  notBody.setAttribute('depth', '0.55');
  notBody.setAttribute('material', 'color: #3b1d60; metalness: 0.85; roughness: 0.2');
  notGroup.appendChild(notBody);

  const notLabel = document.createElement('a-text');
  notLabel.setAttribute('value', 'NOT [ ¬ ]\n¬A = Y');
  notLabel.setAttribute('align', 'center');
  notLabel.setAttribute('position', '0 0.15 0');
  notLabel.setAttribute('scale', '0.22 0.22 0.22');
  notLabel.setAttribute('color', '#7c3aed');
  notGroup.appendChild(notLabel);

  // Single Input Pin
  const notInA = document.createElement('a-cylinder');
  notInA.setAttribute('id', 'gate-not-pin-a');
  notInA.setAttribute('position', '0 0 0.3');
  notInA.setAttribute('rotation', '90 0 0');
  notInA.setAttribute('radius', '0.025');
  notInA.setAttribute('height', '0.12');
  notInA.setAttribute('material', 'color: #475569; emissive: #7c3aed; emissiveIntensity: 0.2');
  notGroup.appendChild(notInA);

  // Inversion Bubble
  const notBubble = document.createElement('a-sphere');
  notBubble.setAttribute('position', '0 0 -0.28');
  notBubble.setAttribute('radius', '0.04');
  notBubble.setAttribute('material', 'color: #7c3aed; metalness: 0.9');
  notGroup.appendChild(notBubble);

  // Output Pin
  const notOut = document.createElement('a-cylinder');
  notOut.setAttribute('id', 'gate-not-pin-out');
  notOut.setAttribute('position', '0 0 -0.34');
  notOut.setAttribute('rotation', '90 0 0');
  notOut.setAttribute('radius', '0.03');
  notOut.setAttribute('height', '0.1');
  notOut.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.85');
  notGroup.appendChild(notOut);

  container.appendChild(notGroup);

  return container;
}
