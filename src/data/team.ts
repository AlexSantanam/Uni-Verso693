import type { L } from '../lib/lang';

export interface TeamMember {
  name: string;
  role: L;
  initials: string;
  location: string;
  experience: string;
  bio: L;
  specialties: string[];
  gradient: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Alexis Santana Miranda',
    role: { es: 'Fundador & Principal Solutions Architect', en: 'Founder & Principal Solutions Architect' },
    initials: 'AS',
    location: 'Viña del Mar / Santiago, CL',
    experience: '+12 años exp.',
    bio: {
      es: 'Lidera la dirección técnica y arquitectura de software de Uni-Verso693. Especialista en sistemas distribuidos de alta disponibilidad, ingeniería de inteligencia artificial aplicada y soberanía tecnológica para empresas e instituciones.',
      en: 'Leads technical direction and software architecture at Uni-Verso693. Specialist in high-availability distributed systems, applied artificial intelligence, and sovereign technology for enterprises and institutions.',
    },
    specialties: ['Arquitectura de Software', 'IA Aplicada & RAG', 'Soberanía Digital', 'Sistemas Cloud'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Rodrigo Morales V.',
    role: { es: 'Head of Cloud Infrastructure & DevOps', en: 'Head of Cloud Infrastructure & DevOps' },
    initials: 'RM',
    location: 'Santiago, CL',
    experience: '+9 años exp.',
    bio: {
      es: 'Diseña y administra arquitecturas cloud en AWS, Google Cloud y DigitalOcean. Experto en Docker, Kubernetes, pipelines de CI/CD automatizados y blindaje perimetral para operación continua 99.9% uptime.',
      en: 'Designs and manages cloud infrastructure on AWS, Google Cloud, and DigitalOcean. Expert in Docker, Kubernetes, automated CI/CD pipelines, and perimeter security for continuous 99.9% uptime.',
    },
    specialties: ['AWS & GCP Cloud', 'CI/CD Pipelines', 'Docker & Kubernetes', 'Ciberseguridad'],
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Valentina Fuenzalida C.',
    role: { es: 'Head of Product Design & UX/UI Architecture', en: 'Head of Product Design & UX/UI Architecture' },
    initials: 'VF',
    location: 'Valparaíso, CL',
    experience: '+7 años exp.',
    bio: {
      es: 'Arquitecta de experiencia de usuario y diseño de producto. Especialista en design systems modulares, prototipado interactivo de alta fidelidad y optimización de conversión (CRO) para plataformas B2B y móviles.',
      en: 'User experience architect and product designer. Specialist in modular design systems, high-fidelity interactive prototyping, and conversion rate optimization (CRO) for B2B and mobile platforms.',
    },
    specialties: ['Design Systems', 'UX Research & CRO', 'Prototipado Figma', 'Accesibilidad Web'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Ignacio Valenzuela S.',
    role: { es: 'Senior AI Engineer & Automation Specialist', en: 'Senior AI Engineer & Automation Specialist' },
    initials: 'IV',
    location: 'Concepción, CL',
    experience: '+6 años exp.',
    bio: {
      es: 'Ingeniero especializado en modelos de lenguaje (LLMs), arquitecturas RAG con bases vectoriales y agentes autónomos. Integra flujos inteligentes con WhatsApp oficial y CRMs sin alucinaciones y con citas exactas de fuentes.',
      en: 'Engineer specializing in LLMs, RAG architectures with vector databases, and autonomous agents. Integrates intelligent workflows with official WhatsApp and CRMs with zero hallucinations and exact citations.',
    },
    specialties: ['RAG Vectorial', 'Agentes Autónomos', 'Integración WhatsApp API', 'Python / n8n'],
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Matías Herrera P.',
    role: { es: 'Senior Fullstack & Mobile Engineer', en: 'Senior Fullstack & Mobile Engineer' },
    initials: 'MH',
    location: 'Santiago, CL',
    experience: '+8 años exp.',
    bio: {
      es: 'Desarrollador fullstack centrado en React, TypeScript, Node.js y Progressive Web Apps (PWAs). Construye plataformas reactivas ultrarrápidas a 60 FPS, pasarelas de pago y sistemas offline-first.',
      en: 'Fullstack developer focused on React, TypeScript, Node.js, and Progressive Web Apps (PWAs). Builds lightning-fast 60 FPS responsive platforms, payment gateways, and offline-first systems.',
    },
    specialties: ['React & TypeScript', 'PWA Offline-First', 'Pasarelas de Pago', 'Node.js / GraphQL'],
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Camila Soto R.',
    role: { es: 'QA Lead & Regulatory Compliance Specialist', en: 'QA Lead & Regulatory Compliance Specialist' },
    initials: 'CS',
    location: 'Viña del Mar, CL',
    experience: '+6 años exp.',
    bio: {
      es: 'Lidera las pruebas de aseguramiento de calidad automatizadas (E2E) y auditorías de carga. Responsable de garantizar el estricto cumplimiento de estándares normativos (SENCE, NCh 2728, PCI-DSS) antes del pase a producción.',
      en: 'Leads automated end-to-end quality assurance (E2E) and load testing. Responsible for enforcing strict regulatory compliance standards (SENCE, NCh 2728, PCI-DSS) before production release.',
    },
    specialties: ['QA Automation E2E', 'Normativa SENCE / NCh', 'Pruebas de Carga & Stress', 'Auditoría de Código'],
    gradient: 'from-rose-500 to-red-600',
  },
];
