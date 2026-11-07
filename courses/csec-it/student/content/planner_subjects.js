/* Shared subject list and exam dates for every e-course planner.
   Built by tools/build_subjects.py from the official CXC timetables (CSEC and CAPE,
   May–June 2027, final, revised 29 September 2026). Edit the tables in that script, not this file.
   Paper fields: n paper, d date, to end of a period, se session, st start (09:00 / 13:00 Barbados time),
   l length (includes reading time), o online only, h hybrid. */
window.EXAM_PLANNER_DATA = {
  version: '2027.2',
  sitting: "CXC May–June 2027",
  CSEC: [
    { s: "Additional Mathematics", p: [
      {"n": "Paper 02", "d": "2027-05-17", "se": "Morning", "st": "09:00", "l": "2 hr 40 min"},
      {"n": "Paper 01", "d": "2027-06-10", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 032", "d": "2027-06-10", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Agricultural Science (Double Award)", p: [
      {"n": "Paper 02", "d": "2027-05-05", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 03", "d": "2027-05-12", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-05-26", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"} ] },
    { s: "Agricultural Science (Single Award)", p: [
      {"n": "Paper 02", "d": "2027-05-05", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-05-26", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"} ] },
    { s: "Biology", p: [
      {"n": "Paper 032", "d": "2027-05-05", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 02", "d": "2027-05-13", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 01", "d": "2027-06-04", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"} ] },
    { s: "Caribbean History", p: [
      {"n": "Paper 02", "d": "2027-05-26", "se": "Morning", "st": "09:00", "l": "2 hr 10 min"},
      {"n": "Paper 01", "d": "2027-06-08", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"},
      {"n": "Paper 032", "d": "2027-06-08", "se": "Morning", "st": "09:00", "l": "2 hr"} ] },
    { s: "Chemistry", p: [
      {"n": "Paper 032", "d": "2027-05-03", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 02", "d": "2027-05-14", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 01", "d": "2027-06-08", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Economics", p: [
      {"n": "Paper 032", "d": "2027-05-05", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 02", "d": "2027-05-14", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-05-25", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Electronic Document Preparation and Management", p: [
      {"n": "Paper 02", "d": "2027-05-07", "se": "Morning", "st": "09:00", "l": "2 hr 10 min"},
      {"n": "Paper 01", "d": "2027-06-01", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 032", "d": "2027-06-04", "se": "Morning", "st": "09:00", "l": "2 hr", "o": 1} ] },
    { s: "English A", p: [
      {"n": "Paper 02", "d": "2027-05-04", "se": "Morning", "st": "09:00", "l": "2 hr 45 min"},
      {"n": "Paper 032", "d": "2027-05-26", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-06-03", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "English B", p: [
      {"n": "Paper 02", "d": "2027-05-20", "se": "Morning", "st": "09:00", "l": "2 hr 15 min"},
      {"n": "Paper 032", "d": "2027-05-26", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-06-07", "se": "Morning", "st": "09:00", "l": "2 hr"} ] },
    { s: "Family and Resource Management", p: [
      {"n": "Paper 02", "d": "2027-05-17", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 01", "d": "2027-06-09", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Food, Nutrition and Health", p: [
      {"n": "Paper 02", "d": "2027-05-19", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 01", "d": "2027-06-10", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "French", p: [
      {"n": "Paper 03", "d": "2027-04-13", "to": "2027-04-30", "se": "Oral examination period"},
      {"n": "Paper 02", "d": "2027-05-03", "se": "Morning", "st": "09:00", "l": "2 hr 15 min"},
      {"n": "Paper 01", "d": "2027-05-10", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Geography", p: [
      {"n": "Paper 02", "d": "2027-05-17", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 01", "d": "2027-06-04", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"},
      {"n": "Paper 032", "d": "2027-06-04", "se": "Afternoon", "st": "13:00", "l": "1 hr 45 min"} ] },
    { s: "Human and Social Biology", p: [
      {"n": "Paper 02", "d": "2027-05-10", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-05-31", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"},
      {"n": "Paper 032", "d": "2027-05-31", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"} ] },
    { s: "Industrial Technology: Building and Furniture", p: [
      {"n": "Paper 02", "d": "2027-05-14", "se": "Morning", "st": "09:00", "l": "2 hr 10 min"},
      {"n": "Paper 01", "d": "2027-05-25", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Industrial Technology: Electrical and Electronic", p: [
      {"n": "Paper 02", "d": "2027-05-06", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 01", "d": "2027-05-25", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Industrial Technology: Mechanical Engineering", p: [
      {"n": "Paper 02", "d": "2027-05-19", "se": "Morning", "st": "09:00", "l": "2 hr 10 min"},
      {"n": "Paper 01", "d": "2027-05-25", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Information Technology", p: [
      {"n": "Paper 02", "d": "2027-05-13", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-05-28", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"},
      {"n": "Paper 032", "d": "2027-06-08", "se": "Afternoon", "st": "13:00", "l": "2 hr", "o": 1} ] },
    { s: "Integrated Science", p: [
      {"n": "Paper 02", "d": "2027-05-18", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 032", "d": "2027-06-02", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 01", "d": "2027-06-11", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"} ] },
    { s: "Mathematics", p: [
      {"n": "Paper 02", "d": "2027-05-11", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 032", "d": "2027-05-12", "se": "Afternoon", "st": "13:00", "l": "1 hr"},
      {"n": "Paper 01", "d": "2027-05-27", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Music", p: [
      {"n": "Paper 02", "d": "2027-04-13", "to": "2027-04-30", "se": "Practical examination period"},
      {"n": "Paper 01", "d": "2027-05-24", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Office Administration", p: [
      {"n": "Paper 02", "d": "2027-05-19", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-05-31", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"},
      {"n": "Paper 032", "d": "2027-05-31", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Physical Education and Sport", p: [
      {"n": "Paper 02", "d": "2027-04-13", "to": "2027-04-30", "se": "Practical examination period"},
      {"n": "Paper 01", "d": "2027-05-24", "se": "Afternoon", "st": "13:00", "l": "2 hr 40 min"} ] },
    { s: "Physics", p: [
      {"n": "Paper 02", "d": "2027-05-21", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 032", "d": "2027-05-28", "se": "Morning", "st": "09:00", "l": "2 hr 10 min"},
      {"n": "Paper 01", "d": "2027-06-01", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Portuguese", p: [
      {"n": "Paper 03", "d": "2027-04-13", "to": "2027-04-30", "se": "Oral examination period"},
      {"n": "Paper 01", "d": "2027-05-24", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"},
      {"n": "Paper 02", "d": "2027-06-09", "se": "Afternoon", "st": "13:00", "l": "2 hr 15 min"} ] },
    { s: "Principles of Accounts", p: [
      {"n": "Paper 02", "d": "2027-05-06", "se": "Morning", "st": "09:00", "l": "3 hr"},
      {"n": "Paper 01", "d": "2027-05-21", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 032", "d": "2027-05-21", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Principles of Business", p: [
      {"n": "Paper 02", "d": "2027-05-25", "se": "Morning", "st": "09:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-06-09", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"},
      {"n": "Paper 032", "d": "2027-06-09", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"} ] },
    { s: "Religious Education", p: [
      {"n": "Paper 02", "d": "2027-05-03", "se": "Morning", "st": "09:00", "l": "2 hr"},
      {"n": "Paper 01", "d": "2027-05-19", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Social Studies", p: [
      {"n": "Paper 02", "d": "2027-05-12", "se": "Morning", "st": "09:00", "l": "2 hr 40 min"},
      {"n": "Paper 01", "d": "2027-06-02", "se": "Morning", "st": "09:00", "l": "1 hr 15 min"},
      {"n": "Paper 032", "d": "2027-06-02", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Spanish", p: [
      {"n": "Paper 03", "d": "2027-04-13", "to": "2027-04-30", "se": "Oral examination period"},
      {"n": "Paper 01", "d": "2027-05-14", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"},
      {"n": "Paper 02", "d": "2027-05-28", "se": "Afternoon", "st": "13:00", "l": "2 hr 15 min"} ] },
    { s: "Technical Drawing", p: [
      {"n": "Paper 02", "d": "2027-05-10", "se": "Morning", "st": "09:00", "l": "2 hr 40 min"},
      {"n": "Paper 01", "d": "2027-06-10", "se": "Afternoon", "st": "13:00", "l": "1 hr 15 min"} ] },
    { s: "Textiles, Clothing and Fashion", p: [
      {"n": "Paper 02", "d": "2027-05-05", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 01", "d": "2027-05-13", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Theatre Arts", p: [
      {"n": "Paper 032", "d": "2027-05-03", "se": "Afternoon", "st": "13:00", "l": "1 hr", "o": 1},
      {"n": "Paper 01", "d": "2027-06-01", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Visual Arts", p: [
      {"n": "Paper 02", "d": "2027-04-15", "se": "Paper handed to candidates"},
      {"n": "Paper 02", "d": "2027-05-03", "to": "2027-05-21", "se": "Examination period"} ] }
  ],
  CAPE: [
    { s: "Accounting (Unit 1)", p: [
      {"n": "Paper 03/2", "d": "2027-05-03", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 2", "d": "2027-05-17", "se": "Morning", "st": "09:00", "l": "2 hr 45 min"},
      {"n": "Paper 1", "d": "2027-06-15", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Accounting (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-11", "se": "Morning", "st": "09:00", "l": "2 hr 45 min"},
      {"n": "Paper 03/2", "d": "2027-05-26", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-27", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Agricultural Science (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-04", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-01", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Agricultural Science (Unit 2)", p: [
      {"n": "Paper 1", "d": "2027-05-12", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 2", "d": "2027-05-21", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"} ] },
    { s: "Animation and Game Design (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-07", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min", "o": 1},
      {"n": "Paper 1", "d": "2027-06-07", "se": "Afternoon", "st": "13:00", "l": "1 hr", "o": 1} ] },
    { s: "Animation and Game Design (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-17", "se": "Morning", "st": "09:00", "l": "2 hr 30 min", "o": 1},
      {"n": "Paper 1", "d": "2027-06-09", "se": "Morning", "st": "09:00", "l": "1 hr", "o": 1} ] },
    { s: "Applied Mathematics (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-20", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-01", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-03", "se": "Afternoon", "st": "13:00", "l": "2 hr"} ] },
    { s: "Applied Mathematics (Unit 2)", p: [
      {"n": "Paper 03/2", "d": "2027-05-06", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 2", "d": "2027-05-10", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-08", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Art and Design (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-04-15", "se": "Paper handed to candidates"},
      {"n": "Paper 2", "d": "2027-05-06", "to": "2027-05-20", "se": "Examination period"},
      {"n": "Paper 1", "d": "2027-06-02", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Art and Design (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-04-15", "se": "Paper handed to candidates"},
      {"n": "Paper 2", "d": "2027-05-06", "to": "2027-05-20", "se": "Examination period"},
      {"n": "Paper 1", "d": "2027-05-13", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Biology (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-19", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-27", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Biology (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-14", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-31", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Building and Mechanical Engineering Drawing (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-11", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-09", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Building and Mechanical Engineering Drawing (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-14", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-26", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Caribbean Studies", p: [
      {"n": "Paper 2", "d": "2027-05-06", "se": "Morning", "st": "09:00", "l": "3 hr"},
      {"n": "Paper 03/2", "d": "2027-05-18", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-28", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Chemistry (Unit 1)", p: [
      {"n": "Paper 1", "d": "2027-05-03", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 2", "d": "2027-05-11", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"} ] },
    { s: "Chemistry (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-13", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-19", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Communication Studies", p: [
      {"n": "Paper 2", "d": "2027-05-10", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-05-25", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-31", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Computer Science (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-14", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-25", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Computer Science (Unit 2)", p: [
      {"n": "Paper 1", "d": "2027-05-05", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 2", "d": "2027-05-07", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"} ] },
    { s: "Design and Technology (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-21", "se": "Morning", "st": "09:00", "l": "2 hr 30 min", "h": 1},
      {"n": "Paper 1", "d": "2027-06-08", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min", "o": 1} ] },
    { s: "Design and Technology (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-06-02", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min", "h": 1},
      {"n": "Paper 1", "d": "2027-06-10", "se": "Morning", "st": "09:00", "l": "1 hr 30 min", "o": 1} ] },
    { s: "Digital Media (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-18", "se": "Morning", "st": "09:00", "l": "2 hr 15 min", "o": 1},
      {"n": "Paper 1", "d": "2027-06-03", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min", "o": 1} ] },
    { s: "Digital Media (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-03", "se": "Morning", "st": "09:00", "l": "2 hr 15 min", "o": 1},
      {"n": "Paper 1", "d": "2027-05-24", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min", "o": 1} ] },
    { s: "Economics (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-19", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-05-21", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-24", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Economics (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-13", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-04", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-07", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Electrical and Electronic Engineering Technology (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-26", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-02", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Electrical and Electronic Engineering Technology (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-21", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-15", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Entrepreneurship (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-26", "se": "Morning", "st": "09:00", "l": "2 hr 45 min"},
      {"n": "Paper 03/2", "d": "2027-06-08", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 1", "d": "2027-06-11", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Entrepreneurship (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-24", "se": "Morning", "st": "09:00", "l": "2 hr 45 min"},
      {"n": "Paper 1", "d": "2027-06-07", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-11", "se": "Afternoon", "st": "13:00", "l": "2 hr"} ] },
    { s: "Environmental Science (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-04", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-11", "se": "Morning", "st": "09:00", "l": "1 hr 30 min", "nb": "CXC's timetable shows this paper as morning on the daily page but afternoon in its key. Confirm the session with your school."} ] },
    { s: "Environmental Science (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-05", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-27", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Financial Services Studies (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-06-01", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-04", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-10", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Financial Services Studies (Unit 2)", p: [
      {"n": "Paper 03/2", "d": "2027-06-07", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-11", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 2", "d": "2027-06-14", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"} ] },
    { s: "Food and Nutrition (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-17", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-27", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Food and Nutrition (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-03", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-20", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "French (Unit 1)", p: [
      {"n": "Paper 4", "d": "2027-04-13", "to": "2027-04-30", "se": "Oral examination period"},
      {"n": "Paper 3", "d": "2027-05-13", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 2", "d": "2027-05-14", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 1", "d": "2027-06-08", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "French (Unit 2)", p: [
      {"n": "Paper 4", "d": "2027-04-13", "to": "2027-04-30", "se": "Oral examination period"},
      {"n": "Paper 3", "d": "2027-05-07", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 2", "d": "2027-05-25", "se": "Morning", "st": "09:00", "l": "2 hr 10 min"},
      {"n": "Paper 1", "d": "2027-06-09", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Geography (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-07", "se": "Morning", "st": "09:00", "l": "3 hr"},
      {"n": "Paper 1", "d": "2027-06-11", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Geography (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-18", "se": "Morning", "st": "09:00", "l": "3 hr"},
      {"n": "Paper 1", "d": "2027-05-26", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Green Engineering (Unit 1)", p: [
      {"n": "Paper 1", "d": "2027-06-10", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 2", "d": "2027-06-14", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"} ] },
    { s: "Green Engineering (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-06-03", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-04", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "History (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-04", "se": "Morning", "st": "09:00", "l": "2 hr 40 min"},
      {"n": "Paper 03/2", "d": "2027-06-14", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-15", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "History (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-17", "se": "Morning", "st": "09:00", "l": "2 hr 40 min"},
      {"n": "Paper 03/2", "d": "2027-06-01", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-03", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Information Technology (Unit 1)", p: [
      {"n": "Paper 03/2", "d": "2027-05-06", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 2", "d": "2027-05-07", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-09", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Information Technology (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-03", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-05-21", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-02", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Integrated Mathematics", p: [
      {"n": "Paper 2", "d": "2027-05-27", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-10", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-14", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Law (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-19", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-05-20", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-21", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Law (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-12", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-05-28", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-03", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Literatures in English (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-05", "se": "Morning", "st": "09:00", "l": "3 hr"},
      {"n": "Paper 03/2", "d": "2027-05-06", "se": "Afternoon", "st": "13:00", "l": "3 hr"},
      {"n": "Paper 1", "d": "2027-05-24", "se": "Morning", "st": "09:00", "l": "2 hr"} ] },
    { s: "Literatures in English (Unit 2)", p: [
      {"n": "Paper 1", "d": "2027-05-11", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 2", "d": "2027-05-12", "se": "Morning", "st": "09:00", "l": "3 hr"},
      {"n": "Paper 03/2", "d": "2027-05-28", "se": "Morning", "st": "09:00", "l": "3 hr"} ] },
    { s: "Logistics and Supply Chain Operations (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-04", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-10", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-11", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Logistics and Supply Chain Operations (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-12", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-20", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-05-24", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Management of Business (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-19", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-10", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-14", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Management of Business (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-14", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-04", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-09", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Performing Arts (Unit 1)", p: [
      {"n": "Paper 1", "d": "2027-06-08", "se": "Morning", "st": "09:00", "l": "1 hr 30 min", "o": 1} ] },
    { s: "Performing Arts (Unit 2)", p: [
      {"n": "Paper 1", "d": "2027-06-03", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min", "o": 1} ] },
    { s: "Physical Education and Sport (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-07", "se": "Morning", "st": "09:00", "l": "2 hr"},
      {"n": "Paper 1", "d": "2027-05-24", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Physical Education and Sport (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-17", "se": "Afternoon", "st": "13:00", "l": "2 hr"},
      {"n": "Paper 1", "d": "2027-05-20", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Physics (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-05", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-15", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Physics (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-11", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-08", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Pure Mathematics (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-13", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-02", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-03", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Pure Mathematics (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-12", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-04", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-07", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Sociology (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-04", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-01", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-02", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Sociology (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-13", "se": "Afternoon", "st": "13:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-04", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-07", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Spanish (Unit 1)", p: [
      {"n": "Paper 4", "d": "2027-04-13", "to": "2027-04-30", "se": "Oral examination period"},
      {"n": "Paper 2", "d": "2027-05-17", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 3", "d": "2027-05-20", "se": "Morning", "st": "09:00", "l": "2 hr 10 min"},
      {"n": "Paper 1", "d": "2027-06-15", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"} ] },
    { s: "Spanish (Unit 2)", p: [
      {"n": "Paper 4", "d": "2027-04-13", "to": "2027-04-30", "se": "Oral examination period"},
      {"n": "Paper 3", "d": "2027-05-03", "se": "Afternoon", "st": "13:00", "l": "2 hr 10 min"},
      {"n": "Paper 2", "d": "2027-05-19", "se": "Morning", "st": "09:00", "l": "2 hr 10 min"},
      {"n": "Paper 1", "d": "2027-06-01", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Tourism (Unit 1)", p: [
      {"n": "Paper 2", "d": "2027-05-14", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-06-14", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-06-15", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] },
    { s: "Tourism (Unit 2)", p: [
      {"n": "Paper 2", "d": "2027-05-18", "se": "Morning", "st": "09:00", "l": "2 hr 30 min"},
      {"n": "Paper 1", "d": "2027-05-27", "se": "Morning", "st": "09:00", "l": "1 hr 30 min"},
      {"n": "Paper 03/2", "d": "2027-05-31", "se": "Afternoon", "st": "13:00", "l": "1 hr 30 min"} ] }
  ]
};
