/* CXC participating territories and the secondary schools in each that offer CSEC
   Electronic Document Preparation and Management (EDPM).
   List compiled Oct 2026 from public sources; schools can ask to be added.
   Sources used: CXC regional top-award notices (Grade I EDPM listings); ministry and government
   releases (Barbados Ministry of Education secondary-schools guide 2022, Jamaica MoEY / JIS,
   Guyana DPI, Cayman Islands Government / Office of Education Standards, TCI Government,
   Montserrat ZJB); school websites and booklists (subject lists, departments, CSEC syllabi);
   national newspapers (Jamaica Gleaner, Jamaica Observer, Stabroek News, Kaieteur News,
   Guyana Chronicle, Trinidad Guardian, Newsday, Searchlight, NOW Grenada, Daily Herald,
   Virgin Islands News Online, Cayman Compass, RTC Radio TCI).
   Only schools that could be verified as offering / entering candidates for CSEC EDPM are listed
   (the older Office Procedures / Typewriting subjects are not counted).
   The UI adds an "Other (type your school)" option for every territory, so it is not in the data.
   An empty list means no EDPM provider could be verified from public sources. */
window.COURSE_TERRITORIES = [
  { id: 'sx', name: 'Sint Maarten', tz: 'America/Lower_Princes', schools: [
    { name: 'St. Maarten Academy' }
  ] },
  { id: 'ai', name: 'Anguilla', tz: 'America/Anguilla', schools: [] },
  { id: 'ag', name: 'Antigua and Barbuda', tz: 'America/Antigua', schools: [] },
  { id: 'bs', name: 'The Bahamas', tz: 'America/Nassau', schools: [] },
  { id: 'bb', name: 'Barbados', tz: 'America/Barbados', schools: [
    { name: 'The Alexandra School', town: 'Speightstown, St. Peter' },
    { name: 'The Alleyne School', town: 'Belleplaine, St. Andrew' },
    { name: 'The Christ Church Foundation School', town: 'Church Hill, Christ Church' },
    { name: 'Daryll Jordan Secondary School', town: 'Trents, St. Lucy' },
    { name: 'Deighton Griffith Secondary School', town: 'Kingsland, Christ Church' },
    { name: 'The Ellerslie School', town: 'Black Rock, St. Michael' },
    { name: 'Frederick Smith Secondary School', town: 'Trents, St. James' },
    { name: 'Grantley Adams Memorial School', town: 'Blackmans, St. Joseph' },
    { name: 'Graydon Sealy Secondary School', town: 'Dalkeith, St. Michael' },
    { name: 'Lester Vaughan School', town: 'Cane Garden, St. Thomas' },
    { name: 'Parkinson Memorial Secondary School', town: 'The Pine, St. Michael' },
    { name: 'Springer Memorial Secondary School', town: 'Government Hill, St. Michael' },
    { name: "St. Leonard's Boys' Secondary School", town: 'Richmond Gap, St. Michael' },
    { name: 'The St. Michael School', town: "Martindale's Road, St. Michael" },
    { name: "St. Winifred's School", town: 'St. Michael' }
  ] },
  { id: 'bz', name: 'Belize', tz: 'America/Belize', schools: [] },
  { id: 'vg', name: 'British Virgin Islands', tz: 'America/Tortola', schools: [
    { name: 'BVI Seventh-day Adventist School (Secondary Division)', town: 'Tortola' }
  ] },
  { id: 'ky', name: 'Cayman Islands', tz: 'America/Cayman', schools: [
    { name: 'Clifton Hunter High School', town: 'Frank Sound, Grand Cayman' },
    { name: 'John Gray High School', town: 'George Town, Grand Cayman' }
  ] },
  { id: 'dm', name: 'Dominica', tz: 'America/Dominica', schools: [] },
  { id: 'gd', name: 'Grenada', tz: 'America/Grenada', schools: [
    { name: 'Hillsborough Secondary School', town: 'Hillsborough, Carriacou' }
  ] },
  { id: 'gy', name: 'Guyana', tz: 'America/Guyana', schools: [
    { name: 'Anna Regina Multilateral School', town: 'Anna Regina, Essequibo Coast (Region 2)' },
    { name: 'Berbice High School', town: 'Berbice (Region 6)' },
    { name: "The Bishops' High School", town: 'Georgetown' },
    { name: "Chase's Academic Foundation", town: 'Georgetown' },
    { name: 'Essequibo Islands Secondary School', town: 'Region 3' },
    { name: 'J. C. Chandisingh Secondary School', town: 'Berbice (Region 6)' },
    { name: "Morgan's Learning Centre", town: 'Georgetown' },
    { name: 'North Ruimveldt Multilateral Secondary School', town: 'Georgetown' },
    { name: "President's College", town: 'Golden Grove, East Coast Demerara' },
    { name: "Queen's College", town: 'Georgetown' },
    { name: 'Saraswati Vidya Niketan' },
    { name: "St. Rose's High School", town: 'Georgetown' },
    { name: 'West Demerara Secondary School', town: 'Region 3' }
  ] },
  { id: 'jm', name: 'Jamaica', tz: 'America/Jamaica', schools: [
    { name: 'The Cedar Grove Academy', town: 'Portmore' },
    { name: 'Glenmuir High School', town: 'May Pen' },
    { name: 'Hampton School', town: 'Malvern, St. Elizabeth' },
    { name: 'Jamaica College', town: 'Kingston' },
    { name: 'Maud McLeod High School', town: 'Westmoreland' },
    { name: 'Mico Practising Primary and Junior High School', town: 'Kingston' },
    { name: 'Porus High School', town: 'Porus, Manchester' },
    { name: 'St. Elizabeth Technical High School (STETHS)', town: 'Santa Cruz, St. Elizabeth' },
    { name: "St. George's College", town: 'Kingston' },
    { name: 'St. James High School', town: 'Montego Bay' },
    { name: "Wolmer's High School for Girls", town: 'Kingston' }
  ] },
  { id: 'ms', name: 'Montserrat', tz: 'America/Montserrat', schools: [
    { name: 'Montserrat Secondary School', town: 'Salem' }
  ] },
  { id: 'kn', name: 'St. Kitts and Nevis', tz: 'America/St_Kitts', schools: [] },
  { id: 'lc', name: 'Saint Lucia', tz: 'America/St_Lucia', schools: [] },
  { id: 'vc', name: 'St. Vincent and the Grenadines', tz: 'America/St_Vincent', schools: [
    { name: "St. Joseph's Convent Marriaqua", town: 'Marriaqua' }
  ] },
  { id: 'tt', name: 'Trinidad and Tobago', tz: 'America/Port_of_Spain', schools: [
    { name: "ASJA Boys' College", town: 'San Fernando' },
    { name: 'Cowen Hamilton Secondary School', town: 'Moruga' },
    { name: 'El Dorado East Secondary School', town: 'El Dorado' },
    { name: 'El Dorado West Secondary School', town: 'El Dorado' },
    { name: 'North Eastern College', town: 'Sangre Grande' },
    { name: 'Roxborough Secondary School', town: 'Roxborough, Tobago' },
    { name: 'San Juan North Secondary School', town: 'San Juan' },
    { name: 'Sangre Grande Secondary School', town: 'Sangre Grande' },
    { name: 'South East Port of Spain Secondary School', town: 'Port of Spain' },
    { name: 'Southern Academy of SDA', town: 'La Romaine' }
  ] },
  { id: 'tc', name: 'Turks and Caicos Islands', tz: 'America/Grand_Turk', schools: [
    { name: 'Helena Jones Robinson High School', town: 'Grand Turk' }
  ] },
  { id: 'bq-saba', name: 'Saba', tz: 'America/Kralendijk', schools: [] },
  { id: 'bq-statia', name: 'St. Eustatius (Statia)', tz: 'America/Kralendijk', schools: [
    { name: 'Gwendoline van Putten School', town: 'Oranjestad' }
  ] },
  { id: 'other', name: 'Other / not listed', tz: 'UTC', schools: [] }
];
