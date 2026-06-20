'use client';

/**
 * ARUMA - Lámina de identidad viva
 *
 * Reproducción fiel de la lámina del design system, alimentada por
 * lib/brand.config.ts. El panel "Editar marca" permite al dueño ajustar
 * colores y textos en vivo: los cambios se guardan en este navegador
 * (localStorage) y pueden copiarse como configuración para hacerlos
 * permanentes en el código.
 */

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArumaWordmark,
  ArumaGlyph,
  Button,
  ProjectCard,
  BrandNav,
  BrandPlate,
} from '@/lib/design-system';
import { brandConfig, type BrandConfig, type BrandColorKey } from '@/lib/brand.config';
import {
  clearStoredBrandConfig,
  loadStoredBrandConfig,
  persistBrandConfig,
} from '@/lib/brand-storage';
import { brandConfigSchema } from '@/lib/brand-schema';
import { formatBusinessHours } from '@/lib/business-hours';
import { ServicesAgendaEditor } from '@/components/brand/services-agenda-editor';

export default function BrandPage() {
  const [config, setConfig] = useState<BrandConfig>(brandConfig);
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  useEffect(() => {
    // localStorage solo existe en el cliente: hidratar aquí (y no en el
    // inicializador de useState) evita desajustes con el HTML prerenderizado.
    const stored = loadStoredBrandConfig();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setConfig(stored);
  }, []);

  function update(partial: Partial<BrandConfig>) {
    setConfig((prev) => {
      const rules = partial.businessHoursRules ?? prev.businessHoursRules;
      const timezone = partial.timezone ?? prev.timezone;
      const next: BrandConfig = {
        ...prev,
        ...partial,
        businessHours:
          partial.businessHours ??
          (partial.businessHoursRules
            ? formatBusinessHours(rules, timezone)
            : prev.businessHours),
      };
      try {
        persistBrandConfig(next);
      } catch {
        // Sin almacenamiento disponible: la edición sigue funcionando en memoria.
      }
      return next;
    });
  }

  function setColor(key: BrandColorKey, value: string) {
    update({ colors: { ...config.colors, [key]: { ...config.colors[key], value } } });
  }

  async function copyConfig() {
    setExportError(null);
    const normalized = {
      ...config,
      businessHours: formatBusinessHours(config.businessHoursRules, config.timezone),
    };
    const parsed = brandConfigSchema.safeParse(normalized);
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join(' · ');
      setExportError(message || 'Configuración inválida');
      return;
    }
    try {
      await navigator.clipboard.writeText(JSON.stringify(parsed.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
      setExportError('No se pudo copiar al portapapeles');
    }
  }

  function resetConfig() {
    try {
      clearStoredBrandConfig();
    } catch {
      // ignorar
    }
    setConfig(brandConfig);
    setExportError(null);
  }

  const negro = config.colors.negro.value;
  const gris = config.colors.gris.value;
  const acento = config.colors.acento.value;

  const palette = useMemo(
    () => Object.entries(config.colors) as [BrandColorKey, { label: string; value: string }][],
    [config.colors],
  );

  return (
    <div
      className="min-h-screen py-10 text-black"
      style={{
        backgroundColor: '#EFEFEF',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      <div className="mx-auto max-w-5xl px-5">
        {/* Encabezado de la lámina */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: negro }}>
            {config.name} - Design System
          </h1>
        </header>

        {/* Panel de administración */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="brand" size="sm" onClick={() => setEditing((value) => !value)}>
            {editing ? 'Cerrar editor' : 'Editar marca'}
          </Button>
          {editing && (
            <>
              <Button variant="brandOutline" size="sm" onClick={copyConfig}>
                {copied ? '¡Copiada!' : 'Copiar configuración'}
              </Button>
              <Button variant="brandOutline" size="sm" onClick={resetConfig}>
                Restaurar original
              </Button>
            </>
          )}
        </div>

        {editing && (
          <>
          <ServicesAgendaEditor config={config} onChange={update} />
          <section
            aria-label="Editor de marca"
            className="mb-12 grid gap-4 rounded-2xl border-2 border-black bg-white p-5 sm:grid-cols-2"
          >
            <label className="grid gap-1 text-sm font-bold">
              Tagline
              <input
                value={config.tagline}
                onChange={(e) => update({ tagline: e.target.value })}
                className="rounded-lg border border-black/30 px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Navegación (separada por comas)
              <input
                value={config.nav.join(', ')}
                onChange={(e) =>
                  update({ nav: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) })
                }
                className="rounded-lg border border-black/30 px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Botón principal
              <input
                value={config.buttons.primary}
                onChange={(e) => update({ buttons: { ...config.buttons, primary: e.target.value } })}
                className="rounded-lg border border-black/30 px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Botón secundario
              <input
                value={config.buttons.secondary}
                onChange={(e) => update({ buttons: { ...config.buttons, secondary: e.target.value } })}
                className="rounded-lg border border-black/30 px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Proyecto: título
              <input
                value={config.project.title}
                onChange={(e) => update({ project: { ...config.project, title: e.target.value } })}
                className="rounded-lg border border-black/30 px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Proyecto: descripción
              <input
                value={config.project.description}
                onChange={(e) => update({ project: { ...config.project, description: e.target.value } })}
                className="rounded-lg border border-black/30 px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Uso de marca: subtítulo
              <input
                value={config.usage.subtitle}
                onChange={(e) => update({ usage: { ...config.usage, subtitle: e.target.value } })}
                className="rounded-lg border border-black/30 px-3 py-2 font-normal"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Uso de marca: leyenda
              <input
                value={config.usage.caption}
                onChange={(e) => update({ usage: { ...config.usage, caption: e.target.value } })}
                className="rounded-lg border border-black/30 px-3 py-2 font-normal"
              />
            </label>
            <div className="grid gap-2 sm:col-span-2 sm:grid-cols-4">
              {palette.map(([key, color]) => (
                <label key={key} className="grid gap-1 text-sm font-bold">
                  {color.label}
                  <span className="flex items-center gap-2 font-normal">
                    <input
                      type="color"
                      value={color.value}
                      onChange={(e) => setColor(key, e.target.value)}
                      aria-label={`Color ${color.label}`}
                      className="h-9 w-12 cursor-pointer rounded border border-black/30"
                    />
                    <code className="text-xs">{color.value.toUpperCase()}</code>
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs sm:col-span-2" style={{ color: gris }}>
              Los cambios se guardan en este navegador y se reflejan en el sitio sin recargar.
              Usa «Copiar configuración» y pégamela en el chat para dejarlos permanentes en el
              código.
            </p>
            {exportError && (
              <p className="text-sm font-bold text-red-700 sm:col-span-2" role="alert">
                {exportError}
              </p>
            )}
          </section>
          </>
        )}

        <div className="grid gap-12 lg:grid-cols-2">
          {/* 01. Logo */}
          <section aria-labelledby="brand-logo">
            <h2 id="brand-logo" className="mb-4 text-xl font-black" style={{ color: negro }}>
              01. Logo
            </h2>
            <ArumaWordmark variant="leaves" className="h-24 w-auto" />
            <p className="mt-2 text-lg font-light" style={{ color: gris }}>
              {config.tagline}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <figure className="rounded-2xl border border-black/15 bg-white p-5">
                <figcaption className="mb-3 text-center text-xs font-bold">
                  Logo - Versión Minimalista
                </figcaption>
                <ArumaWordmark className="mx-auto h-10 w-auto" />
              </figure>
              <figure className="rounded-2xl border border-black/15 bg-white p-5">
                <figcaption className="mb-3 text-center text-xs font-bold">
                  Logo - Versión Solo Tipografía
                </figcaption>
                <p className="text-center text-3xl font-black tracking-tight">{config.name}</p>
              </figure>
            </div>
          </section>

          {/* 02. Paleta + tokens */}
          <section aria-labelledby="brand-palette">
            <h2 id="brand-palette" className="mb-4 text-xl font-black" style={{ color: negro }}>
              02. Color Palette
            </h2>
            <ul className="flex flex-wrap gap-6">
              {palette.map(([key, color]) => (
                <li key={key} className="text-center text-xs font-bold">
                  <span
                    className="mb-2 block h-20 w-20 rounded-full border border-black/15"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.label}
                  <br />
                  <code className="font-normal">{color.value.toUpperCase()}</code>
                </li>
              ))}
            </ul>

            <h2 className="mb-3 mt-8 text-xl font-black" style={{ color: negro }}>
              Design Tokens
            </h2>
            <p className="text-sm font-bold">Fuente Primaria - {config.name} Display</p>
            <div className="mt-2 flex items-end gap-1" aria-label="Espécimen ARUMA Display">
              {Array.from({ length: 10 }, (_, i) => (
                <ArumaGlyph key={i} index={i} className="h-7 w-auto" />
              ))}
            </div>
            <p className="mt-2 text-xs font-light" style={{ color: gris }}>
              Fuente decorativa con patrones de shibari y hojas. Usar solo para logotipos y títulos
              grandes.
            </p>

            <p className="mt-5 text-sm font-bold">Fuente Secundaria - Inter</p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
              <dt className="font-bold">&quot;Inter Bold&quot;</dt>
              <dd className="font-bold">&quot;{config.name}&quot;</dd>
              <dt className="font-normal">&quot;Inter Regular&quot;</dt>
              <dd className="font-normal">&quot;{config.tagline}&quot;</dd>
              <dt className="font-light">&quot;Inter Light&quot;</dt>
              <dd className="font-light">Usada para body copy y subtítulos.</dd>
            </dl>
          </section>

          {/* 04. Componentes UI */}
          <section aria-labelledby="brand-ui">
            <h2 id="brand-ui" className="mb-4 text-xl font-black" style={{ color: negro }}>
              04. Componentes UI
            </h2>
            <div className="grid gap-3">
              <Button variant="brand" size="lg" className="w-full sm:w-72">
                {config.buttons.primary}
              </Button>
              <Button variant="brandOutline" size="lg" className="w-full sm:w-72">
                {config.buttons.secondary}
              </Button>
              <div className="mt-3 grid gap-3 rounded-2xl bg-[#FAFAFA] p-4 shadow-sm">
                <ProjectCard
                  title={config.project.title}
                  description={config.project.description}
                  gray={gris}
                />
                <BrandNav items={config.nav} active={0} className="px-1" />
              </div>
            </div>
          </section>

          {/* 05. Uso de la Marca */}
          <section aria-labelledby="brand-usage">
            <h2 id="brand-usage" className="mb-4 text-xl font-black" style={{ color: negro }}>
              05. Uso de la Marca
            </h2>
            <BrandPlate
              subtitle={config.usage.subtitle}
              caption={config.usage.caption}
              gray={gris}
              className="max-w-xs"
            />
            <div
              className="mt-6 rounded-xl px-4 py-3 text-sm font-light"
              style={{ backgroundColor: acento, color: gris }}
            >
              Acento {acento.toUpperCase()} aplicado como fondo de apoyo.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
