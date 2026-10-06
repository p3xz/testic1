import { COMPONENTS_DATA, type InteractiveComponentData } from '../data/components';
import { soundSynth } from '../audio/sound-synth';

export interface LogicGateState {
  andA: number;
  andB: number;
  andOut: number;
  orA: number;
  orB: number;
  orOut: number;
  notA: number;
  notOut: number;
}

export class InteractionManager {
  private selectedComponent: InteractiveComponentData | null = null;
  private onSelectCallback: ((comp: InteractiveComponentData | null) => void) | null = null;
  private onGateStateChangeCallback: ((state: LogicGateState) => void) | null = null;
  private onTransistorStateChangeCallback: ((isOn: boolean) => void) | null = null;

  public logicGateState: LogicGateState = {
    andA: 0,
    andB: 0,
    andOut: 0,
    orA: 0,
    orB: 0,
    orOut: 0,
    notA: 0,
    notOut: 1
  };

  public isTransistorOn: boolean = true;

  constructor() {
    this.setupEventListeners();
  }

  public onComponentSelect(callback: (comp: InteractiveComponentData | null) => void) {
    this.onSelectCallback = callback;
  }

  public onLogicGateChange(callback: (state: LogicGateState) => void) {
    this.onGateStateChangeCallback = callback;
  }

  public onTransistorChange(callback: (isOn: boolean) => void) {
    this.onTransistorStateChangeCallback = callback;
  }

  public selectComponent(compId: string | null) {
    if (!compId) {
      this.selectedComponent = null;
      if (this.onSelectCallback) this.onSelectCallback(null);
      return;
    }

    const data = COMPONENTS_DATA[compId];
    if (data) {
      this.selectedComponent = data;
      soundSynth.playClickSound();
      if (this.onSelectCallback) this.onSelectCallback(data);
    }
  }

  public getSelectedComponent(): InteractiveComponentData | null {
    return this.selectedComponent;
  }

  public toggleLogicInput(gate: 'AND' | 'OR' | 'NOT', input: 'A' | 'B') {
    if (gate === 'AND') {
      if (input === 'A') this.logicGateState.andA = this.logicGateState.andA === 1 ? 0 : 1;
      if (input === 'B') this.logicGateState.andB = this.logicGateState.andB === 1 ? 0 : 1;
      this.logicGateState.andOut = (this.logicGateState.andA && this.logicGateState.andB) ? 1 : 0;
      soundSynth.playToggleSound(this.logicGateState.andOut === 1);
    } else if (gate === 'OR') {
      if (input === 'A') this.logicGateState.orA = this.logicGateState.orA === 1 ? 0 : 1;
      if (input === 'B') this.logicGateState.orB = this.logicGateState.orB === 1 ? 0 : 1;
      this.logicGateState.orOut = (this.logicGateState.orA || this.logicGateState.orB) ? 1 : 0;
      soundSynth.playToggleSound(this.logicGateState.orOut === 1);
    } else if (gate === 'NOT') {
      this.logicGateState.notA = this.logicGateState.notA === 1 ? 0 : 1;
      this.logicGateState.notOut = this.logicGateState.notA === 1 ? 0 : 1;
      soundSynth.playToggleSound(this.logicGateState.notOut === 1);
    }

    this.update3DLogicGateVisuals();
    if (this.onGateStateChangeCallback) {
      this.onGateStateChangeCallback(this.logicGateState);
    }
  }

  public toggleTransistor(forcedState?: boolean) {
    this.isTransistorOn = forcedState !== undefined ? forcedState : !this.isTransistorOn;
    soundSynth.playToggleSound(this.isTransistorOn);
    this.update3DTransistorVisuals();
    if (this.onTransistorStateChangeCallback) {
      this.onTransistorStateChangeCallback(this.isTransistorOn);
    }
  }

  private update3DLogicGateVisuals() {
    const setPin = (id: string, active: boolean, color = '#00e5ff') => {
      const el = document.querySelector(`#${id}`);
      if (el) {
        el.setAttribute('material', `color: ${active ? color : '#334155'}; emissive: ${active ? color : '#000000'}; emissiveIntensity: ${active ? 0.9 : 0.0}`);
      }
    };

    setPin('gate-and-pin-a', this.logicGateState.andA === 1);
    setPin('gate-and-pin-b', this.logicGateState.andB === 1);
    setPin('gate-and-pin-out', this.logicGateState.andOut === 1);

    setPin('gate-or-pin-a', this.logicGateState.orA === 1);
    setPin('gate-or-pin-b', this.logicGateState.orB === 1);
    setPin('gate-or-pin-out', this.logicGateState.orOut === 1);

    setPin('gate-not-pin-a', this.logicGateState.notA === 1, '#7c3aed');
    setPin('gate-not-pin-out', this.logicGateState.notOut === 1, '#00e5ff');
  }

  private update3DTransistorVisuals() {
    const gateEl = document.querySelector('#transistor-3d-gate');
    const labelEl = document.querySelector('#transistor-3d-gate-label');
    const channelEl = document.querySelector('#transistor-3d-channel');
    const particles = document.querySelectorAll('.transistor-electron-particle');

    if (this.isTransistorOn) {
      if (gateEl) gateEl.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 0.9; metalness: 0.8');
      if (labelEl) {
        labelEl.setAttribute('value', 'GATE\n[ VOLTAGE: ON (1) ]');
        labelEl.setAttribute('color', '#00e5ff');
      }
      if (channelEl) channelEl.setAttribute('material', 'color: #00e5ff; emissive: #00e5ff; emissiveIntensity: 1.0; opacity: 0.9; transparent: true');
      particles.forEach(p => {
        p.setAttribute('visible', 'true');
      });
    } else {
      if (gateEl) gateEl.setAttribute('material', 'color: #1e293b; emissive: #000000; emissiveIntensity: 0.0; metalness: 0.5');
      if (labelEl) {
        labelEl.setAttribute('value', 'GATE\n[ VOLTAGE: OFF (0) ]');
        labelEl.setAttribute('color', '#64748b');
      }
      if (channelEl) channelEl.setAttribute('material', 'color: #0f172a; emissive: #000000; emissiveIntensity: 0.0; opacity: 0.2; transparent: true');
      particles.forEach(p => {
        p.setAttribute('visible', 'false');
      });
    }
  }

  private setupEventListeners() {
    // 3D Click listener on A-Frame scene
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('.interactive-target') as HTMLElement;
      if (interactiveEl) {
        const compId = interactiveEl.getAttribute('data-component-id');
        if (compId) {
          this.selectComponent(compId);
        }
      }
    });

    // 3D Hover listener
    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('.interactive-target') as HTMLElement;
      if (interactiveEl) {
        soundSynth.playHoverSound();
      }
    });
  }
}
