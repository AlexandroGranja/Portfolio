import { projects, type Project } from './projects';

// Product names are retained; descriptive project titles are localized.
const copy = [
  {
    title: 'Fortão Prêmios', category: 'Web platform',
    role: 'Full development · Frontend, backend and admin dashboard',
    imageCaption: 'Illustrative composition of the public and admin interfaces. Operational data has been replaced; no user information is shown. The campaign shown has ended.',
    summary: 'From the participant experience to the administration tools, I developed Fortão Prêmios from end to end.',
    imageAlt: 'Illustrative presentation of Fortão Prêmios on a laptop and phone, with no user data',
    problem: 'The platform connects ticket selection and campaign participation with day-to-day administration.',
    contribution: 'I developed the interface, backend and admin dashboard, including authentication, payments, invoice issuance and prize draw result processing.',
    outcome: 'The screens below show the main features, with personal and operational data replaced.',
    gallery: [
      ['The public experience', 'I organized the public experience around each campaign: the prize and key details come first, followed by ticket selection and the participation cost. I built the campaign showcase, detail pages and package selection with total price calculation, connecting these steps to the purchase flow. This structure introduces information as visitors move forward and adapts the navigation to desktop and mobile.', 'Public interface showing the campaign and additional prizes. The campaign shown has ended.'],
      ['One place to manage the operation', 'Alongside the participant experience, I developed the tools needed to administer the platform. I organized the dashboard around campaigns, customers, reports, invoices and prize draws, bringing their entry points together on one screen. I also separated image management and settings so that administrators can update site content through the system without changing the code each time.', 'Fortão admin quick actions, with eight shortcuts to administrative modules and no user data.'],
      ['Campaign management', 'I structured each campaign as a record containing the ticket price, ticket allocation, draw date, status and featured placement. I implemented creation, editing and search so administrators can maintain this information throughout the campaign. By connecting these records to the public showcase, I centralized content management in the dashboard, including control over which campaigns appear as featured.', 'Demo admin dashboard with operational figures and metrics replaced.'],
      ['Invoice management in one view', 'I connected invoice processing to payment confirmation: the system finds or creates the purchase record and checks whether an invoice has already been issued. When automatic issuance is enabled and configured, the integration signs the document with an A1 digital certificate and submits it to the Brazilian national NFS-e service. I also developed status checks, filters and exports so the team can investigate failures and review documents.', 'Demo NFS-e interface with metrics, date-range generation, filters and export; masked tax IDs and fictional records.'],
      ['From campaign to draw result', 'I split result processing into three steps: retrieving the reference result, calculating the campaign number and looking for a matching paid ticket. I implemented a modulo calculation using the first-prize number and the total number of entries, with specific handling for zero and consistent number formatting before comparison. The routine considers confirmed payments only and records a winner when it finds an exact match; otherwise, it returns no winner. Administrators select the campaign and start this process from the dashboard.', 'Demo draw results screen with a fictional campaign and an explanation of how the calculated number is compared with paid tickets.'],
    ], links: ['Visit project'],
  },
  {
    title: 'Roteiro Prosper', category: 'Internal tool', role: 'Full development · Interface, backend and route planning logic',
    imageCaption: 'Illustrative composition of the platform. The phone map shows a fictional route, with no customer data or locations.',
    summary: 'From customer records to visit routes, I developed a tool to support planning for Prosper’s field teams.',
    imageAlt: 'Illustrative presentation of Roteiro Prosper on a laptop and phone, with a fictional route map',
    problem: 'Organizing visits from a large customer database required combining geographic information and defining a visit sequence. The challenge was to turn these records into routes the team could review and plan with less manual work.',
    contribution: 'I handled the full development: interface, backend and route planning logic. I built map views, geographic data processing and customer grouping by proximity. To order visits, I used nearest-neighbor and 2-opt algorithms, connecting data processing to the routes displayed in the interface.',
    outcome: 'The tool supported route planning for Prosper’s field teams, bringing visit organization and geographic visualization together. I developed the project around a practical need in the company’s sales workflow.',
    gallery: [
      ['Planning visits', 'The home screen brings together file and route management. I organized the workflow around customer records and geographic information, keeping visit preparation and route review in the same tool.', 'Prosper Roteiros home screen with access to file and route management, without customer data.'],
      ['From customer groups to visit order', 'The processing logic groups customers by proximity and orders visits using nearest-neighbor routing with 2-opt improvements. The map displays numbered stops and the route sequence so the team can review the plan visually. CSV export makes the results available outside the interface.', 'Illustrative map with six fictional stops and a visit sequence; no customer locations are shown.'],
    ], links: ['Open demo'],
  },
  {
    title: 'IT Support Tickets', category: 'Business application', role: 'Full development · Interface, backend and database',
    summary: 'From submitting a request to following its progress: an IT support system developed for a medical clinic’s daily operations.',
    imageAlt: 'IT support system on a laptop and phone, using fictional data',
    imageCaption: 'Illustrative composition based on the system. The screens below use fictional data to protect user and operational information.',
    problem: 'The clinic needed to centralize support requests from different departments while retaining the context of each case: the reported problem, location, replies and attachments. Alongside ticket management, the system needed to give IT staff an equipment overview and separate permissions for administrators, technicians and requesters.',
    contribution: 'I developed the full application, from the React and Material UI interface to the FastAPI API and PostgreSQL database. I implemented JWT authentication with session renewal, access roles, ticket creation and tracking, filters, status updates, replies, history and attachments. I also built the support dashboard and equipment inventory, with creation, editing, archiving and links to tickets. The data layer uses SQLAlchemy with Alembic migrations.',
    outcome: 'The system runs locally and has no public access link. The current version combines support and inventory management in one application. Requesters can submit and track their needs, while IT staff review case histories, respond to tickets and organize equipment by department, location and status. I drew on my support experience to design features for everyday service work.',
    gallery: [
      ['An overview of support activity', 'The dashboard brings together open, in-progress, resolved and pending-response tickets. Recent request cards provide the context of each case and help the IT team organize daily follow-up.', 'Demo dashboard with ticket metrics and cards, using fictional data.'],
      ['Requests with context', 'The form collects a title, description, category and service location. The department comes from the requester’s profile, and images or videos can supplement the report. This information helps the team understand the problem before starting support.', 'Demo ticket creation form with description and attachment fields.'],
      ['History and follow-up', 'Each ticket keeps its details, status and reply history in one place. Requesters and IT staff can follow the conversation and add updates, preserving context throughout the support process.', 'Demo ticket detail view with status, information and reply history.'],
      ['Equipment inventory', 'The inventory organizes computers, printers, displays and other equipment by type, department, location and status. The team can add, edit and archive items, then link them to tickets to identify the equipment involved in each case.', 'Demo inventory with fictional equipment and no real identifiers or network addresses.'],
    ], links: [],
  },
  {
    title: 'Online Menu', category: 'Digital product', role: 'Full development · Interface, backend and admin dashboard',
    imageCaption: 'Illustrative composition of the menu and admin dashboard, using fictional data and no user information.',
    summary: 'From the first click to placing an order, an experience for customers and restaurants.',
    imageAlt: 'Online Menu on a laptop and phone, showing demo restaurant and admin interfaces',
    problem: 'Present products, accept orders and let the restaurant update its own menu.',
    contribution: 'I developed the React interface, admin dashboard and Supabase integration for authentication, data and images. The architecture also includes a Flask backend with routes for orders, settings and webhook integrations.',
    outcome: 'One application that combines the ordering experience with restaurant management.',
    gallery: [
      ['Starting with the product', 'I organized the menu around cards containing a photo, description, price and ordering action. I built a cart that retains items after a page reload and accounts for sizes, quantities and notes. Items with different instructions remain separate, preserving the context of each selection. At checkout, I collect contact details, delivery information and the payment method before saving the order in Supabase.', 'Burger House example page showing a product, its price and the ordering action.'],
      ['An operational overview for the restaurant', 'I divided administration into tasks: updating products and categories, tracking orders and configuring the restaurant’s presentation. I calculated dashboard metrics from recorded orders, bringing revenue, average order value and fulfillment statuses together. I implemented filters and status updates for order management, plus Excel export for review outside the system. This connects the business overview with everyday service tasks.', 'Demo dashboard summarizing orders, revenue and fulfillment, without personal data or real business metrics.'],
      ['A menu the restaurant can maintain', 'I separated category records from product records so the restaurant can organize its menu without tying its structure to page code. I implemented category ordering and activation controls, as well as editing for items and their size and price variations. Restaurant staff can adjust the offering through the dashboard while the public interface retrieves the records from Supabase.', 'Demo management screen for menu categories and items, using a fictional admin account.'],
      ['From incoming order to delivery', 'I organized orders by fulfillment stage, with filters for pending, preparing, ready and delivered orders. The list shows an identifier, amount, status and date, with a separate action to open the details. I implemented updates to the order’s stored status so the team can track its progress. This lets staff review the queue and open each order’s context when needed.', 'Demo order list with fictional customers, masked phone numbers and different fulfillment statuses.'],
      ['Customization without rebuilding the interface', 'I developed preset themes and a custom color option to adapt the menu to the restaurant’s identity. I centralized these choices in settings and applied the colors through CSS variables shared across components. This allows staff to change the interface’s appearance from the dashboard without editing each button, card or form.', 'Theme dashboard with Classic, Dark, Elegant, Vibrant and Custom options, without user data.'],
      ['Keeping restaurant details up to date', 'I treated the name, contact information and logo as configurable data instead of hardcoding them in components. I built a form to edit and save store information, including image uploads through the dashboard. Separating content from the visual structure lets the restaurant manager keep its presentation up to date without changing application code.', 'Demo store settings with fictional contact information and a logo upload control.'],
    ], links: ['View menu'],
  },
  {
    title: 'XML Processor', category: 'Automation', role: 'Full development · Interface and Python processing',
    imageCaption: 'Illustrative composition of the tool. File and document examples are fictional.',
    summary: 'Automating document selection for invoice workflows.',
    imageAlt: 'Demo presentation of the XML Processor on a laptop and phone',
    problem: 'Find and separate invoice XML files based on a list of numbers in a spreadsheet.',
    contribution: 'I developed the upload interface and Python processing with Flask. I used openpyxl to read the spreadsheet and implemented XML selection, result compression and browser downloads.',
    outcome: 'The tool automates a repetitive operational task, replacing manual document searches and selection.',
    gallery: [
      ['Two files instead of manual selection', 'I organized the input into two fields: a spreadsheet listing invoice numbers and a ZIP containing the available documents. Users can select or drag files and start processing on the same screen. In the backend, I read column B from the second row onward, leaving the header out. This uses the prepared spreadsheet to guide the search without requiring individual XML selection.', 'Excel spreadsheet and XML ZIP upload interface, with no real documents loaded.'],
      ['The selection logic', 'I implemented the search in stages: first, I check the number in the filename; if there is no match, I try reading the invoice or CT-e document number from the XML. The comparison uses the final digits, following the tool’s matching rule. Processing also traverses ZIP subfolders and copies selected files to a temporary directory, which is removed on completion or when handling an error.', 'Tool instructions for uploading files, comparing document numbers and downloading the result.'],
      ['Ready to review and download', 'Alongside the ZIP, I return the selected XML count and the matches found to support review. For the serverless environment, I included the file as Base64 in the response and reconstructed the download in the browser, avoiding a second request to temporary storage. I also handled empty number lists and unmatched searches, displaying a message in the interface.', 'Demo result with three fictional documents selected and a button to download entrada.zip.'],
    ], links: ['Open tool'],
  },
  {
    title: 'Moraes Adesivos', category: 'Company website', role: 'Full development · Interface, animations and catalog',
    imageCaption: 'Demo composition based on the current project, with desktop and mobile interfaces.',
    summary: 'A digital presence that presents the company’s work and helps customers get in touch.',
    imageAlt: 'Editorial cover of the Moraes Adesivos project',
    problem: 'Show surface coverings in interior settings and help visitors find a collection before contacting the company.',
    contribution: 'I developed the current React version, including animated product presentations, a searchable catalog with filters and WhatsApp links. I also worked on mobile image framing and loading the images used in transitions.',
    outcome: 'A digital showcase focused on presenting the company’s work and enabling direct contact.',
    gallery: [
      ['Showing coverings in context', 'I organized the opening presentation around decorated interiors to show textures in context. I implemented scroll-driven changes between coverings, using SVG clipping and masks to simulate the movement of an adhesive sheet. I separated scene surfaces and synchronized titles with each variation, connecting the animation to the company’s product.', 'Moraes Adesivos home screen showing coverings in a living room, kitchen and bathroom.'],
      ['From inspiration to a collection', 'I structured the catalog as a data collection, separating titles, images, categories and links from visual components. For search, I normalized terms to ignore accents and letter case, combining the entered text with the category filter. Each card links to the collection’s material, while the interface displays results and allows users to clear filters.', 'Surface covering catalog with text search, category filters and collection cards.'],
      ['A composition for mobile', 'I prepared images and framing for smaller screens to keep text readable and materials prominent. In the code, I separated texture variations by screen size and managed image loading before transitions. I also handled presentation height during mobile browsing to reduce position changes when the browser’s visible area changes.', 'Moraes Adesivos mobile version with a vertically framed interior and compact navigation.'],
    ], links: ['Visit website'],
  },
];

export const englishProjects: Project[] = projects.map((project, index) => {
  const { gallery, links, ...text } = copy[index];
  return {
    ...project, ...text,
    gallery: project.gallery.map((image, i) => ({ ...image, title: gallery[i][0], description: gallery[i][1], alt: gallery[i][2] })),
    links: project.links.map((link, i) => ({ ...link, label: links[i] })),
  };
});
