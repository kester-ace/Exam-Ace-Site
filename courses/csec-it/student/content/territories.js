/* CXC participating territories and some of the schools and colleges in each (most offer CSEC).
   List compiled Oct 2026 from public sources; schools can ask to be added.
   Sources used: ministry and government releases, CXC award notices, school and college websites,
   national newspapers (rankings, scholarship lists, merit lists) and exam-centre lists.
   Students at any other school choose "Other" and type their school.
   The UI adds an "Other (type your school)" option for every territory, so it is not in the data.
   An empty list just means none were listed; use Other. */
window.COURSE_TERRITORIES = [
  { id: 'sx', name: 'Sint Maarten', tz: 'America/Lower_Princes', schools: [
    { name: 'St. Maarten Academy' }, { name: 'Milton Peters College' }, { name: 'St. Dominic High School' }, { name: 'Charlotte Brookson Academy' }, { name: 'Learning Unlimited' }, { name: 'Caribbean International Academy' }
  ] },
  { id: 'ai', name: 'Anguilla', tz: 'America/Anguilla', schools: [
    { name: 'Albena Lake-Hodge Comprehensive School', town: 'The Valley' }
  ] },
  { id: 'ag', name: 'Antigua and Barbuda', tz: 'America/Antigua', schools: [
    { name: 'Antigua State College', town: "St. John's" },
    { name: "St. Anthony's Secondary School" }
  ] },
  { id: 'bs', name: 'The Bahamas', tz: 'America/Nassau', schools: [] },
  { id: 'bb', name: 'Barbados', tz: 'America/Barbados', schools: [
    { name: 'Harrison College', town: 'Bridgetown' },
    { name: "Queen's College", town: 'Husbands, St. James' },
    { name: 'The Combermere School', town: 'Waterford, St. Michael' },
    { name: 'The Lodge School', town: 'St. John' },
    { name: 'The St. Michael School', town: 'St. Michael' },
    { name: 'The Christ Church Foundation School', town: 'Christ Church' },
    { name: 'The Alexandra School', town: 'Speightstown, St. Peter' },
    { name: 'Barbados Community College', town: 'Howell\'s Cross Road, St. Michael' }
  ] },
  { id: 'bz', name: 'Belize', tz: 'America/Belize', schools: [
    { name: "St. John's College Junior College", town: 'Belize City' }
  ] },
  { id: 'vg', name: 'British Virgin Islands', tz: 'America/Tortola', schools: [
    { name: 'Elmore Stoutt High School', town: 'Road Town, Tortola' }
  ] },
  { id: 'ky', name: 'Cayman Islands', tz: 'America/Cayman', schools: [] },
  { id: 'dm', name: 'Dominica', tz: 'America/Dominica', schools: [
    { name: 'Dominica State College (formerly incl. the Sixth Form College)', town: 'Roseau' }
  ] },
  { id: 'gd', name: 'Grenada', tz: 'America/Grenada', schools: [
    { name: 'T. A. Marryshow Community College (Tanteen Campus)', town: "St. George's" }
  ] },
  { id: 'gy', name: 'Guyana', tz: 'America/Guyana', schools: [
    { name: "Queen's College", town: 'Georgetown' },
    { name: "The Bishops' High School", town: 'Georgetown' },
    { name: "St. Rose's High School", town: 'Georgetown' },
    { name: 'St. Stanislaus College', town: 'Georgetown' },
    { name: "President's College", town: 'Golden Grove, East Coast Demerara' },
    { name: 'Saraswati Vidya Niketan' },
    { name: 'Diamond Secondary School', town: 'East Bank Demerara' },
    { name: 'Annandale Secondary School', town: 'East Coast Demerara (Region 4)' },
    { name: 'West Demerara Secondary School', town: 'Region 3' },
    { name: 'Anna Regina Multilateral School', town: 'Anna Regina, Essequibo Coast (Region 2)' },
    { name: 'J. C. Chandisingh Secondary School', town: 'Berbice (Region 6)' },
    { name: 'Tagore Memorial Secondary School', town: 'Berbice (Region 6)' },
    { name: 'Mackenzie High School', town: 'Linden' }
  ] },
  { id: 'jm', name: 'Jamaica', tz: 'America/Jamaica', schools: [
    { name: 'Ardenne High School', town: 'Kingston' },
    { name: 'B. B. Coke High School', town: 'St. Elizabeth' },
    { name: 'Belmont Academy', town: 'Westmoreland' },
    { name: 'Bishop Gibson High School for Girls', town: 'Mandeville' },
    { name: 'Calabar High School', town: 'Kingston' },
    { name: 'Campion College', town: 'Kingston' },
    { name: 'The Cedar Grove Academy', town: 'Portmore' },
    { name: 'Convent of Mercy Academy "Alpha"', town: 'Kingston' },
    { name: 'Cornwall College', town: 'Montego Bay' },
    { name: 'DeCarteret College', town: 'Mandeville' },
    { name: 'Denbigh High School', town: 'May Pen' },
    { name: 'Ferncourt High School', town: 'Claremont, St. Ann' },
    { name: 'Glenmuir High School', town: 'May Pen' },
    { name: 'Green Island High School', town: 'Hanover' },
    { name: "Guy's Hill High School", town: 'St. Catherine' },
    { name: 'Hampton School', town: 'Malvern, St. Elizabeth' },
    { name: 'Herbert Morrison Technical High School', town: 'Montego Bay' },
    { name: 'Holy Childhood High School', town: 'Kingston' },
    { name: 'Immaculate Conception High School', town: 'Kingston' },
    { name: 'Jamaica College', town: 'Kingston' },
    { name: 'Jonathan Grant High School', town: 'Spanish Town' },
    { name: 'Kingston College', town: 'Kingston' },
    { name: 'Knox College', town: 'Spaldings, Clarendon' },
    { name: 'Manchester High School', town: 'Mandeville' },
    { name: 'The Manning\'s School', town: 'Savanna-la-Mar' },
    { name: 'McGrath High School', town: 'Linstead, St. Catherine' },
    { name: 'Meadowbrook High School', town: 'Kingston' },
    { name: 'Merl Grove High School', town: 'Kingston' },
    { name: 'Montego Bay High School', town: 'Montego Bay' },
    { name: 'Morant Bay High School', town: 'St. Thomas' },
    { name: 'Mount Alvernia High School', town: 'Montego Bay' },
    { name: 'Mount St. Joseph Catholic High School', town: 'Mandeville' },
    { name: 'Munro College', town: 'St. Elizabeth' },
    { name: 'Papine High School', town: 'Kingston' },
    { name: "The Queen's School", town: 'Kingston' },
    { name: 'St. Andrew High School for Girls', town: 'Kingston' },
    { name: 'St. Catherine High School', town: 'Spanish Town' },
    { name: "St. George's College", town: 'Kingston' },
    { name: "St. Hilda's Diocesan High School", town: "Brown's Town, St. Ann" },
    { name: "St. Hugh's High School", town: 'Kingston' },
    { name: 'St. Jago High School', town: 'Spanish Town' },
    { name: 'St. Mary High School', town: 'Highgate, St. Mary' },
    { name: 'Titchfield High School', town: 'Port Antonio' },
    { name: 'Tivoli Gardens High School', town: 'Kingston' },
    { name: 'Westwood High School', town: 'Stewart Town, Trelawny' },
    { name: "Wolmer's Boys' School", town: 'Kingston' },
    { name: "Wolmer's High School for Girls", town: 'Kingston' },
    { name: 'York Castle High School', town: "Brown's Town, St. Ann" }
  ] },
  { id: 'ms', name: 'Montserrat', tz: 'America/Montserrat', schools: [
    { name: 'Montserrat Community College', town: 'Salem' }
  ] },
  { id: 'kn', name: 'St. Kitts and Nevis', tz: 'America/St_Kitts', schools: [
    { name: 'Clarence Fitzroy Bryant College', town: 'Basseterre' }
  ] },
  { id: 'lc', name: 'Saint Lucia', tz: 'America/St_Lucia', schools: [
    { name: 'Sir Arthur Lewis Community College', town: 'Castries' },
    { name: 'Vieux Fort Comprehensive Secondary School (A-Level)', town: 'Vieux Fort' }
  ] },
  { id: 'vc', name: 'St. Vincent and the Grenadines', tz: 'America/St_Vincent', schools: [
    { name: 'SVG Community College, Division of Arts, Sciences and General Studies', town: 'Kingstown' }
  ] },
  { id: 'tt', name: 'Trinidad and Tobago', tz: 'America/Port_of_Spain', schools: [
    { name: 'ASJA Girls\' College', town: 'San Fernando' },
    { name: 'Bishop Anstey High School East / Trinity College East (joint sixth form)', town: 'Trincity' },
    { name: "Bishop's High School", town: 'Scarborough, Tobago' },
    { name: 'Couva East Secondary School', town: 'Couva' },
    { name: 'Fatima College', town: 'Port of Spain' },
    { name: 'Hillview College', town: 'Tunapuna' },
    { name: 'Holy Faith Convent', town: 'Penal' },
    { name: 'Holy Name Convent', town: 'Port of Spain' },
    { name: 'Lakshmi Girls\' Hindu College', town: 'St. Augustine' },
    { name: 'Naparima College', town: 'San Fernando' },
    { name: "Naparima Girls' High School", town: 'San Fernando' },
    { name: 'North Eastern College', town: 'Sangre Grande' },
    { name: 'Presentation College', town: 'Chaguanas' },
    { name: 'Presentation College', town: 'San Fernando' },
    { name: 'Princes Town West Secondary School', town: 'Princes Town' },
    { name: "Queen's Royal College", town: 'Port of Spain' },
    { name: 'Rio Claro East Secondary School', town: 'Rio Claro' },
    { name: "St. Augustine Girls' High School", town: 'St. Augustine' },
    { name: "St. Benedict's College", town: 'La Romaine' },
    { name: "St. Joseph's Convent", town: 'Port of Spain' },
    { name: "St. Joseph's Convent", town: 'San Fernando' },
    { name: "St. Joseph's Convent", town: 'St. Joseph' },
    { name: "St. Mary's College", town: 'Port of Spain' },
    { name: 'San Fernando Central Secondary School', town: 'San Fernando' },
    { name: 'San Juan North Secondary School', town: 'San Juan' },
    { name: 'Scarborough Secondary School', town: 'Scarborough, Tobago' },
    { name: "Shiva Boys' Hindu College", town: 'Penal' },
    { name: 'Signal Hill Secondary School', town: 'Signal Hill, Tobago' },
    { name: 'Sixth Form Government Secondary School', town: 'Port of Spain' },
    { name: 'Trinity College', town: 'Moka, Maraval' }
  ] },
  { id: 'tc', name: 'Turks and Caicos Islands', tz: 'America/Grand_Turk', schools: [] },
  { id: 'bq-saba', name: 'Saba', tz: 'America/Kralendijk', schools: [
    { name: 'Saba Comprehensive School', town: 'The Bottom' }
  ] },
  { id: 'bq-statia', name: 'St. Eustatius (Statia)', tz: 'America/Kralendijk', schools: [] },
  { id: 'other', name: 'Other / not listed', tz: 'UTC', schools: [] }
];
