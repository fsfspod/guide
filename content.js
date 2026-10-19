/* =====================================================================
   FIELD GUIDE FOR THE FRIENDLY SKEPTIC: CONTENT FILE
   ---------------------------------------------------------------------
   Everything visitors read lives in this one file. The design lives in
   index.html and never needs to change when you add material.

   HOW TO EDIT
   - To add a case: copy any block inside `cases: [ ... ]`, paste it,
     and give it a new unique `id` (lowercase, dashes, no spaces).
   - `galleries` uses gallery ids from the `galleries` list below.
   - `status` must be one of:
       explained   = a mundane cause is well established
       likely      = a mundane cause is probable but not proven
       unresolved  = no good explanation yet
       disputed    = the key facts themselves are argued over
       hoax        = shown or admitted to be faked
       record      = a government program, report or hearing
   - `related` lists other case ids. They show up as "Related entries".
   - `coords: [latitude, longitude]` pins the case on the Map. For space
     cases use `orbit: "leo"` (Earth orbit), "translunar" or "moon".
   - Timeline entries come from each case automatically (using `date`
     and `year`). Use `extraTimeline` for events without a case page.
   - Sources (the readingRoom list) items list the `cases` they belong to.
   - Document Room files live in `documents`. See the Twining memo for the
     pattern; `cases` links a file to its entries.
   - Episodes in `episodes` list research by case id or by any link.
   Commas matter: every item ends with a comma except where shown.
   ===================================================================== */

window.FIELD_GUIDE = {

  site: {
    name: "Flying Saucers for the Friendly Skeptic",
    short: "FSFS",
    tagline: "A self-guided tour of UFOs, UAP and the declassified record.",
    podcastName: "Flying Saucers for the Friendly Skeptic",
    podcastUrl: "#podcast",
    shareImage: "https://friendlyskeptic.com/guide/images/cover.jpg",
    lastUpdated: "October 2026",
    showDocumentRoom: false   // set to true to bring back the Document Room
  },

  /* ------------------------------------------------------------------
     GALLERIES: the field guide's topics (shown as Topics on the site)
     ------------------------------------------------------------------ */
  galleries: [
    { id: "sightings",  title: "Lights in the Sky",       blurb: "Mass sightings, famous photographs and the nights whole towns looked up." },
    { id: "military",   title: "Pilots & Radar",          blurb: "Encounters reported by trained observers, often backed by instruments." },
    { id: "crashes",    title: "Crashes & Retrievals",    blurb: "Stories of things that came down, and what was actually found." },
    { id: "encounters", title: "Close Encounters",        blurb: "Landings, beings and abduction accounts: the most personal testimony." },
    { id: "government", title: "The Official Record",     blurb: "Programs, panels, reports and hearings: what governments did and said." },
    { id: "hoaxes",     title: "Hoaxes & Hard Lessons",   blurb: "Fakes, cons and honest mistakes, and how each one was caught." },
    { id: "world",      title: "Around the World",        blurb: "Cases from outside the United States and the agencies that studied them." },
    { id: "science",    title: "Science & the Skeptics",  blurb: "Instruments, studies and the explanations that solved many cases." },
    { id: "space",      title: "Space & Astronauts",      blurb: "What astronauts saw, what the cameras caught, and what it turned out to be." },
    { id: "uap",        title: "The UAP Era",             blurb: "From the 2017 videos to the 2026 file releases: the modern chapter." }
  ],

  /* ------------------------------------------------------------------
     ERAS: the sections of the timeline corridor
     ------------------------------------------------------------------ */
  eras: [
    { id: "war",     title: "Before the Saucers",           span: "1896–1946", from: 1800, to: 1946, blurb: "Phantom airships, wartime nerves and the first official worries." },
    { id: "saucer",  title: "The Flying Saucer Age",        span: "1947–1969", from: 1947, to: 1969, blurb: "A new phrase, a national craze and twenty-two years of Air Force investigation." },
    { id: "close",   title: "Close Encounters",             span: "1970–1999", from: 1970, to: 1999, blurb: "The government steps back. Civilian researchers, abduction stories and Hollywood step in." },
    { id: "secret",  title: "Quiet Programs",               span: "2000–2016", from: 2000, to: 2016, blurb: "Pilot encounters and a small, little-known Pentagon study." },
    { id: "uap",     title: "The UAP Era",                  span: "2017–today", from: 2017, to: 2100, blurb: "Navy videos, new offices, sworn testimony and a flood of declassified files." }
  ],

  /* ------------------------------------------------------------------
     CASES: every entry in the field guide
     ------------------------------------------------------------------ */
  cases: [

    /* ---------- 1890s ---------- */
    {
      id: "airship-wave-1896",
      title: "The Great Airship Wave",
      date: "November 1896 – May 1897", year: 1896,
      place: "California, then across the Midwest and Texas",
      coords: [38.58, -121.49],
      galleries: ["sightings", "hoaxes"],
      status: "likely",
      teaser: "Fifty years before 'flying saucers,' Americans saw mysterious airships.",
      story: "Starting in Sacramento in November 1896, people reported a lighted, cigar-shaped airship moving slowly across the night sky. By spring 1897 the reports had spread east through Nebraska, Kansas, Iowa, Illinois and Texas. Newspapers printed eyewitness accounts next to tall tales of secret inventors, crash landings and even a dead 'Martian' pilot buried in Aurora, Texas. Nobody had built a working powered airship in America yet.",
      documented: ["Hundreds of newspaper reports from 1896 and 1897 survive.", "Several newspapers later admitted to printing hoaxes, including fake letters and staged 'airship' lights."],
      claimed: ["A secret inventor had built a flying machine.", "Visitors from Mars."],
      explanation: "Historians point to a mix of hoaxes, newspaper competition, kites and balloons carrying lanterns, and bright planets such as Venus. The wave is a useful preview of 1947: people describe what the technology of their era makes them expect.",
      sources: [
        { title: "Chronicling America: 1896–97 newspaper pages mentioning 'airship' (Library of Congress)", url: "https://chroniclingamerica.loc.gov/search/pages/results/?andtext=airship&date1=1896&date2=1897&dateFilterType=yearRange" },
        { title: "Mystery airship (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Mystery_airship" }
      ],
      related: ["kenneth-arnold", "foo-fighters", "battle-of-los-angeles"]
    },

    /* ---------- 1940s ---------- */
    {
      id: "battle-of-los-angeles",
      title: "The Battle of Los Angeles",
      date: "February 24–25, 1942", year: 1942,
      place: "Los Angeles, California",
      coords: [34.05, -118.24],
      galleries: ["military", "sightings"],
      status: "likely",
      teaser: "Three months after Pearl Harbor, anti-aircraft guns fired into an empty sky for an hour.",
      story: "Radar picked up a return off the coast and the city blacked out. Anti-aircraft batteries fired roughly 1,400 shells at targets reported in searchlight beams. No bombs fell and no aircraft were downed, but falling shell fragments damaged buildings and five people died from accidents and heart attacks. Navy Secretary Frank Knox called it a false alarm. A retouched newspaper photo of searchlights converging on a bright spot later became an icon of UFO lore.",
      documented: ["The barrage, the blackout and the casualties are well recorded.", "The Army and Navy gave conflicting statements at the time."],
      claimed: ["The famous photo shows a solid craft under fire.", "The military covered up an unknown object."],
      explanation: "Most historians point to wartime jitters, a stray weather balloon and anti-aircraft bursts mistaken for targets. The photo was heavily retouched for publication.",
      sources: [
        { title: "Battle of Los Angeles (Wikipedia overview, with period sources)", url: "https://en.wikipedia.org/wiki/Battle_of_Los_Angeles" }
      ],
      related: ["foo-fighters", "ghost-rockets"]
    },
    {
      id: "foo-fighters",
      title: "Foo Fighters",
      date: "Late 1944 – 1945", year: 1944,
      place: "Skies over Europe and the Pacific",
      coords: [48.3, 7.6],
      galleries: ["military", "sightings"],
      status: "unresolved",
      teaser: "Allied night-fighter crews reported glowing balls of light pacing their planes.",
      story: "Crews of the U.S. 415th Night Fighter Squadron began reporting orange and red lights that followed or paced their aircraft over the Rhine valley in late 1944. The airmen borrowed a nonsense word from a comic strip and called them foo fighters. Similar reports came from bomber crews over Japan. Many crews assumed they were a German or Japanese secret weapon, but postwar searches of enemy records turned up nothing.",
      documented: ["Unit histories and press reports from 1945 describe the sightings.", "The CIA's 1953 Robertson Panel discussed the foo fighters as an earlier puzzle."],
      claimed: ["They were intelligent craft observing the war."],
      explanation: "Proposed causes include St. Elmo's fire, flares, reflections on canopies, ball lightning and fatigue. No single explanation covers every report.",
      sources: [
        { title: "Baltimore Sun, 2 January 1945: 'Foo fighter' report (transcription)", url: "https://ufologie.patrickgross.org/press/baltimoresun2jan1945.htm" },
        { title: "Foo fighter (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Foo_fighter" }
      ],
      related: ["battle-of-los-angeles", "robertson-panel"]
    },
    {
      id: "ghost-rockets",
      title: "Ghost Rockets of Scandinavia",
      date: "Summer 1946", year: 1946,
      place: "Sweden and Finland",
      coords: [59.3, 18.1],
      galleries: ["world", "sightings"],
      status: "likely",
      teaser: "Thousands of reports of rocket-like objects streaking over Sweden.",
      story: "In 1946 Swedish civilians reported around 2,000 rocket- or cigar-shaped objects, some said to crash into lakes. With German V-weapons fresh in memory, the Swedish military suspected Soviet tests using captured technology and formed an investigating committee. Divers searched Lake Kölmjärv after a reported crash and found nothing.",
      documented: ["The Swedish defense staff investigated, and U.S. intelligence followed the reports closely."],
      claimed: ["Soviet missile tests.", "Craft from elsewhere."],
      explanation: "Investigators concluded most reports were meteors (a meteor shower peaked that August) and misidentified ordinary objects. A small remainder stayed unexplained.",
      sources: [
        { title: "Project 1947: 1946 ghost rocket documents", url: "https://www.project1947.com/fig/1946a.htm" }
      ],
      related: ["foo-fighters", "kenneth-arnold"]
    },
    {
      id: "kenneth-arnold",
      title: "Kenneth Arnold's Nine Objects",
      date: "June 24, 1947", year: 1947,
      place: "Near Mount Rainier, Washington",
      coords: [46.85, -121.76],
      galleries: ["sightings", "military"],
      status: "unresolved",
      teaser: "The sighting that gave the world the phrase 'flying saucer'.",
      story: "Private pilot and businessman Kenneth Arnold was flying his small plane near Mount Rainier when he saw nine bright objects flying in a chain at what he calculated was more than 1,200 miles per hour. He told reporters they moved the way a saucer would if you skipped it across water. Headline writers turned that into 'flying saucers,' and within weeks hundreds of similar reports came in from across the country.",
      documented: ["Arnold gave detailed statements to the press and the Army Air Forces.", "The case is in the Project Blue Book files."],
      claimed: ["Nine alien craft in formation."],
      explanation: "Blue Book eventually listed it as a mirage. Others have proposed a flock of pelicans, meteor fragments or distant aircraft. Arnold's speed estimate depends on a distance he could not measure.",
      sources: [
        { title: "Project Blue Book case file: Kenneth Arnold, 24 June 1947 (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/project-blue-book-the-kenneth-arnold-ufo-sighting-mt-rainier-washington-june-24-1947/" },
        { title: "FBI Vault: the FBI's UFO file, 1947 onward", url: "https://vault.fbi.gov/UFO" }
      ],
      related: ["roswell", "maury-island", "twining-memo"]
    },
    {
      id: "maury-island",
      title: "The Maury Island Incident",
      date: "June 21, 1947", year: 1947,
      place: "Puget Sound, Washington",
      coords: [47.38, -122.47],
      galleries: ["hoaxes", "crashes"],
      status: "hoax",
      teaser: "A tale of falling slag, men in black and a deadly plane crash.",
      story: "Harbor patrolman Harold Dahl claimed six donut-shaped craft dropped hot slag on his boat, killing his dog. His associate Fred Crisman passed the story along, and Kenneth Arnold was asked to look into it. Two Army intelligence officers who interviewed the men flew home with a box of 'slag'; their B-25 crashed and both were killed. The story also introduced the first 'man in black' visitor.",
      documented: ["The B-25 crash and the deaths of the two officers are real.", "FBI files record that Dahl and Crisman admitted the story was made up."],
      claimed: ["A genuine UFO encounter followed by a cover-up."],
      explanation: "A hoax. The slag was ordinary industrial waste. The plane crash was a tragic accident caused by an engine fire.",
      sources: [
        { title: "FBI Vault: the FBI's UFO file, 1947 onward", url: "https://vault.fbi.gov/UFO" }
      ],
      related: ["kenneth-arnold", "aztec-hoax"]
    },
    {
      id: "roswell",
      title: "Roswell",
      date: "July 1947", year: 1947,
      place: "Near Roswell, New Mexico",
      coords: [33.39, -104.52],
      galleries: ["crashes", "government", "hoaxes"],
      status: "explained",
      teaser: "A 'flying disc' press release, a weather balloon retraction and a legend that took 30 years to form.",
      story: "Rancher Mac Brazel found a field of debris of foil, rubber, tape and sticks and brought it to the sheriff. On July 8, 1947, the Roswell Army Air Field announced it had recovered a 'flying disc.' The next day General Roger Ramey's office said it was a weather balloon and showed the press the debris. The story faded until 1978, when retired officer Jesse Marcel told researcher Stanton Friedman the debris was unearthly. Books and witnesses followed, adding tales of bodies, a second crash site and threats.",
      documented: ["The press release and its retraction made national news.", "In 1994 the Air Force identified the debris as a Project Mogul balloon train, a then-secret program to detect Soviet nuclear tests.", "In 1997 the Air Force tied the 'alien body' stories to 1950s crash-test dummy drops and an unrelated accident.", "A 1995 GAO report found some Roswell base records from that era had been destroyed."],
      claimed: ["A craft crashed and alien bodies were recovered and hidden.", "The weather balloon story was a cover."],
      explanation: "The debris matches Project Mogul materials. The body stories surfaced decades later and mix in events from other years. AARO's 2024 historical review found no evidence for the crash-retrieval version.",
      sources: [
        { title: "AARO Historical Record Report, Volume 1 (2024)", url: "https://www.aaro.mil/UAP-Records-Research/" },
        { title: "GAO report GAO/NSIAD-95-187 on Roswell records", url: "https://www.gao.gov/products/nsiad-95-187" },
        { title: "FBI Vault: Roswell UFO teletype", url: "https://vault.fbi.gov/Roswell%20UFO" }
      ],
      related: ["kenneth-arnold", "aztec-hoax", "alien-autopsy", "aaro-hrr"]
    },
    {
      id: "twining-memo",
      title: "The Twining Memo",
      date: "September 23, 1947", year: 1947,
      place: "Air Materiel Command, Wright Field, Ohio",
      coords: [39.78, -84.05],
      galleries: ["government"],
      status: "record",
      teaser: "A top general tells the Pentagon the saucer reports deserve serious study.",
      story: "Lt. General Nathan Twining, head of Air Materiel Command, wrote that the reported phenomenon was something real and not imaginary, and recommended a formal investigation. The memo led directly to Project Sign in early 1948, the first official U.S. UFO study.",
      documented: ["The memo is genuine and widely published."],
      claimed: ["It proves the military knew the objects were alien craft."],
      explanation: "The memo shows the military took the reports seriously, mostly out of fear of Soviet technology. It makes no claim about origin and notes there was no physical evidence such as crash debris.",
      sources: [
        { title: "The Twining memo, reprinted as Appendix R of the Condon Report", url: "https://www.project1947.com/shg/condon/appndx-r.html" }
      ],
      related: ["kenneth-arnold", "project-blue-book", "estimate-of-situation"]
    },
    {
      id: "mantell",
      title: "The Death of Captain Mantell",
      date: "January 7, 1948", year: 1948,
      place: "Near Godman Field, Kentucky",
      coords: [37.9, -85.96],
      galleries: ["military"],
      status: "explained",
      teaser: "A National Guard pilot died chasing a bright object he could not catch.",
      story: "Captain Thomas Mantell of the Kentucky Air National Guard led P-51 Mustangs toward a large, bright object reported over Godman Field. He kept climbing past 25,000 feet without oxygen equipment, likely blacked out, and crashed. Early newspapers suggested he had been shot down by a flying saucer.",
      documented: ["Mantell's crash and the radio exchanges before it are documented.", "Project Sign investigated."],
      claimed: ["Mantell was destroyed by an alien craft."],
      explanation: "The object was most likely a Navy Skyhook research balloon, then classified, which would have looked huge and metallic in sunlight. Mantell died from hypoxia.",
      sources: [
        { title: "Project Blue Book case file: Thomas Mantell, 7 January 1948 (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/project-blue-book-the-thomas-mantell-case-7-january-1948/" }
      ],
      related: ["gorman-dogfight", "project-blue-book"]
    },
    {
      id: "chiles-whitted",
      title: "The Chiles–Whitted Encounter",
      date: "July 24, 1948", year: 1948,
      place: "Near Montgomery, Alabama",
      coords: [32.37, -86.3],
      galleries: ["military", "sightings"],
      status: "likely",
      teaser: "Two airline pilots describe a glowing, windowed cigar rushing past their DC-3.",
      story: "Eastern Air Lines pilots Clarence Chiles and John Whitted said a wingless, cigar-shaped object with two rows of lit windows shot past their plane before dawn. A passenger saw a streak of light. The case helped push Project Sign's staff to draft their 'Estimate of the Situation.'",
      documented: ["Both pilots gave statements to the Air Force."],
      claimed: ["A structured craft with windows."],
      explanation: "Astronomer J. Allen Hynek and others concluded it was a bright fireball. The 'windows' fit the glowing, fragmenting trail of a large meteor.",
      sources: [
        { title: "Project Blue Book case file: Chiles–Whitted, 24 July 1948 (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/project-blue-book-the-chiles-whitted-ufo-encounter-july-24-1948-montgomery-alabama/" }
      ],
      related: ["estimate-of-situation", "mantell"]
    },
    {
      id: "estimate-of-situation",
      title: "The 'Estimate of the Situation'",
      date: "Late summer 1948", year: 1948,
      place: "Project Sign, Wright Field, Ohio",
      coords: [39.78, -84.05],
      galleries: ["government"],
      status: "disputed",
      teaser: "A report said to conclude the saucers were interplanetary, then ordered destroyed.",
      story: "According to Captain Edward Ruppelt, who later ran Project Blue Book, Project Sign staff wrote a top secret estimate arguing that some saucers were interplanetary craft. Chief of Staff General Hoyt Vandenberg rejected it for lack of proof, and copies were reportedly burned. Project Sign was replaced by the more dismissive Project Grudge in 1949.",
      documented: ["Ruppelt described the estimate in his 1956 book.", "The shift from Sign to Grudge is on the record."],
      claimed: ["Proof the Air Force privately concluded UFOs were alien."],
      explanation: "No copy has ever surfaced. Whether it existed as described depends on secondhand accounts.",
      sources: [
        { title: "Ruppelt, 'The Report on Unidentified Flying Objects' (1956, full text)", url: "https://www.gutenberg.org/ebooks/17346" }
      ],
      related: ["twining-memo", "project-blue-book", "chiles-whitted"]
    },
    {
      id: "gorman-dogfight",
      title: "The Gorman Dogfight",
      date: "October 1, 1948", year: 1948,
      place: "Fargo, North Dakota",
      coords: [46.88, -96.79],
      galleries: ["military"],
      status: "explained",
      teaser: "A pilot spent half an hour in a 'dogfight' with a small blinking light.",
      story: "Lt. George Gorman of the North Dakota Air National Guard chased a small white light over Fargo for about 27 minutes. He said it turned sharply and seemed to make passes at his F-51.",
      documented: ["Gorman's account and ground witnesses were recorded by Project Sign."],
      claimed: ["An intelligent craft engaged a fighter pilot."],
      explanation: "Investigators concluded he was chasing a lighted weather balloon. A balloon's apparent motion can look dramatic from a turning plane.",
      sources: [
        { title: "Gorman dogfight: Project Sign documents and timeline (Patrick Gross archive)", url: "https://ufologie.patrickgross.org/htm/gorman.htm" },
        { title: "Ruppelt, 'The Report on Unidentified Flying Objects' (1956, full text)", url: "https://www.gutenberg.org/ebooks/17346" }
      ],
      related: ["mantell", "chiles-whitted"]
    },
    {
      id: "green-fireballs",
      title: "The Green Fireballs",
      date: "1948–1951", year: 1948,
      place: "Los Alamos and Sandia, New Mexico",
      coords: [35.88, -106.3],
      galleries: ["sightings", "government", "science"],
      status: "unresolved",
      teaser: "Bright green lights over America's most secret nuclear sites. They came back in the 2026 files.",
      story: "Starting in December 1948, security guards, pilots and scientists reported vivid green fireballs over nuclear facilities in New Mexico. Meteor expert Lincoln LaPaz saw one himself and argued they did not behave like normal meteors. The Air Force set up Project Twinkle in 1950 to film them with cameras and instruments, but it recorded little before it ended. Reports of green orbs near a military facility appeared again in the 2026 PURSUE releases.",
      documented: ["Project Twinkle and the Los Alamos conferences on the fireballs are on record.", "The 2026 PURSUE releases include a dossier on Sandia Base and green-orb reports."],
      claimed: ["Surveillance of U.S. nuclear sites by something unknown."],
      explanation: "Many scientists think they were unusually bright meteors, with green coloring from copper or other elements. The cluster near secret sites may partly reflect how many trained observers were posted there.",
      sources: [
        { title: "Project Twinkle final report on the green fireballs (1951)", url: "https://mail.project1947.com/gfb/twinklereport.htm" },
        { title: "PURSUE: Department of War UAP file releases", url: "https://www.war.gov/UFO/" },
        { title: "FBI Vault: the FBI's UFO file, 1947 onward", url: "https://vault.fbi.gov/UFO" }
      ],
      related: ["pursue-2026", "project-blue-book"]
    },
    {
      id: "project-blue-book",
      title: "Projects Sign, Grudge & Blue Book",
      date: "1948–1969", year: 1952,
      place: "Wright-Patterson Air Force Base, Ohio",
      coords: [39.82, -84.05],
      galleries: ["government"],
      status: "record",
      teaser: "Twenty-two years of Air Force UFO investigation: 12,618 reports, 701 unidentified.",
      story: "Project Sign (1948) became Project Grudge (1949) and then Project Blue Book (1952). Under Captain Edward Ruppelt, who coined the term 'unidentified flying object,' Blue Book took reports seriously. Later it was understaffed and often criticized for forcing explanations onto cases. Astronomer J. Allen Hynek served as its scientific consultant for most of its life and grew more convinced over time that some cases deserved real study. The Air Force closed Blue Book on December 17, 1969.",
      documented: ["The full case files were declassified and transferred to the National Archives.", "The final tally was 12,618 reports, 701 of them listed as unidentified."],
      claimed: ["Blue Book was a public-relations front while the real work happened elsewhere."],
      explanation: "This is the largest public archive of UFO reports in existence. Most cases have ordinary explanations, though the quality of the investigations varies a lot.",
      sources: [
        { title: "Project Blue Book records (National Archives)", url: "https://www.archives.gov/research/military/air-force/ufos" },
        { title: "Air Force fact sheet: UFOs and Project Blue Book", url: "https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104590/unidentified-flying-objects-and-air-force-project-blue-book/" }
      ],
      related: ["twining-memo", "robertson-panel", "condon-committee", "blue-book-14"]
    },
    {
      id: "aztec-hoax",
      title: "The Aztec Crash Hoax",
      date: "1949–1952", year: 1950,
      place: "Aztec, New Mexico",
      coords: [36.82, -107.99],
      galleries: ["hoaxes", "crashes"],
      status: "hoax",
      teaser: "A bestselling book about a crashed saucer, built on a con man's sales pitch.",
      story: "Columnist Frank Scully's 1950 bestseller described a saucer that crashed near Aztec with 16 small bodies aboard. His sources, Silas Newton and a man calling himself Dr. Gee, used the story to sell fake 'alien' oil-detecting devices. Reporter J.P. Cahn exposed them in True magazine in 1952, and the two were later convicted of fraud.",
      documented: ["Newton and Leo GeBauer's fraud and Cahn's investigation are well documented."],
      claimed: ["A real crash and recovery covered up by the military."],
      explanation: "A con. It is still an important lesson because later crash stories, including parts of the Roswell legend, echo its details.",
      sources: [
        { title: "FBI Vault: the FBI's UFO file, 1947 onward", url: "https://vault.fbi.gov/UFO" },
        { title: "Aztec crashed saucer hoax (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Aztec_crashed_saucer_hoax" }
      ],
      related: ["roswell", "maury-island", "mj-12"]
    },

    /* ---------- 1950s ---------- */
    {
      id: "contactees",
      title: "The Contactees",
      date: "1952 – 1970s", year: 1952,
      place: "Desert Center and Giant Rock, California",
      coords: [33.72, -115.4],
      galleries: ["encounters", "hoaxes"],
      status: "disputed",
      teaser: "Friendly 'Space Brothers' from Venus, desert conventions and a new kind of UFO believer.",
      story: "In November 1952, George Adamski said he met a tall, long-haired man from Venus in the desert near Desert Center, California, who warned him about nuclear weapons. His 1953 book 'Flying Saucers Have Landed' became a bestseller. Others followed with their own messages from benevolent aliens. George Van Tassel hosted Giant Rock Spacecraft Conventions in the Mojave Desert from the mid-1950s, drawing thousands of people.",
      documented: ["The books, lectures and conventions are well documented.", "The FBI kept files on Adamski and other contactees."],
      claimed: ["Direct meetings and rides with peaceful beings from Venus, Mars and Saturn."],
      explanation: "Space probes later showed Venus cannot support life as described. Adamski's photos were widely judged to be models. Serious researchers of the time saw the contactees as a problem that made the whole subject look ridiculous.",
      sources: [
        { title: "George Adamski (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/George_Adamski" }
      ],
      related: ["civilian-investigators", "betty-barney-hill", "robertson-panel"]
    },
    {
      id: "civilian-investigators",
      title: "APRO, NICAP and the Civilian Investigators",
      date: "1952 – 1970s", year: 1956,
      place: "Wisconsin, Arizona and Washington, D.C.",
      coords: [38.9, -77.03],
      galleries: ["government", "science"],
      status: "record",
      teaser: "Ordinary citizens organize to investigate UFOs and push the government for answers.",
      story: "Coral and Jim Lorenzen founded the Aerial Phenomena Research Organization (APRO) in 1952. The National Investigations Committee on Aerial Phenomena (NICAP) followed in 1956, and retired Marine Major Donald Keyhoe, author of 'The Flying Saucers Are Real,' became its director. NICAP collected reports, recruited scientists and former officers, and lobbied Congress for hearings, arguing the Air Force was hiding what it knew.",
      documented: ["NICAP's publications, case files and congressional lobbying are on record.", "The Robertson Panel had recommended monitoring civilian UFO groups, and the CIA's files mention NICAP."],
      claimed: ["The Air Force was covering up evidence of alien craft."],
      explanation: "These groups shaped how UFOs were investigated and debated for decades. They kept the subject in front of Congress and helped bring about the 1966 hearing. NICAP declined in the 1970s.",
      sources: [
        { title: "CIA: 'The National Investigations Committee on Aerial Phenomena (NICAP)'", url: "https://cia.gov/readingroom/document/cia-rdp81r00560r000100010001-0" }
      ],
      related: ["contactees", "robertson-panel", "hearing-1966", "condon-committee"]
    },
    {
      id: "mcminnville",
      title: "The McMinnville Photos",
      date: "May 11, 1950", year: 1950,
      place: "Near McMinnville, Oregon",
      coords: [45.21, -123.2],
      galleries: ["sightings"],
      status: "disputed",
      teaser: "Two farm photos of a disc that have been argued over for 75 years.",
      story: "Paul Trent took two photographs of a metallic disc over his farm while his wife Evelyn watched. The photos ran in Life magazine. The Condon Committee's photo analyst wrote that the case was one of the few in which every factor seemed consistent with a real, unusual flying object.",
      documented: ["The negatives survive and have been analyzed many times."],
      claimed: ["A genuine unknown craft photographed in daylight."],
      explanation: "Later analysts argue the disc is a small model, possibly a truck mirror, hung from overhead wires. Others defend the photos. Neither side has settled it.",
      sources: [
        { title: "Project Blue Book and Condon files on the Trent photos (Patrick Gross archive)", url: "https://ufologie.patrickgross.org/htm/bluepicstrent.htm" }
      ],
      related: ["condon-committee", "gulf-breeze"]
    },
    {
      id: "lubbock-lights",
      title: "The Lubbock Lights",
      date: "August–September 1951", year: 1951,
      place: "Lubbock, Texas",
      coords: [33.58, -101.86],
      galleries: ["sightings", "science"],
      status: "likely",
      teaser: "Texas Tech professors watched V-shaped groups of soft lights glide over town.",
      story: "Several professors from Texas Tech saw arcs of faint lights pass silently overhead on multiple nights. A college student, Carl Hart Jr., photographed formations of bright dots. Project Blue Book under Edward Ruppelt investigated closely.",
      documented: ["The professors' accounts and Hart's photos are in the Blue Book files."],
      claimed: ["Formations of craft."],
      explanation: "Ruppelt concluded the professors likely saw migrating birds (plovers) lit from below by new streetlights. Hart's photos were never fully explained.",
      sources: [
        { title: "Ruppelt, 'The Report on Unidentified Flying Objects' (1956, full text)", url: "https://www.gutenberg.org/ebooks/17346" },
        { title: "Lubbock Lights (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Lubbock_Lights" }
      ],
      related: ["project-blue-book", "washington-1952"]
    },
    {
      id: "washington-1952",
      title: "The Washington, D.C. Flap",
      date: "July 19–27, 1952", year: 1952,
      place: "Washington, D.C.",
      coords: [38.9, -77.04],
      galleries: ["military", "sightings", "government"],
      status: "likely",
      teaser: "Radar blips over the Capitol, jets scrambled and the biggest Pentagon press briefing since WWII.",
      story: "On two weekends in July 1952, air traffic radar at National Airport and Andrews Air Force Base tracked unknown targets over the capital. Some pilots saw lights where the radar showed returns. Jets were scrambled but found little. The headlines grew so big that the Air Force held a large press conference on July 29.",
      documented: ["Radar logs, pilot statements and the press conference transcript survive."],
      claimed: ["Craft buzzed the Capitol and the White House."],
      explanation: "At the press conference, General John Samford blamed temperature inversions that bend radar beams and create false returns. Some radar operators disagreed at the time.",
      sources: [
        { title: "Gen. Samford's flying saucer press conference, July 1952 (National Archives)", url: "https://catalog.archives.gov/id/25738" },
        { title: "Ruppelt, 'The Report on Unidentified Flying Objects' (1956, full text)", url: "https://www.gutenberg.org/ebooks/17346" }
      ],
      related: ["robertson-panel", "tremonton", "project-blue-book"]
    },
    {
      id: "tremonton",
      title: "The Tremonton Film",
      date: "July 2, 1952", year: 1952,
      place: "Near Tremonton, Utah",
      coords: [41.71, -112.17],
      galleries: ["sightings", "government", "science"],
      status: "likely",
      teaser: "A Navy photographer's 16mm film of shining dots, reviewed by the CIA. It reappeared in 2026.",
      story: "Navy Chief Photographer Delbert Newhouse filmed a group of bright objects milling in the sky from beside a highway. Navy photo analysts said they could not identify the objects. The film was shown to the CIA-sponsored Robertson Panel in January 1953. A copy was included in the sixth PURSUE release in September 2026.",
      documented: ["The film exists and was studied by both the Navy and the Robertson Panel.", "It appears in PURSUE Release 06 (September 18, 2026)."],
      claimed: ["Unknown craft filmed by a trained military photographer."],
      explanation: "The Robertson Panel concluded the objects were most likely birds such as gulls reflecting sunlight. Not everyone has accepted that.",
      sources: [
        { title: "Project Blue Book: the Tremonton film and Newhouse report (via The Black Vault)", url: "https://www.theblackvault.com/casefiles/desks-project-blue-book-tremonton-utah-navy-warrant-officer-delbert-newhouse-1952/" },
        { title: "CIA: Report of the Scientific Panel on Unidentified Flying Objects (1953)", url: "https://www.cia.gov/readingroom/document/cia-rdp78-02646r000600150001-5" },
        { title: "PURSUE: Department of War UAP file releases", url: "https://www.war.gov/UFO/" }
      ],
      related: ["robertson-panel", "pursue-2026", "washington-1952"]
    },
    {
      id: "flatwoods",
      title: "The Flatwoods Monster",
      date: "September 12, 1952", year: 1952,
      place: "Flatwoods, West Virginia",
      coords: [38.72, -80.65],
      galleries: ["encounters"],
      status: "likely",
      teaser: "A group of kids and adults meet a hissing, glowing figure on a dark hillside.",
      story: "After seeing a bright light streak across the sky and land on a hill, a group of boys and local mother Kathleen May went to look. Their flashlight caught a tall figure with a spade-shaped head and glowing eyes, and an awful smell. Several of them became ill afterward.",
      documented: ["Multiple witnesses gave consistent accounts to reporters.", "A bright meteor was seen over several states that night."],
      claimed: ["An alien landed in rural West Virginia."],
      explanation: "Investigator Joe Nickell proposed a mix of the meteor, a pulsing aircraft beacon and a startled barn owl in a tree, magnified by fear in the dark.",
      sources: [
        { title: "The Flatwoods Monster UFO event: Blue Book records (via The Black Vault)", url: "https://www.theblackvault.com/casefiles/flatwoods-monster-ufo-event/" }
      ],
      related: ["kelly-hopkinsville", "socorro"]
    },
    {
      id: "robertson-panel",
      title: "The Robertson Panel",
      date: "January 14–17, 1953", year: 1953,
      place: "Washington, D.C.",
      coords: [38.9, -77.03],
      galleries: ["government", "science"],
      status: "record",
      teaser: "The CIA asks top scientists if UFOs are a threat. Their answer shaped policy for decades.",
      story: "After the 1952 Washington flap, the CIA gathered physicist H.P. Robertson and other scientists to review Air Force evidence, including the Tremonton and Great Falls films. In four days they concluded the reports showed no threat and no evidence of anything outside known science. Their real worry was that a flood of reports could clog military channels during a crisis, so they recommended a public education campaign to reduce interest and suggested watching civilian UFO groups.",
      documented: ["The panel's report was later declassified and is in the CIA's reading room."],
      claimed: ["Proof of a deliberate debunking cover-up."],
      explanation: "The panel did recommend reducing public interest, which fed decades of cover-up suspicion. Its conclusions about the evidence itself were conventional.",
      sources: [
        { title: "CIA: Report of the Scientific Panel on Unidentified Flying Objects (1953)", url: "https://www.cia.gov/readingroom/document/cia-rdp78-02646r000600150001-5" },
        { title: "Robertson Panel report, full PDF (via The Black Vault)", url: "https://documents3.theblackvault.com/documents/UFOFiles/pdf/CIA-UAP-002_Scientific-Advisory-Panel-on-Unidentified-Flying-Objects_Report_1952-1953.pdf" },
        { title: "CIA's Role in the Study of UFOs, 1947–90 (Haines, 1997)", url: "https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-40-no-5/the-cias-role-in-the-study-of-ufos-1947-90/" }
      ],
      related: ["washington-1952", "tremonton", "project-blue-book", "cia-haines"]
    },
    {
      id: "blue-book-14",
      title: "Blue Book Special Report No. 14",
      date: "1955", year: 1955,
      place: "Battelle Memorial Institute, Ohio",
      coords: [39.99, -83.0],
      galleries: ["government", "science"],
      status: "record",
      teaser: "The first big statistical study of UFO reports, and an argument still running.",
      story: "Under Air Force contract, Battelle analyzed about 3,200 reports from 1947 to 1952. It found that the better the quality of a report, the more likely it was to remain 'unknown,' with roughly a fifth of all cases unexplained. Yet the report concluded there was no evidence of craft beyond known technology.",
      documented: ["The full report is public."],
      claimed: ["Its own numbers contradict its conclusion."],
      explanation: "Both sides cite it. Skeptics note that 'unknown' means not enough data, not proof of anything exotic.",
      sources: [
        { title: "Project Blue Book Special Report No. 14, 5 May 1955 (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/project-blue-book-special-report-14-may-5-1955/" }
      ],
      related: ["project-blue-book", "condon-committee"]
    },
    {
      id: "kelly-hopkinsville",
      title: "The Kelly–Hopkinsville Goblins",
      date: "August 21–22, 1955", year: 1955,
      place: "Near Kelly, Kentucky",
      coords: [36.79, -87.49],
      galleries: ["encounters"],
      status: "unresolved",
      teaser: "A farm family's night-long standoff with small, glowing creatures.",
      story: "The Sutton family and friends ran to the Hopkinsville police station saying small, silvery creatures with big ears and glowing eyes had surrounded their farmhouse for hours. They said they fired shotguns and the creatures floated away unhurt. Police found bullet holes but no creatures. The case helped popularize the phrase 'little green men,' though the witnesses described them as silver.",
      documented: ["Police and Air Force officers visited the scene the same night."],
      claimed: ["A siege by alien beings."],
      explanation: "Some suggest great horned owls, which are aggressive, silvery in moonlight and have glowing eyes. The witnesses' fear was clearly genuine.",
      sources: [
        { title: "Project Blue Book file on Kelly–Hopkinsville (Patrick Gross archive)", url: "https://ufologie.patrickgross.org/htm/kelly55blu.htm" }
      ],
      related: ["flatwoods", "socorro"]
    },
    {
      id: "rb-47",
      title: "The RB-47 Encounter",
      date: "July 17, 1957", year: 1957,
      place: "Over Mississippi, Louisiana and Texas",
      coords: [32.3, -90.2],
      galleries: ["military", "science"],
      status: "unresolved",
      teaser: "A spy plane's crew, its electronic sensors and ground radar all tracked something for hours.",
      story: "An Air Force RB-47 equipped to detect radar signals picked up an unusual signal while flying over the Gulf Coast. The crew saw a large light, ground radar tracked a target, and the signal seemed to follow the plane for about 90 minutes. The case was later studied by the Condon Committee.",
      documented: ["Crew accounts and Condon Committee analysis survive."],
      claimed: ["A craft paced a military aircraft and was tracked by several systems."],
      explanation: "Later researchers argued the signal came from a ground radar station and the light was an airliner, but the match is debated.",
      sources: [
        { title: "Project Blue Book case file: RB-47, 17 July 1957 (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/project-blue-book-the-rb-47-ufo-incident-july-17-1957/" }
      ],
      related: ["condon-committee", "levelland"]
    },
    {
      id: "levelland",
      title: "The Levelland Sightings",
      date: "November 2–3, 1957", year: 1957,
      place: "Levelland, Texas",
      coords: [33.59, -102.38],
      galleries: ["sightings", "encounters"],
      status: "unresolved",
      teaser: "Driver after driver reported a glowing egg that stalled their engines.",
      story: "Over a few hours, several drivers around Levelland called police to report a bright, egg-shaped light that caused their headlights and engines to fail until it passed. It happened the same weekend the Soviets launched Sputnik 2, when the public was already watching the sky.",
      documented: ["Police logs and multiple independent calls."],
      claimed: ["A craft with an electromagnetic effect on cars."],
      explanation: "Blue Book blamed ball lightning and wet electrical systems after rain. The stalled-engine pattern has never been convincingly explained.",
      sources: [
        { title: "The Levelland UFO incident: Blue Book records (via The Black Vault)", url: "https://www.theblackvault.com/casefiles/the-vault-files-the-levelland-ufo-incident-1957/" }
      ],
      related: ["rb-47", "exeter"]
    },

    /* ---------- 1960s ---------- */
    {
      id: "betty-barney-hill",
      title: "Betty & Barney Hill",
      date: "September 19–20, 1961", year: 1961,
      place: "White Mountains, New Hampshire",
      coords: [44.1, -71.68],
      galleries: ["encounters"],
      status: "disputed",
      teaser: "The first widely publicized alien abduction story, recovered under hypnosis.",
      story: "Driving home from Canada, the Hills saw a light that seemed to follow their car, and they later felt they had lost time. Betty had vivid dreams of being taken aboard a craft. In 1964 psychiatrist Benjamin Simon hypnotized them separately, and both described being examined by beings. John Fuller's 1966 book 'The Interrupted Journey' made them famous. Betty drew a 'star map' she said she was shown.",
      documented: ["They reported the light to the Air Force soon after.", "The hypnosis session recordings survive."],
      claimed: ["They were abducted and examined.", "The star map points to the Zeta Reticuli system."],
      explanation: "Dr. Simon himself thought the abduction story was more likely a shared dream. Critics note memories recovered under hypnosis are unreliable, and some details resemble a TV episode that aired shortly before Barney's session. The light may have been Jupiter or a satellite.",
      sources: [
        { title: "Betty and Barney Hill Papers, University of New Hampshire Library (MC 197)", url: "https://library.unh.edu/find/archives/collections/betty-barney-hill-papers-1961-2006" }
      ],
      related: ["pascagoula", "travis-walton", "ariel-school"]
    },
    {
      id: "socorro",
      title: "Lonnie Zamora at Socorro",
      date: "April 24, 1964", year: 1964,
      place: "Socorro, New Mexico",
      coords: [34.06, -106.89],
      galleries: ["encounters", "government"],
      status: "unresolved",
      teaser: "A respected police officer sees a landed egg-shaped craft and two small figures.",
      story: "Officer Lonnie Zamora was chasing a speeder when he heard a roar and saw a flame. He found a white, egg-shaped object on legs in a gully, with two small figures in white beside it. The object rose with a roar and flew off. Investigators found scorch marks and imprints. Hynek looked into it personally.",
      documented: ["Physical traces were photographed and measured.", "Blue Book listed it as unidentified, one of its best-known unknowns."],
      claimed: ["A landed alien craft with occupants."],
      explanation: "A theory that it was a student prank at New Mexico Tech has circulated for decades, along with suggestions of a secret test vehicle. Neither has been proven.",
      sources: [
        { title: "Project Blue Book: Socorro, New Mexico landing, 24 April 1964 (via The Black Vault)", url: "https://www.theblackvault.com/casefiles/desks-project-blue-book-socorro-new-mexico-ufo-landing-24-april-1964/" }
      ],
      related: ["project-blue-book", "kelly-hopkinsville", "trans-en-provence"]
    },
    {
      id: "exeter",
      title: "The Incident at Exeter",
      date: "September 3, 1965", year: 1965,
      place: "Exeter, New Hampshire",
      coords: [42.98, -70.95],
      galleries: ["sightings"],
      status: "unresolved",
      teaser: "A teenager and two police officers watch pulsing red lights over a field.",
      story: "Norman Muscarello ran to the police station after a large object with pulsing red lights swooped toward him. Officers Eugene Bertrand and David Hunt returned with him and saw the lights themselves. John Fuller's book 'Incident at Exeter' brought the case national attention.",
      documented: ["Police reports and the officers' written statements."],
      claimed: ["A structured craft at low altitude."],
      explanation: "The Air Force first said it was a military refueling exercise, then changed the case to unidentified. Some researchers think the lights matched a refueling aircraft.",
      sources: [
        { title: "Exeter incident (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Exeter_incident" }
      ],
      related: ["levelland", "michigan-1966"]
    },
    {
      id: "kecksburg",
      title: "The Kecksburg Acorn",
      date: "December 9, 1965", year: 1965,
      place: "Kecksburg, Pennsylvania",
      coords: [40.19, -79.46],
      galleries: ["crashes"],
      status: "unresolved",
      teaser: "A fireball, a crash in the woods and a story of an acorn-shaped object hauled away.",
      story: "A fireball was seen across several states and Canada. Kecksburg residents reported something came down in the woods, and some later said they saw soldiers remove an acorn-shaped object with strange markings. Officials said the search found nothing.",
      documented: ["The fireball was widely seen and is well documented.", "A journalist's FOIA lawsuit against NASA in the 2000s produced some records but no object."],
      claimed: ["A craft, or a Soviet probe, was secretly recovered."],
      explanation: "Astronomers concluded the fireball was a meteor. The Soviet Kosmos 96 probe theory fails because orbital tracking shows it reentered hours earlier. The object stories grew mostly after decades.",
      sources: [
        { title: "The 1965 Kecksburg crash: records and FOIA history (via The Black Vault)", url: "https://www.theblackvault.com/casefiles/the-vault-files-the-1965-kecksburg-pennsylvania-crash/" }
      ],
      related: ["roswell", "shag-harbour"]
    },
    {
      id: "michigan-1966",
      title: "Swamp Gas in Michigan",
      date: "March 1966", year: 1966,
      place: "Dexter and Hillsdale, Michigan",
      coords: [42.34, -83.89],
      galleries: ["sightings", "government", "science"],
      status: "likely",
      teaser: "Two words from an astronomer led Congress to its first UFO hearing.",
      story: "Dozens of people, including college students in a dorm, reported glowing lights over marshes. J. Allen Hynek said at a press conference that marsh gas was a possible cause for some reports. The press turned it into 'swamp gas,' and the public felt mocked. House Minority Leader Gerald Ford, who represented Michigan, called for a congressional inquiry.",
      documented: ["Hynek's press conference and Ford's letter are on record.", "The House Armed Services Committee held a hearing on April 5, 1966."],
      claimed: ["The explanation was a deliberate brush-off."],
      explanation: "Hynek later said he only offered marsh gas for a few of the reports. The real legacy was political: the backlash led to the Condon Committee.",
      sources: [
        { title: "Flying Saucers and Swamp Gas (Bentley Historical Library, University of Michigan)", url: "https://bentley.umich.edu/news-events/magazine/flying-saucers-and-swamp-gas" }
      ],
      related: ["condon-committee", "hearing-1966"]
    },
    {
      id: "hearing-1966",
      title: "House Armed Services UFO Hearing",
      date: "April 5, 1966", year: 1966,
      place: "U.S. Capitol",
      coords: [38.89, -77.01],
      galleries: ["government"],
      status: "record",
      teaser: "Congress's first public look at UFOs.",
      story: "Prompted by the Michigan sightings, the House Armed Services Committee heard from Air Force Secretary Harold Brown, Hynek and Blue Book head Major Hector Quintanilla. The Air Force agreed to fund an independent university study, which became the Condon Committee.",
      documented: ["The hearing transcript is public."],
      claimed: [],
      explanation: "The hearing led to the Condon study and, indirectly, to the end of Project Blue Book.",
      sources: [
        { title: "Hearing transcript: Unidentified Flying Objects, House Armed Services, 5 April 1966 (GovInfo)", url: "https://www.govinfo.gov/app/details/CHRG-89hhrg50066O" }
      ],
      related: ["michigan-1966", "condon-committee", "symposium-1968"]
    },
    {
      id: "westall",
      title: "The Westall School Sighting",
      date: "April 6, 1966", year: 1966,
      place: "Melbourne, Australia",
      coords: [-37.94, 145.15],
      galleries: ["world", "sightings"],
      status: "unresolved",
      teaser: "Hundreds of students and teachers watch an object descend near their school.",
      story: "Students and staff at Westall High School and the neighboring primary school said a silvery object came down behind trees in a nearby field, then rose and left, possibly chased by small planes. Many witnesses still tell the same story decades later.",
      documented: ["Local newspapers covered it at the time, and witnesses gathered for a 2016 reunion."],
      claimed: ["A craft landed and officials told students to keep quiet."],
      explanation: "Researchers have proposed a balloon from a joint Australian–U.S. high-altitude research program that was launching from the area in 1966. It is a plausible fit but not proven.",
      sources: [
        { title: "An Ongoing Mystery: The Westall Flying Saucer Incident (City of Kingston local history)", url: "https://localhistory.kingston.vic.gov.au/articles/528" }
      ],
      related: ["ariel-school", "shag-harbour"]
    },
    {
      id: "malmstrom",
      title: "Malmstrom Missile Shutdown",
      date: "March 16, 1967", year: 1967,
      place: "Malmstrom Air Force Base, Montana",
      coords: [47.5, -111.18],
      galleries: ["military", "government"],
      status: "disputed",
      teaser: "Ten nuclear missiles went offline. Later witnesses said a UFO was overhead.",
      story: "All ten Minuteman missiles in Echo Flight suddenly went into a no-go state. The Air Force investigated and suspected an electrical pulse in the system. Decades later, former officer Robert Salas and others said guards reported a glowing red object over the site, and that a similar shutdown hit another flight.",
      documented: ["The Echo Flight shutdown is real and was investigated."],
      claimed: ["UFOs disabled nuclear weapons."],
      explanation: "Records from the time describe the shutdown but do not mention UFOs. The UFO link rests on recollections that surfaced years later and differ in their details.",
      sources: [
        { title: "Malmstrom AFB missile incident, 16 March 1967: documents (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/ufo-case-malmstrom-afb-ufomissile-incident-march-16-1967/" }
      ],
      related: ["rendlesham", "nimitz"]
    },
    {
      id: "shag-harbour",
      title: "The Shag Harbour Incident",
      date: "October 4, 1967", year: 1967,
      place: "Shag Harbour, Nova Scotia, Canada",
      coords: [43.49, -65.71],
      galleries: ["world", "crashes"],
      status: "unresolved",
      teaser: "Lights hit the water off a fishing village, and the Canadian Navy came looking.",
      story: "Witnesses, including police officers, saw a row of lights descend into the sea. Boats rushed out and found a patch of yellow foam but no aircraft and no survivors. Navy divers searched for days and found nothing. Canadian records list the event as unidentified.",
      documented: ["RCMP and military records confirm the search and that no aircraft was missing."],
      claimed: ["A craft went underwater and moved away."],
      explanation: "No convincing explanation has emerged. A meteor or flare is possible but does not account for every account.",
      sources: [
        { title: "1967 Shag Harbour UFO Sighting and Related Research (Library and Archives Canada)", url: "https://recherche-research.bac-lac.gc.ca/eng/public/list/43130" }
      ],
      related: ["kecksburg", "westall"]
    },
    {
      id: "condon-committee",
      title: "The Condon Committee",
      date: "1966–1969", year: 1968,
      place: "University of Colorado, Boulder",
      coords: [40.01, -105.27],
      galleries: ["government", "science"],
      status: "record",
      teaser: "An independent scientific study concludes UFOs are not worth further study. Its own data was messier.",
      story: "The Air Force paid the University of Colorado to study UFOs under physicist Edward Condon. His summary, published in January 1969, said nothing of scientific value had come from UFO study in 21 years. A National Academy of Sciences panel endorsed it. Critics point out that a good share of the cases the team studied stayed unexplained, and a leaked internal memo seemed to show the study was designed to reach a negative conclusion.",
      documented: ["The full report, 'Scientific Study of Unidentified Flying Objects,' is public.", "The leaked 'Low memorandum' controversy was covered by Look magazine in 1968."],
      claimed: ["The study was rigged."],
      explanation: "The report gave the Air Force its reason to close Blue Book. It remains the most detailed scientific UFO study of its era, and both skeptics and believers quote it.",
      sources: [
        { title: "Condon Report: Conclusions and Recommendations", url: "https://www.project1947.com/shg/condon/sec-i.html" },
        { title: "Condon Report: full table of contents", url: "https://www.project1947.com/shg/condon/contents.html" }
      ],
      related: ["project-blue-book", "symposium-1968", "mcminnville", "rb-47"]
    },
    {
      id: "symposium-1968",
      title: "The 1968 House UFO Symposium",
      date: "July 29, 1968", year: 1968,
      place: "U.S. Capitol",
      coords: [38.89, -77.01],
      galleries: ["government", "science"],
      status: "record",
      teaser: "Scientists, including Carl Sagan, argue about UFOs before Congress.",
      story: "The House Committee on Science and Astronautics held a one-day symposium with six scientists, among them Hynek, atmospheric physicist James McDonald and astronomer Carl Sagan. Views ranged from urging serious study to firm skepticism.",
      documented: ["The proceedings were published."],
      claimed: [],
      explanation: "The last congressional session on UFOs for 54 years.",
      sources: [
        { title: "Symposium on Unidentified Flying Objects, 29 July 1968 (GovInfo)", url: "https://www.govinfo.gov/content/pkg/CHRG-90hhrg97818/pdf/CHRG-90hhrg97818.pdf" }
      ],
      related: ["hearing-1966", "condon-committee", "hearing-2022"]
    },
    {
      id: "blue-book-closes",
      title: "Blue Book Closes",
      date: "December 17, 1969", year: 1969,
      place: "Washington, D.C.",
      coords: [38.88, -77.05],
      galleries: ["government"],
      status: "record",
      teaser: "The Air Force gets out of the UFO business.",
      story: "Air Force Secretary Robert Seamans announced the end of Project Blue Book, citing the Condon report. The Air Force said no UFO had threatened national security or shown technology beyond present knowledge, and there was no evidence they were extraterrestrial.",
      documented: ["The announcement and Air Force fact sheet are public."],
      claimed: ["Investigations moved underground."],
      explanation: "After 1969 there was no public U.S. government UFO program until the 2000s.",
      sources: [
        { title: "Air Force fact sheet: UFOs and Project Blue Book", url: "https://www.af.mil/About-Us/Fact-Sheets/Display/Article/104590/unidentified-flying-objects-and-air-force-project-blue-book/" },
        { title: "Project Blue Book records (National Archives)", url: "https://www.archives.gov/research/military/air-force/ufos" }
      ],
      related: ["project-blue-book", "condon-committee"]
    },

    /* ---------- 1970s ---------- */
    {
      id: "pascagoula",
      title: "The Pascagoula Abduction",
      date: "October 11, 1973", year: 1973,
      place: "Pascagoula, Mississippi",
      coords: [30.37, -88.56],
      galleries: ["encounters"],
      status: "disputed",
      teaser: "Two shipyard workers say they were floated into a craft while fishing.",
      story: "Charles Hickson and Calvin Parker told the sheriff that gray, wrinkled beings with claw-like hands carried them into a craft. Officers left them alone in a room with a hidden recorder, and the men sounded genuinely frightened.",
      documented: ["The secret recording survives.", "Hickson took a polygraph test, though its methods were criticized."],
      claimed: ["A real abduction."],
      explanation: "No physical evidence was found. The recording is strong evidence they believed something happened, which is different from evidence of what happened.",
      sources: [
        { title: "Pascagoula incident (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Pascagoula_incident" }
      ],
      related: ["betty-barney-hill", "travis-walton"]
    },
    {
      id: "coyne-helicopter",
      title: "The Coyne Helicopter Incident",
      date: "October 18, 1973", year: 1973,
      place: "Near Mansfield, Ohio",
      coords: [40.76, -82.52],
      galleries: ["military"],
      status: "unresolved",
      teaser: "An Army helicopter crew says a gray craft pulled them upward.",
      story: "Captain Lawrence Coyne and his Army Reserve crew saw a red light approach their UH-1 helicopter on a collision course. They described a cigar-shaped gray object stopping above them, bathing the cockpit in green light. They said their altimeter showed them climbing even with controls set to descend.",
      documented: ["The crew's statements; ground witnesses came forward later."],
      claimed: ["A craft lifted the helicopter."],
      explanation: "Skeptic Philip Klass argued it was a bright fireball during the Orionid meteor shower and that the climb came from the pilot's own reaction. The case remains debated.",
      sources: [
        { title: "The Army crew's report on the Coyne encounter (Patrick Gross archive)", url: "https://ufologie.patrickgross.org/htm/coynereport.htm" }
      ],
      related: ["tehran-1976", "rb-47"]
    },
    {
      id: "travis-walton",
      title: "Travis Walton",
      date: "November 5, 1975", year: 1975,
      place: "Apache-Sitgreaves National Forest, Arizona",
      coords: [34.4, -110.6],
      galleries: ["encounters"],
      status: "disputed",
      teaser: "A logger vanishes for five days after his crew sees him struck by a beam.",
      story: "Six coworkers said Travis Walton approached a glowing craft and was knocked down by a beam, and they fled. He reappeared five days later saying he had woken on a craft with beings. The story became the 1993 film 'Fire in the Sky.'",
      documented: ["A five-day missing-person search took place.", "Polygraph results were mixed; crew members passed some tests."],
      claimed: ["A genuine abduction with many witnesses."],
      explanation: "Critics argue the crew had a motive to break a logging contract they were behind on. Walton and the crew have stood by the story for decades.",
      sources: [
        { title: "Travis Walton incident (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Travis_Walton_incident" }
      ],
      related: ["betty-barney-hill", "pascagoula"]
    },
    {
      id: "tehran-1976",
      title: "The Tehran F-4 Chase",
      date: "September 19, 1976", year: 1976,
      place: "Tehran, Iran",
      coords: [35.69, 51.39],
      galleries: ["military", "world"],
      status: "unresolved",
      teaser: "Iranian jets lose instruments as they approach a brilliant light. A U.S. intelligence memo followed.",
      story: "Residents reported a bright light, and the Iranian Air Force sent two F-4 Phantom jets. Each pilot said instruments or weapons controls failed as he closed in, and one reported a smaller bright object separating from the main light. A Defense Intelligence Agency report described it as a classic case.",
      documented: ["The DIA report was released through FOIA.", "Pilot interviews were conducted by Iranian and U.S. officers."],
      claimed: ["Craft disabled fighter jets."],
      explanation: "Klass argued the light was Jupiter and the failures were coincident equipment problems in poorly maintained jets. The detailed reports keep it on most lists of strong cases.",
      sources: [
        { title: "The 1976 Iran incident: Defense Intelligence Agency report and cables (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/the-1976-iran-incident-ufo-encounter-over-tehran-iran/" }
      ],
      related: ["coyne-helicopter", "jal-1628"]
    },
    {
      id: "valentich",
      title: "The Disappearance of Frederick Valentich",
      date: "October 21, 1978", year: 1978,
      place: "Bass Strait, Australia",
      coords: [-39.5, 144.5],
      galleries: ["world", "military"],
      status: "unresolved",
      teaser: "A young pilot radios that something is hovering over him. Then he is gone.",
      story: "Frederick Valentich, 20, was flying a Cessna 182 to King Island when he told air traffic control that a long object with lights was near his aircraft. His last transmission was followed by metallic noises. Neither he nor the plane was ever found.",
      documented: ["The air traffic control transcript was released by Australian officials."],
      claimed: ["He was taken by a UFO."],
      explanation: "Investigators considered disorientation, in which a pilot flying inverted can see his own lights reflected, a crash at sea, or a deliberate disappearance. The truth is unknown.",
      sources: [
        { title: "Flight into Oblivion: the Valentich files (Dr David Clarke)", url: "https://drdavidclarke.co.uk/2012/07/01/flight-into-oblivion/" }
      ],
      related: ["westall", "tehran-1976"]
    },

    /* ---------- 1980s ---------- */
    {
      id: "rendlesham",
      title: "Rendlesham Forest",
      date: "December 26–28, 1980", year: 1980,
      place: "RAF Woodbridge, Suffolk, England",
      coords: [52.09, 1.43],
      galleries: ["military", "world"],
      status: "disputed",
      teaser: "Britain's most famous case, with a deputy base commander's memo and audio tape.",
      story: "U.S. Air Force security police at a British base saw lights in the forest and went to investigate. Some later described a small craft with markings. Two nights later, deputy base commander Lt. Col. Charles Halt led a team into the woods, recorded a running audio tape, and measured what he described as elevated radiation. His memo to the UK Ministry of Defence was released through FOIA in 1983.",
      documented: ["The Halt memo and Halt's audio tape exist.", "UK Ministry of Defence files on the case have been released."],
      claimed: ["A craft landed and was examined by servicemen."],
      explanation: "Skeptics note the flashing light lines up with the Orford Ness lighthouse and that a bright fireball crossed southern England the first night. Witness stories also grew a lot over time. Supporters say that does not cover everything.",
      sources: [
        { title: "Top 10 UFO documents at The National Archives, including the Halt memo (Dr David Clarke)", url: "https://drdavidclarke.co.uk/2018/03/15/top-10-ufo-documents-at-the-national-archives/" }
      ],
      related: ["malmstrom", "uk-mod-files", "belgian-wave"]
    },
    {
      id: "cash-landrum",
      title: "The Cash–Landrum Incident",
      date: "December 29, 1980", year: 1980,
      place: "Near Huffman, Texas",
      coords: [30.05, -95.15],
      galleries: ["encounters", "military"],
      status: "unresolved",
      teaser: "Three people say a fiery diamond, escorted by helicopters, made them sick.",
      story: "Betty Cash, Vickie Landrum and Landrum's grandson said a flaming diamond-shaped object hovered over the road while about two dozen helicopters circled it. Afterward they suffered burns, nausea and hair loss. Their lawsuit against the U.S. government was dismissed when the military denied owning any such craft.",
      documented: ["Medical records and the lawsuit are public."],
      claimed: ["An experimental or unknown craft injured civilians."],
      explanation: "The helicopter detail suggests a military operation, but none has been identified. The medical link is also debated.",
      sources: [
        { title: "Cash–Landrum incident (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Cash%E2%80%93Landrum_incident" }
      ],
      related: ["rendlesham", "travis-walton"]
    },
    {
      id: "trans-en-provence",
      title: "Trans-en-Provence",
      date: "January 8, 1981", year: 1981,
      place: "Trans-en-Provence, France",
      coords: [43.5, 6.49],
      galleries: ["world", "science", "encounters"],
      status: "unresolved",
      teaser: "The French government's scientists analyze a landing trace in a garden.",
      story: "Farmer Renato Nicolaï said a lead-colored, saucer-shaped craft landed briefly on his property and left. GEPAN, France's official UAP unit at its space agency, collected soil and plant samples and reported physical changes it could not explain.",
      documented: ["GEPAN's technical report is public."],
      claimed: ["Physical proof of a landing."],
      explanation: "Critics argue the trace could have come from a vehicle and the lab work was not as rigorous as presented. It is still one of the most scientifically studied trace cases.",
      sources: [
        { title: "Review of the Trans-en-Provence case (INA, French national broadcast archive)", url: "https://mediaclip.ina.fr/en/r21173645-review-of-the-trans-en-provence-case.html" }
      ],
      related: ["socorro", "geipan", "hessdalen"]
    },
    {
      id: "hessdalen",
      title: "The Hessdalen Lights",
      date: "1981 – present", year: 1981,
      place: "Hessdalen Valley, Norway",
      coords: [62.79, 11.19],
      galleries: ["science", "world", "sightings"],
      status: "unresolved",
      teaser: "A Norwegian valley where strange lights are studied with permanent instruments.",
      story: "From late 1981, residents of a small valley reported lights hovering and drifting, sometimes several times a week. Project Hessdalen began in 1983 with cameras, radar and magnetometers, and an automatic monitoring station has run since 1998.",
      documented: ["Decades of instrument data and scientific papers."],
      claimed: [],
      explanation: "Scientists suspect a natural phenomenon, possibly glowing plasma tied to the valley's geology, mixed with car lights and aircraft. It is a rare example of a UAP studied with ongoing instruments.",
      sources: [
        { title: "Erling Strand, Project Hessdalen: summary of results (GEIPAN workshop paper)", url: "https://www.geipan.fr/sites/default/files/23_STRAND_abs.pdf" },
        { title: "Hessdalen AMS (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Hessdalen_AMS" }
      ],
      related: ["trans-en-provence", "nasa-uap-study"]
    },
    {
      id: "hudson-valley",
      title: "The Hudson Valley Boomerang",
      date: "1982–1986", year: 1983,
      place: "Hudson Valley, New York",
      coords: [41.5, -73.9],
      galleries: ["sightings", "hoaxes"],
      status: "explained",
      teaser: "Thousands saw a huge, silent boomerang of lights. A group of pilots had a secret.",
      story: "For several years, thousands of people in New York and Connecticut reported a giant V or boomerang of lights moving slowly overhead. Some said it blocked out the stars.",
      documented: ["Huge numbers of reports, including from police."],
      claimed: ["A single enormous craft."],
      explanation: "Investigators found a group of private pilots flying light planes in tight formation at night, sometimes turning their lights off and on. Not every report fits, but most do.",
      sources: [
        { title: "1984 Hudson Valley UFO sightings (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/1984_Hudson_Valley_UFO_sightings" }
      ],
      related: ["phoenix-lights", "belgian-wave"]
    },
    {
      id: "mj-12",
      title: "The Majestic 12 Documents",
      date: "1984–1987", year: 1984,
      place: "Mailed to a TV producer",
      coords: [34.18, -118.31],
      galleries: ["hoaxes", "government", "crashes"],
      status: "hoax",
      teaser: "Supposed top secret papers about a secret UFO control group. The FBI called them bogus.",
      story: "In 1984, producer Jaime Shandera received a roll of film showing a briefing paper for President-elect Eisenhower describing 'Majestic 12,' a secret group managing the Roswell recovery. The documents were made public in 1987 and inspired countless sequels.",
      documented: ["The FBI investigated; its file on MJ-12 is public."],
      claimed: ["Proof of a secret UFO control group."],
      explanation: "The FBI and the Air Force found them to be fabricated. Researchers found errors in formatting, dating and a copied signature.",
      sources: [{ title: "FBI Vault: Majestic 12", url: "https://vault.fbi.gov/Majestic%2012" }],
      related: ["roswell", "aztec-hoax", "bob-lazar"]
    },
    {
      id: "jal-1628",
      title: "Japan Air Lines Flight 1628",
      date: "November 17, 1986", year: 1986,
      place: "Over Alaska",
      coords: [64.0, -148.0],
      galleries: ["military", "world"],
      status: "unresolved",
      teaser: "A 747 cargo crew says a huge object followed them across Alaska.",
      story: "Captain Kenju Terauchi reported large lights pacing his Boeing 747 cargo flight, including an object he said was far bigger than an aircraft carrier. Ground radar seemed to show returns at times. The FAA investigated and released its files.",
      documented: ["FAA records, radar data and crew interviews."],
      claimed: ["A giant mothership."],
      explanation: "The FAA said the radar returns were likely a split image. Skeptics suggested the crew saw Jupiter and Mars. The crew's experience was clearly vivid.",
      sources: [
        { title: "JAL Flight 1628: FAA records and radar data (via The Black Vault)", url: "https://www.theblackvault.com/casefiles/the-vault-files-1986-alaska-jal-flight-1628/" }
      ],
      related: ["tehran-1976", "ohare-2006"]
    },
    {
      id: "gulf-breeze",
      title: "Gulf Breeze",
      date: "1987–1990", year: 1987,
      place: "Gulf Breeze, Florida",
      coords: [30.36, -87.16],
      galleries: ["hoaxes", "sightings"],
      status: "hoax",
      teaser: "Dramatic Polaroids of a glowing craft, and a model found in the attic.",
      story: "Ed Walters published Polaroid photos of a craft over Gulf Breeze, and the town became a UFO destination. In 1990 the new owners of his former home found a model resembling the craft hidden in the attic.",
      documented: ["The photos and the discovered model were widely reported."],
      claimed: ["Genuine craft photographed over months."],
      explanation: "Most investigators concluded the photos were faked. Walters denied it.",
      sources: [
        { title: "Gulf Breeze UFO incident (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Gulf_Breeze_UFO_incident" }
      ],
      related: ["mcminnville", "belgian-wave"]
    },
    {
      id: "bob-lazar",
      title: "Bob Lazar and S-4",
      date: "1989", year: 1989,
      place: "Las Vegas, Nevada",
      coords: [37.24, -115.81],
      galleries: ["crashes", "hoaxes"],
      status: "disputed",
      teaser: "A man on TV says he worked on alien craft near Area 51.",
      story: "In interviews with Las Vegas reporter George Knapp, Bob Lazar said he had worked at a site called S-4 reverse-engineering alien craft powered by 'element 115.' Area 51 entered pop culture almost overnight.",
      documented: ["Lazar has given many interviews.", "Element 115 (moscovium) was created in a lab in 2003; it lasts a fraction of a second."],
      claimed: ["He worked on alien technology."],
      explanation: "No records support the degrees he says he earned at MIT and Caltech, and the element 115 he described does not match real moscovium. His supporters say records were erased.",
      sources: [
        { title: "Bob Lazar (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Bob_Lazar" }
      ],
      related: ["mj-12", "grusch-2023"]
    },
    {
      id: "belgian-wave",
      title: "The Belgian Wave",
      date: "November 1989 – 1990", year: 1989,
      place: "Belgium",
      coords: [50.6, 4.5],
      galleries: ["world", "military", "hoaxes"],
      status: "disputed",
      teaser: "Triangles over Belgium, F-16s scrambled, and a photo that turned out to be fake.",
      story: "Thousands of Belgians reported large triangular craft with lights at each corner. On the night of March 30–31, 1990, the Belgian Air Force scrambled F-16s after radar contacts, and the military openly cooperated with civilian researchers.",
      documented: ["The Belgian Air Force released radar data and held a press conference."],
      claimed: ["Triangular craft of unknown origin."],
      explanation: "The famous Petit-Rechain triangle photo was admitted to be a styrofoam model in 2011. The F-16 radar locks were likely weather effects. Many ground sightings remain unexplained.",
      sources: [
        { title: "Belgian UFO wave (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Belgian_UFO_wave" }
      ],
      related: ["hudson-valley", "rendlesham", "gulf-breeze"]
    },

    /* ---------- 1990s ---------- */
    {
      id: "roswell-reports",
      title: "The Air Force Roswell Reports",
      date: "1994 and 1997", year: 1994,
      place: "Washington, D.C.",
      coords: [38.87, -77.06],
      galleries: ["government", "crashes"],
      status: "record",
      teaser: "The Air Force reopens Roswell and names Project Mogul.",
      story: "After a request from Rep. Steven Schiff, the GAO searched for Roswell records, and the Air Force published its own investigation in 1994 identifying a Project Mogul balloon. A second report in 1997, 'The Roswell Report: Case Closed,' addressed the alien body claims.",
      documented: ["Both reports and the 1995 GAO report are public."],
      claimed: [],
      explanation: "These reports are the core of the mainstream explanation for Roswell.",
      sources: [{ title: "GAO report GAO/NSIAD-95-187", url: "https://www.gao.gov/products/nsiad-95-187" }],
      related: ["roswell", "aaro-hrr"]
    },
    {
      id: "ariel-school",
      title: "The Ariel School Encounter",
      date: "September 16, 1994", year: 1994,
      place: "Ruwa, Zimbabwe",
      coords: [-17.88, 31.23],
      galleries: ["encounters", "world"],
      status: "unresolved",
      teaser: "Dozens of schoolchildren describe a landed craft and strange beings during recess.",
      story: "About 60 children at a private school said they saw a craft land in the scrub near their playground and small beings with large eyes. Harvard psychiatrist John Mack interviewed many of them. Two days earlier, a fireball had been seen across southern Africa.",
      documented: ["Children's drawings and interviews were recorded soon after."],
      claimed: ["A landing with a telepathic message about the environment."],
      explanation: "Explanations range from shared imagination after the fireball to a misunderstood event. Many former students still stand by what they saw.",
      sources: [
        { title: "Ariel School UFO incident (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Ariel_School_UFO_incident" }
      ],
      related: ["westall", "betty-barney-hill"]
    },
    {
      id: "alien-autopsy",
      title: "The Alien Autopsy Film",
      date: "1995", year: 1995,
      place: "London, England",
      coords: [51.5, -0.13],
      galleries: ["hoaxes", "crashes"],
      status: "hoax",
      teaser: "Black-and-white footage of an autopsy on a Roswell alien, broadcast around the world.",
      story: "Promoter Ray Santilli released film he said a military cameraman shot in 1947. It aired worldwide. In 2006 Santilli admitted it was a recreation staged with a dummy made by a sculptor, though he claimed it was based on real footage he had once seen.",
      documented: ["Santilli's 2006 admission and the sculptor's account."],
      claimed: ["Genuine footage of a recovered alien."],
      explanation: "A staged film. A good lesson in how convincing production can be.",
      sources: [
        { title: "Won't Get Fooled Again? The alien autopsy film (Dr David Clarke)", url: "https://drdavidclarke.co.uk/2020/08/15/wont-get-fooled-again-the-alien-autopsy-film-2006/" }
      ],
      related: ["roswell", "mj-12"]
    },
    {
      id: "varginha",
      title: "The Varginha Creature",
      date: "January 20, 1996", year: 1996,
      place: "Varginha, Brazil",
      coords: [-21.55, -45.43],
      galleries: ["world", "encounters", "crashes"],
      status: "disputed",
      teaser: "Three young women report a strange creature crouched by a wall. Rumors of captures follow.",
      story: "Three young women said they saw a creature with brown skin, large red eyes and bumps on its head. Rumors spread of military teams capturing creatures and taking them to a hospital. Brazil's 'Roswell' was born.",
      documented: ["A Brazilian army inquiry was conducted."],
      claimed: ["Aliens were captured by the army."],
      explanation: "The army inquiry concluded the women saw a local man known for crouching in the rain. Ufologists reject that and point to other witnesses.",
      sources: [
        { title: "Varginha UFO incident (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Varginha_UFO_incident" }
      ],
      related: ["roswell", "ariel-school"]
    },
    {
      id: "phoenix-lights",
      title: "The Phoenix Lights",
      date: "March 13, 1997", year: 1997,
      place: "Phoenix, Arizona",
      coords: [33.45, -112.07],
      galleries: ["sightings", "military"],
      status: "likely",
      teaser: "Two separate events the same night, often merged into one mystery.",
      story: "Around 8 p.m., people across Arizona saw a V-shaped arrangement of lights move slowly across the state. Around 10 p.m., a row of bright stationary lights appeared south of Phoenix and was filmed by many. Governor Fife Symington held a press conference with an aide in an alien costume, then said years later he had seen the lights himself.",
      documented: ["Many videos of the 10 p.m. lights.", "The Air National Guard confirmed dropping flares that night."],
      claimed: ["A mile-wide craft passed over the city."],
      explanation: "The 10 p.m. lights match LUU-2 flares dropped by A-10 jets over the Barry Goldwater range. The 8 p.m. V is widely thought to be planes flying in formation, though some witnesses insist it was one solid object.",
      sources: [
        { title: "Phoenix Lights (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Phoenix_Lights" }
      ],
      related: ["hudson-valley", "stephenville"]
    },
    {
      id: "cia-haines",
      title: "The CIA's Own UFO History",
      date: "1997", year: 1997,
      place: "CIA, Langley, Virginia",
      coords: [38.95, -77.15],
      galleries: ["government", "science"],
      status: "record",
      teaser: "A CIA historian says spy planes explain many 1950s–60s sightings.",
      story: "CIA historian Gerald Haines wrote 'CIA's Role in the Study of UFOs, 1947–90' for the agency's journal. He concluded that U-2 and later OXCART spy plane flights, flying higher than anyone thought possible, explained many reports, and that the Air Force sometimes gave misleading explanations to protect them.",
      documented: ["The article is public in the CIA Reading Room."],
      claimed: [],
      explanation: "A rare official admission that the government misled the public about sightings, but for secret aircraft rather than aliens.",
      sources: [
        { title: "CIA's Role in the Study of UFOs, 1947–90 (CIA, Studies in Intelligence)", url: "https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-40-no-5/the-cias-role-in-the-study-of-ufos-1947-90/" }
      ],
      related: ["robertson-panel", "project-blue-book"]
    },
    {
      id: "cometa",
      title: "The COMETA Report",
      date: "1999", year: 1999,
      place: "France",
      coords: [48.86, 2.35],
      galleries: ["world", "government"],
      status: "record",
      teaser: "Retired French generals and experts publish a report taking UAP seriously.",
      story: "A private group of retired French military officers and experts, many connected to France's national defense institute, published 'UFOs and Defense.' It argued that extraterrestrial explanations were the most likely for some cases and urged international study.",
      documented: ["The report is public."],
      claimed: [],
      explanation: "Often cited as an 'official' French report, but it was written by a private association, not the French government.",
      sources: [
        { title: "The COMETA Report (1999), English PDF (Internet Archive)", url: "https://ia804708.us.archive.org/20/items/the-cometa-report-1999/The%20Cometa%20Report%20%281999%29.pdf" },
        { title: "COMETA report (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/COMETA_report" }
      ],
      related: ["geipan", "uk-mod-files"]
    },
    {
      id: "geipan",
      title: "GEIPAN: France's Official UAP Office",
      date: "1977 – present", year: 1977,
      place: "CNES, Toulouse, France",
      coords: [43.6, 1.44],
      galleries: ["world", "government", "science"],
      status: "record",
      teaser: "The longest-running government UAP office in the world publishes its cases online.",
      story: "France's space agency CNES created GEPAN in 1977, later renamed SEPRA and then GEIPAN. It investigates reports and posts case files online with a classification: identified, probably identified, insufficient data, or unidentified after investigation.",
      documented: ["Thousands of case files are searchable online."],
      claimed: [],
      explanation: "A model of open, scientific case-handling. Only a small percentage of its cases stay unidentified after investigation.",
      sources: [
        { title: "GEIPAN case archive (CNES)", url: "https://www.cnes-geipan.fr" },
        { title: "GEIPAN (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/GEIPAN" }
      ],
      related: ["trans-en-provence", "cometa", "cefaa", "cridovni"]
    },

    /* ---------- 2000s ---------- */
    {
      id: "uk-mod-files",
      title: "Britain's UFO Files & Project Condign",
      date: "2000–2013", year: 2006,
      place: "United Kingdom",
      coords: [51.5, -0.12],
      galleries: ["world", "government", "science"],
      status: "record",
      teaser: "A secret UK intelligence study and decades of Ministry of Defence files go public.",
      story: "The UK Defence Intelligence Staff completed a study called Project Condign in 2000. Released in 2006, it found no evidence of intelligent craft and attributed many reports to natural atmospheric effects such as buoyant plasma. The Ministry of Defence closed its UFO desk in 2009 and transferred its files to the National Archives in batches through 2013.",
      documented: ["Condign and the MoD files are public."],
      claimed: [],
      explanation: "One of the most complete national UFO archives available online.",
      sources: [
        { title: "Project Condign: the full report (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/project-condign-the-full-condign-report" },
        { title: "Top 10 UFO documents at The National Archives (Dr David Clarke)", url: "https://drdavidclarke.co.uk/2018/03/15/top-10-ufo-documents-at-the-national-archives/" }
      ],
      related: ["rendlesham", "cometa"]
    },
    {
      id: "disclosure-project",
      title: "The Disclosure Project Press Conference",
      date: "May 9, 2001", year: 2001,
      place: "National Press Club, Washington, D.C.",
      coords: [38.9, -77.03],
      galleries: ["government"],
      status: "disputed",
      teaser: "Twenty witnesses call for hearings about secret UFO knowledge.",
      story: "Organized by Steven Greer, former military, government and aviation personnel described UFO encounters and claimed secret programs. They asked Congress to hold hearings.",
      documented: ["The press conference and testimony are recorded."],
      claimed: ["A decades-long secret government program."],
      explanation: "The testimony was not under oath and mostly lacked documents. Congress did not act at the time. Similar claims returned in the 2023 hearing.",
      sources: [
        { title: "ABC News, May 2001: 'Group Calls for Disclosure of UFO Info'", url: "https://abcnews.go.com/Technology/story?id=98572" }
      ],
      related: ["grusch-2023", "malmstrom"]
    },
    {
      id: "nimitz",
      title: "The Nimitz 'Tic Tac'",
      date: "November 14, 2004", year: 2004,
      place: "Off San Diego, California",
      coords: [32.0, -118.0],
      galleries: ["military", "uap"],
      status: "unresolved",
      teaser: "Navy pilots chase a smooth white object that the radar ship had tracked for days.",
      story: "Radar operators on the cruiser USS Princeton had been tracking unusual targets for days. Commander David Fravor and Lt. Cmdr. Alex Dietrich were sent to look and saw a white, oblong object with no wings about 40 feet long hovering over a disturbance in the water. Fravor said it mirrored his descent and then vanished. Later that day another pilot recorded it on an infrared camera; that video is known as FLIR1.",
      documented: ["The FLIR1 video was officially released by the Navy in 2020.", "Fravor and Dietrich have spoken on the record, and Fravor testified to Congress in 2023."],
      claimed: ["A craft with performance far beyond any known aircraft."],
      explanation: "The visual sighting is the strongest part, and no explanation fits well. The FLIR1 video alone is low detail, and some analysts argue it shows a distant aircraft.",
      sources: [
        { title: "Navy FOIA reading room: UAP videos", url: "https://www.navair.navy.mil/foia/documents" },
        { title: "The Navy's official release of FLIR1, Gimbal and GoFast, April 2020 (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/navy-officially-releases-ufo-uap-videos-calls-them-historical/" }
      ],
      related: ["gimbal-gofast", "nyt-2017", "grusch-2023"]
    },
    {
      id: "ohare-2006",
      title: "The O'Hare Airport Sighting",
      date: "November 7, 2006", year: 2006,
      place: "Chicago O'Hare International Airport",
      coords: [41.98, -87.9],
      galleries: ["sightings", "military"],
      status: "unresolved",
      teaser: "Airline workers watch a dark disc hover over a gate, then shoot up through the clouds.",
      story: "United Airlines employees and pilots reported a gray, disc-shaped object hovering over Gate C17. Some said it shot upward and left a hole in the clouds. The Chicago Tribune broke the story in early 2007.",
      documented: ["Employee accounts reported in the press.", "The FAA confirmed it received inquiries."],
      claimed: ["A craft over a major airport."],
      explanation: "The FAA attributed it to a weather phenomenon. Witnesses were not satisfied, but no radar data supports an object.",
      sources: [
        { title: "The 2006 O'Hare airport UFO sighting: FAA records (via The Black Vault)", url: "https://www.theblackvault.com/casefiles/the-vault-files-2006-ohare-international-airport-ufo-sighting/" },
        { title: "2006 O'Hare International Airport UFO sighting (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/2006_O%27Hare_International_Airport_UFO_sighting" }
      ],
      related: ["jal-1628", "stephenville"]
    },
    {
      id: "aatip",
      title: "AAWSAP and AATIP",
      date: "2007–2012", year: 2008,
      place: "Defense Intelligence Agency, Washington, D.C.",
      coords: [38.84, -77.01],
      galleries: ["government", "uap"],
      status: "record",
      teaser: "A small Pentagon study, pushed by Senator Harry Reid, that nobody knew about.",
      story: "With support from Senate Majority Leader Harry Reid, the Defense Intelligence Agency awarded about $22 million to Robert Bigelow's company to study advanced aerospace threats, a program called AAWSAP. The name AATIP is often used for the same effort. It produced technical papers on topics like warp drives and wormholes, and investigated some UFO reports. Official funding ended around 2012.",
      documented: ["The DIA contract and many of the technical papers have been released through FOIA."],
      claimed: ["Luis Elizondo says he ran AATIP until 2017; the Pentagon has disputed parts of his role."],
      explanation: "The program existed. How much it found and who led it are still argued over.",
      sources: [
        { title: "DIA FOIA reading room", url: "https://www.dia.mil/FOIA/FOIA-Electronic-Reading-Room/" },
        { title: "AARO Historical Record Report, Volume 1", url: "https://www.aaro.mil/UAP-Records-Research/" }
      ],
      related: ["nyt-2017", "nimitz", "aaro-hrr"]
    },
    {
      id: "stephenville",
      title: "The Stephenville Lights",
      date: "January 8, 2008", year: 2008,
      place: "Stephenville, Texas",
      coords: [32.22, -98.2],
      galleries: ["sightings", "military"],
      status: "unresolved",
      teaser: "A small Texas town sees a huge set of lights, and the Air Force changes its story.",
      story: "Dozens of residents, including a pilot and a police officer, reported large, fast-moving lights. The Air Force first said no aircraft were in the area, then said ten F-16s had been training nearby. A civilian analysis of FAA radar data suggested an unidentified target.",
      documented: ["Witness reports and the Air Force's corrected statement."],
      claimed: ["A giant craft trailed by jets."],
      explanation: "The F-16s likely explain some sightings, especially if flares were used. Not every report fits.",
      sources: [
        { title: "Stephenville, Texas, 8 January 2008: records (via The Black Vault)", url: "https://www.theblackvault.com/documentarchive/ufo-case-stephenville-texas-january-08-2008/" }
      ],
      related: ["phoenix-lights", "ohare-2006"]
    },

    /* ---------- 2010s ---------- */
    {
      id: "gimbal-gofast",
      title: "Gimbal & GoFast",
      date: "January 2015", year: 2015,
      place: "Off the U.S. East Coast",
      coords: [31.5, -79.5],
      galleries: ["military", "uap", "science"],
      status: "disputed",
      teaser: "Two Navy infrared videos that changed the conversation, and the analysts who picked them apart.",
      story: "Super Hornet crews from the USS Theodore Roosevelt group recorded two infrared videos during training. In Gimbal, a dark shape appears to rotate while crew members talk excitedly. In GoFast, a small object seems to race low over the ocean. Navy pilots, including Lt. Ryan Graves of the same squadron, said they saw objects almost daily for months.",
      documented: ["The Navy officially released both videos in April 2020.", "Pilot reports from the squadron are on record and in congressional testimony."],
      claimed: ["Craft with no visible propulsion maneuvering impossibly."],
      explanation: "Analysts including Mick West showed that Gimbal's rotation can be produced by the camera's own mechanism and glare. NASA's study team calculated that the GoFast object was at about 13,000 feet moving roughly with the wind, so the 'fast' look is parallax. The many pilot reports are a separate question.",
      sources: [
        { title: "Navy FOIA reading room: UAP videos", url: "https://www.navair.navy.mil/foia/documents" },
        { title: "NASA UAP Independent Study Team report", url: "https://science.nasa.gov/uap/" }
      ],
      related: ["nimitz", "nyt-2017", "nasa-uap-study"]
    },
    {
      id: "nyt-2017",
      title: "The New York Times Story",
      date: "December 16, 2017", year: 2017,
      place: "New York, New York",
      coords: [40.76, -73.99],
      galleries: ["uap", "government"],
      status: "record",
      teaser: "A front-page story reveals a secret Pentagon program and two Navy videos.",
      story: "Reporters Helene Cooper, Ralph Blumenthal and Leslie Kean revealed the Pentagon's AATIP program and published the Nimitz and Gimbal videos. The same week, To the Stars Academy, co-founded by musician Tom DeLonge, released them too. Luis Elizondo became the public face of the story.",
      documented: ["The article is public, and the program's existence was confirmed by the Pentagon."],
      claimed: [],
      explanation: "The start of the modern UAP era. It moved UFOs from late-night radio to Congress.",
      sources: [{ title: "Navy FOIA reading room: UAP videos", url: "https://www.navair.navy.mil/foia/documents" }],
      related: ["aatip", "nimitz", "gimbal-gofast", "navy-release-2020"]
    },
    {
      id: "pyramids-2019",
      title: "The 2019 'Pyramids' & Omaha Sphere",
      date: "July 2019", year: 2019,
      place: "Off Southern California",
      coords: [32.5, -118.5],
      galleries: ["military", "uap", "science"],
      status: "likely",
      teaser: "Leaked Navy footage of triangle-shaped lights and a sphere that seemed to enter the sea.",
      story: "In 2021 filmmaker Jeremy Corbell leaked footage from Navy ships, including blinking triangles filmed through night-vision gear from the USS Russell and a sphere filmed from the USS Omaha that seemed to drop into the ocean. The Pentagon confirmed the footage was taken by Navy personnel.",
      documented: ["The Pentagon confirmed the source of the footage."],
      claimed: ["Craft that move from air into water."],
      explanation: "The triangle shape matches the aperture of the night-vision camera, which turns any point of light into a triangle. The ships were also swarmed by drones in the same period. The sphere has been suggested to be a balloon or drone.",
      sources: [
        { title: "Pentagon confirms leaked UFO images are authentic (The Debrief)", url: "https://thedebrief.org/pentagon-confirms-leaked-ufo-images-are-authentic/" }
      ],
      related: ["gimbal-gofast", "odni-2021"]
    },
    {
      id: "navy-release-2020",
      title: "The Navy Videos Go Official",
      date: "April 27, 2020", year: 2020,
      place: "The Pentagon",
      coords: [38.87, -77.06],
      galleries: ["uap", "government"],
      status: "record",
      teaser: "The Pentagon formally releases FLIR1, Gimbal and GoFast.",
      story: "The Department of Defense formally released the three Navy videos already circulating, saying it wanted to clear up confusion about whether they were real. In August 2020 the Navy's Unidentified Aerial Phenomena Task Force was created.",
      documented: ["The release statement and videos are public."],
      claimed: [],
      explanation: "This is when 'UAP' became the official term.",
      sources: [{ title: "Navy FOIA reading room: UAP videos", url: "https://www.navair.navy.mil/foia/documents" }],
      related: ["nimitz", "gimbal-gofast", "odni-2021"]
    },
    {
      id: "odni-2021",
      title: "The ODNI Preliminary Assessment",
      date: "June 25, 2021", year: 2021,
      place: "Office of the Director of National Intelligence",
      coords: [38.93, -77.16],
      galleries: ["government", "uap"],
      status: "record",
      teaser: "The first official intelligence report on UAP: 144 cases, 1 explained.",
      story: "Required by Congress, the report reviewed 144 military reports from 2004 to 2021. One was identified as a large deflating balloon. Eighteen reports described unusual movement patterns. The report sorted possible explanations into airborne clutter, natural atmospheric effects, secret U.S. programs, foreign technology, and 'other.'",
      documented: ["The nine-page report is public."],
      claimed: [],
      explanation: "It confirmed the government could not explain most cases, largely because of poor data, and called UAP a flight safety concern.",
      sources: [{ title: "ODNI Preliminary Assessment (PDF)", url: "https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf" }],
      related: ["navy-release-2020", "hearing-2022", "aaro-founded"]
    },

    /* ---------- 2020s ---------- */
    {
      id: "hearing-2022",
      title: "The 2022 House Intelligence Hearing",
      date: "May 17, 2022", year: 2022,
      place: "U.S. Capitol",
      coords: [38.89, -77.01],
      galleries: ["government", "uap"],
      status: "record",
      teaser: "The first public congressional UFO hearing in 54 years.",
      story: "A House Intelligence subcommittee heard from Undersecretary of Defense for Intelligence Ronald Moultrie and Deputy Director of Naval Intelligence Scott Bray. They showed a short clip of a sphere passing a Navy jet and the night-vision 'triangles,' which they explained as camera effects.",
      documented: ["The hearing video and transcript are public."],
      claimed: [],
      explanation: "It marked Congress returning to the subject on the public record.",
      sources: [
        { title: "Hearing transcript: Unidentified Aerial Phenomena, House Intelligence subcommittee, 17 May 2022", url: "https://www.congress.gov/117/meeting/house/114761/documents/HHRG-117-IG05-Transcript-20220517.pdf" }
      ],
      related: ["symposium-1968", "odni-2021", "aaro-founded"]
    },
    {
      id: "aaro-founded",
      title: "AARO Is Founded",
      date: "July 2022", year: 2022,
      place: "The Pentagon",
      coords: [38.87, -77.06],
      galleries: ["government", "uap"],
      status: "record",
      teaser: "The Pentagon creates the All-domain Anomaly Resolution Office.",
      story: "AARO replaced earlier task forces and covers objects in the air, space and sea. Physicist Sean Kirkpatrick was its first director until December 2023; Dr. Jon Kosloski became director in 2024. AARO publishes annual reports and runs a reporting form for current and former government employees.",
      documented: ["AARO's charter and reports are posted on its website."],
      claimed: ["Critics say AARO is designed to debunk."],
      explanation: "The main U.S. government UAP office today.",
      sources: [
        { title: "DoD memo establishing the All-domain Anomaly Resolution Office, 20 July 2022", url: "https://media.defense.gov/2022/Jul/20/2003039074/-1/-1/1/ESTABLISHMENT-OF-THE-ALL-DOMAIN-ANOMALY-RESOLUTION-OFFICE.PDF" },
        { title: "AARO official site", url: "https://www.aaro.mil" }
      ],
      related: ["odni-2021", "aaro-reports", "aaro-hrr"]
    },
    {
      id: "balloons-2023",
      title: "The 2023 Balloon Shootdowns",
      date: "February 4–12, 2023", year: 2023,
      place: "South Carolina, Alaska, Yukon, Lake Huron",
      coords: [44.9, -82.5],
      galleries: ["military", "uap"],
      status: "explained",
      teaser: "A Chinese spy balloon is shot down, followed by three more mystery objects in a week.",
      story: "After shooting down a Chinese surveillance balloon off South Carolina on February 4, the U.S. adjusted its radar filters and spotted more slow objects. Fighters shot down objects over Alaska, Canada's Yukon and Lake Huron. Officials said the last three were most likely harmless commercial or hobby balloons; an Illinois club reported losing one of its balloons around that time.",
      documented: ["The shootdowns were confirmed by the White House and Pentagon."],
      claimed: [],
      explanation: "A real-time lesson: once you tune sensors to look for small, slow things, the sky is full of them.",
      sources: [
        { title: "ABC News: military shoots down object over Lake Huron, officials say", url: "https://www.goodmorningamerica.com/news/story/military-shoots-high-altitude-object-lake-huron-officials-97068247" }
      ],
      related: ["odni-2021", "nj-drones-2024"]
    },
    {
      id: "grusch-2023",
      title: "The Grusch Hearing",
      date: "July 26, 2023", year: 2023,
      place: "U.S. Capitol",
      coords: [38.89, -77.01],
      galleries: ["government", "crashes", "uap"],
      status: "disputed",
      teaser: "A former intelligence officer testifies under oath about crash retrievals and 'non-human biologics.'",
      story: "David Grusch, a former Air Force and intelligence officer, told a House Oversight subcommittee that the U.S. has a decades-long program recovering craft of non-human origin, and that he had been told this by people with direct knowledge. Navy veterans David Fravor and Ryan Graves testified alongside him about pilot encounters.",
      documented: ["Grusch's sworn testimony and his complaint to the Inspector General.", "The hearing video is public."],
      claimed: ["A secret crash-retrieval program and recovered bodies."],
      explanation: "Grusch said his claims were based on interviews, not direct observation, and offered more detail only in closed sessions. AARO's 2024 review found no verifiable evidence of such a program. Supporters say AARO lacked access.",
      sources: [
        { title: "House Oversight hearing page, 26 July 2023 (video and testimony)", url: "https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-implications-on-national-security-public-safety-and-government-transparency/" }
      ],
      related: ["aaro-hrr", "disclosure-act", "nimitz", "bob-lazar"]
    },
    {
      id: "nasa-uap-study",
      title: "NASA's UAP Study",
      date: "2022–2023", year: 2023,
      place: "NASA Headquarters",
      coords: [38.88, -77.02],
      galleries: ["science", "government", "uap", "space"],
      status: "record",
      teaser: "A panel of scientists asks how to study UAP properly. The answer: better data.",
      story: "NASA formed an independent study team led by astrophysicist David Spergel, held a public meeting on May 31, 2023, and released its report on September 14, 2023. It found no evidence of extraterrestrial origin, called for better calibrated data and less stigma, and recommended using satellites and crowdsourcing. NASA named a director of UAP research.",
      documented: ["The report and meeting video are public."],
      claimed: [],
      explanation: "A road map for studying the subject as science rather than as testimony.",
      sources: [{ title: "NASA UAP page", url: "https://science.nasa.gov/uap/" }],
      related: ["gimbal-gofast", "hessdalen", "aaro-reports"]
    },
    {
      id: "disclosure-act",
      title: "The UAP Disclosure Act",
      date: "2023 – present", year: 2023,
      place: "U.S. Senate and House",
      coords: [38.89, -77.01],
      galleries: ["government", "uap"],
      status: "record",
      teaser: "Senators propose a JFK-style review of UAP records. Some of it becomes law.",
      story: "Senators Chuck Schumer and Mike Rounds introduced the UAP Disclosure Act in July 2023. It proposed a presidentially appointed review board and government power to take control of recovered technology. The final defense bill kept a requirement that agencies send UAP records to the National Archives, but dropped the review board. Lawmakers have reintroduced versions since, including amendments in 2025.",
      documented: ["The text is on congress.gov.", "The National Archives created an Unidentified Anomalous Phenomena Records Collection."],
      claimed: [],
      explanation: "The law that created a permanent public home for UAP records.",
      sources: [
        { title: "Text of the UAP Disclosure Act amendment (Senate Democrats)", url: "https://www.democrats.senate.gov/imo/media/doc/uap_amendment.pdf" },
        { title: "National Archives UAP Records Collection", url: "https://www.archives.gov/research/topics/uaps" }
      ],
      related: ["grusch-2023", "pursue-2026"]
    },
    {
      id: "aaro-hrr",
      title: "AARO's Historical Record Report",
      date: "March 8, 2024", year: 2024,
      place: "The Pentagon",
      coords: [38.87, -77.06],
      galleries: ["government", "crashes", "uap"],
      status: "record",
      teaser: "AARO reviews 80 years of claims and finds no evidence of alien technology.",
      story: "Congress required AARO to review the government's UAP history from 1945 on. Volume 1 found no verifiable evidence that any UAP sighting was extraterrestrial technology, or of a hidden crash-retrieval program. It traced many claims to misidentified secret programs and to stories that spread through a small circle of people.",
      documented: ["The report is public on AARO's website."],
      claimed: ["Critics, including some lawmakers, called it incomplete."],
      explanation: "The government's official answer to the crash-retrieval claims.",
      sources: [{ title: "AARO records and research", url: "https://www.aaro.mil/UAP-Records-Research/" }],
      related: ["grusch-2023", "roswell", "aatip"]
    },
    {
      id: "hearing-2024",
      title: "'Exposing the Truth' Hearing",
      date: "November 13, 2024", year: 2024,
      place: "U.S. Capitol",
      coords: [38.89, -77.01],
      galleries: ["government", "uap"],
      status: "record",
      teaser: "Luis Elizondo and others testify about secrecy and UAP.",
      story: "House Oversight subcommittees heard from Luis Elizondo, retired Navy Rear Admiral Tim Gallaudet, former NASA official Michael Gold and journalist Michael Shellenberger. Witnesses argued that secret programs exist and urged more transparency.",
      documented: ["The hearing video is public."],
      claimed: ["Secret UAP programs exist and are hidden from Congress."],
      explanation: "Testimony was largely about secrecy rather than new evidence.",
      sources: [
        { title: "House Oversight hearing page, 13 November 2024", url: "https://oversight.house.gov/hearing/unidentified-anomalous-phenomena-exposing-the-truth/" },
        { title: "Hearing transcript (GovInfo)", url: "https://www.govinfo.gov/content/pkg/CHRG-118hhrg57440/html/CHRG-118hhrg57440.htm" }
      ],
      related: ["grusch-2023", "hearing-2025"]
    },
    {
      id: "aaro-reports",
      title: "AARO's Annual Reports",
      date: "2023 – present", year: 2024,
      place: "The Pentagon",
      coords: [38.87, -77.06],
      galleries: ["government", "uap", "science"],
      status: "record",
      teaser: "Year by year: more reports, mostly balloons, drones and birds, and a handful of puzzles.",
      story: "AARO's FY2024 report, released November 14, 2024, logged 757 new reports and said it had reviewed 1,652 cases in total. Twenty-one cases were flagged as needing further analysis. AARO said it found no evidence of extraterrestrial technology. Its FY2025 report, covering June 2024 to May 2025, logged 319 more reports and resolved 114 as ordinary objects.",
      documented: ["The reports are public on AARO's website."],
      claimed: [],
      explanation: "The rise in reports reflects better reporting systems, not necessarily more objects.",
      sources: [
        { title: "AARO FY2024 Consolidated Annual Report on UAP (PDF)", url: "https://odni.gov/files/ODNI/documents/assessments/DOD-AARO-Consolidated-Annual-Report-on-UAP-Nov2024.pdf" },
        { title: "AARO official site", url: "https://www.aaro.mil" }
      ],
      related: ["aaro-founded", "nj-drones-2024", "pursue-2026"]
    },
    {
      id: "nj-drones-2024",
      title: "The New Jersey Drone Flap",
      date: "November – December 2024", year: 2024,
      place: "New Jersey and the Northeast",
      coords: [40.06, -74.4],
      galleries: ["sightings", "uap"],
      status: "likely",
      teaser: "Weeks of nightly drone sightings, flight bans and national panic.",
      story: "Residents across New Jersey and nearby states reported drones and lights at night. The FAA restricted flights over some areas, and officials gave confusing statements. Many videos turned out to show planes, helicopters and stars.",
      documented: ["FAA flight restrictions and federal statements are public."],
      claimed: ["Foreign drones or something stranger."],
      explanation: "In January 2025, the White House said the drones were authorized by the FAA for research and other purposes, and that many sightings were hobbyists and manned aircraft.",
      sources: [
        { title: "ABC News: White House says New Jersey drones were authorized by the FAA", url: "https://abc7ny.com/post/white-house-says-many-drones-spotted-new-jersey-east-coast-were-flown-faa-was-not-enemy/15844019/" }
      ],
      related: ["balloons-2023", "aaro-reports"]
    },
    {
      id: "hearing-2025",
      title: "The 2025 Task Force Hearing & the Yemen Video",
      date: "September 9, 2025", year: 2025,
      place: "U.S. Capitol",
      coords: [38.89, -77.01],
      galleries: ["government", "military", "uap"],
      status: "unresolved",
      teaser: "Congress is shown a drone video of a Hellfire missile hitting an orb that keeps going.",
      story: "Rep. Anna Paulina Luna's Task Force on the Declassification of Federal Secrets held a hearing on UAP transparency and whistleblower protection. Witnesses included journalist George Knapp and veterans Jeffrey Nuccetelli, Dylan Borland and Alexandro Wiggins. Rep. Eric Burlison showed footage from off Yemen in which an MQ-9 drone's Hellfire missile strikes a glowing orb, which appears to keep moving.",
      documented: ["The hearing and video were broadcast."],
      claimed: ["The orb survived a direct missile hit."],
      explanation: "The video shows the missile reaching the object, but from one sensor at long range it is hard to judge what happened. No official analysis has been released.",
      sources: [
        { title: "House Oversight hearing page, 9 September 2025", url: "https://oversight.house.gov/hearing/restoring-public-trust-through-uap-transparency-and-whistleblower-protection/" },
        { title: "Hearing transcript (GovInfo)", url: "https://www.govinfo.gov/content/pkg/CHRG-119hhrg61718/html/CHRG-119hhrg61718.htm" }
      ],
      related: ["hearing-2024", "pursue-2026"]
    },
    {
      id: "pursue-2026",
      title: "PURSUE: The 2026 File Releases",
      date: "February – September 2026", year: 2026,
      place: "Department of War, war.gov/UFO",
      coords: [38.87, -77.06],
      galleries: ["government", "uap"],
      status: "record",
      teaser: "A presidential directive sends hundreds of UFO files into public view in six releases.",
      story: "In February 2026 President Trump directed agencies to identify and declassify UFO and UAP files. The Department of War launched PURSUE (the Presidential Unsealing and Reporting System for UAP Encounters) on May 8, 2026, with more than 150 files. Five more releases followed through September 18, 2026, drawing on the Pentagon, CIA, FBI, NASA, the Department of Energy, the State Department and others. Highlights include Apollo-era photos and transcripts, green orb reports near a military facility, an infrared video of objects near Iran, and a copy of the 1952 Tremonton film.",
      documented: ["All releases are posted at war.gov/UFO with downloadable bundles."],
      claimed: ["Proof of non-human visitors."],
      explanation: "Officials said the files do not confirm extraterrestrial life and invited the public to draw its own conclusions. Skeptics noted much of the material was already public or showed ordinary effects. Many files are raw and unanalyzed, which makes them good practice for a friendly skeptic.",
      sources: [
        { title: "PURSUE: Department of War UAP file releases", url: "https://www.war.gov/UFO/" },
        { title: "National Archives UAP Records Collection", url: "https://www.archives.gov/research/topics/uaps" }
      ],
      related: ["tremonton", "green-fireballs", "apollo-lunar-photos", "gemini-7", "disclosure-act", "hearing-2025"]
    },
    /* ---------- SPACE & ASTRONAUTS ---------- */
    {
      id: "glenn-fireflies",
      title: "John Glenn's Fireflies",
      date: "February 20, 1962", year: 1962,
      place: "Earth orbit, aboard Friendship 7",
      orbit: "leo",
      galleries: ["space", "science"],
      status: "explained",
      teaser: "The first American to orbit Earth sees thousands of glowing specks dancing around his capsule.",
      story: "As Friendship 7 came out of the night side of its orbit, John Glenn reported thousands of tiny, luminous particles drifting around the capsule. He called them fireflies and told Mission Control he had never seen anything like it. The sighting fed early speculation about life in space. Three months later, astronaut Scott Carpenter bumped the inside wall of his Aurora 7 capsule and set off the same shower of glowing flecks.",
      documented: ["Glenn's description is in the mission's air-to-ground transcript.", "Carpenter reproduced the effect on Aurora 7 in May 1962 by striking the capsule wall."],
      claimed: ["Living organisms or something unknown in orbit."],
      explanation: "Frost and ice flakes breaking off the capsule's outer surface and catching the sunrise. Carpenter called them 'frostflies.'",
      sources: [
        { title: "Exploration Mysteries: John Glenn and the 'Fireflies' in Space (ExplorersWeb)", url: "https://explorersweb.com/exploration-mysteries-john-glenn-and-the-fireflies-in-space/" },
        { title: "The Mystery of John Glenn's Fireflies Returns (Universe Today)", url: "https://www.universetoday.com/articles/the-mystery-of-john-glenns-fireflies-returns" }
      ],
      related: ["gemini-4", "gemini-7", "sts-48"]
    },
    {
      id: "gemini-4",
      title: "McDivitt's Gemini 4 Object",
      date: "June 1965", year: 1965,
      place: "Earth orbit, over Hawaii",
      orbit: "leo",
      galleries: ["space"],
      status: "likely",
      teaser: "An astronaut photographs a cylinder with an arm sticking out of it. The photo NASA released showed something else.",
      story: "On Gemini 4, while Ed White slept, command pilot James McDivitt saw a white, cylindrical object with what looked like a pole or arm sticking out of it. He took a few photographs. After the flight, a frame showing a bright tadpole-shaped streak was released as the object, but it turned out to be sunlight glaring on the window. McDivitt said for the rest of his life that he saw something real, but probably a piece of man-made debris, not a spacecraft from elsewhere.",
      documented: ["McDivitt's own accounts and interviews.", "NASA's mission photography, including the frame later identified as window glare."],
      claimed: ["A structured alien craft photographed by an astronaut."],
      explanation: "Space historian James Oberg argues it was most likely the spent Titan II second stage flying nearby, made hard to recognize by glare, dirty windows and viewing angle. McDivitt agreed it was probably man-made.",
      sources: [
        { title: "The Gemini 4 'UFO' (James Oberg)", url: "https://jamesoberg.com/gemini4.html" },
        { title: "McDivitt's explanation for his Gemini 4 object (PDF, James Oberg)", url: "https://www.jamesoberg.com/mcdivitt's_explanation_for_his_Gemini-4_object.pdf" }
      ],
      related: ["gemini-7", "glenn-fireflies", "apollo-11-light"]
    },
    {
      id: "gemini-7",
      title: "The Gemini 7 'Bogey'",
      date: "December 1965", year: 1965,
      place: "Earth orbit",
      orbit: "leo",
      galleries: ["space", "uap"],
      status: "likely",
      teaser: "Frank Borman reports a 'bogey' and hundreds of little particles. The transcript reappeared in the 2026 file release.",
      story: "During the two-week Gemini 7 mission, Frank Borman radioed that he had a 'bogey' in sight, along with a field of hundreds of small particles. The word comes from military pilot slang for an unidentified aircraft, and UFO writers later held it up as an astronaut sighting. The transcript was included in the first PURSUE release in May 2026.",
      documented: ["The air-to-ground transcript.", "Its inclusion in PURSUE Release 01 (May 8, 2026)."],
      claimed: ["NASA astronauts encountered an unknown craft."],
      explanation: "James Oberg's analysis of the orbits points to 'a brighter-than-average piece of booster-associated debris,' most likely the rocket stage that launched them. Borman himself later said it was not a UFO.",
      sources: [
        { title: "Pentagon releases UFO files that go back to the Apollo moon missions (Universe Today, May 2026)", url: "https://www.universetoday.com/articles/pentagon-releases-ufo-files-that-go-back-to-the-apollo-moon-missions" },
        { title: "PURSUE: Department of War UAP file releases", url: "https://www.war.gov/UFO/" }
      ],
      related: ["gemini-4", "apollo-lunar-photos", "pursue-2026"]
    },
    {
      id: "apollo-11-light",
      title: "Apollo 11's Traveling Light",
      date: "July 1969", year: 1969,
      place: "On the way to the Moon",
      orbit: "translunar",
      galleries: ["space", "hoaxes"],
      status: "likely",
      teaser: "Buzz Aldrin sees a light pacing the spacecraft. A science fiction writer's hoax made the story much bigger.",
      story: "On the way to the Moon, the Apollo 11 crew saw a light out the window that seemed to travel alongside them. They asked Mission Control where their discarded rocket stage was and were told it was thousands of miles away. Aldrin talked about the sighting in later interviews and said his words were often taken out of context. Separately, a fabricated story that Neil Armstrong saw alien craft on the lunar surface spread widely; it has been traced to a hoax by science fiction writer Otto Binder.",
      documented: ["The crew's sighting and their question to Mission Control.", "Aldrin's later interviews about it."],
      claimed: ["Alien craft followed Apollo 11 to the Moon.", "Armstrong reported aliens watching from a crater."],
      explanation: "The most likely candidates are panels that separated from the rocket when the spacecraft pulled away, which would have traveled along a similar path. Aldrin has said it was probably one of them. The Armstrong quote is a hoax.",
      sources: [
        { title: "UFO sightings in outer space (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/UFO_sightings_in_outer_space" }
      ],
      related: ["gemini-4", "apollo-lunar-photos", "gemini-7"]
    },
    {
      id: "apollo-lunar-photos",
      title: "The Apollo 12 & 17 Photos in the 2026 Files",
      date: "1969 and 1972, released May 2026", year: 1972,
      place: "The lunar surface",
      orbit: "moon",
      galleries: ["space", "uap"],
      status: "unresolved",
      teaser: "The Pentagon's first PURSUE release circled bright specks in photos taken on the Moon.",
      story: "PURSUE Release 01 included NASA photographs from the Apollo 12 and Apollo 17 lunar surface missions, with enlarged insets highlighting bright spots or streaks in the black sky. One Apollo 17 image of a lunar mountain range shows three light-colored specks in a rough triangle. The release presented them as unresolved. Other material in later releases mentioned 'green orbs' during Apollo 12.",
      documented: ["The photographs are genuine NASA images.", "They were included and highlighted in PURSUE Release 01 (May 8, 2026)."],
      claimed: ["Objects were watching the Moon landings."],
      explanation: "No analysis has been published with the release. Specks and streaks in film photography are often dust, scratches, lens reflections or debris near the camera. The original high-resolution scans are public, so these can be checked.",
      sources: [
        { title: "Pentagon releases UFO files that go back to the Apollo moon missions (Universe Today, May 2026)", url: "https://www.universetoday.com/articles/pentagon-releases-ufo-files-that-go-back-to-the-apollo-moon-missions" },
        { title: "PURSUE: Department of War UAP file releases", url: "https://www.war.gov/UFO/" }
      ],
      related: ["apollo-11-light", "gemini-7", "pursue-2026"]
    },
    {
      id: "sts-48",
      title: "The STS-48 'Zigzag' Video",
      date: "September 15, 1991", year: 1991,
      place: "Space Shuttle Discovery, in orbit",
      orbit: "leo",
      galleries: ["space", "science"],
      status: "explained",
      teaser: "Shuttle video shows dots drifting, then darting away after a flash. It became a UFO classic.",
      story: "A camera in Discovery's payload bay recorded several small lights drifting near the Earth's horizon. After a flash, one of the dots appears to change direction sharply and others speed away. The clip spread widely on television in the 1990s as proof of craft maneuvering near the shuttle.",
      documented: ["NASA's downlinked video and the shuttle's flight records."],
      claimed: ["Craft dodging a weapon or reacting to the shuttle."],
      explanation: "James Oberg matched the flash to a steering jet firing as the autopilot corrected a slow drift. The dots are small pieces of debris and ice near the shuttle, lit as it came out of Earth's shadow, and the jet's exhaust pushed them in new directions.",
      sources: [
        { title: "STS-48 'UFO' video explained (James Oberg)", url: "https://jamesoberg.com/sts48.html" }
      ],
      related: ["glenn-fireflies", "iss-lights", "gimbal-gofast"]
    },
    {
      id: "iss-lights",
      title: "Lights from the Space Station",
      date: "2005 – 2020", year: 2005,
      place: "International Space Station",
      orbit: "leo",
      galleries: ["space"],
      status: "explained",
      teaser: "Astronauts on the ISS report and film strange lights. Each one has a down-to-earth answer.",
      story: "Life on the space station has produced a steady trickle of sightings. During a 2005 spacewalk Leroy Chiao saw a line of lights below him. In 2013 Christopher Cassidy reported an object near a cargo ship. In 2020 cosmonaut Ivan Vagner posted a video of 'space guests' crossing the sky.",
      documented: ["The astronauts' own posts and interviews."],
      claimed: ["Craft observing the space station."],
      explanation: "Chiao later identified his lights as fishing boats hundreds of miles below. Russian controllers identified Cassidy's object as an antenna cover from the Zvezda module. Vagner's lights were later matched to satellites.",
      sources: [
        { title: "UFO sightings in outer space (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/UFO_sightings_in_outer_space" }
      ],
      related: ["sts-48", "kaikoura", "nasa-uap-study"]
    },

    /* ---------- OFFICIAL RECORDS AROUND THE WORLD ---------- */
    {
      id: "petrozavodsk",
      title: "The Petrozavodsk 'Jellyfish'",
      date: "September 20, 1977", year: 1977,
      place: "Petrozavodsk, Soviet Union (now Russia)",
      coords: [61.79, 34.36],
      galleries: ["world", "sightings", "government"],
      status: "explained",
      teaser: "A glowing jellyfish hangs over a Soviet city before dawn and sets off a state UFO program.",
      story: "Before dawn, residents of Petrozavodsk in Karelia saw a huge glowing object, described as a jellyfish, spreading rays of light over the city before it faded. The Soviet news agency TASS reported it, which was unusual, and the sighting is credited with prompting the Soviet Academy of Sciences and the military to start formal research into anomalous phenomena.",
      documented: ["TASS and Soviet newspaper coverage at the time.", "Later Soviet research programs into anomalous phenomena."],
      claimed: ["An alien craft over a Soviet city."],
      explanation: "The time and appearance match the launch of the Kosmos 955 satellite from the secret Plesetsk launch site, whose exhaust plume spread out in sunlight high above the dark ground. The launch site's existence was secret, which helped keep the mystery alive.",
      sources: [
        { title: "Kosmos 955 (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Kosmos_955" }
      ],
      related: ["ghost-rockets", "phoenix-lights", "kaikoura"]
    },
    {
      id: "operacao-prato",
      title: "Operação Prato",
      date: "October – December 1977", year: 1977,
      place: "Colares island, Pará, Brazil",
      coords: [-0.93, -48.28],
      galleries: ["world", "military", "encounters", "government"],
      status: "unresolved",
      teaser: "Brazil's Air Force sends a team to a river island where residents say lights are attacking them.",
      story: "Residents of Colares and nearby towns in the Amazon state of Pará reported lights they called 'chupa-chupa' (sucker) that they said left marks on their bodies. Families held all-night vigils and lit fires to keep them away. At the mayor's request, the Brazilian Air Force sent a team under Captain Uyrangê Hollanda, which spent weeks photographing and logging lights. In 1997 Hollanda gave a long interview to ufologists describing what his men saw. He died three months later, which drew conspiracy theories.",
      documented: ["The Air Force's reports and photographs, now held by Brazil's National Archives.", "Medical and press accounts of residents' injuries."],
      claimed: ["Lights attacked and drained blood from villagers.", "The military recovered evidence it never released."],
      explanation: "The operation closed after concluding it had found nothing unusual. Fear spread quickly in a remote, poor area, and some injuries may have had ordinary causes, but the many reports and photos have never been fully explained.",
      sources: [
        { title: "Operação Prato (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Opera%C3%A7%C3%A3o_Prato" },
        { title: "Colares 1977: military documents and reports (Patrick Gross archive)", url: "https://ufology.patrickgross.org/htm/colaresmilitary.htm" }
      ],
      related: ["brazil-1986", "cash-landrum", "kelly-hopkinsville"]
    },
    {
      id: "kaikoura",
      title: "The Kaikōura Lights",
      date: "December 21 and 31, 1978", year: 1978,
      place: "Off Kaikōura, New Zealand",
      coords: [-42.4, 173.68],
      galleries: ["world", "military", "sightings"],
      status: "likely",
      teaser: "Cargo pilots see lights off the coast, radar tracks targets, and a TV crew films them.",
      story: "On December 21, Safe Air pilots flying an Argosy freighter reported lights near their aircraft, and Wellington air traffic control tracked unknown targets on radar. Ten days later an Australian TV crew led by reporter Quentin Fogarty flew the same route and filmed bright lights on 16mm film for about fifteen minutes while the plane's own radar showed returns. The footage was broadcast around the world.",
      documented: ["The film, audio recording and crew accounts.", "Investigations by the Air Force, police and Carter Observatory, now at the National Archives in Wellington."],
      claimed: ["Craft followed the aircraft along the coast."],
      explanation: "New Zealand's scientists and Defence officials favored the powerful lights of squid fishing boats, reflected by clouds and distorted by weather, along with Venus. A 2000 analysis supported the squid boats. American physicist Bruce Maccabee argued at least part of it stayed unexplained.",
      sources: [
        { title: "Kaikōura lights (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/Kaik%C5%8Dura_lights" },
        { title: "Ghost Squid Boats in the Sky (NZ Skeptics, 2000)", url: "https://articles.skeptics.nz/2000/11/01/ghost-squid-boats-in-the-sky" }
      ],
      related: ["valentich", "jal-1628", "petrozavodsk"]
    },
    {
      id: "cridovni",
      title: "Uruguay's Air Force UFO Commission",
      date: "1979 – present", year: 1979,
      place: "Montevideo, Uruguay",
      coords: [-34.9, -56.16],
      galleries: ["world", "government"],
      status: "record",
      teaser: "One of the longest-running official UFO investigation units in the world.",
      story: "Uruguay's Air Force set up the Comisión Receptora e Investigadora de Denuncias de Objetos Voladores No Identificados (CRIDOVNI) in 1979 to collect and investigate reports. It continues to take public reports and issue findings, and most of its cases are resolved as aircraft, satellites, planets and other ordinary objects.",
      documented: ["The commission's public statements and press coverage in Uruguay."],
      claimed: [],
      explanation: "A quiet example of a government treating UFO reports as routine work for decades.",
      sources: [
        { title: "Commission statement on recent reports (Montevideo Portal, in Spanish)", url: "https://www.montevideo.com.uy/Noticias/Comision-Investigadora-de-Denuncias-de-OVNI-aclara-que-posibles-sucesos-no-son-reales--uc795107" }
      ],
      related: ["cefaa", "geipan", "peru-ufo-office"]
    },
    {
      id: "brazil-1986",
      title: "Brazil's Official UFO Night",
      date: "May 19, 1986", year: 1986,
      place: "São Paulo, Rio de Janeiro, Minas Gerais and Goiás, Brazil",
      coords: [-23.0, -45.5],
      galleries: ["world", "military", "government"],
      status: "unresolved",
      teaser: "Radar tracks 21 objects, five fighter jets scramble, and the Air Minister says he has no explanation.",
      story: "On the night of May 19, civilian and military witnesses across southeastern Brazil reported lights, and the Air Force's air defense radar tracked targets. Five fighter jets were sent to intercept. Some pilots saw lights the radar didn't register, and the Air Force counted only sightings confirmed both ways. Four days later, Air Minister Brigadier Octávio Moreira Lima told reporters, 'Technically, I would tell you that we have no explanation.'",
      documented: ["The minister's televised press conference.", "An Air Force report dated June 2, 1986, released in 2009. It described the objects as solid and showing a degree of intelligence.", "Most of the Air Force's UFO files were later moved to Brazil's National Archives."],
      claimed: ["Brazil's military chased alien craft for hours."],
      explanation: "No full explanation has been published. Skeptics point to radar effects, bright stars and planets, and the difficulty of pilots judging distant lights at night.",
      sources: [
        { title: "Official UFO Night in Brazil (Government of Brazil)", url: "https://www.gov.br/en/government-of-brazil/latest-news/2022/official-ufo-night-in-brazil" }
      ],
      related: ["operacao-prato", "belgian-wave", "tehran-1976"]
    },
    {
      id: "cefaa",
      title: "Chile's CEFAA and the Navy Helicopter Video",
      date: "1997 – present (video: November 11, 2014)", year: 2014,
      place: "Chile",
      coords: [-34.09, -71.91],
      galleries: ["world", "military", "government", "science"],
      status: "explained",
      teaser: "Chile's official UFO committee releases a Navy video it calls unexplained. Online analysts found the airliner.",
      story: "Chile's civil aviation authority runs the Committee for the Study of Anomalous Aerial Phenomena (CEFAA), which has investigated reports since the late 1990s. In January 2017 it released infrared and color video taken from a Chilean Navy helicopter in November 2014, showing an object leaving a dark trail over the ocean. After two years of study, the committee said it could not identify the object.",
      documented: ["The video and CEFAA's statement on its release."],
      claimed: ["A Navy crew filmed an unknown craft dumping something into the air."],
      explanation: "Within weeks, analysts at Metabunk matched the timing and direction to Iberia flight IB6830, an Airbus A340 climbing out of Santiago. The bright 'object' is the engines' heat in infrared, and the trail is a contrail. It's a lesson in how an official 'unidentified' can mean 'not yet identified.'",
      sources: [
        { title: "Explained: Chilean Navy 'UFO' video (Metabunk)", url: "https://www.metabunk.org/goto/post?id=198276" }
      ],
      related: ["mexico-2004", "gimbal-gofast", "cridovni"]
    },
    {
      id: "peru-ufo-office",
      title: "Peru's Air Force UFO Office",
      date: "2001 – 2008, reopened 2013", year: 2001,
      place: "Lima, Peru",
      coords: [-12.05, -77.04],
      galleries: ["world", "government"],
      status: "record",
      teaser: "Peru's Air Force opens, closes and reopens an office dedicated to anomalous aerial phenomena.",
      story: "The Peruvian Air Force created a department to investigate anomalous aerial phenomena in 2001, after a wave of sightings including the Chulucanas case that year. It brought together Air Force personnel with astronomers, sociologists and archaeologists. The office closed a few years later because of administrative problems and was reopened in 2013 after an increase in reports.",
      documented: ["Air Force announcements and international press coverage in 2001 and 2013."],
      claimed: [],
      explanation: "Part of a pattern across Latin America, where several air forces have treated UFO reports as a normal part of their work.",
      sources: [
        { title: "Peru's Air Force opens a UFO office (Foreign Policy, 2013)", url: "https://foreignpolicy.com/2013/10/29/perus-air-force-opens-a-ufo-office-and-its-twitter-friendly" }
      ],
      related: ["cefaa", "cridovni", "geipan"]
    },
    {
      id: "mexico-2004",
      title: "The Mexican Air Force Infrared Video",
      date: "March 5, 2004", year: 2004,
      place: "Over Campeche, Mexico",
      coords: [19.4, -92.2],
      galleries: ["world", "military", "science"],
      status: "explained",
      teaser: "A drug-surveillance plane films eleven glowing objects on infrared. They didn't move.",
      story: "A Mexican Air Force surveillance aircraft on an anti-drug patrol recorded a group of bright lights on its infrared camera over the state of Campeche. The crew could not see them with the naked eye, and radar briefly showed targets. Mexico's Defense Ministry allowed the video to be released in May 2004, and it made international headlines as an official UFO video.",
      documented: ["The infrared video and the crew's account, released with Defense Ministry approval."],
      claimed: ["Invisible craft surrounded a military aircraft."],
      explanation: "Researchers matched the lights to gas flares burning on oil platforms in the Cantarell offshore field, far over the horizon. Infrared cameras pick up their heat even when the eye can't see them. The 'objects' kept a fixed pattern because they were fixed.",
      sources: [
        { title: "Mexican Air Force UFO video: oil rig flares (Metabunk)", url: "https://www.metabunk.org/mexican-ufo-video.t10837/" },
        { title: "Arizona Republic, May 2004: news coverage (transcription)", url: "https://ufologie.patrickgross.org/press/arizonarepublic13may2004.htm" }
      ],
      related: ["cefaa", "gimbal-gofast", "phoenix-lights"]
    }
  ],

  /* ------------------------------------------------------------------
     EXTRA TIMELINE ENTRIES: events without their own case page
     ------------------------------------------------------------------ */
  extraTimeline: [
    { year: 1952, date: "March 1952", title: "Project Blue Book begins", text: "Captain Edward Ruppelt takes over the Air Force study and coins the term 'unidentified flying object.'", link: "project-blue-book" },
    { year: 1972, date: "1972", title: "Hynek's 'close encounters' scale", text: "J. Allen Hynek's book 'The UFO Experience' introduces close encounters of the first, second and third kinds.", link: null },
    { year: 1973, date: "1973", title: "CUFOS founded", text: "Hynek founds the Center for UFO Studies, a civilian research group.", link: null },
    { year: 1993, date: "September 1993", title: "The X-Files premieres", text: "The TV series about two FBI agents investigating the paranormal makes UFOs and government secrets prime-time viewing.", link: null },
    { year: 1977, date: "November 1977", title: "Close Encounters of the Third Kind", text: "Steven Spielberg's film, with Hynek as an adviser, turns UFOs into mainstream culture.", link: null },
    { year: 1978, date: "1978", title: "Roswell returns", text: "Jesse Marcel tells researcher Stanton Friedman the 1947 debris was not from Earth. A legend restarts.", link: "roswell" },
    { year: 2009, date: "December 2009", title: "UK closes its UFO desk", text: "The Ministry of Defence stops investigating reports after more than 50 years.", link: "uk-mod-files" },
    { year: 2020, date: "August 2020", title: "UAP Task Force formed", text: "The Navy-led Unidentified Aerial Phenomena Task Force begins work.", link: "navy-release-2020" },
    { year: 2026, date: "May 8, 2026", title: "PURSUE Release 01", text: "More than 150 files, including Apollo photos and transcripts, go online.", link: "pursue-2026" },
    { year: 2026, date: "May 22, 2026", title: "PURSUE Release 02", text: "Includes a Sandia Base dossier and audio recordings.", link: "pursue-2026" },
    { year: 2026, date: "June 12, 2026", title: "PURSUE Release 03", text: "CIA and FBI orb and disc reports.", link: "pursue-2026" },
    { year: 2026, date: "July 10, 2026", title: "PURSUE Release 04", text: "40 files, nearly half of them video.", link: "pursue-2026" },
    { year: 2026, date: "August 7, 2026", title: "PURSUE Release 05", text: "41 files spanning 1950 to 2026, including FBI witness forms.", link: "pursue-2026" },
    { year: 2026, date: "September 18, 2026", title: "PURSUE Release 06", text: "Includes the 1952 Tremonton film the Robertson Panel reviewed.", link: "tremonton" }
  ],

  /* ------------------------------------------------------------------
     READING ROOM: primary archives and key documents
     type: archive | report | hearing | video | law
     ------------------------------------------------------------------ */
  readingRoom: [
    { id: "pursue", title: "PURSUE (war.gov/UFO)", agency: "Department of War", year: "2026", type: "archive", url: "https://www.war.gov/UFO/", about: "The 2026 releases of declassified UAP files, with downloadable bundles of documents, video and audio.", caution: "Most files are raw and unanalyzed. 'Released' does not mean 'unexplained.'", cases: ["pursue-2026", "tremonton", "green-fireballs"] },
    { id: "nara-uap", title: "UAP Records Collection", agency: "National Archives", year: "2024–", type: "archive", url: "https://www.archives.gov/research/topics/uaps", about: "The permanent home for UAP records that federal agencies must send under the 2024 defense bill.", caution: "Still filling up. Check back often.", cases: ["disclosure-act", "pursue-2026"] },
    { id: "nara-bluebook", title: "Project Blue Book Records", agency: "National Archives", year: "1947–1969", type: "archive", url: "https://www.archives.gov/research/military/air-force/ufos", about: "The case files of Projects Sign, Grudge and Blue Book. Over 12,000 reports.", caution: "Witness names were redacted in some copies. Investigations vary a lot in quality.", cases: ["project-blue-book", "kenneth-arnold", "socorro", "levelland", "exeter"] },
    { id: "fbi-vault", title: "FBI Vault: UFO", agency: "FBI", year: "1947–", type: "archive", url: "https://vault.fbi.gov/UFO", about: "Thousands of pages of FBI memos and letters about saucer reports, hoaxes and inquiries.", caution: "The FBI mostly collected reports. It rarely investigated them.", cases: ["maury-island", "aztec-hoax", "roswell"] },
    { id: "fbi-mj12", title: "FBI Vault: Majestic 12", agency: "FBI", year: "1988–", type: "archive", url: "https://vault.fbi.gov/Majestic%2012", about: "The FBI's file on the MJ-12 documents, which it judged to be fake.", caution: "The file includes copies of the fake documents. Read the FBI's conclusion too.", cases: ["mj-12"] },
    { id: "cia-reading", title: "CIA Reading Room", agency: "CIA", year: "1949–", type: "archive", url: "https://www.cia.gov/readingroom/", about: "Search for 'UFO' to find the Robertson Panel report, 1950s memos and Gerald Haines's 1997 history.", caution: "Many documents are partly redacted. Read the date and author first.", cases: ["robertson-panel", "cia-haines", "ghost-rockets", "tehran-1976"] },
    { id: "aaro-site", title: "AARO", agency: "Department of War", year: "2022–", type: "archive", url: "https://www.aaro.mil", about: "Annual reports, case resolutions, the Historical Record Report and an official reporting form.", caution: "AARO is part of the system some critics distrust. Compare its findings with other sources.", cases: ["aaro-founded", "aaro-reports", "aaro-hrr"] },
    { id: "aaro-hrr-doc", title: "Historical Record Report, Vol. 1", agency: "AARO", year: "2024", type: "report", url: "https://www.aaro.mil/UAP-Records-Research/", about: "AARO's review of U.S. government UAP investigations since 1945.", caution: "Lawmakers have challenged its scope. It covers what AARO could access.", cases: ["aaro-hrr", "roswell", "aatip"] },
    { id: "odni-2021-doc", title: "Preliminary Assessment: UAP", agency: "ODNI", year: "2021", type: "report", url: "https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf", about: "The nine-page report on 144 military UAP reports from 2004 to 2021.", caution: "Short and unclassified. A classified annex was not released.", cases: ["odni-2021"] },
    { id: "nasa-report", title: "UAP Independent Study Team Report", agency: "NASA", year: "2023", type: "report", url: "https://science.nasa.gov/uap/", about: "NASA's panel on how to study UAP with good data.", caution: "It reviewed only unclassified data.", cases: ["nasa-uap-study", "gimbal-gofast"] },
    { id: "navy-videos", title: "Navy UAP Videos", agency: "U.S. Navy", year: "2020", type: "video", url: "https://www.navair.navy.mil/foia/documents", about: "The official FLIR1, Gimbal and GoFast videos.", caution: "Infrared video of distant objects is easy to misread. Read the analyses too.", cases: ["nimitz", "gimbal-gofast", "navy-release-2020"] },
    { id: "gao-roswell", title: "GAO Report on Roswell Records", agency: "GAO", year: "1995", type: "report", url: "https://www.gao.gov/products/nsiad-95-187", about: "Congress's auditors search for Roswell-era records.", caution: "It found records missing, not hidden aliens.", cases: ["roswell", "roswell-reports"] },
    { id: "dia-foia", title: "DIA FOIA Reading Room", agency: "Defense Intelligence Agency", year: "2008–", type: "archive", url: "https://www.dia.mil/FOIA/FOIA-Electronic-Reading-Room/", about: "Includes released AAWSAP technical papers.", caution: "The papers are speculative physics, not findings about UAP.", cases: ["aatip"] },
    { id: "oversight", title: "House Oversight Committee", agency: "U.S. Congress", year: "2023–", type: "hearing", url: "https://oversight.house.gov", about: "Video and testimony from the 2023, 2024 and 2025 UAP hearings.", caution: "Testimony is sworn but often secondhand.", cases: ["grusch-2023", "hearing-2024", "hearing-2025"] },
    { id: "congress-gov", title: "Congress.gov", agency: "U.S. Congress", year: "", type: "law", url: "https://www.congress.gov", about: "Bill text for the UAP Disclosure Act and UAP sections of defense bills, plus hearing records.", caution: "Proposed bills are not laws. Check what actually passed.", cases: ["disclosure-act", "hearing-2022"] },
    { id: "govinfo", title: "GovInfo", agency: "U.S. Government Publishing Office", year: "", type: "hearing", url: "https://www.govinfo.gov", about: "Historical hearing transcripts, including 1966 and 1968.", caution: "Older transcripts are scanned. Search carefully.", cases: ["hearing-1966", "symposium-1968"] },
    { id: "nara-catalog", title: "National Archives Catalog", agency: "National Archives", year: "", type: "archive", url: "https://catalog.archives.gov", about: "Search millions of digitized records. Try 'unidentified flying objects.'", caution: "Search results mix original records with later copies.", cases: ["condon-committee", "mcminnville"] },
    { id: "geipan-site", title: "GEIPAN Case Archive", agency: "CNES (France)", year: "1977–", type: "archive", url: "https://www.cnes-geipan.fr", about: "France's official UAP case files with a clear four-letter classification.", caution: "In French. Your browser can translate.", cases: ["geipan", "trans-en-provence"] },
    { id: "uk-na", title: "UK National Archives: UFOs", agency: "UK National Archives", year: "1950s–2009", type: "archive", url: "https://www.nationalarchives.gov.uk", about: "Ministry of Defence UFO files, including Rendlesham and Project Condign.", caution: "Search 'UFO' in Discovery, the catalog.", cases: ["uk-mod-files", "rendlesham"] },
    { id: "lac", title: "Library and Archives Canada", agency: "Government of Canada", year: "1947–", type: "archive", url: "https://www.bac-lac.gc.ca", about: "Canada's UFO files, including Shag Harbour.", caution: "Search 'UFO' in the collection search.", cases: ["shag-harbour"] },
    { id: "naa", title: "National Archives of Australia", agency: "Government of Australia", year: "1950s–", type: "archive", url: "https://www.naa.gov.au", about: "Australian UFO files, including Valentich.", caution: "Use RecordSearch with the keyword 'UFO'.", cases: ["valentich", "westall"] }
  ],

  /* ------------------------------------------------------------------
     DOCUMENT ROOM: guided walkthroughs of real files
     Each note `n` matches a pin with data-pin="n" on the document.
     Use `pages: [{ src: "docs/file.jpg", alt: "...", pins: [{ n: 1, x: 40, y: 12 }] }]`
     for scanned pages (x and y are percentages across and down the page).
     Without pages, the `facsimile` layout is shown instead.
     ------------------------------------------------------------------ */
  documents: [
    {
      id: "twining-memo",
      number: 1,
      title: "The Twining Memo",
      year: 1947,
      teaser: "A general is asked whether the flying discs are real. His answer is one of the most quoted pages in UFO history, and one of the most misread.",
      skills: "dates, routing lines, copies, hedges",
      intro: "Three months after Kenneth Arnold's sighting, the general in charge of the Air Force's engineering and intelligence center was asked a simple question: are the flying discs real? This is his answer.",
      facts: [
        { label: "Written by", value: "Lt. Gen. Nathan F. Twining, Air Materiel Command" },
        { label: "Sent to", value: "Brig. Gen. George Schulgen, Air Force intelligence" },
        { label: "Date", value: "23 September 1947" },
        { label: "Length", value: "One letter, four numbered paragraphs" }
      ],
      caption: "Layout of the memo. The header and highlighted line are quoted from it; grey lines stand in for the rest until the scanned page is added. Tap a pin or a note.",
      startNote: 4,
      facsimile: `
        <span class="dr-copy">COPY</span>
        <button class="dr-pin r" style="top:12px" data-pin="3" aria-pressed="false" aria-label="Note 3">3</button>
        <div class="dr-center">HEADQUARTERS<br>AIR MATERIEL COMMAND<br>WRIGHT FIELD, DAYTON, OHIO</div>
        <div class="dr-gap"></div>
        <div style="text-align:right">23 September 1947</div>
        <button class="dr-pin l" style="top:116px" data-pin="1" aria-pressed="false" aria-label="Note 1">1</button>
        <div class="dr-gap"></div>
        <div class="dr-row"><span>SUBJECT:</span><span>AMC Opinion Concerning "Flying Discs"</span></div>
        <div class="dr-gap"></div>
        <div class="dr-row" style="position:relative"><span>TO:</span><span>Commanding General<br>Army Air Forces<br>Washington 25, D. C.<br>ATTENTION: Brig. General George Schulgen<br>AC/AS-2</span>
          <button class="dr-pin l" style="top:62px" data-pin="2" aria-pressed="false" aria-label="Note 2">2</button></div>
        <div class="dr-para"><span class="dr-num">1.</span><span class="dr-sum">[What the opinion is based on]</span><span class="dr-ln l"></span><span class="dr-ln l"></span><span class="dr-ln m"></span></div>
        <div class="dr-para"><span class="dr-num">2.</span><span class="dr-sum">[The command's opinions, items a–h]</span><br>
          <span style="position:relative;display:block">a. <span class="dr-mark">The phenomenon reported is something real and not visionary or fictitious.</span>
            <button class="dr-pin l" style="top:-2px;left:-62px" data-pin="4" aria-pressed="false" aria-label="Note 4">4</button></span>
          <span class="dr-ln l"></span><span class="dr-ln m"></span>
          <span style="position:relative;display:block"><span class="dr-sum">c. [Some incidents may be natural, such as meteors]</span>
            <button class="dr-pin l" style="top:-6px;left:-62px" data-pin="5" aria-pressed="false" aria-label="Note 5">5</button></span>
          <span class="dr-ln l"></span><span class="dr-ln l"></span><span class="dr-ln s"></span>
          <span style="position:relative;display:block"><span class="dr-sum">h. [Things to weigh: a secret U.S. project, no crash-recovered evidence, a foreign design]</span>
            <button class="dr-pin l" style="top:-6px;left:-62px" data-pin="6" aria-pressed="false" aria-label="Note 6">6</button></span>
          <span class="dr-ln l"></span><span class="dr-ln m"></span></div>
        <div class="dr-para" style="position:relative"><span class="dr-num">3.</span><span class="dr-sum">[Recommends a priority study with a code name and a security classification]</span>
          <button class="dr-pin r" style="top:-4px" data-pin="7" aria-pressed="false" aria-label="Note 7">7</button>
          <span class="dr-ln l"></span><span class="dr-ln l"></span><span class="dr-ln m"></span></div>
        <div class="dr-para"><span class="dr-num">4.</span><span class="dr-sum">[Meanwhile, keep investigating with current resources]</span><span class="dr-ln m"></span></div>
        <div class="dr-gap"></div>
        <div style="margin-left:52%;position:relative">N. F. TWINING<br>Lieutenant General, U.S.A.<br>Commanding
          <button class="dr-pin r" style="top:6px;right:-24px" data-pin="8" aria-pressed="false" aria-label="Note 8">8</button></div>`,
      notes: [
        { n: 1, title: "Check the date first", skill: "place it in time", text: "23 September 1947 is three months after Kenneth Arnold's sighting and about eleven weeks after the Roswell press release. Whatever the Air Force knew about Roswell, this general knew it by now." },
        { n: 2, title: "Read the \"ATTENTION\" line", skill: "follow the routing", text: "The letter goes to the head of the Army Air Forces, but the ATTENTION line names who actually asked: Brig. Gen. Schulgen of AC/AS-2, the Air Staff's intelligence office. Twining is answering an intelligence question, not making an announcement." },
        { n: 3, title: "This is a copy", skill: "know which copy you have", text: "Most people know this memo from the version printed in the 1969 Condon Report, stamped COPY. Stamps and markings tell you which copy you're holding and where it came from, which matters when people argue over wording." },
        { n: 4, title: "The famous line", skill: "read the next sentence too", text: "\"Something real and not visionary or fictitious\" means people were seeing actual objects, not imagining them. It does not say what the objects were. Notice how often this sentence is quoted on its own." },
        { n: 5, title: "The part nobody quotes", skill: "look for the hedges", text: "A few lines later, the same paragraph allows that some sightings may be natural events such as meteors. The memo keeps ordinary explanations on the table." },
        { n: 6, title: "\"No physical evidence\"", skill: "notice what's missing", text: "Item h lists what to weigh: a secret American project, a foreign design, and the lack of any crash-recovered objects. Skeptics point to this when discussing Roswell. Believers reply that a memo at this level wouldn't mention a secret recovery." },
        { n: 7, title: "What happened next", skill: "follow the paper trail", text: "Twining asks for a formal study with a priority, a classification and a code name. The result was Project Sign in early 1948, the first official U.S. UFO investigation and the ancestor of Project Blue Book." },
        { n: 8, title: "Who signed it", skill: "weigh the author", text: "Nathan Twining went on to become Air Force Chief of Staff and then Chairman of the Joint Chiefs. This was a senior officer putting his name to a cautious, practical opinion." }
      ],
      says: ["People are seeing real objects, not imagining them.", "Some sightings may be natural, such as meteors.", "A secret U.S. project or a foreign design should be considered.", "There is no crash-recovered physical evidence.", "The Air Force should open a formal study."],
      claims: ["The military privately admitted saucers were alien craft.", "It proves a cover-up began in 1947.", "The \"no physical evidence\" line was a cover for Roswell."],
      why: "It shows the Air Force took the reports seriously from the start, mostly out of concern about Soviet technology. It started the paper trail that led to Projects Sign, Grudge and Blue Book.",
      find: {
        text: "The memo is reprinted as Appendix R of the 1969 Condon Report, \"Scientific Study of Unidentified Flying Objects.\"",
        steps: ["Open Appendix R of the Condon Report.", "Read paragraph 2 all the way through, items a to h.", "Compare it with this page: which lines get quoted, and which don't?"],
        url: "https://www.project1947.com/shg/condon/appndx-r.html",
        label: "Open Appendix R"
      },
      cases: ["twining-memo", "kenneth-arnold", "roswell", "estimate-of-situation", "project-blue-book"]
    }
  ],

  upcomingDocuments: [
    "The Roswell FBI Teletype (1947)",
    "The Robertson Panel Report (1953)",
    "A Project Blue Book case file",
    "The Halt Memo (1980)",
    "The ODNI Preliminary Assessment (2021)"
  ],


  /* ------------------------------------------------------------------
     PODCAST: show notes and merch for the Podcast page
     recordings = every archival clip used on the show (the "Sources"
     section of the Podcast page). Episode `tags` match recording topics.
     ------------------------------------------------------------------ */
  recordingTopics: ["Roswell", "Astronauts", "Air Force", "Navy", "Congress", "Culture"],
  recordings: [
    { name: "Gemini 7 Bogey", topic: "Astronauts", where: "NASA, via the War Department's PURSUE release 1 on DVIDS", credit: "Audio: NASA, released by the U.S. Department of War (PURSUE), via DVIDS", url: "https://www.dvidshub.net/", link: "DVIDS" },
    { name: "Mercury 9 Excerpt D010", topic: "Astronauts", where: "NASA, via PURSUE release 2", credit: "Audio: NASA, via DVIDS", extra: "Includes the discussion of “John’s fireflies.”", url: "https://www.dvidshub.net/", link: "DVIDS" },
    { name: "Mercury 9 Excerpt D011", topic: "Astronauts", where: "NASA, via PURSUE release 2", credit: "Audio: NASA, via DVIDS", url: "https://www.dvidshub.net/", link: "DVIDS" },
    { name: "NASA UAP Independent Study Debrief, 2023", topic: "Astronauts", where: "NASA", credit: "Audio: NASA", url: "https://science.nasa.gov/uap/", link: "NASA UAP" },
    { name: "Ruppelt Briefing, 1952", topic: "Air Force", where: "U.S. Air Force, via PURSUE release 6 on DVIDS", credit: "Audio: U.S. Air Force / All-domain Anomaly Resolution Office, via DVIDS", url: "https://www.dvidshub.net/", link: "DVIDS" },
    { name: "Gen. Samford on Flying Saucers", topic: "Air Force", where: "National Archives, Record Group 111", credit: "Courtesy U.S. National Archives, NAID 25738", url: "https://catalog.archives.gov/id/25738", link: "National Archives catalog" },
    { name: "USAF UFO Interview", topic: "Air Force", where: "National Archives, Record Group 342 (U.S. Air Force)", credit: "Courtesy U.S. National Archives, NAID 70511", url: "https://catalog.archives.gov/id/70511", link: "National Archives catalog" },
    { name: "UFO Sighting over Alaska", topic: "Air Force", where: "National Archives, Record Group 517 (Voice of America)", credit: "Voice of America, courtesy U.S. National Archives", url: "https://catalog.archives.gov/", link: "National Archives catalog" },
    { name: "Glenn Dennis Interview", topic: "Roswell", where: "National Archives, Roswell Reports files", credit: "Courtesy U.S. National Archives, NAID 2788762", url: "https://catalog.archives.gov/id/2788762", link: "National Archives catalog" },
    { name: "Roswell Reports Sound Recordings", topic: "Roswell", where: "National Archives, Record Group 341", credit: "Courtesy U.S. National Archives, NAID 566843", extra: "Interviews including Glenn Dennis, Col. David Fulgham, Lt. Col. Sheridan Cavitt, Bernard Gildenberg, MSgt. Ole Jorgenson and others, recorded for the Air Force's Roswell report.", url: "https://catalog.archives.gov/id/566843", link: "National Archives catalog" },
    { name: "GIMBAL and GOFAST Videos", topic: "Navy", where: "U.S. Navy FOIA Reading Room", credit: "U.S. Navy video, released by the Department of Defense, April 2020", url: "https://www.secnav.navy.mil/foia/", link: "Navy FOIA" },
    { name: "House Hearing: Graves, Fravor, Grusch", topic: "Congress", where: "House Oversight Committee", credit: "Audio: U.S. House Committee on Oversight and Accountability, July 26, 2023", url: "https://oversight.house.gov/", link: "House Oversight" },
    { name: "House Hearing: Gallaudet, Elizondo, Gold, Shellenberger", topic: "Congress", where: "House Oversight Committee", credit: "Audio: U.S. House Committee on Oversight and Accountability, Nov. 13, 2024", url: "https://oversight.house.gov/", link: "House Oversight" },
    { name: "House Hearing: Nuccetelli, Wiggins, Borland, Knapp", topic: "Congress", where: "House Oversight, Task Force on the Declassification of Federal Secrets", credit: "Audio: U.S. House Committee on Oversight and Government Reform, Sept. 9, 2025", url: "https://oversight.house.gov/", link: "House Oversight" },
    { name: "AARO Director Senate Hearing, April 19, 2023", topic: "Congress", where: "Department of Defense, via DVIDS", credit: "U.S. Department of Defense video, via DVIDS", url: "https://www.dvidshub.net/", link: "DVIDS" },
    { name: "Reagan Address to the UN General Assembly", topic: "Culture", where: "Ronald Reagan Presidential Library", credit: "Courtesy Ronald Reagan Presidential Library", url: "https://www.reaganlibrary.gov/", link: "Reagan Library" }
  ],

  merch: {
    shopUrl: "https://fsfspod.printful.me/",
    note: "Printed on demand by Printful",
    items: [
      { name: "Sticker", desc: "Our round saucer badge on a bubble-free vinyl sticker.", img: "merch/sticker.jpg" },
      { name: "Black Glossy Mug", desc: "The saucer badge on a glossy black ceramic mug.", img: "merch/mug.jpg" },
      { name: "Dad Hat", desc: "A black dad hat with the badge on the front.", img: "merch/hat.jpg" },
      { name: "Hoodie", desc: "A relaxed, mid-weight unisex hooded sweatshirt.", img: "merch/hoodie.jpg" },
      { name: "Eco Tote Bag", desc: "A black tote bag with the full badge.", img: "merch/tote.jpg" }
    ]
  },

  /* listenOn: add a url to a platform once the show is live there, e.g.
     { name: "Spotify", url: "https://open.spotify.com/show/..." }.
     Platforms without a url show under "Coming soon to". */
  listenOn: [
    { name: "Spotify", url: "https://open.spotify.com/show/57w75u62SqyfHz3Gy2oKlr" },
    { name: "Apple Podcasts", url: "https://podcasts.apple.com/us/podcast/flying-saucers-for-the-friendly-skeptic/id6824664958" },
    { name: "RSS", url: "https://anchor.fm/s/118c07c40/podcast/rss" },
    "YouTube"
  ],

  /* ------------------------------------------------------------------
     EPISODES: the Podcast page. `cases` and `links` form each episode's
     "Explore this episode" research list. Add `audio: "https://..."` and
     `length: "mm:ss"` when an episode is released to show its player.
     Add a block for each new episode. Set listenUrl once it's out.
     ------------------------------------------------------------------ */
  episodes: [
    {
      number: 1, title: "Summer of Saucers", tags: ["Air Force"],
      audio: "audio/fsfs-episode-01.mp3", length: "16:36",
      summary: "Kenneth Arnold's 1947 sighting gives us the flying saucer, with stops at the 1896 airships, WWII foo fighters and the 1952 Washington radar blips along the way.",
            cases: ["kenneth-arnold", "airship-wave-1896", "foo-fighters", "washington-1952"],
      links: [
        { title: "Project Blue Book records (National Archives)", url: "https://www.archives.gov/research/military/air-force/ufos" },
        { title: "Chronicling America: 1896–97 airship newspaper reports", url: "https://chroniclingamerica.loc.gov/search/pages/results/?andtext=airship&date1=1896&date2=1897&dateFilterType=yearRange" }
      ]
    },
    {
      number: 2, title: "What Fell in Roswell?", tags: ["Roswell"],
      audio: "audio/fsfs-episode-02.mp3", length: "20:27",
      summary: "Two weeks after Arnold, something comes down in the New Mexico desert. We sort the 1947 record from the story that grew around it.",
            cases: ["roswell", "roswell-reports"],
      links: [
        { title: "Roswell Reports sound recordings (National Archives, NAID 566843)", url: "https://catalog.archives.gov/id/566843" },
        { title: "FBI Vault: Roswell teletype", url: "https://vault.fbi.gov/Roswell%20UFO" },
        { title: "GAO report on Roswell records (1995)", url: "https://www.gao.gov/products/nsiad-95-187" }
      ]
    },
    {
      number: 3, title: "The Book Is Opened", tags: ["Air Force"],
      audio: "audio/fsfs-episode-03.mp3?v=2", length: "17:04",
      summary: "The Air Force starts keeping files on flying saucers, and Project Blue Book begins.",
            cases: ["twining-memo", "project-blue-book", "mantell", "chiles-whitted", "estimate-of-situation", "lubbock-lights", "washington-1952", "robertson-panel"],
      links: [
        { title: "Project Blue Book records (National Archives)", url: "https://www.archives.gov/research/military/air-force/ufos" },
        { title: "CIA: Robertson Panel report (1953)", url: "https://www.cia.gov/readingroom/document/cia-rdp78-02646r000600150001-5" }
      ]
    },
    {
      number: 4, title: "True Believers", tags: [],
      summary: "Contactees, saucer clubs and civilian investigators build a movement of their own.",
            cases: ["contactees", "civilian-investigators", "flatwoods", "kelly-hopkinsville", "robertson-panel", "aztec-hoax"],
      links: [
        { title: "George Adamski (Wikipedia overview)", url: "https://en.wikipedia.org/wiki/George_Adamski" },
        { title: "CIA: 'The National Investigations Committee on Aerial Phenomena (NICAP)'", url: "https://cia.gov/readingroom/document/cia-rdp81r00560r000100010001-0" }
      ]
    },
    {
      number: 5, title: "Case Closed", tags: ["Air Force"],
      summary: "The Condon Report and the end of Project Blue Book in 1969.",
            cases: ["michigan-1966", "hearing-1966", "condon-committee", "symposium-1968", "blue-book-closes", "mcminnville", "rb-47"],
      links: [
        { title: "1966 House Armed Services UFO hearing (GovInfo)", url: "https://www.govinfo.gov/app/details/CHRG-89hhrg50066O" },
        { title: "1968 House UFO symposium (GovInfo)", url: "https://www.govinfo.gov/content/pkg/CHRG-90hhrg97818/pdf/CHRG-90hhrg97818.pdf" },
        { title: "Condon Report: Conclusions and Recommendations", url: "https://www.project1947.com/shg/condon/sec-i.html" }
      ]
    },
    {
      number: 6, title: "Close Encounters", tags: [],
      summary: "Landings, abductions and the scientist who gave us a scale for them.",
            cases: ["socorro", "betty-barney-hill", "levelland", "kelly-hopkinsville", "pascagoula", "travis-walton", "trans-en-provence"],
      links: [
        { title: "Project Blue Book: Socorro, 1964 (via The Black Vault)", url: "https://www.theblackvault.com/casefiles/desks-project-blue-book-socorro-new-mexico-ufo-landing-24-april-1964/" },
        { title: "GEIPAN case archive (France)", url: "https://www.cnes-geipan.fr" }
      ]
    },
    {
      number: 7, title: "Revival", tags: ["Roswell"],
      summary: "Decades later, Roswell comes back, and the Air Force goes back to interview the witnesses.",
            cases: ["roswell", "roswell-reports", "mj-12", "alien-autopsy", "aaro-hrr"],
      links: [
        { title: "Roswell Reports sound recordings (National Archives, NAID 566843)", url: "https://catalog.archives.gov/id/566843" },
        { title: "GAO report on Roswell records (1995)", url: "https://www.gao.gov/products/nsiad-95-187" },
        { title: "FBI Vault: Majestic 12", url: "https://vault.fbi.gov/Majestic%2012" }
      ]
    },
    {
      number: 8, title: "The Truth Is Out There", tags: [],
      summary: "UFOs move into prime time and popular culture.",
            cases: ["bob-lazar", "travis-walton", "gulf-breeze", "alien-autopsy", "phoenix-lights", "cia-haines", "disclosure-project"],
      links: [
        { title: "CIA's Role in the Study of UFOs, 1947–90 (Haines)", url: "https://www.cia.gov/resources/csi/studies-in-intelligence/archives/vol-40-no-5/the-cias-role-in-the-study-of-ufos-1947-90/" }
      ]
    },
    {
      number: 9, title: "Confirmation", tags: ["Navy"],
      summary: "Navy cockpit videos, a secret Pentagon program and the 2017 story that changed the conversation.",
            cases: ["nimitz", "aatip", "gimbal-gofast", "nyt-2017", "pyramids-2019", "navy-release-2020", "odni-2021"],
      links: [
        { title: "Navy FOIA reading room: UAP videos", url: "https://www.navair.navy.mil/foia/documents" },
        { title: "ODNI Preliminary Assessment (2021)", url: "https://www.dni.gov/files/ODNI/documents/assessments/Prelimary-Assessment-UAP-20210625.pdf" }
      ]
    },
    {
      number: 10, title: "Full Disclosure", tags: ["Congress"],
      summary: "Congress holds hearings and witnesses testify under oath. What we know now, and what's still claim.",
            cases: ["hearing-2022", "aaro-founded", "grusch-2023", "disclosure-act", "aaro-hrr", "hearing-2024", "hearing-2025", "aaro-reports", "pursue-2026"],
      links: [
        { title: "House Oversight hearings: 2023, 2024 and 2025", url: "https://oversight.house.gov/hearing/restoring-public-trust-through-uap-transparency-and-whistleblower-protection/" },
        { title: "AARO official site", url: "https://www.aaro.mil" },
        { title: "PURSUE: Department of War UAP file releases", url: "https://www.war.gov/UFO/" }
      ]
    }
  ]
};
