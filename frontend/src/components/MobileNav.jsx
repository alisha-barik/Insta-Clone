// MobileNav.jsx
import { Home, Search, PlusSquare, MessageCircle, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 md:hidden">
      <Home onClick={() => navigate("/")} className="cursor-pointer" />
      <Search className="cursor-pointer" />
      <PlusSquare className="cursor-pointer" />
      <MessageCircle onClick={() => navigate("/chat")} className="cursor-pointer" />
      <User onClick={() => navigate("/profile/me")} className="cursor-pointer" />
    </div>
  );
};
export default MobileNav;


