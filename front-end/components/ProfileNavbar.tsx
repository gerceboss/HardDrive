import { Stack, Link, Button, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LinkNext from "next/link";
import { Title } from "./Title";
import styles from "../styles/Profile.module.css";

interface Menu {
    label: string;
    href: string;
}
  
const MENU: Menu[] = [
    {
        label:"Back to Drive",
        href: "/drive"
    },
    {
        label:"Back to Home",
        href:"/"
    }
];

export const ProfileNavbar = () => {
    return (
      <div className={styles.ProfileNavbar}>
          <div className={styles.TitleContainer}>
            <Title />
          </div>
        <DesktopNav/>
      </div>
    );
};

const DesktopNav = () => {
    const router = useRouter();
  
    return (
        <Stack direction={"row"} spacing={4} alignItems="center" justifyContent="flex-end" >
            {MENU.map((navItem, i) => (
                <Link
                    key={i}
                    className="button-3"
                    marginRight="10px"
                    as={LinkNext}
                    href={navItem.href}
                >
                    {navItem.label}
                </Link>
            ))}
        </Stack>
    );
};