import Link from 'next/link'
import clsx from 'clsx'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { SectionIntro } from '@/components/SectionIntro'
import { formatDate } from '@/lib/formatDate'
import Image from 'next/image'
import carService from '@/images/car-service.jpg'
import { StylizedImage } from './StylizedImage'
import { List, ListItem } from './List'

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 6" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 3 18 .5v2H0v1h18v2L24 3Z"
      />
    </svg>
  )
}

function PageLink({ page }) {
  return (
    <article key={page.href}>
      <Border
        position="left"
        className="relative flex flex-col items-start pl-8"
      >
        <h3 className="mt-6 text-base font-semibold text-orange-400">
          {page.title}
        </h3>
        <time
          dateTime={page.date}
          className="order-first text-sm text-neutral-600"
        >
          {formatDate(page.date)}
        </time>
        <p className="mt-2.5 text-base text-neutral-600">{page.description}</p>
        <Link
          href={page.href}
          className="mt-6 flex gap-x-3 text-base font-semibold text-orange-400 transition hover:text-neutral-700"
          aria-label={`Read more: ${page.title}`}
        >
          Read more
          <ArrowIcon className="w-6 flex-none fill-current" />
          <span className="absolute inset-0" />
        </Link>
      </Border>
    </article>
  )
}

export function PageLinks({ title, intro, pages, className }) {
  return (
    <Container className="mt-16">
      <div className="lg:flex lg:items-center lg:justify-end">
        <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              src={carService}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end"
            />
          </FadeIn>
        </div>
        <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
          <ListItem title="Customer Satisfaction: Our Main Priority">
            We strive to provide you smooth and hassle- free experience of
            buying used engines with warranty for your car or truck. Our
            customer care executives are ready to serve you in every way
            possible so that you do face any difficulty or issues.
          </ListItem>
          <ListItem title="World-Class Industrial Experience">
            Our in-depth & comprehensive knowledge of Automobile Market,
            Competitive pricing, Large Scale Inventory & Proficient technical
            team keeps us ahead of the competition.
          </ListItem>
          <ListItem title="Largest Network of Inventory Yards">
            Our main objective is to connect buyers who are searching for used
            engine with more than 1800 inventory yards. We want to streamline
            and economize the used engine buying process by offering you a
            smooth and buying experience.
          </ListItem>
        </List>
      </div>
    </Container>
  )
}
