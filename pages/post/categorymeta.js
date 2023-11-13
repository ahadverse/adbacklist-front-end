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
    { id: 3, title: "", description: "", keywords: "", category: "" },
  ];

  const getMeta = datas.find((a) => a.category == data?.[2]);

  return getMeta;
};
