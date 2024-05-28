import { IconBxUser, IconLogout } from "@/assets/icons";
import { SET_USER } from "@/contexts/actions";
import { useGlobalContext } from "@/contexts/providers/GlobalProvider";
import logout from "@/utils/server-actions/logout";
import { useState } from "react";

export default function UserMenu() {
  const { dispatch } = useGlobalContext();
  const [isUserMenuOpen, toggleIsUserMenuOpen] = useState(false);

  return (
    <div className="relative z-10 ml-4 hidden text-white lg:block">
      {/* user button */}
      <button
        className="rounded-full bg-button2 px-2 py-2 text-xl leading-none"
        onClick={() => toggleIsUserMenuOpen(!isUserMenuOpen)}
      >
        <IconBxUser />
      </button>
      {/* dropdown menu */}
      <div
        className={`absolute right-0 top-12 rounded-md bg-black/70 text-base ${isUserMenuOpen ? "block" : "hidden"}`}
      >
        {/* logout button */}
        <button
          className="flex items-center gap-2 px-4 py-2"
          onClick={async () => {
            await logout();
            dispatch({ type: SET_USER, payload: null });
          }}
        >
          <IconLogout className="rotate-180 text-2xl" />
          <span className="font-semibold tracking-wide">Logout</span>
        </button>
      </div>
      {/* end dropdown menu */}
    </div>
  );
}
