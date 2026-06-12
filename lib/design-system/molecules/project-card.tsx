/**
 * ARUMA Design System - ProjectCard Molecule
 *
 * Tarjeta de proyecto de la lámina de identidad (tema claro):
 * miniatura, título en Inter Bold y descripción en Inter Light.
 */

import React from 'react';

export interface ProjectCardProps {
  title: string;
  description: string;
  /** Imagen del proyecto; si se omite se muestra el marcador de posición. */
  image?: React.ReactNode;
  gray?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  gray = '#333333',
  className = '',
}: ProjectCardProps) {
  return (
    <article className={`flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ${className}`}>
      <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#D9D9D9]">
        {image ?? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#B3B3B3" aria-hidden="true">
            <path d="M12 6 4 14h16z" />
          </svg>
        )}
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-lg font-bold text-black">{title}</h3>
        <p className="truncate text-sm font-light" style={{ color: gray }}>
          {description}
        </p>
      </div>
    </article>
  );
}
