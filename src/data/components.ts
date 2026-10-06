export interface InteractiveComponentData {
  id: string;
  stageId: string;
  name: string;
  fullName: string;
  category: 'hardware' | 'architecture' | 'logic' | 'semiconductor';
  summary: string;
  description: string;
  specs: { label: string; value: string }[];
  connections: string[];
  worldPosition: [number, number, number];
  labelOffset: [number, number, number];
  accentColor: string;
  interactiveType?: 'info' | 'logic-gate' | 'transistor' | 'pipeline-step';
  gateType?: 'AND' | 'OR' | 'NOT';
}

export const COMPONENTS_DATA: Record<string, InteractiveComponentData> = {
  cpu: {
    id: 'cpu',
    stageId: 'motherboard',
    name: 'CPU',
    fullName: 'CENTRAL PROCESSING UNIT',
    category: 'hardware',
    summary: 'Executes instructions and performs calculations.',
    description: 'The master micro-processor that orchestrates every software operation. It continuously fetches instructions from memory, decodes what actions to perform, executes them through high-speed arithmetic units, and writes results back.',
    specs: [
      { label: 'Clock Speed', value: '5.2 GHz' },
      { label: 'Transistor Count', value: '16.8 Billion' },
      { label: 'Process Node', value: '3 Nanometer' },
      { label: 'Architecture', value: 'x86-64 / ARMv9' }
    ],
    connections: ['RAM via Memory Bus', 'GPU via PCIe 5.0 x16', 'Motherboard Power VRMs'],
    worldPosition: [0, 0.08, 0],
    labelOffset: [0, 0.28, 0],
    accentColor: '#00e5ff',
    interactiveType: 'info'
  },
  ram: {
    id: 'ram',
    stageId: 'motherboard',
    name: 'RAM',
    fullName: 'RANDOM ACCESS MEMORY',
    category: 'hardware',
    summary: 'Temporary high-speed memory used by programs while they run.',
    description: 'Volatile semiconductor storage that holds active code, variables, and OS structures with sub-nanosecond latency. When power is removed, contents are cleared.',
    specs: [
      { label: 'Capacity', value: '64 GB (2x32GB)' },
      { label: 'Type', value: 'DDR5 6400 MT/s' },
      { label: 'Latency', value: '12.5 ns (CL30)' },
      { label: 'Bandwidth', value: '102.4 GB/s' }
    ],
    connections: ['Direct CPU Memory Controller', 'Motherboard DIMM Slots'],
    worldPosition: [0.48, 0.12, 0],
    labelOffset: [0, 0.32, 0],
    accentColor: '#00e5ff',
    interactiveType: 'info'
  },
  gpu: {
    id: 'gpu',
    stageId: 'motherboard',
    name: 'GPU',
    fullName: 'GRAPHICS PROCESSING UNIT',
    category: 'hardware',
    summary: 'A processor specialized for highly parallel computations.',
    description: 'Massively parallel accelerator housing thousands of smaller stream processors optimized for matrix mathematics, 3D rasterization, ray tracing, and neural network tensor operations.',
    specs: [
      { label: 'Compute Cores', value: '16,384 CUDA / Stream' },
      { label: 'VRAM', value: '24 GB GDDR6X' },
      { label: 'Memory Bus', value: '384-bit @ 1008 GB/s' },
      { label: 'Interface', value: 'PCIe 5.0 x16' }
    ],
    connections: ['PCIe 5.0 Bus', 'DisplayPort / HDMI Out', 'Dedicated 12V-2x6 Power'],
    worldPosition: [-0.52, 0.14, 0.3],
    labelOffset: [0, 0.35, 0],
    accentColor: '#7c3aed',
    interactiveType: 'info'
  },
  storage: {
    id: 'storage',
    stageId: 'motherboard',
    name: 'STORAGE',
    fullName: 'NON-VOLATILE MEMORY (NVMe SSD)',
    category: 'hardware',
    summary: 'Stores data even when the computer is turned off.',
    description: 'Solid-state 3D NAND flash storage delivering non-volatile persistence for operating systems, game assets, and user databases across power cycles.',
    specs: [
      { label: 'Capacity', value: '2.0 TB NVMe' },
      { label: 'Sequential Read', value: '7,400 MB/s' },
      { label: 'Protocol', value: 'NVMe 2.0 / PCIe 4.0 x4' },
      { label: 'Flash Cell Type', value: '3D TLC NAND' }
    ],
    connections: ['M.2 Socket on Motherboard', 'Direct PCIe CPU lanes'],
    worldPosition: [0.38, 0.05, 0.4],
    labelOffset: [0, 0.22, 0],
    accentColor: '#00e5ff',
    interactiveType: 'info'
  },
  power: {
    id: 'power',
    stageId: 'motherboard',
    name: 'POWER',
    fullName: 'VOLTAGE REGULATOR MODULE (VRM) & PSU',
    category: 'hardware',
    summary: 'Provides electrical energy to the system.',
    description: 'Steps down high-voltage direct current into stable, ultra-low ripple 1.2V and 0.9V rails with high-amperage MOSFETs and chokes to feed silicon cores without voltage droop.',
    specs: [
      { label: 'Power Delivery', value: '16+2 Phase Digital VRM' },
      { label: 'Main Rails', value: '12V / 5V / 3.3V' },
      { label: 'Efficiency', value: '80 PLUS Titanium (94%)' },
      { label: 'Output Capacity', value: '1000 Watts' }
    ],
    connections: ['24-Pin ATX Motherboard Header', '8-Pin CPU EPS Rails'],
    worldPosition: [-0.4, 0.08, -0.42],
    labelOffset: [0, 0.26, 0],
    accentColor: '#00e5ff',
    interactiveType: 'info'
  },
  data_bus: {
    id: 'data_bus',
    stageId: 'motherboard',
    name: 'DATA BUS',
    fullName: 'HIGH-SPEED INTERCONNECT TRACES',
    category: 'hardware',
    summary: 'Carries data and instructions between computer components.',
    description: 'Microscopic differential copper trace pairs routed with precise impedance control across multiple PCB layers, transmitting serialized binary packets at gigahertz frequencies.',
    specs: [
      { label: 'Bus Width', value: '128-bit Parallel / 32Gbps Serial' },
      { label: 'Signaling', value: 'Differential LVDS / PAM4' },
      { label: 'Trace Impedance', value: '85 Ω Differential' },
      { label: 'Signal Velocity', value: '~15 cm/ns (Speed of Light in FR4)' }
    ],
    connections: ['Links CPU to RAM, Chipset, Storage, and PCIe'],
    worldPosition: [0.15, 0.026, 0.15],
    labelOffset: [0, 0.24, 0],
    accentColor: '#00e5ff',
    interactiveType: 'info'
  },

  // CPU Internals (Z = -8.0)
  control_unit: {
    id: 'control_unit',
    stageId: 'cpu-internals',
    name: 'CONTROL UNIT',
    fullName: 'INSTRUCTION DECODER & SEQUENCER',
    category: 'architecture',
    summary: 'Coordinates the execution of instructions.',
    description: 'The maestro of the processor. It fetches binary instructions from cache, decodes operational codes (opcodes), directs data flow across internal multiplexers, and generates clock pulses for execution.',
    specs: [
      { label: 'Pipeline Stages', value: '14-Stage Out-of-Order' },
      { label: 'Branch Predictor', value: 'Neural TAGE-SC' },
      { label: 'Decode Rate', value: '6 Micro-Ops / Cycle' },
      { label: 'Microcode ROM', value: 'Embedded Hardware' }
    ],
    connections: ['Instruction Cache', 'ALU Execution Units', 'Register File'],
    worldPosition: [-0.55, 0.05, -7.6],
    labelOffset: [0, 0.35, 0],
    accentColor: '#00e5ff',
    interactiveType: 'info'
  },
  alu: {
    id: 'alu',
    stageId: 'cpu-internals',
    name: 'ALU',
    fullName: 'ARITHMETIC LOGIC UNIT',
    category: 'architecture',
    summary: 'Performs arithmetic and logical operations.',
    description: 'The computational powerhouse inside each CPU core. It calculates integer addition, subtraction, bitwise AND/OR/XOR, shifts, and conditional comparisons directly in electronic hardware.',
    specs: [
      { label: 'Operations', value: 'ADD, SUB, AND, OR, XOR, SHL, SHR' },
      { label: 'Word Size', value: '64-bit Integer' },
      { label: 'Latency', value: '1 Clock Cycle (0.19 ns)' },
      { label: 'Execution Units', value: '4 Integer + 2 Vector ALUs' }
    ],
    connections: ['Control Unit Opcode Lines', 'Register Operands In/Out', 'Status Flags'],
    worldPosition: [0.55, 0.05, -7.6],
    labelOffset: [0, 0.35, 0],
    accentColor: '#7c3aed',
    interactiveType: 'info'
  },
  registers: {
    id: 'registers',
    stageId: 'cpu-internals',
    name: 'REGISTERS',
    fullName: 'HIGH-SPEED GENERAL PURPOSE REGISTER FILE',
    category: 'architecture',
    summary: 'Tiny, extremely fast storage locations inside the processor.',
    description: 'The fastest memory in existence, sitting directly adjacent to execution units. A single read/write cycle takes a fraction of a nanosecond with zero bus delay.',
    specs: [
      { label: 'Register Bank', value: '16x 64-bit (RAX, RBX, RCX...)' },
      { label: 'Access Latency', value: '< 0.1 ns (Zero Wait States)' },
      { label: 'Read/Write Ports', value: '8 Read, 4 Write Simultaneous' },
      { label: 'Physical Registers', value: '256 Internal Renamed' }
    ],
    connections: ['Direct ALU Inputs / Outputs', 'L1 Data Cache Load/Store'],
    worldPosition: [0.55, 0.05, -8.45],
    labelOffset: [0, 0.35, 0],
    accentColor: '#00e5ff',
    interactiveType: 'info'
  },
  cache: {
    id: 'cache',
    stageId: 'cpu-internals',
    name: 'CACHE',
    fullName: 'L1 & L2 ON-DIE SRAM CACHE',
    category: 'architecture',
    summary: 'Fast memory located close to the CPU that stores frequently accessed data.',
    description: 'Static RAM built directly on the processor die. It intercepts memory requests so the CPU rarely needs to wait for slower external system RAM.',
    specs: [
      { label: 'L1 Cache Size', value: '64 KB (32KB Data + 32KB Instr)' },
      { label: 'L2 Cache Size', value: '2 MB Per Core' },
      { label: 'L1 Latency', value: '4 Cycles (~0.8 ns)' },
      { label: 'SRAM Structure', value: '6-Transistor (6T) SRAM Cells' }
    ],
    connections: ['Control Unit Fetch Bus', 'L3 Shared Cache', 'DRAM Controller'],
    worldPosition: [-0.55, 0.05, -8.45],
    labelOffset: [0, 0.35, 0],
    accentColor: '#00e5ff',
    interactiveType: 'info'
  },

  // Logic Gates (Z = -18.5)
  gate_and: {
    id: 'gate_and',
    stageId: 'logic-gates',
    name: 'AND GATE',
    fullName: 'BOOLEAN CONJUNCTION OPERATOR',
    category: 'logic',
    summary: 'Outputs 1 ONLY IF both inputs are 1 (A ∧ B).',
    description: 'Constructed from two transistors in series: electrical current can only bridge from the supply rail to the output when both input gates receive activating voltage.',
    specs: [
      { label: 'Truth Table', value: '0&0=0 | 0&1=0 | 1&0=0 | 1&1=1' },
      { label: 'CMOS Transistors', value: '6 (NAND + Inverter)' },
      { label: 'Gate Delay', value: '8 Picoseconds' },
      { label: 'Role', value: 'Bit masking, filtering, addition carry' }
    ],
    connections: ['Input A (0/1)', 'Input B (0/1)', 'Output Y = A · B'],
    worldPosition: [-0.95, 0.0, -18.5],
    labelOffset: [0, 0.45, 0],
    accentColor: '#00e5ff',
    interactiveType: 'logic-gate',
    gateType: 'AND'
  },
  gate_or: {
    id: 'gate_or',
    stageId: 'logic-gates',
    name: 'OR GATE',
    fullName: 'BOOLEAN DISJUNCTION OPERATOR',
    category: 'logic',
    summary: 'Outputs 1 IF at least one input is 1 (A ∨ B).',
    description: 'Constructed from transistors arranged in parallel: if either channel conducts, current flows directly to activate the output terminal.',
    specs: [
      { label: 'Truth Table', value: '0|0=0 | 0|1=1 | 1|0=1 | 1|1=1' },
      { label: 'CMOS Transistors', value: '6 (NOR + Inverter)' },
      { label: 'Gate Delay', value: '8 Picoseconds' },
      { label: 'Role', value: 'Condition merging, bit set operations' }
    ],
    connections: ['Input A (0/1)', 'Input B (0/1)', 'Output Y = A + B'],
    worldPosition: [0.0, 0.0, -18.5],
    labelOffset: [0, 0.45, 0],
    accentColor: '#00e5ff',
    interactiveType: 'logic-gate',
    gateType: 'OR'
  },
  gate_not: {
    id: 'gate_not',
    stageId: 'logic-gates',
    name: 'NOT GATE',
    fullName: 'BOOLEAN INVERTER',
    category: 'logic',
    summary: 'Inverts the incoming signal: 0 becomes 1, 1 becomes 0 (¬A).',
    description: 'The simplest fundamental logic element, formed by a single PMOS and NMOS complementary pair. It flips the logic polarity of the electronic charge.',
    specs: [
      { label: 'Truth Table', value: 'NOT 0 = 1 | NOT 1 = 0' },
      { label: 'CMOS Transistors', value: '2 Transistors (CMOS Pair)' },
      { label: 'Gate Delay', value: '4 Picoseconds' },
      { label: 'Role', value: 'Signal inversion, subtraction (2s complement)' }
    ],
    connections: ['Input A (0/1)', 'Output Y = NOT A'],
    worldPosition: [0.95, 0.0, -18.5],
    labelOffset: [0, 0.45, 0],
    accentColor: '#7c3aed',
    interactiveType: 'logic-gate',
    gateType: 'NOT'
  },

  // Transistor (Z = -24.5)
  transistor_core: {
    id: 'transistor_core',
    stageId: 'transistor',
    name: 'TRANSISTOR',
    fullName: 'MOSFET (METAL-OXIDE-SEMICONDUCTOR FIELD-EFFECT TRANSISTOR)',
    category: 'semiconductor',
    summary: 'A transistor acts as a tiny electronic switch.',
    description: 'The quantum building block of modern digital civilization. Applying voltage to the Gate terminal creates an electrostatic field that attracts charge carriers into a conductive channel, allowing current to bridge Source and Drain.',
    specs: [
      { label: 'Physical Size', value: '3 Nanometers (~15 Silicon Atoms)' },
      { label: 'Switching Speed', value: '> 100 Billion Times / Second' },
      { label: 'Operating Voltage', value: '0.75 Volts' },
      { label: 'Total In Modern Chip', value: '50+ Billion Transistors' }
    ],
    connections: ['Source (Electron Reservoir)', 'Gate (Electrostatic Control Valve)', 'Drain (Signal Collector)'],
    worldPosition: [0.0, 0.0, -24.5],
    labelOffset: [0, 0.5, 0],
    accentColor: '#00e5ff',
    interactiveType: 'transistor'
  }
};
