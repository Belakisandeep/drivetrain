import Image from 'next/image'
import Link from 'next/link'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-dark.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-dark.svg'
import logoGreenLife from '@/images/clients/green-life/logo-dark.svg'
import logoHomeWork from '@/images/clients/home-work/logo-dark.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-dark.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-dark.svg'
import logoPhobia from '@/images/clients/phobia/logo-dark.svg'
import logoUnseal from '@/images/clients/unseal/logo-dark.svg'
import { formatDate } from '@/lib/formatDate'
import { loadMDXMetadata } from '@/lib/loadMDXMetadata'
import FormComponent from '@/components/Form'
import FAQ from '@/components/FAQs'
import certifiedEngines from '@/images/certifiedEngines.png'
import Return from '@/images/warranty/return.svg'
import Certified from '@/images/warranty/certified.svg'
import WarrantyImage from '@/images/warranty/warranty.svg'
import Headphones from '@/images/warranty/headphone.svg'
import Shipped from '@/images/warranty/shipped.svg'
import NavButton from '@/components/shared/NavButton'
import EngineForm from '@/components/used-engines-for-sale/Form'
import Engine from '@/images/engines/used-engine.png'
import Iterator from '@/components/used-engines-for-sale/Iterator'
import engine1 from '@/images/engines/engine-1.png'
import engine2 from '@/images/engines/engine-2.png'
import engine3 from '@/images/engines/engine-3.png'
import engine4 from '@/images/engines/engine-4.png'

function CaseStudies({ caseStudies }) {
  return (
    <Container className="mt-12 sm:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-orange-400">
          Why go for a used Engine?
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        {caseStudies.map((caseStudy) => (
          <FadeIn key={caseStudy.client}>
            <article>
              <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-4 sm:pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                  <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                      src={caseStudy.logo}
                      alt=""
                      className="mx-auto h-16 w-16 flex-none sm:mx-0"
                      unoptimized
                    />
                    <h3 className="mt-6 text-sm font-semibold text-orange-400 sm:mt-0 lg:mt-8">
                      {caseStudy.client}
                    </h3>
                  </div>
                  <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-orange-400 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                      {caseStudy.service}
                    </p>
                  </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                  <p className="font-display text-4xl font-medium text-orange-400">
                    {caseStudy.title}
                  </p>
                  <div className="mt-6 space-y-6 text-base text-neutral-600">
                    {caseStudy.summary.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="mt-8 flex">
                    <Button
                      href={'/policy'}
                      aria-label={'Read about our policies'}
                    >
                      Read about our policies
                    </Button>
                  </div>
                  {caseStudy.testimonial && (
                    <Blockquote
                      author={caseStudy.testimonial.author}
                      className="mt-12"
                    >
                      {caseStudy.testimonial.content}
                    </Blockquote>
                  )}
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>
    </Container>
  )
}

const clients = [
  ['Phobia', logoPhobia],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Clients() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-orange-400">
          You’re in good company
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map(([client, logo]) => (
            <li key={client} className="group">
              <FadeIn className="overflow-hidden">
                <Border className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
                  <Image src={logo} alt={client} unoptimized />
                </Border>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

export const metadata = {
  title: 'Used Engines for Sale',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default async function Work() {
  let caseStudies = await loadMDXMetadata('used-engines-for-sale')

  return (
    <>
      <Container className="mt-12 sm:mt-28">
        <FadeIn className="flex-column items-center justify-between pt-4 sm:flex md:pt-0">
          <div className="mx-auto max-w-xl px-2 py-10 sm:px-0 sm:pl-16">
            <div className="block sm:hidden text-center">
              <h1 className="text-3xl font-semibold">
                Find my Engine & Transmission
              </h1>
              <p className="font-light">
                Simply find your Engine or Transmission and Receive price quotes
                from the best suppliers across US
              </p>
              <NavButton />
            </div>
            <Image
              src={Engine}
              alt="engine"
              className="hidden h-96 w-96 sm:block"
            />
            {/* <h1 className="hidden font-display text-2xl font-semibold tracking-tight text-orange-400 [text-wrap:balance] sm:text-3xl sm:text-orange-950 md:block">
              Buy an &quot;A&quot; grade used engine that comes with 3-5 Years
              warranty.
            </h1>
            <div className="flex items-center sm:py-3">
              <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
                <Image
                  src={Shipped}
                  alt="Shipping"
                  className="h-8"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display font-medium text-orange-400 sm:text-orange-950 ">
                  Flat Rate Shipping (Commercial address)
                </p>
              </div>
            </div>
            <div className="flex items-center sm:py-3">
              <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
                <Image
                  src={WarrantyImage}
                  alt="Shipping"
                  className="h-8"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display font-medium text-orange-400 sm:text-orange-950 ">
                  Up to 5 Years Unlimited Mile Warranty
                </p>
              </div>
            </div>
            <div className="flex items-center sm:py-3">
              <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
                <Image
                  src={Headphones}
                  alt="Shipping"
                  className="h-8"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display font-medium text-orange-400 sm:text-orange-950 ">
                  Excellent Customer Support
                </p>
              </div>
            </div>
            <div className="flex items-center sm:py-3">
              <div className="mr-2 flex h-12 w-12 items-center  rounded-full bg-white">
                <Image
                  src={Return}
                  alt="Shipping"
                  className="h-8"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-display font-medium text-orange-400 sm:text-orange-950 ">
                  No core charge for 30 days <br /> (For Transmission)
                </p>
              </div>
            </div>
            <div className="mt-4 text-2xl">
              <span className="text-black">Speak with our specialist.</span>
              <NavButton />
            </div> */}
          </div>
          <EngineForm part="Engine" />
        </FadeIn>
      </Container>
      <div className="bg-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 text-center">
              <h2 className="text-3xl font-semibold">
                3 STEP <span className="text-orange-400">HASSLE-FREE</span>{' '}
                PROCESS
              </h2>
            </div>
            <div className="col-span-12 p-4 text-center sm:col-span-4">
              <p className="text-7xl font-bold text-orange-400">1</p>
              <p className="text-xl font-semibold">Submit the Form</p>
            </div>
            <div className="col-span-12 p-4 text-center sm:col-span-4">
              <p className="text-7xl font-bold text-orange-400">2</p>
              <p className="text-xl font-semibold">Receive Price Quotes</p>
            </div>
            <div className="col-span-12 p-4 text-center sm:col-span-4">
              <p className="text-7xl font-bold text-orange-400">3</p>
              <p className="text-xl font-semibold">Choose the Best</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid grid-cols-12 gap-1">
            <div className="col-span-12 text-center">
              <h3 className="text-3xl font-semibold">
                TOP SELLING USED ENGINES
              </h3>
              <p className="font-light">
                Our top-selling used engines from US and Canada
              </p>
            </div>
            <div className="col-span-12 p-4 text-center sm:col-span-3">
              <div className="w-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image src={engine1} alt="engine" className="h-auto w-full" />
                <div className="text-center">
                  <p className="pb-3 text-xl">
                    <span className="font-bold">Ford</span> Used Engine
                  </p>
                  <p>Top Quality</p>
                  <p>Competitive Prices</p>
                  <p>Free Shipping</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 p-4 text-center sm:col-span-3">
              <div className="w-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image src={engine2} alt="engine" className="h-auto w-full" />
                <div className="text-center">
                  <p className="pb-3 text-xl">
                    <span className="font-bold">Toyota</span> Used Engine
                  </p>
                  <p>Top Quality</p>
                  <p>Competitive Prices</p>
                  <p>Free Shipping</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 p-4 text-center sm:col-span-3">
              <div className="w-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image src={engine3} alt="engine" className="h-auto w-full" />
                <div className="text-center">
                  <p className="pb-3 text-xl">
                    <span className="font-bold">Kia</span> Used Engine
                  </p>
                  <p>Top Quality</p>
                  <p>Competitive Prices</p>
                  <p>Free Shipping</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 p-4 text-center sm:col-span-3">
              <div className="w-full p-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <Image src={engine4} alt="engine" className="h-auto w-full" />
                <div className="text-center">
                  <p className="pb-3 text-xl">
                    <span className="font-bold">Audi</span> Used Engine
                  </p>
                  <p>Top Quality</p>
                  <p>Competitive Prices</p>
                  <p>Free Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 text-center">
              <h3 className="text-3xl font-semibold">WHAT WE OFFER?</h3>
            </div>
            <div className="col-span-12 p-1">
              <p className="text-xl font-light">
                We are offering free quote on Used and Rebuilt Engines from
                suppliers across US and Canada that are tested thoroughly before
                delivered. We specialize in getting you the best price for all
                makes and models both American made and import engines. Whether
                you need an Engine for you car, truck, SUV or motorcycle we have
                you covered.
              </p>
            </div>
            <div className="col-span-12 p-1">
              <p className="text-xl font-light">
                The process is very simple. You fill the form or call us on the
                number +1-888-855-1808. We will collect best quotes for you
                based on the make, model and year from our suppliers. Choose the
                best quote and make the purchase to complete your order.
              </p>
            </div>
            <div className="col-span-12 p-1">
              <p className="text-xl font-light">
                Here is a list of all the major brands we support:
              </p>
            </div>
          </div>
        </div>
      </div>
      <Iterator />
      <footer className="bg-gray-200 p-4 text-center">
        <p className="text-sm text-gray-600">
          &copy; 2023 Engines and Drivetrain
        </p>
      </footer>
      {/* <CaseStudies caseStudies={caseStudies} /> */}
      {/* <FAQ /> */}
      {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Mail Smirk', logo: logoMailSmirk }}
      >
        Whether you are a dealer, customer, service station, or a weekend
        automotive hobbyist, we are stocked with engines for sale for most
        &quot;makes and models&quot;, &quot;foreign and domestic&quot; which is difficult to find
        anywhere else in the United States. We have set the benchmark in the
        auto industry by offering quality auto parts at competitive prices on
        used engines with warranty Our specialized range of Engines & Drivetrainludes but
        not limited to model BMW, Audi, Honda, Chevrolet, Mercedes, Nissan,
        Ford, Jaguar, Toyota, Mitsubishi, Subaru, Saab, Porsche, Fiat, Volvo,
        and much more. For more details, a list of used engines of various make
        is incorporated below.
      </Testimonial> */}
      {/* <Clients /> */}
      {/* <ContactSection /> */}
    </>
  )
}
