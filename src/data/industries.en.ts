import type { Industry } from './industries';

/** English copy of the industry pages, keyed by slug. Same rules as the Spanish: no invented statistics. */
export type IndustryCopy = Pick<Industry, 'name' | 'audience' | 'h1' | 'intro' | 'pains' | 'useCases' | 'care' | 'faqs'>;

export const industriesEn: Record<string, IndustryCopy> = {
  'transporte-y-flotas': {
    name: 'Transport and fleets',
    audience: 'transport, logistics and fleet companies',
    h1: 'Artificial intelligence for transport and fleet companies',
    intro:
      'In transport, margin disappears in the details: a truck off the road because nobody booked its service, a customer chasing a delivery by phone, delivery notes and invoices typed in by hand. AI and custom software put that operation in order so your team spends its time moving freight, not paperwork.',
    pains: [
      'Customers call or message on WhatsApp to ask where their delivery is',
      'Services, inspections and permits are tracked in spreadsheets',
      'Delivery notes, invoices and receipts are checked and typed in by hand',
      'GPS, fuel and driver data live in systems that don’t talk to each other',
    ],
    useCases: [
      { title: 'Delivery status without phone calls', text: 'An AI agent on WhatsApp answers the status of each shipment by checking your system or GPS, and hands only the cases that need it to a person.' },
      { title: 'Services that schedule themselves', text: 'Automatic alerts by mileage, engine hours or expiry dates for each vehicle’s inspection, permits and insurance.' },
      { title: 'Automatic document reading', text: 'AI extracts data from delivery notes, invoices and proof of delivery (even photos) and loads it into your system, flagging mismatches for review.' },
      { title: 'One dashboard for the whole fleet', text: 'GPS, fuel, drivers and costs in a single panel, with reports that build themselves every week.' },
      { title: 'Faster quotes', text: 'Freight quotes built from your rates, distances and terms, ready to review and send in minutes.' },
    ],
    care:
      'Driver and vehicle location data is sensitive for your company and your customers: the solution must define who sees what, where the data is stored and for how long.',
    faqs: [
      { q: 'Do I need to replace my GPS or current system?', a: 'Not necessarily. The usual approach is to integrate with what you already use (GPS, ERP, spreadsheets) and add automation and AI on top. If a tool can’t be integrated, we assess it in the diagnosis.' },
      { q: 'Does it work for a small fleet?', a: 'Yes. In small fleets the impact often shows sooner, because the same people who run operations also handle customers and admin.' },
      { q: 'Where should we start?', a: 'Usually with whatever interrupts the team most: customers asking about delivery status, or keeping track of services and expiry dates.' },
    ],
  },
  'clinicas-y-salud': {
    name: 'Clinics and healthcare',
    audience: 'clinics, medical centres and practices',
    h1: 'Artificial intelligence for clinics and medical centres',
    intro:
      'In healthcare, every empty slot and every no-show is lost. Reception spends the day confirming appointments, answering the same questions and rescheduling. AI can take over that repetitive load, always with clear rules on what it answers and what it hands to a person.',
    pains: [
      'Reception confirms appointments one by one by phone or WhatsApp',
      'Patients who don’t show up and slots left empty',
      'The same questions every day: prices, insurance agreements, test preparation, location',
      'Occupancy and production reports are put together by hand',
    ],
    useCases: [
      { title: 'Automatic confirmation and rescheduling', text: 'Messages that confirm, remind and let patients reschedule without reception stepping in, freeing slots for the waiting list.' },
      { title: '24/7 WhatsApp support', text: 'An agent that answers prices, agreements, opening hours and test preparation with the centre’s official information, and hands anything clinical or sensitive to a person.' },
      { title: 'Connected scheduling', text: 'Online booking integrated with each professional’s calendar, with rules by specialty, room and duration.' },
      { title: 'Reports that build themselves', text: 'Occupancy, no-shows and production per professional in an up-to-date dashboard, without spreadsheets.' },
      { title: 'Follow-up after the visit', text: 'Automatic check-up reminders and satisfaction surveys that help patients come back.' },
    ],
    care:
      'Health data is sensitive personal data. An AI agent must not give medical advice, and the solution has to comply with data-protection law (in Chile, Law 19,628 and the new Law 21,719): restricted access, a log of who looks at what, and hand-off to a professional when appropriate.',
    faqs: [
      { q: 'Can the AI agent answer medical questions?', a: 'It shouldn’t. It’s set up to answer administrative information (prices, hours, agreements, test preparation) and hand any clinical question to a professional.' },
      { q: 'Can it integrate with my scheduling software?', a: 'In most cases yes, through its API or available integrations. If not, we look at alternatives in the diagnosis.' },
      { q: 'How is patient data protected?', a: 'With role-based access, encryption, access logs and compliant providers. The diagnosis defines which data each automation uses and which it must never touch.' },
    ],
  },
  inmobiliarias: {
    name: 'Real estate',
    audience: 'real estate developers and agencies',
    h1: 'Artificial intelligence for real estate developers and agencies',
    intro:
      'In real estate, whoever answers first usually wins the client. But leads arrive from listing portals, social media and WhatsApp at any hour, and the sales team can’t answer them all or follow up. AI replies instantly, qualifies and books visits, so your agents only talk to genuine buyers.',
    pains: [
      'Leads from portals and social media answered hours or days later',
      'Agents losing time on enquiries that don’t qualify',
      'Buyer follow-up kept in spreadsheets or in each agent’s head',
      'The same questions for every project: price, mortgage payment, deposit, delivery date, location',
    ],
    useCases: [
      { title: 'Instant reply to every lead', text: 'An AI agent answers in seconds on WhatsApp or the web with the real information for each project and property.' },
      { title: 'Automatic qualification', text: 'Key questions (budget, deposit, timing, financing) before the contact reaches an agent, with the summary ready.' },
      { title: 'Visit booking', text: 'Showroom or property visits booked straight into the agent’s calendar, with reminders.' },
      { title: 'Simulators on your site', text: 'Mortgage, deposit and appreciation simulators that help buyers decide and give the sales team valuable data.' },
      { title: 'Follow-up that never forgets', text: 'Automatic sequences for prospects who stalled, and alerts to the agent when a buyer engages again.' },
    ],
    care:
      'The agent must answer only with current information (prices, availability, terms) and make clear that simulations are indicative. Prospect data must be handled according to data-protection law.',
    faqs: [
      { q: 'Does it integrate with listing portals?', a: 'Leads that arrive by email or through portal integrations can be captured and answered automatically. The details depend on each portal and are reviewed in the diagnosis.' },
      { q: 'Does it replace sales agents?', a: 'No. It handles the first reply, qualification and follow-up so agents spend their time on visits and closing.' },
      { q: 'Is it useful for a small agency?', a: 'Yes. For small teams it’s especially useful, because you can answer after hours without hiring more people.' },
    ],
  },
  'retail-y-ecommerce': {
    name: 'Retail and e-commerce',
    audience: 'shops, retail and e-commerce',
    h1: 'Artificial intelligence for retail and e-commerce',
    intro:
      'In retail the questions never stop: stock, sizes, shipping, exchanges and returns. Every question without a quick answer is a sale that can go to a competitor. AI serves, recommends and tracks orders at any hour, and custom software connects your store, inventory and shipping.',
    pains: [
      'Stock, size and shipping questions piling up on WhatsApp and Instagram',
      'Customers asking again and again about their order status',
      'Abandoned carts with no follow-up',
      'Stock out of sync between the physical store, the website and marketplaces',
    ],
    useCases: [
      { title: '24/7 sales assistant on WhatsApp', text: 'An agent that answers with your real catalogue, recommends products and sends the checkout link.' },
      { title: 'Automatic order status', text: 'Shipping and tracking answers pulled from your store and courier, without the team stepping in.' },
      { title: 'Cart recovery', text: 'Timely, personalised messages for customers who left a purchase halfway.' },
      { title: 'Synced stock', text: 'Integration between web store, point of sale and marketplaces so you never sell what you don’t have.' },
      { title: 'Sales reports without spreadsheets', text: 'Sales, fast movers and slow movers in a dashboard that updates itself.' },
    ],
    care:
      'Automated messages must respect customer consent and the option to opt out. The agent has to answer with up-to-date prices and stock so it never promises what isn’t there.',
    faqs: [
      { q: 'Does it work with my store platform?', a: 'The most common platforms (for example Shopify, WooCommerce or Jumpseller) support integrations. If your store is custom-built, we integrate through its database or API.' },
      { q: 'Can the agent close sales?', a: 'It can answer questions, recommend products and send the payment link. Payment happens in your store or usual payment provider.' },
      { q: 'What about exchanges and returns?', a: 'The agent explains the policy and collects the case details; approval can stay with a person if you prefer.' },
    ],
  },
  'estudios-profesionales': {
    name: 'Accounting and law firms',
    audience: 'accounting, law and professional services firms',
    h1: 'Artificial intelligence for accounting and law firms',
    intro:
      'In professional services, time is the product. Yet much of it goes into chasing documents, typing them in, tracking deadlines and answering “how is my case going?”. AI takes over that operational layer so the team spends its hours on the work clients actually pay for.',
    pains: [
      'Chasing clients by email to send their documents',
      'Invoices, receipts, contracts and filings reviewed and typed in by hand',
      'Deadlines tracked in spreadsheets or personal calendars',
      'Clients asking about the status of their filing or case',
    ],
    useCases: [
      { title: 'Document reading and classification', text: 'AI extracts data from invoices, receipts, contracts and rulings, classifies them and leaves them ready for review.' },
      { title: 'Automatic document collection', text: 'Reminders to each client with the exact list of what’s missing, and a portal or WhatsApp to send it.' },
      { title: 'Deadline control', text: 'Alerts for tax, employment or court deadlines for each client, without relying on anyone’s memory.' },
      { title: 'Case status without calls', text: 'Automatic answers about each case’s progress, using the information the team already records.' },
      { title: 'Drafts and summaries', text: 'First drafts of reports, letters or summaries of long documents, always reviewed by a professional.' },
    ],
    care:
      'Client information is confidential: the solution must define where documents are processed, who has access and which providers are used. Everything the AI produces is reviewed by a professional before it goes out.',
    faqs: [
      { q: 'Is it safe to process client documents with AI?', a: 'Yes, if it’s designed properly: providers that don’t train models on your data, role-based access, access logs and controlled storage. That’s defined from the diagnosis onwards.' },
      { q: 'Does it integrate with my accounting or practice software?', a: 'Generally yes, through an API, exports or available integrations. We assess it case by case.' },
      { q: 'Does AI replace professional judgement?', a: 'No. It speeds up the operational side and prepares drafts; review and decisions stay with the professional.' },
    ],
  },
  educacion: {
    name: 'Education',
    audience: 'schools, institutes, academies and training centres',
    h1: 'Artificial intelligence for schools, institutes and academies',
    intro:
      'In education, admin teams get swamped at the same times every year: admissions, enrolment, the start of term, fee collection. AI answers the repeated questions, puts processes in order and frees the team for what needs a human touch.',
    pains: [
      'During admissions and enrolment, enquiries exceed what the team can handle',
      'The same questions from parents or students by email, phone and WhatsApp',
      'Fee collection and payment reminders done by hand',
      'Student information spread across spreadsheets and different systems',
    ],
    useCases: [
      { title: 'Admissions that answer themselves', text: 'An agent that explains programmes, requirements, fees and dates, and books interviews or visits.' },
      { title: 'Support for parents and students', text: 'Answers to frequent questions with the institution’s official information, at any hour.' },
      { title: 'Friendly, automatic collections', text: 'Payment reminders and instalment follow-up, with hand-off to a person for special cases.' },
      { title: 'Organised communications', text: 'Announcements segmented by class, level or programme, without copying and pasting lists.' },
      { title: 'Reports for leadership', text: 'Enrolment, retention and payments in an up-to-date dashboard, without building reports by hand.' },
    ],
    care:
      'Student data, especially for minors, needs extra care: restricted access, parental consent where appropriate and compliance with data-protection law.',
    faqs: [
      { q: 'Is it useful for small academies or online courses?', a: 'Yes. For small teams, automating enquiries, sign-ups and payments frees a lot of time from the first month.' },
      { q: 'Does it integrate with our learning platform?', a: 'It depends on the platform and whether it offers an API or exports. We review it in the diagnosis and, if it isn’t possible, propose alternatives.' },
      { q: 'How is student data protected?', a: 'With role-based access, compliant providers and clear rules about which data each automation uses.' },
    ],
  },
};
