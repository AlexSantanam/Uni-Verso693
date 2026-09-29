import React from 'react';
import { Code2, Bot, Smartphone, Globe, Compass } from 'lucide-react';
import type { Service } from '../data/site';

const icons = { Code2, Bot, Smartphone, Globe, Compass };

export const ServiceIcon: React.FC<{ name: Service['icon']; className?: string }> = ({ name, className = 'w-6 h-6' }) => {
  const Icon = icons[name];
  return <Icon className={className} />;
};
