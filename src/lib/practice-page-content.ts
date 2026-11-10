export type PracticeCapabilityGroup = {
  label: string;
  summary: string;
  items: { title: string; detail: string }[];
};

export type PracticeJourneyStep = {
  title: string;
  description: string;
  focus: string;
};

export type PracticeFaq = {
  question: string;
  answer: string;
};

export type PracticePageContent = {
  heroLead: string;
  overviewHeading: string;
  overview: string[];
  principle: string;
  capabilityIntro: string;
  capabilityGroups: PracticeCapabilityGroup[];
  journeyIntro: string;
  journey: PracticeJourneyStep[];
  faqs: PracticeFaq[];
};

export const PRACTICE_PAGE_CONTENT: Record<string, PracticePageContent> = {
  "commercial-litigation": {
    heroLead:
      "Representation in all courts, formal arbitration and other appropriate legal forums, with strategy shaped around the commercial objective behind the dispute.",
    overviewHeading: "A clear strategy for consequential disputes.",
    overview: [
      "A commercial dispute can place pressure on cash flow, management time, business relationships and reputation. Our starting point is to understand the transaction behind the disagreement, the evidence available and the outcome the client needs to pursue.",
      "We then assess the issues, potential exposure and appropriate forum. The work may involve urgent or interlocutory applications, formal arbitration, court proceedings, contract enforcement or a negotiated resolution. Each step is considered in the context of the client's wider commercial position.",
      "The practice represents corporates, financial institutions and public bodies in banking and finance disputes, construction claims, insurance coverage, contract enforcement, shareholder conflicts and franchise disputes.",
    ],
    principle:
      "A dispute strategy should be legally grounded, evidence-led and connected to the commercial decision the client ultimately needs to make.",
    capabilityIntro:
      "Explore the principal areas of the practice. The right combination of forum, procedure and resolution strategy depends on the facts of each mandate.",
    capabilityGroups: [
      {
        label: "Forums & procedure",
        summary: "Choosing and preparing the appropriate legal route.",
        items: [
          { title: "Representation in all courts and appropriate legal forums", detail: "Representation is considered in light of the dispute, available remedies, procedural requirements and the forum best suited to the issues." },
          { title: "Formal arbitration proceedings", detail: "Preparation and representation in formal arbitration, including the management of pleadings, evidence, hearings and post-hearing steps." },
          { title: "Urgent and interlocutory applications", detail: "Focused procedural work where interim relief, preservation of rights or a decision on a discrete issue is required." },
        ],
      },
      {
        label: "Commercial claims",
        summary: "Disputes arising from finance, projects and business contracts.",
        items: [
          { title: "Banking and financial disputes", detail: "Disputes involving lending arrangements, facility obligations, security and the enforcement of commercial finance agreements." },
          { title: "Construction and engineering claims", detail: "Claims involving project obligations, variations, performance, payment and final-account disagreements." },
          { title: "Commercial contract enforcement", detail: "Advice and proceedings concerning contractual performance, breach, remedies and recovery under commercial agreements." },
          { title: "Insurance coverage litigation", detail: "Disputes concerning policy interpretation, coverage positions and the obligations arising from insurance arrangements." },
        ],
      },
      {
        label: "Ownership & resolution",
        summary: "Protecting commercial positions and pursuing workable outcomes.",
        items: [
          { title: "Shareholder and joint-venture disputes", detail: "Disputes involving governance, control, contractual rights, financial interests and the operation of business ventures." },
          { title: "Franchise agreement disputes", detail: "Advice and representation in disputes concerning franchise agreements, brand obligations and commercial network relationships." },
          { title: "Complex commercial settlements", detail: "Negotiated resolution is considered alongside formal proceedings where a settlement may serve the client's commercial objectives." },
        ],
      },
    ],
    journeyIntro:
      "Every matter is different. This framework illustrates the questions that help organise a dispute mandate, rather than promising a fixed sequence or outcome.",
    journey: [
      { title: "Understand the objective", description: "Clarify the commercial issue, the parties involved, the desired outcome and the practical consequences of unresolved risk.", focus: "Commercial context" },
      { title: "Assess the evidence", description: "Review the available information, contractual position, procedural considerations and potential exposure before recommending a course of action.", focus: "Evidence & exposure" },
      { title: "Select the route", description: "Consider the appropriate court, formal arbitration or other legal forum, then prepare the pleadings, applications and supporting material required.", focus: "Forum & preparation" },
      { title: "Pursue resolution", description: "Advance the matter through the agreed process while assessing negotiation, settlement and other commercially practical resolution options.", focus: "Action & resolution" },
    ],
    faqs: [
      { question: "Can the firm be approached before proceedings have started?", answer: "Yes. An initial discussion can help identify the nature of the dispute, the immediate issues and the information needed for a proper assessment. Any formal advice or representation is subject to conflict screening and an agreed mandate." },
      { question: "Does the practice handle formal arbitration as well as court proceedings?", answer: "The practice's stated scope includes representation in all courts, formal arbitration and other appropriate legal forums. The suitable process depends on the agreement, dispute and applicable procedural requirements." },
      { question: "What should I include in an initial enquiry?", answer: "Provide your contact details and a short, non-confidential description of the issue and the parties involved. Do not send pleadings, contracts, privileged advice or other confidential documents until the firm has completed conflict screening and confirmed how information should be shared." },
      { question: "Can a dispute be resolved without a hearing?", answer: "Negotiation and settlement may be considered where appropriate. Whether that route is suitable depends on the facts, the parties' positions and the client's objectives." },
    ],
  },

  "real-estate-development": {
    heroLead:
      "Legal development, packaging and advisory support across the project life cycle, from land acquisition and land-use strategy to structuring, approvals, finance and delivery.",
    overviewHeading: "Bring the legal parts of a development together.",
    overview: [
      "A development is shaped by a series of connected decisions: the land being acquired, the rights attached to it, the ownership and delivery structure, the approvals required and the funding available. A weakness in one part can affect the viability of the whole project.",
      "The practice works across these legal workstreams to help developers, landowners, housing institutions and public bodies build a coherent project package. This includes acquisition agreements, joint-venture frameworks, feasibility assessments, land-use processes, housing-related requirements and development finance documentation.",
      "The work is informed by the firm's stated property-development and finance experience. Legal documentation is approached with attention to project structure, delivery responsibilities, funding conditions and the practical requirements of implementation.",
    ],
    principle:
      "A development file should connect land rights, project structure, approvals and finance into one coherent legal framework.",
    capabilityIntro:
      "Development mandates can begin at different points. Select a workstream to explore the legal support available across the project life cycle.",
    capabilityGroups: [
      {
        label: "Land & feasibility",
        summary: "Understand the site, the rights and the project proposition.",
        items: [
          { title: "Land assembly and acquisition agreements", detail: "Legal structuring and documentation for land assembly, acquisitions and the contractual steps required to secure a site." },
          { title: "Legal feasibility assessments and cost modelling", detail: "Assessment of legal and regulatory considerations that may affect project viability, development assumptions and implementation costs." },
          { title: "Township establishment, rezoning and land-use rights", detail: "Support with land-use strategy and the legal processes associated with township establishment, rezoning and securing development rights." },
        ],
      },
      {
        label: "Structuring & approvals",
        summary: "Align ownership, delivery roles and regulatory requirements.",
        items: [
          { title: "Joint venture legal frameworks", detail: "Documentation of landowner and developer relationships, responsibilities, governance arrangements and agreed commercial structures." },
          { title: "NHBRC enrolment", detail: "Legal support connected to enrolment requirements and the project documentation needed for applicable residential development processes." },
          { title: "SHRA and subsidised housing schemes", detail: "Legal packaging and documentation for social and subsidised housing schemes, including relevant institutional and regulatory requirements." },
          { title: "Municipal infrastructure packaging", detail: "Legal coordination of infrastructure-related project arrangements and supporting agreements with relevant project stakeholders." },
        ],
      },
      {
        label: "Finance & delivery",
        summary: "Prepare project documentation for funding and implementation.",
        items: [
          { title: "Bank and DFI development finance applications", detail: "Preparation and coordination of legal documentation supporting development finance applications to banks and development finance institutions." },
          { title: "End-user mortgage packaging", detail: "Legal packaging that connects qualifying end-user finance requirements with the broader development and transfer process." },
          { title: "Real estate development advisory", detail: "Ongoing legal input across acquisition, structuring, approvals, financing and project delivery as the mandate requires." },
        ],
      },
    ],
    journeyIntro:
      "The project's stage determines where legal input is most useful. These four lenses help frame the work from early land decisions through to implementation.",
    journey: [
      { title: "Test the proposition", description: "Consider the site, land rights, acquisition terms and legal or regulatory factors that may influence project feasibility.", focus: "Land & viability" },
      { title: "Structure the project", description: "Document ownership, joint-venture relationships, roles, obligations and the legal framework for delivery.", focus: "Ownership & roles" },
      { title: "Coordinate approvals", description: "Identify the relevant land-use, municipal, housing and sector requirements and organise the supporting legal workstreams.", focus: "Rights & approvals" },
      { title: "Align finance & delivery", description: "Bring funding documentation, project obligations and implementation requirements into a coordinated legal package.", focus: "Funding & delivery" },
    ],
    faqs: [
      { question: "At what stage can the practice become involved in a development?", answer: "The practice's stated scope spans acquisition, feasibility, project structuring, land-use rights, approvals, development finance and delivery. The appropriate starting point depends on the project's stage and the assistance required." },
      { question: "Can the firm assist with joint ventures between landowners and developers?", answer: "Joint-venture legal frameworks form part of the practice's stated services. The scope may include documenting the parties' roles, obligations, governance and agreed commercial arrangements." },
      { question: "Does the practice assist with housing-related development requirements?", answer: "The stated services include NHBRC enrolment, SHRA and subsidised housing schemes, as well as bank and DFI development finance applications. The specific requirements depend on the project and relevant institutions." },
      { question: "What information is useful for an initial development discussion?", answer: "A short, non-confidential project summary, the property's general location, the current project stage and the type of legal support being considered are useful starting points. Do not send confidential transaction documents before conflict screening and the firm's instructions." },
    ],
  },

  "mining-resources": {
    heroLead:
      "Focused legal support for the financing, mineral-rights, land-access and community arrangements connected to mining operations.",
    overviewHeading: "Commercial clarity around mining-adjacent matters.",
    overview: [
      "Mining-related transactions often involve more than the operating asset. Finance and security arrangements, mineral-rights interests, surface access, land-use agreements and community commitments can each affect how a project proceeds.",
      "The practice focuses on these commercial and legal interfaces. Its stated work includes mining finance and debt security, mineral-rights transfers and registrations, surface-rights access, Community and Social Labour Plan agreements and disputes connected to mining-adjacent contracts.",
      "This is a focused support offering around the legal arrangements that sit alongside mining operations. The work is informed by the director's stated mining-law and resources certificates, while each instruction remains grounded in the rights, parties and regulatory context of the particular matter.",
    ],
    principle:
      "Mining-adjacent legal work must account for the relationship between rights, land access, finance and the people affected by a project.",
    capabilityIntro:
      "Explore the legal workstreams that can arise around a mining operation, asset or transaction.",
    capabilityGroups: [
      {
        label: "Rights & land access",
        summary: "Clarify the rights and agreements that support access and use.",
        items: [
          { title: "Mineral-rights transfers and registrations", detail: "Legal documentation and registration work connected to transfers of mineral rights and related interests." },
          { title: "Surface-rights access and land-use agreements", detail: "Negotiation and documentation of access and land-use arrangements involving landowners and other relevant stakeholders." },
        ],
      },
      {
        label: "Finance & security",
        summary: "Document the funding and security architecture around a resource project.",
        items: [
          { title: "Mining finance and debt security instruments", detail: "Legal support for finance arrangements and the security instruments used to support mining-adjacent commercial obligations." },
          { title: "Mine development financing structures", detail: "Structuring and documentation support for finance arrangements connected to mine development and related commercial activities." },
        ],
      },
      {
        label: "Community & contracts",
        summary: "Address community commitments and commercial obligations.",
        items: [
          { title: "Community and Social Labour Plan agreements", detail: "Drafting and structuring of agreements documenting community commitments associated with Social and Labour Plan obligations." },
          { title: "Mining-adjacent contract disputes", detail: "Advice and dispute support concerning commercial agreements connected to services, access and other mining-adjacent arrangements." },
        ],
      },
    ],
    journeyIntro:
      "The precise work depends on the project and the rights involved. These stages provide a practical way to frame the legal questions.",
    journey: [
      { title: "Map the interests", description: "Identify the rights, assets, contracting parties, land interests and community stakeholders relevant to the instruction.", focus: "Rights & stakeholders" },
      { title: "Structure the arrangements", description: "Consider how access, finance, security and contractual responsibilities should be documented.", focus: "Commercial structure" },
      { title: "Document commitments", description: "Prepare the relevant transfer, security, access, community or contractual documentation for the matter.", focus: "Documentation" },
      { title: "Support implementation", description: "Attend to the agreed registration, negotiation or dispute-related work required by the instruction.", focus: "Execution & follow-through" },
    ],
    faqs: [
      { question: "Does the practice focus on mining operations themselves?", answer: "The practice describes its focus as the legal and commercial arrangements around mining operations, including finance, mineral rights, surface access, community agreements and mining-adjacent contracts." },
      { question: "Can the firm assist with surface access arrangements?", answer: "Surface-rights access and land-use agreements form part of the stated scope. The relevant parties, land interests and applicable requirements need to be assessed for each instruction." },
      { question: "Does the practice handle mineral-rights transfers?", answer: "The stated services include mineral-rights transfers and registrations, subject to the rights, documents and regulatory requirements relevant to the transaction." },
      { question: "What should be included in an initial enquiry?", answer: "A brief, non-confidential outline of the project or transaction, the type of right or agreement involved and your contact details are a useful starting point. Please do not share confidential documents before conflict screening." },
    ],
  },

  "agricultural-finance": {
    heroLead:
      "Legal support for agricultural lending, farm and movable-asset security, agri-finance structuring and commercial debt workouts.",
    overviewHeading: "Finance and security shaped around agricultural assets.",
    overview: [
      "Agricultural finance has its own commercial and asset considerations. Land, equipment, biological assets, seasonal operating cycles and the continuity of a farming enterprise all inform the way a finance or recovery matter should be approached.",
      "The practice's work includes mortgage bonds over agricultural land, notarial bonds over movable and biological assets, specialised agri-loan structuring, lender security packaging, debt recoveries and workouts. Documentation is approached with attention to the asset being secured and the requirements of the lender or borrower.",
      "The practice is informed by the director's stated experience handling Land Bank legal matters during tenure at AFGRI. That background supports a practical understanding of agricultural lending workflows and the importance of accurate, properly prepared security documentation.",
    ],
    principle:
      "The security structure should reflect the agricultural asset, the finance arrangement and the operating realities of the enterprise.",
    capabilityIntro:
      "Select a workstream to see how the practice's agricultural finance services fit together.",
    capabilityGroups: [
      {
        label: "Land & asset security",
        summary: "Document security over agricultural land and movable assets.",
        items: [
          { title: "Mortgage bonds over farm land", detail: "Preparation and registration of mortgage bond security over agricultural and commercial farming land." },
          { title: "Notarial bonds over movables and biological assets", detail: "Documentation and registration of notarial security over qualifying movable assets and biological assets." },
          { title: "Security audits for lender portfolios", detail: "Review of existing security records and related documentation to help identify gaps requiring attention." },
        ],
      },
      {
        label: "Agri-finance structuring",
        summary: "Connect lending requirements with fit-for-purpose documentation.",
        items: [
          { title: "Specialised agri-loan structuring", detail: "Legal input into lending arrangements that reflect the nature of the agricultural enterprise and the proposed finance." },
          { title: "Agri-lender credit security packaging", detail: "Preparation and coordination of the security documentation supporting agricultural credit facilities." },
          { title: "Land Bank legal panel execution", detail: "The practice lists Land Bank panel execution among its services, drawing on the director's stated prior experience with Land Bank legal matters at AFGRI." },
        ],
      },
      {
        label: "Workouts & recovery",
        summary: "Address distressed facilities with the underlying business in view.",
        items: [
          { title: "Debt recoveries and workouts", detail: "Legal support for recovery and workout processes involving agricultural lending and related security." },
          { title: "Commercial farming debt restructuring", detail: "Restructuring support that considers lender exposure alongside the operating requirements and continuity of the farming enterprise." },
        ],
      },
    ],
    journeyIntro:
      "A considered agricultural finance instruction looks beyond the facility document to the assets, security and operating context.",
    journey: [
      { title: "Understand the facility", description: "Clarify the lending purpose, borrower structure, repayment position and the commercial context of the agricultural operation.", focus: "Facility & context" },
      { title: "Review the security", description: "Identify the land, equipment or other assets involved and consider the documentation and registration requirements.", focus: "Asset & security" },
      { title: "Prepare the package", description: "Coordinate the facility, bond and supporting documents needed for the agreed finance or security transaction.", focus: "Documentation" },
      { title: "Manage the next step", description: "Support registration, reporting, recovery or restructuring work as required by the mandate.", focus: "Execution & workout" },
    ],
    faqs: [
      { question: "What types of agricultural security does the practice work with?", answer: "The stated scope includes mortgage bonds over farm land and notarial bonds over movable and biological assets. The appropriate structure depends on the assets, finance and applicable requirements." },
      { question: "Can the firm assist lenders as well as borrowers?", answer: "The practice identifies agricultural lenders, private agri-lenders and commercial farming enterprises among its client groups. The scope of an instruction is agreed after the parties and potential conflicts have been considered." },
      { question: "Does the practice handle agricultural debt workouts?", answer: "Debt recoveries, workouts and commercial farming debt restructuring are included in the practice's stated services. The options available in a particular matter depend on the facility, security and commercial circumstances." },
      { question: "What information helps with an initial enquiry?", answer: "A short, non-confidential outline of the facility, the type of agricultural asset involved and the broad assistance required will help frame an initial discussion. Do not send loan agreements, security documents or confidential borrower information before conflict screening." },
    ],
  },

  "banking-finance": {
    heroLead:
      "Finance documentation, security structures, debt recovery and restructuring support for lenders, credit providers and corporate borrowers.",
    overviewHeading: "Make the finance structure work beyond signature.",
    overview: [
      "Commercial finance depends on more than the facility agreement. The quality of the security package, the relationships between creditors, the conditions for drawdown and the options available when a facility becomes distressed all matter to the transaction.",
      "The practice structures and documents commercial debt facilities, property and development finance, intercreditor arrangements and multi-tiered security. It also advises on debt workouts and corporate financial restructurings, with attention to how the documents operate in practice.",
      "The practice also assists with debt collection and recovery processes relating to vehicle and asset finance, as well as home-loan finance. Its stated approach emphasises structured enforcement, clear reporting and commercially practical recovery strategies, without treating any particular recovery outcome as guaranteed.",
    ],
    principle:
      "Finance documents should connect the commercial bargain, the security position and the steps available if the relationship changes.",
    capabilityIntro:
      "The practice supports finance mandates at origination, during the life of a facility and when recovery or restructuring is required.",
    capabilityGroups: [
      {
        label: "Facilities & security",
        summary: "Build the legal framework behind lending and development finance.",
        items: [
          { title: "Loan facility agreements", detail: "Drafting and negotiation of facility terms, conditions, undertakings and repayment obligations." },
          { title: "Intercreditor agreements", detail: "Documentation of the rights, priorities and coordination arrangements between creditors in a financing structure." },
          { title: "Multi-tiered security packages", detail: "Coordination of different security instruments and supporting documents to reflect the agreed finance structure." },
          { title: "Commercial property and development loans", detail: "Legal support for commercial property and development finance arrangements, including related debt packaging." },
        ],
      },
      {
        label: "Debt collection & recovery",
        summary: "Structured processes for vehicle, asset and home-loan finance matters.",
        items: [
          { title: "Debt collection relating to vehicle and asset finance", detail: "Assistance with collection and recovery processes arising from vehicle and asset finance facilities, with reporting aligned to the mandate." },
          { title: "Debt collection relating to home-loan finance", detail: "Assistance with home-loan finance debt collection and recovery processes, having regard to the facility, security and applicable enforcement steps." },
          { title: "Financial recovery workouts", detail: "Recovery-focused legal support that considers enforcement options, negotiated solutions and the commercial position of the parties." },
        ],
      },
      {
        label: "Workouts & restructuring",
        summary: "Revisit distressed facilities and corporate debt arrangements.",
        items: [
          { title: "Debt workouts", detail: "Structured engagement around distressed finance obligations and the legal options available to the parties." },
          { title: "Corporate financial restructurings", detail: "Legal documentation and negotiation support for changes to corporate debt and related financial arrangements." },
          { title: "Development debt packaging", detail: "Coordination of legal finance documentation for development-related debt and supporting security." },
        ],
      },
    ],
    journeyIntro:
      "The work changes as a facility moves from structuring to enforcement or restructuring. These stages help show how the practice approaches that lifecycle.",
    journey: [
      { title: "Define the exposure", description: "Understand the facility, parties, commercial objective, repayment obligations and risk allocation.", focus: "Facility & risk" },
      { title: "Design the structure", description: "Prepare or assess the agreements, creditor arrangements and security package required for the transaction.", focus: "Documents & security" },
      { title: "Manage performance", description: "Address implementation, reporting and emerging issues during the life of the finance arrangement.", focus: "Monitoring & action" },
      { title: "Recover or restructure", description: "Consider collection, enforcement, negotiated workouts or corporate restructuring in light of the facts and applicable requirements.", focus: "Recovery & resolution" },
    ],
    faqs: [
      { question: "Does the practice assist with vehicle and asset finance debt collection?", answer: "Yes. The practice's stated services include debt collection relating to vehicle and asset finance, alongside other banking and finance work." },
      { question: "Does the practice also handle home-loan finance recovery?", answer: "Yes. Home-loan finance debt collection and recovery processes are included in the updated practice scope. The steps available in a particular matter depend on the facility, security and applicable legal requirements." },
      { question: "Can the firm assist at the facility-drafting stage?", answer: "The stated scope includes loan facility agreements, intercreditor agreements, multi-tiered security packages and commercial property and development loans." },
      { question: "What should be provided for an initial finance enquiry?", answer: "A brief, non-confidential summary of the type of facility, the parties involved and the assistance required is a useful start. Please do not email loan agreements, account statements or confidential borrower information before conflict screening and confirmation from the firm." },
    ],
  },

  "conveyancing-property": {
    heroLead:
      "Property transfers, mortgage bond registrations and acquisition advisory supported by land audits, land-rights due diligence and town-planning insight.",
    overviewHeading: "Careful property work, from investigation to registration.",
    overview: [
      "Property transactions depend on clear title, correctly prepared documents and coordinated steps between the parties, financiers, relevant authorities and the deeds registry. The details matter, particularly where a transaction involves an institution, a development or a complex property interest.",
      "The practice handles commercial and residential transfers, mortgage bond registrations, sectional title and township registers, institutional portfolio conveyancing and notarial work. Its processes are designed to support matter-level visibility, proactive correspondence and accurate registration documentation.",
      "The practice also advises on acquisitions involving schools, parcels or premises, hospitals and places of religious worship. Its broader property work includes land audits, land-rights due diligence and town-planning advisory to help clients understand property and land-use considerations before committing to a transaction.",
    ],
    principle:
      "A sound property decision begins with understanding the rights, restrictions and registration steps attached to the land or property.",
    capabilityIntro:
      "Explore the practice's work across conveyancing execution, institutional property portfolios and pre-acquisition advisory.",
    capabilityGroups: [
      {
        label: "Transfers & registration",
        summary: "Move property transactions through the required legal steps.",
        items: [
          { title: "Commercial and residential property transfers", detail: "Conveyancing work for the transfer of commercial and residential properties, from transaction documentation through registration." },
          { title: "Mortgage bond registrations for banking panels", detail: "Preparation and registration of mortgage bonds in accordance with the relevant lender and deeds-registry requirements." },
          { title: "Sectional title register openings", detail: "Legal and conveyancing work connected to the opening of sectional title registers for qualifying developments." },
          { title: "Township conveyancing registers", detail: "Conveyancing support for township registers and the related registration requirements." },
          { title: "Notarial executions and notarial bonds", detail: "Preparation and execution of notarial documents and bonds as required by the transaction." },
        ],
      },
      {
        label: "Institutional portfolios",
        summary: "Coordinate property instructions that involve multiple assets or stakeholders.",
        items: [
          { title: "Institutional property portfolio conveyancing", detail: "Coordinated conveyancing for institutional property holdings and portfolio transactions." },
          { title: "High-volume bond registration capacity", detail: "Matter tracking and registration workflows designed for volume while retaining visibility over individual instructions." },
          { title: "Deeds office performance tracking", detail: "Progress monitoring and communication around lodgement, requisitions and registration milestones." },
        ],
      },
      {
        label: "Acquisition & due diligence",
        summary: "Understand the property and its rights before a transaction proceeds.",
        items: [
          { title: "Advisory on acquisitions of schools, parcels or premises, hospitals and places of religious worship", detail: "Property acquisition advice for the identified institutional and community-use categories, with scope shaped by the asset and transaction." },
          { title: "Land audits and land-rights due diligence", detail: "Review of land records, rights and relevant property information to support informed acquisition and development decisions." },
          { title: "Town-planning advisory", detail: "Legal advisory on town-planning and land-use considerations relevant to a property or proposed transaction." },
        ],
      },
    ],
    journeyIntro:
      "A well-managed property instruction connects the initial investigation with the final registration and reporting steps.",
    journey: [
      { title: "Investigate the property", description: "Clarify the property, parties, title position, land rights and any due-diligence questions relevant to the instruction.", focus: "Title & rights" },
      { title: "Plan the transaction", description: "Identify the transaction documents, approvals, finance requirements and registration steps that may apply.", focus: "Structure & approvals" },
      { title: "Prepare & lodge", description: "Coordinate the conveyancing and notarial documentation required for the agreed transaction and lodgement process.", focus: "Documents & lodgement" },
      { title: "Track & report", description: "Monitor milestones, address registration requirements and keep relevant parties informed through to completion.", focus: "Registration & reporting" },
    ],
    faqs: [
      { question: "Does the practice only handle property transfers?", answer: "No. Its stated scope also includes mortgage bond registrations, sectional title and township registers, institutional portfolio conveyancing, notarial work, acquisition advisory, land audits, land-rights due diligence and town-planning advisory." },
      { question: "Can the firm advise on acquiring a school, hospital or place of religious worship?", answer: "The practice's updated scope expressly includes advisory on acquisitions of schools, parcels or premises, hospitals and places of religious worship. The work required will depend on the property and proposed transaction." },
      { question: "What is included in land-rights due diligence?", answer: "The practice can consider land records, rights and relevant property information as part of an agreed review. The scope and documents required depend on the specific land and the questions the client needs answered." },
      { question: "Can the firm give a guaranteed registration date?", answer: "Registration timing depends on the transaction, the documents, the parties and the relevant registry processes. The practice can explain the expected steps and provide progress communication, but should not promise a date before the matter has been assessed." },
    ],
  },
};
