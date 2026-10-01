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
    h1: 'Artificial intelligence for retail and e‑commerce',
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
  mineria: {
    name: 'Mining',
    audience: 'mining companies and mining suppliers',
    h1: 'Artificial intelligence and software for mining',
    intro:
      'In mining, every hour of equipment downtime is expensive, and information is spread across sensors, shift spreadsheets and technical manuals. AI and custom software help anticipate failures, organise operational data and put technical knowledge within reach of the people on site, always as support for safety protocols.',
    pains: [
      'Equipment failures are detected after they happen',
      'Shift, production and safety reports are put together by hand',
      'Manuals and procedures are hard to look up on site',
      'Sensor, maintenance and production data live in separate systems',
    ],
    useCases: [
      { title: 'Predictive maintenance', text: 'Models that analyse sensor data and maintenance history to anticipate failures and schedule work.' },
      { title: 'Automatic shift reports', text: 'Production, stoppages and safety indicators consolidated at the end of each shift, with no typing.' },
      { title: 'Procedures assistant', text: 'Natural-language search of technical manuals and procedures, with a reference to the official document.' },
      { title: 'Operations dashboard', text: 'Equipment, production and maintenance indicators in one place, for on-site or remote operations.' },
      { title: 'Contractor document control', text: 'Automatic reading and tracking of certificates, accreditations and expiry dates for suppliers and workers.' },
    ],
    care:
      'People’s safety comes first: AI supports decisions, it doesn’t replace protocols. Many sites have limited connectivity, so solutions must work with intermittent connections.',
    faqs: [
      { q: 'Is it useful for mining suppliers, not just the mine?', a: 'Yes. Maintenance, transport, service and contractor companies usually have a lot of admin and document work that can be automated.' },
      { q: 'Does it work without a permanent connection?', a: 'It can be designed to work with intermittent connectivity, storing data locally and syncing when there’s signal.' },
      { q: 'Do we need new sensors for predictive maintenance?', a: 'Not always. You can often start with the data equipment already produces and the maintenance history; the diagnosis assesses what’s available.' },
    ],
  },
  seguros: {
    name: 'Insurance',
    audience: 'insurers, brokers and claims adjusters',
    h1: 'Artificial intelligence for insurers and brokers',
    intro:
      'In insurance, much of the work is repetitive paperwork: quoting, requesting documents, reviewing claims, remembering renewals. AI can take over that load so the team spends its time advising clients and resolving complex cases.',
    pains: [
      'Quotes take long because data has to be requested and checked by hand',
      'Claim documents reviewed one by one',
      'Clients asking about the status of their claim or policy',
      'Renewals lost for lack of follow-up',
    ],
    useCases: [
      { title: 'Guided quoting', text: 'An agent that collects the required data, validates it and leaves the quote ready for review.' },
      { title: 'Claim document reading', text: 'Data extracted from claim forms, invoices, reports and photos, with alerts when something is missing or inconsistent.' },
      { title: 'Claim status without calls', text: 'Automatic answers about each case’s progress, using the information the team already records.' },
      { title: 'Renewals that never slip', text: 'Automatic reminders and follow-up before each policy expires.' },
      { title: 'Assistant for account managers', text: 'Quick lookup of each product’s terms, coverage and exclusions, with a reference to the document.' },
    ],
    care:
      'It’s a regulated sector (in Chile, supervised by the CMF). Client and claim information is sensitive: traceability, access control and human review of decisions are requirements, not options.',
    faqs: [
      { q: 'Can AI approve or reject a claim?', a: 'It shouldn’t decide on its own. It’s used to organise, validate and summarise information; a person makes the decision.' },
      { q: 'Is it useful for small brokers?', a: 'Yes. For small brokers, automating quotes, renewals and enquiries frees a lot of the sales team’s time.' },
      { q: 'Does it integrate with our policy system?', a: 'It depends on the system and whether it offers an API or exports. We review it in the diagnosis.' },
    ],
  },
  'banca-y-finanzas': {
    name: 'Banking and finance',
    audience: 'banks, lenders, credit unions and fintechs',
    h1: 'Artificial intelligence and software for financial services',
    intro:
      'In financial services, response speed competes with the demand for control. Assessing a loan, onboarding a customer or answering a question means reviewing a lot of information. AI speeds up that review and custom software keeps it traceable, without losing the control regulators require.',
    pains: [
      'Slow credit assessments and onboarding due to manual document review',
      'Repeated questions about products, requirements and application status',
      'Customer information spread across different systems',
      'Management reports put together by hand',
    ],
    useCases: [
      { title: 'Automatic document review', text: 'Reading and validating payslips, IDs, financial statements and certificates in onboarding and credit processes.' },
      { title: '24/7 support', text: 'An agent that answers questions about products, requirements and application status with official information, and hands sensitive matters to a person.' },
      { title: 'Unusual-pattern alerts', text: 'Detection of out-of-pattern transactions or behaviour to support fraud prevention.' },
      { title: 'Management dashboard', text: 'Lending, arrears and portfolio in a dashboard that updates itself from existing systems.' },
      { title: 'Organised collections', text: 'Payment reminders and follow-up by channel and stage, with hand-off to an account manager when needed.' },
    ],
    care:
      'It’s a regulated sector (in Chile, supervised by the CMF, with initiatives such as the Fintech Law). Traceability, access control, information security and human oversight of automated decisions are requirements from the design stage.',
    faqs: [
      { q: 'Can AI decide whether a loan is approved?', a: 'It can support with analysis and alerts, but the decision and its justification must remain with a person and the institution’s risk model.' },
      { q: 'Is it useful for credit unions or small lenders?', a: 'Yes. For small teams, automating documents and customer service has a fast impact.' },
      { q: 'Where is the data processed?', a: 'That’s defined in the design: compliant providers, encryption and role-based access. The diagnosis reviews each institution’s requirements.' },
    ],
  },
  'alimentacion-y-restaurantes': {
    name: 'Food and restaurants',
    audience: 'restaurants, food chains and food companies',
    h1: 'Artificial intelligence for restaurants and food companies',
    intro:
      'In food, margins are tight and everything moves fast: bookings, orders, stock about to expire, suppliers to call. AI and automation put that operation in order so the team can focus on cooking and serving.',
    pains: [
      'Bookings and orders arriving by phone, WhatsApp and social media at once',
      'Waste from products expiring before anyone notices',
      'Supplier orders made from memory or in spreadsheets',
      'Sales and costs per location reviewed at month end',
    ],
    useCases: [
      { title: 'Bookings and orders on WhatsApp', text: 'An agent that takes bookings and orders, confirms availability and sends the summary to the kitchen or location.' },
      { title: 'Stock and waste control', text: 'Alerts for low stock and products close to expiry, based on recorded sales and purchases.' },
      { title: 'Supplier orders', text: 'Purchase suggestions based on sales and stock, ready to approve and send.' },
      { title: 'Dashboard per location', text: 'Sales, costs and best-sellers per location, updated every day.' },
      { title: 'Loyalty', text: 'Segmented messages and promotions for regular customers, respecting their consent.' },
    ],
    care:
      'Allergen, ingredient and price information must always be up to date: the agent answers only with official data and hands any allergy or health question to a person.',
    faqs: [
      { q: 'Does it integrate with my POS or delivery platform?', a: 'Many POS systems and platforms support integrations or exports. We review it case by case in the diagnosis.' },
      { q: 'Is it useful for a single restaurant?', a: 'Yes. For an independent restaurant, automating bookings, orders and purchasing frees time from the first month.' },
      { q: 'Can the agent answer questions about allergens?', a: 'It can share what’s on each dish’s official sheet, but for any health concern it must hand off to a staff member.' },
    ],
  },
  'turismo-y-hoteleria': {
    name: 'Tourism and hospitality',
    audience: 'hotels, travel agencies and tour operators',
    h1: 'Artificial intelligence for hotels and tourism',
    intro:
      'In tourism, guests ask at any hour and in different languages, and a slow reply is a booking that goes elsewhere. AI answers, informs and books around the clock, and custom software connects bookings, payments and operations.',
    pains: [
      'Enquiries in several languages arriving at night or at weekends',
      'The same questions every time: availability, prices, transfers, schedules',
      'Guest communication before and after the stay done by hand',
      'Booking information spread across channels and spreadsheets',
    ],
    useCases: [
      { title: '24/7 multilingual support', text: 'An agent that answers in Spanish, English and Portuguese with the hotel’s or operator’s official information.' },
      { title: 'Direct bookings', text: 'Availability checks and bookings from WhatsApp or the website, connected to the booking system.' },
      { title: 'Guest communication', text: 'Automatic messages before arrival, during the stay and afterwards, with a satisfaction survey.' },
      { title: 'Occupancy dashboard', text: 'Occupancy, rates and sales channels in an up-to-date dashboard.' },
      { title: 'Itineraries and documents', text: 'Confirmations, vouchers and itineraries generated automatically for each guest.' },
    ],
    care:
      'Guests’ passport and payment data is sensitive: the solution must define what is stored, where and for how long, and the agent must answer only with current prices and terms.',
    faqs: [
      { q: 'Does it integrate with my booking system or channel manager?', a: 'Most systems support integrations. We review the one you use and what it offers in the diagnosis.' },
      { q: 'Does it answer in other languages?', a: 'Yes. The agent can serve guests in several languages with the same official information.' },
      { q: 'Is it useful for a boutique hotel or small agency?', a: 'Yes. That’s where it shows most, because you can answer after hours without adding staff.' },
    ],
  },
  manufactura: {
    name: 'Manufacturing',
    audience: 'factories, production plants and industry',
    h1: 'Artificial intelligence and software for manufacturing',
    intro:
      'In a production plant, problems cost time and material: an unplanned stoppage, a defective batch, a supply that ran out. AI and custom software help you see production in real time and catch problems before they escalate.',
    pains: [
      'Production and stoppages recorded on paper or spreadsheets',
      'Manual quality control that’s hard to trace',
      'Supply stock-outs that stop the line',
      'Plant reports reaching management late',
    ],
    useCases: [
      { title: 'Digital production records', text: 'Simple capture of output, stoppages and causes from a tablet or phone, with automatic reports.' },
      { title: 'Vision-based quality control', text: 'Product checks with cameras and AI to detect defects and record each batch.' },
      { title: 'Scheduled maintenance', text: 'Alerts by hours of use or dates, with history per machine.' },
      { title: 'Supplies inventory', text: 'Stock alerts and purchase suggestions based on the production plan.' },
      { title: 'Plant dashboard', text: 'Efficiency, stoppages and output per line in real time.' },
    ],
    care:
      'AI supports the plant team; it doesn’t replace established safety or quality controls. It’s best to start with a pilot line or process before scaling.',
    faqs: [
      { q: 'Do we need to replace our machines?', a: 'No. You usually start by recording what already happens better and connecting the data that’s available.' },
      { q: 'Is it useful for a small plant?', a: 'Yes. Digitising production and quality records has an impact from day one, whatever the size.' },
      { q: 'Does it integrate with our ERP?', a: 'Generally yes, through an API or exports. We assess it in the diagnosis.' },
    ],
  },
  agro: {
    name: 'Agriculture',
    audience: 'farms, exporters and agribusiness',
    h1: 'Artificial intelligence and software for agriculture',
    intro:
      'In agriculture, information starts in the field and often stays in a notebook: tasks, applications, harvest, seasonal staff. Custom software and AI bring it into an organised system that helps you decide, comply and export.',
    pains: [
      'Field tasks and applications recorded on paper',
      'Export traceability put together by hand before each shipment',
      'Seasonal staff and harvest tracked in spreadsheets',
      'Field, warehouse and sales information that never meets',
    ],
    useCases: [
      { title: 'Field task records', text: 'A simple app to log tasks, applications and harvest, even without signal, that syncs when back online.' },
      { title: 'Traceability by lot', text: 'Complete history of each lot, from field to shipment, ready for audits and export requirements.' },
      { title: 'Staff and harvest control', text: 'Attendance, yield and payments per season.' },
      { title: 'Document reading', text: 'Automatic data extraction from delivery notes, invoices and certificates.' },
      { title: 'Dashboard per field', text: 'Task progress, harvest and costs per field or block.' },
    ],
    care:
      'Many fields have poor connectivity: solutions must work offline. Seasonal staff data must be handled according to data-protection law.',
    faqs: [
      { q: 'Does it work without signal in the field?', a: 'Yes, it’s designed to record offline and sync when there’s signal.' },
      { q: 'Is it useful for mid-sized growers?', a: 'Yes. Organising task records and traceability has an impact at any size.' },
      { q: 'Can it connect to the accounting system?', a: 'Generally yes, through exports or an API. We review it in the diagnosis.' },
    ],
  },
  construccion: {
    name: 'Construction',
    audience: 'construction companies, contractors and engineering firms',
    h1: 'Artificial intelligence and software for construction',
    intro:
      'Every construction project generates a mountain of information: progress, photos, subcontracts, purchases, worker documents. When it lives in spreadsheets and chats, deviations are found late. Custom software and AI organise that information per project and raise alerts in time.',
    pains: [
      'Site progress reported through chats, loose photos and spreadsheets',
      'Subcontract and worker documents that are hard to control',
      'Purchasing and warehouse with no visibility per project',
      'Schedule and cost deviations detected late',
    ],
    useCases: [
      { title: 'Digital site progress', text: 'Progress logged with photos and location from a phone, with automatic reports per project.' },
      { title: 'Document control', text: 'Automatic reading and tracking of subcontractor and worker documents, with expiry alerts.' },
      { title: 'Purchasing and warehouse', text: 'Requests, purchase orders and stock per project in a single system.' },
      { title: 'Dashboard per project', text: 'Schedule, cost and progress of each project compared with the plan.' },
      { title: 'Specifications assistant', text: 'Natural-language search of technical specifications and tender documents, with a reference to the source.' },
    ],
    care:
      'Site safety isn’t delegated to a tool: AI supports document control and management, but protocols and decisions stay with the people responsible.',
    faqs: [
      { q: 'Is it useful for a mid-sized construction company?', a: 'Yes. Progress and document control per project has a quick impact for companies of any size.' },
      { q: 'Does it work on sites with poor signal?', a: 'It can be designed to record offline and sync later.' },
      { q: 'Does it integrate with our management system?', a: 'It depends on the system; we review it in the diagnosis and, if it isn’t possible, propose alternatives.' },
    ],
  },
};
