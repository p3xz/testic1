import { STAGES, getStageByProgress, type StageInfo } from '../data/stages';
import { soundSynth } from '../audio/sound-synth';

export interface CameraState {
  x: number;
  y: number;
  z: number;
  lookAtX: number;
  lookAtY: number;
  lookAtZ: number;
}

export class ScrollCameraController {
  private cameraEl: HTMLElement | null = null;
  private ambientLightEl: HTMLElement | null = null;
  private dirLightEl: HTMLElement | null = null;
  private currentProgress: number = 0;
  private targetProgress: number = 0;
  private currentStage: StageInfo = STAGES[0];
  private onStageChangeCallback: ((stage: StageInfo, progress: number) => void) | null = null;
  private onProgressCallback: ((progress: number, cameraPos: [number, number, number]) => void) | null = null;

  constructor() {
    this.initElements();
    this.setupScrollListener();
    this.startRenderLoop();
  }

  private initElements() {
    this.cameraEl = document.querySelector('#main-camera');
    this.ambientLightEl = document.querySelector('#ambient-light');
    this.dirLightEl = document.querySelector('#directional-light');
  }

  private setupScrollListener() {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);
      this.targetProgress = Math.max(0, Math.min(1, scrollTop / scrollHeight));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
  }

  public onStageChange(callback: (stage: StageInfo, progress: number) => void) {
    this.onStageChangeCallback = callback;
  }

  public onProgress(callback: (progress: number, cameraPos: [number, number, number]) => void) {
    this.onProgressCallback = callback;
  }

  public scrollToStage(stageId: string) {
    const stage = STAGES.find(s => s.id === stageId);
    if (!stage) return;
    const scrollHeight = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);
    const targetY = stage.startProgress * scrollHeight;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }

  public scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  public getCurrentProgress(): number {
    return this.currentProgress;
  }

  public getCurrentStage(): StageInfo {
    return this.currentStage;
  }

  private calculateCameraTransform(progress: number): CameraState {
    const stage = getStageByProgress(progress);
    const range = stage.endProgress - stage.startProgress;
    const stageProgress = range > 0 ? (progress - stage.startProgress) / range : 0;
    const clampedStageP = Math.max(0, Math.min(1, stageProgress));

    // Smooth cubic easing for camera interpolation
    const ease = clampedStageP * clampedStageP * (3 - 2 * clampedStageP);

    const x = stage.cameraStart[0] + (stage.cameraEnd[0] - stage.cameraStart[0]) * ease;
    const y = stage.cameraStart[1] + (stage.cameraEnd[1] - stage.cameraStart[1]) * ease;
    const z = stage.cameraStart[2] + (stage.cameraEnd[2] - stage.cameraStart[2]) * ease;

    const lookAtX = stage.targetLookAt[0];
    const lookAtY = stage.targetLookAt[1];
    const lookAtZ = stage.targetLookAt[2];

    return { x, y, z, lookAtX, lookAtY, lookAtZ };
  }

  private startRenderLoop() {
    const tick = () => {
      // Re-query camera element if not cached yet
      if (!this.cameraEl) {
        this.cameraEl = document.querySelector('#main-camera');
      }

      // Read current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = Math.max(1, (document.documentElement.scrollHeight || document.body.scrollHeight) - window.innerHeight);
      this.targetProgress = Math.max(0, Math.min(1, scrollTop / scrollHeight));

      // Smooth lerp towards target scroll progress
      const diff = this.targetProgress - this.currentProgress;
      if (Math.abs(diff) > 0.00002) {
        this.currentProgress += diff * 0.1;
      } else {
        this.currentProgress = this.targetProgress;
      }

      const cam = this.calculateCameraTransform(this.currentProgress);

      if (this.cameraEl) {
        // Calculate rotation towards lookAt target
        const dx = cam.lookAtX - cam.x;
        const dy = cam.lookAtY - cam.y;
        const dz = cam.lookAtZ - cam.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        const pitch = (-Math.atan2(dy, distance) * (180 / Math.PI));
        const yaw = (Math.atan2(dx, -dz) * (180 / Math.PI));

        // Update Three.js object3D directly for instantaneous rendering
        const obj3D = (this.cameraEl as unknown as { object3D?: { position: { set: (x: number, y: number, z: number) => void }; rotation: { set: (x: number, y: number, z: number) => void } } }).object3D;
        if (obj3D) {
          obj3D.position.set(cam.x, cam.y, cam.z);
          obj3D.rotation.set((pitch * Math.PI) / 180, (yaw * Math.PI) / 180, 0);
        }

        // Also update A-Frame attributes
        this.cameraEl.setAttribute('position', `${cam.x.toFixed(4)} ${cam.y.toFixed(4)} ${cam.z.toFixed(4)}`);
        this.cameraEl.setAttribute('rotation', `${pitch.toFixed(2)} ${yaw.toFixed(2)} 0`);
      }

      // Check Stage Transition
      const newStage = getStageByProgress(this.currentProgress);
      if (newStage.id !== this.currentStage.id) {
        this.currentStage = newStage;
        soundSynth.playStageTransition();
        if (this.onStageChangeCallback) {
          this.onStageChangeCallback(this.currentStage, this.currentProgress);
        }

        // Adjust lighting dynamically per stage
        if (this.ambientLightEl) {
          this.ambientLightEl.setAttribute('light', `type: ambient; color: ${newStage.lighting.ambientColor}; intensity: ${newStage.lighting.ambientIntensity}`);
        }
        if (this.dirLightEl) {
          this.dirLightEl.setAttribute('light', `type: directional; color: ${newStage.lighting.directionalColor}; intensity: ${newStage.lighting.directionalIntensity}; position: 2 4 3`);
        }
      }

      // Update ambient sound frequency depth
      soundSynth.updateAmbientDepth(this.currentProgress);

      if (this.onProgressCallback) {
        this.onProgressCallback(this.currentProgress, [cam.x, cam.y, cam.z]);
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }
}
