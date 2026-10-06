import * as THREE from 'three';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Accurate FileReader polyfill for Node.js
class FileReaderPolyfill {
  constructor() {
    this.readyState = 0;
    this.result = null;
    this.onload = null;
    this.onloadend = null;
    this.onerror = null;
  }
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      this.readyState = 2;
      if (typeof this.onload === 'function') this.onload({ target: this });
      if (typeof this.onloadend === 'function') this.onloadend({ target: this });
    }).catch((err) => {
      if (typeof this.onerror === 'function') this.onerror(err);
      if (typeof this.onloadend === 'function') this.onloadend({ target: this });
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      const b64 = Buffer.from(buf).toString('base64');
      this.result = `data:${blob.type || 'application/octet-stream'};base64,${b64}`;
      this.readyState = 2;
      if (typeof this.onload === 'function') this.onload({ target: this });
      if (typeof this.onloadend === 'function') this.onloadend({ target: this });
    }).catch((err) => {
      if (typeof this.onerror === 'function') this.onerror(err);
      if (typeof this.onloadend === 'function') this.onloadend({ target: this });
    });
  }
}

globalThis.FileReader = FileReaderPolyfill;
global.FileReader = FileReaderPolyfill;

const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/models');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function exportModel(sceneOrObject, baseName) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      sceneOrObject,
      (glb) => {
        try {
          const glbBuffer = Buffer.from(glb);
          const glbPath = path.join(outputDir, `${baseName}.glb`);
          fs.writeFileSync(glbPath, glbBuffer);
          console.log(`✓ Exported ${baseName}.glb (${(glbBuffer.length / 1024).toFixed(1)} KB)`);
          resolve(glbPath);
        } catch (err) {
          reject(err);
        }
      },
      (error) => {
        reject(error);
      },
      { binary: true }
    );
  });
}

// 1. COMPUTER CHASSIS
function createComputerModel() {
  const group = new THREE.Group();
  group.name = 'ComputerChassis';

  const baseGeo = new THREE.BoxGeometry(2.2, 0.1, 2.2);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -0.15;
  group.add(base);

  const pillarGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.4, 16);
  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.15 });
  const corners = [
    [-1.0, 0.55, -1.0], [1.0, 0.55, -1.0],
    [-1.0, 0.55, 1.0], [1.0, 0.55, 1.0]
  ];
  corners.forEach(([x, y, z]) => {
    const p = new THREE.Mesh(pillarGeo, pillarMat);
    p.position.set(x, y, z);
    group.add(p);
  });

  const railGeo = new THREE.BoxGeometry(2.05, 0.04, 0.04);
  const railMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.2 });
  const top1 = new THREE.Mesh(railGeo, railMat);
  top1.position.set(0, 1.25, -1.0);
  group.add(top1);
  const top2 = new THREE.Mesh(railGeo, railMat);
  top2.position.set(0, 1.25, 1.0);
  group.add(top2);

  const fanRingGeo = new THREE.TorusGeometry(0.22, 0.015, 16, 32);
  const fanRingMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.9, roughness: 0.2 });
  const fanHubGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.03, 16);
  const fanHubMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });

  [0.8, 0.35].forEach((yPos) => {
    const ring = new THREE.Mesh(fanRingGeo, fanRingMat);
    ring.position.set(1.02, yPos, 0);
    ring.rotation.y = Math.PI / 2;
    group.add(ring);

    const hub = new THREE.Mesh(fanHubGeo, fanHubMat);
    hub.position.set(1.02, yPos, 0);
    hub.rotation.z = Math.PI / 2;
    group.add(hub);
  });

  return group;
}

// 2. MOTHERBOARD
function createMotherboardModel() {
  const group = new THREE.Group();
  group.name = 'Motherboard';

  const pcbGeo = new THREE.BoxGeometry(1.6, 0.04, 1.6);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x0c2b1a, roughness: 0.35, metalness: 0.25 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  const socketGeo = new THREE.BoxGeometry(0.44, 0.035, 0.44);
  const socketMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.85, roughness: 0.2 });
  const socket = new THREE.Mesh(socketGeo, socketMat);
  socket.position.set(0, 0.04, 0);
  group.add(socket);

  const ihsGeo = new THREE.BoxGeometry(0.36, 0.025, 0.36);
  const ihsMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.95, roughness: 0.1 });
  const ihs = new THREE.Mesh(ihsGeo, ihsMat);
  ihs.position.set(0, 0.065, 0);
  group.add(ihs);

  const cpuGlowGeo = new THREE.TorusGeometry(0.25, 0.006, 16, 32);
  const cpuGlowMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.9 });
  const cpuGlow = new THREE.Mesh(cpuGlowGeo, cpuGlowMat);
  cpuGlow.position.set(0, 0.07, 0);
  cpuGlow.rotation.x = Math.PI / 2;
  group.add(cpuGlow);

  const dimmSlotGeo = new THREE.BoxGeometry(0.045, 0.025, 0.54);
  const dimmSlotMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const ramStickGeo = new THREE.BoxGeometry(0.03, 0.15, 0.52);
  const ramStickMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
  const rgbBarGeo = new THREE.BoxGeometry(0.032, 0.018, 0.51);
  const rgbBarMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 1.0 });

  [-0.045, 0.045].forEach((offset) => {
    const slot = new THREE.Mesh(dimmSlotGeo, dimmSlotMat);
    slot.position.set(0.48 + offset, 0.03, 0);
    group.add(slot);

    const stick = new THREE.Mesh(ramStickGeo, ramStickMat);
    stick.position.set(0.48 + offset, 0.11, 0);
    group.add(stick);

    const rgb = new THREE.Mesh(rgbBarGeo, rgbBarMat);
    rgb.position.set(0.48 + offset, 0.19, 0);
    group.add(rgb);
  });

  const gpuSlotGeo = new THREE.BoxGeometry(0.05, 0.025, 0.68);
  const gpuSlot = new THREE.Mesh(gpuSlotGeo, dimmSlotMat);
  gpuSlot.position.set(-0.52, 0.03, 0.3);
  group.add(gpuSlot);

  const gpuBodyGeo = new THREE.BoxGeometry(0.2, 0.24, 0.65);
  const gpuBodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.75, roughness: 0.25 });
  const gpuBody = new THREE.Mesh(gpuBodyGeo, gpuBodyMat);
  gpuBody.position.set(-0.52, 0.15, 0.3);
  group.add(gpuBody);

  const vrmGeo = new THREE.BoxGeometry(0.3, 0.09, 0.26);
  const vrmMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9, roughness: 0.2 });
  const vrm = new THREE.Mesh(vrmGeo, vrmMat);
  vrm.position.set(-0.4, 0.07, -0.42);
  group.add(vrm);

  const ssdGeo = new THREE.BoxGeometry(0.14, 0.02, 0.36);
  const ssdMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.15 });
  const ssd = new THREE.Mesh(ssdGeo, ssdMat);
  ssd.position.set(0.38, 0.035, 0.4);
  group.add(ssd);

  return group;
}

// 3. CPU PACKAGE
function createCPUModel() {
  const group = new THREE.Group();
  group.name = 'CPUPackage';

  const subGeo = new THREE.BoxGeometry(1.4, 0.05, 1.4);
  const subMat = new THREE.MeshStandardMaterial({ color: 0x113824, roughness: 0.4, metalness: 0.3 });
  const sub = new THREE.Mesh(subGeo, subMat);
  group.add(sub);

  const dieGeo = new THREE.BoxGeometry(0.85, 0.04, 0.85);
  const dieMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.95, roughness: 0.1 });
  const die = new THREE.Mesh(dieGeo, dieMat);
  die.position.y = 0.045;
  group.add(die);

  const coreGeo = new THREE.BoxGeometry(0.18, 0.012, 0.18);
  const coreMat = new THREE.MeshStandardMaterial({ color: 0x7c3aed, emissive: 0x7c3aed, emissiveIntensity: 0.75 });
  [
    [-0.24, -0.24], [0.24, -0.24], [-0.24, 0.24], [0.24, 0.24],
    [-0.24, 0.0], [0.24, 0.0], [0.0, -0.24], [0.0, 0.24]
  ].forEach(([cx, cz]) => {
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(cx, 0.07, cz);
    group.add(core);
  });

  return group;
}

// 4. CPU INTERNALS
function createCPUInternalsModel() {
  const group = new THREE.Group();
  group.name = 'CPUInternals';

  const floorGeo = new THREE.BoxGeometry(2.4, 0.05, 2.4);
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.7 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = -0.05;
  group.add(floor);

  const blockGeo = new THREE.BoxGeometry(0.65, 0.14, 0.55);
  const blockMat = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, metalness: 0.85, roughness: 0.2 });
  const aluMat = new THREE.MeshStandardMaterial({ color: 0x3b1d60, metalness: 0.85, roughness: 0.2 });

  const cu = new THREE.Mesh(blockGeo, blockMat);
  cu.position.set(-0.55, 0.05, 0.4);
  const alu = new THREE.Mesh(blockGeo, aluMat);
  alu.position.set(0.55, 0.05, 0.4);
  const reg = new THREE.Mesh(blockGeo, blockMat);
  reg.position.set(0.55, 0.05, -0.45);
  const cache = new THREE.Mesh(blockGeo, blockMat);
  cache.position.set(-0.55, 0.05, -0.45);

  group.add(cu, alu, reg, cache);
  return group;
}

// 5. LOGIC GATES
function createLogicGatesModel() {
  const group = new THREE.Group();
  group.name = 'LogicGates';

  const gateGeo = new THREE.BoxGeometry(0.65, 0.24, 0.55);
  const andMat = new THREE.MeshStandardMaterial({ color: 0x1e3a5f, metalness: 0.85, roughness: 0.2 });
  const notMat = new THREE.MeshStandardMaterial({ color: 0x3b1d60, metalness: 0.85, roughness: 0.2 });

  const andGate = new THREE.Mesh(gateGeo, andMat);
  andGate.position.set(-0.95, 0, 0);
  const orGate = new THREE.Mesh(gateGeo, andMat);
  orGate.position.set(0, 0, 0);
  const notGate = new THREE.Mesh(gateGeo, notMat);
  notGate.position.set(0.95, 0, 0);

  group.add(andGate, orGate, notGate);
  return group;
}

// 6. TRANSISTOR
function createTransistorModel() {
  const group = new THREE.Group();
  group.name = 'TransistorMOSFET';

  const subGeo = new THREE.BoxGeometry(1.8, 0.35, 1.3);
  const subMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.35 });
  const sub = new THREE.Mesh(subGeo, subMat);
  sub.position.y = -0.25;
  group.add(sub);

  const contactGeo = new THREE.BoxGeometry(0.38, 0.18, 0.65);
  const contactMat = new THREE.MeshStandardMaterial({ color: 0xffd166, metalness: 0.95, roughness: 0.15 });

  const source = new THREE.Mesh(contactGeo, contactMat);
  source.position.set(-0.55, 0.09, 0);
  const drain = new THREE.Mesh(contactGeo, contactMat);
  drain.position.set(0.55, 0.09, 0);

  const gateGeo = new THREE.BoxGeometry(0.48, 0.22, 0.65);
  const gateMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.9, metalness: 0.9 });
  const gate = new THREE.Mesh(gateGeo, gateMat);
  gate.position.set(0, 0.13, 0);

  const chanGeo = new THREE.BoxGeometry(0.7, 0.045, 0.65);
  const chanMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 1.0, opacity: 0.9, transparent: true });
  const chan = new THREE.Mesh(chanGeo, chanMat);
  chan.position.set(0, -0.038, 0);

  group.add(source, drain, gate, chan);
  return group;
}

async function main() {
  console.log('Generating GLB models in public/models/...');
  await exportModel(createComputerModel(), 'computer');
  await exportModel(createMotherboardModel(), 'motherboard');
  await exportModel(createCPUModel(), 'cpu');
  await exportModel(createCPUInternalsModel(), 'cpu-internals');
  await exportModel(createLogicGatesModel(), 'logic-gates');
  await exportModel(createTransistorModel(), 'transistor');
  console.log('✨ All GLB models generated successfully!');
}

main().catch(console.error);
