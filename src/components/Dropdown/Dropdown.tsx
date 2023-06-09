import { FC, useEffect, useRef, useState } from "react";
import Arrow from "../../assets/icons/arrow-fill.svg";
import useAlign from "../../hooks/useAlign";
import ReactDOM from "react-dom";
import { labelStyles, menuItemStyles } from "./style";
import { useTheme } from "../..";

interface Menus {
  key: string;
  label: React.ReactNode;
}

interface DropdownProps {
  menus: Menus[];
  children: React.ReactNode;
}

const DropMenu: FC<{ menus: Menus[]; offsetX: number; offsetY: number }> = ({
  menus,
  offsetX,
  offsetY
}) => {
  const { theme } = useTheme();

  return ReactDOM.createPortal(
    <div
      className="bu-py-[8px] bu-absolute bu-shadow-card bu-rounded-[4px] bu-overflow-hidden bu-min-w-[80px]"
      style={{ left: offsetX + "px", top: offsetY + 18 + "px" }}>
      <ul>
        {menus?.map((item) => {
          return (
            <li className={menuItemStyles({ theme })} key={item.key}>
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>,
    document.body
  );
};

const Dropdown: FC<DropdownProps> = (props) => {
  const { menus, children } = props;

  const [hide, setHide] = useState(false);

  const targetRef = useRef<HTMLDivElement | null>(null);

  const [node, setNode] = useState<HTMLDivElement | null>(null);

  const { offsetX, offsetY } = useAlign(node);

  const { theme } = useTheme();

  useEffect(() => {
    setNode(targetRef.current);
  }, []);

  const changeDropdown = () => {
    setHide(!hide);
  };

  return (
    <div>
      <div
        ref={targetRef}
        className="bu-inline-flex bu-cursor-pointer bu-items-center"
        onClick={changeDropdown}>
        <span className={`dropdown bu-text-[12px] bu-leading-[18px] bu-tracking-[-0.2px] ${labelStyles({theme})}`}>
          {children}
        </span>
        <Arrow className={`bu-h-[16px] bu-w-[16px] ${!hide ? "bu-rotate-180" : ""} ${labelStyles({theme})}`} />
      </div>
      {hide && <DropMenu menus={menus} offsetX={offsetX} offsetY={offsetY} />}
    </div>
  );
};

export { Dropdown };
