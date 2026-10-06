import { buildComputerChassis } from './computer-chassis';
import { buildMotherboardScene } from './motherboard-scene';
import { buildCPUPackagingScene } from './cpu-packaging';
import { buildCPUInternalsScene } from './cpu-internals';
import { buildInstructionPipelineScene } from './instruction-pipeline';
import { buildLogicGatesScene } from './logic-gates-scene';
import { buildTransistorScene } from './transistor-scene';
import { buildScaleUniverse } from './scale-universe';

export function assemble3DWorld(sceneElement: HTMLElement) {
  // Clear any existing entities except camera/lighting rigs
  const existingWorld = sceneElement.querySelector('#world-root');
  if (existingWorld) {
    existingWorld.remove();
  }

  const worldRoot = document.createElement('a-entity');
  worldRoot.setAttribute('id', 'world-root');

  // Mount all 7 depth layers in one continuous 3D world
  worldRoot.appendChild(buildScaleUniverse());
  worldRoot.appendChild(buildComputerChassis());
  worldRoot.appendChild(buildMotherboardScene());
  worldRoot.appendChild(buildCPUPackagingScene());
  worldRoot.appendChild(buildCPUInternalsScene());
  worldRoot.appendChild(buildInstructionPipelineScene());
  worldRoot.appendChild(buildLogicGatesScene());
  worldRoot.appendChild(buildTransistorScene());

  sceneElement.appendChild(worldRoot);
}
