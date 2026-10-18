/**
 * componentKey -> creative component. The ONE place strings meet JSX imports.
 *
 * Split out of registry.js so that registry.js stays plain .js and loadable in
 * bare node — the reducer imports getTemplate from it, and the reducer is
 * exercised in node by scripts/test-td.mjs. Only CreativeFrame imports this file.
 *
 * Every component here renders visitor text and is reached only through
 * CreativeFrame, which allowlists and coerces the fields first. Adding a creative
 * means: a .jsx component, a manifest entry with its componentKey, and one line
 * here. check-test-drive.mjs (phase 9) asserts every manifest componentKey has a
 * line in this map.
 */
import ThaliCombo from "./restaurant/ThaliCombo.jsx";
import LunchSpecial from "./restaurant/LunchSpecial.jsx";
import HappyHour from "./restaurant/HappyHour.jsx";
import TodaysSpecial from "./restaurant/TodaysSpecial.jsx";
import FamilyFeast from "./restaurant/FamilyFeast.jsx";
import NewOnMenu from "./restaurant/NewOnMenu.jsx";
import WeekendBrunch from "./restaurant/WeekendBrunch.jsx";
import OpeningHours from "./restaurant/OpeningHours.jsx";
import CoffeeOfDay from "./cafe/CoffeeOfDay.jsx";
import MorningCombo from "./cafe/MorningCombo.jsx";
import LoyaltyCard from "./cafe/LoyaltyCard.jsx";
import FreshBakes from "./cafe/FreshBakes.jsx";
import IcedSummer from "./cafe/IcedSummer.jsx";
import WifiWorkspace from "./cafe/WifiWorkspace.jsx";
import EveningUnwind from "./cafe/EveningUnwind.jsx";
import CafeHours from "./cafe/CafeHours.jsx";
import FlashSale from "./retail/FlashSale.jsx";
import NewArrivals from "./retail/NewArrivals.jsx";
import BuyOneGetOne from "./retail/BuyOneGetOne.jsx";
import PriceDrop from "./retail/PriceDrop.jsx";
import WeekendOffer from "./retail/WeekendOffer.jsx";
import MembersOnly from "./retail/MembersOnly.jsx";
import ClearanceRack from "./retail/ClearanceRack.jsx";
import StoreHours from "./retail/StoreHours.jsx";
import DoctorOnDuty from "./healthcare/DoctorOnDuty.jsx";
import TokenQueue from "./healthcare/TokenQueue.jsx";
import HealthTip from "./healthcare/HealthTip.jsx";
import VaccinationDrive from "./healthcare/VaccinationDrive.jsx";
import DepartmentGuide from "./healthcare/DepartmentGuide.jsx";
import HealthPackage from "./healthcare/HealthPackage.jsx";
import CampNotice from "./healthcare/CampNotice.jsx";
import ClinicHours from "./healthcare/ClinicHours.jsx";
import LobbyWelcome from "./hospitality/LobbyWelcome.jsx";
import RoomOffer from "./hospitality/RoomOffer.jsx";
import AmenityHours from "./hospitality/AmenityHours.jsx";
import DinnerTonight from "./hospitality/DinnerTonight.jsx";
import SpaPackage from "./hospitality/SpaPackage.jsx";
import EventToday from "./hospitality/EventToday.jsx";
import Directions from "./hospitality/Directions.jsx";
import CheckoutInfo from "./hospitality/CheckoutInfo.jsx";
import TowerLaunch from "./realestate/TowerLaunch.jsx";
import AvailableUnits from "./realestate/AvailableUnits.jsx";
import SiteVisit from "./realestate/SiteVisit.jsx";
import SoldAnnouncement from "./realestate/SoldAnnouncement.jsx";
import EmiOffer from "./realestate/EmiOffer.jsx";
import OpenHouse from "./realestate/OpenHouse.jsx";
import AmenityShowcase from "./realestate/AmenityShowcase.jsx";
import SalesOfficeHours from "./realestate/SalesOfficeHours.jsx";
import AllHands from "./corporate/AllHands.jsx";
import MeetingRoomStatus from "./corporate/MeetingRoomStatus.jsx";
import VisitorWelcome from "./corporate/VisitorWelcome.jsx";
import BirthdaysToday from "./corporate/BirthdaysToday.jsx";
import MetricsBoard from "./corporate/MetricsBoard.jsx";
import TownhallChat from "./corporate/TownhallChat.jsx";
import FacilityNotice from "./corporate/FacilityNotice.jsx";
import OfficeHours from "./corporate/OfficeHours.jsx";
import ClassSchedule from "./fitness/ClassSchedule.jsx";
import MembershipDrive from "./fitness/MembershipDrive.jsx";
import PtOffer from "./fitness/PtOffer.jsx";
import MotivationCard from "./fitness/MotivationCard.jsx";
import HydrationTip from "./fitness/HydrationTip.jsx";
import NewClassLaunch from "./fitness/NewClassLaunch.jsx";
import ChallengeBoard from "./fitness/ChallengeBoard.jsx";
import GymHours from "./fitness/GymHours.jsx";
import SeminarNotice from "./education/SeminarNotice.jsx";
import ExamSchedule from "./education/ExamSchedule.jsx";
import FestAnnouncement from "./education/FestAnnouncement.jsx";
import TimetableChange from "./education/TimetableChange.jsx";
import PinnedNotice from "./education/PinnedNotice.jsx";
import ToppersBoard from "./education/ToppersBoard.jsx";
import ClubSignup from "./education/ClubSignup.jsx";
import AdminHours from "./education/AdminHours.jsx";
import NewModelLaunch from "./automotive/NewModelLaunch.jsx";
import UsedCertified from "./automotive/UsedCertified.jsx";
import ServicePackage from "./automotive/ServicePackage.jsx";
import AccessoryBundle from "./automotive/AccessoryBundle.jsx";
import TestDriveInvite from "./automotive/TestDriveInvite.jsx";
import SpecShowcase from "./automotive/SpecShowcase.jsx";
import WarrantyCard from "./automotive/WarrantyCard.jsx";
import ShowroomHours from "./automotive/ShowroomHours.jsx";

const COMPONENTS = {
  ThaliCombo,
  LunchSpecial,
  HappyHour,
  TodaysSpecial,
  FamilyFeast,
  NewOnMenu,
  WeekendBrunch,
  OpeningHours,
  CoffeeOfDay,
  MorningCombo,
  LoyaltyCard,
  FreshBakes,
  IcedSummer,
  WifiWorkspace,
  EveningUnwind,
  CafeHours,
  FlashSale,
  NewArrivals,
  BuyOneGetOne,
  PriceDrop,
  WeekendOffer,
  MembersOnly,
  ClearanceRack,
  StoreHours,
  DoctorOnDuty,
  TokenQueue,
  HealthTip,
  VaccinationDrive,
  DepartmentGuide,
  HealthPackage,
  CampNotice,
  ClinicHours,
  LobbyWelcome,
  RoomOffer,
  AmenityHours,
  DinnerTonight,
  SpaPackage,
  EventToday,
  Directions,
  CheckoutInfo,
  TowerLaunch,
  AvailableUnits,
  SiteVisit,
  SoldAnnouncement,
  EmiOffer,
  OpenHouse,
  AmenityShowcase,
  SalesOfficeHours,
  AllHands,
  MeetingRoomStatus,
  VisitorWelcome,
  BirthdaysToday,
  MetricsBoard,
  TownhallChat,
  FacilityNotice,
  OfficeHours,
  ClassSchedule,
  MembershipDrive,
  PtOffer,
  MotivationCard,
  HydrationTip,
  NewClassLaunch,
  ChallengeBoard,
  GymHours,
  SeminarNotice,
  ExamSchedule,
  FestAnnouncement,
  TimetableChange,
  PinnedNotice,
  ToppersBoard,
  ClubSignup,
  AdminHours,
  NewModelLaunch,
  UsedCertified,
  ServicePackage,
  AccessoryBundle,
  TestDriveInvite,
  SpecShowcase,
  WarrantyCard,
  ShowroomHours,
};

/**
 * The component for a componentKey, or null. Returns null rather than throwing:
 * a creative that cannot render must degrade to CreativeFrame's placeholder, not
 * take the whole screen wall down with it.
 */
export function getComponent(componentKey) {
  return COMPONENTS[componentKey] || null;
}

/** Keys this build can render — for the phase 9 manifest check. */
export const COMPONENT_KEYS = Object.keys(COMPONENTS);
