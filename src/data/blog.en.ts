import type { Post } from './blog';

/** English copy of the blog posts, keyed by slug. SEO (titles, JSON-LD) keeps using the Spanish. */
export type PostCopy = Pick<Post, 'title' | 'description' | 'tags' | 'body'>;

export const postsEn: Record<string, PostCopy> = {
  'soberania-tecnologica-boveda-digital-codigo-propio': {
    title: 'Technological sovereignty: why your company must own its code and how to prevent digital lock-in',
    description:
      'Learn how agencies lock businesses in by withholding credentials and repositories, and how to guarantee full technology ownership with a Digital Vault.',
    tags: ['Tech Sovereignty', 'Cloud Security', 'Digital Vault'],
    body: [
      {
        type: 'p',
        text: 'The biggest hidden risk when hiring software development is not a bug or a delayed deadline; it is technological lock-in. Hundreds of businesses discover too late that their agency retained server passwords, database credentials, or the GitHub repository, charging exorbitant fees for minor changes or preventing migrations.',
      },
      { type: 'h2', text: 'The three classic forms of agency lock-in' },
      {
        type: 'ul',
        items: [
          'Third-party registered accounts: The agency registers AWS, GCP, or domains under their own name. If the business relationship ends, the client loses control of their infrastructure.',
          'Withheld source code: Only the compiled app or deployed site is delivered on a private server, without access to the GitHub/GitLab repository and change history.',
          'Scattered API keys and credentials: Payment gateways, transactional mail, and Meta accounts remain tied to developers’ personal inboxes.',
        ],
      },
      { type: 'h2', text: 'What true Technological Sovereignty means' },
      {
        type: 'p',
        text: 'Technological sovereignty means everything built legally and technically belongs to your company from day one. If you decide to switch teams or hire internal engineers, the handover takes 15 minutes, not a legal dispute.',
      },
      {
        type: 'ul',
        items: [
          'Repository hosted in your own GitHub/GitLab organisation with full architecture documentation.',
          'Cloud infrastructure (AWS, Google Cloud, or dedicated nodes) billed directly to your company tax ID.',
          'Domains and SSL certificates registered in your name, without middlemen.',
          'Zero dependency on closed per-user or per-transaction recurring software licenses.',
        ],
      },
      { type: 'h2', text: 'The Digital Vault concept ($0 bonified)' },
      {
        type: 'p',
        text: 'At Uni-Verso693, we deploy the Client Digital Vault: an encrypted, secure portal where every client retains 24/7 access to database credentials, repositories, cloud consoles, DNS records, and API tokens. It is an anti-lock-in guarantee included at $0 in all our projects.',
      },
      {
        type: 'cta',
        text: 'Protect your company’s digital assets. Talk with our architects to plan your project with full sovereign custody in your Digital Vault.',
      },
    ],
  },
  'campus-virtual-lms-sence-sin-licencias-por-alumno': {
    title: 'Virtual Campuses & Training LMS: build your own platform with zero per-student licensing fees',
    description:
      'A practical guide for training academies, corporate learning, and SENCE compliance: biometrics, QR certificates, and advantages of proprietary LMS over SaaS.',
    tags: ['Virtual Campus', 'LMS & E-learning', 'Compliance'],
    body: [
      {
        type: 'p',
        text: 'Traditional e-learning software hides a mathematical trap: the more students you teach, the more you pay your SaaS provider. For training academies and corporate institutions, paying $2 to $5 USD monthly per active user devours operational margins as enrollment grows.',
      },
      { type: 'h2', text: 'Closed SaaS vs. Proprietary Virtual Campus' },
      {
        type: 'p',
        text: 'Standard SaaS platforms do not just charge per seat; they also force generic UIs, complicate regulatory audit reporting, and offer zero flexibility for customized assessments.',
      },
      {
        type: 'ul',
        items: [
          'Zero per-student fee: Your cloud server handles 50 or 5,000 students without increasing software licensing costs.',
          'Installable Mobile PWA: Students access courses directly on Android and iOS with low data consumption and offline-first capabilities.',
          'Proprietary database: Full custody of academic records, grading, and student personal data under strict privacy standards.',
        ],
      },
      { type: 'h2', text: 'Key technical requirements for official training compliance' },
      {
        type: 'p',
        text: 'To certify remote courses with tax incentives or official training bodies, the platform must comply with strict traceability standards:',
      },
      {
        type: 'ul',
        items: [
          'Digital class ledger: Exact logs of connection time, module completion, and assessment attempts.',
          'Identity verification: Integration with facial biometrics or official state single sign-on authentication.',
          'QR-verified certificates and diplomas: Every certificate includes a unique cryptographic QR code allowing instant validation by employers and auditors.',
          'B2B management for corporate clients: Dedicated dashboards where enterprise clients upload employee cohorts and track learning curves in real time.',
        ],
      },
      { type: 'h2', text: 'Modern architecture and high concurrency' },
      {
        type: 'p',
        text: 'Gone are the days of sluggish Moodle servers crashing when 50 students submit exams simultaneously. A modern stack based on React, Node.js, and optimized database queries ensures sub-800ms load times and massive concurrency at minimal server costs.',
      },
      {
        type: 'cta',
        text: 'Looking to launch a high-performance training campus without per-user licensing? Let’s design your sovereign LMS platform.',
      },
    ],
  },
  'pasarelas-de-pago-chile-transbank-flow-mercadopago-stripe': {
    title: 'Payment gateways in Chile: Transbank Webpay, Flow, Mercado Pago or Stripe, which should you choose?',
    description:
      'Technical and business comparison of Chilean payment methods: fees, settlements, webhooks, and preventing checkout drop-offs.',
    tags: ['Payment Gateways', 'E-commerce', 'Fintech Chile'],
    body: [
      {
        type: 'p',
        text: 'Choosing the right payment gateway is a vital decision for any e-commerce or SaaS platform operating in Chile. A bad choice results in high checkout abandonment, steep transaction fees, or payment processing downtime during high-traffic CyberDays.',
      },
      { type: 'h2', text: 'Direct acquirers vs. payment aggregators' },
      {
        type: 'p',
        text: 'The main division in Chile is between contracting directly with banking acquirers (like Transbank Webpay Plus) or utilizing modern payment aggregators (like Flow, Mercado Pago, or Stripe).',
      },
      {
        type: 'ul',
        items: [
          'Transbank Webpay Plus: Lowest transaction commissions and direct bank settlement (next business day for debit). Requires formal merchant affiliation and technical certification.',
          'Flow: Outstanding local support, quick activation, and multiple combined payment options (Webpay, Servipag, Mach, bank transfers). Perfect for rapid launch without banking bureaucracy.',
          'Mercado Pago: Huge penetration for users paying with account balance or installments. Slightly higher fees, but immediate onboarding and robust anti-fraud engines.',
          'Stripe: Global benchmark for international SaaS subscriptions in USD, though with higher currency conversion fees for local payments.',
        ],
      },
      { type: 'h2', text: 'Secure Webhooks and automated reconciliation' },
      {
        type: 'p',
        text: 'The most frequent mistake in payment integration is relying on the customer returning to the browser success screen. If the buyer closes the tab, the sale stays as pending despite funds being captured.',
      },
      {
        type: 'ul',
        items: [
          'Asynchronous server webhooks: The gateway server notifies your backend with cryptographic signatures, confirming sales with 100% reliability.',
          'Idempotency keys: Guarantees that duplicate network retries do not charge customers twice or create duplicate invoices.',
          'Automated electronic invoicing: Instant connection with tax authorities (SII DTE) to issue receipts and invoices in real time.',
        ],
      },
      {
        type: 'cta',
        text: 'Integrate debit, credit, and bank transfers into your platform with automated reconciliation and high security. Contact us for a quote.',
      },
    ],
  },
  'seo-tecnico-plataformas-web-react-posicionamiento': {
    title: 'Technical SEO for web applications: how to rank custom software on Google',
    description:
      'Why React applications can be invisible to search engines and how static site generation (SSG) and Core Web Vitals guarantee qualified organic traffic.',
    tags: ['Technical SEO', 'React & Web', 'Performance'],
    body: [
      {
        type: 'p',
        text: 'Many founders and marketing executives invest heavily in developing modern React platforms, only to discover months later that Google is not indexing their site, even when searching for their exact brand name. The issue is not the copy or keywords; it is an architectural flaw known as Single Page Application (SPA) invisibility.',
      },
      { type: 'h2', text: 'The Client-Side Rendering hurdle with search crawlers' },
      {
        type: 'p',
        text: 'In standard client-side React apps, the server sends an empty HTML skeleton and the user’s browser downloads JavaScript to render views. While modern crawlers can execute JavaScript, they defer this into a slow secondary queue, often timing out before indexing critical content.',
      },
      { type: 'h2', text: 'Static Site Generation (SSG) and Server-Side Rendering (SSR)' },
      {
        type: 'p',
        text: 'The architecture we implement at Uni-Verso693 prerenders every route during build time. When Googlebot visits, it receives pure, instantaneous HTML with full semantic copy, links, titles, and schema metadata.',
      },
      { type: 'h2', text: 'Core Web Vitals: speed as a direct ranking factor' },
      {
        type: 'ul',
        items: [
          'Largest Contentful Paint (LCP): Primary viewport content must render in under 1.2 seconds for top ranking tier.',
          'Cumulative Layout Shift (CLS): Zero layout jank or shifting elements while assets load.',
          'Interaction to Next Paint (INP): Instant response to user taps and navigation.',
        ],
      },
      { type: 'h2', text: 'Structured JSON-LD Data: speaking directly to AI search' },
      {
        type: 'p',
        text: 'Search engines now interpret semantic entities rather than just parsing raw keywords. Implementing structured JSON-LD schemas enables rich search snippets, FAQs, breadcrumbs, and inclusion in AI Search overviews.',
      },
      {
        type: 'cta',
        text: 'Is your web platform lacking organic search visibility? We audit and optimize web applications for technical SEO and high performance.',
      },
    ],
  },
  'agentes-ia-cognitivos-rag-empresas': {
    title: 'Cognitive AI agents with RAG architecture: intelligence without hallucinations',
    description:
      'Technical and commercial guide on Retrieval-Augmented Generation (RAG): document accuracy, source citations, and deployment across WhatsApp and CRM.',
    tags: ['Artificial Intelligence', 'Vector RAG', 'Automation'],
    body: [
      {
        type: 'p',
        text: 'The primary reason companies hesitate to deploy AI in customer support or internal workflows is hallucination: the risk of a language model inventing prices, promising unavailable terms, or delivering outdated data with supreme confidence.',
      },
      { type: 'h2', text: 'What is RAG architecture and why does it solve hallucinations?' },
      {
        type: 'p',
        text: 'RAG stands for Retrieval-Augmented Generation. Instead of asking a foundation model to guess from general training weights, the system executes two strict stages:',
      },
      {
        type: 'ul',
        items: [
          'Step 1: Semantic Retrieval: When a query arrives, the engine queries your vector database to find the exact paragraphs from your manuals, specs, or policies containing the factual answer.',
          'Step 2: Grounded Generation: The LLM receives the question together with those official snippets and a strict rule: “Answer exclusively using the attached text. If not present, state you do not have that information and hand off to a human.”',
        ],
      },
      { type: 'h2', text: 'From scattered PDFs to an active corporate knowledge base' },
      {
        type: 'p',
        text: 'Deploying enterprise RAG goes far beyond uploading a PDF. It requires semantic chunking with overlapping boundaries, high-dimensional vector embeddings, and indexing in specialized vector stores like PostgreSQL with pgvector or Redis.',
      },
      { type: 'h2', text: 'Deployment on official WhatsApp and business tools' },
      {
        type: 'p',
        text: 'A true cognitive agent does not sit inside an isolated playground. It operates where your users are: connected to official WhatsApp Business API, scheduling meetings on calendars, querying real-time inventory in your ERP, and logging qualified leads directly into your CRM.',
      },
      {
        type: 'cta',
        text: 'Ready to deploy an autonomous AI agent trained on your company’s real knowledge? Contact our team to launch a functional pilot in 7 days.',
      },
    ],
  },
  'chatbot-whatsapp-empresas-chile': {
    title: 'WhatsApp chatbots for businesses in Chile: what you need, how long it takes and what drives the cost',
    description:
      'A practical guide to deploying an AI agent on WhatsApp: Meta requirements, realistic timelines, what makes it reliable and the factors behind the cost.',
    tags: ['WhatsApp', 'AI agents', 'Customer service'],
    body: [
      {
        type: 'p',
        text: 'In Chile, WhatsApp is where your customers already are. That’s why more and more companies want an agent that answers questions, qualifies leads and books appointments at any hour. The good news is that it can now be done well and quickly. The bad news is that there are plenty of “bots” that answer anything and end up driving customers away. This guide explains what you need to do it properly.',
      },
      { type: 'h2', text: 'Rule-based chatbot vs. AI agent' },
      {
        type: 'p',
        text: 'A traditional chatbot runs on menus and fixed replies: “type 1 for sales, 2 for support”. It works for very simple cases, but breaks as soon as the customer writes something different. An AI agent understands natural language, answers with your company’s information and can take actions, such as logging a lead in your CRM or booking a slot in your calendar.',
      },
      {
        type: 'p',
        text: 'The key is that the agent only answers with verified information. That’s achieved with your own knowledge base (what the industry calls RAG): the agent checks your documents, prices and policies before answering, and if it can’t find the answer, it hands the conversation to a person instead of making something up.',
      },
      { type: 'h2', text: 'What you need for an AI-powered WhatsApp' },
      {
        type: 'ul',
        items: [
          'A verified Meta Business account with your company details.',
          'A phone number dedicated to the WhatsApp Business API. It can’t be in use at the same time in the regular WhatsApp app.',
          'Message templates approved by Meta, required when your company writes first (for example, an appointment reminder).',
          'The information the agent will use to answer: FAQs, catalogue, prices, opening hours and policies.',
          'An integration with your tools: CRM, spreadsheet, calendar or booking system.',
        ],
      },
      {
        type: 'p',
        text: 'When the customer starts the conversation, a 24-hour window opens in which the agent can reply freely. Outside that window, only approved templates can be sent. Designing this flow well avoids blocks and unnecessary charges.',
      },
      { type: 'h2', text: 'How long does it take?' },
      {
        type: 'p',
        text: 'An initial agent, with a focused knowledge base and one or two integrations, can be running in about 7 days. The real timeline depends mostly on two non-technical things: how quickly Meta verifies your business and how organised the information the agent needs to learn is. Projects with several channels, deep integrations or complex flows are planned in stages.',
      },
      { type: 'h2', text: 'What drives the cost' },
      {
        type: 'p',
        text: 'There’s no single price, because two companies can need very different agents. These are the factors that really move the cost:',
      },
      {
        type: 'ul',
        items: [
          'Meta fees: WhatsApp charges for messages or conversations by category (marketing, utility, authentication or service) and country. Check the current rates on Meta’s site.',
          'Conversation volume: more messages mean more use of the AI model and the API.',
          'Integrations: connecting a CRM, an ERP or a payment system takes more work than using a spreadsheet.',
          'Size and order of the knowledge base: scattered documents need more preparation.',
          'Maintenance: tuning answers, metrics and continuous improvement after launch.',
        ],
      },
      { type: 'h2', text: 'How to tell whether an agent is reliable' },
      {
        type: 'ul',
        items: [
          'It only answers with your information and admits when it doesn’t know something.',
          'It hands the conversation to a person smoothly when appropriate.',
          'It has metrics: how many questions it resolves, how many it hands off and where it fails.',
          'It protects your customers’ personal data and complies with current regulations.',
        ],
      },
      {
        type: 'cta',
        text: 'If you want to know exactly what to automate first and what return to expect, the EBS 693 diagnosis gives you a roadmap with ROI in a 45-minute session.',
      },
    ],
  },
  'software-a-medida-vs-suscripcion': {
    title: 'Custom software vs. subscription software: when each one makes sense',
    description:
      'How to decide between a SaaS subscription and building custom software: long-term costs, control, integrations and a middle-ground option.',
    tags: ['Custom software', 'SaaS', 'Strategy'],
    body: [
      {
        type: 'p',
        text: 'Every growing company reaches the same question: do we keep paying for subscription tools or build our own system? There’s no universal answer. It depends on how particular your operation is, how much it costs you to adapt to the tool and where you want to go.',
      },
      { type: 'h2', text: 'When subscription software (SaaS) makes sense' },
      {
        type: 'ul',
        items: [
          'Your process is standard: accounting, email, generic project management.',
          'You need to start today and have no time for a build.',
          'The monthly cost is low compared with what it saves you.',
          'You don’t need to integrate it deeply with other systems.',
        ],
      },
      { type: 'h2', text: 'When building custom makes sense' },
      {
        type: 'ul',
        items: [
          'The way you operate is part of your competitive advantage and no tool reflects it well.',
          'You pay for several subscriptions that don’t talk to each other and the team loses hours moving data by hand.',
          'Per-user licences grow faster than your team and the annual cost is already high.',
          'You need control over your data, security or integrations.',
          'You want to offer the system to your own customers as a product.',
        ],
      },
      { type: 'h2', text: 'The hidden cost' },
      {
        type: 'p',
        text: 'When comparing, many companies only look at the subscription price against the development budget. What’s missing is the time the team spends adapting to the tool, the errors from copying data between systems and the opportunities lost because the tool can’t do something. In particular operations, that hidden cost is often higher than the subscription.',
      },
      { type: 'h2', text: 'The middle ground' },
      {
        type: 'p',
        text: 'You don’t always have to choose. A common strategy is to keep the standard tools that work well and build only the missing piece: an integration between systems, a dashboard that brings the key data together or an AI agent that automates a repetitive task. That way you invest where there’s real return.',
      },
      { type: 'h2', text: 'Questions to help decide' },
      {
        type: 'ul',
        items: [
          'Which processes do we do by hand because the current tool doesn’t handle them?',
          'How much do we pay per year in licences, and how will that grow with the team?',
          'What would happen if the vendor raised prices or shut down?',
          'Which data do we need to control ourselves?',
          'Does this set us apart from competitors, or is it a generic task?',
        ],
      },
      {
        type: 'p',
        text: 'If you build, make sure the code, documentation and infrastructure are in your company’s name. Custom software should be your asset, not a dependency on a vendor.',
      },
      {
        type: 'cta',
        text: 'If you’re not sure what fits your case, the EBS 693 diagnosis reviews your operation and gives you a recommendation with costs and estimated return.',
      },
    ],
  },
  'inteligencia-artificial-en-tu-empresa-casos-practicos': {
    title: 'How to use AI in your company without losing control: 5 practical cases',
    description: 'Five concrete uses of AI in business and the rules that keep it helpful without creating risk or losing control.',
    tags: ['Artificial intelligence', 'Automation', 'Use cases'],
    body: [
      {
        type: 'p',
        text: 'AI is no longer an experiment. It can now be built into concrete processes and its impact measured. The most common mistake isn’t technical: it’s deploying it with no goal, no reliable data and no person responsible for reviewing what it does. These five cases show where it adds real value.',
      },
      { type: 'h2', text: '1. 24/7 customer service' },
      {
        type: 'p',
        text: 'An AI agent on WhatsApp or your website answers frequent questions at any hour, with your company’s information, and hands the cases that need it to a person. The team stops answering the same thing a hundred times and focuses on cases that need human judgement.',
      },
      { type: 'h2', text: '2. Assistants inside your product' },
      {
        type: 'p',
        text: 'An assistant built into your own platform or app can use each user’s data to answer in context: a customer’s history, an order’s status or a patient’s record. Unlike a generic chatbot, it knows who it’s talking to and hands off to a person when the question calls for it.',
      },
      { type: 'h2', text: '3. Assisted writing' },
      {
        type: 'p',
        text: 'AI can prepare a first draft from data or notes: sales proposals, reports, customer replies or product descriptions. The person reviews it and keeps control of the final text; AI saves the drafting time and the blank-page block.',
      },
      { type: 'h2', text: '4. Automating repetitive tasks' },
      {
        type: 'p',
        text: 'Extracting data from documents, sorting emails, generating reports or moving information between systems are tasks where AI combined with automation (for example with n8n or Make) frees hours every week. Here the return is easy to measure: hours saved and errors avoided.',
      },
      { type: 'h2', text: '5. Recommendations and sales' },
      {
        type: 'p',
        text: 'An AI sales assistant can answer questions about prices and plans using the real catalogue, and recommend products or services based on what the customer needs. When the question gets complex, it offers a hand-off to a sales rep on WhatsApp.',
      },
      { type: 'h2', text: 'Rules to stay in control' },
      {
        type: 'ul',
        items: [
          'Set a measurable goal before deploying: hours saved, response time, sales.',
          'AI must answer with your company’s verified information and admit when it doesn’t know.',
          'There must always be a way to reach a person.',
          'Protect personal data: what’s stored, where and for how long.',
          'Review metrics and conversations regularly to fix errors.',
        ],
      },
      {
        type: 'cta',
        text: 'If you want to find which process in your company has the most potential for AI, book the EBS 693 diagnosis: 45 minutes and a roadmap with estimated ROI.',
      },
    ],
  },
  'inteligencia-artificial-por-industria-chile': {
    title: 'AI and software by industry in Chile: finance, mining, retail and more',
    description: 'AI and custom software use cases by sector in Chile: banking and finance, mining, retail, healthcare, real estate, logistics and education.',
    tags: ['Industries', 'Artificial intelligence', 'Chile'],
    body: [
      {
        type: 'p',
        text: 'Every industry has its own bottlenecks, regulations and opportunities. An AI solution that works very well in retail can be unacceptable in a bank if it doesn’t meet security requirements. This guide summarises where AI and custom software add the most value in Chile’s main sectors, and what to watch out for in each.',
      },
      {
        type: 'p',
        text: 'A cross-cutting point: Law 21,719 modernises personal data protection in Chile and raises the bar on how companies handle people’s information. Any project involving customer data should be designed with that regulation in mind from the start.',
      },
      { type: 'h2', text: 'Banking and financial services' },
      {
        type: 'ul',
        items: [
          'Agents that answer frequent questions about products, requirements and application status.',
          'Automated document review in customer assessment and onboarding.',
          'Detection of unusual patterns to support fraud prevention.',
          'Dashboards that consolidate information from different systems for decision-making.',
        ],
      },
      {
        type: 'p',
        text: 'What to watch: it’s a regulated sector, supervised by the CMF, with initiatives such as the Fintech Law driving financial data sharing. Traceability, access control and human oversight of automated decisions are requirements, not options.',
      },
      { type: 'h2', text: 'Mining' },
      {
        type: 'ul',
        items: [
          'Predictive maintenance from equipment sensor data, to anticipate failures.',
          'Assistants that let teams query technical manuals and safety procedures in natural language.',
          'Automated shift, production and safety-indicator reports.',
          'Control dashboards for remote operations and real-time monitoring.',
        ],
      },
      {
        type: 'p',
        text: 'What to watch: people’s safety comes first, so AI should support decisions, not replace protocols. Many sites also have limited connectivity, which means solutions must work with intermittent connections.',
      },
      { type: 'h2', text: 'Retail and e-commerce' },
      {
        type: 'ul',
        items: [
          '24/7 support on WhatsApp and Instagram with order tracking.',
          'Product recommendations based on customer history and preferences.',
          'Product descriptions and content generated for large catalogues.',
          'Sales and inventory analysis to anticipate stock-outs.',
        ],
      },
      { type: 'h2', text: 'Healthcare' },
      {
        type: 'ul',
        items: [
          'Appointment booking and confirmation on WhatsApp, reducing no-shows.',
          'Assistants that answer administrative questions: coverage, requirements and test preparation.',
          'Automation of documentation and internal procedures.',
        ],
      },
      {
        type: 'p',
        text: 'What to watch: health data is especially sensitive. AI must not diagnose or replace a professional’s assessment, and must always hand off to a person for symptoms or emergencies.',
      },
      { type: 'h2', text: 'Real estate' },
      {
        type: 'ul',
        items: [
          'Lead qualification and visit booking around the clock.',
          'Mortgage and appreciation simulators that help buyers decide before speaking to an agent.',
          'Automatic follow-up of prospects according to the project stage.',
        ],
      },
      { type: 'h2', text: 'Logistics and transport' },
      {
        type: 'ul',
        items: [
          'Automatic shipment status notifications by WhatsApp or email.',
          'Route optimisation and delivery assignment.',
          'Automatic reading of delivery notes, invoices and shipping documents.',
        ],
      },
      { type: 'h2', text: 'Education' },
      {
        type: 'ul',
        items: [
          'Assistants that answer questions about admissions, fees and procedures.',
          'Support for teachers preparing materials and assessments.',
          'Student tracking to spot dropout risk early.',
        ],
      },
      { type: 'h2', text: 'How to start in any industry' },
      {
        type: 'ul',
        items: [
          'Choose a concrete, repetitive and measurable process.',
          'Check what data you have and what state it’s in.',
          'Set privacy, security and human-oversight rules from the start.',
          'Start with a focused pilot, measure results, then scale.',
        ],
      },
      {
        type: 'cta',
        text: 'Every sector has its own rules. In the EBS 693 diagnosis we analyse your operation and regulations to prioritise what to automate first and with what return.',
      },
    ],
  },
};
