export const findPostMeta = (data) => {
  const datas = [
    {
      name: "Adult Jobs",
      keywords: `Adult Jobs, ${data?.city},  Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Bodyrubs",
      keywords: `Bodyrubs, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Dom-Fetish",
      keywords: `Dom Fetish, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Female Escorts",
      keywords: `Female Escorts, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Male Escorts",
      keywords: `Male Escorts, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Strip Clubs",
      keywords: `Strip Clubs, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Phone and Websites",
      keywords: `${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Sugar Babies",
      keywords: `Sugar Babies, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Women-Men",
      keywords: `Women Men, W4M, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Men-Men",
      keywords: `Men Men, M4M, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Men-Women",
      keywords: `Men Women, M4W, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Transgender",
      keywords: `Transgender, TS, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Women-Women",
      keywords: `Women Women, W4W, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
    {
      name: "Hookup Tonight",
      keywords: `Hookup Tonight, ${data?.city}, Incall, Outcall, bbbj, Date, Hot, Escorts, Adult, Fun, cash payment, Asain Girls, Girlfriend, VIP service, Best Service, real Service, Full Service, Top Service, young girl, pretty, cute`,
    },
  ];
  const getMeta = datas.find((a) => a.name == data?.sub);

  return getMeta;
};

//   title limit 64
// desc 318
