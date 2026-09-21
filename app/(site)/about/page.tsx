import { BlendedPhoto, DisplayHeading, PageHeader, Reveal } from '@/components';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <>
      <PageHeader lines={['THE', 'STORY']} variant="midnight" />
      <div className="mx-auto grid max-w-page gap-16 px-(--spacing-gutter) py-16">
        <Reveal as="section" variant="up" className="grid items-center gap-10 md:grid-cols-2">
          <BlendedPhoto fade="soft" imageSrc="/images/artists/robert-dempster.jpg" imageAlt="Robert Dempster waving in a navy and gold jacket, blue trousers and glasses, holding a white guitar" aspect="4/5" />
          <div>
            <DisplayHeading as="h2" size="band" lines={['THE', 'MAN']} />
            <p className="mt-6 max-w-prose text-white/70">Placeholder biography. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </Reveal>
        <Reveal as="section" variant="up" className="grid items-center gap-10 md:grid-cols-2">
          <div className="md:order-1">
            <DisplayHeading as="h2" size="band" lines={['IN THE', 'STUDIO']} />
            <p className="mt-6 max-w-prose text-white/70">Placeholder studio process. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <BlendedPhoto fade="soft" imageSrc="/images/sections/beach.jpg" imageAlt="Robert Dempster laughing on a sunny beach with a bright blue acoustic guitar" aspect="1/1" />
        </Reveal>
      </div>
    </>
  );
}
