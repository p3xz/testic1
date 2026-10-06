import { STAGES, type StageInfo } from '../data/stages';
import { COMPONENTS_DATA, type InteractiveComponentData } from '../data/components';
import { ScrollCameraController } from './scroll-camera-controller';
import { InteractionManager, type LogicGateState } from './interaction-manager';
import { soundSynth } from '../audio/sound-synth';
import confetti from 'canvas-confetti';

export class HUDController {
  private cameraCtrl: ScrollCameraController;
  private interactMgr: InteractionManager;

  // UI DOM elements
  private stageBadgeEl: HTMLElement | null = null;
  private audioBtnEl: HTMLElement | null = null;
  private timelineProgressBarEl: HTMLElement | null = null;
  private timelineSteps: NodeListOf<HTMLElement> | null = null;
  private introHeroEl: HTMLElement | null = null;
  private telemetryDepthEl: HTMLElement | null = null;
  private telemetryClockEl: HTMLElement | null = null;
  private telemetryStatusEl: HTMLElement | null = null;
  private scaleBadgeEl: HTMLElement | null = null;
  private floatingLabelsContainer: HTMLElement | null = null;
  private inspectorPanelEl: HTMLElement | null = null;
  private logicSandboxEl: HTMLElement | null = null;
  private transistorSandboxEl: HTMLElement | null = null;
  private instructionPipelineHudEl: HTMLElement | null = null;
  private stageAnnouncementEl: HTMLElement | null = null;
  private outroOverlayEl: HTMLElement | null = null;

  private currentStageId: string = 'computer';
  private hasCelebratedFinale: boolean = false;

  constructor(cameraCtrl: ScrollCameraController, interactMgr: InteractionManager) {
    this.cameraCtrl = cameraCtrl;
    this.interactMgr = interactMgr;

    this.bindDOMElements();
    this.setupListeners();
    this.buildFloatingLabels();
    this.updateLogicGateUI(this.interactMgr.logicGateState);
    this.updateTransistorUI(this.interactMgr.isTransistorOn);
  }

  private bindDOMElements() {
    this.stageBadgeEl = document.querySelector('#hud-stage-badge');
    this.audioBtnEl = document.querySelector('#btn-audio-toggle');
    this.timelineProgressBarEl = document.querySelector('#timeline-progress-bar');
    this.timelineSteps = document.querySelectorAll('.timeline-step');
    this.introHeroEl = document.querySelector('#intro-hero');
    this.telemetryDepthEl = document.querySelector('#telemetry-depth');
    this.telemetryClockEl = document.querySelector('#telemetry-clock');
    this.telemetryStatusEl = document.querySelector('#telemetry-status');
    this.scaleBadgeEl = document.querySelector('#hud-scale-badge');
    this.floatingLabelsContainer = document.querySelector('#floating-labels-container');
    this.inspectorPanelEl = document.querySelector('#inspector-panel');
    this.logicSandboxEl = document.querySelector('#logic-gate-sandbox');
    this.transistorSandboxEl = document.querySelector('#transistor-sandbox');
    this.instructionPipelineHudEl = document.querySelector('#instruction-sandbox');
    this.stageAnnouncementEl = document.querySelector('#stage-announcement');
    this.outroOverlayEl = document.querySelector('#outro-overlay');
  }

  private setupListeners() {
    // Audio Toggle Button
    this.audioBtnEl?.addEventListener('click', () => {
      const isUnmuted = soundSynth.toggleAudio();
      if (this.audioBtnEl) {
        this.audioBtnEl.innerHTML = `<span>${isUnmuted ? 'SOUND: ON' : 'SOUND: OFF'}</span>`;
        if (isUnmuted) {
          this.audioBtnEl.classList.add('active');
        } else {
          this.audioBtnEl.classList.remove('active');
        }
      }
    });

    // Timeline Step Jumps
    this.timelineSteps?.forEach(step => {
      step.addEventListener('click', () => {
        const stageId = step.getAttribute('data-stage');
        if (stageId) {
          soundSynth.playClickSound();
          this.cameraCtrl.scrollToStage(stageId);
        }
      });
    });

    // Inspector Close Button
    const closeBtn = document.querySelector('#inspector-close-btn');
    closeBtn?.addEventListener('click', () => {
      soundSynth.playClickSound();
      this.interactMgr.selectComponent(null);
    });

    // Logic Gate Sandbox Toggles
    const btnAndA = document.querySelector('#btn-and-in-a');
    const btnAndB = document.querySelector('#btn-and-in-b');
    btnAndA?.addEventListener('click', () => this.interactMgr.toggleLogicInput('AND', 'A'));
    btnAndB?.addEventListener('click', () => this.interactMgr.toggleLogicInput('AND', 'B'));

    const btnOrA = document.querySelector('#btn-or-in-a');
    const btnOrB = document.querySelector('#btn-or-in-b');
    btnOrA?.addEventListener('click', () => this.interactMgr.toggleLogicInput('OR', 'A'));
    btnOrB?.addEventListener('click', () => this.interactMgr.toggleLogicInput('OR', 'B'));

    const btnNotA = document.querySelector('#btn-not-in-a');
    btnNotA?.addEventListener('click', () => this.interactMgr.toggleLogicInput('NOT', 'A'));

    // Transistor Switch Toggle
    const btnTransistor = document.querySelector('#btn-transistor-toggle');
    btnTransistor?.addEventListener('click', () => {
      this.interactMgr.toggleTransistor();
    });

    // Outro Explore Again Button
    const btnExploreAgain = document.querySelector('#btn-explore-again');
    btnExploreAgain?.addEventListener('click', () => {
      soundSynth.playConfirmSound();
      this.cameraCtrl.scrollToTop();
    });

    // Camera Progress & Stage hooks
    this.cameraCtrl.onProgress((progress, cameraPos) => {
      this.handleProgressUpdate(progress, cameraPos);
    });

    this.cameraCtrl.onStageChange((stage, progress) => {
      this.handleStageChange(stage, progress);
    });

    // Interaction hooks
    this.interactMgr.onComponentSelect((comp) => {
      this.renderInspectorPanel(comp);
    });

    this.interactMgr.onLogicGateChange((state) => {
      this.updateLogicGateUI(state);
    });

    this.interactMgr.onTransistorChange((isOn) => {
      this.updateTransistorUI(isOn);
    });
  }

  private handleProgressUpdate(progress: number, cameraPos: [number, number, number]) {
    // Update Timeline Progress Bar Height
    if (this.timelineProgressBarEl) {
      this.timelineProgressBarEl.style.height = `${(progress * 100).toFixed(1)}%`;
    }

    // Update Telemetry Depth & Coordinates
    if (this.telemetryDepthEl) {
      this.telemetryDepthEl.textContent = `Z: ${cameraPos[2].toFixed(2)}m (X: ${cameraPos[0].toFixed(2)}, Y: ${cameraPos[1].toFixed(2)})`;
    }

    // Hide hero splash when scrolling past 0.05
    if (this.introHeroEl) {
      if (progress < 0.06) {
        this.introHeroEl.style.opacity = `${Math.max(0, 1 - progress * 16)}`;
        this.introHeroEl.style.pointerEvents = progress < 0.02 ? 'auto' : 'none';
      } else {
        this.introHeroEl.style.opacity = '0';
        this.introHeroEl.style.pointerEvents = 'none';
      }
    }

    // Show / Hide Stage Specific Sandboxes based on progress ranges
    // Logic Gates: 0.72 - 0.88
    if (this.logicSandboxEl) {
      if (progress >= 0.70 && progress <= 0.88) {
        this.logicSandboxEl.classList.add('visible');
      } else {
        this.logicSandboxEl.classList.remove('visible');
      }
    }

    // Transistor Sandbox: 0.88 - 0.96
    if (this.transistorSandboxEl) {
      if (progress > 0.88 && progress < 0.96) {
        this.transistorSandboxEl.classList.add('visible');
      } else {
        this.transistorSandboxEl.classList.remove('visible');
      }
    }

    // Instruction Sandbox: 0.60 - 0.72
    if (this.instructionPipelineHudEl) {
      if (progress >= 0.58 && progress <= 0.72) {
        this.instructionPipelineHudEl.classList.add('visible');
      } else {
        this.instructionPipelineHudEl.classList.remove('visible');
      }
    }

    // Outro Overlay: >= 0.96
    if (this.outroOverlayEl) {
      if (progress >= 0.96) {
        this.outroOverlayEl.classList.add('visible');
        if (!this.hasCelebratedFinale) {
          this.hasCelebratedFinale = true;
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#00e5ff', '#7c3aed', '#f5f7fa']
            });
          } catch {}
        }
      } else {
        this.outroOverlayEl.classList.remove('visible');
        if (progress < 0.90) {
          this.hasCelebratedFinale = false;
        }
      }
    }

    // Update Floating Labels Visibility according to active stage
    this.updateFloatingLabelsVisibility(progress);
  }

  private handleStageChange(stage: StageInfo, _progress: number) {
    this.currentStageId = stage.id;

    // Update Stage Badge
    if (this.stageBadgeEl) {
      this.stageBadgeEl.textContent = `STAGE ${stage.number}/07 : ${stage.name}`;
    }

    // Update Active Timeline Step
    this.timelineSteps?.forEach(step => {
      if (step.getAttribute('data-stage') === stage.id) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Update Scale Meter
    if (this.scaleBadgeEl) {
      this.scaleBadgeEl.innerHTML = `<span>${stage.scale}</span> ${stage.scaleFormatted}`;
    }

    // Update Telemetry Info
    if (this.telemetryClockEl) {
      this.telemetryClockEl.textContent = stage.telemetry.clock;
    }
    if (this.telemetryStatusEl) {
      this.telemetryStatusEl.textContent = stage.telemetry.status;
    }

    // Show Stage Announcement Banner for 2.5s
    if (this.stageAnnouncementEl && stage.id !== 'computer') {
      const title = this.stageAnnouncementEl.querySelector('.announcement-title');
      const subtitle = this.stageAnnouncementEl.querySelector('.announcement-subtitle');
      if (title && subtitle) {
        title.textContent = stage.id === 'cpu' ? 'ENTERING CPU' : stage.name;
        subtitle.textContent = stage.subtitle;
      }
      this.stageAnnouncementEl.classList.add('visible');
      setTimeout(() => {
        this.stageAnnouncementEl?.classList.remove('visible');
      }, 2500);
    }
  }

  private buildFloatingLabels() {
    if (!this.floatingLabelsContainer) return;
    this.floatingLabelsContainer.innerHTML = '';

    Object.values(COMPONENTS_DATA).forEach(comp => {
      const labelDiv = document.createElement('div');
      labelDiv.className = 'floating-label';
      labelDiv.setAttribute('id', `label-${comp.id}`);
      labelDiv.setAttribute('data-stage', comp.stageId);

      labelDiv.innerHTML = `
        <div class="floating-label-box">
          <span class="floating-label-title">${comp.name}</span>
          <span class="floating-label-subtitle">${comp.fullName}</span>
        </div>
        <div class="floating-label-stem"></div>
        <div class="floating-label-dot"></div>
      `;

      labelDiv.addEventListener('click', (e) => {
        e.stopPropagation();
        this.interactMgr.selectComponent(comp.id);
      });

      this.floatingLabelsContainer?.appendChild(labelDiv);
    });
  }

  private updateFloatingLabelsVisibility(progress: number) {
    const stage = STAGES.find(s => s.id === this.currentStageId);
    if (!stage) return;

    // Show labels belonging to current stage
    Object.values(COMPONENTS_DATA).forEach(comp => {
      const labelEl = document.querySelector(`#label-${comp.id}`) as HTMLElement;
      if (!labelEl) return;

      if (comp.stageId === stage.id && progress > 0.08 && progress < 0.95) {
        labelEl.classList.add('visible');
        
        // Approximate 2D screen positions based on component positions
        // This gives a clean HUD placement near each component
        let leftPercent = 50 + comp.worldPosition[0] * 35;
        let topPercent = 50 - comp.worldPosition[1] * 30 + comp.labelOffset[1] * 20;

        leftPercent = Math.max(10, Math.min(90, leftPercent));
        topPercent = Math.max(15, Math.min(85, topPercent));

        labelEl.style.left = `${leftPercent}%`;
        labelEl.style.top = `${topPercent}%`;
      } else {
        labelEl.classList.remove('visible');
      }
    });
  }

  private renderInspectorPanel(comp: InteractiveComponentData | null) {
    if (!this.inspectorPanelEl) return;

    if (!comp) {
      this.inspectorPanelEl.classList.remove('open');
      return;
    }

    const catEl = this.inspectorPanelEl.querySelector('.inspector-category');
    const nameEl = this.inspectorPanelEl.querySelector('.inspector-name');
    const fullnameEl = this.inspectorPanelEl.querySelector('.inspector-fullname');
    const summaryEl = this.inspectorPanelEl.querySelector('.inspector-summary');
    const descEl = this.inspectorPanelEl.querySelector('.inspector-description');
    const specsContainer = this.inspectorPanelEl.querySelector('.inspector-specs');

    if (catEl) catEl.textContent = comp.category.toUpperCase();
    if (nameEl) nameEl.textContent = comp.name;
    if (fullnameEl) fullnameEl.textContent = comp.fullName;
    if (summaryEl) summaryEl.textContent = `“${comp.summary}”`;
    if (descEl) descEl.textContent = comp.description;

    if (specsContainer) {
      specsContainer.innerHTML = '';
      comp.specs.forEach(s => {
        const item = document.createElement('div');
        item.className = 'spec-item';
        item.innerHTML = `
          <span class="spec-label">${s.label}</span>
          <span class="spec-value">${s.value}</span>
        `;
        specsContainer.appendChild(item);
      });
    }

    this.inspectorPanelEl.classList.add('open');
  }

  private updateLogicGateUI(state: LogicGateState) {
    // AND Gate Buttons
    const btnAndA = document.querySelector('#btn-and-in-a');
    const btnAndB = document.querySelector('#btn-and-in-b');
    const valAndOut = document.querySelector('#val-and-out');

    if (btnAndA) {
      btnAndA.textContent = `INPUT A: ${state.andA}`;
      btnAndA.className = `gate-btn ${state.andA === 1 ? 'active' : ''}`;
    }
    if (btnAndB) {
      btnAndB.textContent = `INPUT B: ${state.andB}`;
      btnAndB.className = `gate-btn ${state.andB === 1 ? 'active' : ''}`;
    }
    if (valAndOut) {
      valAndOut.textContent = `${state.andOut}`;
      valAndOut.className = `gate-result-val ${state.andOut === 1 ? '' : 'zero'}`;
    }

    // OR Gate Buttons
    const btnOrA = document.querySelector('#btn-or-in-a');
    const btnOrB = document.querySelector('#btn-or-in-b');
    const valOrOut = document.querySelector('#val-or-out');

    if (btnOrA) {
      btnOrA.textContent = `INPUT A: ${state.orA}`;
      btnOrA.className = `gate-btn ${state.orA === 1 ? 'active' : ''}`;
    }
    if (btnOrB) {
      btnOrB.textContent = `INPUT B: ${state.orB}`;
      btnOrB.className = `gate-btn ${state.orB === 1 ? 'active' : ''}`;
    }
    if (valOrOut) {
      valOrOut.textContent = `${state.orOut}`;
      valOrOut.className = `gate-result-val ${state.orOut === 1 ? '' : 'zero'}`;
    }

    // NOT Gate Buttons
    const btnNotA = document.querySelector('#btn-not-in-a');
    const valNotOut = document.querySelector('#val-not-out');

    if (btnNotA) {
      btnNotA.textContent = `INPUT A: ${state.notA}`;
      btnNotA.className = `gate-btn ${state.notA === 1 ? 'active' : ''}`;
    }
    if (valNotOut) {
      valNotOut.textContent = `${state.notOut}`;
      valNotOut.className = `gate-result-val ${state.notOut === 1 ? '' : 'zero'}`;
    }
  }

  private updateTransistorUI(isOn: boolean) {
    const btnToggle = document.querySelector('#btn-transistor-toggle');
    const flowText = document.querySelector('#transistor-flow-text') as HTMLElement | null;
    const stateVal = document.querySelector('#transistor-state-val');

    if (btnToggle) {
      btnToggle.textContent = isOn ? 'GATE VOLTAGE: HIGH [ 1 ]' : 'GATE VOLTAGE: LOW [ 0 ]';
      if (isOn) {
        btnToggle.classList.add('active');
      } else {
        btnToggle.classList.remove('active');
      }
    }

    if (flowText) {
      flowText.textContent = isOn ? 'ELECTRON CURRENT: FLOWING (CONDUCTING)' : 'ELECTRON CURRENT: BLOCKED (DEPLETED)';
      flowText.style.color = isOn ? '#00e5ff' : '#8b98a7';
    }

    if (stateVal) {
      stateVal.textContent = isOn ? 'OUTPUT: 1' : 'OUTPUT: 0';
      stateVal.className = `gate-result-val ${isOn ? '' : 'zero'}`;
    }
  }
}
