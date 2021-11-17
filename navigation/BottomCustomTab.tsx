import React, { useState } from "react";
import { View } from "react-native";
import { t } from "react-native-tailwindcss";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import HomeIcon from "./icons/HomeIcon";
import CategoryIcon from "./icons/CategoryIcon";
import SearchIcon from "./icons/SearchIcon";
import FinanceIcon from "./icons/FinanceIcon";
import MoreIcon from "./icons/MoreIcon";
import TabItem from "./TabItem";
import { Colors } from "./icons/Constants";
export const bottomHeight = 70;

function BottomCustomTab({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const [active, setActive] = useState(0);
  const [preActive, setPreActive] = useState(0);

  return (
    <React.Fragment>
      <View
        style={[
          t.absolute,
          t.flexRow,
          t.bgWhite,
          t.bottom0,
          t.justifyAround,
          t.wFull,
          t.shadowMd,
          t.roundedTLg,
          t.pX4,
          {
            height: bottomHeight,
          },
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = active === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key || undefined,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
            setPreActive(active);
            setActive(index);
          };
          let Icon = <HomeIcon />;
          switch (route.name) {
            case "Home":
              Icon = <HomeIcon active={isFocused} />;
              break;
            case "Calendar":
              Icon = <CategoryIcon active={isFocused} />;
              break;
            case "FindCourse":
              Icon = <SearchIcon active={isFocused} />;
              break;
            case "Finance":
              Icon = <FinanceIcon active={isFocused} />;
              break;
            case "UserCenter":
              Icon = <MoreIcon active={isFocused} />;
              break;
            default:
              break;
          }

          return (
            <TabItem
              onPress={onPress}
              index={index}
              isFocused={isFocused}
              active={active}
              preActive={preActive}
            >
              {Icon}
            </TabItem>
          );
        })}
      </View>
    </React.Fragment>
  );
}

export default BottomCustomTab;
