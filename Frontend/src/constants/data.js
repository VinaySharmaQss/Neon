import CardImg1 from "../../assets/img/holiday_0.png";
import CardImg2 from "../../assets/img/waterfall.jpg";
import CardImg3 from "../../assets/img/golf.png";
import weatherLogo from "../../assets/img/weather_img.png";
import logo from "../../assets/img/joy.svg";
import Image from "../../assets/img/mountain.jpg";
import Image2 from "../../assets/img/Mountains_waterfall.jpg";
import cardImg3_1 from "../../assets/img/card3_1.jpg"
import cardImg3_2 from "../../assets/img/card3_2.jpg"
import cardImg3_3 from "../../assets/img/card3_3.jpg"
import cardImg3_4 from "../../assets/img/card3_4.jpg"
import cardImg3_5 from "../../assets/img/card3_5.jpg"
import cardImg4_1 from "../../assets/img/card4_1.jpg"
import cardImg4_2 from "../../assets/img/card4_2.jpg"
import cardImg4_3 from "../../assets/img/card4_3.jpg"
import cardImg4_4 from "../../assets/img/card4_4.jpg"
import cardImg4_5 from "../../assets/img/card4_5.jpg"
import cardImg2_1 from "../../assets/img/card2_1.jpg"
import cardImg2_2 from "../../assets/img/card2_2.jpg"
import user1 from "../../assets/img/user1.png"
import user2 from "../../assets/img/user2.png"
import user3 from "../../assets/img/user3.png"
import user4 from "../../assets/img/user4.png"
import user5 from "../../assets/img/user5.png"


export const card1Data = [
  {
    mainImage: cardImg3_4,
    weatherLogo: weatherLogo,
    temperature: "18",
    title: "Round of Golf",
    rating: "★★★★★",
    ratingNum: "4.5",
    reviews: "(23 reviews)",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae....",
    readMore: "read-more",
    events: [
      {
        description: "Nov 10, 10:30 AM - Nov 10, 10:30 AM",
      },
      {
        description: "Sindalh City",
      },
      {
        description: "Golf",
      },
    ],
    footerLogo: logo,
    footerDescription: "Overwhelmed vibes are coming here",
    footerLink: "Scheduled",
  },
  {
    mainImage: CardImg2,
    weatherLogo: weatherLogo,
    temperature: "22",
    title: "Beach Volleyball",
    rating: "★★★★☆",
    ratingNum: "4.0",
    reviews: "(15 reviews)",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae....",
    readMore: "read-more",
    events: [
      {
        description: "Nov 11, 10:30 AM - Nov 11, 10:30 AM",
      },
      {
        description: "Sindalh City",
      },
      {
        description: "Volleyball",
      },
    ],
    footerLogo: logo,
    footerDescription: "Enjoy the beach vibes",
    footerLink: "Scheduled",
  },
  {
    mainImage: CardImg3,
    weatherLogo: weatherLogo,
    temperature: "25",
    title: "Mountain Hiking",
    rating: "★★★★★",
    ratingNum: "4.8",
    reviews: "(30 reviews)",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae....",
    readMore: "read-more",
    events: [
      {
        description: "Nov 12, 10:30 AM - Nov 12, 10:30 AM",
      },
      {
        description: "Sindalh City",
      },
      {
        description: "Hiking",
      },
    ],
    footerLogo: logo,
    footerDescription: "Experience the mountain adventure",
    footerLink: "Scheduled",
  },
  {
    mainImage: cardImg3_4,
    weatherLogo: weatherLogo,
    temperature: "18",
    title: "Round of Golf",
    rating: "★★★★★",
    ratingNum: "4.5",
    reviews: "(23 reviews)",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae....",
    readMore: "read-more",
    events: [
      {
        description: "Nov 10, 10:30 AM - Nov 10, 10:30 AM",
      },
      {
        description: "Sindalh City",
      },
      {
        description: "Golf",
      },
    ],
    footerLogo: logo,
    footerDescription: "Overwhelmed vibes are coming here",
    footerLink: "Scheduled",
  },
  // {
  //   mainImage: "",
  //   weatherLogo: "",
  //   temperature: "",
  //   title: "",
  //   rating: "",
  //   ratingNum: "",
  //   reviews: "",
  //   description: "",
  //   readMore: "",
  //   events: [],
  //   footerLogo: "",
  //   footerDescription: "",
  //   footerLink: "",
  // },
];
export const card2Data = [
  {
    mainImage: Image,
    logo: logo,
    title: "Indulge in the Finest Epicurean Cuisines",
    date: "on Nov 17, 2022",
    description:
      "Hi Charlie, we came to know from our chef John that you didn't enjoy the Epicurean cuisines yesterday. As a compensation, we would like to offer you a free Italian cuisine as a goodwill gesture. Would you like to accept our request?",
    buttons: [
      {
        text: "Yes, I accept",
        class: "btn_black",
      },
      {
        text: "No, thanks",
        class: "btn_white",
      },
    ],
  },
  {
    mainImage: Image2,
    logo: logo,
    title: "Experience Authentic Sushi Flavors",
    date: "on Dec 5, 2022",
    description:
      "Dear Emma, we regret to inform you that your sushi experience didn’t meet expectations. As a gesture of goodwill, we’d love to offer you a complimentary sushi platter next time. Will you be interested?",
    buttons: [
      {
        text: "Yes, I accept",
        class: "btn_black",
      },
      {
        text: "No, thanks",
        class: "btn_white",
      },
    ],
  },
  {
    mainImage: cardImg2_1,
    logo: logo,
    title: "Discover Gourmet French Delicacies",
    date: "on Jan 12, 2023",
    description:
      "Hello Michael, we noticed that your recent dining experience with our French delicacies didn’t quite satisfy your palate. To make it right, we’d like to offer you a complimentary dessert. Are you open to this gesture?",
    buttons: [
      {
        text: "Yes, I accept",
        class: "btn_black",
      },
      {
        text: "No, thanks",
        class: "btn_white",
      },
    ],
  },
  {
    mainImage: cardImg2_2,
    logo: logo,
    title: "Savor the Best Mediterranean Dishes",
    date: "on Jan 25, 2023",
    description:
      "Hi Lucas, our team received feedback that the Mediterranean dishes weren’t to your liking. We would love to make it up to you with a complimentary appetizer next time. Would you be interested in this offer?",
    buttons: [
      {
        text: "Yes, I accept",
        class: "btn_black",
      },
      {
        text: "No, thanks",
        class: "btn_white",
      },
    ],
  },
  {
    mainImage: cardImg3_1,
    logo: logo,
    title: "Relish Exquisite Indian Flavors",
    date: "on Feb 2, 2023",
    description:
      "Hey Sophia, we heard that your recent experience with our Indian cuisine didn’t quite hit the mark. To make it up to you, we’d like to offer a free appetizer during your next visit. Would you be willing to accept our offer?",
    buttons: [
      {
        text: "Yes, I accept",
        class: "btn_black",
      },
      {
        text: "No, thanks",
        class: "btn_white",
      },
    ],
  },
];

export const card3Data = [
  {
    mainImage: cardImg3_1,
    icon: logo,
    title: "Invigorating & Uplifting",
    date: "Nov 10-29",
    description: "Round of Golf",
    time: "10:30 AM - 7:30 PM",
    cardNumber: 1,
  },
  {
    mainImage: cardImg3_2,
    icon: logo,
    title: "Art Exhibition",
    date: "Dec 01-15",
    description: "Explore the finest art",
    time: "11:00 AM - 6:00 PM",
    cardNumber: 2,
  },
  {
    mainImage: cardImg3_3,
    icon:logo,
    title: "Music Concert",
    date: "Dec 20-25",
    description: "Live music performances",
    time: "5:00 PM - 10:00 PM",
    cardNumber: 3,
  },
  {
    mainImage: cardImg3_4,
    icon: logo,
    title: "Food Festival",
    date: "Jan 05-10",
    description: "Taste the best cuisines",
    time: "12:00 PM - 8:00 PM",
    cardNumber: 4,
  },
  {
    mainImage: cardImg3_5,
    icon: logo,
    title: "Theater Play",
    date: "Jan 15-20",
    description: "Enjoy a captivating theater play",
    time: "7:00 PM - 9:00 PM",
    cardNumber: 5,
  },
];


export const card4Data = [
  {
    mainImage: cardImg4_1,
    title: "Round of Golf",
    guests: 3,
    date: "on Nov 17, 2022",
    flag: true,
    rating: "★ ★ ★ ★ ★",
  },
  {
    mainImage: cardImg4_2,
    title: "Beach",
    guests: 5,
    date: "on Dec 01, 2022",
    flag: false,
    rating: "★ ★ ★ ★ ☆",
  },
  {
    mainImage: cardImg4_3,
    title: "Mountain",
    guests: 8,
    date: "on Dec 10, 2022",
    flag: true,
    rating: "★ ★ ★ ★ ★",
  },
  {
    mainImage: cardImg4_4,
    title: "City Tour",
    guests: 10,
    date: "on Jan 05, 2023",
    flag: false,
    rating: "★ ★ ★ ☆ ☆",
  },
  {
    mainImage: cardImg4_5,
    title: "Food Festival",
    guests: 12,
    date: "on Feb 14, 2023",
    flag: true,
    rating: "★ ★ ★ ★ ★",
  },
];


export const card2_1Data = [
  {
    mainImage: cardImg3_1,
    icon: logo,
    title: "Invigorating & Uplifting",
    date: "Nov 10-29",
    description: "Round of Golf",
    time: "10:30 AM - 7:30 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_2,
    icon: logo,
    title: "Art Exhibition",
    date: "Dec 01-15",
    description: "Explore the finest art",
    time: "11:00 AM - 6:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_3,
    icon:logo,
    title: "Music Concert",
    date: "Dec 20-25",
    description: "Live music performances",
    time: "5:00 PM - 10:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_4,
    icon:logo,
    title: "Food Festival",
    date: "Jan 05-10",
    description: "Taste the best cuisines",
    time: "12:00 PM - 8:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_5,
    icon: logo,
    title: "Theater Play",
    date: "Jan 15-20",
    description: "Enjoy a captivating theater play",
    time: "7:00 PM - 9:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_1,
    icon: logo,
    title: "Invigorating & Uplifting",
    date: "Nov 10-29",
    description: "Round of Golf",
    time: "10:30 AM - 7:30 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_2,
    icon: logo,
    title: "Art Exhibition",
    date: "Dec 01-15",
    description: "Explore the finest art",
    time: "11:00 AM - 6:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_3,
    icon:logo,
    title: "Music Concert",
    date: "Dec 20-25",
    description: "Live music performances",
    time: "5:00 PM - 10:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_4,
    icon:logo,
    title: "Food Festival",
    date: "Jan 05-10",
    description: "Taste the best cuisines",
    time: "12:00 PM - 8:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_5,
    icon: logo,
    title: "Theater Play",
    date: "Jan 15-20",
    description: "Enjoy a captivating theater play",
    time: "7:00 PM - 9:00 PM",
    cardNumber: '',
  }, 
    
];
export const card5Data = [
  {
    mainImage: Image2,
    title: "Explore the deep sea",
    date: "From Nov 10 to 29, 2022",
    description: "Explore the deep sea",
    time: "10:30 AM - 7:30 PM",
    logo: logo,
  },
  {
    mainImage: Image,
    title: "Mountain Adventure",
    date: "From Dec 01 to 15, 2022",
    description: "Mountain Adventure",
    time: "8:00 AM - 5:00 PM",
    logo: logo,
  },
  {
    mainImage: Image2,
    title: "City Tour",
    date: "From Jan 05 to 20, 2023",
    description: "City Tour",
    time: "9:00 AM - 6:00 PM",
    logo: logo,
  },
  {
    mainImage: Image,
    title: "Food Festival",
    date: "From Feb 10 to 15, 2023",
    description: "Taste the best cuisines",
    time: "12:00 PM - 8:00 PM",
    logo: logo,
  },
  {
    mainImage: Image2,
    title: "Art Exhibition",
    date: "From Mar 01 to 10, 2023",
    description: "Explore the finest art",
    time: "11:00 AM - 6:00 PM",
    logo: logo,
  },
];

export const card3_1Data = [
  {
    mainImage: cardImg3_1,
    icon: logo,
    title: "Invigorating & Uplifting",
    date: "Nov 10-29",
    description: "Round of Golf",
    time: "10:30 AM - 7:30 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_2,
    icon: logo,
    title: "Art Exhibition",
    date: "Dec 01-15",
    description: "Explore the finest art",
    time: "11:00 AM - 6:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_3,
    icon: logo,
    title: "Music Concert",
    date: "Dec 20-25",
    description: "Live music performances",
    time: "5:00 PM - 10:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_4,
    icon: logo,
    title: "Food Festival",
    date: "Jan 05-10",
    description: "Taste the best cuisines",
    time: "12:00 PM - 8:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_5,
    icon: logo,
    title: "Theater Play",
    date: "Jan 15-20",
    description: "Enjoy a captivating theater play",
    time: "7:00 PM - 9:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_1,
    icon: logo,
    title: "Invigorating & Uplifting",
    date: "Nov 10-29",
    description: "Round of Golf",
    time: "10:30 AM - 7:30 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_2,
    icon: logo,
    title: "Art Exhibition",
    date: "Dec 01-15",
    description: "Explore the finest art",
    time: "11:00 AM - 6:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_3,
    icon: logo,
    title: "Music Concert",
    date: "Dec 20-25",
    description: "Live music performances",
    time: "5:00 PM - 10:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_4,
    icon: logo,
    title: "Food Festival",
    date: "Jan 05-10",
    description: "Taste the best cuisines",
    time: "12:00 PM - 8:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_5,
    icon: logo,
    title: "Theater Play",
    date: "Jan 15-20",
    description: "Enjoy a captivating theater play",
    time: "7:00 PM - 9:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_2,
    icon: logo,
    title: "Beach Volleyball",
    date: "Feb 01-10",
    description: "Enjoy a fun game of beach volleyball",
    time: "10:00 AM - 5:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_5,
    icon: logo,
    title: "Mountain Hiking",
    date: "Mar 05-15",
    description: "Experience the thrill of mountain hiking",
    time: "8:00 AM - 4:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_5,
    icon: logo,
    title: "City Tour",
    date: "Apr 10-20",
    description: "Explore the city's hidden gems",
    time: "9:00 AM - 6:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg3_4,
    icon: logo,
    title: "Food Tasting",
    date: "May 01-10",
    description: "Taste a variety of delicious foods",
    time: "12:00 PM - 8:00 PM",
    cardNumber: '',
  },
  {
    mainImage: cardImg4_3,
    icon: logo,
    title: "Art Workshop",
    date: "Jun 15-25",
    description: "Participate in an interactive art workshop",
    time: "10:00 AM - 4:00 PM",
    cardNumber: '',
  },
];

export const events = [
    { name: "Stand Up Comedy" },
    { name: "RAMP Walk" },
    { name: "Box Cricket" },
    { name: "Swimming" },
    { name: "Golf Tournament" },
    { name: "Singing" },
    { name: "Talk Shows" },
    { name: "Kite Surfing" },
    { name: "Book Exhibitions" },
  ];


   export const reviews = [
    {
      userImage: {card1Data},
      userName: "Anastasia",
      reviewDate: "Nov 2022",
      reviewText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      rating: 4.8,
    },
    {
      userImage: {user2},
      userName: "John Doe",
      reviewDate: "Oct 2022",
      reviewText:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      rating: 4.5,
    },
    {
      userImage: {user3},
      userName: "Sophia Lee",
      reviewDate: "Sep 2022",
      reviewText:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      rating: 4.9,
    },
    {
      userImage: {user4},
      userName: "Michael Smith",
      reviewDate: "Aug 2022",
      reviewText:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      rating: 4.7,
    },
    {
      userImage: {user5},
      userName: "Emily Davis",
      reviewDate: "Jul 2022",
      reviewText:
        "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra.",
      rating: 4.6,
    },
    {
      userImage: {user3},
      userName: "Chris Taylor",
      reviewDate: "Jun 2022",
      reviewText:
        "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.",
      rating: 4.4,
    },
    {
      userImage: {user3},
      userName: "Chris Taylor",
      reviewDate: "Jun 2022",
      reviewText:
        "Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.",
      rating: 4.4,
    },
  ];

  export const eventData = [
    {
      eventTitle: "Jazz Concert",
      eventLocation: "Sindalah City, Dubai",
      eventDate: "2025-02-20T19:00:00", // Example future date
      eventImage: cardImg3_3,            // Example image URL
    },
    {
      eventTitle: "Rock Festival",
      eventLocation: "Burj Khalifa Park, Dubai",
      eventDate: "2025-06-15T18:00:00", // Example future date
      eventImage: cardImg2_2,            // Example image URL
    },
    {
      eventTitle: "Tech Conference",
      eventLocation: "Dubai World Trade Center, Dubai",
      eventDate: "2025-08-20T20:00:00", // Example future date
      eventImage: cardImg3_2,            // Example image URL
    },
    {
      eventTitle: "Fashion Show",
      eventLocation: "Palm Jumeirah, Dubai",
      eventDate: "2025-09-10T21:00:00", // Example future date
      eventImage: cardImg3_5,            // Example image URL
    },
    {
      eventTitle: "Cultural Expo",
      eventLocation: "Dubai Expo Center, Dubai",
      eventDate: "2025-11-05T17:00:00", // Example future date
      eventImage: cardImg4_1,            // Example image URL
    },
    {
      eventTitle: "Food Festival",
      eventLocation: "Dubai Marina, Dubai",
      eventDate: "2025-12-12T14:00:00", // Example future date
      eventImage: cardImg3_5,            // Example image URL
    },
  ];
  