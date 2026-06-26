export interface AIAgentDetail {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    category: string;
    businessFunction: string | null;
    domain: string | null;
    industry: string | null;
    status: string;
    iconColor: string;
    order: number;
    businessChallenge: string;
    coreFeatures: string[];
    keyBenefits: { title: string; description: string }[];
    howItWorks: { step: string; title: string; description: string }[];
}

export const STATIC_AGENTS: AIAgentDetail[] = [
    {
        id: "1", name: "Sales Assistant Agent", slug: "sales-assistant-agent",
        tagline: "Turns complex quoting into a fast, intuitive guided experience.",
        description: "Automates the sales quoting process by guiding reps through configuration, pricing, and proposal generation with AI-driven suggestions and real-time ERP data.",
        category: "Alpha Dev", businessFunction: "Sales", domain: "CRM & Sales Automation", industry: "Retail", status: "LIVE", iconColor: "#4A5D4E", order: 1,
        businessChallenge: "Sales teams waste hours navigating fragmented quoting systems, spreadsheets, and manual approvals. Every quote requires cross-referencing pricing tables, inventory availability, and customer-specific discounts — leaving reps less time to sell and more prone to errors that delay deals.",
        coreFeatures: ["Quote Creation & Management", "Inventory & Fulfilment Sync", "Pricing & Credit Validation", "Customer Data Management", "Product Information Lookup", "Research & Analysis on All Data"],
        keyBenefits: [
            { title: "Significant Time Savings", description: "Cut quoting time from hours to minutes by eliminating manual data lookups and system switching." },
            { title: "Higher Productivity", description: "Free sales reps to focus on building relationships while the agent handles the heavy lifting." },
            { title: "Fewer Errors", description: "AI validation ensures prices, discounts, and terms are always accurate before submission." },
            { title: "No System Expertise Required", description: "Any rep can generate a professional quote — no ERP training needed." },
        ],
        howItWorks: [
            { step: "01", title: "Rep Asks a Question", description: "The sales rep types or speaks their request — 'Quote 50 units of Product X for Acme Corp at enterprise pricing.'" },
            { step: "02", title: "Agent Gathers Data", description: "The agent queries your ERP, pricing engine, and CRM in real time to assemble a complete, validated quote." },
            { step: "03", title: "Quote Delivered", description: "A structured proposal is generated instantly, ready for review, approval, and sending — all from a single interface." },
        ],
    },
    {
        id: "2", name: "Sales Qualification Agent", slug: "sales-qualification-agent",
        tagline: "Lead qualification and automated handover to sales.",
        description: "Scores inbound leads based on firmographic and behavioural signals, routes qualified leads to the right sales rep, and generates AI-written outreach emails with zero manual triage.",
        category: "Alpha Dev", businessFunction: "Sales", domain: "CRM & Sales Automation", industry: "B2B", status: "LIVE", iconColor: "#3B5249", order: 2,
        businessChallenge: "Marketing teams generate hundreds of leads per month, but sales reps spend significant time manually reviewing, scoring, and routing them. Low-quality leads waste sales capacity while high-value prospects wait too long for follow-up, causing lost revenue.",
        coreFeatures: ["Lead Scoring & Ranking", "CRM Integration & Auto-Routing", "AI-Written Outreach Emails", "Firmographic Data Enrichment", "Behavioural Signal Analysis", "SLA-Based Follow-up Triggers"],
        keyBenefits: [
            { title: "Faster Response Times", description: "Hot leads are routed and contacted within minutes of enquiry, not hours or days." },
            { title: "Higher Conversion Rates", description: "Reps only engage with prospects that meet your ideal customer profile criteria." },
            { title: "Reduced Admin Burden", description: "Eliminate manual lead triage entirely — the agent does it 24/7 without fatigue." },
            { title: "Consistent Messaging", description: "AI-generated outreach follows your brand voice and value proposition every time." },
        ],
        howItWorks: [
            { step: "01", title: "Lead Captured", description: "A new lead enters your CRM from web forms, events, or marketing campaigns." },
            { step: "02", title: "Agent Scores & Enriches", description: "The agent enriches the record with firmographic data and scores it against your ICP criteria in real time." },
            { step: "03", title: "Routed & Contacted", description: "Qualified leads are assigned to the right rep and the agent drafts a personalised outreach email ready to send." },
        ],
    },
    {
        id: "3", name: "Invoice Matching Agent", slug: "invoice-matching-agent",
        tagline: "Automates invoice matching in Dynamics 365 F&O.",
        description: "Uses AI to match incoming vendor invoices against purchase orders and goods receipts, flags discrepancies, and routes exceptions to the right approver — dramatically reducing manual AP effort.",
        category: "Alpha Dev", businessFunction: "Finance", domain: "ERP & Finance", industry: "Manufacturing", status: "LIVE", iconColor: "#5C7A6E", order: 6,
        businessChallenge: "Accounts payable teams spend significant time manually matching invoices to POs and GRNs, chasing approvals, and resolving discrepancies. Errors lead to duplicate payments, missed early-payment discounts, and strained supplier relationships.",
        coreFeatures: ["3-Way Invoice Matching (PO / GRN / Invoice)", "Discrepancy Detection & Flagging", "Exception Routing & Approval Workflows", "Duplicate Payment Prevention", "ERP Auto-Posting on Match", "Audit Trail & Compliance Reporting"],
        keyBenefits: [
            { title: "Up to 90% Straight-Through Processing", description: "Matched invoices post automatically with no human touchpoint required." },
            { title: "Fewer Duplicate Payments", description: "AI detects duplicate invoice numbers and amounts before processing." },
            { title: "Faster Supplier Payments", description: "Eliminate approval bottlenecks and capture early-payment discounts consistently." },
            { title: "Full Audit Trail", description: "Every match decision is logged with timestamps and justifications for compliance." },
        ],
        howItWorks: [
            { step: "01", title: "Invoice Ingested", description: "Vendor invoices arrive by email or upload. The agent extracts all line-item data using OCR and NLP." },
            { step: "02", title: "Matching Executed", description: "The agent matches each invoice line against open POs and goods receipts in Dynamics 365 F&O automatically." },
            { step: "03", title: "Post or Escalate", description: "Matched invoices post straight-through. Exceptions are routed to the right approver with full context attached." },
        ],
    },
    {
        id: "4", name: "Reconciliation Agent", slug: "reconciliation-agent",
        tagline: "AI powered financial reconciliation and automated document matching.",
        description: "Compares ledger entries against bank statements and invoices to identify and resolve mismatches automatically, with a full audit trail for compliance.",
        category: "Alpha Dev", businessFunction: "Finance", domain: "ERP & Finance", industry: "Financial Services", status: "LIVE", iconColor: "#4A5D4E", order: 7,
        businessChallenge: "Month-end reconciliation is a time-consuming, error-prone process that ties up finance teams for days. Manual matching of thousands of transactions across banks, ERP ledgers, and third-party systems leads to late reporting and compliance risk.",
        coreFeatures: ["Bank-to-Ledger Transaction Matching", "Multi-Source Reconciliation", "Exception Identification & Resolution", "Automated Journal Entry Suggestion", "Period-End Reporting Dashboard", "Regulatory Compliance Audit Logs"],
        keyBenefits: [
            { title: "Month-End in Hours, Not Days", description: "Reduce reconciliation cycles dramatically with automated matching and exception surfacing." },
            { title: "Higher Accuracy", description: "AI catches mismatches that manual review misses, reducing financial restatement risk." },
            { title: "Compliance Confidence", description: "Complete audit trail for every match and exception resolution, ready for regulators." },
            { title: "Real-Time Visibility", description: "Finance leaders see reconciliation status live, not just at month end." },
        ],
        howItWorks: [
            { step: "01", title: "Data Ingested", description: "Bank statements, ERP ledger exports, and third-party reports are uploaded or fetched automatically." },
            { step: "02", title: "AI Matching Engine Runs", description: "The agent matches transactions across sources using amount, date, reference, and counterparty signals." },
            { step: "03", title: "Exceptions Resolved", description: "Unmatched items are surfaced with suggested resolutions. Finance reviews and approves in a single dashboard." },
        ],
    },
    {
        id: "5", name: "Order Intake Agent", slug: "order-intake-agent",
        tagline: "Automates email PDF orders into ERP sales orders.",
        description: "Extracts order details from unstructured email PDFs using OCR and NLP, validates against the product catalogue, and creates clean sales orders in ERP with zero manual data entry.",
        category: "Alpha Dev", businessFunction: "Operations", domain: "Supply Chain & Logistics", industry: "Manufacturing", status: "LIVE", iconColor: "#5C7A6E", order: 11,
        businessChallenge: "Operations teams receive hundreds of customer purchase orders by email daily — as PDFs, scanned documents, or fax images. Re-keying this data into the ERP is slow, error-prone, and delays order fulfilment, directly impacting customer satisfaction and cash flow.",
        coreFeatures: ["PDF & Email Order Extraction", "OCR + NLP Data Parsing", "Product Catalogue Validation", "ERP Sales Order Creation", "Duplicate Order Detection", "Customer Notification on Order Receipt"],
        keyBenefits: [
            { title: "Zero Manual Data Entry", description: "Orders go from inbox to ERP without a human touching the data." },
            { title: "Faster Order Fulfilment", description: "Orders are created in the ERP within minutes of receipt, not hours." },
            { title: "Fewer Errors", description: "AI validation catches part number mismatches and quantity errors before they reach the warehouse." },
            { title: "Scalable for Volume Spikes", description: "Handle 10x order volumes during peak periods with no additional headcount." },
        ],
        howItWorks: [
            { step: "01", title: "Email Monitored", description: "The agent monitors your orders inbox and detects incoming purchase order emails automatically." },
            { step: "02", title: "Data Extracted", description: "OCR and NLP parse the PDF to extract customer, item, quantity, pricing, and delivery details — regardless of format." },
            { step: "03", title: "ERP Order Created", description: "Validated data is posted as a sales order in the ERP. Exceptions are queued for human review with a full breakdown." },
        ],
    },
    {
        id: "6", name: "Supply Chain Intelligence Agent", slug: "supply-chain-intelligence-agent",
        tagline: "Full visibility and operational manageability across your supply chain.",
        description: "Connects vessel intake, OCR document processing, smart gantry dispatch, e-POD delivery, and SAP HANA integration into a single intelligent control tower with 99.7% uptime.",
        category: "Alpha Dev", businessFunction: "Operations", domain: "Supply Chain & Logistics", industry: "Energy & Utilities", status: "LIVE", iconColor: "#2D312E", order: 13,
        businessChallenge: "Downstream supply chain operations — from vessel berthing to last-mile delivery — rely on disconnected systems, paper-based documentation, and manual coordination. The result is delayed throughput, invoice errors, and poor operational visibility that prevents proactive decision-making.",
        coreFeatures: ["Upstream Intake & Vessel Berthing", "OCR Document Processing Hub (96.2% Match Rate)", "Smart Gantry & Fleet Dispatch", "Digital e-POD Driver App", "O2C / SAP HANA Auto-Invoice", "Real-Time Exception Management Dashboard"],
        keyBenefits: [
            { title: "48,200 MT Daily Throughput Managed", description: "Full visibility and control over high-volume bulk commodity operations." },
            { title: "98.1% SLA on Order-to-Cash", description: "Automated invoicing and SAP sync means near-zero manual O2C effort." },
            { title: "99.7% System Uptime", description: "Five active modules with enterprise redundancy ensuring continuous operations." },
            { title: "7 Open Exceptions Across All Modules", description: "Proactive exception management keeps the entire pipeline flowing smoothly." },
        ],
        howItWorks: [
            { step: "01", title: "Vessel Scheduled & Berthed", description: "Module A manages vessel scheduling, berth allocation, and cargo intake with real-time capacity tracking." },
            { step: "02", title: "Documents Processed & Fleet Dispatched", description: "Module B extracts document data via OCR. Module C dispatches gantry cranes and trucks based on live inventory." },
            { step: "03", title: "Delivered & Invoiced Automatically", description: "Module D captures proof of delivery digitally. Module E auto-generates and posts invoices to SAP HANA instantly." },
        ],
    },
    {
        id: "7", name: "Customer Service Chatbot Agent", slug: "customer-service-chatbot-agent",
        tagline: "AI chatbot for scalable, high volume customer support.",
        description: "Handles tier-1 customer enquiries 24/7 across chat, email, and messaging platforms using RAG over your knowledge base, escalating to human agents when needed.",
        category: "Alpha Dev", businessFunction: "Customer Service", domain: "Customer Engagement", industry: "Retail", status: "LIVE", iconColor: "#4A5D4E", order: 14,
        businessChallenge: "Customer service teams are overwhelmed with repetitive, low-complexity queries that consume agent capacity and extend wait times for complex issues. Hiring more agents doesn't scale — costs increase linearly while customer expectations for instant responses keep rising.",
        coreFeatures: ["Multi-Channel Support (Chat, Email, Messaging)", "RAG over Knowledge Base", "Context-Aware Conversation Memory", "Sentiment Detection & Escalation", "CRM Ticket Creation & Sync", "CSAT Measurement & Reporting"],
        keyBenefits: [
            { title: "24/7 Availability at Zero Marginal Cost", description: "Handle unlimited concurrent conversations without adding headcount." },
            { title: "Human Agents for Complex Issues Only", description: "Deflect 70%+ of tier-1 queries so your team focuses on high-value interactions." },
            { title: "Consistent Brand Voice", description: "Every response follows your approved knowledge base and communication guidelines." },
            { title: "Instant Answers", description: "Customers get accurate answers in seconds, not minutes — improving CSAT immediately." },
        ],
        howItWorks: [
            { step: "01", title: "Customer Asks a Question", description: "Customer sends a message across any channel — website chat, email, WhatsApp, or Teams." },
            { step: "02", title: "Agent Retrieves Answer", description: "RAG searches your knowledge base, FAQs, and product documentation to construct an accurate, contextual response." },
            { step: "03", title: "Resolved or Escalated", description: "If satisfied, the conversation closes. If not, it escalates to a human agent with full context attached." },
        ],
    },
    {
        id: "8", name: "Email Routing Agent", slug: "email-routing-agent",
        tagline: "Routes and prioritizes emails to the right service rep automatically.",
        description: "Reads incoming customer emails, classifies intent and urgency using NLP, and routes each ticket to the correct team with priority scoring and SLA tracking built in.",
        category: "Alpha Dev", businessFunction: "Customer Service", domain: "Customer Engagement", industry: "B2B", status: "LIVE", iconColor: "#3B5249", order: 15,
        businessChallenge: "Shared inboxes become bottlenecks when emails require manual triage. Teams waste time reading, deciding, and forwarding messages. High-urgency issues get buried under low-priority emails, SLAs are missed, and customers feel ignored — damaging trust and retention.",
        coreFeatures: ["Intent Classification (Complaint, Enquiry, Request, Escalation)", "Urgency & Priority Scoring", "Team & Rep Routing Rules Engine", "SLA Tracking & Breach Alerts", "CRM Case Creation on Routing", "Reporting & Routing Analytics"],
        keyBenefits: [
            { title: "Eliminate Manual Triage", description: "Every email is classified and routed in under 30 seconds — automatically." },
            { title: "SLA Compliance Improved", description: "Urgent issues are surfaced immediately with countdown timers, preventing breaches." },
            { title: "Right Person, First Time", description: "Complex routing rules ensure billing goes to finance, technical issues go to engineering — always." },
            { title: "Full Visibility", description: "Managers see volume, routing accuracy, and SLA performance in a live dashboard." },
        ],
        howItWorks: [
            { step: "01", title: "Email Arrives", description: "An incoming email lands in the shared inbox and is immediately intercepted by the agent." },
            { step: "02", title: "Classified & Scored", description: "NLP analyses the email body, subject, and sender to determine intent, urgency, and required expertise." },
            { step: "03", title: "Routed Instantly", description: "The email is assigned to the correct team or individual with a CRM case created and SLA clock started." },
        ],
    },
    {
        id: "9", name: "Knowledge Discovery Agent", slug: "knowledge-discovery-agent",
        tagline: "Finds relevant knowledge and experts in Microsoft 365.",
        description: "Uses semantic search across SharePoint, Teams, and email to surface the most relevant knowledge articles, documents, and internal subject matter experts for any given query.",
        category: "Alpha Dev", businessFunction: "Knowledge Management", domain: "AI & Analytics", industry: "Professional Services", status: "LIVE", iconColor: "#4A5D4E", order: 26,
        businessChallenge: "Organisations spend a staggering amount of time searching for information that already exists internally. Employees re-create documents, duplicate work, and make decisions without access to relevant precedents — simply because the knowledge is buried in SharePoint, email threads, or the heads of colleagues who aren't easily found.",
        coreFeatures: ["Semantic Search Across SharePoint, Teams & Email", "Expert Finder (People Graph Integration)", "Document Summary Generation", "Knowledge Gap Detection", "Permission-Aware Search", "Search Analytics & Usage Insights"],
        keyBenefits: [
            { title: "Find Answers in Seconds", description: "Employees get relevant results from across the organisation in one natural language query." },
            { title: "Reduce Knowledge Silos", description: "Surface institutional knowledge that's buried in folders, inboxes, and chat history." },
            { title: "Connect People with Experts", description: "Identify the right internal expert for any topic based on their activity and contributions." },
            { title: "No Duplicate Work", description: "Teams find existing assets before creating new ones, saving significant effort." },
        ],
        howItWorks: [
            { step: "01", title: "Employee Asks a Question", description: "The user types a natural language question — 'Who worked on the APAC market entry project last year?'" },
            { step: "02", title: "Semantic Search Executed", description: "The agent searches SharePoint, Teams channels, email, and meeting notes semantically — not just by keyword." },
            { step: "03", title: "Results & Experts Surfaced", description: "Relevant documents, summaries, and the names of internal subject matter experts are returned instantly." },
        ],
    },
    {
        id: "10", name: "Document Lifecycle Agent", slug: "document-lifecycle-agent",
        tagline: "Monitors document lifecycles and flags sensitive content.",
        description: "Tracks document creation, review, approval, and expiry across SharePoint. Automatically flags sensitive data and triggers retention or deletion workflows.",
        category: "Alpha Dev", businessFunction: "IT", domain: "Document Processing", industry: "Healthcare", status: "LIVE", iconColor: "#2D4F41", order: 25,
        businessChallenge: "Organisations accumulate vast amounts of documents with no systematic lifecycle management. Sensitive data lingers beyond its retention period, contracts expire unnoticed, and compliance audits reveal documents that should have been deleted years ago — exposing organisations to significant regulatory and legal risk.",
        coreFeatures: ["Document Expiry Tracking & Alerts", "Sensitive Data Detection (PII, PHI, PCI)", "Retention Policy Enforcement", "Approval Workflow Monitoring", "GDPR / HIPAA Compliance Tagging", "Audit-Ready Lifecycle Reports"],
        keyBenefits: [
            { title: "Reduce Compliance Risk", description: "Automatically identify and action documents with sensitive data past their retention date." },
            { title: "Never Miss a Contract Expiry", description: "Proactive alerts ensure renewals, reviews, and expirations are handled on time." },
            { title: "Audit-Ready at All Times", description: "Full lifecycle history for every document — creation, modification, approval, and deletion." },
            { title: "Automated Policy Enforcement", description: "Retention schedules execute automatically without manual IT intervention." },
        ],
        howItWorks: [
            { step: "01", title: "Documents Indexed", description: "The agent continuously monitors SharePoint and connected repositories, cataloguing all documents and their metadata." },
            { step: "02", title: "Lifecycle Events Detected", description: "Expiry dates, sensitive data patterns, and policy triggers are evaluated continuously in the background." },
            { step: "03", title: "Actions Triggered", description: "Owners are notified, workflows are started, and documents are flagged for review or automatically archived." },
        ],
    },
    {
        id: "11", name: "Regulatory Signal Agent", slug: "regulatory-signal-agent",
        tagline: "AI agent that tracks regulations and delivers impact summaries for legal teams.",
        description: "Monitors regulatory feeds across multiple jurisdictions, summarises changes, assesses business impact, and routes alerts to the relevant legal or compliance owner.",
        category: "Alpha Dev", businessFunction: "IT", domain: "IT & Compliance", industry: "Financial Services", status: "LIVE", iconColor: "#4A5D4E", order: 24,
        businessChallenge: "Legal and compliance teams in regulated industries face a constant flood of regulatory updates across multiple jurisdictions. Reading, interpreting, and assessing the business impact of every change is time-consuming and requires specialist knowledge — making it nearly impossible to stay fully current without significant headcount.",
        coreFeatures: ["Multi-Jurisdiction Regulatory Feed Monitoring", "AI-Powered Change Summarisation", "Business Impact Assessment", "Owner Routing & Task Assignment", "Deadline & Effective Date Tracking", "Regulatory Calendar & Dashboard"],
        keyBenefits: [
            { title: "Stay Ahead of Regulatory Change", description: "Receive concise, actionable summaries of regulatory updates the day they're published." },
            { title: "Reduce Legal Research Time by 80%", description: "AI does the reading and summarising so your lawyers focus on strategy, not monitoring." },
            { title: "No More Missed Deadlines", description: "Effective dates and compliance deadlines are tracked and escalated automatically." },
            { title: "Defensible Compliance Record", description: "Full log of every regulatory change received, assessed, and actioned — ready for auditors." },
        ],
        howItWorks: [
            { step: "01", title: "Feeds Monitored Continuously", description: "The agent monitors government publications, regulatory bodies, and industry standards across configured jurisdictions 24/7." },
            { step: "02", title: "Changes Summarised & Assessed", description: "New regulations are summarised in plain language and assessed for relevance and business impact by the AI." },
            { step: "03", title: "Routed to the Right Owner", description: "Relevant updates are pushed to the correct legal or compliance team member with deadlines and recommended actions." },
        ],
    },
    {
        id: "12", name: "Emission AI Agent", slug: "emission-ai-agent",
        tagline: "Maps purchase orders to emission factors for Scope 3 reporting.",
        description: "Analyses purchase order data, maps spend categories to emission factors from DEFRA, EPA, and GHG Protocol sources, and generates Scope 3 Category 1 reports ready for ESG disclosure.",
        category: "Alpha Dev", businessFunction: "Sustainability", domain: "IT & Compliance", industry: "Energy & Utilities", status: "LIVE", iconColor: "#2D7A4F", order: 42,
        businessChallenge: "Companies are under increasing pressure to report Scope 3 emissions for ESG frameworks and investor disclosure. Calculating Scope 3 Category 1 (purchased goods and services) requires mapping thousands of spend line items to emission factors — a manual process that takes months and is prone to inconsistency and error.",
        coreFeatures: ["PO Spend Data Ingestion", "Spend Category-to-Emission Factor Mapping (DEFRA, EPA, GHG Protocol)", "Scope 3 Category 1 Report Generation", "Supplier Emission Data Integration", "Year-on-Year Trend Analysis", "TCFD & GRI-Aligned Output Formats"],
        keyBenefits: [
            { title: "Months of Work in Hours", description: "Map thousands of PO line items to emission factors automatically instead of manually." },
            { title: "Disclosure-Ready Reports", description: "Output aligned to TCFD, GRI, and CDP frameworks — ready for investor and regulatory submission." },
            { title: "Consistent Methodology", description: "Every calculation uses the same approved emission factors and methodology, eliminating inconsistency." },
            { title: "Identify Reduction Opportunities", description: "Pinpoint the highest-emission spend categories and suppliers to prioritise decarbonisation efforts." },
        ],
        howItWorks: [
            { step: "01", title: "PO Data Ingested", description: "Purchase order data is pulled from your ERP or uploaded as a file — the agent accepts any format." },
            { step: "02", title: "Spend Mapped to Emission Factors", description: "AI classifies each spend line by category and maps it to the correct emission factor from DEFRA, EPA, or GHG Protocol databases." },
            { step: "03", title: "Report Generated", description: "A complete Scope 3 Category 1 report is produced with tCO₂e totals, category breakdowns, and year-on-year comparisons." },
        ],
    },
    {
        id: "13", name: "CV Safety Monitoring Agent", slug: "cv-safety-monitoring-agent",
        tagline: "Real-time AI-powered safety monitoring for industrial environments.",
        description: "Leverages computer vision to detect PPE violations, SOP breaches, exclusion zone intrusions, and unsafe behaviours in real time — delivering instant alerts to safety managers.",
        category: "Alpha Dev", businessFunction: "Operations", domain: "AI & Analytics", industry: "Manufacturing", status: "LIVE", iconColor: "#7A3B3B", order: 44,
        businessChallenge: "Industrial facilities face constant safety risks that traditional camera infrastructure cannot address. CCTV footage is reviewed reactively after incidents, not proactively before them. Safety managers can't monitor every corner of a facility simultaneously, and manual SOP audits are infrequent and subjective.",
        coreFeatures: ["PPE Compliance Detection (Helmet, Vest, Gloves, Goggles)", "Exclusion Zone & Geofencing Breach Alerts", "SOP Violation Detection", "Slip & Fall Detection", "Forklift-Pedestrian Proximity Alerts", "Incident Reporting & Evidence Capture"],
        keyBenefits: [
            { title: "Prevent Incidents Before They Happen", description: "Real-time alerts give safety managers seconds to intervene — before a near-miss becomes an injury." },
            { title: "100% Coverage, 24/7", description: "Every camera feed is monitored simultaneously — no blind spots, no fatigue." },
            { title: "Works on Existing Infrastructure", description: "Deploy on your current camera network — no new hardware required." },
            { title: "Objective SOP Compliance Data", description: "Replace subjective audits with quantitative compliance scores per zone, shift, and team." },
        ],
        howItWorks: [
            { step: "01", title: "Camera Feeds Analysed", description: "The agent processes live video from all connected cameras simultaneously using edge-deployed computer vision models." },
            { step: "02", title: "Violations Detected", description: "AI identifies PPE non-compliance, zone breaches, and unsafe behaviours in real time with high precision." },
            { step: "03", title: "Alerts Sent Instantly", description: "Safety managers receive immediate notifications with timestamped snapshots and location data for rapid response." },
        ],
    },
    {
        id: "14", name: "Product Search Agent", slug: "product-search-agent",
        tagline: "Modernises product search in Dynamics 365 F&O with smart lookup.",
        description: "Replaces rigid catalogue search with AI-powered semantic product discovery in Dynamics 365, reducing search time and improving order accuracy for sales and procurement teams.",
        category: "Alpha Dev", businessFunction: "Product Management", domain: "ERP & Finance", industry: "Manufacturing", status: "LIVE", iconColor: "#4A5D4E", order: 32,
        businessChallenge: "Product catalogues in ERPs like Dynamics 365 F&O contain tens of thousands of SKUs. Traditional keyword search requires users to know exact part numbers or descriptions. Mismatches cause wrong orders, returns, and warehouse errors — all of which cost money and damage customer relationships.",
        coreFeatures: ["Semantic Product Search in Natural Language", "Synonym & Part Number Mapping", "Attribute-Based Filtering (size, material, spec)", "Search-as-you-type Suggestions", "Order History-Based Recommendations", "Catalogue Completeness Analytics"],
        keyBenefits: [
            { title: "Find the Right Product, First Time", description: "Natural language queries return the correct SKU even when the user doesn't know the exact part number." },
            { title: "Fewer Order Errors", description: "Accurate product selection at the point of order reduces returns, exchanges, and warehouse mistakes." },
            { title: "Faster Order Processing", description: "Sales and procurement teams spend less time searching and more time transacting." },
            { title: "Works for Non-Technical Users", description: "Anyone can find products without needing to understand ERP catalogue structures." },
        ],
        howItWorks: [
            { step: "01", title: "User Types a Query", description: "A sales rep types 'M6 stainless socket head cap screw 20mm' — in plain language, not a part number." },
            { step: "02", title: "Semantic Matching", description: "The agent maps the query to the correct catalogue entries using embeddings, synonym tables, and attribute matching." },
            { step: "03", title: "Results Ranked", description: "The most relevant SKUs are returned ranked by relevance, with product images, stock levels, and pricing displayed." },
        ],
    },
    {
        id: "15", name: "Time Entry Agent", slug: "time-entry-agent",
        tagline: "Automates time entry drafting, reminders and review workflows.",
        description: "Monitors calendar events and project activity to suggest draft time entries, sends targeted reminders to employees who are behind, and flags timesheet anomalies for manager review.",
        category: "Microsoft", businessFunction: "HR", domain: "Workforce Management", industry: "Professional Services", status: "LIVE", iconColor: "#0078D4", order: 19,
        businessChallenge: "Professional services firms lose revenue when time isn't captured accurately or promptly. Employees forget to log hours, under-report billable work, or batch-enter time at week-end with poor accuracy. Missing or inaccurate timesheets delay invoicing and compromise project profitability visibility.",
        coreFeatures: ["Calendar-Based Time Entry Suggestion", "Targeted Reminder Campaigns", "Timesheet Anomaly Detection", "Manager Review & Approval Workflows", "Project Code Auto-Suggestion", "Billing Readiness Reports"],
        keyBenefits: [
            { title: "More Billable Hours Captured", description: "Accurate, timely time entry means fewer hours lost to poor recall and batch logging." },
            { title: "Faster Invoice Cycles", description: "Complete timesheets at week-end instead of month-end, accelerating cash collection." },
            { title: "Reduced Admin for HR & Finance", description: "Automated reminders and approval workflows replace manual chasing and spreadsheet management." },
            { title: "Better Project Profitability Visibility", description: "Real-time timesheet completeness means project margins are visible when decisions still matter." },
        ],
        howItWorks: [
            { step: "01", title: "Activity Monitored", description: "The agent reads calendar invites, meeting records, and project system activity to understand how time was spent." },
            { step: "02", title: "Draft Entries Suggested", description: "Draft time entries are generated and presented to the employee for quick review and one-click confirmation." },
            { step: "03", title: "Gaps Chased, Anomalies Flagged", description: "Missing entries trigger targeted reminders. Unusual patterns are flagged for manager attention before submission." },
        ],
    },
    {
        id: "16", name: "AP Responder Agent", slug: "ap-responder-agent",
        tagline: "Handles vendor payment enquiries and replies with invoice status.",
        description: "Monitors the AP inbox, identifies payment status enquiries, looks up the relevant invoice in the ERP, and sends a structured, accurate reply — without human intervention.",
        category: "Alpha Dev", businessFunction: "Finance", domain: "ERP & Finance", industry: "Retail", status: "LIVE", iconColor: "#4A5D4E", order: 10,
        businessChallenge: "AP teams receive a constant stream of 'when will I get paid?' emails from vendors. Each one requires looking up the invoice in the ERP, checking payment status, and drafting a reply — often taking 5-10 minutes per email. This consumes significant AP capacity that should be focused on higher-value work.",
        coreFeatures: ["Inbox Monitoring & Intent Classification", "ERP Invoice Status Lookup", "Automated Reply Drafting & Sending", "Payment Date & Reference Provision", "Escalation for Disputed Invoices", "Vendor Communication Audit Log"],
        keyBenefits: [
            { title: "Zero Manual AP Responses", description: "Standard payment status enquiries are handled end-to-end without human involvement." },
            { title: "Vendor Relationships Maintained", description: "Suppliers receive prompt, accurate responses — improving trust and reducing payment disputes." },
            { title: "AP Team Freed Up", description: "Your AP team focuses on exceptions, disputes, and process improvement instead of repetitive lookups." },
            { title: "24/7 Response Capability", description: "Vendors in different time zones get answers outside of business hours without any overtime cost." },
        ],
        howItWorks: [
            { step: "01", title: "Vendor Email Arrives", description: "A supplier sends a payment status enquiry to your AP inbox. The agent detects and classifies it instantly." },
            { step: "02", title: "Invoice Located in ERP", description: "The agent queries the ERP to find the invoice, payment run status, payment date, and bank reference." },
            { step: "03", title: "Reply Sent Automatically", description: "A professional, accurate reply is sent to the vendor with all relevant payment details — no human required." },
        ],
    },
    {
        id: "17", name: "Case Management Agent", slug: "case-management-agent",
        tagline: "Case creation and lifecycle management in Dynamics 365 Customer Engagement.",
        description: "Automates the full case lifecycle from creation and categorisation through to resolution and CSAT measurement within Dynamics 365 Customer Engagement.",
        category: "Microsoft", businessFunction: "Customer Service", domain: "Customer Engagement", industry: "B2B", status: "LIVE", iconColor: "#0078D4", order: 17,
        businessChallenge: "Customer service teams using Dynamics 365 spend significant time manually creating cases, assigning them, and tracking resolution progress. Without automated workflows, cases slip through the cracks, SLAs are missed, and customers receive inconsistent service levels based on which agent they happen to reach.",
        coreFeatures: ["Automatic Case Creation from Email/Chat/Portal", "AI-Powered Case Categorisation & Routing", "SLA Monitoring & Breach Prevention", "AI Response Suggestions at Every Stage", "Case Merge & Duplicate Detection", "CSAT Survey Triggering on Case Close"],
        keyBenefits: [
            { title: "Faster Case Resolution", description: "Automated routing and AI-suggested responses cut average handle time significantly." },
            { title: "Consistent Service Levels", description: "Every customer gets the right SLA, right team, and right priority — automatically." },
            { title: "Higher CSAT Scores", description: "Faster, more accurate responses and proactive updates improve customer satisfaction measurably." },
            { title: "Complete Case Audit Trail", description: "Every action, note, and communication is logged in Dynamics 365 for compliance and quality management." },
        ],
        howItWorks: [
            { step: "01", title: "Customer Contact Received", description: "A customer emails, chats, or submits a portal form. The agent creates a Dynamics 365 case automatically." },
            { step: "02", title: "Categorised & Routed", description: "AI classifies the case by type, priority, and required expertise, then routes it to the correct queue with SLA applied." },
            { step: "03", title: "Resolved & Measured", description: "The agent suggests responses at each stage. On resolution, a CSAT survey is triggered and the case is closed with full notes." },
        ],
    },
    {
        id: "18", name: "ERP Migration Agent", slug: "erp-migration-agent",
        tagline: "Intelligent data migration from legacy ERP to modern platforms.",
        description: "Orchestrates end-to-end ERP migrations using AI-powered field mapping, data cleansing, and validation. Supports migrations to Dynamics 365, SAP S/4HANA, and Oracle Fusion.",
        category: "Alpha Dev", businessFunction: "IT", domain: "ERP & Finance", industry: "Manufacturing", status: "LIVE", iconColor: "#4A5D4E", order: 43,
        businessChallenge: "ERP migrations are among the most complex and risky IT programmes an organisation can undertake. Manual data mapping between source and target systems is error-prone, time-consuming, and heavily dependent on specialist knowledge that is scarce and expensive. Data quality issues discovered late in a migration cause costly delays and post-go-live incidents.",
        coreFeatures: ["AI-Powered Source-to-Target Field Mapping", "Data Quality Assessment & Cleansing", "Migration Validation & Reconciliation", "Delta Migration Support", "Rollback Planning & Testing", "Go-Live Readiness Reporting"],
        keyBenefits: [
            { title: "Reduce Migration Duration by 40%", description: "AI-generated field mappings cut the most time-consuming phase of any ERP migration." },
            { title: "Higher Data Quality at Go-Live", description: "Automated cleansing and validation catch issues early — before they become production incidents." },
            { title: "Reduced Dependency on Specialists", description: "Junior team members can execute complex mappings with AI guidance, reducing cost." },
            { title: "Confident Go-Live", description: "Comprehensive validation reports give the team and executive sponsors confidence before cutover." },
        ],
        howItWorks: [
            { step: "01", title: "Source System Analysed", description: "The agent analyses your legacy ERP schema, data volumes, and data quality to produce a migration readiness assessment." },
            { step: "02", title: "Mappings Generated & Validated", description: "AI suggests field mappings between source and target, which the team reviews and approves in a structured workflow." },
            { step: "03", title: "Data Migrated & Reconciled", description: "Cleansed data is loaded into the target system. The agent validates record counts, key values, and referential integrity automatically." },
        ],
    },
];

export function getAgentBySlug(slug: string): AIAgentDetail | undefined {
    return STATIC_AGENTS.find(a => a.slug === slug);
}
