import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import imageLaptop from '@/images/laptop.jpg'
import { loadMDXMetadata } from '@/lib/loadMDXMetadata'
import FormComponent from '@/components/Form'

import Return from '@/images/warranty/return.svg'
import Certified from '@/images/warranty/certified.svg'
import WarrantyImage from '@/images/warranty/warranty.svg'
import Headphones from '@/images/warranty/headphone.svg'
import Shipped from '@/images/warranty/shipped.svg'

import porche from '@/images/clients/logos/1.png'
import Nissan from '@/images/clients/logos/2.png'
import Mitsubishi from '@/images/clients/logos/3.png'
import Mini from '@/images/clients/logos/4.png'
import Mercedes from '@/images/clients/logos/5.png'
import LandRover from '@/images/clients/logos/6.png'
import Kia from '@/images/clients/logos/7.png'
import Hyundai from '@/images/clients/logos/8.png'
import Geo from '@/images/clients/logos/9.png'
import Datsun from '@/images/clients/logos/10.png'
import Daihatsu from '@/images/clients/logos/11.png'
import Audi from '@/images/clients/logos/12.png'
import BMW from '@/images/clients/logos/13.png'
import AlphaRomeo from '@/images/clients/logos/14.png'
import Acura from '@/images/clients/logos/15.png'
import Honda from '@/images/clients/logos/16.png'
import Jaguar from '@/images/clients/logos/17.png'
import Infinity from '@/images/clients/logos/18.png'
import Daewoo from '@/images/clients/logos/19.png'
import Lexus from '@/images/clients/logos/20.png'
import Mazda from '@/images/clients/logos/21.png'
import Volvo from '@/images/clients/logos/22.png'
import Toyota from '@/images/clients/logos/23.png'
import Suzuki from '@/images/clients/logos/24.png'
import Subaru from '@/images/clients/logos/25.png'
import Scion from '@/images/clients/logos/26.png'
import Saturn from '@/images/clients/logos/27.png'
import Volkswagen from '@/images/clients/logos/29.png'
import ChooseUs from '@/images/choose-us.webp'
import BannerChoose from '@/images/banner-choose.webp'
import { PhoneIcon } from '@heroicons/react/24/outline'

const clients = [
  ['Porche', porche],
  ['Nissan', Nissan],
  ['Mitsubishi', Mitsubishi],
  ['Mini', Mini],
  ['Mercedes', Mercedes],
  ['Land Rover', LandRover],
  ['Kia', Kia],
  ['Hyundai', Hyundai],
  ['Geo', Geo],
  ['Datsun', Datsun],
  ['Daihatsu', Daihatsu],
  ['Audi', Audi],
  ['BMW', BMW],
  ['Alpha Romeo', AlphaRomeo],
  ['Acura', Acura],
  ['Honda', Honda],
  ['Jaguar', Jaguar],
  ['Infinity', Infinity],
  ['Daewoo', Daewoo],
  ['Lexus', Lexus],
  ['Mazda', Mazda],
  ['Volvo', Volvo],
  ['Toyota', Toyota],
  ['Suzuki', Suzuki],
  ['Subaru', Subaru],
  ['Scion', Scion],
  ['Saturn', Saturn],
  ['Volkswagen', Volkswagen],
]

function Clients() {
  return (
    <div className="bg-white-400 mt-20 rounded-4xl py-20 sm:py-32">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-orange-400 sm:text-left">
            Find Used Engines for Sale by{' '}
            <span className="text-xl">Popular Brands</span>
          </h2>
          <div className="h-px flex-auto bg-neutral-50" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 content-center gap-x-8 gap-y-10 lg:grid-cols-7"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Link
                    href={`/search/engines/${client
                      .toLowerCase()
                      .replace(/ /g, '_')}`}
                  >
                    <div className="flex items-center">
                      {/* <Image
                        className="h-6 w-auto"
                        src={logo}
                        alt={client}
                        unoptimized
                      /> */}
                      <p className="pl-0.5 text-center font-display text-sm font-semibold tracking-wider text-black">
                        {client.replace(/ /g, '')}&nbsp;&gt;&gt;
                      </p>
                    </div>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function Intro({
  eyebrow,
  title,
  children,
  smaller = false,
  invert = false,
  ...props
}) {
  return (
    <Container {...props}>
      <FadeIn className="w-full">
        <h2>
          {eyebrow && (
            <>
              <span
                className={clsx(
                  'mb-6 block font-display text-base font-semibold',
                  invert ? 'text-white' : 'text-orange-400'
                )}
              >
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={clsx(
              'block font-display tracking-tight [text-wrap:balance]',
              smaller
                ? 'text-2xl font-semibold'
                : 'text-4xl font-medium sm:text-5xl',
              invert ? 'text-white' : 'text-orange-400'
            )}
          >
            {title}
          </span>
        </h2>
        {children && (
          <div
            className={clsx(
              'mt-6 text-xl',
              invert ? 'text-neutral-300' : 'text-neutral-600'
            )}
          >
            {children}
          </div>
        )}
      </FadeIn>
    </Container>
  )
}

function CaseStudies({ caseStudies }) {
  return (
    <>
      <Container>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2">
          <Intro title="Why choose Us?" className="mt-24 sm:mt-32 lg:mt-40">
            <p>
              Used Engines Inc. helps you fix your car troubles with
              high-functioning certified used engines and transmissions without
              burning a hole in your pockets. Whether your problem is an
              overheating engine or a gearbox that’s close to dying we’ll
              provide you with the best possible solution.
            </p>
          </Intro>
          <Image src={ChooseUs} alt="Choose Us" unoptimized />
        </div>
      </Container>
      {/* <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-orange-400/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-orange-400">
                  <time dateTime={caseStudy.year} className="font-semibold">
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-orange-400">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container> */}
    </>
  )
}

function Services() {
  return (
    <>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={BannerChoose}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="What is the Process for making a Purchase?">
              To place an order, you can either call our sales team at
              1800-518-9776 or soon you can place an order online on our website
              (our website will shortly feature online ordering). We accept all
              major credit cards such as VISA, Master Card, American Express,
              and Discover Card, as well as cashiers checks and money orders by
              mail. Please keep in mind that cashiers checks and money orders
              take longer to obtain and that after we receive the cashiers check
              or money order, we will contact you to verify your order and ship
              it out as per our delivery commitment.
            </ListItem>
            <ListItem title="Is financing available through your company?">
              Yes, we do provide financing through our lending partner
              PAYTOMORROW. Please refer to the financing page for more
              information and to get the pre-approval link on your email.
            </ListItem>
            <ListItem title="Is it possible for me to come and collect my auto-parts in person?">
              Unfortunately, we are unable to offer a pickup option as our
              inventory is dispersed from multiple supplier locations. However,
              all orders placed within the United States come with free
              shipping.
            </ListItem>
            <ListItem title="What components are included with a purchase of a used Engine?">
              The engine assembly that will be received will include the main
              internal parts, such as the block, head, piston, camshaft, and
              crankshaft, as well as other components. Additional parts, such as
              change-over accessories and items that may show wear and tear, may
              also be included but will not be covered by warranty and will not
              be charged for.
            </ListItem>
          </List>
        </div>
      </Container>
      {/* <Container>
        <div className="grid w-full grid-cols-1 align-middle sm:grid-cols-2">
          <Image src={BannerChoose} alt="About us" unoptimized /> */}
      <Intro
        eyebrow="About"
        title="Who are We?"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Engines & Drivetrain was established in 2010 with the objective to
          provide customers with high- quality and low mileage used engines.
          Keeping the fact in mind that new vehicle or engine can cost a
          fortune, we offer largest collection of car engines for sale which is
          as reliable as the new one & will deliver excellent performance at a
          low price. We are very particular about the quality of used engines
          and try & test every piece before selling. Hence, you can be assured
          of purchasing a reliable used engine for your vehicle.
        </p>
      </Intro>
      {/* </div>
      </Container> */}
    </>
  )
}

export const metadata = {
  description: `Engines & Drivetrain was established in 2010 with the objective to provide
    customers with high- quality and low mileage used engines. Keeping the
    fact in mind that new vehicle or engine can cost a fortune, we offer
    largest collection of car engines for sale which is as reliable as the
    new one & will deliver excellent performance at a low price. We are
    very particular about the quality of used engines and try & test every
    piece before selling. Hence, you can be assured of purchasing a
    reliable used engine for your vehicle.`,
}

export default async function Home() {
  let caseStudies = (await loadMDXMetadata('used-engines-for-sale')).slice(0, 3)

  return (
    <>
      <Container formContainer={true} className="mt-12 sm:mt-40">
        <FadeIn className="flex-column items-center justify-between pt-16 sm:flex md:pt-0">
          <FormComponent />
          <div className="px-2 sm:px-0 sm:pl-16">
            <h1 className="hidden font-display text-2xl font-semibold tracking-tight text-orange-400 [text-wrap:balance] sm:text-3xl sm:text-orange-950 md:block">
              Find A grade used engines with 3-5 Years warranty.
            </h1>
            <div className="flex items-center py-3">
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
            <div className="flex items-center py-3">
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
            <div className="flex items-center py-3">
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
            <div className="flex items-center py-3">
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
              <span className="text-white">Speak with our specialist.</span>
              <a
                href="tel:+18882338259"
                className="flex w-fit items-center rounded-lg bg-orange-500 px-4 py-2 text-white transition duration-300 hover:bg-orange-600"
              >
                <PhoneIcon className="animate-phone-ring h-6" />
                <span className="ml-2">+1-888-233-8259</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      {/* <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'Phobia', logo: logoPhobiaDark }}
      >
        The team at Studio went above and beyond with our onboarding, even
        finding a way to access the user’s microphone without triggering one of
        those annoying permission dialogs.
      </Testimonial> */}

      <Services />

      <ContactSection />
    </>
  )
}
