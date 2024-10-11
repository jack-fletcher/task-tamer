import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation";
import { Badge } from "./badge";

//TODO: Do this in a less static way
import FirstBadge from "@/app/assets/imgs/first.png";
import SecondBadge from "@/app/assets/imgs/second.png";
import ThirdBadge from "@/app/assets/imgs/third.png";
import VipBadge from "@/app/assets/imgs/vip.png";
import NightOwlBadge from "@/app/assets/imgs/vip.png";
import { get_all_badge_data } from "@/app/api/database/database";

export async function Badges(props:any) {
  const session = await auth()
  if (!session) return null;
  const date = new Date();
  const badges = await get_all_badge_data();
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {badges.map((badge:any) =>
        <Badge badgeName={badge.name} badgeDescription={badge.description} badgeImg={FirstBadge} badgeCompletionDate=""/>
      )}
    </div>
  )
}