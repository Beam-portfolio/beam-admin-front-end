const ratings = [
  {
    name: '1 Star',
    starCount: 9911,
    reviewCount: 1947,
  },
  {
    name: '2 Star',
    starCount: 1947,
    reviewCount: 9124,
  },
  {
    name: '3 Star',
    starCount: 9124,
    reviewCount: 6984,
  },
  {
    name: '4 Star',
    starCount: 6984,
    reviewCount: 8488,
  },
  {
    name: '5 Star',
    starCount: 8488,
    reviewCount: 2034,
  },
];

const reviews = [
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
    name: 'Jayvion Simon',
    postedAt: '2025-03-10T13:49:56.924Z',
    comment:
      'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
    isPurchased: true,
    rating: 4.2,
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
    helpful: 9911,
    attachments: [],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
    name: 'Lucian Obrien',
    postedAt: '2025-03-09T12:49:56.924Z',
    comment: 'She eagerly opened the gift, her eyes sparkling with excitement.',
    isPurchased: true,
    rating: 3.7,
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
    helpful: 1947,
    attachments: ['https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg'],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
    name: 'Deja Brady',
    postedAt: '2025-03-08T11:49:56.924Z',
    comment: 'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
    isPurchased: true,
    rating: 4.5,
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
    helpful: 9124,
    attachments: [],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
    name: 'Harrison Stein',
    postedAt: '2025-03-07T10:49:56.924Z',
    comment: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
    isPurchased: false,
    rating: 3.5,
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
    helpful: 6984,
    attachments: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg',
    ],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
    name: 'Reece Chung',
    postedAt: '2025-03-06T09:49:56.924Z',
    comment:
      'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
    isPurchased: false,
    rating: 0.5,
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
    helpful: 8488,
    attachments: [],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
    name: 'Lainey Davidson',
    postedAt: '2025-03-05T08:49:56.924Z',
    comment:
      'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
    isPurchased: true,
    rating: 3,
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
    helpful: 2034,
    attachments: [
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg',
      'https://api-dev-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg',
    ],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
    name: 'Cristopher Cardenas',
    postedAt: '2025-03-04T07:49:56.924Z',
    comment:
      'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
    isPurchased: false,
    rating: 2.5,
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
    helpful: 3364,
    attachments: [],
  },
  {
    id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
    name: 'Melanie Noble',
    postedAt: '2025-03-03T06:49:56.924Z',
    comment: 'The waves crashed against the shore, creating a soothing symphony of sound.',
    isPurchased: false,
    rating: 2.8,
    avatarUrl: 'https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
    helpful: 8401,
    attachments: [],
  },
];

export const listing = [
  {
    id: '1',
    title: 'Gym Session',
    hours: 1,
    credits: 20,
    vendor: 'Gold’s Gym ',
    images: [
      'https://s3-alpha-sig.figma.com/img/388a/4284/302b32115afa54a1542db4d7a96cbdcf?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F-VZ-qCaz8p0KqCWhbrCGdi7H-5bWA9pdvogiXylXvhNpBojxc2pZ5ZL3ngOaQ9bNtsQQcqtfxxdBceyu6vPVFRm1pVgc7~qdS4aiY2F5mSIwBNrSfNLmlMNzKgUx7IL90LKOztYep~LQ8iTJfMaThYgd7Q8xYtjHgx-c~dWq0g670nLkfNYUfM3VnjM6518YEBhR~1aSQoVd3VkpcCaM5uRATv8Sm1uS0f102ChGlnFRkJ7GHlhFnq83zOKqptaGiwUKKrsE9vg4ut~mbAX492fMzjfvbtue7QB7QZcELfEP~gLlIfukkIgDRUezlHyeGTJZdF8~GHg5vcIz7VYnA__',
    ],
    publish: true,
    totalRating: 4.5,
    totalReviews: 20,
    description:
      'Explore our modern gym with cutting-edge fitness technology and diverse machines. Enjoy spacious workout areas, group classes, and personal training to reach your fitness goals. With locker rooms, showers, and a smoothie bar, we offer a complete fitness experience!',
    availability: {
      days: [
        { day: 'Mon', value: 'Mon', from: '10:00', to: '12:00' },
        { day: 'Tue', value: 'Tue', from: '10:00', to: '12:00' },
        { day: 'Wed', value: 'Wed', from: '10:00', to: '12:00' },
        { day: 'Thu', value: 'Thu', from: '10:00', to: '12:00' },
        { day: 'Sat', value: 'Sat', from: '10:00', to: '12:00' },
      ],
    },
    ratings,
    reviews,
    category: 'Gym Session',
  },
  {
    id: '2',
    title: 'Pool Access',
    hours: 1,
    credits: 30,
    vendor: 'Gold’s Gym ',
    images: [
      'https://s3-alpha-sig.figma.com/img/993f/8500/a614440ae72bba57a5a93895ff87e17e?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=i7xnZxopDVlxkWrLaAn1tJxOJXUs1g5KaZfmvfE2dZDNaJ1ROrfRb0bJxeikyxgFdt179HXaY0AuP0e-RcSEHtlAjZ3ePCEtENjzGEziZ1ac1sSAVhdFVLlRpUnk2SqqAoR2hrTrAAxNX-0OgtOXzXS3fyeJflRFrpSpqgh3mMzc4PfTquw7rbMzO5HM1G04u3-7J6jc4eUcbt9FEhZml6EkAtjCJx3rwNtJrcu547-5YsDFBCA6vdttRA~nowP3HCTB4GLCmhrjupA4gM1uPTaxY8K~0UxpWCrvjn4HXoMwskyzTvN8npX6bckMm6WzxxUMUyoaBfLzprTydfu5hA__',
    ],
    publish: false,
    totalRating: 4.5,
    description:
      'Explore our modern gym with cutting-edge fitness technology and diverse machines. Enjoy spacious workout areas, group classes, and personal training to reach your fitness goals. With locker rooms, showers, and a smoothie bar, we offer a complete fitness experience!',
    totalReviews: 20000,
    availability: {
      days: [
        { day: 'Mon', value: 'Mon', from: '10:00', to: '12:00' },
        { day: 'Tue', value: 'Tue', from: '10:00', to: '12:00' },
        { day: 'Wed', value: 'Wed', from: '10:00', to: '12:00' },
        { day: 'Thu', value: 'Thu', from: '10:00', to: '12:00' },
        { day: 'Sat', value: 'Sat', from: '10:00', to: '12:00' },
      ],
      class: false,
    },
    ratings,
    reviews,
    category: 'Gym Session',
  },
  {
    id: '3',
    title: 'Yoga Class with Yara',
    class: 'true',
    publish: false,
    credits: 30,
    totalRating: 4.5,
    description:
      'Explore our modern gym with cutting-edge fitness technology and diverse machines. Enjoy spacious workout areas, group classes, and personal training to reach your fitness goals. With locker rooms, showers, and a smoothie bar, we offer a complete fitness experience!',
    totalReviews: 20000,
    date: null,
    availability: {
      days: [],

      class: [
        {
          day: 'Mon',
          value: 'Mon',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
        {
          day: 'Tue',
          value: 'Tue',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
        {
          day: 'Wed',
          value: 'Wed',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
        {
          day: 'Thu',
          value: 'Thu',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
        {
          day: 'Sat',
          value: 'Sat',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
      ],
    },
    ratings,
    reviews,
    vendor: 'Gold’s Gym ',
    images: [
      'https://s3-alpha-sig.figma.com/img/df87/fd38/5bb0336c1e0fe3468df96b0bde833dbb?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iYagV5XXo752RW-RUEDBT2q~Wu5ZsBN6dOSbZOh5~swVI1hZ6eUT0zVdh-jeVoeykCnji~n8eksQF7n6LEfLqKdGibrzaclyMHjeI20~sWUgzzHk0p~CJeWRCH01oGiTcsKJ1uHxlzosLQy7SzaxoY8gR~MvvItrAJrZO2-o4LFi0zt3YJiUQPuriHh7Ta~z6IRqJDhm7KNW4X63kXlZGgSbMUX9OlCYcmH9iTiOZXt9UIWh6gU4xY2H1zgjox424DS1QNp54y6BszqwsoXEUpOqCd6sgeFHL1jMBUaT7-dmG9EBnYIzEmM83zWA4uT7PhzSWvum1e8K2TFkrMuFig__',
    ],
    category: 'Yoga Class',
  },
  {
    id: '4',
    title: 'Padel FlowUp Reservation',
    class: true,
    publish: false,
    credits: 30,
    description:
      'Explore our modern gym with cutting-edge fitness technology and diverse machines. Enjoy spacious workout areas, group classes, and personal training to reach your fitness goals. With locker rooms, showers, and a smoothie bar, we offer a complete fitness experience!',
    totalRating: 4.5,
    totalReviews: 20000,
    vendor: 'Gold’s Gym ',
    availability: {
      days: [],

      class: [
        {
          day: 'Mon',
          value: 'Mon',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
        {
          day: 'Tue',
          value: 'Tue',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
        {
          day: 'Wed',
          value: 'Wed',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
        {
          day: 'Thu',
          value: 'Thu',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
        {
          day: 'Sat',
          value: 'Sat',
          sessions: [
            {
              from: '10:00',
              to: '12:00',
            },
            {
              from: '2:00',
              to: '3:00',
            },
          ],
        },
      ],
    },
    isFuture: true,

    ratings,
    reviews,
    images: [
      'https://s3-alpha-sig.figma.com/img/d62d/0988/9a1bb40a1f1da5f8cf5970656642a438?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Y~8HVE48j7BzFGbAFqeKyW31-62MdwE5LcBEvPhFRBDpO3KvNQzkbIYSpX7fJkJG-rroeMUnY3egHeCUoMSicSQvBdHKcAnHR9xOXtHkTiqT9YZyuo4a4nWIKw6gZjcbmVPX3O~o-3FVVfvncHXOf3mw5ih4fNDCI1WJti9OnSV8f1LWeKmX19ryu-Q5MH6nL~4Fd2Hdbop1Q4aB6Sr~JEb3CJm6LrRawpkft2Jis5J3PLAvaQHrvXfBPgrmQM9oFkoz7~5QW9OUKfFyetuPPOsN-Fhy5Xb7KjGbHWaQqjWfqqRBDVaTVMfHirXWGwKAs8lzj~~oXZ1t6JMut9taAA__',
    ],
    category: 'Padel FlowUp',
    date: new Date(),
  },
];

export const WEEKDAY_OPTIONS = [
  { value: 'Mon', label: 'Mon' },
  { value: 'Tue', label: 'Tue' },
  { value: 'Wed', label: 'Wed' },
  { value: 'Thu', label: 'Thu' },
  { value: 'Fri', label: 'Fri' },
  { value: 'Sat', label: 'Sat' },
  { value: 'Sun', label: 'Sun' },
];
