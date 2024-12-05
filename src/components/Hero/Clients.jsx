import Link from 'next/link'
import { Container } from '../Container'
import { FadeIn, FadeInStagger } from '../FadeIn'

const clients = [
  ['Porche'],
  ['Nissan'],
  ['Mitsubishi'],
  ['Mini'],
  ['Mercedes'],
  ['Land Rover'],
  ['Kia'],
  ['Hyundai'],
  ['Geo'],
  ['Datsun'],
  ['Daihatsu'],
  ['Audi'],
  ['BMW'],
  ['Alpha Romeo'],
  ['Acura'],
  ['Honda'],
  ['Jaguar'],
  ['Infinity'],
  ['Daewoo'],
  ['Lexus'],
  ['Mazda'],
  ['Volvo'],
  ['Toyota'],
  ['Suzuki'],
  ['Subaru'],
  ['Scion'],
  ['Saturn'],
  ['Volkswagen'],
]

export function Clients() {
  return (
    <div className="bg-white-400 rounded-4xl py-10 sm:mt-20 sm:py-32">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <p className="text-center  text-sm font-semibold tracking-wider text-orange-400 sm:text-left">
            Find Used Engines for Sale by{' '}
            <span className="text-xl">Popular Brands</span>
          </p>
          <div className="h-px flex-auto bg-neutral-50" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-3 content-center gap-x-4 gap-y-5 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-7"
          >
            {clients.map(([client]) => (
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
                      <p className="pl-0.5 text-center  text-sm font-semibold tracking-wider text-black">
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
