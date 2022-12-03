import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../assets/avatar.jpg';
import { Chat, Notifications, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-gray-100"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  // The Menu is Hidden in Small screensize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        <NavButton
          title="Chat"
          dotColor="#01A2FD"
          customFunc={() => handleClick('chat')}
          color={currentColor}
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notifications"
          dotColor="#01A2FD"
          customFunc={() => handleClick('notifications')}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-100 rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img alt="avatar" className="rounded-full w-8 h-8" src={avatar} />
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">Jhon</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {isClicked.chat && <Chat />}
        {isClicked.notifications && <Notifications />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
