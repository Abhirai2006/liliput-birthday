export type Shot = {
  src: string;
  kind: "photo" | "video";
  poster?: string;
  caption: string;
  /** portrait | landscape — used to pick the frame, never to squash the image */
  orient: "p" | "l";
};

export const idCard: Shot = {
  src: "/media/school-ids.jpg",
  kind: "photo",
  caption: "10th. PU. Engineering. The same eyes in all three.",
  orient: "l",
};

export const chapters: { title: string; note: string; shots: Shot[] }[] = [
  {
    title: "Everyday Subbi",
    note: "No occasion. No reason. Just her, on an ordinary evening, being the reason the day was good.",
    shots: [
      { src: "/media/her-03.jpg", kind: "photo", caption: "That half-smile she does when she's pretending she isn't posing.", orient: "p" },
      { src: "/media/her-05.jpg", kind: "photo", caption: "Sunkissed, and very aware of it.", orient: "p" },
      { src: "/media/v-look.mp4", poster: "/media/v-look.jpg", kind: "video", caption: "Six seconds of nothing happening. Watched more times than I'll admit.", orient: "p" },
      { src: "/media/her-04.jpg", kind: "photo", caption: "Hearts in the hair. Somebody's in a good mood.", orient: "p" },
      { src: "/media/her-12.jpg", kind: "photo", caption: "Mid-sentence, mid-story, mid-complaint. Peak Subbi.", orient: "p" },
      { src: "/media/her-14.jpg", kind: "photo", caption: "Phone up, world ignored.", orient: "p" },
      { src: "/media/v-soft.mp4", poster: "/media/v-soft.jpg", kind: "video", caption: "Akka full kush mood.", orient: "p" },
      { src: "/media/her-15.jpg", kind: "photo", caption: "This one is my favourite and she'll never know why.", orient: "p" },
      { src: "/media/her-09.jpg", kind: "photo", caption: "Face pack (multani mitti) on, dignity off. Still laughing.", orient: "p" },
      { src: "/media/her-11.jpg", kind: "photo", caption: "Caught doing something completely useless. Delighted about it.", orient: "p" },
      { src: "/media/her-16.jpg", kind: "photo", caption: "\"Combed without comb.\" Her words, not mine.", orient: "p" },
      { src: "/media/her-01.jpg", kind: "photo", caption: "Uffff. That was the whole caption. That was enough.", orient: "p" },
      { src: "/media/n-chat.jpg", kind: "photo", caption: "Zudio mirror, phone already up, nowhere to be.", orient: "p" },
      { src: "/media/her-13.jpg", kind: "photo", caption: "Old pictures, older versions of her. Same face.", orient: "p" },
    ],

  },
  {
    title: "Getting ready",
    note: "Nobody puts this much thought into an outfit for a normal Tuesday. She does. Every time.",
    shots: [
      { src: "/media/dress-01.jpg", kind: "photo", caption: "Mirror check number four hundred.", orient: "p" },
      { src: "/media/dress-02.jpg", kind: "photo", caption: "Green suits her. She knows. That's why the pose.", orient: "p" },
      { src: "/media/dress-03.jpg", kind: "photo", caption: "White dress, small shoes, big attitude — all five feet of it.", orient: "p" },
      { src: "/media/v-mirror.mp4", poster: "/media/v-mirror.jpg", kind: "video", caption: "The final check before leaving for a walk with her baddies. There is always a final check.", orient: "p" },
      { src: "/media/her-02.jpg", kind: "photo", caption: "\"This one?\" Yes. That one.", orient: "p" },
      { src: "/media/her-10.jpg", kind: "photo", caption: "On a call, dressed up anyway.", orient: "p" },
    ],
  },
  {
    title: "Out and about",
    note: "Give her a mall, a bus, and a whole day. She'll come back with three bags and one story you'll hear four times.",
    shots: [
      { src: "/media/shopping-1.jpg", kind: "photo", caption: "Garuda Mall, Mysuru. Reporting live from her natural habitat.", orient: "p" },
      { src: "/media/v-ride.mp4", poster: "/media/v-ride.jpg", kind: "video", caption: "\"Thanks for the dream ridee.\" Pink kurta, open road thankyou kruthi.", orient: "l" },
      { src: "/media/her-07.jpg", kind: "photo", caption: "Sitting on a ledge somewhere, thinking about something.", orient: "p" },
      { src: "/media/her-08.jpg", kind: "photo", caption: "College ID still on. Day one energy.", orient: "p" },
      { src: "/media/n-mall.jpg", kind: "photo", caption: "Shop mirror with Anu. Nothing was bought. Nothing ever is.", orient: "p" },
      { src: "/media/her-06.jpg", kind: "photo", caption: "Filters, hearts, whatever. Still the same girl underneath.", orient: "p" },
      { src: "/media/g-sitting.jpg", kind: "photo", caption: "Sitting on a ledge, phone in hand, waiting for someone to be ready.", orient: "p" },
      { src: "/media/g-hills.jpg", kind: "photo", caption: "Yellow bushes, hills behind her, hair everywhere.", orient: "l" },
    ],
  },
];

/** Shown beside her own recordings — small, deliberate, three frames only. */
export const singShots: Shot[] = [
  { src: "/media/sing-01.jpg", kind: "photo", caption: "Sunset, hand up, singing to nobody.", orient: "p" },
  { src: "/media/sing-02.jpg", kind: "photo", caption: "Eyes shut, humming something she'd deny later.", orient: "p" },
  { src: "/media/v-happy.mp4", poster: "/media/v-happy.jpg", kind: "video", caption: "\"Happy vibes\" — her caption. Rare and worth keeping.", orient: "p" },
];


export const daaShots: Shot[] = [
  { src: "/media/daa-1.jpg", kind: "photo", caption: "Her on the phone. Daa waiting. Standard arrangement.", orient: "l" },
  { src: "/media/daa-2.jpg", kind: "photo", caption: "Chiranth — but nobody calls him that. Daa.", orient: "l" },
  { src: "/media/daa-3.jpg", kind: "photo", caption: "Something was said. This was the reaction.", orient: "l" },
  { src: "/media/daa-4.jpg", kind: "photo", caption: "Both of them done with each other. Both of them staying.", orient: "l" },
];

export const usShot: Shot = {
  src: "/media/us.jpg",
  kind: "photo",
  caption: "The one photo of the two of us I refuse to delete.",
  orient: "p",
};

/* ── second batch: 95 files from the "New" folder, gone through one by one ── */

export type Song = { src: string; title: string; len: string };

/** Her own voice. WhatsApp voice notes and screen-recorded singing. */
export const songs: Song[] = [
  { src: "/media/na-4.mp3", title: "The long one — Kannada songs, back to back", len: "3:54" },
  { src: "/media/na-9.mp3", title: "Late night, no audience", len: "1:03" },
  { src: "/media/na-3.mp3", title: "One take, no warm-up", len: "1:00" },
  { src: "/media/na-6.mp3", title: "Half a song, all the feeling", len: "0:50" },
  { src: "/media/na-10.mp3", title: "Sad-song hour", len: "0:44" },
  { src: "/media/na-5.mp3", title: "Recorded and sent before she could change her mind", len: "0:37" },
  { src: "/media/na-7.mp3", title: "Twenty-one seconds. Enough.", len: "0:21" },
  { src: "/media/na-8.mp3", title: "This is the one I replay", len: "0:20" },
];

export const childhoodShots: Shot[] = [
  { src: "/media/n-kid-c.jpg", kind: "photo", caption: "Ainapur, a very long time ago. Same eyes, smaller everything. She on the lap of an MLA", orient: "p" },
  { src: "/media/n-kid-a.jpg", kind: "photo", caption: "Two plaits, one dress, zero doubts.", orient: "l" },
  { src: "/media/n-with-appa.jpg", kind: "photo", caption: "Held steady by her Appa. She was tiny even then.", orient: "p" },
  { src: "/media/n-kid-b.jpg", kind: "photo", caption: "The face she still makes at cameras, twenty years later.", orient: "p" },
  { src: "/media/b25-kid-studio.jpg", kind: "photo", caption: "Studio backdrop, white and red pattu, two tiny plaits. Somebody sat her down and told her not to move.", orient: "p" },
];


export const sareeShots: Shot[] = [
  { src: "/media/n-saree-b.jpg", kind: "photo", caption: "Red saree, green trees, and she knows exactly how good this looks.", orient: "p" },
  { src: "/media/n-saree-a.jpg", kind: "photo", caption: "One hand on the pleats the entire day.", orient: "p" },
  { src: "/media/n-saree-c.jpg", kind: "photo", caption: "Five feet of North Karnataka.", orient: "p" },
  { src: "/media/n-saree-d.jpg", kind: "photo", caption: "Traditional day. Her Olympics.", orient: "p" },
  { src: "/media/n-trad-group.jpg", kind: "photo", caption: "The whole gang in silk.", orient: "l" },
  { src: "/media/n-saree-two.jpg", kind: "photo", caption: "Her mother in a saree, her beside her. Same smile, older version.", orient: "l" },
  { src: "/media/g-red-saree-trees.jpg", kind: "photo", caption: "Red saree under green trees. Best combination she owns.", orient: "p" },
  { src: "/media/g-green-saree.jpg", kind: "photo", caption: "Green and blue, night lights behind her, five feet of attitude.", orient: "p" },
];

export const mistyShots: Shot[] = [
  { src: "/media/n-dog-a.jpg", kind: "photo", caption: "Misty — Daa's dog, but you would never guess it from her.", orient: "p" },
  { src: "/media/n-dog-b.jpg", kind: "photo", caption: "Chiranth owns him. She just borrowed him permanently.", orient: "p" },
  { src: "/media/n-dog-c.jpg", kind: "photo", caption: "This is what she sends instead of replying.", orient: "l" },
];

export const callShots: Shot[] = [
  { src: "/media/n-call-a.jpg", kind: "photo", caption: "Screenshotted mid-sentence. She'll kill me for this one.", orient: "p" },
  { src: "/media/n-call-c.jpg", kind: "photo", caption: "Eating on call, talking on call, complaining on call.", orient: "p" },
  { src: "/media/n-call-b.jpg", kind: "photo", caption: "Hair everywhere. Camera on anyway.", orient: "p" },
  
];

export const newChapters: { title: string; note: string; shots: Shot[] }[] = [
  {
    title: "Her year, in selfies",
    note: "Ninety-five files landed in one day. I went through every single one. These are the ones that made me stop scrolling.",
    shots: [
      { src: "/media/n-profile.jpg", kind: "photo", caption: "Side light, chin up. She didn't plan this and it still came out like a poster.", orient: "l" },
      { src: "/media/n-wings.jpg", kind: "photo", caption: "Wings on the wall. Fitting.", orient: "p" },
      { src: "/media/n-mauve-a.jpg", kind: "photo", caption: "The mauve sweater era.", orient: "p" },
      { src: "/media/nv-change.mp4", poster: "/media/nv-change.jpg", kind: "video", caption: "\"Where life need a change ✨\" — her caption, her spelling, her mood.", orient: "p" },
      { src: "/media/n-mauve-b.jpg", kind: "photo", caption: "Yellow wall, no reason.", orient: "p" },
        { src: "/media/n-hair.jpg", kind: "photo", caption: "The time she is getting her hair a fancy look", orient: "p" },
      { src: "/media/n-clouds.jpg", kind: "photo", caption: "Storm coming, arm out, absolutely thrilled.", orient: "l" },
        { src: "/media/nv-cup.mp4", poster: "/media/nv-cup.jpg", kind: "video", caption: "Paper cup, big talk. 🤣", orient: "p" },
      { src: "/media/n-lake.jpg", kind: "photo", caption: "By the lake, pretending to look away.", orient: "l" },
      { src: "/media/n-white-a.jpg", kind: "photo", caption: "White top, soft light, dangerous smile.", orient: "p" },
      { src: "/media/n-white-b.jpg", kind: "photo", caption: "Same evening. Ten more just like it.", orient: "p" },
      { src: "/media/nv-white.mp4", poster: "/media/nv-white.jpg", kind: "video", caption: "Four seconds of her being completely herself.", orient: "p" },
      { src: "/media/n-pink-a.jpg", kind: "photo", caption: "Peach top, sleepy eyes.", orient: "p" },
    ],
  },
  {
    title: "Same year, still posing",
    note: "The other half of that pile. Different wall, different top, exact same head tilt.",
    shots: [
        { src: "/media/n-pink-b.jpg", kind: "photo", caption: "Hiding behind her own hand so that no one can figure out she was crying moments ago. 🤧", orient: "p" },
        { src: "/media/n-pink-c.jpg", kind: "photo", caption: "Thank you Kruthi for these pics and making her calm", orient: "p" },
      { src: "/media/n-arch.jpg", kind: "photo", caption: "Old building, new outfit.", orient: "p" },
      { src: "/media/n-jump.jpg", kind: "photo", caption: "Airborne, for no recorded reason.", orient: "p" },
      { src: "/media/n-yellow-a.jpg", kind: "photo", caption: "Yellow tee, watch on, mid-story.", orient: "p" },
        { src: "/media/n-yellow-b.jpg", kind: "photo", caption: "Still that story. It was a long one. when she was Dummy !!", orient: "p" },
        { src: "/media/n-bw.jpg", kind: "photo", caption: "Black and white, because someone told her it suits her. It does. that too full devotional person that day. 🙏🙏", orient: "p" },
      { src: "/media/n-hair-face.jpg", kind: "photo", caption: "Woke up, took a photo, sent it, went back to sleep.", orient: "p" },
      { src: "/media/n-tilt.jpg", kind: "photo", caption: "Head tilt. Ninety percent of her camera roll.", orient: "p" },
      { src: "/media/n-mauve-c.jpg", kind: "photo", caption: "The look that means she's about to ask for something.", orient: "p" },
      { src: "/media/nv-talk.mp4", poster: "/media/nv-talk.jpg", kind: "video", caption: "Talking to the camera like it's me on the other side.", orient: "p" },
      { src: "/media/n-selfie-s.jpg", kind: "photo", caption: "Curls done, evening free.", orient: "p" },
        { src: "/media/n-sketch.jpg", kind: "photo", caption: "Shrinikethan drew her(side  note: he drawing for the very first time). \"Really means a lot,\" she said. Twice.", orient: "l" },
    ],
  },
  {
    title: "Dressed up, going out",
    note: "Night streets, garden lights, one scooter. She never leaves the house at less than a hundred percent.",
    shots: [
      { src: "/media/n-street.jpg", kind: "photo", caption: "Night street, dark saree, streetlights doing her a favour.", orient: "p" },
      { src: "/media/n-night-kurta.jpg", kind: "photo", caption: "Blue kurta, garden lights, full main-character energy.", orient: "p" },
      { src: "/media/nv-scooter.mp4", poster: "/media/nv-scooter.jpg", kind: "video", caption: "Scooter, sunshine, and someone else doing the driving.", orient: "p" },
        { src: "/media/n-black-top.jpg", kind: "photo", caption: "She as always looking good.", orient: "p" },
      { src: "/media/n-red-stairs.jpg", kind: "photo", caption: "Red kurti on a staircase. The mask didn't stop her.", orient: "p" },
        { src: "/media/g-sr-party.jpg", kind: "photo", caption: "High park !! papa she had cried that day sorry", orient: "p" },
      { src: "/media/n-festival.jpg", kind: "photo", caption: "Festival colours and a stolen pair of sunglasses.", orient: "p" },
      { src: "/media/nv-mirror.mp4", poster: "/media/nv-mirror.jpg", kind: "video", caption: "Room, mirror, phone, dance. In that order.", orient: "p" },
      { src: "/media/g-blue-kurti.jpg", kind: "photo", caption: "Blue kurti, hand at her ear, sky doing the rest.", orient: "l" },
    ],
  },
  {
    title: "The ones who get her",
    note: "Anushree, Kruthika, Vaishu, Shree — the names on her Snapchat and in every good story she tells.",
    shots: [
      { src: "/media/nv-thumbs.mp4", poster: "/media/nv-thumbs.jpg", kind: "video", caption: "Two thumbs up. Nothing was actually going well.", orient: "p" },
      { src: "/media/n-twins.jpg", kind: "photo", caption: "Matching filters. Matching nonsense.", orient: "p" },
      { src: "/media/nv-outdoor.mp4", poster: "/media/nv-outdoor.jpg", kind: "video", caption: "Dog filters outdoors. Dignity left indoors.", orient: "p" },
        { src: "/media/n-three.jpg", kind: "photo", caption: "Three of them, squeezing between NCC officers worth of confidence.", orient: "l" },
      { src: "/media/nv-pink-two.mp4", poster: "/media/nv-pink-two.jpg", kind: "video", caption: "Pink kurtas and a joke I was never told.", orient: "p" },
      { src: "/media/n-girls.jpg", kind: "photo", caption: "The whole set of them, dressed for something.", orient: "l" },
        { src: "/media/friends-1.jpg", kind: "photo", caption: "Three faces, her caption: \"sunny day.\"", orient: "p" },
      { src: "/media/family-1.jpg", kind: "photo", caption: "Back seat of a bus, cheeks being squeezed, no complaints filed.", orient: "p" },
      { src: "/media/v-friend.mp4", poster: "/media/v-friend.jpg", kind: "video", caption: "Twenty-two seconds of absolute nonsense.", orient: "l" },
      { src: "/media/g-school-group.jpg", kind: "photo", caption: "The whole crowd of them, lined up outside the gate.", orient: "l" },
      { src: "/media/n-mirror-two.jpg", kind: "photo", caption: "Two of them in one mirror, one phone between them.", orient: "p" },
    ],
  },
  {
    title: "Filters on, volume up",
    note: "The clips nobody was supposed to keep. I kept all of them.",
    shots: [
      { src: "/media/nv-two-lying.mp4", poster: "/media/nv-two-lying.jpg", kind: "video", caption: "Lying sideways, talking rubbish, perfectly happy.", orient: "p" },
      { src: "/media/nv-three.mp4", poster: "/media/nv-three.jpg", kind: "video", caption: "Three-way call, filters on, volume up.", orient: "p" },
      { src: "/media/nv-filters.mp4", poster: "/media/nv-filters.jpg", kind: "video", caption: "Whatever this filter is, they committed to it.", orient: "p" },
      { src: "/media/n-family.jpg", kind: "photo", caption: "One filter, four frames, two of them refusing to sit still.", orient: "p" },
      { src: "/media/n-bday-collage.jpg", kind: "photo", caption: "Somebody's birthday collage for her. She kept it. Of course she did.", orient: "p" },
      { src: "/media/nv-mug.mp4", poster: "/media/nv-mug.jpg", kind: "video", caption: "Cow-print mug, cow-print filter. Commitment.", orient: "p" },
      { src: "/media/nv-lying.mp4", poster: "/media/nv-lying.jpg", kind: "video", caption: "Half asleep, still recording.", orient: "p" },
      { src: "/media/gv-thumbs2.mp4", poster: "/media/gv-thumbs2.jpg", kind: "video", caption: "Two thumbs up on the 31st. Nothing to celebrate.", orient: "p" },
  { src: "/media/gv-dogfilter.mp4", poster: "/media/gv-dogfilter.jpg", kind: "video", caption: "Dog filters, outdoors, no shame at all. ", orient: "p" },
    ],
  },
];


/* ── third batch: the 03/08 folder, plus the five photos he named himself ── */

/** The two of us, and the people from school. He named these one by one. */
export const usShots: Shot[] = [
  { src: "/media/g-us-campus.jpg", kind: "photo", caption: "Her in a saree, me pretending I wasn't nervous about the photo.", orient: "l" },
  { src: "/media/g-us-rooftop.jpg", kind: "photo", caption: "Thankyou Preetham for the party", orient: "p" },
];

export const schoolShots: Shot[] = [
  { src: "/media/g-physics-teacher.jpg", kind: "photo", caption: "Her favourite physics teacher. The only subject she never complained about.", orient: "p" },
  { src: "/media/g-school-uniform.jpg", kind: "photo", caption: "Uniform, ID card, hands folded. Fully in character.", orient: "p" },
  { src: "/media/g-school-two.jpg", kind: "photo", caption: "Two of them at the same desk, glasses on, up to something.", orient: "l" },
];


export const kidPrints: Shot[] = [
  { src: "/media/g-kid-frame.jpg", kind: "photo", caption: "An actual printed photo, kept in an actual frame. Ainapur.", orient: "l" },
  { src: "/media/g-kid-two.jpg", kind: "photo", caption: "Two small kids, one very serious expression.", orient: "p" },
  { src: "/media/g-kid-bed.jpg", kind: "photo", caption: "Before phones, before filters, before everything.", orient: "l" },
  { src: "/media/g-kid-waterfall.jpg", kind: "photo", caption: "Sujatha akka still kept this album  ", orient: "l" },
  { src: "/media/g-kid-temple.jpg", kind: "photo", caption: "Temple steps, tiny sandals, hand held tight by her brother mankiya.", orient: "p" },
  { src: "/media/b25-baby-print.jpg", kind: "photo", caption: "Kajal, one black dot on the cheek, red frock. Still in the plastic sleeve after twenty years.", orient: "l" },
  { src: "/media/b25-two-prints.jpg", kind: "photo", caption: "A studio waterfall and her name printed across the bottom — AISHWARYYA, two Y's and all.", orient: "l" },
];

/** Her 21st — sash, sparklers, one cake, September 2025. */
export const lastBirthdayShots: Shot[] = [
  { src: "/media/b25-cake-sash.jpg", kind: "photo", caption: "The sash, the thumbs up, the cake held like a trophy.", orient: "p" },
  { src: "/media/b25-cake-candle.jpg", kind: "photo", caption: "Candles lit, wish loading.", orient: "p" },
  { src: "/media/b25-clip.mp4", poster: "/media/b25-clip.jpg", kind: "video", caption: "Four seconds before the candles went out.", orient: "p" },
  { src: "/media/b25-sparkler.jpg", kind: "photo", caption: "One sparkler in one hand, cake in the other. Fully in charge of the evening.", orient: "p" },
  { src: "/media/b25-two-sparklers.jpg", kind: "photo", caption: "Two sparklers going at once, because one was never going to be enough.", orient: "p" },
];

/** Straight off her story — the ones that showed up on my phone and stayed. */
export const storyShots: Shot[] = [
  { src: "/media/b25-with-tarun.jpg", kind: "photo", caption: "Haldi on both foreheads, heads together, camera up. Ganiger family business.", orient: "p" },
  { src: "/media/b25-pink-kurta.jpg", kind: "photo", caption: "Pink kurta, kumkum, home behind her. Posted at 2:54 in the afternoon for no reason at all.", orient: "p" },
  { src: "/media/b25-tired-smile.jpg", kind: "photo", caption: "Chin on her hand, When she was fully sad", orient: "p" },
];


/** The wall — pinned polaroids, straight out of the reel he sent me. */
export const wallShots: Shot[] = [
  { src: "/media/g-chin.jpg", kind: "photo", caption: "Chin on hand, thinking about something she won't tell me.", orient: "p" },
  { src: "/media/g-sunset-look.jpg", kind: "photo", caption: "Peach top against a sunset sky. She turned at exactly the right second.", orient: "l" },
  { src: "/media/g-pink-gown.jpg", kind: "photo", caption: "Pink, floor-length, entirely unnecessary. Loved it anyway.", orient: "p" },
  { src: "/media/g-lamps.jpg", kind: "photo", caption: "Lamp posts by the exhibition and a whole evening free.", orient: "p" },
  { src: "/media/n-dogfilter.jpg", kind: "photo", caption: "Dog ears, no shame, sent at 2am.", orient: "p" },
  { src: "/media/g-rcb.jpg", kind: "photo", caption: "RCB jersey, number 18. Same number as her birthday.", orient: "p" },
];

export const augChapters: { title: string; note: string; shots: Shot[] }[] = [
  {
    title: "She being herself",
    note: "Nothing to write here. ",
    shots: [
      { src: "/media/g-lying-a.jpg", kind: "photo", caption: "Orange wall, printed top, no audience.", orient: "l" },
      { src: "/media/g-lying-b.jpg", kind: "photo", caption: "Same wall, same afternoon, twelve more photos.", orient: "l" },
      { src: "/media/g-blue-collar.jpg", kind: "photo", caption: "Blue collar tee and the doorway she always stood in. don't tell anyone it was Kruthi T-shirt", orient: "l" },
      { src: "/media/g-lying-c.jpg", kind: "photo", caption: "Black tee, big hair, curls doing whatever they wanted.", orient: "l" },
      { src: "/media/g-close.jpg", kind: "photo", caption: "Too close to the camera. Still came out well.", orient: "l" },
      { src: "/media/g-squint.jpg", kind: "photo", caption: "Lying down, hair across her face, phone light on.", orient: "l" },
      { src: "/media/g-dark-soft.jpg", kind: "photo", caption: "Hand on cheek, one flash on, everyone asleep.", orient: "p" },
      { src: "/media/g-white-dress.jpg", kind: "photo", caption: "White dress on our college day. Accidentally magazine-worthy.", orient: "p" },
      { src: "/media/g-framed.jpg", kind: "photo", caption: "Somebody's function, completely done with waiting. Thankyou Camera man and aslo gemini bhai", orient: "p" },
    ],
  },
  {
    title: "This year, everywhere",
    note: "Streetlights, dinner tables, one bowling alley, a hillside, and a group that never keeps its volume down.",
    shots: [
      { src: "/media/g-street-black.jpg", kind: "photo", caption: "Night street, black kurta, absolutely posing.", orient: "p" },
      { src: "/media/g-street-turn.jpg", kind: "photo", caption: "\"One more, one more.\" There were nine more.", orient: "p" },
      { src: "/media/gv-bowling.mp4", poster: "/media/gv-bowling.jpg", kind: "video", caption: "Bowling. Arms up before the ball even landed.", orient: "l" },
      { src: "/media/g-portrait-night.jpg", kind: "photo", caption: "Portrait mode did all the work. So did she.", orient: "l" },
      { src: "/media/g-saree-night.jpg", kind: "photo", caption: "Dark saree on an empty street, function nearly over.", orient: "l" },
      { src: "/media/g-group-night.jpg", kind: "photo", caption: "The whole crowd of them lined up on the rooftop.", orient: "l" },
      { src: "/media/g-mirror-stripe.jpg", kind: "photo", caption: "Striped top, mirror, phone. The holy trinity.", orient: "p" },
      { src: "/media/g-mirror-phone.jpg", kind: "photo", caption: "Hostel mirror, camera app still open, room an absolute disaster.", orient: "p" },
      { src: "/media/n-temple.jpg", kind: "photo", caption: "Belagavi stone and a bell taller than her.", orient: "l" },
      { src: "/media/g-point.jpg", kind: "photo", caption: "Pointing at something off-camera. Never told me what.", orient: "p" },
      { src: "/media/g-silhouette.jpg", kind: "photo", caption: "Outline against the last bit of daylight.", orient: "l" },

    ],
  },
];
