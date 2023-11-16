export const findMeta = (data) => {
  const datas = [
    {
      id: 1,
      title: `Find the Best Adult Jobs in ${data?.[0]} - fun stuff to do near me`,
      description: `Looking for an exciting adult jobs in ${data?.[0]} events? Adult modeling jobs and blow jobs adult positions available near you. Explore fun stuff to do near me and find out about upcoming events that will spice up your life. Start your exhilarating job search at adult jobs near me now!`,
      keywords: `Adult jobs in ${data?.[0]}, adult job, adult modeling jobs,  blow jobs adult, fun stuff, fun stuff to do near me, 
          Backpage ${data?.[0]}, Adult Jobs near me`,
      category: "Adult Jobs",
    },
    {
      id: 2,
      title: "Relax with Sensual Bodyrub and Erotic Massage Services",
      description: `Experience complete relaxation and sensual bliss with our Bodyrubs and erotic massage services in ${data?.[0]}. 
      Experience the finest Backpage ${data?.[0]}-style Bodyrubs that will leave you feeling rejuvenated and satisfied. 
      Join Our unforgettable fun stuff session today!`,
      keywords: `Bodyrubs, erotic massage, Backpage ${data?.[0]}, Bodyrubs ${data?.[0]}, Backpage Bodyrubs, Bodyrub, fun stuff`,
      category: "Bodyrubs",
    },
    {
      id: 3,
      title: "Find Your Elite Dom and Fetish Escorts - Foot Fetish Fantasies",
      description: `Experience the ultimate pleasure with our elite Dom and Fetish escorts in ${data?.[0]}. Explore your deepest desires with our professional and discreet companions who specialize in feet fetish dom. Find the true meaning of satisfaction with our dom fetish and Backpage ${data?.[0]} escorts.`,
      keywords: `dom fetish, dom and fetish, Dom and Fetish Escotrs, Escorts in ${data?.[0]}, feet fetish dom, Backpage ${data?.[0]}`,
      category: "Dom-Fetish",
    },
    {
      id: 4,
      title: `Backpage ${data?.[0]} Female Escort Services Female Escorts Near Me`,
      description: `Find ${data?.[0]} female escort experience near Me.
      Our Professional and discreet female escorts offer unparalleled companionship for any occasion. 
      Experience the utmost satisfaction with our top-rated female escort service—book now for a 
      memorable and pleasurable experience with Elite Escort Female`,
      keywords: `Female Escorts, Female Escort, escort female, female escort near me, female escort service`,
      category: "Female Escorts",
    },
    {
      id: 5,
      title: `${data?.[0]} Male Escorts: Escorting with Gay Male Escorts Near ME`,
      description: `Find the best gay male escorts in ${data?.[0]} near Me. 
      Our professional and discreet male escorting is ready to provide a memorable experience tailored to your desires. 
      Explore our diverse selection of ${data?.[0]} male escorts and book an unforgettable encounter today. 
      Satisfaction guaranteed`,
      keywords: `male escort, male escorts, male escorting, escort male, gay male escorts, male escorts near me, ${data?.[0]} male escor`,
      category: "Male Escorts",
    },
    {
      id: 6,
      title: `Striper Club Nightlife at ${data?.[0]}'s Strip Club near me. Striper Club Nightlife at ${data?.[0]}'s Fully Nude Strip Club near me`,
      description: `Find the hottest striper clubs in ${data?.[0]} for an unforgettable night of entertainment. 
      Whether you're looking for male or female strip clubs, fully nude venues, or a vibrant nightlife experience, 
      we've got you covered. Fully nude strip clubs near you and indulge in a night of excitement and adult entertainment. `,
      keywords: `${data?.[0]} Strip Clubs, Nightlife, striper club, male strip clubs, female strip club, fully nude strip club, strip clubs near me`,
      category: "Strip Clubs",
    },
    {
      id: 7,
      title: `${data?.[0]} latest Adult Dating Experience with Free Adults Websites`,
      description: `Turn up the ${data?.[0]} adult dating experience on our top-rated adult website. 
      Explore a vast selection of free adult websites that cater to your desires and enhance your intimate encounters. 
      Join today and indulge in a world of pleasure with the best adults websites available.`,
      keywords: `adult website, adult websites, free adult websites, adults websites, adult dating websites`,
      category: "Phone and Websites",
    },
    {
      id: 8,
      title: `${data?.[0]} Sugar Daddy website for an inclusive sugar dating experience`,
      description: `${data?.[0]} sugar daddy websites make every connection of sugar dating with Sugarbaby - the ultimate platform for 
      sugar dating, male sugar baby, and trans sugar babies. 
      Connect with like-minded individuals seeking mutually beneficial relationships.`,
      keywords: `Sugar Babies, sugar daddy websites, male sugar baby, trans sugar babies,sugar dating, sugarbaby`,
      category: "Sugar Babies",
    },
    {
      id: 9,
      title: ``,
      description: ``,
      keywords: ``,
      category: "",
    },
  ];

  const getMeta = datas.find((a) => a.category == data?.[2]);

  return getMeta;
};
