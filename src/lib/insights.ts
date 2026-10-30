/* Insights editorial content — articles, updates and case notes. */

export type Article = {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  excerpt: string;
  body: string[];
  featured?: boolean;
};

export const ARTICLES: Article[] = [
  {
    slug: "enforcing-commercial-contracts-high-court",
    title: "Enforcing commercial contracts in the High Court: what boards should know before issuing",
    category: "Commercial Litigation & Arbitration",
    categorySlug: "commercial-litigation",
    date: "2026-10-12",
    readTime: "6 min read",
    excerpt:
      "Before a summons is drafted, directors should interrogate five questions: remedy, forum, security, costs and timing. Getting them right determines whether enforcement is a lever — or a liability.",
    featured: true,
    body: [
      "When a counterparty defaults, the instinct is to litigate immediately. The discipline boards should demand first is a five-question interrogation — because in commercial enforcement, strategy decided at the outset matters more than eloquence in court months later.",
      "First: what remedy do you actually need? Specific performance, cancellation with damages, an interdict, or a declaratory order each carry different evidentiary burdens and different commercial consequences. A lender usually wants accelerated repayment secured by recoverable assets; a franchisor may want the infringing use stopped by Friday. Choosing the wrong remedy is the most expensive error in commercial litigation.",
      "Second: which forum? The High Court offers precedent-setting remedies such as interim interdicts and attachment, and its judgments are enforceable against property without further steps. AFSA arbitration offers confidentiality, party-appointed arbitrators with sector knowledge, and usually greater speed — but limited recourse for interim relief in third-party hands. Well-drafted arbitration clauses preserve both worlds; poorly drafted ones invite jurisdictional skirmishes that consume the first year of the dispute.",
      "Third: what security sits behind the claim? Before issuing, map the debtor's asset position — bonds, notarial securities, cessions and suretyships — and whether urgent interim relief is needed to prevent dissipation. Litigation against an empty shell is a pyrrhic art. Where security exists, alignment between the enforcement action and the bond registry timetable should be planned at the outset.",
      "Fourth: what will costs realistically be, and can they be recovered? Cost orders follow the result, not the invoice. Boards should require a phased budget — pleadings, discovery, trial — with decision gates at each phase, and settlement frameworks negotiated while leverage still exists. Most commercial disputes in Gauteng settle once discovery exposes both parties' real positions; parties that plan for that moment recover value earlier.",
      "Fifth: what does the relationship need to look like afterwards? Enforcement that destroys a recoverable trading relationship may be worse than a structured workout. The best commercial litigators are those who can toggle between courtroom leverage and negotiated exit — and who advise the board, candidly, which mode the matter is in.",
      "Kgariya Inc.'s litigation practice runs mandates on precisely this architecture: strategy scoping before issuing, forum analysis, security mapping, phased budgeting with decision gates, and settlement readiness. It is how disputes become levers rather than liabilities.",
    ],
  },
  {
    slug: "township-development-legal-roadmap",
    title: "From land assembly to capital close: a legal roadmap for township development",
    category: "Real Estate Development Packaging",
    categorySlug: "real-estate-development",
    date: "2026-09-28",
    readTime: "8 min read",
    excerpt:
      "A residential development is not one transaction — it is a chain of a dozen legal instruments that must register in the right order. Here is the roadmap our development packaging practice runs.",
    featured: true,
    body: [
      "Ask a developer what killed their last project and the answer is rarely the market. It is sequencing: the services agreement signed before the land was secured; the finance application submitted without a clean title chain; the NHBRC enrolment left until the lender asked for it. Township development is a chain of legal instruments, and the chain registers in the order the deeds office, the municipality and the lender demand — not the order convenience suggests.",
      "Phase one is land assembly. Options, purchase agreements with suspensive conditions, and joint-venture frameworks must be structured so that town planning risk sits with the right party during the right window. Where land is acquired through a JV, profit-share waterfalls and township obligations should be documented before the rezoning application — not negotiated in the shadow of a failing programme.",
      "Phase two is rights. Township establishment, rezoning and land-use rights run through municipal and, where applicable, provincial processes. The legal work here is drafting and negotiating conditions of establishment that a lender can underwrite and a contractor can build under — services levels, engineering services agreements, and land availability or installation commitments aligned with the sales programme.",
      "Phase three is regulatory packaging. NHBRC enrolment, SHRA or subsidised housing compliance where the scheme calls for it, and environmental or heritage conditions attached to the approval. Each of these generates documents the lender's credit committee will want to see in a specific form; collecting them early is what makes a finance application read as bankable.",
      "Phase four is capital close. Development finance applications to banks and DFIs are legal packaging exercises: facility agreements, mortgage bonds, multi-tiered security (which may include notarial bonds over movable construction assets and cessions of contracting rights), and conditions precedent that must be satisfied in a registrable sequence. End-user finance packaging — the resale bonds that convert approved townships into realised sales — should be arranged in parallel, because capital close and sales velocity are the same conversation to a credit committee.",
      "Phase five is registration and handover. Township registers, sectional title registers where applicable, individual transfers and bond registrations, all flowing through the deeds office on programme. Conveyancing capacity is not an afterthought here; it is the exit door of the entire structure.",
      "The lesson from our development packaging mandates — and from our director's years running a property company — is that legal packaging is project management. A development file that reads cleanly at capital close was designed to read cleanly from the day the first option was signed.",
    ],
  },
  {
    slug: "security-packages-banks-accept",
    title: "Security packages banks actually accept: a checklist for lenders and borrowers",
    category: "Banking & Finance",
    categorySlug: "banking-finance",
    date: "2026-09-09",
    readTime: "5 min read",
    excerpt:
      "Credit committees approve stories; security packages secure them. The anatomy of a multi-tiered security structure that survives both registration and enforcement.",
    body: [
      "Every finance application is a negotiation between a story and a security package. The story lives in the business plan; the security lives in the documents. Credit committees approve stories, but they advance money against security — and the difference between a facility that draws on time and one that stalls in conditions precedent is usually the quality of the security architecture.",
      "A robust commercial security package is multi-tiered by design. The primary layer is the mortgage bond over immovable property — commercial, residential or agricultural — drafted to cover not only the capital amount but the full contingent exposure: interest, costs and future advances where the facility allows. The secondary layer captures movable assets through notarial bonds (general and special), and, where company law permits, security cessions of debtors' books, contracting rights, insurance proceeds and rental streams.",
      "The connective tissue matters as much as the layers. Intercreditor agreements govern priority where more than one lender is exposed. Suretyships must be drafted with an eye to the Ilerhu and related jurisprudence on surety formalities and spousal consent. Cessions must be perfected — actual delivery of the secured right — or they are worth little on enforcement day. A security package is only as strong as its weakest perfection step.",
      "For borrowers, the same anatomy is a negotiating checklist. Conditions precedent should be achievable and dated; cross-default and cross-cession clauses should be mapped so one trigger does not cascade through unrelated facilities; and negative pledges should be scoped to future capital-raising plans rather than discovered at the next raise.",
      "For lenders, panel-readiness is operational: conflict protocols, trust account discipline, registration timelines at the deeds office, and reporting that a panel assessor can verify. Kgariya Inc.'s banking and finance practice builds both sides of this table — facilities and security for lenders, negotiation and restructuring for borrowers — because workouts are easier to avoid when the documents were drafted by people who have had to enforce them.",
    ],
  },
  {
    slug: "surface-rights-slp-agreements",
    title: "Surface rights and SLP agreements: getting mining-adjacent land access right",
    category: "Mining & Resources (Mining-Adjacent)",
    categorySlug: "mining-resources",
    date: "2026-08-21",
    readTime: "6 min read",
    excerpt:
      "The mining right is only half the legal picture. Surface access, landowner agreements and community commitments under Social and Labour Plans determine whether operations actually proceed.",
    body: [
      "A mining right authorises mining. It does not, by itself, quiet every legal question that stops a machine from moving. Between the granting of the right and the first blast sits a layer of mining-adjacent law — surface rights, landowner agreements, servitudes, and community commitments under Social and Labour Plans — where projects are won or lost.",
      "Surface rights access is fundamentally a negotiation with layered counterparties: landowners, lawful occupiers, community trusts and traditional authorities. Well-drafted access agreements deal with compensation methodology (fixed, per-hectare, crop-damage or royalty-linked), access windows, rehabilitation obligations, and — critically — the governance mechanics for resolving disputes without halting operations. Agreements that are silent on dispute mechanics convert every disagreement into a production risk.",
      "Social and Labour Plans add a statutory layer. SLP commitments — local employment, procurement, infrastructure and skills development — are not corporate philanthropy; they are conditions of the mining right with regulatory consequences. The legal craft is drafting the implementing agreements (with municipalities, contractors and community structures) so that commitments are funded, verifiable and auditable, and so that changes in the mining plan do not render the SLP framework unperformable.",
      "Mineral rights transactions add their own conveyancing discipline. Transfers and registrations of mineral rights, prospecting rights and mining rights — including the notarial execution and registration steps — must be sequenced with the commercial transaction, finance security and land tenure arrangements. A resource deal that ignores the registration chain is an escrow waiting to fail.",
      "Our mining-adjacent practice operates precisely in this layer: mining finance and security instruments, mineral rights conveyancing, surface rights and land access agreements, and SLP legal frameworks — supported by the director's Wits mining law certification. The measure of success is simple: operations proceed, communities are honoured, and no dispute becomes a stoppage.",
    ],
  },
  {
    slug: "notarial-bonds-movables-agri-finance",
    title: "Notarial bonds over movables: unlocking agri-finance beyond the land",
    category: "Agricultural & Development Finance",
    categorySlug: "agricultural-finance",
    date: "2026-08-05",
    readTime: "5 min read",
    excerpt:
      "Farm land gets the attention; farm movables carry the cash flow. How general and special notarial bonds over equipment, livestock and crops complete an agri-lender's security.",
    body: [
      "In agricultural finance, the land is the headline security — but the movables are the cash flow. Tractors, implements, irrigation equipment, livestock, crops in the field and yield under offtake agreements: a lender that secures only the farm holds a static asset while the working assets generate and dissipate value seasonally.",
      "The notarial bond is the instrument that reaches these assets. A general notarial bond over movables provides security across a defined class of the debtor's movable assets; a special notarial bond targets specified, identifiable property. Both must be executed before a notary and registered within the statutory period to perfect the security — and the description of assets must be drafted with enforcement in mind, not just description.",
      "Biological assets deserve special care. Livestock and crops change, consume, perish and multiply. Well-drafted agri-security anticipates replacement of stock, proceeds of sale, insurance cessions, and the practical mechanics of a harvest-time enforcement — including the interaction with the Agricultural Produce Agents Act where agents are involved in sales.",
      "For the Land Bank and agri-lenders running panel mandates, the discipline is procedural: bond registration timelines, deeds registry practice for notarial bonds, and security audits that catch un-perfected cessions and lapsed registrations before they become recovery problems. For farming enterprises, the same documents read differently — as covenants that constrain future financing — which is why negotiating scope at the outset matters.",
      "Kgariya Inc.'s agricultural finance practice sits at this intersection. Our director handled Land Bank legal matters at AFGRI, and the practice drafts, registers and audits notarial bonds and mortgage security for agri-lenders and commercial farming enterprises — because in agri-finance, security that is perfected on paper but not in practice is a seasonal liability of its own.",
    ],
  },
  {
    slug: "popia-compliance-law-firms",
    title: "POPIA in the enforcement era: what it means for law firms and their clients",
    category: "Firm & Compliance",
    categorySlug: "compliance",
    date: "2026-07-14",
    readTime: "7 min read",
    excerpt:
      "Legal practices hold some of the most sensitive personal information in the economy. With enforcement maturing, POPIA compliance is now a trust asset — and a competitive differentiator.",
    body: [
      "Law firms are, by design, collectors of the most sensitive categories of personal information the economy produces: financial records, dispute narratives, identity documents, employee data, credit histories. That reality makes legal practices a natural focus of the Information Regulator's attention — and it makes demonstrable POPIA governance a trust asset that institutional clients increasingly test before appointing panel firms.",
      "The foundational instruments are straightforward to state and demanding to operate. Firms must process personal information lawfully and with a defined purpose; they must secure it against loss and unauthorised access; they must honour data subject rights of access, correction and deletion within the statutory framework; and they must operate breach notification protocols with real, rehearsed timelines.",
      "For law firms, three operational areas carry the highest practical risk. First, intake: prospective clients routinely transmit confidential material before any mandate exists — which is why our intake channels carry explicit pre-mandate conflict-check warnings, protecting both the prospect and the firm's existing clients. Second, marketing: client names, matter values and outcomes may not be published without consent or public record, and LPC advertising rules layer additional discipline on top of POPIA. Third, vendor management: cloud practice-management, e-signature and communication tools are operators in the POPIA sense, and due diligence obligations travel with them.",
      "Institutional clients — banks, SOEs, government departments — now routinely request evidence of data governance as part of panel assessment. A published PAIA manual under section 51 of the Promotion of Access to Information Act, documented retention schedules, and consent-aware enquiry channels are no longer bureaucratic decorations; they are procurement-eligible proof.",
      "Our position is simple: data governance is part of the firm's trust architecture, in the same register as B-BBEE verification and LPC compliance. We publish our PAIA manual, operate POPIA-aligned enquiry and cookie consent on this website, and treat every personal record we hold as if the Regulator were the second reader — because one day, it may be.",
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export const CATEGORIES = [
  { name: "All", slug: "all" },
  { name: "Commercial Litigation & Arbitration", slug: "commercial-litigation" },
  { name: "Real Estate Development Packaging", slug: "real-estate-development" },
  { name: "Mining & Resources", slug: "mining-resources" },
  { name: "Agricultural & Development Finance", slug: "agricultural-finance" },
  { name: "Banking & Finance", slug: "banking-finance" },
  { name: "Firm & Compliance", slug: "compliance" },
];
