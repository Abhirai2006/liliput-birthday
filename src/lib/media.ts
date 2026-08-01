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
