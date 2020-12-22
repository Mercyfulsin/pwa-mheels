import { library } from "@fortawesome/fontawesome-svg-core";
import { faServer, faUtensils, faMapMarkerAlt, faLink, faPowerOff, faUser, faComment } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faMapMarkerAlt);
  library.add(faServer);
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faUtensils);
  library.add(faComment);
}

export default initFontAwesome;
