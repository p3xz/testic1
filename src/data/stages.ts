export interface StageInfo {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  scale: string;
  scaleExponent: number;
  scaleFormatted: string;
  description: string;
  quote?: string;
  startProgress: number;
  endProgress: number;
  cameraStart: [number, number, number];
  cameraEnd: [number, number, number];
  targetLookAt: [number, number, number];
  lighting: {
    ambientColor: string;
    ambientIntensity: number;
    directionalColor: string;
    directionalIntensity: number;
    accentColor: string;
  };
  telemetry: {
    clock: string;
    temp: string;
    voltage: string;
    status: string;
  };
}

export const STAGES: StageInfo[] = [
  {
    id: 'computer',
    number: '01',
    name: 'COMPUTER',
    subtitle: 'MACROSCOPIC SYSTEM',
    scale: '10⁰ m',
    scaleExponent: 0,
    scaleFormatted: '1.0 Meter',
    description: 'Modern computation begins inside an interconnected macroscopic chassis, channeling power, thermal cooling, and clock signals to silicon processors.',
    quote: 'From human scale to quantum scale: every digital computation starts here.',
    startProgress: 0.0,
    endProgress: 0.12,
    cameraStart: [0, 1.2, 5.2],
    cameraEnd: [0, 0.45, 2.4],
    targetLookAt: [0, 0.0, 0.0],
    lighting: {
      ambientColor: '#0c1524',
      ambientIntensity: 0.8,
      directionalColor: '#00e5ff',
      directionalIntensity: 1.2,
      accentColor: '#00e5ff'
    },
    telemetry: {
      clock: '3.80 GHz (BASE)',
      temp: '42.0 °C',
      voltage: '12.0 V MAIN',
      status: 'SYSTEM ONLINE'
    }
  },
  {
    id: 'motherboard',
    number: '02',
    name: 'MOTHERBOARD',
    subtitle: 'PRINTED CIRCUIT BOARD (PCB)',
    scale: '10⁻¹ m',
    scaleExponent: -1,
    scaleFormatted: '10 Centimeters',
    description: 'A dense multi-layer substrate of etched copper traces routing gigabits of electrical signals between the CPU, high-speed RAM, GPU, and NVMe storage.',
    quote: 'The electrical nervous system coordinating billions of concurrent signals.',
    startProgress: 0.12,
    endProgress: 0.28,
    cameraStart: [0, 0.45, 2.4],
    cameraEnd: [0, 0.18, 0.65],
    targetLookAt: [0, 0.05, -0.15],
    lighting: {
      ambientColor: '#08111e',
      ambientIntensity: 0.9,
      directionalColor: '#00e5ff',
      directionalIntensity: 1.4,
      accentColor: '#00e5ff'
    },
    telemetry: {
      clock: '6400 MT/s BUS',
      temp: '46.5 °C',
      voltage: '1.35 V DRAM',
      status: 'BUS SYNCHRONIZED'
    }
  },
  {
    id: 'cpu',
    number: '03',
    name: 'CPU',
    subtitle: 'CENTRAL PROCESSING UNIT',
    scale: '10⁻² m',
    scaleExponent: -2,
    scaleFormatted: '1 Centimeter',
    description: 'The master execution engine. Beneath the nickel-plated copper heat spreader lies a monolithic silicon die hosting billions of microscopic circuits.',
    quote: 'The processor executes instructions and performs billions of calculations per second.',
    startProgress: 0.28,
    endProgress: 0.45,
    cameraStart: [0, 0.18, 0.65],
    cameraEnd: [0, 0.03, -0.85],
    targetLookAt: [0, 0.0, -1.3],
    lighting: {
      ambientColor: '#070d17',
      ambientIntensity: 1.0,
      directionalColor: '#00e5ff',
      directionalIntensity: 1.6,
      accentColor: '#7c3aed'
    },
    telemetry: {
      clock: '5.20 GHz BOOST',
      temp: '68.2 °C',
      voltage: '1.22 V VCORE',
      status: 'EXECUTION ACTIVE'
    }
  },
  {
    id: 'cpu-internals',
    number: '04',
    name: 'CPU INTERNALS',
    subtitle: 'MICRO-ARCHITECTURE',
    scale: '10⁻⁴ m',
    scaleExponent: -4,
    scaleFormatted: '100 Micrometers',
    description: 'Inside the silicon die: The Control Unit coordinates operations, the ALU computes, Registers hold active words, and Cache feeds instructions at lightning speed.',
    quote: 'Control Unit, ALU, Registers, and Cache work in tight microscopic synchrony.',
    startProgress: 0.45,
    endProgress: 0.60,
    cameraStart: [0, 0.03, -0.85],
    cameraEnd: [0, 0.0, -2.6],
    targetLookAt: [0, 0.0, -3.4],
    lighting: {
      ambientColor: '#0a0d1a',
      ambientIntensity: 1.1,
      directionalColor: '#7c3aed',
      directionalIntensity: 1.8,
      accentColor: '#00e5ff'
    },
    telemetry: {
      clock: 'IPC: 4.8 INSTR/CYCLE',
      temp: '71.0 °C',
      voltage: '1.05 V SILICON',
      status: 'FETCH-DECODE-EXECUTE'
    }
  },
  {
    id: 'instruction-flow',
    number: '05',
    name: 'INSTRUCTION FLOW',
    subtitle: 'PIPELINE EXECUTION',
    scale: '10⁻⁵ m',
    scaleExponent: -5,
    scaleFormatted: '10 Micrometers',
    description: 'Complex software decomposes into atomic assembly instructions. Operands flow through decode stages into arithmetic logic execution (e.g. 5 + 3 = 8).',
    quote: 'Complex computation is built from simpler operations.',
    startProgress: 0.60,
    endProgress: 0.72,
    cameraStart: [0, 0.0, -2.6],
    cameraEnd: [0, 0.0, -4.8],
    targetLookAt: [0, 0.0, -5.8],
    lighting: {
      ambientColor: '#060913',
      ambientIntensity: 1.1,
      directionalColor: '#00e5ff',
      directionalIntensity: 1.9,
      accentColor: '#00e5ff'
    },
    telemetry: {
      clock: 'OPCODE: 0x01 ADD',
      temp: '69.4 °C',
      voltage: '0.98 V CORE',
      status: 'PIPELINE FLOWING'
    }
  },
  {
    id: 'logic-gates',
    number: '06',
    name: 'LOGIC GATES',
    subtitle: 'BOOLEAN OPERATORS',
    scale: '10⁻⁷ m',
    scaleExponent: -7,
    scaleFormatted: '100 Nanometers',
    description: 'Pure mathematics rendered as physical silicon topology. AND, OR, and NOT gates combine discrete voltage levels to evaluate Boolean truth tables.',
    quote: 'Arithmetic is performed by networks of elementary logic gates.',
    startProgress: 0.72,
    endProgress: 0.88,
    cameraStart: [0, 0.0, -4.8],
    cameraEnd: [0, 0.0, -7.2],
    targetLookAt: [0, 0.0, -8.3],
    lighting: {
      ambientColor: '#05070e',
      ambientIntensity: 1.2,
      directionalColor: '#00e5ff',
      directionalIntensity: 2.0,
      accentColor: '#7c3aed'
    },
    telemetry: {
      clock: 'PROPAGATION: 12 ps',
      temp: '65.1 °C',
      voltage: '0.85 V LOGIC',
      status: 'GATES EVALUATING'
    }
  },
  {
    id: 'transistor',
    number: '07',
    name: 'TRANSISTOR',
    subtitle: 'FIELD-EFFECT SWITCH (MOSFET)',
    scale: '10⁻⁹ m',
    scaleExponent: -9,
    scaleFormatted: '1 Nanometer / Atomic',
    description: 'The fundamental atom of computation: A three-terminal switch where a gate voltage either allows or prevents electrons from traversing between source and drain.',
    quote: 'Modern computation ultimately comes down to enormous numbers of tiny electronic switches.',
    startProgress: 0.88,
    endProgress: 1.00,
    cameraStart: [0, 0.0, -7.2],
    cameraEnd: [0, 0.0, -9.8],
    targetLookAt: [0, 0.0, -10.8],
    lighting: {
      ambientColor: '#03050a',
      ambientIntensity: 1.3,
      directionalColor: '#00e5ff',
      directionalIntensity: 2.2,
      accentColor: '#00e5ff'
    },
    telemetry: {
      clock: 'GATE LENGTH: 3 nm',
      temp: '62.0 °C',
      voltage: 'V_GATE: TOGGLEABLE',
      status: 'QUANTUM SWITCHING'
    }
  }
];

export function getStageByProgress(progress: number): StageInfo {
  const clamped = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < STAGES.length; i++) {
    const stage = STAGES[i];
    if (clamped >= stage.startProgress && (clamped <= stage.endProgress || i === STAGES.length - 1)) {
      return stage;
    }
  }
  return STAGES[0];
}
