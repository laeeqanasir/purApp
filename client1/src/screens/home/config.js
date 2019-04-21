import Button from "@material-ui/core/Button";
import updateIcon from "@material-ui/icons/Update";
import { routes } from "../../Routing";

export const homeButtons = history => {
  let menus = [];

  for (let r of routes) {
    if (!r.showInHome) continue;
    menus.push({
      button: Button,
      buttonProps: { variant: "outlined", color: "primary" },
      buttonText: r.name,
      route: r.path,
      onClick: () => history.push(r.path)
      // buttonIcon: updateIcon
    });
  }
  return menus;
};
