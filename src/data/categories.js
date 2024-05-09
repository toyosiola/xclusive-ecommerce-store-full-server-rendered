import {
  CameraCategoryIcon,
  ComputerCategoryIcon,
  HeadPhoneCategoryIcon,
  PhoneCategoryIcon,
  SmartWatchCategoryIcon,
} from "@/assets/icons";

export const mainCategories = [
  { id: 0, title: "All" },
  { id: 1, title: "Women Fashion" },
  { id: 2, title: "Men Fashion" },
  { id: 3, title: "Electronics" },
  { id: 4, title: "Shoes" },
];

export const subCategories = [
  { id: 0, title: "Phones", icon: <PhoneCategoryIcon /> },
  { id: 1, title: "Laptops", icon: <ComputerCategoryIcon /> },
  { id: 2, title: "watches", icon: <SmartWatchCategoryIcon /> },
  { id: 3, title: "Camera", icon: <CameraCategoryIcon /> },
  { id: 4, title: "Headphones", icon: <HeadPhoneCategoryIcon /> },
];
