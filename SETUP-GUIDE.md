# Exam Ace Tutorials — Setup Guide

This folder is your whole website. Upload it to Netlify and it becomes:

| Page | What it does |
|---|---|
| `index.html` | **Homepage.** Course catalogue, plans, sign in, create account |
| `courses.html` | **Course hub.** One page with a bar across the top to move between all six courses |
| `dashboard.html` | Each person's courses, password change, QuickSchools and Canvas links, recent activity |
| `shop.html` | **Shop.** Package builder, teacher plans, books, cart and Payhip checkout |
| `admin.html` | **Your page only.** Issue logins, reset passwords, add or remove courses, subject requests, Payhip orders |

It works straight away in **demo mode** (accounts saved in the browser only) so you can try everything before connecting the database.

Demo logins: `demo.student` / `Welcome2026!` (asked to change password) · `demo.teacher` / `Teacher2026!` · `kester` / `Admin2026!` (administrator)

---

## Step 1 · Put the site on Netlify through GitHub (replaces your current homepage)

Netlify always shows the file named `index.html` at the top of the site as the homepage.

> **Don't use drag-and-drop for this site.** Netlify's drag-and-drop only publishes plain pages. It doesn't run the site's server functions, which protect the courses, issue logins, receive Payhip payments and send your email alerts. Without them, anyone could open the courses. Publishing through GitHub runs everything, and every later change is a single upload.

1. **Back up what's live now.** Netlify → your site → **Deploys** → latest deploy → **Download**. Unzip it. If you want to keep the old page, rename its `index.html` to `arcade.html` (or put the old site in a folder called `arcade`).
2. **Make the project folder.** Copy everything from this zip into the unzipped backup folder, plus your course folders (Step 2).
3. **Create a free GitHub account** at github.com, then install **GitHub Desktop** (desktop.github.com). It handles hundreds of course files in one go, which the website upload can't.
4. In GitHub Desktop: **File → Add local repository** → choose the project folder → **create a repository** → **Publish repository**. Leave **Keep this code private** ticked.
5. **Connect it to your existing Netlify site** so your address stays the same: Netlify → your site → **Site configuration → Build & deploy → Link repository** → GitHub → choose the repository. Leave the build command empty; the publish directory is `.`. Netlify publishes the site in a minute or two.

From then on, to change anything: edit the files in the folder, then in GitHub Desktop click **Commit** and **Push**. Netlify updates the site by itself.

## Step 2 · Put your courses in place

Each course goes in its own folder. Unzip each course's offline package into:

```
courses/comm-studies/student/      courses/comm-studies/teacher/
courses/digital-media-1/student/   courses/digital-media-1/teacher/
courses/digital-media-2/student/   courses/digital-media-2/teacher/
courses/cape-it-1/student/         courses/cape-it-1/teacher/
courses/csec-it/student/           courses/csec-it/teacher/
courses/edpm/student/              courses/edpm/teacher/
```

Each folder needs its own `index.html` (the course's main page). The course hub opens them as they are; nothing inside the courses has to change. To add another course later (for example ESL), add a block for it in `assets/config.js` and a matching folder.

## Step 3 · Create the database (Supabase, free to start)

1. Go to supabase.com → **New project**. Pick a region close to the Caribbean (US East).
2. **SQL Editor → New query** → paste everything from `supabase/schema.sql` → **Run**.
3. **Authentication → Providers → Email**: leave **Email** on. Turn **Confirm email** on for people who buy online.
4. **Authentication → Users → Add user**: create your own login with your email and a password.
5. Back in the SQL Editor, run the `update public.profiles ...` command shown at the bottom of `schema.sql` (remove the `--` at the start of each line first) to make yourself the administrator. You sign in with your email address.
6. **Project Settings → API**: copy the **Project URL**, the **anon public** key and the **service_role** key.

> Supabase pauses free projects after a week with no visitors. Move to Supabase Pro (US$25/month) before students depend on it.

## Step 4 · Connect the site to the database

1. Open `assets/config.js` and paste the Project URL and the **anon** key (never the service_role key) into `supabaseUrl` and `supabaseAnonKey`.
2. In Netlify → **Site configuration → Environment variables**, add:

| Name | Value |
|---|---|
| `SUPABASE_URL` | your Project URL |
| `SUPABASE_ANON_KEY` | the anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | the service_role key (kept secret on Netlify) |
| `STUDENT_LOGIN_DOMAIN` | same as `studentLoginDomain` in config.js |
| `PAYHIP_API_KEY` | from Payhip → Settings → Developer (see Step 6) |
| Email settings | see Step 7 |

3. Push the change from GitHub Desktop. The demo banner disappears and logins now live in your database.

## Step 5 · Issue logins and send invites

1. Sign in on the homepage (choose **Teacher**) → **Accounts** at the top of your dashboard.
2. **Upload your class list as a CSV.** In Excel or Google Sheets, save or download the sheet as **CSV**, then drop it on the upload box. Columns it understands:

   | Column | Needed? | Notes |
   |---|---|---|
   | Name (or First name + Last name) | Yes | |
   | Email | For invites | People without one still get a login; you hand it to them |
   | Username | No | Made from the name if left out (for example *aaliyah.richardson*) |
   | Courses | No | As you'd type them: *EDPM*, *Comm Studies*, *CSEC IT*, *Digital Media 1*, *All*. Separate several with semicolons. Left empty, the courses you tick on the page are used. |
   | Type | No | *Student* or *Teacher* |
   | Class | No | For example *5A* or *L6* |

   A ready-made template is on the Accounts page (**Download the template**) and in this folder as `assets/class-list-template.csv`.
3. Check the table that appears. Every row says **Ready** or what needs fixing (a bad email, an unknown course, a username already in use). Rows with problems are skipped.
4. Tick **Email each person their login**, then click **Create logins**. Large classes are created ten at a time.
5. Each person with an email receives a branded invitation with their username, temporary password, their courses and a **Sign in now** button. The button opens the sign-in box with Student or Teacher already chosen.
6. Click **Copy all** to keep a list (paste it into Excel or Google Sheets). Temporary passwords are shown only once. Hand logins to anyone without an email.
7. At first sign-in, everyone must choose their own password before anything opens.

You can also switch to **Type names** to add a few people by hand.

**Resending:** under **All accounts**, **Send invite** emails a fresh temporary password to anyone with an email address. **Reset password** shows a new one on screen for people without email.

Invites need the email settings from Step 7.

## Step 6 · Selling through the shop (payments by Payhip)

Card payments can't run on this website by themselves without a payment company behind them, so the shop uses your Payhip store for the actual payment. Shoppers build their order here; Payhip takes the money in a secure checkout window on top of your page and sends your site a confirmation, which unlocks the courses automatically.

1. **Create the products in Payhip.** One membership per plan (Single Subject, Subject Plus, Two Subjects, All Access, Teacher one subject, Teacher all subjects). For each plan you also want to sell as an exam-year pass, add a one-off product at 8 × the monthly price. Add one product per book and subject.
2. **Paste the product keys into `assets/config.js`.** The key is the code at the end of a Payhip product link (`payhip.com/b/AbC1`, key `AbC1`): monthly key into `payhipKey`, exam-year key into `payhipYearKey`, book keys into the `books` list. Also check `payhipName` matches each membership's name in Payhip.
3. **Connect Payhip to your site.** Payhip → Settings → Developer:
   - copy your **API key** into a Netlify environment variable named `PAYHIP_API_KEY`;
   - under **Webhooks**, add `https://YOUR-SITE.netlify.app/.netlify/functions/payhip-webhook`.
4. Push the change from GitHub Desktop.

**What the buyer sees:** Shop → tick subjects → the best-value plan is picked for them (one subject with or without the textbook, two subjects, or All Access for three or more) → Cart → Checkout → a **Pay** button for each item opens Payhip's checkout. Payhip takes one payment per item, so a cart with a plan and a book has two short payments.

**What happens after payment:** Payhip tells your site, and within about a minute the courses appear on the buyer's dashboard. Monthly plans stay open until the buyer cancels in Payhip (the site then closes them); exam-year passes close on 1 July. Refunds close access too. Books are delivered by Payhip by email.

**If a payment doesn't match** (for example the buyer used a different email at Payhip), it appears under **Payhip orders → Needs attention** on your Accounts page. Find their account and use **Add course**.

## The flipbook textbook by package

- **Single Subject** is the course only. **Subject Plus, Two Subjects, All Access** and the teacher plans include the flipbook textbook.
- Without the textbook, the course loads normally but its **Flipbook** button doesn't appear: the site simply doesn't send the flipbook to that account. Nothing inside your courses needs to change.
- When you issue school logins, tick or untick **Include the flipbook textbook**.
- The dashboard shows "Textbook" or "Course only · add textbook" on each course.

## Step 7 · Your admin email address and alerts

Use an address on your own domain (for example **admin@yourdomain.com**) as your administrator login and for every notification.

**a. Set up the mailbox.** Google Workspace, Zoho Mail or Microsoft 365 all work. Then create an **app password** for it, a separate password just for the website to send email:
- Google Workspace: turn on 2-Step Verification for the mailbox, then go to myaccount.google.com → Security → **App passwords**.
- Zoho: Account → Security → **App Passwords**.

**b. Add the email settings in Netlify** (Site configuration → Environment variables):

| Name | Value |
|---|---|
| `ADMIN_EMAIL` | admin@yourdomain.com (where alerts go) |
| `SMTP_HOST` | `smtp.gmail.com` (Google) · `smtp.zoho.com` (Zoho) · `smtp.office365.com` (Microsoft 365) |
| `SMTP_PORT` | `465` for Google and Zoho, `587` for Microsoft 365 |
| `SMTP_USER` | admin@yourdomain.com |
| `SMTP_PASS` | the app password |
| `MAIL_FROM` | `Exam Ace Tutorials <admin@yourdomain.com>` |
| `SITE_URL` | your site's address, e.g. `https://www.yourdomain.com` |
| `NOTIFY_SECRET` | any long random text (you'll paste the same text into Supabase below) |
| `NOTIFY_MODE` | `both` (each alert and a morning summary), `instant`, or `daily` |

**c. Tell Supabase to alert the site.** Supabase → **Database → Webhooks → Create a new hook**. Make three hooks, all pointing at `https://YOUR-SITE/.netlify/functions/notify`, method **POST**, with an HTTP header named `x-notify-secret` whose value is your `NOTIFY_SECRET`:

| Hook name | Table | Events |
|---|---|---|
| Subject requests | `course_requests` | Insert |
| New accounts | `profiles` | Insert |
| Orders | `orders` | Insert, Update |
| Quote requests | `quote_requests` | Insert |

**d. Send sign-up emails from your domain too.** Supabase → Project Settings → Authentication → **SMTP Settings** → enable custom SMTP with the same host, port, username and app password. Confirmation emails then come from admin@yourdomain.com.

**e. Make admin@ your administrator login.** Authentication → Users → **Add user** with admin@yourdomain.com, then run the administrator command from the bottom of `schema.sql` with that email. Put the same address in `contactEmail` in `assets/config.js`, and set it as your Payhip account email so Payhip's sale emails arrive there too.

**What arrives in your inbox:**
- **Subject request**: who asked, for which subject, and their note, with a button to approve or decline.
- **New sale**: amount, buyer and what they bought (the courses have already been unlocked).
- **Action needed**: a Payhip payment that didn't match an account.
- **Refund**: which order, and confirmation that access was closed.
- **New account**: when someone signs up on their own. Logins you issue yourself don't send alerts.
- **Quote request**: everything the person filled in on the quote form, with a button to reply by email.
- **Daily summary at 7:00 a.m.**: sales, learners who signed in, sign-ups, requests waiting and payments needing attention. Not sent on days when nothing happened.

## Quote-only plans

Plans priced at or above `quoteFrom` in `assets/config.js` (US$60 a month to start, which covers **Teacher, all subjects**) show **Request a quote** instead of a price. So does the **School licence**. Lower plans keep their prices and go straight to the cart. Change the number to move the line, for example `quoteFrom: 45` to make All Access quote-only too.

**Request a quote** opens a three-step form in the site's starry navy and gold: who the quote is for, which subjects and how many learners, then start date, billing and a note. Visitors don't need an account to send it. Each request:
- appears under **Quote requests** on your Accounts page, where you mark it **Quoted** or **Close** it;
- emails you straight away (Step 7), with a button to reply.

Once they accept, issue their logins with a CSV (Step 5).

## Student and Teacher sign-in

The sign-in box asks **I am a: Student / Teacher**. The choice decides which edition opens:

- **Student** opens the student edition of every course.
- **Teacher** opens the teacher edition (for teacher accounts with teacher access to that course).
- A student account can't sign in as Teacher, and a teacher account is asked to choose Teacher. Your administrator login can use either, so you can check what students see.

## Subject requests

Anyone signed in can click **Request a subject** on their dashboard, or **Request this course** on a locked course. They can pick a course on the site or type a subject you don't offer yet.

Requests appear at the top of your **Accounts** page:

- **Approve** a course request and it's added to that person immediately (teacher edition for teachers).
- Requests for new subjects can be marked **Noted** — a running list of what people want next.
- The person sees "Waiting", "Added" or "Not added" on their dashboard.

## Study tools (notebook, memory palace, memes, hourglass)
Students open **Study tools** from the course hub (top bar), their dashboard, or the **Study tools** tab in every course menu. Notes are linked to the course and the lesson that was open.

- **My notebook**: note taking (Cornell), note making and blank pages; read aloud on repeat; infinite paper (ruled, French Seyès grid, graph, squared, dots, isometric, plain) in six colour palettes; handwriting to text; voice notes with a live transcript, uploads, and replay on repeat.
- **Memory palace**: the method of loci, with places teens know (their house, their phone, a game level, the mall, carnival, the court, campus, the beach). Build, walk through, then test recall.
- **Thanks for the Memeries**: students upload their own picture, choose a layout and write their own caption. A meme can become the memory image at a locus.
- **Study hourglass**: switch it on and it counts down 30 minutes (15–60 min to choose) with a sand sound, then a sandstorm and a break-time screen.

**Where it saves.** Signed in on the site (including courses opened from the hub): the student's account. A course opened on its own: that device only.

**To switch on saving to accounts,** run `supabase/schema.sql` again in Supabase → SQL Editor. It adds the notes, voice notes and palaces tables and a private `voice-notes` storage bucket. Running it again is safe.

**To switch on transcribing uploads and handwriting on every device,** add these in Netlify → Site configuration → Environment variables, then redeploy:

| Name | Value |
|---|---|
| `OPENAI_API_KEY` | a key from platform.openai.com (billed per use, a few cents per hour of audio) |
| `TRANSCRIBE_MODEL` | optional, default `whisper-1` |
| `HANDWRITING_MODEL` | optional, default `gpt-4o-mini` |

Without the key, live transcripts while recording still work in Chrome and Edge, and handwriting to text still works on devices that read handwriting themselves (for example Chromebooks). Recordings are private: only the student who made one can play it.

## Exam room (live tests)

Teachers run a live test at **exam-teacher.html** (Dashboard → Exam room → Run a test, or the **Exam room** tab in any Teacher's Version). Students join at **exam.html** (Dashboard → Join a test, or the Exam room tab in their course).

**Turn it on (once):**
1. Supabase → SQL Editor → New query → paste everything in `supabase/exam-room.sql` → Run. It adds four private tables and a private `exam-audio` bucket for your voice messages.
2. Nothing new in Netlify: it uses the SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and email settings you already added (Step 7). Redeploy so the new `exam-room` function goes live.

**How it works:**
- **Questions.** Tick past papers, mocks and tests from the course (the bank in each Teacher's Version, `exam/bank.json`), or type, paste or open your own (.txt or .csv). Put * after the right option. A question with no options is a written question.
- **Different papers.** Each student gets a random draw from the pool, in a random order, with the options shuffled. The students beside, in front of and behind each seat are given different questions first. A pool bigger than the paper means more different papers.
- **Joining.** Students sign in and type the room code, or type their full name, email and the code. They choose a seat and wait; papers are dealt only when you press Start.
- **Entry closes** 20 minutes after you start (you can change this), and you can lock the room at any time. Anyone who arrives after that sees why on screen and gets the same message by email, and you get an email too. Choose **Let in** to admit them.
- **Talking to the room.** Type an instruction or record a voice message (up to two minutes). It appears and plays on every student's screen.
- **Results.** Live seating plan with progress, who left the test page, answers to read, marks for written answers, and a CSV of results and attendance.
- Students whose login has no real email address (username-only logins) see the message on screen only.

**Where questions come from:** the course's question bank and past papers (filter by module, section and topic), a **random paper** drawn from them that you check, swap and approve, a **QTI import** (.xml or .zip, versions 1.2 and 2.x), or **your own** questions for a sectional test. You can mix them.
**Scheduling:** choose **At a set date and time**. Students can come in from 15 minutes before (you can change this).
**Supervision** (set a default on your dashboard or the rooms list, and change it per test):
- **Proctored:** a live invigilator must have the exam room open. If no invigilator is watching, the test pauses for everyone and the lost time is given back. A scheduled proctored test starts only while the invigilator is there.
- **Bot-monitored:** starts on time by itself, asks for cameras, logs every time a student leaves, stops a paper after too many times away (you choose how many, and can let them carry on), and emails you a report at the end.
- **Unmonitored:** starts on time by itself; times away are still logged and you get the report.
**Saving and handing in:** answers save every second. When time is up the student sees "Time's up" and a countdown; the paper hands itself in 15 minutes later (change this under **Hand in by itself after**). Changes made after time are marked in the results and the CSV.
**Extra time and reopening** (the teacher who made the test, any other teacher acting as proctor, or the administrator):
- **Add time for everyone:** type the minutes and press the button.
- **One student:** open their script and use **Extra time** or **Reopen for this student**.
- **Reopen:** brings handed-in papers back with all saved answers, plus the minutes you choose. Papers that handed themselves in are reopened; you can also include those handed in by the students.
- **Copy proctor link:** send it to another teacher so they can invigilate the same room.
After updating, run `supabase/exam-room.sql` again: it only adds the new columns.

**Usage note:** each student's screen checks in every 5 seconds during a test, so a class of 30 for an hour uses about 20,000 Netlify function calls. Check this against your Netlify plan.

## Who's online, statistics and the attendance register

**Turn it on (once):** Supabase → SQL Editor → New query → paste everything in `supabase/presence.sql` → Run. Redeploy so the `presence` function goes live. It uses the Supabase settings you already have.

- **Landing page:** one short line under the sign-in button: how many people are online now, students and teachers, how many studied today and the busiest course. Visitors who aren't signed in see only the numbers; signed-in people also see first names with a last initial.
- **In every course:** a **Class statistics** tab in the Teacher's Version (who is in the course now, students each day for 14 days, time per student for today, 7 and 30 days, days active, a course-time CSV and the attendance register) and a **My statistics** tab in the Student's Version (their own time and days).
- **Attendance register:** every student sign-in with first name, last name, email, time in, time out and total time. Download it as a CSV from **Accounts → Attendance register** (admins) or from Class statistics in any Teacher's Version (teachers). A visit ends when the student signs out, or at their last activity if they close the page without signing out.
- Signed-in pages check in once a minute, so a class of 30 for an hour uses about 1,800 Netlify function calls.

## Student ID checks (photo and ID document)

**Turn it on (once):** Supabase → SQL Editor → paste `supabase/identity.sql` → Run, then redeploy.
- Students add a photo of themselves and a photo of a valid ID (school ID, passport, national ID card, driver's licence) when they register, or later from their dashboard.
- **Accounts → Student ID checks**: compare the photo and the ID, then mark the record **Verified** or **Not verified** (with a note the student sees).
- In the exam room every desk shows the record status, and the student's answers show their photo on record beside their live camera still, so you can mark **Same person** or **Doesn't match**.
- The pictures are kept in a private store. Only teachers and the administrator can see them, through links that expire after 10 minutes.

## Invoices and receipts

**Turn it on (once):** Supabase → SQL Editor → paste `supabase/invoices.sql` → Run. In Netlify, add **PAY_INFO** with your payment details (bank name, account name and number), then redeploy. Put the same details in `paymentInstructions` in `assets/config.js`.
1. Someone registers → their invoice is made from their plan straight away and you get an email.
2. **Accounts → Invoices and receipts → Check and sign**: the amounts are worked out for you (quantity × price, discount, tax, total). Every amount can be changed; if you change the total, the invoice shows the difference as an adjustment. Choose the courses the payment opens, draw or type your signature, tick **I've checked this amount**, then **Sign and send**. The student gets the invoice by email.
3. The student uploads proof of payment from their dashboard → you get an email.
4. **Check proof → Confirm payment**: the signed receipt is emailed and their courses open (one month, or to 1 July for an exam-year pass). **Proof not accepted** emails them to try again.
Every invoice and receipt can be printed or saved as a PDF.

## Try a section (preview before buying)
Every course card on the home page, and every course not on a student's plan in their dashboard, has a **Try a section** button. It opens a preview of the student edition that anyone can use without signing in:
- **CSEC EDPM and CSEC IT:** all of Section I, with its section test and Paper 02 task.
- **CAPE courses:** the first two units of Module 1.
- Every other section and unit shows its title with a lock and a **See plans** button. Games, past papers, labs, the glossary, the flipbook and the exam room are locked.
The preview lives in `courses/<course>/preview/`. Only that section is copied there, so the rest of the course never leaves the protected folder.
**After you change a course, or to change which section people can try:** edit the list at the top of `tools-build/make-previews.js` (for example `units: 3` or `module: "M2"`), then run `node tools-build/make-previews.js` and upload the `preview` folders again.

## How the courses are protected

- The course folders sit behind a gate on Netlify (`netlify/edge-functions/course-gate.js`). Every course file is checked against the database before it is sent, so typing a course address directly doesn't get around the sign-in.
- Teacher editions open only for teacher and administrator accounts.
- Right-click and copying are switched off on the pages, as on the courses.
- Every sign-in, password change and course opened is recorded in the activity log.

## Changing names, prices and text

Everything you're likely to change is in `assets/config.js`: site name, your bio, contact email, the course list and descriptions, plan names, prices and what each includes, and the QuickSchools and Canvas links.
