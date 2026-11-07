/* CSEC Information Technology · Paper 01 past papers (June 2012, June 2014, June 2015, June 2016, January 2017, June 2020), transcribed for class practice. Copyright CXC. Teacher's Version only. · Developed by Kester Small */
window.COURSE_PAPERS = (window.COURSE_PAPERS || []).concat([
{
"kind": "p1",
"past": true,
"id": "PP1_2012J",
"title": "Paper 01 · June 2012",
"time": 90,
"syllabus": "Set on the previous syllabus (CXC 30/G/SYLL 08). Items marked as old-syllabus (for example number bases, floppy disks and presentation software) are outside the current syllabus, CXC 30/G/SYLL 17; Pascal items remain useful because Pascal is still an accepted language.",
"intro": "<p><b>CSEC Information Technology Paper 01 · May/June 2012</b> · 1 hour 30 minutes · 60 items</p><p class=\"hint\">Original: CXC CSEC Information Technology Paper 01, May/June 2012 (past paper, copyright © Caribbean Examinations Council). Transcribed for class practice in the Teacher's Version.</p><ol><li>Answer <b>ALL</b> items. Each item has four options lettered (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions (1 hour 30 minutes).</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>",
"items": [
{
"q": "Which of the following devices is used to input data into the computer?",
"options": [
"Monitor",
"Mouse",
"External hard drive",
"USB flash drive"
],
"answer": 1,
"module": "1",
"why": "Key: B. A mouse sends your movements and clicks into the computer, so it is an input device. A monitor is an output device, and an external hard drive and a USB flash drive are storage devices."
},
{
"q": "Which of the following are considered as hardware?",
"options": [
"Data",
"Programs",
"Operating systems",
"Output devices"
],
"answer": 3,
"module": "1",
"why": "Key: D. Hardware is the physical equipment you can touch, such as printers and monitors (output devices). Data is raw facts, and programs and operating systems are software."
},
{
"q": "A diskette is divided into a number of concentric circles called",
"options": [
"sectors",
"cylinders",
"tracks",
"clusters"
],
"answer": 2,
"module": "1",
"why": "Key: C. Tracks are the concentric rings on a magnetic disk. Sectors are the pie-slice sections of each track, a cylinder is the same track on several platters stacked together, and a cluster is a group of sectors."
},
{
"q": "The storage capacity of a floppy disk is",
"options": [
"1.44MB",
"1.44 GB",
"1440 KB",
"1440MB"
],
"answer": 0,
"module": "1",
"why": "Key: A. A standard 3.5-inch floppy disk is labelled 1.44 MB. Options B and D are about a thousand times too large. Option C (1440 KB) is really the same amount written in kilobytes, so this item is a little ambiguous, but the expected exam answer is the familiar 1.44 MB. (Old-syllabus item: the floppy disk is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "The content of which of the following types of memory can be modified by a running program?",
"options": [
"RAM",
"ROM",
"PROM",
"EPROM"
],
"answer": 0,
"module": "1",
"why": "Key: A. RAM is read/write memory, so a running program can change what is stored in it. ROM and PROM are read-only, and EPROM can only be erased with ultraviolet light and reprogrammed with special equipment, not by a running program."
},
{
"q": "Which of the following devices allows a user to manipulate a cursor?",
"options": [
"Plotter",
"Mouse",
"Barcode reader",
"Optical Mark Reader"
],
"answer": 1,
"module": "1",
"why": "Key: B. Moving a mouse moves the cursor (pointer) on the screen. A plotter is an output device, and barcode readers and OMRs read data automatically; they do not move a cursor."
},
{
"q": "Which of the following lists is arranged starting from BEST to WORST print quality?",
"options": [
"Laser, dot matrix, inkjet",
"Inkjet, dot matrix, laser",
"Laser, inkjet, dot matrix",
"Dot matrix, ink jet, laser"
],
"answer": 2,
"module": "1",
"why": "Key: C. Laser printers give the sharpest output, inkjets are next, and dot-matrix (impact) printers give the roughest print. The other lists put dot matrix in the middle or at the top, which is wrong."
},
{
"q": "Which of the following is a type of user interface?",
"options": [
"IDE",
"MIDI",
"ASCII",
"GUI"
],
"answer": 3,
"module": "1",
"why": "Key: D. A GUI (graphical user interface) lets you work with windows, icons, menus and a pointer. An IDE is a programming environment, MIDI is a standard for musical instruments, and ASCII is a character code."
},
{
"q": "In modern personal computers, the CPU speed is measured in",
"options": [
"nanoseconds",
"milliseconds",
"MHz",
"GHz"
],
"answer": 3,
"module": "1",
"why": "Key: D. Modern processors run at billions of cycles per second, so speed is given in gigahertz (GHz), for example 3.2 GHz. MHz was used for older, slower CPUs, and nanoseconds and milliseconds measure time, not clock speed."
},
{
"q": "Which of the following is used by the CPU to temporarily store data?",
"options": [
"Buffer",
"Track",
"Sector",
"Cylinder"
],
"answer": 0,
"module": "1",
"why": "Key: A. A buffer is an area of memory that holds data temporarily, for example while it waits to be printed. Tracks, sectors and cylinders are parts of the layout of a disk, not temporary stores."
},
{
"q": "Which of the following statements is true about the Arithmetic/Logic Unit (ALU)?",
"options": [
"It is a component in the CPU.",
"It is also called memory or main memory.",
"It is a high-speed storage area.",
"It decodes program instructions."
],
"answer": 0,
"module": "1",
"why": "Key: A. The ALU is part of the CPU and carries out calculations and comparisons. It is not memory (B), high-speed storage areas are registers or cache (C), and decoding instructions is the job of the control unit (D)."
},
{
"q": "To access record number 998 from a sequential file containing 1000 records, you MUST",
"options": [
"convert to the file to direct access",
"go to record 1000, and then read backward from there",
"go directly to record 998",
"first read records 1 through 997"
],
"answer": 3,
"module": "1",
"why": "Key: D. In a sequential file, records can only be read one after the other from the start, so records 1 to 997 must be read first. You cannot jump straight to a record (C) or read backwards (B), and converting the file (A) is not required to read it."
},
{
"q": "Which of the following is TRUE of optical disks?",
"options": [
"Cannot store pictures.",
"Reading and writing is through laser beams.",
"Information can be accessed faster than from magnetic disks.",
"Can only store small amounts of data."
],
"answer": 1,
"module": "1",
"why": "Key: B. Optical disks (CDs, DVDs, Blu-ray) are read and written by a laser. They can store pictures, they are usually slower than magnetic hard disks, and they hold large amounts of data (700 MB to many GB)."
},
{
"q": "Encryption is used to",
"options": [
"physically prevent users from accessing a computer",
"commit computer crime",
"disguise data and programs",
"discard old equipment"
],
"answer": 2,
"module": "3",
"why": "Key: C. Encryption scrambles (disguises) data so that only someone with the key can read it. It is a software protection, not a physical one (A), it protects against crime rather than committing it (B), and it has nothing to do with discarding equipment (D)."
},
{
"q": "Which of the following provides transmission of data in BOTH directions at the same time?",
"options": [
"Half Duplex",
"Full Duplex",
"Null Duplex",
"Simplex"
],
"answer": 1,
"module": "2",
"why": "Key: B. Full duplex sends data both ways at the same time, like a phone call. Half duplex is both ways but one at a time (like a walkie-talkie), simplex is one way only, and \"null duplex\" is not a real transmission mode."
},
{
"q": "In the URL http://www.shoes.com, 'shoes.com' stands for the",
"options": [
"extension",
"company name",
"domain name",
"internet company"
],
"answer": 2,
"module": "2",
"why": "Key: C. shoes.com is the domain name: the name of the website made of a second-level name (shoes) and a top-level domain (.com). The extension would be just .com, and the domain does not have to be a company name."
},
{
"q": "Google Chrome is an example of",
"options": [
"the Internet Explorer",
"a Web browser",
"a search engine",
"the World Wide Web"
],
"answer": 1,
"module": "2",
"why": "Key: B. Chrome is a web browser: software used to view web pages. Internet Explorer is a different browser, Google Search is the search engine, and the World Wide Web is the collection of web pages itself."
},
{
"q": "Which of the following is a feature of a utility program?",
"options": [
"It is unavailable to users.",
"It is part of an integrated package.",
"It is written by application users.",
"It is considered to be systems software."
],
"answer": 3,
"module": "1",
"why": "Key: D. Utilities such as antivirus, backup and disk clean-up programs help to maintain the computer, so they are classed as system software. They are available to users, they are not part of an office suite, and they are written by software developers, not by application users."
},
{
"q": "Transferring data from a remote computer to your computer is referred to as",
"options": [
"uploading",
"browsing",
"downloading",
"data mining"
],
"answer": 2,
"module": "2",
"why": "Key: C. Downloading brings a file from a remote computer (a server) to yours. Uploading is the opposite direction, browsing is viewing web pages, and data mining is searching large data sets for patterns."
},
{
"q": "Scrambling of messages at the sending end and unscrambling them at the receiving end is called",
"options": [
"espionage",
"encryption",
"coding",
"eavesdropping"
],
"answer": 1,
"module": "3",
"why": "Key: B. Encryption scrambles a message before sending and decryption unscrambles it at the other end. Espionage and eavesdropping are ways of spying on data, and \"coding\" usually means writing program code."
},
{
"q": "The acronym 'HTTP' stands for",
"options": [
"Hyper Text Transfer Protocol",
"Hyper Text Transmission Protocol",
"Higher Text Transmission Protocol",
"Higher Text Transfer Protocol"
],
"answer": 0,
"module": "2",
"why": "Key: A. HTTP is HyperText Transfer Protocol, the set of rules for transferring web pages. The other options swap in the wrong words \"Higher\" or \"Transmission\"."
},
{
"q": "Which of the following are the MAJOR functions of a computer system?<br>I. Output<br>II. Input<br>III. Processing<br>IV. Storage",
"options": [
"III only",
"I and II only",
"I, II,and III only",
"I, II, III, and IV"
],
"answer": 3,
"module": "1",
"why": "Key: D. A computer system inputs data, processes it, stores it and outputs results: the IPOS cycle. Every other option leaves out at least one of these four functions."
},
{
"q": "Which of the following is a feature of an operating system?",
"options": [
"Compresses files.",
"Scans data storage devices for viruses.",
"Converts Programming Language instructions to Machine Language.",
"Manages the flow of information between the CPU and output devices."
],
"answer": 3,
"module": "1",
"why": "Key: D. The operating system manages input/output, controlling how data flows between the CPU and devices such as printers. File compression and virus scanning are done by utility programs, and converting program code to machine language is the job of a translator (compiler or interpreter)."
},
{
"q": "Which of the following is a task performed by a systems programmer?",
"options": [
"Monitors the performance of the computer system.",
"Writes application programs for users.",
"Provides end-user support.",
"Repairs printers."
],
"answer": 0,
"module": "3",
"why": "Key: A. A systems programmer writes and maintains system software and monitors how well the system is performing. Application programmers write programs for users, help-desk staff give end-user support, and technicians repair printers."
},
{
"q": "Which of the following procedures checks for typographical errors?",
"options": [
"Double entry",
"Range check",
"Data type check",
"Reasonableness check"
],
"answer": 0,
"module": "1",
"why": "Key: A. Double entry is a verification method: the data is typed twice and the two copies are compared, so typing (typographical) mistakes show up. Range, data type and reasonableness checks are validation checks that only test whether data is sensible, not whether it was copied correctly."
},
{
"q": "Identify the domain name in the URL given below.<br>http://www.people.com/fun/index.htm",
"options": [
"fun",
"com",
"index.htm",
"people.com"
],
"answer": 3,
"module": "2",
"why": "Key: D. people.com is the domain name. \"com\" alone is just the top-level domain, \"fun\" is a folder on the server, and index.htm is the file name of the page."
},
{
"q": "Which of the following is considered a feature of a biometric system?",
"options": [
"Diagnoses medical symptoms.",
"Matches fingerprints.",
"Detects irregular heartbeats.",
"Is used to teach Biology."
],
"answer": 1,
"module": "1",
"why": "Key: B. Biometric systems identify people by their body features, such as fingerprints, faces or irises. The other options are medical or teaching uses that sound similar because \"bio\" means life."
},
{
"q": "The MAIN function of a firewall is that it",
"options": [
"is used by hackers to protect detection",
"protects computers from fires",
"prevents unauthorized access to a computer on a network",
"protects a stand-alone computer from hackers"
],
"answer": 2,
"module": "3",
"why": "Key: C. A firewall filters network traffic to block unauthorised access to computers on a network. It has nothing to do with real fires, hackers do not use it to hide, and a stand-alone computer has no network connection for a firewall to guard."
},
{
"q": "Which of the following should be used to connect computers over short distances?",
"options": [
"Coaxial",
"Fibre-optic",
"Armored cable",
"Twisted pair"
],
"answer": 3,
"module": "2",
"why": "Key: D. Twisted-pair cable (such as Cat 6 Ethernet cable) is cheap and is the usual choice for connecting computers in a LAN over short distances. Fibre-optic cable is used for long, high-speed links, coaxial cable is older and bulkier, and \"armored cable\" is an electrical cable, not a network medium."
},
{
"q": "Which of the following may NOT be sent by e-mail?",
"options": [
"Pictures",
"Video clip",
"Cheques",
"Text documents"
],
"answer": 2,
"module": "2",
"why": "Key: C. Pictures, video clips and text documents can all be attached to an e-mail as files. A paper cheque is a physical document, so it cannot be sent by e-mail."
},
{
"q": "Which of the following is NOT a method of making text stand out in a document?",
"options": [
"Subscript",
"Enlarging font size",
"Bold",
"Underline"
],
"answer": 0,
"module": "4",
"why": "Key: A. Subscript makes text smaller and lowers it below the line (as in H<sub>2</sub>O), so it does not make text stand out. Bold, underline and a larger font size all draw attention to text."
},
{
"q": "The number A157 entered into a cell of a spreadsheet can be considered as what data type?",
"options": [
"Label",
"Value",
"Formula",
"Function"
],
"answer": 0,
"module": "5",
"why": "Key: A. A157 starts with a letter, so the spreadsheet treats it as text: a label. A value is a number you can calculate with, and formulas and functions start with an equals sign."
},
{
"q": "The text \"UK\" has to be changed to \"United Kingdom\" throughout a document. Which word processing feature is BEST suited to this task?",
"options": [
"Spell check",
"Find and replace",
"Mail-merge",
"Block operation"
],
"answer": 1,
"module": "4",
"why": "Key: B. Find and replace finds every \"UK\" and swaps in \"United Kingdom\" in one go. Spell check finds misspellings, mail merge creates personalised letters, and a block operation works on one selected block at a time."
},
{
"q": "Which of the following is the correct process for inserting a repeated sentence in different locations of a document?",
"options": [
"Copy, cut and paste",
"Cut and paste",
"Copy and paste",
"Cut and copy"
],
"answer": 2,
"module": "4",
"why": "Key: C. Copy keeps the original sentence and lets you paste it in as many places as you like. Cut removes the original (B), and the other options mix the steps in ways that would lose the text or never paste it."
},
{
"q": "Which of the following PowerPoint features allows a user to run a presentation automatically?",
"options": [
"Transition",
"Timing",
"Custom animation",
"Slide master"
],
"answer": 1,
"module": "4",
"why": "Key: B. Setting slide timings (for example with Rehearse Timings) makes the slides advance on their own. Transitions are the visual effects between slides, custom animation moves objects on a slide, and the slide master controls the design of all slides. (Old-syllabus item: presentation software is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following may NOT be included in PowerPoint presentations?",
"options": [
"Photos",
"Text",
"Chat",
"Sound"
],
"answer": 2,
"module": "4",
"why": "Key: C. A live chat is a conversation tool, not something you insert into a slide. Photos, text and sound can all be placed on slides. (Old-syllabus item: presentation software is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following is the default justification of <u>numbers</u> in spreadsheets?",
"options": [
"Left",
"Full",
"Centred",
"Right"
],
"answer": 3,
"module": "5",
"why": "Key: D. Spreadsheets right-align numbers by default so that digits line up by place value. Text (labels) is left-aligned by default, and full and centred alignment must be chosen by the user."
},
{
"q": "Which of the following is normally used for website-to-website connection?",
"options": [
"Modem",
"Monitor",
"Hyperlink",
"Hypertext"
],
"answer": 2,
"module": "4",
"why": "Key: C. A hyperlink is the clickable link that takes you from one web page or site to another. Hypertext is the text that contains links, a modem connects a computer to the Internet, and a monitor is a display."
},
{
"q": "Item 39 refers to the following table.<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th></tr><tr><th>1</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>2</th><td></td><td>17</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>3</th><td></td><td>35</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>4</th><td></td><td>45</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>5</th><td></td><td>39</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>6</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>7</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>To add the values in cells B2 to B5, in the spreadsheet table above, which formula should be placed in cell B6?",
"options": [
"ADD (B2 : B5)",
"SUM (B2 : B6)",
"COUNT (B2 : B5)",
"SUM (B2 : B5)"
],
"answer": 3,
"module": "5",
"why": "Key: D. SUM(B2:B5) adds the four values. SUM(B2:B6) would include the cell B6 itself (a circular reference), COUNT counts how many cells hold numbers instead of adding them, and ADD is not a spreadsheet function."
},
{
"q": "Which of the following pre-defined functions in a spreadsheet can be used to indicate how a particular student performed as compared to others?",
"options": [
"RANK",
"COUNT",
"VLOOKUP",
"INDENTING"
],
"answer": 0,
"module": "5",
"why": "Key: A. RANK gives a student's position (1st, 2nd, 3rd …) compared with the rest of the list. COUNT counts cells, VLOOKUP looks up a value in a table, and indenting is formatting, not a function."
},
{
"q": "Which of the following characteristics must two database tables have in order for them to be linked?",
"options": [
"At least one common attribute name.",
"Composite keys.",
"At least two tuples in the table.",
"The same data in all tuples."
],
"answer": 0,
"module": "6",
"why": "Key: A. Two tables are related through a shared field (attribute), usually the primary key of one table appearing as a foreign key in the other. Composite keys are not required, the number of records does not matter, and the tables do not need identical data."
},
{
"q": "You created a spreadsheet with 7 columns and wish to enter the text \"WEEKLY REPORT\" to appear at the middle of the space used by the 7 columns. Which of the following spreadsheet features will enable this to be done?",
"options": [
"Centre",
"Merging",
"Merge and Centre",
"Indenting"
],
"answer": 2,
"module": "5",
"why": "Key: C. Merge and Centre joins the seven cells into one and centres the title across them. Centre alone only centres text inside one cell, merging alone leaves the text at the left, and indenting just moves text in from the edge."
},
{
"q": "Which of the following may NOT be used as a primary key in a database table?",
"options": [
"Composite key",
"Master key",
"Candidate key",
"Foreign key"
],
"answer": 3,
"module": "6",
"why": "Key: D. A foreign key is a field that refers to the primary key of another table, so it can repeat and cannot be this table's primary key. A candidate key or a composite key can be chosen as the primary key; \"master key\" is not a standard database term, but the expected answer is the foreign key."
},
{
"q": "The object that is used to produce a list of records that meets a particular criterion is a",
"options": [
"form",
"table",
"module",
"query"
],
"answer": 3,
"module": "6",
"why": "Key: D. A query selects only the records that meet the criteria you set (for example, Form = \"5\"). A table stores all the records, a form is for entering and viewing data, and a module holds program code."
},
{
"q": "Which of the following data types CANNOT be entered into a database table?",
"options": [
"Number",
"Text",
"Yes/no",
"Array"
],
"answer": 3,
"module": "6",
"why": "Key: D. Number, Text and Yes/No are all field data types in a database such as Access. An array is a programming structure that holds a list of values; it is not a field data type."
},
{
"q": "Consider the following algorithm.<pre>a = 7\nb = 9\na = b - a\nb = a + b\nWrite a, b</pre>The output of this algorithm is",
"options": [
"2, 9",
"2, 11",
"7, 9",
"7, 11"
],
"answer": 1,
"module": "7",
"why": "Key: B. Trace it: a = 9 - 7 = 2, then b = 2 + 9 = 11, so the output is 2, 11. Option A forgets to update b, and options C and D use the starting value of a instead of the new one."
},
{
"q": "Which of the following is a symbol in a flow chart?",
"options": [
"<svg viewBox=\"0 0 90 44\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a rectangle with rounded corners\"><rect x=\"8\" y=\"6\" width=\"74\" height=\"32\" rx=\"8\"/></svg>",
"<svg viewBox=\"0 0 90 44\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a plus-shaped (cross) outline\"><polygon points=\"35,4 55,4 55,14 68,14 68,30 55,30 55,40 35,40 35,30 22,30 22,14 35,14\"/></svg>",
"<svg viewBox=\"0 0 90 44\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a rectangle with a thick double border\"><rect x=\"12\" y=\"6\" width=\"66\" height=\"32\"/><rect x=\"16\" y=\"10\" width=\"58\" height=\"24\" stroke-width=\"2.6\"/></svg>",
"<svg viewBox=\"0 0 90 48\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a pentagon\"><polygon points=\"45,4 66,19 58,44 32,44 24,19\"/></svg>"
],
"answer": 0,
"module": "7",
"why": "Key: A. The rounded rectangle (terminator) is the flowchart symbol for Start and Stop. The cross, the thick double-bordered box and the pentagon are not standard symbols in the CSEC flowchart set."
},
{
"q": "Program debugging should be performed",
"options": [
"during the design phase",
"during the testing phase",
"before compiling the program",
"before identifying any test data"
],
"answer": 1,
"module": "8",
"why": "Key: B. Debugging means finding and fixing errors, and errors are found by testing the program, so debugging happens in the testing phase. You cannot debug code before it is written or compiled, and test data is needed to find many errors."
},
{
"q": "Consider the following fragment of code.<pre>Var     index:Integer;\nbegin\nindex := 1;\nWhile index&lt; 4 do\n begin\n  Write ('k');\n  index:= index+2;\n end;\nend.</pre>The output it produces is",
"options": [
"k<br>k<br>k<br>k",
"kk",
"kkkk",
"k<br>k"
],
"answer": 1,
"module": "8",
"why": "Key: B. index is 1 (print k), then 3 (print k), then 5, which stops the loop: k is printed twice. Write (not Writeln) keeps both on the same line, so the output is kk, not k on two lines (D). Options A and C print k four times."
},
{
"q": "Which of the following is a conditional branching control structure in Pascal?",
"options": [
"for-do",
"repeat-until",
"if-then-else",
"while-do"
],
"answer": 2,
"module": "8",
"why": "Key: C. if-then-else chooses between two branches depending on a condition, so it is selection (conditional branching). for-do, repeat-until and while-do are all loops (iteration)."
},
{
"q": "In Pascal the algorithm <b>x:=x*2</b> will cause x to be assigned",
"options": [
"thrice the current value of x",
"the square of the current value of x",
"twice the current value of x",
"half the current value of x"
],
"answer": 2,
"module": "8",
"why": "Key: C. x := x * 2 multiplies the current value of x by 2 and stores it back in x, doubling it. Thrice would be x*3, the square would be x*x, and half would be x/2."
},
{
"q": "The missing entry in the truth table below is<table><tr><th>a</th><th>b</th><th>a and b</th></tr><tr><td>1</td><td>0</td><td></td></tr></table>",
"options": [
"1",
"T",
"F",
"0"
],
"answer": 3,
"module": "8",
"why": "Key: D. AND gives 1 (true) only when both inputs are 1. Here b is 0, so a AND b is 0. The table uses 1s and 0s, so \"F\" means the same idea but is in the wrong format; 1 and T are wrong."
},
{
"q": "Which of the following is a valid Pascal data type?",
"options": [
"Numeric",
"Real",
"Number",
"Letter"
],
"answer": 1,
"module": "8",
"why": "Key: B. Real is a Pascal data type for numbers with decimal places (others are integer, char, string and boolean). Numeric, Number and Letter are not Pascal data types."
},
{
"q": "The Pascal code <b>var <i>x</i>, y</b> would generate an error. The term used to describe this type of error is",
"options": [
"run time error",
"execution error",
"logical error",
"syntax error"
],
"answer": 3,
"module": "8",
"why": "Key: D. The declaration breaks Pascal's grammar rules because it is missing the colon, the data type and the semicolon (var x, y : integer;), so it is a syntax error. Run-time (execution) errors happen while a program runs, and logic errors give wrong answers without breaking the rules."
},
{
"q": "Item 55 refers to the following pseudocode.<pre>Read A, B\nIf A&lt; 2\n  C ← 2\nElse\n  C ← 6\nEnd if\nD ← C*B+2\nWrite D</pre>What is printed by the pseudocode if the input values are 5 and 2 respectively?",
"options": [
"6",
"12",
"14",
"24"
],
"answer": 2,
"module": "7",
"why": "Key: C. A = 5 is not less than 2, so C ← 6. Then D = 6 × 2 + 2 = 14. Option A uses C = 2 (6 = 2 × 2 + 2), B forgets to add 2, and D works out 6 × (2 + 2)."
},
{
"q": "Which of the following is a function of a compiler?",
"options": [
"It converts a program code one line at a time.",
"It converts source code to object code.",
"It puts the instructions together.",
"It collects data."
],
"answer": 1,
"module": "8",
"why": "Key: B. A compiler translates the whole source code into object (machine) code in one go. Translating one line at a time is what an interpreter does, joining modules together is the linker's job, and compilers do not collect data."
},
{
"q": "Which of the following tasks does the algorithm listed below perform?<pre>Read (A , B)\nIf A&lt;B Then\nPrint(A);</pre>",
"options": [
"Reads two numbers and prints the first number if it is smaller than the second number.",
"Reads two numbers and prints the first number if it is larger than the second number.",
"Reads two numbers and prints the first number.",
"Reads two numbers and prints the smaller number."
],
"answer": 0,
"module": "7",
"why": "Key: A. A is printed only when A &lt; B, that is, when the first number is smaller than the second. It never prints A when A is larger (B), it does not always print A (C), and it prints nothing when B is the smaller number, so it does not always print the smaller one (D)."
},
{
"q": "Which of the following symbols is used to perform assignments in the programming language Pascal?",
"options": [
"=",
"←",
"= =",
": ="
],
"answer": 3,
"module": "8",
"why": "Key: D. Pascal uses := for assignment, for example total := total + mark. In Pascal = is used for comparison, ← is the assignment arrow in pseudocode, and == is used in languages such as Python and C."
},
{
"q": "Which of the following is the Pascal code used to declare an array WORD with 20 letters?",
"options": [
"VAR LIST: ARRAY[20] of char;",
"WORD: ARRAY[1..20] of char;",
"VAR WORD: ARRAY[1 to 20] of char;",
"VAR WORD: ARRAY[1..20] of char;"
],
"answer": 3,
"module": "8",
"why": "Key: D. The correct Pascal form is VAR name : ARRAY[low..high] OF type;. Option A uses the wrong name and no range, B leaves out VAR, and C uses \"to\" instead of the two dots."
},
{
"q": "Pascal is categorized as a",
"options": [
"first generation language",
"second generation language",
"third generation language",
"fourth generation language"
],
"answer": 2,
"module": "8",
"why": "Key: C. Pascal is a high-level, procedural language, which makes it a third-generation language (3GL), like C and Java. First generation is machine code, second generation is assembly language, and fourth generation languages are closer to English, such as SQL."
}
]
},
{
"kind": "p1",
"past": true,
"id": "PP1_2014J",
"title": "Paper 01 · June 2014",
"time": 90,
"syllabus": "Set on the previous syllabus (CXC 30/G/SYLL 08). Items marked as old-syllabus (for example number bases, floppy disks and presentation software) are outside the current syllabus, CXC 30/G/SYLL 17; Pascal items remain useful because Pascal is still an accepted language.",
"intro": "<p><b>CSEC Information Technology Paper 01 · May/June 2014</b> · 1 hour 30 minutes · 60 items</p><p class=\"hint\">Original: CXC CSEC Information Technology Paper 01, May/June 2014 (past paper, copyright © Caribbean Examinations Council). Transcribed for class practice in the Teacher's Version.</p><ol><li>Answer <b>ALL</b> items. Each item has four options lettered (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions (1 hour 30 minutes).</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>",
"items": [
{
"q": "Which of the following devices is used to input data into the computer?",
"options": [
"Monitor",
"Mouse",
"External hard drive",
"USB flash drive"
],
"answer": 1,
"module": "1",
"why": "Key: B. A mouse sends movements and clicks into the computer, so it is an input device. A monitor is output, and external hard drives and USB flash drives are storage."
},
{
"q": "Scanning an item at a computerized checkout station in a supermarket is an example of",
"options": [
"input",
"output",
"storing",
"processing"
],
"answer": 0,
"module": "1",
"why": "Key: A. Scanning the barcode captures data and sends it into the computer, which is input. Showing the price on the screen would be output, and looking up the price is processing."
},
{
"q": "A diskette is divided into a number of concentric circles called",
"options": [
"sectors",
"cylinders",
"tracks",
"clusters"
],
"answer": 2,
"module": "1",
"why": "Key: C. Tracks are the concentric rings on a magnetic disk. Sectors are slices of a track, a cylinder is the same track on stacked platters, and a cluster is a group of sectors."
},
{
"q": "The primary storage device that holds the data currently being processed by the computer is known as the",
"options": [
"Read Only Memory (ROM)",
"Random Access Memory (RAM)",
"Programmable ROM (PROM)",
"Erasable and Programmable ROM (EPROM)"
],
"answer": 1,
"module": "1",
"why": "Key: B. RAM holds the programs and data the CPU is working on right now. ROM, PROM and EPROM hold fixed instructions (such as start-up code) and are not used for the data currently being processed."
},
{
"q": "The hardware device that allows the user to see the results after processing is the",
"options": [
"monitor",
"camera",
"scanner",
"webcam"
],
"answer": 0,
"module": "1",
"why": "Key: A. A monitor displays output so you can see results. Cameras, scanners and webcams are input devices that capture images."
},
{
"q": "What type of management occurs when the operating system undertakes communication between a printer and the system unit?",
"options": [
"File",
"Process",
"Memory",
"Input output"
],
"answer": 3,
"module": "1",
"why": "Key: D. Controlling communication with devices such as printers is input/output (device) management. File management organises files and folders, process management shares the CPU between tasks, and memory management shares out RAM."
},
{
"q": "Which of the following has the largest data storage capacity?",
"options": [
"Optical drive",
"USB Flash drive",
"Flash memory card",
"Hard drive"
],
"answer": 3,
"module": "1",
"why": "Key: D. Hard drives commonly hold hundreds of gigabytes to several terabytes. Optical discs hold up to tens of gigabytes, and flash drives and memory cards are usually smaller than a hard drive."
},
{
"q": "In which of the following interface types is the user required to remember specific instructions and syntax?",
"options": [
"Menu-driven interface",
"Computer screen interface",
"Command-driven interface",
"Graphical user interface"
],
"answer": 2,
"module": "1",
"why": "Key: C. In a command-driven (command line) interface you must type exact commands with the correct syntax. Menus and GUIs show you the choices, and \"computer screen interface\" is not a type of user interface."
},
{
"q": "In modern personal computers, the CPU speed is measured in",
"options": [
"nanoseconds",
"milliseconds",
"MHz",
"GHz"
],
"answer": 3,
"module": "1",
"why": "Key: D. Modern CPUs run at billions of cycles per second, measured in gigahertz (GHz). MHz describes older, slower chips, and nanoseconds and milliseconds measure time rather than clock speed."
},
{
"q": "Which of the following is NEITHER a validation NOR a verification check?",
"options": [
"Storage media check",
"Inconsistency check",
"Data-type check",
"Range check"
],
"answer": 0,
"module": "1",
"why": "Key: A. \"Storage media check\" is not a data check at all. Inconsistency, data-type and range checks are all validation checks."
},
{
"q": "An example of operating system software is",
"options": [
"Microsoft Windows",
"Microsoft Office",
"Microsoft Word",
"Microsoft Excel"
],
"answer": 0,
"module": "1",
"why": "Key: A. Windows is an operating system. Office is an application suite, and Word and Excel are application programs inside it."
},
{
"q": "Advantages of electronic information processing include",
"options": [
"retraining of staff",
"less human intervention",
"increased amount of equipment",
"less savings on hardcopies"
],
"answer": 1,
"module": "3",
"why": "Key: B. Computers process data automatically, so fewer people need to handle it. Retraining staff and buying more equipment are costs, not advantages, and electronic processing gives more savings on printed copies, not less."
},
{
"q": "Which of the following represents a hexadecimal?",
"options": [
"5C<sub>16</sub>",
"10<sub>2</sub>",
"15<sub>10</sub>",
"23<sub>8</sub>"
],
"answer": 0,
"module": "1",
"why": "Key: A. The subscript gives the base, and hexadecimal is base 16; 5C also uses the hex digit C. The others are binary (base 2), decimal (base 10) and octal (base 8). (Old-syllabus item: number bases is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "The twos complement of a binary number is formed by",
"options": [
"changing all zeros to twos",
"changing all ones to twos",
"finding the ones complement twice",
"adding one to the ones complement"
],
"answer": 3,
"module": "1",
"why": "Key: D. To get the two's complement, flip every bit (ones complement) and then add 1. Binary has no digit 2, and finding the ones complement twice just gives back the original number. (Old-syllabus item: two's complement is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following provides transmission of data in BOTH directions at the same time?",
"options": [
"Half Duplex",
"Full Duplex",
"Null Duplex",
"Simplex"
],
"answer": 1,
"module": "2",
"why": "Key: B. Full duplex sends data both ways at the same time, like a phone call. Half duplex goes both ways but one at a time, simplex is one way only, and \"null duplex\" is not a real mode."
},
{
"q": "In the URL http://www.shoes.com, 'shoes.com' represents for the",
"options": [
"extension",
"company name",
"domain name",
"internet company"
],
"answer": 2,
"module": "2",
"why": "Key: C. shoes.com is the domain name of the website. The extension would be only .com, and a domain name is not necessarily a company's name."
},
{
"q": "Which of the following is NOT required to successfully implement teleconferencing?",
"options": [
"Sensor",
"Modem",
"Speaker",
"Microphone"
],
"answer": 0,
"module": "3",
"why": "Key: A. Teleconferencing needs a connection (such as a modem), microphones to speak and speakers to hear. A sensor measures physical things such as heat or light and is not needed."
},
{
"q": "Which type of processing system will use sequential file organization?",
"options": [
"Real time processing",
"Batch processing",
"Transaction processing",
"Online processing"
],
"answer": 1,
"module": "1",
"why": "Key: B. Batch processing (such as a monthly payroll) works through all records in order, which suits sequential files. Real-time, transaction and online processing need fast direct access to single records."
},
{
"q": "Transferring data from a remote computer to your computer is referred to as",
"options": [
"uploading",
"browsing",
"downloading",
"data mining"
],
"answer": 2,
"module": "2",
"why": "Key: C. Downloading brings data from a remote computer to yours. Uploading goes the other way, browsing is viewing web pages, and data mining is searching data for patterns."
},
{
"q": "Scrambling of messages at the sending end and unscrambling them at the receiving end is called",
"options": [
"espionage",
"encryption",
"coding",
"eavesdropping"
],
"answer": 1,
"module": "3",
"why": "Key: B. Encryption scrambles a message so only the receiver with the key can unscramble (decrypt) it. Espionage and eavesdropping are spying, and \"coding\" usually means programming."
},
{
"q": "The introduction of communication by means of computers has reduced the employment of which of the following groups?",
"options": [
"Messengers and postal workers",
"Analysts and programmers",
"Software testers and trainers",
"Web-masters and developers"
],
"answer": 0,
"module": "3",
"why": "Key: A. E-mail and messaging replaced much hand delivery of letters and notes, so fewer messengers and postal workers are needed. Analysts, programmers, testers, trainers, webmasters and developers are jobs that computers have created."
},
{
"q": "A webmaster is important to the company because he/she",
"options": [
"backs-up files and stores the disks at another location",
"monitors the shutting down of competitors' websites.",
"assigns web addresses to all users in a company",
"is responsible for the company website"
],
"answer": 3,
"module": "3",
"why": "Key: D. A webmaster creates, updates and maintains the company's website. Backups are done by technical or network staff, nobody legitimately shuts down competitors' sites, and users get e-mail addresses from the network administrator."
},
{
"q": "Working from home and linking to the office computer system to submit work is described as",
"options": [
"teleconferencing",
"telecommuting",
"telemarketing",
"teleworking"
],
"answer": 1,
"module": "3",
"why": "Key: B. Telecommuting is working from home and connecting to the office computer system. Teleworking means much the same thing, but CXC uses telecommuting for this definition, so B is the best answer. Teleconferencing is holding a meeting at a distance, and telemarketing is selling by phone."
},
{
"q": "Which of the following actions must be taken to get to record Number 50 of 100 records on a floppy disk?",
"options": [
"Convert to tape.",
"Fast forward to record 100, and then read backward.",
"First read records 1 through 49.",
"Go directly to record 50."
],
"answer": 3,
"module": "1",
"why": "Key: D. A disk is a direct-access medium: the read/write head can go straight to the record's location. Reading records 1 to 49 first (C) is how a tape works, and converting to tape or reading backwards makes no sense."
},
{
"q": "Which of the following is detected by the use of a pressure sensor?",
"options": [
"Motion",
"Light",
"Weight",
"Warmth"
],
"answer": 2,
"module": "1",
"why": "Key: C. A pressure sensor measures force pressing on it, such as a person's weight on a mat. Motion, light and warmth are detected by motion, light and temperature sensors."
},
{
"q": "The illegal copying, distribution or sale of proprietary software is known as",
"options": [
"computer fraud",
"computer theft",
"software fraud",
"software piracy"
],
"answer": 3,
"module": "3",
"why": "Key: D. Software piracy is copying, sharing or selling software without the owner's permission. Computer fraud is using a computer to cheat people out of money, and computer theft is stealing hardware."
},
{
"q": "Wireless transmission media do NOT include",
"options": [
"coaxial",
"infrared",
"satellite",
"line-of-sight"
],
"answer": 0,
"module": "2",
"why": "Key: A. Coaxial is a cable, so it is wired (cabled) media. Infrared, satellite and line-of-sight microwave links all send signals through the air."
},
{
"q": "Which of the following represents the function of a modem?",
"options": [
"Digital and upload",
"Analog and digital",
"Analog and download",
"Download and upload"
],
"answer": 1,
"module": "2",
"why": "Key: B. A modem converts digital signals to analog (modulation) and analog back to digital (demodulation). Uploading and downloading are things you do with the connection, not what the modem converts."
},
{
"q": "Which of the following computer crimes occurs when someone gathers confidential information about another individual and then impersonates that individual in order to commit fraud?",
"options": [
"Identity theft",
"Software piracy",
"Computer fraud",
"Electronic eavesdropping"
],
"answer": 0,
"module": "3",
"why": "Key: A. Pretending to be someone else using their personal details is identity theft. Fraud may follow, but the crime described is the stealing of identity; software piracy is illegal copying, and eavesdropping is secretly listening to communications."
},
{
"q": "Which of the following statements is TRUE about accessing files sequentially?",
"options": [
"Occurs in any order",
"Starting with the first record",
"Starting with the largest data field",
"Starting with the smallest data field"
],
"answer": 1,
"module": "1",
"why": "Key: B. Sequential access always starts at the first record and moves through the records in order. \"Any order\" describes direct access, and the size of a field has nothing to do with it."
},
{
"q": "Which of the following is NOT a method of making text stand out in a document?",
"options": [
"Bold",
"Subscript",
"Underline",
"Enlarging font size"
],
"answer": 1,
"module": "4",
"why": "Key: B. Subscript makes text smaller and lowers it, so it does not stand out. Bold, underline and a larger font all draw attention."
},
{
"q": "While typing in a document using a word processor, Susan made the following errors.<br><br>'I heard that Sanday was the last day for the shew.'<br><br>The feature of the software that allows her to locate and correct such errors is the",
"options": [
"spell check",
"grammar check",
"consistency check",
"reasonableness check"
],
"answer": 0,
"module": "4",
"why": "Key: A. \"Sanday\" and \"shew\" are misspelt words, which spell check finds. Grammar check looks at sentence structure, and consistency and reasonableness checks are data validation checks."
},
{
"q": "While typing a document it may be necessary to change the height of the characters. Which feature in Microsoft Word would be used?",
"options": [
"Letter size",
"Paper size",
"Page size",
"Font size"
],
"answer": 3,
"module": "4",
"why": "Key: D. Font size changes how tall the characters are. Paper size and page size change the sheet, and \"letter size\" is a paper size."
},
{
"q": "The intersection of a row and a column in a spreadsheet is called a",
"options": [
"cell",
"label",
"range",
"value"
],
"answer": 0,
"module": "5",
"why": "Key: A. A cell is where a row meets a column, such as B4. A label and a value are kinds of data in a cell, and a range is a group of cells."
},
{
"q": "In PowerPoint the view that permits the insertion of slides is the",
"options": [
"normal",
"note page",
"slide show",
"presenter"
],
"answer": 0,
"module": "4",
"why": "Key: A. Normal view is the editing view where you add and edit slides. Notes Page shows speaker notes, and Slide Show and Presenter view are for presenting. (Old-syllabus item: presentation software is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following is NOT a valid data type in Microsoft Access?",
"options": [
"Text",
"Auto-number",
"Date/time",
"Character"
],
"answer": 3,
"module": "6",
"why": "Key: D. Access has Text, AutoNumber and Date/Time field types but no \"Character\" type; single characters are stored as Text."
},
{
"q": "Which of the following is the default justification of <u>numbers</u> in spreadsheets?",
"options": [
"Left",
"Full",
"Centred",
"Right"
],
"answer": 3,
"module": "5",
"why": "Key: D. Numbers are right-aligned by default so the digits line up. Text is left-aligned by default."
},
{
"q": "Which of the following types of software should be used for applications that involve repetitive numerical calculations?",
"options": [
"Database",
"Operating system",
"Spreadsheet",
"Word processing"
],
"answer": 2,
"module": "5",
"why": "Key: C. Spreadsheets are built for calculations, and formulas can be copied to repeat them. Databases store and search records, word processors handle text, and an operating system runs the computer."
},
{
"q": "Spreadsheet formulae use",
"options": [
"values, labels or cell address",
"values, mathematical operators or cell addresses",
"labels or cell addresses",
"values or cell addresses"
],
"answer": 1,
"module": "5",
"why": "Key: B. A formula combines values and cell addresses using mathematical operators, as in =B2*1.15. Labels are text and are not used in calculations, and options C and D leave out the operators."
},
{
"q": "In creating a query, a student entered the following criteria for the date field.<br><br>&gt; = 05/11/2011 and &lt; = 05/14/2011<br><br>The output will show days",
"options": [
"after 14th May 2011 only",
"between 11th and 14th May 2011",
"before 11th May and after 14th May 2011",
"between the 14th May and 5th November 2011"
],
"answer": 1,
"module": "6",
"why": "Key: B. The dates are written month/day/year, so the criteria mean on or after 11 May and on or before 14 May 2011. Option C is the opposite range, and D reads the dates as day/month."
},
{
"q": "Which of the following characteristics must two database tables have in order for them to be linked?",
"options": [
"At least one common attribute name.",
"Composite keys.",
"At least two tuples in the table.",
"The same data in all tuples."
],
"answer": 0,
"module": "6",
"why": "Key: A. Tables are linked through a shared field, usually a primary key in one table that appears as a foreign key in the other. The other options are not requirements for a relationship."
},
{
"q": "You created a spreadsheet with 7 columns and wish to enter the text \"WEEKLY REPORT\" to appear at the middle of the space used by the 7 columns. Which of the following spreadsheet features will enable this to be done?",
"options": [
"Centre the text",
"Merge the columns",
"Indent the cells",
"Merge and Centre"
],
"answer": 3,
"module": "5",
"why": "Key: D. Merge and Centre joins the cells and centres the title across all seven columns. Centring alone works in a single cell, merging alone leaves the text on the left, and indenting only moves text in a little."
},
{
"q": "Which of the following is normally used for website-to-website connection?",
"options": [
"Modem",
"Monitor",
"Hyperlink",
"Hypertext"
],
"answer": 2,
"module": "4",
"why": "Key: C. A hyperlink takes you from one page or site to another. Hypertext is text that contains links, a modem connects to the Internet, and a monitor is a display."
},
{
"q": "The object that is used to produce a list of records that meets a particular criterion is a",
"options": [
"form",
"table",
"module",
"query"
],
"answer": 3,
"module": "6",
"why": "Key: D. A query picks out the records that meet set criteria. A table holds all records, a form is for data entry, and a module holds program code."
},
{
"q": "Which of the following is the BEST feature to use to display the same text at the bottom of each page of a multipage document?",
"options": [
"Footer",
"Header",
"Footnote",
"Endnote"
],
"answer": 0,
"module": "4",
"why": "Key: A. A footer repeats in the bottom margin of every page. A header repeats at the top, and footnotes and endnotes add notes to particular words."
},
{
"q": "Consider the following algorithm.<pre>a = 7\nb = 9\na = b - a\nb = a + b\nWrite a, b</pre>The output of this algorithm is",
"options": [
"2, 9",
"2, 11",
"7, 9",
"7, 11"
],
"answer": 1,
"module": "7",
"why": "Key: B. a = 9 - 7 = 2, then b = 2 + 9 = 11, so the output is 2, 11. The other options forget to use the new values."
},
{
"q": "In the Pascal programming language, which of the following is NOT an elementary data type?",
"options": [
"Array",
"Character",
"Real",
"Integer"
],
"answer": 0,
"module": "8",
"why": "Key: A. An array is a structured type that holds many values; it is built from elementary types. Char, real and integer are elementary (simple) data types."
},
{
"q": "Program debugging should be performed",
"options": [
"during the design phase",
"during the testing phase",
"before compiling the program",
"before identifying any test data"
],
"answer": 1,
"module": "8",
"why": "Key: B. Errors are found when the program is tested, so debugging is done in the testing phase. You cannot debug code that has not been written or compiled yet."
},
{
"q": "In representing algorithms, which of the following statements would be placed in the flowchart box shown below?<svg viewBox=\"0 0 90 44\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a rectangle\"><rect x=\"10\" y=\"6\" width=\"70\" height=\"32\"/></svg>",
"options": [
"Read A",
"A&gt;25",
"Count ← count + 1",
"Output C"
],
"answer": 2,
"module": "7",
"why": "Key: C. A rectangle is the process symbol, used for calculations and assignments such as Count ← count + 1. Read A and Output C go in a parallelogram (input/output), and the test A > 25 goes in a diamond (decision)."
},
{
"q": "Item 50 refers to the following information.<br><br>The steps involved in problem-solving include<br>I. developing an algorithm<br>II. defining the problem<br>III. testing the solution<br><br>What is the correct order of the steps listed above?",
"options": [
"I, II, III",
"II, I, III",
"II, III, I",
"III, I, II"
],
"answer": 1,
"module": "7",
"why": "Key: B. First define the problem (II), then develop an algorithm (I), then test the solution (III). You cannot write an algorithm before you understand the problem, or test before you have a solution."
},
{
"q": "Items 51-52 refer to the following information.<pre>ALGORITHM\nStep 1   Start\nStep 2   Get three numbers\nStep 3   Add the three numbers\nStep 4   Store the results in sum\nStep 5   Divide the results by 3\nStep 6   Store the result in Avg\nStep 7   Display Sum, Avg\nStep 8   Stop</pre>Step 2 in the above algorithm is an example of",
"options": [
"input",
"output",
"processing",
"storage"
],
"answer": 0,
"module": "7",
"why": "Key: A. Getting the three numbers brings data into the algorithm, which is input. Displaying (Step 7) is output, adding and dividing are processing, and Steps 4 and 6 are storage."
},
{
"q": "Which of the steps in the above algorithm are examples of processing?",
"options": [
"2 and 3",
"3 and 4",
"3 and 5",
"4 and 5"
],
"answer": 2,
"module": "7",
"why": "Key: C. Step 3 (add) and Step 5 (divide) are calculations, so they are processing. Step 2 is input and Step 4 is storage."
},
{
"q": "Which of the following is a valid Pascal data type?",
"options": [
"Numeric",
"Real",
"Number",
"Letter"
],
"answer": 1,
"module": "8",
"why": "Key: B. Real is a Pascal data type for numbers with decimals. Numeric, Number and Letter are not Pascal types."
},
{
"q": "The Pascal code <b>var <i>x</i>, y</b> would generate an error. The term used to describe this type of error is",
"options": [
"run time error",
"execution error",
"logical error",
"syntax error"
],
"answer": 3,
"module": "8",
"why": "Key: D. The declaration breaks Pascal's rules because the colon, type and semicolon are missing, so it is a syntax error. Run-time (execution) errors happen while the program runs, and logic errors give wrong results."
},
{
"q": "Item 55 refers to the following pseudocode.<pre>Read A, B\nIf A&lt;2\n  C ← 2\nElse\n  C ← 6\nEnd if\nD ← C*B+2\nWrite D</pre>What is printed by the pseudocode if the input values are 5 and 2 respectively?",
"options": [
"6",
"12",
"14",
"24"
],
"answer": 2,
"module": "7",
"why": "Key: C. A = 5 is not less than 2, so C ← 6, and D = 6 × 2 + 2 = 14. Option A uses C = 2, B forgets the + 2, and D adds before multiplying."
},
{
"q": "The LAST step in creating a program is to",
"options": [
"evaluate the solutions",
"test the solution",
"develop the algorithm",
"specify the design"
],
"answer": 1,
"module": "7",
"why": "Key: B. Of these steps, testing the solution comes last: you specify the design, develop the algorithm and then test it. Evaluating possible solutions happens early, when you choose which solution to use."
},
{
"q": "Which of the following tasks does the algorithm listed below perform?<pre>Read (A , B)\nIf A&lt;B Then\nPrint(A);</pre>",
"options": [
"Reads two numbers and prints the first number.",
"Reads two numbers and prints the smaller number.",
"Reads two numbers and prints the first number if it is larger than the second number.",
"Reads two numbers and prints the first number if it is smaller than the second number."
],
"answer": 3,
"module": "7",
"why": "Key: D. A is printed only when A &lt; B, so the first number is printed only if it is smaller. It does not always print A (A), it prints nothing when B is smaller (B), and C reverses the condition."
},
{
"q": "Which of the following symbols is used to perform assignments in the programming language Pascal?",
"options": [
"=",
"←",
"= =",
": ="
],
"answer": 3,
"module": "8",
"why": "Key: D. Pascal uses := for assignment. In Pascal = is used for comparison, ← is the pseudocode assignment arrow, and == belongs to languages such as Python and C."
},
{
"q": "Which of the following is the Pascal code used to declare an array WORD with 20 letters?",
"options": [
"WORD: ARRAY[1..20] of char;",
"VAR LIST: ARRAY[20] of char;",
"VAR WORD: ARRAY[1..20] of char;",
"VAR WORD: ARRAY[1 to 20] of char;"
],
"answer": 2,
"module": "8",
"why": "Key: C. The correct form is VAR WORD : ARRAY[1..20] OF char;. Option A leaves out VAR, B uses the wrong name and no range, and D uses \"to\" instead of two dots."
},
{
"q": "Which of the following activities is NOT involved in publishing a website?",
"options": [
"Uploading files",
"Using the PASCAL programming language",
"Subscribing to a web hosting plan",
"Registering a domain name"
],
"answer": 1,
"module": "4",
"why": "Key: B. Web pages are written in HTML (and similar web languages), not Pascal. Registering a domain name, getting web hosting and uploading the files are all part of publishing a site."
}
]
},
{
"kind": "p1",
"past": true,
"id": "PP1_2015J",
"title": "Paper 01 · June 2015",
"time": 90,
"syllabus": "Set on the previous syllabus (CXC 30/G/SYLL 08). Items marked as old-syllabus (for example number bases, floppy disks and presentation software) are outside the current syllabus, CXC 30/G/SYLL 17; Pascal items remain useful because Pascal is still an accepted language.",
"intro": "<p><b>CSEC Information Technology Paper 01 · May/June 2015</b> · 1 hour 30 minutes · 60 items</p><p class=\"hint\">Original: CXC CSEC Information Technology Paper 01, May/June 2015 (past paper, copyright © Caribbean Examinations Council). Transcribed for class practice in the Teacher's Version.</p><ol><li>Answer <b>ALL</b> items. Each item has four options lettered (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions (1 hour 30 minutes).</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>",
"items": [
{
"q": "Which of the following are considered computer hardware?",
"options": [
"Data",
"Programs",
"Operating systems",
"Output devices"
],
"answer": 3,
"module": "1",
"why": "Key: D. Hardware is physical equipment, such as output devices like printers and monitors. Data is raw facts, and programs and operating systems are software."
},
{
"q": "Resolution determines the clarity of the image displayed on a monitor. The term 'resolution' refers to the number of pixels",
"options": [
"present horizontally on the screen",
"present vertically on the screen",
"present in a unit area of the screen",
"that makes up the colour"
],
"answer": 2,
"module": "1",
"why": "Key: C. Resolution is how many pixels are packed into the screen area: more pixels in the same area gives a sharper image. Counting only across (A) or only down (B) is half the picture, and colour depth, not resolution, sets how many colours a pixel can show."
},
{
"q": "A diskette is divided into a number of concentric circles called",
"options": [
"sectors",
"cylinders",
"tracks",
"clusters"
],
"answer": 2,
"module": "1",
"why": "Key: C. Tracks are the concentric rings on a magnetic disk. Sectors are slices of a track, cylinders are matching tracks on stacked platters, and clusters are groups of sectors."
},
{
"q": "The storage capacity of a floppy disk is",
"options": [
"1.44 MB",
"1.44 GB",
"1440 KB",
"1440 MB"
],
"answer": 0,
"module": "1",
"why": "Key: A. A standard 3.5-inch floppy disk is labelled 1.44 MB. B and D are far too big. C (1440 KB) is really the same amount in kilobytes, so the item is a little ambiguous, but 1.44 MB is the expected answer. (Old-syllabus item: the floppy disk is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following devices is used to perform input into the computer?",
"options": [
"Monitor",
"Mouse",
"External hard drive",
"USB flash drive"
],
"answer": 1,
"module": "1",
"why": "Key: B. A mouse is an input device. A monitor is output, and hard drives and flash drives are storage."
},
{
"q": "Which of the following is a type of user interface?",
"options": [
"IDE",
"MIDI",
"ASCII",
"GUI"
],
"answer": 3,
"module": "1",
"why": "Key: D. A GUI (graphical user interface) is a user interface. IDE is a programming environment, MIDI is a music standard, and ASCII is a character code."
},
{
"q": "Which of the following is used by the CPU to temporarily store data?",
"options": [
"Buffer",
"Track",
"Sector",
"Cylinder"
],
"answer": 0,
"module": "1",
"why": "Key: A. A buffer is memory that holds data temporarily. Tracks, sectors and cylinders describe how a disk is laid out."
},
{
"q": "Encryption is used to",
"options": [
"disguise data and programs",
"commit computer crime",
"discard old equipment",
"physically prevent users from accessing a computer"
],
"answer": 0,
"module": "3",
"why": "Key: A. Encryption scrambles (disguises) data so that only someone with the key can read it. It is a protection, not a crime, and it is a software measure, not a physical lock."
},
{
"q": "In modern personal computers, the CPU speed is measured in",
"options": [
"nanoseconds",
"milliseconds",
"MHz",
"GHz"
],
"answer": 3,
"module": "1",
"why": "Key: D. Modern CPUs run at gigahertz (GHz) speeds. MHz describes older chips, and nanoseconds and milliseconds measure time."
},
{
"q": "Google Chrome is an example of",
"options": [
"the Internet Explorer",
"a web browser",
"a search engine",
"the World Wide Web"
],
"answer": 1,
"module": "2",
"why": "Key: B. Chrome is a web browser. Internet Explorer is another browser, a search engine finds pages (Google Search), and the World Wide Web is the collection of pages."
},
{
"q": "The four-bit binary representation of the decimal number 8 is",
"options": [
"0001",
"0010",
"0100",
"1000"
],
"answer": 3,
"module": "1",
"why": "Key: D. The four place values are 8, 4, 2, 1, so 8 is 1000. 0001 is 1, 0010 is 2 and 0100 is 4. (Old-syllabus item: converting between number bases is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following is considered a feature of a biometric system?",
"options": [
"Diagnoses medical symptoms.",
"Matches fingerprints.",
"Detects irregular heartbeats.",
"Helps to lubricate skeletal joints."
],
"answer": 1,
"module": "1",
"why": "Key: B. Biometric systems identify people by body features such as fingerprints. The other options are medical ideas that only sound similar."
},
{
"q": "Which of the following printers is MOST suitable for high volume printing?",
"options": [
"Dot matrix",
"Thermal",
"Inkjet",
"Laser"
],
"answer": 3,
"module": "1",
"why": "Key: D. Laser printers are fast, cheap per page and built for large print runs. Inkjets are slower and costlier per page, thermal printers make small receipts, and dot-matrix printers are slow and noisy."
},
{
"q": "The MAIN function of a firewall is that it",
"options": [
"is used by hackers to prevent detection",
"protects computer files",
"prevents unauthorized access to a computer on a network",
"protects a stand-alone computer from viruses"
],
"answer": 2,
"module": "3",
"why": "Key: C. A firewall filters network traffic to stop unauthorised access. Protecting files generally is too vague, and stopping viruses is the job of antivirus software."
},
{
"q": "Which of the following provides transmission of data in BOTH directions at the same time?",
"options": [
"Half duplex",
"Full duplex",
"Null duplex",
"Simplex"
],
"answer": 1,
"module": "2",
"why": "Key: B. Full duplex sends both ways at the same time. Half duplex takes turns, simplex is one way only, and null duplex does not exist."
},
{
"q": "In the URL http://www.shoes.com, 'shoes.com' stands for the",
"options": [
"extension",
"company name",
"domain name",
"Internet company"
],
"answer": 2,
"module": "2",
"why": "Key: C. shoes.com is the domain name of the site. The extension is just .com."
},
{
"q": "Which of the following devices produces a soft copy?",
"options": [
"Microfilm",
"Plotter",
"Printer",
"Visual Display Unit (VDU)"
],
"answer": 3,
"module": "1",
"why": "Key: D. A soft copy is output you cannot hold, shown on a screen (VDU). Printers and plotters produce hard copy on paper, and microfilm is a physical film."
},
{
"q": "A document used for the initial recording of data relating to business transactions is called a",
"options": [
"turnaround document",
"source document",
"primary document",
"main document"
],
"answer": 1,
"module": "1",
"why": "Key: B. A source document (for example an order form) is where data is first recorded. A turnaround document is output that comes back as input (such as a utility bill stub), and \"primary\" and \"main\" document are mail-merge terms."
},
{
"q": "Transferring data from a remote computer to your computer is referred to as",
"options": [
"uploading",
"browsing",
"downloading",
"data mining"
],
"answer": 2,
"module": "2",
"why": "Key: C. Downloading brings data from a remote computer to yours; uploading is the reverse."
},
{
"q": "Scrambling of messages at the sending end and unscrambling them at the receiving end is called",
"options": [
"espionage",
"encryption",
"coding",
"eavesdropping"
],
"answer": 1,
"module": "3",
"why": "Key: B. Encryption scrambles a message and decryption unscrambles it. Espionage and eavesdropping are spying."
},
{
"q": "The acronym 'HTTP' stands for",
"options": [
"Hyper Text Transfer Protocol",
"Hyper Text Transmission Protocol",
"Higher Text Transmission Protocol",
"Higher Text Transfer Protocol"
],
"answer": 0,
"module": "2",
"why": "Key: A. HTTP is HyperText Transfer Protocol. The other options swap in the wrong words."
},
{
"q": "Which of the following statements is NOT true of secondary storage media?",
"options": [
"Pictures and text can be stored.",
"Storage capacity is typically around 1.44 MB.",
"Information can be accessed more quickly than magnetic disks.",
"Large amounts of data can be stored."
],
"answer": 1,
"module": "1",
"why": "Key: B. Secondary storage today holds gigabytes or terabytes; 1.44 MB was only the old floppy disk, so B is not true. C is also doubtful (magnetic disks are themselves secondary storage), so this item is a little ambiguous, but some media such as solid-state drives really are faster than magnetic disks, so B is the best answer. A and D are true."
},
{
"q": "Which of the following protocols allows the user to talk internationally?",
"options": [
"FTP",
"VoIP",
"HTTP",
"IP"
],
"answer": 1,
"module": "2",
"why": "Key: B. VoIP (Voice over Internet Protocol) carries voice calls over the Internet, including overseas calls on apps like WhatsApp. FTP transfers files, HTTP transfers web pages, and IP addresses and routes packets."
},
{
"q": "What is the corresponding decimal value of 111 (base 2)?",
"options": [
"7",
"8",
"9",
"10"
],
"answer": 0,
"module": "1",
"why": "Key: A. 111 in binary is 4 + 2 + 1 = 7. The other values would need a different bit pattern (8 is 1000). (Old-syllabus item: converting between number bases is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "What is the result of the following operation?<br><br>10110 base 2 + 00101 base 2",
"options": [
"10111 base 2",
"11001 base 2",
"11011 base 2",
"10101 base 2"
],
"answer": 2,
"module": "1",
"why": "Key: C. 10110 is 22 and 00101 is 5; 22 + 5 = 27, which is 11011 in binary. Check: 16 + 8 + 2 + 1 = 27. (Old-syllabus item: binary arithmetic is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following is BEST suited to batch processing?",
"options": [
"Salary preparation",
"Online gaming",
"Flight simulation",
"Theatre booking"
],
"answer": 0,
"module": "1",
"why": "Key: A. Payroll is done for all workers together at set times, so it suits batch processing. Online gaming, flight simulation and theatre booking all need an instant (real-time or online) response."
},
{
"q": "Which of the following is NOT an operating system?",
"options": [
"MS Office",
"Windows",
"Mac OS",
"Linux"
],
"answer": 0,
"module": "1",
"why": "Key: A. MS Office is an application suite. Windows, Mac OS and Linux are operating systems."
},
{
"q": "The part of the central processing unit where simple calculations can take place is called the",
"options": [
"CU",
"ALU",
"SU",
"VDU"
],
"answer": 1,
"module": "1",
"why": "Key: B. The ALU (arithmetic logic unit) does calculations and comparisons. The CU (control unit) directs the CPU, a VDU is a monitor, and \"SU\" is not a CPU part."
},
{
"q": "Data can be transmitted between devices and computers using a wireless radio technology known as",
"options": [
"bluetooth",
"hotspot",
"microwave",
"fibre optic"
],
"answer": 0,
"module": "2",
"why": "Key: A. Bluetooth is a short-range wireless radio technology for linking devices such as earbuds and phones. A hotspot is a place or device offering Wi-Fi access, microwave is used for long-distance links, and fibre optic is a cable."
},
{
"q": "Which of the following limits network access between two or more networks?",
"options": [
"A firewall",
"Biometrics",
"An encryption",
"An anti-virus program"
],
"answer": 0,
"module": "3",
"why": "Key: A. A firewall sits between networks and controls what traffic may pass. Biometrics control who uses a device, encryption scrambles data, and antivirus software removes malware."
},
{
"q": "Selecting or highlighting a paragraph creates a",
"options": [
"file",
"merge",
"block",
"document"
],
"answer": 2,
"module": "4",
"why": "Key: C. Selected text is called a block, and you can then move, copy or format it (block operations). It does not create a new file, merge or document."
},
{
"q": "To complete her word processing assignment, Susie must align the text to both the left and right margins. Which type of alignment must Susie select to achieve this?",
"options": [
"Right",
"Left",
"Centre",
"Justified"
],
"answer": 3,
"module": "4",
"why": "Key: D. Justified alignment lines text up with both margins. Left and right alignment only line up one side, and centre puts lines in the middle."
},
{
"q": "Which of the following features allows the user to insert individual names in a primary document?",
"options": [
"Footers",
"Headers",
"Mail merge",
"Search and replace"
],
"answer": 2,
"module": "4",
"why": "Key: C. Mail merge combines a primary document with a data source to insert each person's name. Headers and footers repeat the same text on every page, and search and replace changes existing words."
},
{
"q": "In Microsoft PowerPoint, a single page shown on a screen to display information is called a",
"options": [
"slide",
"table",
"field",
"presentation"
],
"answer": 0,
"module": "4",
"why": "Key: A. Each page in PowerPoint is a slide; a set of slides makes a presentation. Tables and fields are not pages. (Old-syllabus item: presentation software is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "A2 is formatted as A<sup>2</sup> using",
"options": [
"strikethrough",
"subscript",
"superscript",
"small caps"
],
"answer": 2,
"module": "4",
"why": "Key: C. Superscript raises the 2 above the line. Subscript lowers it (as in H<sub>2</sub>O), strikethrough draws a line through text, and small caps changes letters to small capitals."
},
{
"q": "Which type of chart is NOT suitable for representing data over two years as shown in the table below?<table><tr><th>Country</th><th>2009</th><th>2010</th></tr><tr><td>A</td><td>300</td><td>600</td></tr><tr><td>B</td><td>500</td><td>800</td></tr><tr><td>C</td><td>500</td><td>600</td></tr></table>",
"options": [
"Column",
"Line",
"Bar",
"Pie"
],
"answer": 3,
"module": "5",
"why": "Key: D. A pie chart shows the parts of ONE whole, so it cannot compare two years side by side. Column, bar and line charts can show both years for each country."
},
{
"q": "Which of the following is the default justification of <b>numbers</b> in spreadsheets?",
"options": [
"Left",
"Full",
"Centred",
"Right"
],
"answer": 3,
"module": "5",
"why": "Key: D. Numbers are right-aligned by default; text is left-aligned."
},
{
"q": "Information produced from queries and tables in a specific format that can be printed from a database is called",
"options": [
"a file",
"a report",
"a binary",
"an object"
],
"answer": 1,
"module": "6",
"why": "Key: B. A report presents data from tables or queries in a formatted, printable layout. File, binary and object are not the name for this output."
},
{
"q": "Slides can be arranged using",
"options": [
"slide view",
"slide sorter",
"slide master",
"new slide"
],
"answer": 1,
"module": "4",
"why": "Key: B. Slide Sorter view shows all slides as thumbnails so you can drag them into a new order. Slide master controls design, and New Slide adds a slide. (Old-syllabus item: presentation software is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "The <svg viewBox=\"0 0 48 40\" style=\"width:100%;max-width:48px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"icon: a projector screen on a stand\"><line x1=\"6\" y1=\"6\" x2=\"42\" y2=\"6\" stroke-width=\"2.4\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"18\"/><line x1=\"24\" y1=\"24\" x2=\"24\" y2=\"34\"/><line x1=\"16\" y1=\"34\" x2=\"32\" y2=\"34\"/></svg> icon in a presentation is used for",
"options": [
"slide show view",
"notes view",
"outline view",
"normal view"
],
"answer": 0,
"module": "4",
"why": "Key: A. The projector-screen icon starts the slide show. Notes, outline and normal views are editing views with different icons. (Old-syllabus item: presentation software is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following characteristics must two database tables have in order for them to be linked?",
"options": [
"At least one common attribute name",
"Composite keys",
"At least two tuples in the table",
"The same data in all tuples"
],
"answer": 0,
"module": "6",
"why": "Key: A. Tables are linked through a shared field (a primary key matched by a foreign key). The other options are not requirements."
},
{
"q": "Which of the following effects is a special animation effect, where the information fades after it has been presented?",
"options": [
"Animation",
"Dimming",
"Entrance",
"Emphasis"
],
"answer": 1,
"module": "4",
"why": "Key: B. Dimming (\"dim after animation\") greys out a point once you have talked about it. Entrance and emphasis are other animation types, and \"animation\" is the general term. (Old-syllabus item: presentation software is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following is normally used for website-to-website connection?",
"options": [
"Modem",
"Monitor",
"Hyperlink",
"Hypertext"
],
"answer": 2,
"module": "4",
"why": "Key: C. A hyperlink connects one page or site to another. Hypertext is text containing links."
},
{
"q": "The object that is used to produce a list of records that meets a particular criterion is a",
"options": [
"form",
"table",
"module",
"query"
],
"answer": 3,
"module": "6",
"why": "Key: D. A query extracts the records that meet the criteria. Tables store data and forms are for entry."
},
{
"q": "Which of the following data types CANNOT be entered into a database table?",
"options": [
"Number",
"Text",
"Yes/no",
"Array"
],
"answer": 3,
"module": "6",
"why": "Key: D. Number, Text and Yes/No are field types; an array is a programming structure, not a field type."
},
{
"q": "Consider the following algorithm.<pre>a = 7\nb = 9\na = b - a\nb = a + b\nWrite a, b</pre>The output of this algorithm is",
"options": [
"2, 9",
"2, 11",
"7, 9",
"7, 11"
],
"answer": 1,
"module": "7",
"why": "Key: B. a = 9 - 7 = 2, then b = 2 + 9 = 11, giving 2, 11."
},
{
"q": "When breaking down a simple problem into its logical steps, what statement/instruction would the adding of two numbers be?",
"options": [
"A process",
"An output",
"An input",
"A storage"
],
"answer": 0,
"module": "7",
"why": "Key: A. Adding is a calculation, so it is a process (processing). Reading the numbers is input and displaying the answer is output."
},
{
"q": "What is the name given to an identifier that always holds the same value?",
"options": [
"Constant",
"Variable",
"Location",
"Storage"
],
"answer": 0,
"module": "7",
"why": "Key: A. A constant keeps the same value while the program runs (for example VAT = 0.15). A variable's value can change, and location and storage are not identifier types."
},
{
"q": "You are given the problem of finding the sum of THREE numbers, and you use an IPO chart to decompose the problem.<br><br>What is the correct order of the statements to be placed into the input, processing and output columns?",
"options": [
"Add the three numbers together/ number 1, number 2, number 3/ Total",
"Total/number 1, number 2, number 3/add the three numbers together",
"Number 1, number 2, number 3/ Total/add the three numbers together",
"Number 1, number 2, number 3/ add the three numbers together /Total"
],
"answer": 3,
"module": "7",
"why": "Key: D. Input is the three numbers, processing is adding them together, and output is the total. The other options put the steps in the wrong columns."
},
{
"q": "The integer variables a, b and c, are given the values 6, 10 and 2 respectively. What is the result of the expression <b>a MULT (b DIV c)</b>?",
"options": [
"0",
"20",
"30",
"120"
],
"answer": 2,
"module": "8",
"why": "Key: C. Work out the brackets first: 10 DIV 2 = 5. Then 6 × 5 = 30. 120 is 6 × 10 × 2, and 20 and 0 come from mixing up the operations."
},
{
"q": "The original code written by the programmer is termed",
"options": [
"object code",
"source code",
"machine code",
"symbolic code"
],
"answer": 1,
"module": "8",
"why": "Key: B. Source code is the program as the programmer writes it. Object code and machine code are what the translator produces."
},
{
"q": "Errors that result from NOT following the rules of the programming language are called",
"options": [
"execution errors",
"logic errors",
"run-time errors",
"syntax errors"
],
"answer": 3,
"module": "8",
"why": "Key: D. Breaking the grammar rules of a language is a syntax error. Logic errors give wrong results, and execution (run-time) errors happen while the program runs."
},
{
"q": "The LAST step in solving a problem is to",
"options": [
"evaluate the solution",
"test the solution",
"develop the algorithm",
"specify the design"
],
"answer": 1,
"module": "7",
"why": "Key: B. In the problem-solving steps you define the problem, design and develop the algorithm, and finally test (and validate) the solution. Evaluating possible solutions comes earlier, when choosing the best one."
},
{
"q": "The Pascal code <b>var <i>x</i>, y</b> would generate an error. The term used to describe this type of error is",
"options": [
"syntax",
"logical",
"execution",
"run-time"
],
"answer": 0,
"module": "8",
"why": "Key: A. The declaration is missing its colon, data type and semicolon, so it breaks Pascal's rules: a syntax error."
},
{
"q": "Item 55 refers to the following pseudocode.<pre>Read A, B\nIf A&lt; 2\n  C ← 2\nElse\n  C ← 6\nEnd if\nD ← C*B+2\nWrite D</pre>What is printed by the pseudocode if the input values are 5 and 2 respectively?",
"options": [
"6",
"12",
"14",
"24"
],
"answer": 2,
"module": "7",
"why": "Key: C. A = 5 is not less than 2, so C ← 6, and D = 6 × 2 + 2 = 14."
},
{
"q": "Which of the following statements includes loops?",
"options": [
"Sequencing",
"Repetition",
"Selection",
"Ordering"
],
"answer": 1,
"module": "7",
"why": "Key: B. Repetition (iteration) is the control structure that uses loops. Sequence runs steps once in order, and selection chooses between paths."
},
{
"q": "Which of the following is NOT a third-generation language?",
"options": [
"Assembly",
"COBOL",
"C",
"Pascal"
],
"answer": 0,
"module": "8",
"why": "Key: A. Assembly language is a second-generation (low-level) language. COBOL, C and Pascal are third-generation high-level languages."
},
{
"q": "Which of the following symbols is used to perform assignments in the programming language Pascal?",
"options": [
"=",
"←",
"= =",
": ="
],
"answer": 3,
"module": "8",
"why": "Key: D. Pascal uses := for assignment. (Option B is printed as an empty box in this copy of the paper; in the 2012 and 2014 versions of this item it is the arrow ←, the pseudocode assignment symbol.)"
},
{
"q": "A compiler is software that converts the",
"options": [
"program to output",
"source code to assembly code",
"source code to machine code",
"program to object code one instruction at a time"
],
"answer": 2,
"module": "8",
"why": "Key: C. A compiler translates the whole source code into machine code. Translating one instruction at a time is what an interpreter does, and converting to assembly code is not the compiler's main job."
},
{
"q": "A computer programmer is coding an algorithm which calculates the class average for a given exam. He creates a variable called class_avg. Which data type should he specify when declaring this variable?",
"options": [
"Integer",
"Real",
"Boolean",
"Character"
],
"answer": 1,
"module": "8",
"why": "Key: B. An average can have decimals (for example 67.4), so it needs the real data type. Integer would lose the decimal part, Boolean only holds true/false, and character holds one symbol."
}
]
},
{
"kind": "p1",
"past": true,
"id": "PP1_2016J",
"title": "Paper 01 · June 2016",
"time": 90,
"syllabus": "Set on the previous syllabus (CXC 30/G/SYLL 08). Items marked as old-syllabus (for example number bases, floppy disks and presentation software) are outside the current syllabus, CXC 30/G/SYLL 17; Pascal items remain useful because Pascal is still an accepted language.",
"intro": "<p><b>CSEC Information Technology Paper 01 · May/June 2016</b> · 1 hour 30 minutes · 60 items</p><p class=\"hint\">Original: CXC CSEC Information Technology Paper 01, May/June 2016 (past paper, copyright © Caribbean Examinations Council). Transcribed for class practice in the Teacher's Version.</p><ol><li>Answer <b>ALL</b> items. Each item has four options lettered (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions (1 hour 30 minutes).</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>",
"items": [
{
"q": "Keyboards, speakers and CD drives are",
"options": [
"peripheral devices",
"storage devices",
"output devices",
"input devices"
],
"answer": 0,
"module": "1",
"why": "Key: A. All three are devices connected to the system unit, so they are peripherals. They are not all storage, output or input: a keyboard is input, speakers are output and a CD drive is storage."
},
{
"q": "Scanning an item at a computerized checkout station in a supermarket is an example of",
"options": [
"input",
"output",
"storing",
"processing"
],
"answer": 0,
"module": "1",
"why": "Key: A. Scanning the barcode captures data and sends it into the computer, so it is input."
},
{
"q": "The Arithmetic/Logic Unit (ALU) is part of the",
"options": [
"Control Unit (CU)",
"Read Only Memory (ROM)",
"Central Processing Unit (CPU)",
"Random Access Memory (RAM)"
],
"answer": 2,
"module": "1",
"why": "Key: C. The ALU and the control unit are both parts of the CPU. The ALU is not inside the control unit, and ROM and RAM are memory, not processing parts."
},
{
"q": "The binary equivalent of the decimal number 7 is",
"options": [
"100<sub>2</sub>",
"101<sub>2</sub>",
"110<sub>2</sub>",
"111<sub>2</sub>"
],
"answer": 3,
"module": "1",
"why": "Key: D. 7 = 4 + 2 + 1, so it is 111 in binary. 100 is 4, 101 is 5 and 110 is 6. (Old-syllabus item: converting between number bases is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Which of the following is MOST suitable for printing building plans?",
"options": [
"Plotter",
"Laser printer",
"Dot-matrix printer",
"Thermal transfer printer"
],
"answer": 0,
"module": "1",
"why": "Key: A. Plotters print large, precise line drawings such as building plans and maps. Laser, dot-matrix and thermal printers are for normal-sized pages or receipts."
},
{
"q": "What type of management occurs when the operating system undertakes communication between a printer and the system unit?",
"options": [
"File",
"Process",
"Memory",
"Input/output"
],
"answer": 3,
"module": "1",
"why": "Key: D. Managing communication with devices such as printers is input/output management. File, process and memory management deal with files, running tasks and RAM."
},
{
"q": "Which of the following has the largest data storage capacity?",
"options": [
"Optical drive",
"USB flash drive",
"Flash memory card",
"Hard drive"
],
"answer": 3,
"module": "1",
"why": "Key: D. Hard drives commonly hold terabytes. Optical discs, USB flash drives and memory cards usually hold less."
},
{
"q": "Which of the following primary storage devices can be programmed only once?",
"options": [
"RAM",
"PROM",
"EPROM",
"EEPROM"
],
"answer": 1,
"module": "1",
"why": "Key: B. PROM (programmable ROM) can be written once and then never changed. EPROM and EEPROM can be erased and reprogrammed, and RAM is changed all the time."
},
{
"q": "The time taken by the read/write head to locate and transfer data is termed",
"options": [
"seek time",
"access time",
"transfer time",
"rotational time"
],
"answer": 1,
"module": "1",
"why": "Key: B. Access time is the total time to find the data and transfer it. Seek time only covers moving the head to the track, and transfer time only covers moving the data."
},
{
"q": "To use a program stored on a flash drive, it must be transferred into",
"options": [
"RAM",
"ROM",
"PALU",
"PROM"
],
"answer": 0,
"module": "1",
"why": "Key: A. Programs must be loaded into RAM (main memory) before the CPU can run them. ROM and PROM cannot be written to in normal use, and \"PALU\" is not a real component."
},
{
"q": "A diskette is divided into a number of concentric circles called",
"options": [
"tracks",
"sectors",
"clusters",
"cylinders"
],
"answer": 0,
"module": "1",
"why": "Key: A. Tracks are the concentric rings on a magnetic disk. Sectors are slices of tracks, clusters are groups of sectors, and cylinders are matching tracks on stacked platters."
},
{
"q": "Which of the following user interfaces/devices is BEST suited for a visually impaired person?",
"options": [
"Touchscreen",
"Menu driven",
"Braille keyboard",
"Command driven"
],
"answer": 2,
"module": "1",
"why": "Key: C. A Braille keyboard has raised dots that can be read by touch. Touchscreens and menus depend on seeing the screen, and command-driven interfaces require reading typed text."
},
{
"q": "Laser beam technology is used by a",
"options": [
"floppy disk",
"optical disk",
"magnetic disk",
"magnetic tape"
],
"answer": 1,
"module": "1",
"why": "Key: B. Optical disks (CD, DVD, Blu-ray) are read and written by a laser. Floppy disks, hard (magnetic) disks and tapes use magnetism."
},
{
"q": "Which of the following prefixes which relate to bytes are arranged from the smallest to the largest?",
"options": [
"Mega, giga, tera, kilo",
"Mega, tera, giga, kilo",
"Kilo, mega, giga, tera",
"Kilo, giga, mega, tera"
],
"answer": 2,
"module": "1",
"why": "Key: C. Kilobyte &lt; megabyte &lt; gigabyte &lt; terabyte, each about 1,000 (1,024) times bigger than the one before. The other orders are mixed up."
},
{
"q": "Which of the following provides transmission of data in BOTH directions at the same time?",
"options": [
"Half Duplex",
"Full Duplex",
"Null Duplex",
"Simplex"
],
"answer": 1,
"module": "2",
"why": "Key: B. Full duplex sends both ways at the same time. Half duplex takes turns and simplex is one way only."
},
{
"q": "In the URL http://www.shoes.com, 'shoes.com' represents the",
"options": [
"internet company",
"company name",
"domain name",
"extension"
],
"answer": 2,
"module": "2",
"why": "Key: C. shoes.com is the domain name. The extension would be only .com."
},
{
"q": "Programs that duplicate the knowledge and diagnostic skills displayed by humans performing specialized tasks are referred to as",
"options": [
"expert systems",
"virtual systems",
"engineering systems",
"knowledge systems"
],
"answer": 0,
"module": "3",
"why": "Key: A. An expert system stores an expert's knowledge and rules (for example, to help diagnose illness). \"Knowledge systems\" sounds close, but expert system is the correct term; virtual and engineering systems are something else."
},
{
"q": "The use of Information and Communications Technology (ICT) to conduct meetings at different locations is called",
"options": [
"teleconferencing",
"telecommuting",
"telemarketing",
"telephony"
],
"answer": 0,
"module": "3",
"why": "Key: A. Teleconferencing (including video conferencing) is holding a meeting with people in different places. Telecommuting is working from home, telemarketing is selling by phone, and telephony is phone technology in general."
},
{
"q": "Transferring data from a remote computer to your computer is referred to as",
"options": [
"uploading",
"browsing",
"downloading",
"data mining"
],
"answer": 2,
"module": "2",
"why": "Key: C. Downloading brings data from a remote computer to yours; uploading sends it the other way."
},
{
"q": "Scrambling of messages before sending is called",
"options": [
"coding",
"encryption",
"espionage",
"eavesdropping"
],
"answer": 1,
"module": "3",
"why": "Key: B. Encryption scrambles a message so only someone with the key can read it. Espionage and eavesdropping are spying."
},
{
"q": "Telecommuting can be BEST described as",
"options": [
"using the computer while commuting",
"using the telephone while commuting",
"working from home by connecting home and office",
"working from the office after establishing a connection at home"
],
"answer": 2,
"module": "3",
"why": "Key: C. Telecommuting means working from home while connected to the office system, so there is no travel to work. It is not using devices while travelling, and D reverses the idea."
},
{
"q": "A webmaster is important to the company because he/she",
"options": [
"backs up files and stores the disks at another location",
"monitors the shutting down of competitors' websites",
"assigns web addresses to all users in a company",
"is responsible for the company's website"
],
"answer": 3,
"module": "3",
"why": "Key: D. A webmaster builds, updates and maintains the company's website. The other tasks belong to other staff or are not legitimate jobs."
},
{
"q": "Any unauthorized person is allowed to view another person's name by merely providing a phone number to a service representative at a telephone company. This is an example of",
"options": [
"propaganda",
"eavesdropping",
"computer fraud",
"violation of privacy"
],
"answer": 3,
"module": "3",
"why": "Key: D. Giving out someone's personal details to a person with no right to them is a violation of privacy. Propaganda is spreading biased information, eavesdropping is secretly listening in, and fraud is cheating someone for gain."
},
{
"q": "Which of the following checks is NOT a validation technique?",
"options": [
"Range",
"Double entry",
"Inconsistency",
"Reasonableness"
],
"answer": 1,
"module": "1",
"why": "Key: B. Double entry is a verification method (typing data twice and comparing). Range, inconsistency and reasonableness checks are validation checks done by the computer."
},
{
"q": "Which of the following is detected by the use of a pressure sensor?",
"options": [
"Motion",
"Light",
"Weight",
"Warmth"
],
"answer": 2,
"module": "1",
"why": "Key: C. A pressure sensor measures force, such as weight. Motion, light and warmth have their own sensors."
},
{
"q": "The illegal copying, distribution or sale of proprietary software is known as",
"options": [
"computer fraud",
"computer theft",
"software fraud",
"software piracy"
],
"answer": 3,
"module": "3",
"why": "Key: D. Copying or selling software without permission is software piracy."
},
{
"q": "In an algorithm, item_price is a variable used to store the price of a grocery item. The MOST appropriate data type used for item_price is",
"options": [
"real",
"integer",
"boolean",
"character"
],
"answer": 0,
"module": "7",
"why": "Key: A. Prices have dollars and cents (for example 12.95), so they need the real data type. Integer drops the cents, Boolean holds true/false and character holds one symbol."
},
{
"q": "Which of the following types of documents is used for the initial recording of data relating to business transactions?",
"options": [
"Main",
"Source",
"Primary",
"Turnaround"
],
"answer": 1,
"module": "1",
"why": "Key: B. A source document is where data is first written down. A turnaround document is output that later returns as input, and main/primary document are mail-merge terms."
},
{
"q": "Which of the following is a sequential access medium?",
"options": [
"Floppy disk",
"Compact disk",
"Magnetic tape",
"Winchester disk"
],
"answer": 2,
"module": "1",
"why": "Key: C. Magnetic tape must be wound through in order, so it is sequential access. Floppy disks, CDs and Winchester (hard) disks are direct-access media."
},
{
"q": "Which of the following is NOT an example of commercial data processing?",
"options": [
"Budgeting",
"Invoice processing",
"Payroll processing",
"Forecasting hurricanes"
],
"answer": 3,
"module": "1",
"why": "Key: D. Hurricane forecasting is scientific processing. Budgeting, invoices and payroll are business (commercial) tasks."
},
{
"q": "In computing, 'word wrap' refers to",
"options": [
"placing text around a graphic",
"placing text at the back of a graphic",
"the automatic carrying forward of text once the current line is filled",
"the user having to manually place the cursor on a new line when the previous one is filled"
],
"answer": 2,
"module": "4",
"why": "Key: C. Word wrap automatically moves words to the next line when a line is full, so you do not press Enter. A and B describe text-wrapping options for pictures, and D is the opposite of word wrap."
},
{
"q": "Which word processing feature MUST John use if he wants to include his company's logo in the bottom margin of every page of a document?",
"options": [
"Header",
"Footer",
"Endnote",
"Footnote"
],
"answer": 1,
"module": "4",
"why": "Key: B. A footer sits in the bottom margin and repeats on every page. A header is at the top, and footnotes and endnotes are notes linked to particular text."
},
{
"q": "While typing a document it may be necessary to change the height of the characters. Which word processing feature should be used?",
"options": [
"Letter size",
"Paper size",
"Page size",
"Font size"
],
"answer": 3,
"module": "4",
"why": "Key: D. Font size changes the height of the characters. The others change the paper."
},
{
"q": "When text is aligned with both the left and right margins at the same time, this is called",
"options": [
"left and right alignment",
"right and left alignment",
"justified alignment",
"centre alignment"
],
"answer": 2,
"module": "4",
"why": "Key: C. Justified alignment lines text up with both margins. Centre alignment puts lines in the middle; A and B are not real names."
},
{
"q": "While entering text in a word processing document, Michelle noticed that each new letter entered was replacing the previous one. The mode activated in this case is",
"options": [
"type over",
"word wrap",
"delete",
"insert"
],
"answer": 0,
"module": "4",
"why": "Key: A. In typeover (overtype) mode new letters replace the ones already there. In insert mode, new letters push existing text along. Word wrap and delete do not replace letters as you type."
},
{
"q": "A thumbnail image on a webpage is used to<br>I. represent a smaller version of a larger image<br>II. provide a link to the other contents<br>III. emphasize text and images",
"options": [
"I only",
"III only",
"I and II only",
"II and III only"
],
"answer": 2,
"module": "4",
"why": "Key: C. A thumbnail is a small preview of a larger image, and clicking it usually links to the full image or page, so I and II are true. Thumbnails are not used to emphasise text, so III is false."
},
{
"q": "You have typed the characters '32'. Which of the following formatting features should be used to create '3<sup>2</sup>'?",
"options": [
"Superscript",
"Highlight",
"Subscript",
"Italics"
],
"answer": 0,
"module": "4",
"why": "Key: A. Superscript raises the 2 to make 3 squared. Subscript would lower it, and highlight and italics do not change its position."
},
{
"q": "Which of the following types of software should be used for applications that involve repetitive numerical calculations?",
"options": [
"Database",
"Spreadsheet",
"Word processing",
"Operating system"
],
"answer": 1,
"module": "5",
"why": "Key: B. Spreadsheets are designed for calculations that can be copied and repeated."
},
{
"q": "In what form is data stored in a database?",
"options": [
"Table",
"Chart",
"Numeric",
"String"
],
"answer": 0,
"module": "6",
"why": "Key: A. Database data is stored in tables made of records (rows) and fields (columns). Charts display data, and numeric and string are data types."
},
{
"q": "In creating a query, a student entered the following criteria for the date field.<br><br>&gt; = 05/11/2011 and &lt; = 05/14/2011<br><br>The output will show days",
"options": [
"after 14th May 2011 only",
"between 11th and 14th May 2011",
"before 11th May and after 14th May 2011",
"between the 14th May and 5th November 2011"
],
"answer": 1,
"module": "6",
"why": "Key: B. In month/day/year format the criteria select dates from 11 May to 14 May 2011. C is the opposite range, and D misreads the date format."
},
{
"q": "Which of the following MUST be placed in front of the column letter and row number to create an absolute reference?",
"options": [
"*",
"+",
"−",
"$"
],
"answer": 3,
"module": "5",
"why": "Key: D. A dollar sign makes a reference absolute, as in $B$2, so it does not change when the formula is copied. *, + and − are arithmetic operators."
},
{
"q": "You need to enter the text \"WEEKLY REPORT\" to appear in the middle of the space used by the five columns below. Which of the following spreadsheet commands will enable this to be done?<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><th>1</th><td></td><td>WEEKLY REPORT</td><td></td><td></td></tr><tr><th>2</th><td></td><td>January</td><td>1,245</td><td></td></tr><tr><th>3</th><td></td><td>February</td><td>1,450</td><td></td></tr><tr><th>4</th><td></td><td>March</td><td>2,550</td><td></td></tr></table>",
"options": [
"Centre the text",
"Indent the cells",
"Merge and centre",
"Merge the columns"
],
"answer": 2,
"module": "5",
"why": "Key: C. Merge and centre joins the cells and places the title in the middle of them. Centre alone works within one cell, merging alone leaves the text at the left, and indenting only shifts it a little."
},
{
"q": "Which of the following can be used in a spreadsheet to copy the same number across multiple rows in a single column?",
"options": [
"Fill handle",
"Cursor",
"Label",
"Cell"
],
"answer": 0,
"module": "5",
"why": "Key: A. Dragging the fill handle (the small square at the corner of a cell) copies its contents down the column. The cursor only shows your position, a label is text, and a cell is a single box."
},
{
"q": "In a spreadsheet, the column titles will always be visible when you scroll the spreadsheet if you first",
"options": [
"freeze the top row",
"lock the last column",
"lock the spreadsheet",
"freeze the first column"
],
"answer": 0,
"module": "5",
"why": "Key: A. Column titles are in the top row, so freezing the top row keeps them on screen when you scroll down. Freezing the first column keeps row labels visible instead, and locking protects cells from changes."
},
{
"q": "Which of the following is the correct sequence of steps to delete a field in a database table?",
"options": [
"Choose the delete row option.<br>Select row to be deleted and right click.<br>Open table in design view.<br>Choose yes to confirm deletion.",
"Open table in design view.<br>Select row to be deleted and right click.<br>Choose the delete row option.<br>Choose yes to confirm deletion.",
"Select row to be deleted and right click.<br>Open table in design view.<br>Choose the delete row option.<br>Choose yes to confirm deletion.",
"Select row to be deleted and right click.<br>Choose the delete row option.<br>Open table in design view.<br>Choose yes to confirm deletion."
],
"answer": 1,
"module": "6",
"why": "Key: B. In Design View each field is a row, so you must open Design View first, then right-click the field's row, choose Delete Rows and confirm. The other options try to select or delete before the table is open in Design View."
},
{
"q": "Consider the following algorithm.<pre>a = 7\nb = 9\na = b - a\nb = a + b\nWrite a, b</pre>The output of this algorithm is",
"options": [
"2, 9",
"2, 11",
"7, 9",
"7, 11"
],
"answer": 1,
"module": "7",
"why": "Key: B. a = 9 - 7 = 2, then b = 2 + 9 = 11, giving 2, 11."
},
{
"q": "Which of the following flowchart symbols represents a process?",
"options": [
"<svg viewBox=\"0 0 90 44\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a rectangle\"><rect x=\"10\" y=\"6\" width=\"70\" height=\"32\"/></svg>",
"<svg viewBox=\"0 0 90 48\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a circle\"><circle cx=\"45\" cy=\"24\" r=\"19\"/></svg>",
"<svg viewBox=\"0 0 90 52\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a diamond\"><polygon points=\"45,3 70,26 45,49 20,26\"/></svg>",
"<svg viewBox=\"0 0 90 44\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a parallelogram\"><polygon points=\"26,6 82,6 64,38 8,38\"/></svg>"
],
"answer": 0,
"module": "7",
"why": "Key: A. The rectangle is the process symbol. The circle is a connector, the diamond is a decision, and the parallelogram is input/output."
},
{
"q": "Program debugging should be performed",
"options": [
"during the design phase",
"during the testing phase",
"before compiling the program",
"before identifying any test data"
],
"answer": 1,
"module": "8",
"why": "Key: B. Errors are found by testing, so debugging happens in the testing phase."
},
{
"q": "In representing algorithms, which of the following statements would be placed in the flowchart box shown below?<svg viewBox=\"0 0 90 44\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a rectangle\"><rect x=\"10\" y=\"6\" width=\"70\" height=\"32\"/></svg>",
"options": [
"A&gt;25",
"Read A",
"Output C",
"Count ← count + 1"
],
"answer": 3,
"module": "7",
"why": "Key: D. A rectangle is the process symbol, used for assignments like Count ← count + 1. A > 25 belongs in a decision diamond, and Read A and Output C belong in input/output parallelograms."
},
{
"q": "Data that cannot be changed during the execution of the program are called",
"options": [
"variables",
"constants",
"characters",
"strings"
],
"answer": 1,
"module": "7",
"why": "Key: B. Constants keep the same value while the program runs. Variables can change, and characters and strings are data types."
},
{
"q": "Which of the following tasks does the algorithm below perform?<pre>Read (A , B)\nIf A&lt;B Then\nPrint(A);</pre>",
"options": [
"Reads two numbers and prints the first number",
"Reads two numbers and prints the smaller number",
"Reads two numbers and prints the first number if it is larger than the second number",
"Reads two numbers and prints the first number if it is smaller than the second number"
],
"answer": 3,
"module": "7",
"why": "Key: D. A is printed only when A &lt; B. It does not always print A, it prints nothing when B is the smaller number, and C reverses the condition."
},
{
"q": "The type of programming language in which instructions are written using abbreviated forms of words is known as",
"options": [
"assembly language",
"machine language",
"high level language",
"machine code"
],
"answer": 0,
"module": "8",
"why": "Key: A. Assembly language uses short mnemonics such as ADD, MOV and JMP. Machine language/code is 0s and 1s, and high-level languages use fuller English-like words."
},
{
"q": "Which of the following is a valid Pascal data type?",
"options": [
"Numeric",
"Real",
"Number",
"Letter"
],
"answer": 1,
"module": "8",
"why": "Key: B. Real is a Pascal data type; the others are not."
},
{
"q": "What type of errors are caused by not following the rules of a particular computer programming language when creating a software?",
"options": [
"Grammar",
"Run time",
"Syntax",
"Logic"
],
"answer": 2,
"module": "8",
"why": "Key: C. Breaking the rules of a programming language is a syntax error. \"Grammar error\" is not the technical term, run-time errors happen while running, and logic errors give wrong answers."
},
{
"q": "The terms \"END\" and \"STOP\" used in algorithms are called",
"options": [
"loops",
"outputs",
"processes",
"terminators"
],
"answer": 3,
"module": "7",
"why": "Key: D. START, END and STOP mark where an algorithm begins and ends, so they are terminators. They are not loops, outputs or processes."
},
{
"q": "The LAST step in creating a program is to",
"options": [
"evaluate the solutions",
"test the solution",
"develop the algorithm",
"specify the design"
],
"answer": 1,
"module": "7",
"why": "Key: B. Of these steps, testing comes last. Evaluating possible solutions, specifying the design and developing the algorithm all come before it."
},
{
"q": "Item 57 refers to the following code.<pre>sum ← 0\ncount ← ___\nWhile count &lt; 10 do\n     count = count + 1\n     Read num\n     sum = sum + num\nendwhile\nPrint sum</pre>If the While loop is to be executed 10 times, what should be the initial value stored in count?",
"options": [
"0",
"1",
"2",
"10"
],
"answer": 0,
"module": "7",
"why": "Key: A. Starting at 0, count becomes 1, 2, … 10, so the loop body runs 10 times before count &lt; 10 is false. Starting at 1 gives 9 passes, 2 gives 8, and 10 gives none."
},
{
"q": "Item 58 refers to the following algorithm.<pre>I    ______ users for length, width\nII   ______ length, width\n     area ← length * width\nIII  ______ \"Area of rectangle is\", area</pre>Which of the following options can be used to replace I, II and III in the algorithm?",
"options": [
"Read, write, prompt",
"Write, read, prompt",
"Prompt, read, write",
"Read, prompt, write"
],
"answer": 2,
"module": "7",
"why": "Key: C. First prompt the user, then read the length and width, and finally write (output) the area. The other orders read before prompting or try to prompt at the end."
},
{
"q": "Which of the following is the Pascal code used to declare an array WORD with 20 letters?",
"options": [
"WORD: ARRAY[1..20] of char;",
"VAR LIST: ARRAY[20] of char;",
"VAR WORD: ARRAY[1..20] of char;",
"VAR WORD: ARRAY[1 to 20] of char;"
],
"answer": 2,
"module": "8",
"why": "Key: C. The correct form is VAR WORD : ARRAY[1..20] OF char;. A leaves out VAR, B uses the wrong name and no range, and D uses \"to\" instead of two dots."
},
{
"q": "What is the MOST appropriate control structure to be used for calculating the total of ten numbers?",
"options": [
"If-then-else",
"Repeat-until",
"While-do",
"For-do"
],
"answer": 3,
"module": "7",
"why": "Key: D. When you know the exact number of repetitions (ten), a FOR loop is the best choice. Repeat-until and while-do also loop but suit an unknown number of repetitions, and if-then-else is selection, not a loop."
}
]
},
{
"kind": "p1",
"past": true,
"id": "PP1_2017JAN",
"title": "Paper 01 · January 2017",
"time": 90,
"syllabus": "Set on the previous syllabus (CXC 30/G/SYLL 08). Items marked as old-syllabus (for example number bases, floppy disks and presentation software) are outside the current syllabus, CXC 30/G/SYLL 17; Pascal items remain useful because Pascal is still an accepted language.",
"intro": "<p><b>CSEC Information Technology Paper 01 · January 2017</b> · 1 hour 30 minutes · 60 items</p><p class=\"hint\">Original: CXC CSEC Information Technology Paper 01, January 2017 (past paper, copyright © Caribbean Examinations Council). Transcribed for class practice in the Teacher's Version.</p><ol><li>Answer <b>ALL</b> items. Each item has four options lettered (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions (1 hour 30 minutes).</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>",
"items": [
{
"q": "Resolution determines the clarity of the image displayed on a monitor. The term 'resolution' refers to the number of pixels",
"options": [
"that makes up the colour",
"arranged vertically on the screen",
"arranged horizontally on the screen",
"arranged in a unit area of the screen"
],
"answer": 3,
"module": "1",
"why": "Key: D. Resolution is how many pixels fit into the screen area; more pixels in the same space gives a sharper picture. Counting only across or only down is incomplete, and colour depth, not resolution, decides the colours."
},
{
"q": "Which of the following operations displays results?",
"options": [
"Input",
"Output",
"Storage",
"Processing"
],
"answer": 1,
"module": "1",
"why": "Key: B. Output displays (or prints) results. Input brings data in, processing works on it, and storage keeps it."
},
{
"q": "Of the storage devices listed below, which group does NOT use laser technology?",
"options": [
"CD, DVD, flash drive",
"CD, floppy disk, flash drive",
"Hard disk, floppy disk, magnetic tape",
"Magnetic tape, flash memory card, DVD"
],
"answer": 2,
"module": "1",
"why": "Key: C. Hard disks, floppy disks and tapes are all magnetic, so none uses a laser. Every other group contains a CD or DVD, which are optical (laser) media."
},
{
"q": "A set of data that is waiting to be either processed or output, is stored in a temporary block of memory called a",
"options": [
"track",
"sector",
"buffer",
"cylinder"
],
"answer": 2,
"module": "1",
"why": "Key: C. A buffer temporarily holds data waiting to be processed or output, such as a print job. Tracks, sectors and cylinders are parts of a disk's layout."
},
{
"q": "Which of the following processing modes is used for processing utility bills?",
"options": [
"Real time",
"Multitasking",
"Time sharing",
"Batch processing"
],
"answer": 3,
"module": "1",
"why": "Key: D. Utility bills (such as electricity or water bills) are produced for all customers together at the end of a period, which is batch processing. Real-time processing responds instantly, and multitasking and time sharing are ways of sharing a CPU."
},
{
"q": "Which of the following devices is an example of a manual input device?",
"options": [
"Touchscreen monitor",
"Barcode reader",
"Speaker",
"Plotter"
],
"answer": 0,
"module": "1",
"why": "Key: A. With a touchscreen the user enters data by hand. A barcode reader is a direct (automatic) data-capture device, and speakers and plotters are output devices."
},
{
"q": "Which part of the central processing unit (CPU) coordinates its activities?",
"options": [
"Register",
"Control unit",
"Main memory",
"Arithmetic logic unit"
],
"answer": 1,
"module": "1",
"why": "Key: B. The control unit fetches and decodes instructions and directs the other parts of the CPU. Registers hold data briefly, the ALU calculates, and main memory is outside the CPU."
},
{
"q": "The processing mode that allows one CPU to run many applications at the same time is called",
"options": [
"time-sharing",
"multiprocessing",
"batch processing",
"real time processing"
],
"answer": 0,
"module": "1",
"why": "Key: A. In time-sharing one CPU gives each program a tiny slice of time in turn, so they appear to run together. Multiprocessing needs more than one CPU, batch processing handles jobs in groups, and real-time processing responds instantly to input. (This item is a little ambiguous because the modern term is multitasking, which is not offered.)"
},
{
"q": "Which of the following types of technology is commonly used by banks to read data on cheques?",
"options": [
"POS",
"OCR",
"OMR",
"MICR"
],
"answer": 3,
"module": "1",
"why": "Key: D. MICR (magnetic ink character recognition) reads the magnetic-ink numbers printed on cheques. OCR reads ordinary printed text, OMR reads shaded marks such as on multiple-choice answer sheets, and POS is a checkout system."
},
{
"q": "A socket which is provided in a computer to allow for additional components is known as",
"options": [
"a fire wire",
"a system bus",
"an expansion card",
"an expansion slot"
],
"answer": 3,
"module": "1",
"why": "Key: D. An expansion slot is the socket on the motherboard. The expansion card is the board you plug into it, FireWire is a type of port, and the system bus carries data between components."
},
{
"q": "Cabled transmission media do NOT include",
"options": [
"coaxial",
"fibre optics",
"satellite",
"twisted pair"
],
"answer": 2,
"module": "2",
"why": "Key: C. Satellite links are wireless. Coaxial, fibre-optic and twisted-pair are all cables."
},
{
"q": "Which of the following is NOT a physical access restriction?",
"options": [
"Encryption",
"Security guard",
"Biometric system",
"Fire and water-proof cabinet"
],
"answer": 0,
"module": "3",
"why": "Key: A. Encryption is a software (logical) protection for data. Guards, biometric locks and secure cabinets physically control who can reach the equipment."
},
{
"q": "Item 13 refers to the following diagram.<br><br><b>FILE</b><table><tr><td>Open</td></tr><tr><td>Print</td></tr><tr><td>Edit</td></tr><tr><td>Open with ▶ (highlighted)</td></tr><tr><td>Send to ▶</td></tr><tr><td>Cut</td></tr><tr><td>Copy</td></tr><tr><td>Rename</td></tr></table>The diagram above represents a",
"options": [
"button",
"window",
"pop-up menu",
"pull-down menu"
],
"answer": 3,
"module": "1",
"why": "Key: D. The list hangs down from the FILE menu title, so it is a pull-down (drop-down) menu. A pop-up menu appears wherever you right-click, without a menu title; a button is a single control and a window is a whole framed area."
},
{
"q": "Which of the following provides the SLOWEST Internet access?",
"options": [
"T1 line",
"Network",
"Dial-up",
"Digital subscriber line (DSL)"
],
"answer": 2,
"module": "2",
"why": "Key: C. Dial-up uses an ordinary phone line at up to about 56 kbps, the slowest option. DSL and T1 lines are broadband connections, and \"network\" is not a type of Internet access."
},
{
"q": "The illegal copying and selling of programs is referred to as",
"options": [
"propaganda",
"software piracy",
"computer fraud",
"industrial espionage"
],
"answer": 1,
"module": "3",
"why": "Key: B. Copying and selling programs without permission is software piracy. Industrial espionage is stealing company secrets, and propaganda is biased information."
},
{
"q": "Which of the following is TRUE about an intranet?",
"options": [
"Offers unlimited access",
"Allows access to suppliers",
"Allows access to employees",
"Offers limited access to employees and suppliers"
],
"answer": 2,
"module": "2",
"why": "Key: C. An intranet is a private network for an organisation's own employees. Letting suppliers in as well (B, D) describes an extranet, and the Internet is the network with open access."
},
{
"q": "An electronic point of sale (EPOS) system may most likely NOT be found in",
"options": [
"an office",
"a pharmacy",
"a supermarket",
"an appliance store"
],
"answer": 0,
"module": "3",
"why": "Key: A. EPOS systems are tills that scan and sell goods, so they are found in shops such as pharmacies, supermarkets and appliance stores. An office does not sell goods over a counter."
},
{
"q": "A type of utility program used to remove application programs is",
"options": [
"a file compression program",
"a troubleshooting program",
"an antivirus program",
"an uninstall program"
],
"answer": 3,
"module": "1",
"why": "Key: D. An uninstaller removes programs and their files. Compression shrinks files, troubleshooters diagnose problems, and antivirus software removes malware."
},
{
"q": "What is the decimal equivalent for the binary number 101?",
"options": [
"2",
"4",
"5",
"8"
],
"answer": 2,
"module": "1",
"why": "Key: C. 101 in binary is 4 + 0 + 1 = 5. (Old-syllabus item: converting between number bases is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
},
{
"q": "Working from home and linking to the office computer system to submit work is described as",
"options": [
"teleconferencing",
"telecommuting",
"telemarketing",
"teleworking"
],
"answer": 1,
"module": "3",
"why": "Key: B. Telecommuting is working from home and connecting to the office system. Teleworking is very similar, but CXC uses telecommuting for this definition, so B is the best answer."
},
{
"q": "Which device is essential for computer-controlled systems to function with precision in an assembly line?",
"options": [
"Microphone",
"Speaker",
"Camera",
"Sensor"
],
"answer": 3,
"module": "1",
"why": "Key: D. Sensors measure position, pressure, temperature and so on, giving the control system the precise feedback it needs. Microphones and cameras capture sound and pictures, and speakers are output."
},
{
"q": "Which of the following checks is a data verification method?",
"options": [
"Visual",
"Range",
"Length",
"Parity"
],
"answer": 0,
"module": "1",
"why": "Key: A. A visual check (proofreading the entry against the source document) is verification. Range and length checks are validation checks, and a parity check detects errors in data transmission."
},
{
"q": "1011001 is an example of",
"options": [
"raw data",
"sorted data",
"information",
"secondary data"
],
"answer": 0,
"module": "1",
"why": "Key: A. A string of bits with no context has no meaning yet, so it is raw data. It becomes information only once it is processed and given meaning."
},
{
"q": "Which of the following functions performs calculations in a computer?",
"options": [
"Input",
"Output",
"Storage",
"Processing"
],
"answer": 3,
"module": "1",
"why": "Key: D. Calculations happen during processing (in the CPU)."
},
{
"q": "Records on magnetic tape are stored",
"options": [
"indexed sequentially",
"sequentially",
"randomly",
"directly"
],
"answer": 1,
"module": "1",
"why": "Key: B. Tape is a sequential medium: records are stored and read one after another. Direct, random and indexed-sequential storage need a disk."
},
{
"q": "What is the function of a network of computers?",
"options": [
"Organizes data among computers",
"Receives data from one computer",
"Allows users to obtain data from a central computer",
"Enables two or more computers to communicate"
],
"answer": 3,
"module": "2",
"why": "Key: D. A network links two or more computers so they can communicate and share resources. The other options describe only part of what some networks do."
},
{
"q": "Item 27 refers to the following types of memory.<br>I. ROM<br>II. RAM<br>III. EPROM<br><br>Which of the above types of memory are non-volatile?",
"options": [
"I and II only",
"I and III only",
"II and III only",
"I, II and III"
],
"answer": 1,
"module": "1",
"why": "Key: B. ROM and EPROM keep their contents when the power is off (non-volatile). RAM loses its contents when the power is turned off, so any option including II is wrong."
},
{
"q": "Which access method is used to retrieve data from a flash drive?",
"options": [
"Direct",
"Serial",
"Sequential",
"Indexed sequential"
],
"answer": 0,
"module": "1",
"why": "Key: A. A flash drive can go straight to any stored location, so it uses direct access. Serial and sequential access are for media like tape."
},
{
"q": "Which type of interface allows the user to communicate with the computer system by keying in instructions?",
"options": [
"Menu driven",
"Graphical user",
"Command driven",
"Touch sensitive"
],
"answer": 2,
"module": "1",
"why": "Key: C. In a command-driven interface you type (key in) commands. Menus and GUIs let you choose from options, and touch interfaces use taps and swipes."
},
{
"q": "Which of the following is/are advantage(s) of information processing?<br>I. Retraining of staff<br>II. Reducing human intervention<br>III. Increasing the amount of equipment needed",
"options": [
"I only",
"II only",
"I and II only",
"II and III only"
],
"answer": 1,
"module": "3",
"why": "Key: B. Only II is an advantage: computers reduce the amount of manual work. Retraining staff and buying more equipment are costs."
},
{
"q": "Item 31 refers to the following algorithm.<pre>y ← 5\nx ← y\ny ← 10\nz ← 3\nx ← x + y\ny ← x - z\nz ← x + y + z\ndisplay x, y, z</pre>What will be displayed when the algorithm is executed?",
"options": [
"5, 10, 3",
"15, 12, 3",
"15, 12, 20",
"15, 12, 30"
],
"answer": 3,
"module": "7",
"why": "Key: D. Trace it: x = 5, y = 10, z = 3; x = 5 + 10 = 15; y = 15 - 3 = 12; z = 15 + 12 + 3 = 30. B forgets to update z, and A shows the starting values."
},
{
"q": "The MOST appropriate data type for storing the amount of interest earned on a sum of money is",
"options": [
"real",
"char",
"string",
"integer"
],
"answer": 0,
"module": "7",
"why": "Key: A. Interest usually has cents (decimals), so it needs the real data type. Integer would drop the decimals, and char and string are text."
},
{
"q": "Which Pascal format is used to declare an array?",
"options": [
"Let Marks = [8]",
"Array = Marks(8);",
"Var Marks: Array [1..8] of integer;",
"Dim Marks (8) as integer"
],
"answer": 2,
"module": "8",
"why": "Key: C. Pascal declares arrays as Var name : Array[low..high] of type;. D is Visual Basic style, and A and B are not valid Pascal."
},
{
"q": "In Pascal language, which of the following is an acceptable variable name?",
"options": [
"real",
"#sum",
"9_num",
"dateofbirth"
],
"answer": 3,
"module": "8",
"why": "Key: D. dateofbirth starts with a letter and uses only letters. real is a reserved word, #sum contains a symbol, and 9_num starts with a digit."
},
{
"q": "What does the symbol <svg viewBox=\"0 0 90 52\" style=\"width:100%;max-width:90px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"a diamond\"><polygon points=\"45,3 70,26 45,49 20,26\"/></svg> represent in information technology?",
"options": [
"Start/Stop",
"Decision",
"Input",
"Process"
],
"answer": 1,
"module": "7",
"why": "Key: B. The diamond is the flowchart decision symbol, with Yes/No exits. Start/Stop is a rounded rectangle (oval), input is a parallelogram, and process is a rectangle."
},
{
"q": "Which of the following is NOT a characteristic of a pseudocode?",
"options": [
"It is precise.",
"It is unambiguous.",
"It has a finite number of steps.",
"It is a graphical representation of the solution."
],
"answer": 3,
"module": "7",
"why": "Key: D. Pseudocode is written in words, not drawn; the graphical representation is a flowchart. Being precise, unambiguous and finite are characteristics of a good algorithm in pseudocode."
},
{
"q": "The purpose of inserting comments with program code is to",
"options": [
"allow the user to input data",
"provide an explanation of the program",
"ensure that the program compiles completely",
"provide information on special features of the program"
],
"answer": 1,
"module": "8",
"why": "Key: B. Comments explain what the code does so that programmers can understand and maintain it. They are ignored by the compiler, so they do not affect input or compiling, and describing special features is the job of the user manual."
},
{
"q": "Items 38–39 refer to the following fragment of Pascal code.<pre>For x := 2 TO 15 DO\nBegin\n        Write(\"Enter the name of a country:  \");\n        Read (Country)\nEnd;</pre>How many times will the program above be executed?",
"options": [
"2",
"14",
"15",
"16"
],
"answer": 1,
"module": "8",
"why": "Key: B. x takes the values 2, 3, … 15, which is 15 - 2 + 1 = 14 times. 15 forgets the loop starts at 2, and 16 adds one too many."
},
{
"q": "Which fragment of code would be the CORRECT option to output the prompt and enter the name of the country on two lines?",
"options": [
"Read (\"Enter the name of a country:  \");<br>Write Country",
"Write (\"Enter the name of a country:  \");<br>Read Country",
"Readln (\"Enter the name of a country:  \")<br>Readln(Country);",
"Writeln (\"Enter the name of a country:  \");<br>Readln(Country);"
],
"answer": 3,
"module": "8",
"why": "Key: D. Writeln displays the prompt and moves to a new line, and Readln(Country) reads the answer on the next line. A and C try to read a prompt, and B uses Write, which keeps the cursor on the same line (and Read Country is missing its brackets)."
},
{
"q": "Item 40 refers to the following algorithm.<pre>Write (\"Enter price:  \")    (1)\nRead (price)                (2)\nVat = price * 15%           (3)\nWrite vat                   (4)</pre>Which line contains a processing statement?",
"options": [
"1",
"2",
"3",
"4"
],
"answer": 2,
"module": "7",
"why": "Key: C. Line 3 calculates the VAT, which is processing. Lines 1 and 4 are output and line 2 is input."
},
{
"q": "A trace table is used for",
"options": [
"testing an algorithm",
"declaring an array",
"coding an algorithm",
"representing an algorithm"
],
"answer": 0,
"module": "7",
"why": "Key: A. A trace table records variable values step by step during a dry run, to test whether the algorithm works. It is not used to declare, code or represent an algorithm."
},
{
"q": "The FIRST step in solving a problem is to",
"options": [
"test the solution",
"define the problem",
"evaluate the solution to the problem",
"develop the algorithm for the problem"
],
"answer": 1,
"module": "7",
"why": "Key: B. You must define (understand) the problem before you can design, develop or test a solution."
},
{
"q": "Item 43 refers to the following information about programming.<br>I. Compiling to create the object code<br>II. Creating the source code<br>III. Executing to test for accuracy<br><br>What is the correct sequence for the above steps in the development of a program?",
"options": [
"I, II and III",
"I, III and II",
"II, I and III",
"III, II and I"
],
"answer": 2,
"module": "8",
"why": "Key: C. First write the source code (II), then compile it into object code (I), then execute it to test (III). You cannot compile code that has not been written."
},
{
"q": "Machine language is categorized as a",
"options": [
"first generation language",
"second generation language",
"third generation language",
"fourth generation language"
],
"answer": 0,
"module": "8",
"why": "Key: A. Machine language (binary) is the first generation. Assembly is second, high-level languages such as Pascal are third, and languages such as SQL are fourth."
},
{
"q": "Program testing can be described as<br>I. checking that all documentation is included in the program<br>II. executing the program manually with input values to see the results<br>III. running the program using sample data to identify errors in the program",
"options": [
"I and II only",
"I and III only",
"II and III only",
"I, II and III"
],
"answer": 2,
"module": "8",
"why": "Key: C. Testing means running the program, either by hand (a dry run, II) or on the computer with test data (III), to find errors. Checking the documentation (I) is not testing the program."
},
{
"q": "Extracting information from a database can be achieved through the use of",
"options": [
"files",
"objects",
"queries",
"reports"
],
"answer": 2,
"module": "6",
"why": "Key: C. Queries extract the records that match criteria. Reports present data that has already been selected, and files and objects are general terms."
},
{
"q": "A single row of data in a database is called a",
"options": [
"record",
"table",
"field",
"file"
],
"answer": 0,
"module": "6",
"why": "Key: A. A row is a record (all the data about one item). A field is a column, and a table or file holds many records."
},
{
"q": "$A$3 is an example of what type of addressing mechanism?",
"options": [
"Red addressing",
"Relative addressing",
"Formula addressing",
"Absolute addressing"
],
"answer": 3,
"module": "5",
"why": "Key: D. The dollar signs fix both the column and the row, so $A$3 is an absolute address that does not change when copied. A3 without dollar signs would be relative. (\"Red addressing\" is printed as it appears in the paper.)"
},
{
"q": "Item 49 refers to the following spreadsheet.<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th></tr><tr><th>1</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>2</th><td></td><td>17</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>3</th><td></td><td>35</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>4</th><td></td><td>45</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>5</th><td></td><td>39</td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>6</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><th>7</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>To add the values 17, 35, 45 and 39 in the spreadsheet table above, which function should be placed in cell B6?",
"options": [
"=SUM(B2:B5)",
"=SUM(B2:B6)",
"=ADD(B2:B5)",
"=COUNT(B2:B6)"
],
"answer": 0,
"module": "5",
"why": "Key: A. =SUM(B2:B5) adds the four values. B includes B6 itself (a circular reference), ADD is not a function, and COUNT counts cells instead of adding."
},
{
"q": "Which of the following actions is required for creating a chart in a spreadsheet?",
"options": [
"Print the data",
"Select the paper size",
"Select the data",
"Select the orientation"
],
"answer": 2,
"module": "5",
"why": "Key: C. You must select the data the chart will show. Printing, paper size and orientation are page-setup tasks."
},
{
"q": "The default alignment for numbers in spreadsheet is",
"options": [
"left",
"right",
"centre",
"justified"
],
"answer": 1,
"module": "5",
"why": "Key: B. Numbers are right-aligned by default; text is left-aligned."
},
{
"q": "Item 52 refers to the following spreadsheet.<table><tr><th></th><th>B</th><th>C</th><th>D</th><th>E</th></tr><tr><th>1</th><td></td><td></td><td></td><td></td></tr><tr><th>2</th><td>First Name</td><td>Surname</td><td>Mark 1</td><td>Bonus Points</td></tr><tr><th>3</th><td>Kingsley</td><td>Clarke</td><td>69</td><td>No</td></tr><tr><th>4</th><td>John</td><td>Henry</td><td>69</td><td>Yes</td></tr><tr><th>5</th><td>Zara</td><td>Smith</td><td>71</td><td>Yes</td></tr><tr><th>6</th><td>Sean</td><td>Smith</td><td>91</td><td>No</td></tr></table>The spreadsheet has been sorted by a primary field and then a secondary field. What are the primary and secondary fields respectively?",
"options": [
"Surname, Mark 1",
"First Name, Surname",
"Mark 1, Bonus Points",
"Bonus Points, First Name"
],
"answer": 0,
"module": "5",
"why": "Key: A. Surnames are in A–Z order (Clarke, Henry, Smith, Smith), and the two Smiths are then ordered by Mark 1 (71, 91). First names (B) and bonus points (D) are not in order. Note that C also happens to fit this data (Mark 1 ascending, then No before Yes for the two 69s), so the item is ambiguous; A is the intended answer."
},
{
"q": "Item 53 refers to the following spreadsheet.<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><th>1</th><td></td><td></td><td></td><td></td></tr><tr><th>2</th><td>VAT</td><td>15%</td><td></td><td></td></tr><tr><th>3</th><td></td><td></td><td></td><td></td></tr><tr><th>4</th><td>Items</td><td>Cost Price</td><td>VAT</td><td>Total</td></tr><tr><th>5</th><td>Washer</td><td>4300</td><td></td><td></td></tr><tr><th>6</th><td>Dryer</td><td>1500</td><td></td><td></td></tr><tr><th>7</th><td>Stove</td><td>2750</td><td></td><td></td></tr></table>What formula should be inserted into C5 to calculate the VAT for the washer?",
"options": [
"= (5B*2B)",
"= (B5*$B$2)",
"= (5B*$B$2)",
"= (B5*B2/100)"
],
"answer": 1,
"module": "5",
"why": "Key: B. B5 is the cost price and $B$2 is the VAT rate, fixed with $ signs so the formula can be copied down for the dryer and stove. 5B is not a valid cell address, and D divides by 100 even though 15% is already stored as 0.15 (and B2 would shift when copied)."
},
{
"q": "Which of the following features allows the user to insert individual names in a primary document?",
"options": [
"Footer",
"Header",
"Mail merge",
"Search and replace"
],
"answer": 2,
"module": "4",
"why": "Key: C. Mail merge inserts each person's details from a data source into the primary document. Headers and footers repeat the same text on every page."
},
{
"q": "A website consists of a set of web pages that are linked together with",
"options": [
"hyperlinks",
"Bluetooth",
"HTTP",
"HTML"
],
"answer": 0,
"module": "4",
"why": "Key: A. Hyperlinks connect the pages of a website. HTML is the language pages are written in, HTTP is the transfer protocol, and Bluetooth is a short-range wireless technology."
},
{
"q": "In order to perform a block operation in a word processing application; the required text must first be",
"options": [
"cut",
"copied",
"aligned",
"selected"
],
"answer": 3,
"module": "4",
"why": "Key: D. Text must be selected (highlighted) before any block operation such as cut, copy, move or format can be applied to it."
},
{
"q": "I need to search a 50-page document for the acronym IT and insert the words 'Information Technology' in its place. Which of the following is the MOST efficient method for accomplishing this task?",
"options": [
"Find and replace option",
"Insert key found on the keyboard",
"Scan the document and quickly make the necessary changes",
"Cut each occurrence of IT and then type in Information Technology"
],
"answer": 0,
"module": "4",
"why": "Key: A. Find and replace changes every \"IT\" in one step. Scanning 50 pages or cutting each one by hand is slow and easy to get wrong, and the Insert key only switches between insert and overtype mode."
},
{
"q": "Which of the following must be considered when creating a website?<br>I. The intended audience<br>II. The artistic design of the whole website<br>III. The layout of the pages in the website",
"options": [
"I and II only",
"I and III only",
"II and III only",
"I, II and III"
],
"answer": 3,
"module": "4",
"why": "Key: D. Good web design plans for the audience, the overall look (design) and the layout of each page, so all three must be considered."
},
{
"q": "Which of the following is normally used for website-to-website connections?",
"options": [
"Modem",
"Monitor",
"Hypertext",
"Hyperlink"
],
"answer": 3,
"module": "4",
"why": "Key: D. A hyperlink takes you from one site to another. Hypertext is the text containing links, a modem connects to the Internet, and a monitor is a display."
},
{
"q": "Which of the following PowerPoint Presentation icons represents the slide sorter?",
"options": [
"<svg viewBox=\"0 0 48 40\" style=\"width:100%;max-width:48px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"icon: a projector screen on a stand\"><line x1=\"6\" y1=\"6\" x2=\"42\" y2=\"6\" stroke-width=\"2.4\"/><rect x=\"10\" y=\"6\" width=\"28\" height=\"18\"/><line x1=\"24\" y1=\"24\" x2=\"24\" y2=\"34\"/><line x1=\"16\" y1=\"34\" x2=\"32\" y2=\"34\"/></svg>",
"<svg viewBox=\"0 0 48 40\" style=\"width:100%;max-width:48px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"icon: four small squares in a grid\"><rect x=\"8\" y=\"6\" width=\"13\" height=\"11\"/><rect x=\"27\" y=\"6\" width=\"13\" height=\"11\"/><rect x=\"8\" y=\"23\" width=\"13\" height=\"11\"/><rect x=\"27\" y=\"23\" width=\"13\" height=\"11\"/></svg>",
"<svg viewBox=\"0 0 48 40\" style=\"width:100%;max-width:48px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"icon: a square split into a narrow left pane and two right panes\"><rect x=\"10\" y=\"4\" width=\"28\" height=\"32\"/><line x1=\"20\" y1=\"4\" x2=\"20\" y2=\"36\"/><line x1=\"20\" y1=\"22\" x2=\"38\" y2=\"22\"/></svg>",
"<svg viewBox=\"0 0 48 40\" style=\"width:100%;max-width:48px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"icon: a page with a folded corner and small dotted plus signs\"><polyline points=\"8,4 34,4 40,10 40,36 8,36 8,4\"/><line x1=\"24\" y1=\"9\" x2=\"24\" y2=\"17\"/><line x1=\"20\" y1=\"13\" x2=\"28\" y2=\"13\"/><line x1=\"16\" y1=\"21\" x2=\"16\" y2=\"29\"/><line x1=\"12\" y1=\"25\" x2=\"20\" y2=\"25\"/><line x1=\"30\" y1=\"21\" x2=\"30\" y2=\"29\"/><line x1=\"26\" y1=\"25\" x2=\"34\" y2=\"25\"/><line x1=\"10\" y1=\"32\" x2=\"38\" y2=\"32\" stroke-dasharray=\"2 2\"/></svg>"
],
"answer": 1,
"module": "4",
"why": "Key: B. The four small squares show slides laid out as thumbnails, which is Slide Sorter view. The projector screen (A) starts the slide show, the split window (C) is Normal view, and D is another view button. (Old-syllabus item: presentation software is not in the current CSEC IT syllabus, CXC 30/G/SYLL 17.)",
"old": true
}
]
},
{
"kind": "p1",
"past": true,
"id": "PP1_2020J",
"title": "Paper 01 · June 2020",
"time": 75,
"syllabus": "Set on the current syllabus, CXC 30/G/SYLL 17 (first examined May–June 2020).",
"intro": "<p><b>CSEC Information Technology Paper 01 · May/June 2020</b> · 1 hour 15 minutes · 60 items</p><p class=\"hint\">Original: CXC CSEC Information Technology Paper 01, May/June 2020 (past paper, copyright © Caribbean Examinations Council). Transcribed for class practice in the Teacher's Version.</p><ol><li>Answer <b>ALL</b> items. Each item has four options lettered (A), (B), (C), (D).</li><li>Start the optional timer to practise under exam conditions (1 hour 15 minutes).</li><li>Submit to see your score, the key and an explanation for every item.</li></ol>",
"items": [
{
"q": "Which of the following items are considered computer hardware?",
"options": [
"Data",
"Programs",
"Output devices",
"Operating systems"
],
"answer": 2,
"module": "1",
"why": "Key: C. Hardware is physical equipment, such as output devices. Data is raw facts, and programs and operating systems are software."
},
{
"q": "Data that has been processed and has meaning is termed",
"options": [
"information",
"database",
"storage",
"output"
],
"answer": 0,
"module": "1",
"why": "Key: A. Information is data that has been processed so that it has meaning. A database is an organised store of data, and storage and output are stages of the IPOS cycle."
},
{
"q": "Which of the following can be termed 'application software'?",
"options": [
"DOS",
"Linux",
"Mac Os",
"Internet Explorer"
],
"answer": 3,
"module": "1",
"why": "Key: D. Internet Explorer is a web browser, an application program. DOS, Linux and Mac OS are operating systems (system software)."
},
{
"q": "Which of the following activities would NOT be considered as cloud storage?",
"options": [
"Data stored on remote servers",
"Data stored and accessible on a LAN",
"Data back-up and storage devices on the Internet",
"Data managed by storage providers or hosting companies"
],
"answer": 1,
"module": "1",
"why": "Key: B. Data kept on a local area network stays inside the organisation, so it is local storage, not the cloud. Cloud storage is on remote servers over the Internet, run by providers."
},
{
"q": "Which of the following could NOT be classified as a cloud-based application?",
"options": [
"Gmail",
"Drop Box",
"Google drive",
"Windows OS"
],
"answer": 3,
"module": "1",
"why": "Key: D. Windows is an operating system installed on your own computer. Gmail, Dropbox and Google Drive run on remote servers and are reached over the Internet."
},
{
"q": "The lights in a room turn on as soon as a person enters. Which input device MOST likely controls the lighting in the room?",
"options": [
"Sensor",
"Remote",
"Scanner",
"Keyboard"
],
"answer": 0,
"module": "1",
"why": "Key: A. A motion sensor detects the person automatically and switches on the lights. A remote or keyboard needs someone to press it, and a scanner captures images of documents."
},
{
"q": "Which of the following devices is used to input data into the computer?",
"options": [
"Mouse",
"Monitor",
"USB flash drive",
"External hard drive"
],
"answer": 0,
"module": "1",
"why": "Key: A. A mouse is an input device. A monitor is output, and flash drives and hard drives are storage."
},
{
"q": "For which of the following interface types is the user required to remember specific instructions and syntax?",
"options": [
"Menu-driven",
"Graphical user",
"Computer screen",
"Command-driven"
],
"answer": 3,
"module": "1",
"why": "Key: D. A command-driven interface needs typed commands with exact syntax. Menus and GUIs show you the choices, and \"computer screen\" is not an interface type."
},
{
"q": "Item 9 refers to the following model of a globe.<br>[Picture: a solid three-dimensional model of the Earth (a globe).]<br>The MOST suitable printer for creating the model of the globe is",
"options": [
"a 3-D printer",
"a laser printer",
"an ink-jet printer",
"a thermal printer"
],
"answer": 0,
"module": "1",
"why": "Key: A. A 3-D printer builds solid objects layer by layer, so it can make a model globe. Laser, inkjet and thermal printers only print flat images on paper."
},
{
"q": "The RP Secondary School wants the administrative staff to have access to all student and teacher data. Which of the following networks would be MOST suitable to enable such access?",
"options": [
"WLAN",
"WAN",
"MAN",
"LAN"
],
"answer": 3,
"module": "2",
"why": "Key: D. The staff are all in one school building, so a local area network (LAN) is the best fit. A WAN or MAN covers a much larger area such as a country or city, and a WLAN is just a wireless LAN; the key given for this paper is LAN."
},
{
"q": "Item 11 refers to the following symbol.<br><svg viewBox=\"0 0 80 60\" style=\"width:100%;max-width:80px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"Wi-Fi symbol: a dot with three curved arcs above it\"><circle cx=\"40\" cy=\"50\" r=\"5\" fill=\"currentColor\"/><path d=\"M28 40 A17 17 0 0 1 52 40\" stroke-width=\"5\"/><path d=\"M18 30 A31 31 0 0 1 62 30\" stroke-width=\"5\"/><path d=\"M8 20 A45 45 0 0 1 72 20\" stroke-width=\"5\"/></svg>The symbol represents",
"options": [
"LAN",
"Wi-Fi",
"Hotspot",
"Bluetooth"
],
"answer": 1,
"module": "2",
"why": "Key: B. The dot with curved bars spreading out is the standard Wi-Fi symbol. Bluetooth has its own angular “B” rune symbol, and LAN and hotspot are not shown this way."
},
{
"q": "Unauthorized, real-time interception of a private communication on a computer network is referred to as",
"options": [
"propaganda",
"identity theft",
"industrial espionage",
"electronic eavesdropping"
],
"answer": 3,
"module": "3",
"why": "Key: D. Secretly intercepting (listening in on) communications as they happen is electronic eavesdropping. Identity theft is pretending to be someone, industrial espionage is stealing company secrets, and propaganda is biased information."
},
{
"q": "Double entry data verification involves",
"options": [
"different data entered once",
"the data being copied to another device",
"different data entered once by two different persons",
"the same data entered once then re-entered by another person"
],
"answer": 3,
"module": "1",
"why": "Key: D. In double entry the same data is typed twice (for example by two people) and the computer compares the two copies. Copying data or entering different data does not check for typing errors."
},
{
"q": "Part of a private network using Internet technology and public telecommunications that can be accessed by business suppliers, vendors, customers and partners is called an",
"options": [
"Internet",
"Intranet",
"Extranet",
"Ethernet"
],
"answer": 2,
"module": "2",
"why": "Key: C. An extranet lets selected outsiders such as suppliers and customers into part of a private network. An intranet is for employees only, the Internet is public, and Ethernet is a LAN technology."
},
{
"q": "Which of the following shows an increase in computer memory capacity?",
"options": [
"Terabyte → Gigabyte → Megabyte",
"Gigabyte → Kilobyte → Megabyte",
"Megabyte → Terabyte → Gigabyte",
"Megabyte → Gigabyte → Terabyte"
],
"answer": 3,
"module": "1",
"why": "Key: D. MB &lt; GB &lt; TB, so D increases at every step. A decreases, and B and C are out of order."
},
{
"q": "Which of the following functions is performed by a modem?",
"options": [
"Analog and digital",
"Digital and upload",
"Analog and download",
"Download and upload"
],
"answer": 0,
"module": "2",
"why": "Key: A. A modem converts between digital and analog signals (modulation and demodulation). Uploading and downloading are what you do over the connection."
},
{
"q": "In the URL http://www.shoes.com, 'shoes.com' stands for the",
"options": [
"extension",
"domain name",
"company name",
"Internet company"
],
"answer": 1,
"module": "2",
"why": "Key: B. shoes.com is the domain name. The extension would be just .com."
},
{
"q": "Transferring data from a remote computer to your computer is referred to as",
"options": [
"browsing",
"uploading",
"data mining",
"downloading"
],
"answer": 3,
"module": "2",
"why": "Key: D. Downloading brings data from a remote computer to yours; uploading sends it the other way."
},
{
"q": "Which of the following types of technologies is commonly used by banks to read data on cheques?",
"options": [
"POS",
"OCR",
"OMR",
"MICR"
],
"answer": 3,
"module": "1",
"why": "Key: D. MICR reads the magnetic-ink characters on cheques. OCR reads ordinary print, OMR reads shaded marks, and POS is a checkout system."
},
{
"q": "Which of the following operations is considered a feature of a biometric system?",
"options": [
"Matching fingerprints",
"Detecting irregular heartbeats",
"Diagnosing medical symptoms",
"Helping to lubricate skeletal joints"
],
"answer": 0,
"module": "1",
"why": "Key: A. Biometric systems identify people from body features such as fingerprints. The other options are medical ideas."
},
{
"q": "Telecommuting can be BEST described as",
"options": [
"using the computer while commuting",
"using the telephone while commuting",
"working from home by connecting home and office",
"working from the office after establishing a connection at home"
],
"answer": 2,
"module": "3",
"why": "Key: C. Telecommuting is working from home while connected to the office. It is not using devices while travelling, and D reverses the idea."
},
{
"q": "In order to use a program stored on a flash drive, the program must be transferred into",
"options": [
"ROM",
"RAM",
"PROM",
"EPROM"
],
"answer": 1,
"module": "1",
"why": "Key: B. Programs are loaded into RAM before the CPU can run them. ROM, PROM and EPROM are read-only in normal use."
},
{
"q": "Which of the following is NOT a hardware component of a computer system?",
"options": [
"Data file",
"Main memory",
"Peripheral device",
"Central processing unit"
],
"answer": 0,
"module": "1",
"why": "Key: A. A data file is stored information (software/data), not a physical part. Main memory, peripherals and the CPU are hardware."
},
{
"q": "Which of the following checks is NOT a validation technique?",
"options": [
"Range",
"Inconsistency",
"Double entry",
"Reasonableness"
],
"answer": 2,
"module": "1",
"why": "Key: C. Double entry is a verification method. Range, inconsistency and reasonableness are validation checks."
},
{
"q": "The process of scrambling messages at the sending end and unscrambling them at the receiving end is called",
"options": [
"coding",
"encryption",
"espionage",
"eavesdropping"
],
"answer": 1,
"module": "3",
"why": "Key: B. Encryption scrambles and decryption unscrambles messages. Espionage and eavesdropping are spying."
},
{
"q": "There are many software restrictions used by computers to protect data and maintain data integrity. Which of the following entities are software restriction media?<br>I. Viruses<br>II. Passwords<br>III. Encryptions",
"options": [
"I and II only",
"I and III only",
"II and III only",
"I, II and III"
],
"answer": 2,
"module": "3",
"why": "Key: C. Passwords and encryption are software measures that restrict access to data. Viruses are threats, not protections, so any option with I is wrong."
},
{
"q": "Which of the following devices can be used for both input and output?",
"options": [
"Touchscreen",
"Barcode reader",
"Flatbed scanner",
"Document reader"
],
"answer": 0,
"module": "1",
"why": "Key: A. A touchscreen shows output and takes input when you touch it. Barcode readers, scanners and document readers are input only."
},
{
"q": "Which of the following is true of accessing files sequentially?",
"options": [
"Occurs in any order",
"Starts with the first record",
"Starts with the largest data field",
"Starts with the smallest data field"
],
"answer": 1,
"module": "1",
"why": "Key: B. Sequential access starts at the first record and reads the records in order. \"Any order\" describes direct access, and field size has nothing to do with it."
},
{
"q": "Which of the following is a hardware user interface?",
"options": [
"GUI",
"Icon",
"Sensor",
"Touchscreen"
],
"answer": 3,
"module": "1",
"why": "Key: D. A touchscreen is a physical device that the user interacts with directly, so it is a hardware user interface. A GUI and icons are software, and a sensor collects data automatically rather than providing an interface for the user."
},
{
"q": "An official of Company X sells confidential information about his company to Company Y. What is the term used for this type of information misuse?",
"options": [
"Identity theft",
"Computer fraud",
"Industrial espionage",
"Electronic eavesdropping"
],
"answer": 2,
"module": "3",
"why": "Key: C. Passing a company's secrets to a competitor is industrial espionage. Identity theft involves pretending to be a person, and eavesdropping is intercepting communications."
},
{
"q": "Which of the following are NOT categorized as system software?",
"options": [
"Productivity tools",
"Operating systems",
"Translators",
"Utilities"
],
"answer": 0,
"module": "1",
"why": "Key: A. Productivity tools such as word processors and spreadsheets are application software. Operating systems, translators (compilers, interpreters) and utilities are system software."
},
{
"q": "Which part of the central processing unit (CPU) coordinates its activities?",
"options": [
"Register",
"Control unit",
"Main memory",
"Arithmetic logic unit"
],
"answer": 1,
"module": "1",
"why": "Key: B. The control unit directs and coordinates the CPU. Registers hold data briefly, the ALU calculates, and main memory is outside the CPU."
},
{
"q": "Before purchasing a computer, James was given a sheet with the following hardware specifications.<table><tr><td>Intel Pentium IV</td><td></td><td>64 bit</td></tr><tr><td>3.6 GHz</td><td>2 GB</td><td>533 MHz</td></tr><tr><td>50 RAM</td><td>160 GB</td><td>SATA</td></tr><tr><td>HDD</td><td>7200 rpm</td><td></td></tr></table>The word use of the computer is",
"options": [
"2 GB",
"64 bit",
"7200 rpm",
"533 MHz"
],
"answer": 1,
"module": "1",
"why": "Key: B. Word size is the number of bits the CPU handles at once, here 64 bits. 2 GB is the RAM, 7200 rpm is the hard disk speed, and 533 MHz is the bus/memory speed."
},
{
"q": "Which type of interface allows the user to communicate with the computer system by keying in instructions?",
"options": [
"Menu driven",
"Graphical user",
"Touch sensitive",
"Command-driven"
],
"answer": 3,
"module": "1",
"why": "Key: D. Typing (keying in) commands is a command-driven interface. Menus, GUIs and touch interfaces let you choose rather than type commands."
},
{
"q": "A webmaster is important to the company because he/she",
"options": [
"is responsible for the company's website",
"assigns web addresses to all users in a company",
"backs up files and stores the disks at another location",
"monitors the shutting down of competitors' websites"
],
"answer": 0,
"module": "3",
"why": "Key: A. The webmaster builds and maintains the company website. The other jobs belong to other staff or are not legitimate."
},
{
"q": "Which of the following is an example of a correctly formatted e-mail address?",
"options": [
"Lana.happy@net",
"@lana.happy.net",
"lana@happy.net",
"Lana@happy@net"
],
"answer": 2,
"module": "2",
"why": "Key: C. An e-mail address has a user name, one @ sign and a full domain name (happy.net). A has no proper domain, B has no user name, and D has two @ signs."
},
{
"q": "Which of the following types of software should be used for applications that involve repetitive numerical calculations?",
"options": [
"Database",
"Presentation",
"Spreadsheet",
"Word processing"
],
"answer": 2,
"module": "5",
"why": "Key: C. Spreadsheets are designed for repeated calculations with copyable formulas."
},
{
"q": "Selecting or highlighting a paragraph creates a",
"options": [
"file",
"block",
"merge",
"document"
],
"answer": 1,
"module": "4",
"why": "Key: B. Selected text is a block, ready for block operations such as move, copy or format."
},
{
"q": "The following formula is located in position B6 of a spreadsheet.<br><br>= B3 + B4 + $B$5<br><br>What would be the resulting formula if the initial formula was copied to the position located immediately on the left?",
"options": [
"C3 + C4 + C5",
"A3 + A4 + A5",
"A3 + A4 + $B$5",
"C3 + C4 + $B$5"
],
"answer": 2,
"module": "5",
"why": "Key: C. Copying one column to the left (to A6) changes the relative references B3 and B4 to A3 and A4, but the absolute reference $B$5 stays the same. C-column answers move the wrong way, and B wrongly changes $B$5."
},
{
"q": "In creating a query, a student entered the following criteria for the date field.<br><br>&gt; = 05/11/2017 and &lt; = 05/14/2017<br><br>The output will show days",
"options": [
"after 14 May 2017 only",
"from 11 to 14 May 2017",
"before 11 May and after 14 May 2017",
"between 14 May and 5 November 2017"
],
"answer": 1,
"module": "6",
"why": "Key: B. In month/day/year format the criteria select 11 May to 14 May 2017 inclusive. C is the opposite range, and D misreads the format."
},
{
"q": "Spreadsheet formulae use",
"options": [
"values or labels",
"labels or cell addresses",
"values, ranges or cell addresses",
"values, labels or cell addresses"
],
"answer": 2,
"module": "5",
"why": "Key: C. Formulae calculate with values, cell addresses and ranges (as in =SUM(B2:B5)*2). Labels are text and are not used in calculations, so any option with labels is wrong."
},
{
"q": "Which of the following buttons can be used to fully justify text?",
"options": [
"<svg viewBox=\"0 0 60 44\" style=\"width:100%;max-width:60px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"left alignment button\"><line x1=\"8\" y1=\"6\" x2=\"52\" y2=\"6\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"12\" x2=\"38\" y2=\"12\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"18\" x2=\"52\" y2=\"18\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"24\" x2=\"32\" y2=\"24\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"30\" x2=\"52\" y2=\"30\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"36\" x2=\"40\" y2=\"36\" stroke-width=\"2.6\"/></svg>",
"<svg viewBox=\"0 0 60 44\" style=\"width:100%;max-width:60px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"right alignment button\"><line x1=\"8\" y1=\"6\" x2=\"52\" y2=\"6\" stroke-width=\"2.6\"/><line x1=\"22\" y1=\"12\" x2=\"52\" y2=\"12\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"18\" x2=\"52\" y2=\"18\" stroke-width=\"2.6\"/><line x1=\"28\" y1=\"24\" x2=\"52\" y2=\"24\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"30\" x2=\"52\" y2=\"30\" stroke-width=\"2.6\"/><line x1=\"20\" y1=\"36\" x2=\"52\" y2=\"36\" stroke-width=\"2.6\"/></svg>",
"<svg viewBox=\"0 0 60 44\" style=\"width:100%;max-width:60px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"centre alignment button\"><line x1=\"8\" y1=\"6\" x2=\"52\" y2=\"6\" stroke-width=\"2.6\"/><line x1=\"15\" y1=\"12\" x2=\"45\" y2=\"12\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"18\" x2=\"52\" y2=\"18\" stroke-width=\"2.6\"/><line x1=\"18\" y1=\"24\" x2=\"42\" y2=\"24\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"30\" x2=\"52\" y2=\"30\" stroke-width=\"2.6\"/><line x1=\"14\" y1=\"36\" x2=\"46\" y2=\"36\" stroke-width=\"2.6\"/></svg>",
"<svg viewBox=\"0 0 60 44\" style=\"width:100%;max-width:60px;height:auto;display:block\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" role=\"img\" aria-label=\"justify alignment button\"><line x1=\"8\" y1=\"6\" x2=\"52\" y2=\"6\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"12\" x2=\"52\" y2=\"12\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"18\" x2=\"52\" y2=\"18\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"24\" x2=\"52\" y2=\"24\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"30\" x2=\"52\" y2=\"30\" stroke-width=\"2.6\"/><line x1=\"8\" y1=\"36\" x2=\"52\" y2=\"36\" stroke-width=\"2.6\"/></svg>"
],
"answer": 3,
"module": "4",
"why": "Key: D. The justify button has all lines the same length, touching both margins. A is align left (ragged right edge), B is align right, and C is centre."
},
{
"q": "Item 43 refers to the following table containing data on three countries, A, B and C, for 2018 and 2019.<table><tr><th>Country</th><th>2018</th><th>2019</th></tr><tr><td>A</td><td>300</td><td>600</td></tr><tr><td>B</td><td>500</td><td>800</td></tr><tr><td>C</td><td>500</td><td>600</td></tr></table>Which of the following types of charts is NOT suitable for representing the data above?",
"options": [
"Pie",
"Bar",
"Line",
"Column"
],
"answer": 0,
"module": "5",
"why": "Key: A. A pie chart can only show the parts of one whole, so it cannot compare two years. Bar, line and column charts can show both years."
},
{
"q": "The field that uniquely identifies a record in a database is called the",
"options": [
"foreign key",
"primary key",
"alternate key",
"secondary key"
],
"answer": 1,
"module": "6",
"why": "Key: B. The primary key is unique for every record. A foreign key links to another table, an alternate key is a candidate key not chosen as primary, and a secondary key is used for sorting or searching."
},
{
"q": "Which of the following sequences of steps is correct for deleting a field in a database table?",
"options": [
"Choose the delete row option.<br>Select row to be deleted and right click.<br>Open table in design view.<br>Choose yes to confirm deletion.",
"Open table in design view.<br>Select row to be deleted and right click.<br>Choose the delete row option.<br>Choose yes to confirm deletion.",
"Select row to be deleted and right click.<br>Open table in design view.<br>Choose the delete row option.<br>Choose yes to confirm deletion.",
"Select row to be deleted and right click.<br>Choose the delete row option.<br>Open table in design view.<br>Choose yes to confirm deletion."
],
"answer": 1,
"module": "6",
"why": "Key: B. Open Design View first (each field is a row there), right-click the field, choose Delete Rows and confirm. The other sequences try to select or delete before opening Design View."
},
{
"q": "Item 46 refers to the following database table.<table><tr><th>Item No.</th><th>Item Desc.</th><th>Quantity</th></tr><tr><td>H050</td><td>Hammer</td><td>20</td></tr><tr><td>H040</td><td>Hammer</td><td>40</td></tr><tr><td>FK030</td><td>Fork</td><td>35</td></tr><tr><td>FK020</td><td>Fork</td><td>40</td></tr><tr><td>FK015</td><td>Fork</td><td>45</td></tr></table>The database table above shows records sorted by",
"options": [
"Quantity in ascending order",
"Quantity in descending order",
"Item No. in ascending order",
"Item No. in descending order"
],
"answer": 3,
"module": "6",
"why": "Key: D. Item No. runs H050, H040, FK030, FK020, FK015, which is Z–A (descending) order. Quantity goes 20, 40, 35, 40, 45, so it is not sorted either way."
},
{
"q": "Which of the following clearly identifies a hyperlink on an HTML document?<br>I. A link to an email address<br>II. A link to another webpage<br>III. A link to another location within the webpage",
"options": [
"I and II only",
"I and III only",
"II and III only",
"I, II and III"
],
"answer": 3,
"module": "4",
"why": "Key: D. A hyperlink can point to an e-mail address (mailto:), another web page, or a bookmark on the same page, so all three are hyperlinks."
},
{
"q": "Which of the following is used for executing HTML code?",
"options": [
"A parser",
"A browser",
"An assembler",
"An interpreter"
],
"answer": 1,
"module": "2",
"why": "Key: B. A web browser reads the HTML and displays the page. An assembler translates assembly language, and although a browser contains a parser, the program you use to run (display) HTML is the browser."
},
{
"q": "Which security feature offers the LEAST protection to a Word document?",
"options": [
"Restricting editing",
"Adding a digital signature",
"Encrypting with a password",
"Saving as compatible with the appropriate software version"
],
"answer": 3,
"module": "4",
"why": "Key: D. Saving in a compatible format does nothing to protect the content. Restricting editing, adding a digital signature and encrypting with a password all protect the document."
},
{
"q": "Item 50 refers to the following spreadsheet.<table><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr><tr><th>1</th><td></td><td></td><td></td><td></td></tr><tr><th>2</th><td></td><td></td><td></td><td></td></tr><tr><th>3</th><td></td><td></td><td></td><td></td></tr><tr><th>4</th><td></td><td></td><td></td><td></td></tr><tr><th>5</th><td></td><td></td><td></td><td></td></tr><tr><th>6</th><td></td><td></td><td></td><td></td></tr><tr><th>7</th><td></td><td></td><td></td><td></td></tr><tr><th>8</th><td></td><td>=sum(B2::B6)</td><td>(shaded)</td><td></td></tr><tr><th>9</th><td></td><td></td><td></td><td></td></tr></table>If the formula in Cell B8 is copied to the shaded cell, C8, then the formula in Cell C8 would be",
"options": [
"=sum(B2:B6)",
"=sum(B3:B7)",
"=sum(C2:C6)",
"=sum(C3:C7)"
],
"answer": 2,
"module": "5",
"why": "Key: C. Copying one column to the right changes the relative column letter from B to C while the rows stay the same, giving =sum(C2:C6). A keeps the old column, and B and D wrongly shift the rows."
},
{
"q": "Item 51 refers to the following algorithm.<pre>Read (A, B)\nIf A &lt; B Then\nPrint(A);</pre>Which of the following tasks does the following algorithm perform?",
"options": [
"Reads two numbers and prints the first number",
"Reads two numbers and prints the smaller number",
"Reads two numbers and prints the first number if it is larger than the second number",
"Reads two numbers and prints the first number if it is smaller than the second number"
],
"answer": 3,
"module": "7",
"why": "Key: D. A is printed only when A &lt; B. It does not always print A, it prints nothing when B is smaller, and C reverses the condition."
},
{
"q": "Which of the following is an example of a conditional construct?",
"options": [
"IF ... THEN ... ELSE",
"FOR ... ENDWHILE",
"WHILE ... ENDWHILE",
"REPEAT ... UNTIL"
],
"answer": 0,
"module": "7",
"why": "Key: A. IF-THEN-ELSE chooses a path based on a condition (selection). FOR, WHILE and REPEAT are loops (iteration); \"FOR … ENDWHILE\" is also a mismatched pair."
},
{
"q": "When implementing a program, which of the following steps comes after executing?",
"options": [
"Linking",
"Compiling",
"Maintaining",
"Interpreting"
],
"answer": 2,
"module": "8",
"why": "Key: C. The order is write source code, compile (or interpret), link, execute, then maintain. Linking and compiling come before executing."
},
{
"q": "Which of the following is NOT a high-level programming language?",
"options": [
"C",
"Java",
"Pascal",
"Assembly"
],
"answer": 3,
"module": "8",
"why": "Key: D. Assembly language is low-level (second generation). C, Java and Pascal are high-level languages."
},
{
"q": "Which of the following terms is an invalid variable name?",
"options": [
"Sum",
"2count",
"Vat15",
"Count"
],
"answer": 1,
"module": "8",
"why": "Key: B. Variable names must start with a letter, so 2count is invalid. Sum, Vat15 and Count all start with a letter."
},
{
"q": "The decision box of a program flow chart shows the",
"options": [
"link to another page",
"test to be carried out",
"calculations to be done",
"input and output operators"
],
"answer": 1,
"module": "7",
"why": "Key: B. The diamond (decision) holds a test or condition with Yes/No exits. Connectors link pages, rectangles hold calculations, and parallelograms show input/output."
},
{
"q": "A computer programmer is coding an algorithm which calculates the class average for a given exam. He creates a variable called class_avg. Which data type should he specify when declaring this variable?",
"options": [
"Real",
"Integer",
"Boolean",
"Character"
],
"answer": 0,
"module": "8",
"why": "Key: A. An average can have decimals, so it needs the real data type. Integer drops the decimal part, Boolean holds true/false, and character holds one symbol."
},
{
"q": "Item 58 refers to the following algorithm.<br>I. Ask users for length and width<br>II. length, width<br>III. area ← length * width<br>IV. \"Area of rectangle is\", area<br><br>Which of the following options, in the correct order, can be used to replace I, II and III in the algorithm?",
"options": [
"Read, write, prompt",
"Write, read, prompt",
"Prompt, read, write",
"Read, prompt, write"
],
"answer": 2,
"module": "7",
"why": "Key: C. The algorithm must first prompt the user, then read the values, and finally write (output) the result. The item's labels are a little confusing as printed, but the logical order prompt → read → write only fits option C."
},
{
"q": "What is the name given to an identifier that always holds the same value?",
"options": [
"Constant",
"Location",
"Variable",
"Storage"
],
"answer": 0,
"module": "7",
"why": "Key: A. A constant keeps the same value throughout the program. A variable can change, and location and storage are not identifier types."
},
{
"q": "Item 60 refers to the following algorithm.<pre>Write (\"Enter price: \")    (1)\nRead (price)               (2)\nVat: = price * 15%         (3)\nWrite vat                  (4)</pre>Which line contains a processing statement?",
"options": [
"1",
"2",
"3",
"4"
],
"answer": 2,
"module": "7",
"why": "Key: C. Line 3 calculates the VAT, which is processing. Lines 1 and 4 are output and line 2 is input."
}
]
}
]);
