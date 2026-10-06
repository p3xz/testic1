# INSIDE THE MACHINE
### *A scroll-driven 3D journey from a computer to an atomic transistor*

**Inside the Machine** is an interactive 3D WebGL educational experience built with **A-Frame**, **TypeScript**, **Vite**, and **GSAP Scroll Interpolation**. As the user scrolls through the page, the camera smoothly travels deeper through 7 physical layers of computation, communicating one fundamental truth:

> **Modern computation ultimately comes down to enormous numbers of tiny electronic switches turning on and off.**

---

## 🌌 The 7 Physical Layers of Computation

| Layer | Stage Name | Scale | Key Architectural Focus |
|---|---|---|---|
| **01** | **COMPUTER** | $10^0\text{ m}$ ($1\text{m}$) | Macroscopic system chassis, cooling fans, power, ambient dust |
| **02** | **MOTHERBOARD** | $10^{-1}\text{ m}$ ($10\text{cm}$) | Interactive CPU, RAM, GPU, NVMe Storage, Power VRM, Data Bus traces |
| **03** | **CPU** | $10^{-2}\text{ m}$ ($1\text{cm}$) | Integrated Heat Spreader (IHS), gold wire bonds, silicon die packaging |
| **04** | **CPU INTERNALS** | $10^{-4}\text{ m}$ ($100\mu\text{m}$) | Control Unit, ALU, Register Banks, L1/L2 Cache with optical bus highways |
| **05** | **INSTRUCTION FLOW** | $10^{-5}\text{ m}$ ($10\mu\text{m}$) | Pipeline execution: Fetch $\rightarrow$ Decode $\rightarrow$ ALU ($5 + 3$) $\rightarrow$ Result ($8$) |
| **06** | **LOGIC GATES** | $10^{-7}\text{ m}$ ($100\text{nm}$) | Real-time interactive AND, OR, NOT gates with live Boolean truth tables |
| **07** | **TRANSISTOR** | $10^{-9}\text{ m}$ ($1\text{nm}$) | 3D MOSFET with toggleable Gate voltage, electron inversion channel ($0 \leftrightarrow 1$) |

---

## ⚡ Key Interactive Features

1. **Continuous Cinematic Camera Choreography**:
   - One unified continuous 3D A-Frame world (no disjointed pages or jarring cuts).
   - Bi-directional scroll synchronization: scroll down to plunge into the silicon; scroll up to smoothly reverse back to the computer chassis.

2. **Interactive 3D Component Inspector**:
   - Click any 3D component (CPU, RAM, GPU, Storage, VRM, Control Unit, ALU, Registers, Cache, Logic Gates, Transistor) to open a telemetry inspector drawer.
   - Non-blocking: users can continue scrolling freely while reviewing specifications.

3. **Live Boolean Logic Gate Sandbox**:
   - Interactive toggles for Input A and Input B on AND, OR, and NOT gates.
   - Evaluates outputs in real-time ($0\text{ AND }0 = 0$, $1\text{ AND }1 = 1$, $\neg 0 = 1$) with dynamic 3D pin lighting.

4. **Live Transistor Controller (MOSFET Simulation)**:
   - Toggle Gate Voltage between HIGH ($1$) and LOW ($0$).
   - Live electron particle flow through the silicon inversion channel from Source to Drain.

5. **Procedural Web Audio Synthesizer**:
   - Built with the Web Audio API (zero external audio file dependencies).
   - Generates low-frequency ambient drone, pitch-depth filter shifts, UI chimes, gate relay clicks, and transition whooshes.

6. **Cinematic Pullback & Finale**:
   - Zoom-out cosmic hierarchy reveal ($10^{-9}\text{m} \rightarrow 10^0\text{m}$) with celebration effects and smooth "Explore Again" return loop.

---

## 🛠️ Technology Stack

- **3D Engine**: A-Frame 1.6.0 (Three.js WebGL backend)
- **Language**: TypeScript (Strict Mode)
- **Bundler**: Vite
- **Sound**: Web Audio API Procedural Synth
- **Visuals & Effects**: Canvas Confetti, CSS Glassmorphism, Space Grotesk / JetBrains Mono typography

---

## 🚀 Getting Started

```bash
# Navigate to the project directory
cd inside-the-machine

# Install dependencies
npm install

# Start the local development server
npm run dev

# Build for production
npm run build
```

---

## 🎮 Navigation Controls

- **Mouse / Trackpad**: Scroll down / up to navigate through the layers.
- **Keyboard**: $\downarrow$ / $\uparrow$, PageDown / PageUp, Spacebar, Home (Return to top).
- **Milestone Ladder**: Click any of the 7 stages on the left HUD ladder to jump directly to that layer.
- **Components**: Click any glowing 3D component to inspect its architecture.
