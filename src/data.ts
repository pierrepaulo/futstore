export const data = {
  banners: [
    { img: "/assets/banners/banner-1.png", link: "" },
    { img: "/assets/banners/banner-2.png", link: "" },
    { img: "/assets/banners/banner-3.png", link: "" },
    { img: "/assets/banners/banner-4.png", link: "" },
  ],

  products: [
    {
      id: 1,
      label: "Camisa Santos",
      price: 99.9,
      image: "/assets/products/santosfront.webp",
      liked: false,
    },
    {
      id: 2,
      label: "Camisa Flamengo",
      price: 99.9,
      image: "/assets/products/flamengofront.webp",
      liked: false,
    },
    {
      id: 3,
      label: "Camisa Vasco",
      price: 99.9,
      image: "/assets/products/vascofront.webp",
      liked: false,
    },
    {
      id: 4,
      label: "Camisa Cruzeiro",
      price: 99.9,
      image: "/assets/products/cruzeirofront.webp",
      liked: false,
    },
  ],
  product: {
    id: 1,
    label: "Camisa Santos",
    images: [
      "/assets/products/santosfront.webp",
      "/assets/products/santosback.webp",
    ],
    price: 99.9,
    liked: false,
    description: "Algum descrição",
  },
  addresses: [
    {
      id: 1,
      zipcode: "12345",
      street: "rua teste",
      number: "123",
      city: "cidade qualquer",
      state: "estado algum",
      country: "Pais",
    },
    {
      id: 2,
      zipcode: "12342",
      street: "rua test21",
      number: "1232",
      city: "cidade qualquer2",
      state: "estado algum2",
      country: "Pais2",
    },
    {
      id: 3,
      zipcode: "12343",
      street: "rua teste3",
      number: "1233",
      city: "cidade qualquer3",
      state: "estado algum3",
      country: "Pais3",
    },
  ],
};
