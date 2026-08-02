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
      { src: "/media/her-14.jpg", kind: "photo", caption: "Lying down, phone up, world ignored.", orient: "p" },
      { src: "/media/v-soft.mp4", poster: "/media/v-soft.jpg", kind: "video", caption: "Earphones in. Do not disturb.", orient: "p" },
      { src: "/media/her-15.jpg", kind: "photo", caption: "This one is my favourite and she'll never know why.", orient: "p" },
      { src: "/media/her-09.jpg", kind: "photo", caption: "Face pack on, dignity off. Still laughing.", orient: "p" },
      { src: "/media/her-11.jpg", kind: "photo", caption: "Caught doing something completely useless. Delighted about it.", orient: "p" },
      { src: "/media/her-16.jpg", kind: "photo", caption: "\"Combed without comb.\" Her words, not mine.", orient: "p" },
      { src: "/media/her-01.jpg", kind: "photo", caption: "Uffff. That was the whole caption. That was enough.", orient: "p" },
    ],
  },
  {
    title: "Getting ready",
    note: "Nobody puts this much thought into an outfit for a normal Tuesday. She does. Every time.",
    shots: [
      { src: "/media/dress-01.jpg", kind: "photo", caption: "Mirror check number four hundred.", orient: "p" },
      { src: "/media/dress-02.jpg", kind: "photo", caption: "Green suits her. She knows. That's why the pose.", orient: "p" },
      { src: "/media/dress-03.jpg", kind: "photo", caption: "White dress, small shoes, big attitude — all five feet of it.", orient: "p" },
      { src: "/media/v-mirror.mp4", poster: "/media/v-mirror.jpg", kind: "video", caption: "The final check before leaving. There is always a final check.", orient: "p" },
      { src: "/media/her-02.jpg", kind: "photo", caption: "\"This one?\" Yes. That one.", orient: "p" },
      { src: "/media/her-10.jpg", kind: "photo", caption: "On a call, dressed up anyway.", orient: "p" },
    ],
  },
  {
    title: "The one who sings",
    note: "Half the time she doesn't know she's doing it. A line of some sad song, under her breath, in the middle of a sentence.",
    shots: [
      { src: "/media/sing-01.jpg", kind: "photo", caption: "Sunset, hand up, singing to nobody.", orient: "p" },
      { src: "/media/sing-02.jpg", kind: "photo", caption: "Lofi in the ears, everything else on mute.", orient: "p" },
      { src: "/media/v-happy.mp4", poster: "/media/v-happy.jpg", kind: "video", caption: "\"Happy vibes\" — her caption. Rare and worth keeping.", orient: "p" },
    ],
  },
  {
    title: "Out and about",
    note: "Give her a mall, a bus, and a whole day. She'll come back with three bags and one story you'll hear four times.",
    shots: [
      { src: "/media/shopping-1.jpg", kind: "photo", caption: "Garuda Mall. Reporting live from her natural habitat.", orient: "p" },
      { src: "/media/v-ride.mp4", poster: "/media/v-ride.jpg", kind: "video", caption: "\"Thanks for the dream ridee.\" Pink kurta, open road.", orient: "l" },
      { src: "/media/her-07.jpg", kind: "photo", caption: "Sitting on a ledge somewhere, thinking about something.", orient: "p" },
      { src: "/media/her-08.jpg", kind: "photo", caption: "College ID still on. Day one energy.", orient: "p" },
      { src: "/media/her-13.jpg", kind: "photo", caption: "Old pictures, older versions of her. Same face.", orient: "p" },
      { src: "/media/her-06.jpg", kind: "photo", caption: "Filters, hearts, whatever. Still the same girl underneath.", orient: "p" },
    ],
  },
  {
    title: "Her people",
    note: "She collects people the way other people collect songs.",
    shots: [
      { src: "/media/friends-1.jpg", kind: "photo", caption: "Sunny day, three of them, one camera.", orient: "p" },
      { src: "/media/family-1.jpg", kind: "photo", caption: "Home. Where the laughing is loudest.", orient: "p" },
      { src: "/media/v-friend.mp4", poster: "/media/v-friend.jpg", kind: "video", caption: "Twenty-two seconds of absolute nonsense.", orient: "l" },
    ],
  },
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

/** Her own voice. Ten recordings — WhatsApp voice notes and screen-recorded singing. */
export const songs: Song[] = [
  { src: "/media/na-4.mp3", title: "The long one — Kannada songs, back to back", len: "3:54" },
  { src: "/media/na-9.mp3", title: "Late night, no audience", len: "1:03" },
  { src: "/media/na-3.mp3", title: "One take, no warm-up", len: "1:00" },
  { src: "/media/na-6.mp3", title: "Half a song, all the feeling", len: "0:50" },
  { src: "/media/na-10.mp3", title: "Sad-song hour", len: "0:44" },
  { src: "/media/na-5.mp3", title: "Recorded and sent before she could change her mind", len: "0:37" },
  { src: "/media/na-1.mp3", title: "The first one she ever sent me", len: "0:36" },
  { src: "/media/na-7.mp3", title: "Twenty-one seconds. Enough.", len: "0:21" },
  { src: "/media/na-8.mp3", title: "This is the one I replay", len: "0:20" },
  { src: "/media/na-2.mp3", title: "\"Ippe saaku\" — that's all you're getting", len: "0:19" },
];

export const childhoodShots: Shot[] = [
  { src: "/media/n-kid-c.jpg", kind: "photo", caption: "Ainapur, a very long time ago. Same eyes, smaller everything.", orient: "p" },
  { src: "/media/n-kid-a.jpg", kind: "photo", caption: "Two plaits, one dress, zero doubts.", orient: "l" },
  { src: "/media/n-with-appa.jpg", kind: "photo", caption: "Standing exactly where she was told to stand. Rare.", orient: "p" },
  { src: "/media/n-kid-b.jpg", kind: "photo", caption: "The face she still makes at cameras, twenty years later.", orient: "p" },
];

export const sareeShots: Shot[] = [
  { src: "/media/n-saree-b.jpg", kind: "photo", caption: "Red saree, green trees, and she knows exactly how good this looks.", orient: "p" },
  { src: "/media/n-saree-a.jpg", kind: "photo", caption: "One hand on the pleats the entire day.", orient: "p" },
  { src: "/media/n-saree-c.jpg", kind: "photo", caption: "Five feet of North Karnataka.", orient: "p" },
  { src: "/media/n-saree-d.jpg", kind: "photo", caption: "Traditional day. Her Olympics.", orient: "p" },
  { src: "/media/n-campus.jpg", kind: "photo", caption: "Campus, saree, someone's camera. Business as usual.", orient: "l" },
  { src: "/media/n-saree-friend.jpg", kind: "photo", caption: "Classroom photoshoot, no permission asked.", orient: "p" },
  { src: "/media/n-trad-group.jpg", kind: "photo", caption: "The whole gang in silk.", orient: "l" },
  { src: "/media/n-saree-two.jpg", kind: "photo", caption: "Mother and daughter. Same smile, older version.", orient: "l" },
  { src: "/media/n-festival.jpg", kind: "photo", caption: "Festival colours and a stolen pair of sunglasses.", orient: "p" },
  { src: "/media/n-temple.jpg", kind: "photo", caption: "Belagavi stone and a bell taller than her.", orient: "l" },
];

export const mistyShots: Shot[] = [
  { src: "/media/n-dog-a.jpg", kind: "photo", caption: "Misty. Official cuddle partner, her words.", orient: "p" },
  { src: "/media/n-dog-b.jpg", kind: "photo", caption: "Somebody is getting all her attention and it isn't me.", orient: "p" },
  { src: "/media/n-dog-c.jpg", kind: "photo", caption: "This is what she sends instead of replying.", orient: "l" },
];

export const callShots: Shot[] = [
  { src: "/media/n-call-a.jpg", kind: "photo", caption: "Screenshotted mid-sentence. She'll kill me for this one.", orient: "p" },
  { src: "/media/n-call-c.jpg", kind: "photo", caption: "Eating on call, talking on call, complaining on call.", orient: "p" },
  { src: "/media/n-call-b.jpg", kind: "photo", caption: "Hair everywhere. Camera on anyway.", orient: "p" },
  { src: "/media/n-chat.jpg", kind: "photo", caption: "\"Subbi sent you a chat.\" Best four words on my phone.", orient: "p" },
];

export const newChapters: { title: string; note: string; shots: Shot[] }[] = [
  {
    title: "Her year, in selfies",
    note: "Ninety-five new files landed in one day. I went through every single one. These are the ones that made me stop scrolling.",
    shots: [
      { src: "/media/n-profile.jpg", kind: "photo", caption: "Side light, chin up. She didn't plan this and it still came out like a poster.", orient: "l" },
      { src: "/media/n-wings.jpg", kind: "photo", caption: "Wings on the wall. Fitting.", orient: "p" },
      { src: "/media/n-mauve-a.jpg", kind: "photo", caption: "The mauve sweater era.", orient: "p" },
      { src: "/media/nv-change.mp4", poster: "/media/nv-change.jpg", kind: "video", caption: "\"Where life need a change ✨\" — her caption, her spelling, her mood.", orient: "p" },
      { src: "/media/n-mauve-b.jpg", kind: "photo", caption: "Yellow wall, no reason.", orient: "p" },
      { src: "/media/n-hair.jpg", kind: "photo", caption: "The hair gets its own photo. Fair enough.", orient: "p" },
      { src: "/media/n-clouds.jpg", kind: "photo", caption: "Storm coming, arm out, absolutely thrilled.", orient: "l" },
      { src: "/media/nv-cup.mp4", poster: "/media/nv-cup.jpg", kind: "video", caption: "Paper cup, big talk.", orient: "p" },
      { src: "/media/n-lake.jpg", kind: "photo", caption: "By the lake, pretending to look away.", orient: "l" },
      { src: "/media/n-white-a.jpg", kind: "photo", caption: "White top, soft light, dangerous smile.", orient: "p" },
      { src: "/media/n-white-b.jpg", kind: "photo", caption: "Same evening. Ten more just like it.", orient: "p" },
      { src: "/media/nv-white.mp4", poster: "/media/nv-white.jpg", kind: "video", caption: "Four seconds of her being completely herself.", orient: "p" },
      { src: "/media/n-pink-a.jpg", kind: "photo", caption: "Peach top, sleepy eyes.", orient: "p" },
      { src: "/media/n-pink-b.jpg", kind: "photo", caption: "Hiding behind her own hand. It never works.", orient: "p" },
      { src: "/media/n-pink-c.jpg", kind: "photo", caption: "Arms crossed, argument already won.", orient: "p" },
      { src: "/media/n-arch.jpg", kind: "photo", caption: "Old building, new outfit.", orient: "p" },
      { src: "/media/n-jump.jpg", kind: "photo", caption: "Airborne, for no recorded reason.", orient: "p" },
      { src: "/media/n-yellow-a.jpg", kind: "photo", caption: "Yellow tee, watch on, mid-story.", orient: "p" },
      { src: "/media/n-yellow-b.jpg", kind: "photo", caption: "Still that story. It was a long one.", orient: "p" },
      { src: "/media/n-bw.jpg", kind: "photo", caption: "Black and white, because someone told her it suits her. It does.", orient: "p" },
      { src: "/media/n-hair-face.jpg", kind: "photo", caption: "Woke up, took a photo, sent it, went back to sleep.", orient: "p" },
      { src: "/media/n-tilt.jpg", kind: "photo", caption: "Head tilt. Ninety percent of her camera roll.", orient: "p" },
      { src: "/media/n-mauve-c.jpg", kind: "photo", caption: "The look that means she's about to ask for something.", orient: "p" },
      { src: "/media/nv-talk.mp4", poster: "/media/nv-talk.jpg", kind: "video", caption: "Talking to the camera like it's me on the other side.", orient: "p" },
      { src: "/media/n-selfie-s.jpg", kind: "photo", caption: "Curls done, evening free.", orient: "p" },
      { src: "/media/n-sketch.jpg", kind: "photo", caption: "Somebody drew her. \"Really means a lot,\" she said. Twice.", orient: "l" },
    ],
  },
  {
    title: "Dressed up, going out",
    note: "Mall trips, night streets, cafés, and one scooter. She never leaves the house at less than a hundred percent.",
    shots: [
      { src: "/media/n-street.jpg", kind: "photo", caption: "Night street, black kurta, lights doing her a favour.", orient: "p" },
      { src: "/media/n-night-kurta.jpg", kind: "photo", caption: "Blue kurta, garden lights, full main-character energy.", orient: "p" },
      { src: "/media/n-mall.jpg", kind: "photo", caption: "Mirror in a shop she had no intention of buying from.", orient: "p" },
      { src: "/media/nv-scooter.mp4", poster: "/media/nv-scooter.jpg", kind: "video", caption: "Scooter, sunshine, and someone else doing the driving.", orient: "p" },
      { src: "/media/n-black-top.jpg", kind: "photo", caption: "Printed top, beige pants, quietly stunning.", orient: "p" },
      { src: "/media/n-red-stairs.jpg", kind: "photo", caption: "Red dress on a staircase. The mask didn't stop her.", orient: "p" },
      { src: "/media/n-night-out.jpg", kind: "photo", caption: "Dessert, string lights, and laughing at nothing.", orient: "l" },
      { src: "/media/n-cafe.jpg", kind: "photo", caption: "One plate, two forks, three opinions.", orient: "l" },
      { src: "/media/nv-mirror.mp4", poster: "/media/nv-mirror.jpg", kind: "video", caption: "Room, mirror, phone, dance. In that order.", orient: "p" },
    ],
  },
  {
    title: "The ones who get her",
    note: "Anushree, Kruthika, Vaishu, Shree — the names on her Snapchat and in every good story she tells.",
    shots: [
      { src: "/media/nv-thumbs.mp4", poster: "/media/nv-thumbs.jpg", kind: "video", caption: "Two thumbs up. Nothing was actually going well.", orient: "p" },
      { src: "/media/n-mirror-two.jpg", kind: "photo", caption: "Uniform selfie, taken during class. Obviously.", orient: "p" },
      { src: "/media/nv-two-lying.mp4", poster: "/media/nv-two-lying.jpg", kind: "video", caption: "Lying sideways, talking rubbish, perfectly happy.", orient: "p" },
      { src: "/media/n-twins.jpg", kind: "photo", caption: "Matching filters. Matching nonsense.", orient: "p" },
      { src: "/media/nv-outdoor.mp4", poster: "/media/nv-outdoor.jpg", kind: "video", caption: "Dog filters outdoors. Dignity left indoors.", orient: "p" },
      { src: "/media/n-three.jpg", kind: "photo", caption: "Three of them, one jacket's worth of confidence.", orient: "l" },
      { src: "/media/nv-pink-two.mp4", poster: "/media/nv-pink-two.jpg", kind: "video", caption: "Pink kurtas and a joke I was never told.", orient: "p" },
      { src: "/media/n-girls.jpg", kind: "photo", caption: "The whole set of them, dressed for something.", orient: "l" },
      { src: "/media/nv-three.mp4", poster: "/media/nv-three.jpg", kind: "video", caption: "Three-way call, filters on, volume up.", orient: "p" },
      { src: "/media/n-group-a.jpg", kind: "photo", caption: "College group photo. She's the short one, front row.", orient: "l" },
      { src: "/media/nv-filters.mp4", poster: "/media/nv-filters.jpg", kind: "video", caption: "Whatever this filter is, they committed to it.", orient: "p" },
      { src: "/media/n-family.jpg", kind: "photo", caption: "Her people, stacked into one frame.", orient: "p" },
      { src: "/media/n-bday-collage.jpg", kind: "photo", caption: "Somebody's birthday collage for her. She kept it. Of course she did.", orient: "p" },
      { src: "/media/nv-mug.mp4", poster: "/media/nv-mug.jpg", kind: "video", caption: "Cow-print mug, cow-print filter. Commitment.", orient: "p" },
      { src: "/media/nv-lying.mp4", poster: "/media/nv-lying.jpg", kind: "video", caption: "Half asleep, still recording.", orient: "p" },
    ],
  },
];
