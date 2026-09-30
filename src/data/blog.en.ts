import type { Post } from './blog';

/** English copy of the blog posts, keyed by slug. SEO (titles, JSON-LD) keeps using the Spanish. */
export type PostCopy = Pick<Post, 'title' | 'description' | 'tags' | 'body'>;

export const postsEn: Record<string, PostCopy> = {
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
