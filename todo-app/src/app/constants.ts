import { FormatterService } from "../app/services/formatter/formatter.service";
import { IUrgency } from "./interfaces";

const formatterService = new FormatterService();

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Today",
  "Tomorrow",
];

export const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const conditions = {
  header:
    "These terms and conditions («Terms», «Agreement») are an agreement between Mobile Application Developer («Mobile Application Developer», «us», «we» or «our») and you («User», «you» or «your»). This Agreement sets forth the general terms and conditions of your use of the Mentalstack mobile application and any of its products or services (collectively, «Mobile Application» or «Services»).",
  body:
    "You must be at least 13 years of age to use this Mobile Application. By using this Mobile Application and by agreeing to this Agreement you warrant and represent that you are at least 13 years of age. If you create an account in the Mobile Application, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.",
  footer:
    "We do not own any data, information or material («Content») that you submit in the Mobile Application in the course of using the Service. You shall have sole responsibility for the accuracy, quality, integrity, legality, reliability, appropriateness, and intellectual property ownership or right to use of all submitted Content. We may, but have no obligation to, monitor Content in the Mobile Application submitted or created using our Services by you. Unless specifically permitted by you, your use of the Mobile Application does not grant us the license to use, reproduce, adapt, modify, publish or distribute the Content created by you or stored in your user account for commercial, marketing or any similar purpose. But you grant us permission to access, copy, distribute, store, transmit, reformat, display and perform the Content of your user account solely as required for the purpose of providing the Services to you.",
};

export const privacy = {
  header:
    "My Company (change this) («us», «we», or «our») operates http://www.mysite.com (change this) (the «Site»). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. ",
  bodyInformation:
    "While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name («Personal Information»).",
  bodyLog:
    "Like many site operators, we collect information that your browser sends whenever you visit our Site («Log Data»). This Log Data may include information such as your computer’s Internet Protocol («IP») address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics. In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this …",
  footer:
    "We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that …",
};

export const defaultTodo = {
  _id: null,
  title: "",
  description: " ",
  completed: false,
  date: "123",
  time: null,
  alarm: 5,
  urgency: "Neutral",
};

export const defaultUrgencies = [
  { _id: "", name: "Neutral", color: "#bbbbc7", level: 1 },
  { _id: "", name: "Normal", color: "#56ccf2", level: 4 },
  { _id: "", name: "Important", color: "#f1a41f", level: 7 },
  { _id: "", name: "Urgent", color: "#f24a3c", level: 10 },
];
