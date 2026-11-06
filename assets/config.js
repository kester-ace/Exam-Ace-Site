/* =====================================================================
   SITE SETTINGS — the only file you need to edit.
   1. Paste your Supabase Project URL and anon (public) key below.
      (Supabase → Project Settings → API). Leave them blank to run the
      site in demo mode while you test.
   2. Paste each Payhip product link into the plan it belongs to.
   3. Each course lives in its own folder under /courses/ on Netlify.
   ===================================================================== */
window.SITE_CONFIG = {
  siteName: "Exam Ace Tutorials",
  tagline: "E-learning Ecosystem",
  author: "Kester Small",
  authorBio: "A self-contained e-learning ecosystem for Caribbean students, owned and operated by Kester Small: award-winning educator, SBA moderator and Paper 2 marker with over 20 years' experience, and merit listers in CAPE Digital Media Units 1 and 2.",
  contactEmail: "k.small@stmaartenacademy.com",

  /* --- Database (Supabase) --- */
  supabaseUrl: "",          // e.g. "https://abcdefgh.supabase.co"
  supabaseAnonKey: "",      // the long "anon public" key

  /* Students without an email sign in with a username.
     Behind the scenes it becomes username@<this domain>. Any domain you own works. */
  studentLoginDomain: "students.kestersmall.com",

  /* --- School systems linked from the dashboard --- */
  links: {
    quickschools: "https://www.quickschools.com/",
    canvas: "https://lms.cfbc.edu.kn/"
  },

  /* --- Courses ---
     path        = student edition folder on Netlify
     teacherPath = teacher edition folder (only teachers and admins see it) */
  courses: [
    { slug: "comm-studies", title: "Communication Studies", level: "CAPE", code: "Single unit",
      blurb: "Essay writing with PEEL, the 25-mark expository scheme, Paper 3 preparation and language in society.",
      path: "/courses/comm-studies/student/", teacherPath: "/courses/comm-studies/teacher/" },
    { slug: "digital-media-1", title: "Digital Media Unit 1", level: "CAPE", code: "Unit 1",
      blurb: "Design principles, colour theory, media law and the 45-mark internal assessment, with software labs.",
      path: "/courses/digital-media-1/student/", teacherPath: "/courses/digital-media-1/teacher/" },
    { slug: "digital-media-2", title: "Digital Media Unit 2", level: "CAPE", code: "Unit 2",
      blurb: "Production workflows, audio and video, interactive media and the Unit 2 project.",
      path: "/courses/digital-media-2/student/", teacherPath: "/courses/digital-media-2/teacher/" },
    { slug: "cape-it-1", title: "Information Technology Unit 1", level: "CAPE", code: "Unit 1",
      blurb: "Information systems, problem solving, the HTML code builder and the capstone research project.",
      path: "/courses/cape-it-1/student/", teacherPath: "/courses/cape-it-1/teacher/" },
    { slug: "csec-it", title: "Information Technology", level: "CSEC", code: "General",
      blurb: "Hardware, software, spreadsheets, databases, web pages and the SBA, with past-paper practice.",
      path: "/courses/csec-it/student/", teacherPath: "/courses/csec-it/teacher/" },
    { slug: "edpm", title: "EDPM", level: "CSEC", code: "Electronic Document Preparation & Management",
      blurb: "Word processing, spreadsheets, Publisher and document management, with the SBA project studio.",
      path: "/courses/edpm/student/", teacherPath: "/courses/edpm/teacher/" }
  ],

  /* --- Plans (prices in US$) ---
     For each plan, create a membership/product in Payhip and paste:
       payhipKey      the product key of the monthly membership (the code at the end of payhip.com/b/XXXX)
       payhipYearKey  the product key of the exam-year pass (September to June, paid once); leave "" to hide that option
       payhipName     the product name exactly as it appears in Payhip (used to match cancellations)
     subjects = how many courses the plan covers (6 = every course)
     books    = whether the flipbook textbook is included (Single Subject leaves it out) */
  plans: [
    { id: "single",   group: "student", name: "Single Subject", price: 12, per: "month", subjects: 1, books: false,
      includes: ["One e-course of your choice", "Games, quizzes and past papers", "Progress saved to your account"],
      payhipKey: "", payhipYearKey: "", payhipName: "Single Subject" },
    { id: "plus",     group: "student", name: "Subject Plus",   price: 18, per: "month", subjects: 1, books: true, featured: true,
      includes: ["One e-course", "Flipbook textbook and workbook", "Everything in Single Subject"],
      payhipKey: "", payhipYearKey: "", payhipName: "Subject Plus" },
    { id: "two",      group: "student", name: "Two Subjects",   price: 28, per: "month", subjects: 2, books: true,
      includes: ["Any two e-courses", "Both flipbook textbooks", "Everything in Subject Plus"],
      payhipKey: "", payhipYearKey: "", payhipName: "Two Subjects" },
    { id: "all",      group: "student", name: "All Access",     price: 45, per: "month", subjects: 6, books: true,
      includes: ["All six e-courses", "Every flipbook textbook and workbook", "Best value for exam year"],
      payhipKey: "", payhipYearKey: "", payhipName: "All Access" },
    { id: "teacher1", group: "teacher", name: "Teacher, one subject", price: 25, per: "month", subjects: 1, books: true, teacher: true,
      includes: ["Teacher edition of one e-course", "Teacher pack and game pack", "Flipbook textbook"],
      payhipKey: "", payhipYearKey: "", payhipName: "Teacher, one subject" },
    { id: "teacherA", group: "teacher", name: "Teacher, all subjects", price: 60, per: "month", subjects: 6, books: true, teacher: true,
      includes: ["Every teacher edition", "Every teacher pack", "Schemes of work and lesson plans"],
      payhipKey: "", payhipYearKey: "", payhipName: "Teacher, all subjects" }
  ],

  /* Plans at or above this monthly price show "Request a quote" instead of a price */
  quoteFrom: 60,

  /* How students pay an invoice (shown on every invoice; you can change it on each one) */
  paymentInstructions: "Bank transfer: [your bank name], account name Exam Ace Tutorials, account number [your account number].\nOr pay in person. Use your invoice number as the reference.",

  /* Exam-year pass price = monthly price × this number */
  examYearMonths: 8,

  /* --- One-off books (Payhip delivers the files) ---
     One line per subject and format. Prices are set within the ranges in your business plan; change them here. */
  books: [
    { format: "textbook",  name: "Textbook (EPUB)",              price: 20, keys: { "comm-studies": "", "digital-media-1": "", "digital-media-2": "", "cape-it-1": "", "csec-it": "", "edpm": "" } },
    { format: "bundle",    name: "Textbook + workbook (EPUB + HTML)", price: 30, keys: { "comm-studies": "", "digital-media-1": "", "digital-media-2": "", "cape-it-1": "", "csec-it": "", "edpm": "" } }
  ]
};
