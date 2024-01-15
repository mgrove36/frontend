/** Return an icon representing a attribute. */
import { HassEntity } from "home-assistant-js-websocket";
import { nothing } from "lit";
import {
  computeFanModeIcon,
  computeHvacModeIcon,
  computePresetModeIcon,
  computeSwingModeIcon,
} from "../../data/climate";
import { computeDomain } from "./compute_domain";

const iconGenerators = {
  climate: {
    fan_mode: computeFanModeIcon,
    hvac_mode: computeHvacModeIcon,
    preset_mode: computePresetModeIcon,
    swing_mode: computeSwingModeIcon,
  },
};

export const attributeIconPath = (
  state: HassEntity | undefined,
  attribute: string,
  attributeValue?: string
) => {
  if (!state) {
    return nothing;
  }
  const domain = computeDomain(state.entity_id);
  if (iconGenerators[domain]?.[attribute]) {
    return iconGenerators[domain]?.[attribute](
      attributeValue || state.attributes[attribute]
    );
  }
  return nothing;
};
