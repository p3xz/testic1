import { assemble3DWorld } from './scenes/world-builder';
import { ScrollCameraController } from './core/scroll-camera-controller';
import { InteractionManager } from './core/interaction-manager';
import { HUDController } from './core/hud-controller';

// Initialize the Application once DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  const sceneEl = document.querySelector('a-scene') as HTMLElement | null;

  const initApp = () => {
    if (!sceneEl) return;

    // 1. Build the continuous 3D world containing all 7 computational layers
    assemble3DWorld(sceneEl);

    // 2. Initialize Camera and Scroll choreography
    const cameraController = new ScrollCameraController();

    // 3. Initialize Interactive Object raycaster and logic/transistor simulations
    const interactionManager = new InteractionManager();

    // 4. Initialize 2D HUD overlays, telemetry, inspector drawer, and sandboxes
    new HUDController(cameraController, interactionManager);

    // 5. Add Keyboard Navigation (Arrow Up/Down, PageUp/PageDown, Space)
    window.addEventListener('keydown', (e) => {
      const scrollStep = window.innerHeight * 0.45;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        window.scrollBy({ top: scrollStep, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        window.scrollBy({ top: -scrollStep, behavior: 'smooth' });
      } else if (e.key === 'Home') {
        cameraController.scrollToTop();
      }
    });

    console.log('%c[INSIDE THE MACHINE] 3D World & HUD online', 'color: #00e5ff; font-weight: bold;');
  };

  if (sceneEl) {
    if ((sceneEl as unknown as { hasLoaded: boolean }).hasLoaded) {
      initApp();
    } else {
      sceneEl.addEventListener('loaded', initApp);
    }
  } else {
    initApp();
  }
});
