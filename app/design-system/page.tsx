/**
 * Design System Showcase Page
 * Demonstrates all components from the ARUMA design system
 */

'use client';

import {
  Button,
  Input,
  Badge,
  Card,
  Heading,
  Text,
  Label,
  Caption,
  Overline,
  FormField,
  IconCard,
  StatusMessage,
  Logo,
  Header,
  Footer,
  Hero,
  BentoGrid,
  BotanicalPattern,
} from '@/lib/design-system';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header
        navigation={[
          { label: 'Inicio', href: '/' },
          { label: 'Sistema de Diseño', href: '/design-system' },
        ]}
      />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Overline className="mb-2">ĀRŪḾA Design System</Overline>
          <Heading as="h1" brand>
            Sistema de Diseño
          </Heading>
          <Text size="lg" muted className="mt-4 max-w-3xl">
            Componentes construidos con principios de diseño atómico, inspirados en la identidad de marca ARUMA.
          </Text>
        </div>

        {/* Logos Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Logos
          </Heading>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <Text size="sm" muted className="mb-4">
                Logo Completo
              </Text>
              <Logo variant="full" size="md" showSubtitle />
            </Card>
            <Card>
              <Text size="sm" muted className="mb-4">
                Logo Compacto
              </Text>
              <Logo variant="compact" size="lg" />
            </Card>
            <Card>
              <Text size="sm" muted className="mb-4">
                Icono
              </Text>
              <Logo variant="icon" size="xl" />
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Tipografía
          </Heading>
          <Card>
            <div className="space-y-4">
              <div>
                <Heading as="h1">Heading 1 - Display Grande</Heading>
                <Caption>text-5xl, tracking-[0.3em]</Caption>
              </div>
              <div>
                <Heading as="h2">Heading 2 - Display Mediano</Heading>
                <Caption>text-4xl, tracking-[0.1em]</Caption>
              </div>
              <div>
                <Heading as="h3">Heading 3 - Título</Heading>
                <Caption>text-3xl, tracking-wider</Caption>
              </div>
              <div>
                <Text size="lg">Body Large - Texto destacado</Text>
                <Caption>text-lg, line-height: relaxed</Caption>
              </div>
              <div>
                <Text size="base">Body - Texto normal</Text>
                <Caption>text-base, line-height: relaxed</Caption>
              </div>
              <div>
                <Overline>Overline - Texto superior</Overline>
                <Caption>text-xs, uppercase, tracking-[0.24em]</Caption>
              </div>
            </div>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Botones
          </Heading>
          <div className="grid gap-6">
            <Card>
              <Text size="sm" muted className="mb-4">
                Variantes
              </Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="botanical">Botanical</Button>
              </div>
            </Card>
            <Card>
              <Text size="sm" muted className="mb-4">
                Tamaños
              </Text>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </Card>
            <Card>
              <Text size="sm" muted className="mb-4">
                Estados
              </Text>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Elementos de Formulario
          </Heading>
          <Card>
            <div className="grid gap-6">
              <FormField
                label="Nombre completo"
                id="name-example"
                hint="Introduce tu nombre y apellidos"
                inputProps={{ placeholder: 'Juan Pérez' }}
              />
              <FormField
                label="Email"
                id="email-example"
                error="El email no es válido"
                inputProps={{ placeholder: 'juan@ejemplo.com', type: 'email' }}
              />
              <FormField
                label="Mensaje"
                id="message-example"
                type="textarea"
                textareaProps={{ placeholder: 'Escribe tu mensaje aquí...' }}
              />
              <div>
                <Label>Input con variante botanical</Label>
                <Input variant="botanical" placeholder="Input con acento verde" className="mt-2" />
              </div>
            </div>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Badges
          </Heading>
          <Card>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="botanical">Botanical</Badge>
            </div>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Cards
          </Heading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="default">
              <Text size="sm">Default Card</Text>
            </Card>
            <Card variant="elevated">
              <Text size="sm">Elevated Card</Text>
            </Card>
            <Card variant="outlined">
              <Text size="sm">Outlined Card</Text>
            </Card>
            <Card variant="botanical">
              <Text size="sm">Botanical Card</Text>
            </Card>
          </div>
        </section>

        {/* Status Messages Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Mensajes de Estado
          </Heading>
          <div className="grid gap-4">
            <StatusMessage type="success" title="Éxito" message="La operación se completó correctamente." />
            <StatusMessage type="error" title="Error" message="Ocurrió un error al procesar tu solicitud." />
            <StatusMessage type="warning" title="Advertencia" message="Por favor, revisa los datos ingresados." />
            <StatusMessage type="info" message="Este es un mensaje informativo sin título." />
          </div>
        </section>

        {/* Icon Cards Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Icon Cards
          </Heading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <IconCard
              title="Seguridad"
              description="Protección de datos con encriptación end-to-end"
              variant="botanical"
            />
            <IconCard title="Accesibilidad" description="Cumple con estándares WCAG 2.1 AA" />
            <IconCard title="Performance" description="Optimizado para carga rápida y eficiencia" />
          </div>
        </section>

        {/* Botanical Patterns Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Patrones Botánicos
          </Heading>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <Text size="sm" muted className="mb-4">
                Leaf
              </Text>
              <div className="flex justify-center">
                <BotanicalPattern variant="leaf" size="lg" opacity={0.4} />
              </div>
            </Card>
            <Card>
              <Text size="sm" muted className="mb-4">
                Branch
              </Text>
              <div className="flex justify-center">
                <BotanicalPattern variant="branch" size="lg" opacity={0.4} />
              </div>
            </Card>
            <Card>
              <Text size="sm" muted className="mb-4">
                Scatter
              </Text>
              <div className="flex justify-center">
                <BotanicalPattern variant="scatter" size="lg" opacity={0.4} />
              </div>
            </Card>
            <Card>
              <Text size="sm" muted className="mb-4">
                Geometric
              </Text>
              <div className="flex justify-center">
                <BotanicalPattern variant="geometric" size="lg" opacity={0.4} />
              </div>
            </Card>
          </div>
        </section>

        {/* Hero Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Hero
          </Heading>
          <Hero
            title="ĀRŪḾA"
            subtitle="High-End Booking & Identity"
            description="Sistema de diseño completo con principios de diseño atómico y accesibilidad universal."
            variant="botanical"
            primaryAction={{ label: 'Comenzar', onClick: () => {} }}
            secondaryAction={{ label: 'Más información', onClick: () => {} }}
          />
        </section>

        {/* Bento Grid Section */}
        <section className="mb-16">
          <Heading as="h2" className="mb-6 text-2xl">
            Bento Grid
          </Heading>
          <BentoGrid
            columns={4}
            items={[
              {
                title: 'Feature 1',
                description: 'Descripción de la característica principal',
                span: 2,
                variant: 'botanical',
              },
              { title: 'Feature 2', description: 'Segunda característica importante', span: 1 },
              { title: 'Feature 3', description: 'Tercera característica', span: 1 },
              { title: 'Feature 4', description: 'Cuarta característica con más detalles', span: 4 },
            ]}
          />
        </section>
      </main>

      <Footer
        links={[
          {
            title: 'Producto',
            items: [
              { label: 'Características', href: '#' },
              { label: 'Precios', href: '#' },
            ],
          },
          {
            title: 'Empresa',
            items: [
              { label: 'Acerca de', href: '#' },
              { label: 'Blog', href: '#' },
            ],
          },
          {
            title: 'Legal',
            items: [
              { label: 'Privacidad', href: '#' },
              { label: 'Términos', href: '#' },
            ],
          },
        ]}
      />
    </div>
  );
}
