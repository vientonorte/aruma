'use client';

import { useState } from 'react';
import { StarDivider } from './components/StarDivider';
import { InstagramStory } from './components/InstagramStory';
import { InstagramReelCover } from './components/InstagramReelCover';
import { InstagramFeedPost } from './components/InstagramFeedPost';
import { InstagramCarousel } from './components/InstagramCarousel';
import { EditorialDossier } from './components/EditorialDossier';
import { PanoramicTriptych } from './components/PanoramicTriptych';
import { IconCircle } from './components/IconCircle';
import { NumberTag } from './components/NumberTag';
import { OrnamentFrame } from './components/OrnamentFrame';
import { FooterMonoLine } from './components/FooterMonoLine';
import { Sparkles, Flame, Circle, Image as ImageIcon, Grid, Palette, FileText, Layout } from 'lucide-react';
import { typography } from '@/lib/design-system/tokens/typography';
import { colors } from '@/lib/design-system/tokens/colors';

type Tab = 'story' | 'reel' | 'feed' | 'carousel' | 'dossier' | 'triptych' | 'components' | 'colors';

const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
  { id: 'story', label: 'Story', icon: <Flame className="w-4 h-4" /> },
  { id: 'reel', label: 'Reel', icon: <Circle className="w-4 h-4" /> },
  { id: 'feed', label: 'Feed', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'carousel', label: 'Carousel', icon: <Grid className="w-4 h-4" /> },
  { id: 'dossier', label: 'Dossier', icon: <FileText className="w-4 h-4" /> },
  { id: 'triptych', label: 'Triptych', icon: <Layout className="w-4 h-4" /> },
  { id: 'components', label: 'Components', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'colors', label: 'Colors', icon: <Palette className="w-4 h-4" /> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('story');

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 
            className="text-4xl font-bold text-center uppercase mb-2"
            style={{ letterSpacing: typography.letterSpacing.brand }}
          >
            ARUMA
          </h1>
          <p className="text-center text-neutral-400 text-sm">Social Media Content Creator</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-[110px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-botanical-500 text-white'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
                aria-current={activeTab === tab.id ? 'page' : undefined}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {activeTab === 'story' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Instagram Story</h2>
              <p className="text-neutral-400">9:16 vertical format (1080x1920px)</p>
            </div>
            <InstagramStory />
          </div>
        )}

        {activeTab === 'reel' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Instagram Reel Cover</h2>
              <p className="text-neutral-400">9:16 vertical format for reels</p>
            </div>
            <InstagramReelCover />
          </div>
        )}

        {activeTab === 'feed' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Instagram Feed Post</h2>
              <p className="text-neutral-400">1:1 square format (1080x1080px)</p>
            </div>
            <InstagramFeedPost />
          </div>
        )}

        {activeTab === 'carousel' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Instagram Carousel</h2>
              <p className="text-neutral-400">Multi-image carousel with 1:1 slides</p>
            </div>
            <InstagramCarousel />
          </div>
        )}

        {activeTab === 'dossier' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Editorial Dossier</h2>
              <p className="text-neutral-400">Professional editorial layout</p>
            </div>
            <EditorialDossier />
          </div>
        )}

        {activeTab === 'triptych' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Panoramic Triptych</h2>
              <p className="text-neutral-400">Wide 3-panel panoramic layout</p>
            </div>
            <PanoramicTriptych />
          </div>
        )}

        {activeTab === 'components' && (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">UI Components</h2>
              <p className="text-neutral-400">Reusable component library</p>
            </div>

            {/* Star Divider */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Star Divider</h3>
              <div className="bg-neutral-900 p-8 rounded-lg">
                <StarDivider count={3} />
                <div className="mt-6">
                  <StarDivider count={5} />
                </div>
              </div>
            </section>

            {/* Icon Circle */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Icon Circle</h3>
              <div className="bg-neutral-900 p-8 rounded-lg flex flex-wrap gap-4">
                <IconCircle icon={<Sparkles className="w-5 h-5" />} size="sm" />
                <IconCircle icon={<Flame className="w-6 h-6" />} size="md" />
                <IconCircle icon={<Palette className="w-8 h-8" />} size="lg" />
                <IconCircle icon={<Sparkles className="w-6 h-6" />} size="md" variant="botanical" />
                <IconCircle icon={<Flame className="w-6 h-6" />} size="md" variant="outline" />
              </div>
            </section>

            {/* Number Tag */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Number Tag</h3>
              <div className="bg-neutral-900 p-8 rounded-lg flex flex-wrap gap-4">
                <NumberTag number={1} size="sm" />
                <NumberTag number={2} size="md" />
                <NumberTag number={3} size="lg" />
                <NumberTag number={4} size="md" variant="botanical" />
                <NumberTag number={5} size="md" variant="outline" />
              </div>
            </section>

            {/* Ornament Frame */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Ornament Frame</h3>
              <div className="bg-neutral-900 p-8 rounded-lg space-y-4">
                <OrnamentFrame variant="simple">
                  <div className="p-8 text-center">
                    <p>Simple Frame</p>
                  </div>
                </OrnamentFrame>
                <OrnamentFrame variant="decorative">
                  <div className="p-8 text-center">
                    <p>Decorative Frame</p>
                  </div>
                </OrnamentFrame>
                <OrnamentFrame variant="botanical">
                  <div className="p-8 text-center bg-neutral-800">
                    <p>Botanical Frame</p>
                  </div>
                </OrnamentFrame>
              </div>
            </section>

            {/* Footer Mono Line */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Footer Mono Line</h3>
              <div className="bg-neutral-900 rounded-lg overflow-hidden">
                <FooterMonoLine text="ARUMA" />
                <FooterMonoLine text="Wellness & Beauty" />
              </div>
            </section>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Color System</h2>
              <p className="text-neutral-400">ARUMA brand color palette</p>
            </div>

            {/* Brand Colors */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Brand Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-24 rounded-lg bg-black border border-neutral-700" />
                  <p className="text-sm font-mono">Black</p>
                  <p className="text-xs text-neutral-500">#000000</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-24 rounded-lg bg-white" />
                  <p className="text-sm font-mono">White</p>
                  <p className="text-xs text-neutral-500">#FFFFFF</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: colors.brand.offWhite }} />
                  <p className="text-sm font-mono">Off-White</p>
                  <p className="text-xs text-neutral-500">#F5F5F7</p>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-24 rounded-lg" style={{ backgroundColor: colors.brand.botanical[500] }} />
                  <p className="text-sm font-mono">Botanical</p>
                  <p className="text-xs text-neutral-500">#3D9461</p>
                </div>
              </div>
            </section>

            {/* Botanical Scale */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Botanical Green Scale</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                {Object.entries(colors.brand.botanical).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="w-full h-16 rounded-lg" style={{ backgroundColor: value }} />
                    <p className="text-xs text-center">{key}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Neutral Scale */}
            <section className="space-y-4">
              <h3 className="text-2xl font-semibold">Neutral Scale</h3>
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {Object.entries(colors.neutral).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="w-full h-16 rounded-lg border border-neutral-700" style={{ backgroundColor: value }} />
                    <p className="text-xs text-center">{key}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <FooterMonoLine text="ARUMA SOCIAL MEDIA CREATOR" className="mt-12" />
    </div>
  );
}
