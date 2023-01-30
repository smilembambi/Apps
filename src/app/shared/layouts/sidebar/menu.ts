import {MenuItem} from './menu.model';
import {
  ROUTE_APP_ANALYSE_BI,
  ROUTE_APP_ANALYSE_DASHBOARD,
  ROUTE_APP_MANAGEMENT_EVANGELIZE, ROUTE_APP_MANAGEMENT_EVENTS,
  ROUTE_APP_MANAGEMENT_HOME_CHURCH,
  ROUTE_APP_MANAGEMENT_LOCAL_CHURCH,
  ROUTE_APP_MANAGEMENT_MEMBER,
  ROUTE_APP_ADMINISTRATION_MINISTRY,
  ROUTE_APP_ADMINISTRATION_PASTOR,
  ROUTE_APP_ADMINISTRATION_REM,
  ROUTE_APP_ADMINISTRATION_STAR,
  ROUTE_APP_MANAGEMENT_TRAINING, ROUTE_APP_ADMINISTRATION_USER
} from "../../../core/helpers/params/params.routes";
import {
  ROUTE_APP_ICON_CHURCH,
  ROUTE_APP_ICON_EVANGELIZE, ROUTE_APP_ICON_EVENTS,
  ROUTE_APP_ICON_HOME_CHURCH,
  ROUTE_APP_ICON_LOCAL_CHURCH,
  ROUTE_APP_ICON_MEMBER, ROUTE_APP_ICON_MINISTRY,
  ROUTE_APP_ICON_PASTOR, ROUTE_APP_ICON_REM,
  ROUTE_APP_ICON_STAR,
  ROUTE_APP_ICON_TRAINING, ROUTE_APP_ICON_USER
} from "../../../core/helpers/params/params.icon";
import {ROUTE_APP_MANAGEMENT_CHURCH} from "../../../core/helpers/params/params.routes";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.ANALYSE.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARDS.TEXT',
    icon: 'bx-home-circle',
    link: ROUTE_APP_ANALYSE_DASHBOARD + '/traffic',
  },
  // {
  //   id: 3,
  //   label: 'MENUITEMS.BI.TEXT',
  //   icon: 'bx-line-chart',
  //   link: ROUTE_APP_ANALYSE_BI + '/metrique-par-secteur',
  // },
  {
    id: 7,
    isLayout: true
  },
  {
    id: 7111,
    label: '',
    isTitle: true
  },
  {
    id: 8,
    isLayout: true
  },


  {
    id: 56,
    label: 'MENUITEMS.MANAGE.TEXT',
    isTitle: true
  },
  {
    id: 57,
    label: 'MENUITEMS.CITY_CHURCH.TEXT',
    icon: ROUTE_APP_ICON_CHURCH,
    link: ROUTE_APP_MANAGEMENT_CHURCH,
  },
  // {
  //   id: 58,
  //   label: 'MENUITEMS.LOCAL_CHURCH.TEXT',
  //   icon: ROUTE_APP_ICON_LOCAL_CHURCH ,
  //   link: ROUTE_APP_MANAGEMENT_LOCAL_CHURCH,
  // },
  // {
  //   id: 59,
  //   label: 'MENUITEMS.HOME_CHURCH.TEXT',
  //   icon: ROUTE_APP_ICON_HOME_CHURCH,
  //   link: ROUTE_APP_MANAGEMENT_HOME_CHURCH,
  // },
  // {
  //   id: 60,
  //   label: 'MENUITEMS.MEMBER.TEXT',
  //   icon: ROUTE_APP_ICON_MEMBER,
  //   link: ROUTE_APP_MANAGEMENT_MEMBER,
  // },
  {
    id: 63,
    label: 'MENUITEMS.MEMBER.TEXT',
    icon: ROUTE_APP_ICON_MEMBER,
    link: ROUTE_APP_ADMINISTRATION_USER,
  },
  {
    id: 61,
    label: 'MENUITEMS.EVENTS.TEXT',
    icon: ROUTE_APP_ICON_EVENTS,
    link: ROUTE_APP_MANAGEMENT_EVENTS,
  },
  // {
  //   id: 62,
  //   label: 'MENUITEMS.EVANGELIZE.TEXT',
  //   icon: ROUTE_APP_ICON_EVANGELIZE,
  //   link: ROUTE_APP_MANAGEMENT_EVANGELIZE,
  // },

  // {
  //   id: 63,
  //   label: 'MENUITEMS.STAR.TEXT',
  //   icon: ROUTE_APP_ICON_STAR,
  //   link: ROUTE_APP_MANAGEMENT_STAR,
  // },
  // {
  //   id: 64,
  //   label: 'MENUITEMS.PASTOR.TEXT',
  //   icon: ROUTE_APP_ICON_PASTOR,
  //   link: ROUTE_APP_MANAGEMENT_PASTOR,
  // },
  // {
  //   id: 65,
  //   label: 'MENUITEMS.MINISTRY.TEXT',
  //   icon: ROUTE_APP_ICON_MINISTRY,
  //   link: ROUTE_APP_MANAGEMENT_MINISTRY,
  // },
  // {
  //   id: 66,
  //   label: 'MENUITEMS.REM.TEXT',
  //   icon: ROUTE_APP_ICON_REM,
  //   link: ROUTE_APP_MANAGEMENT_REM,
  // },

  //
  // {
  //   id: 88,
  //   isLayout: true
  // },
  // {
  //   id: 8811,
  //   label: '',
  //   isTitle: true
  // },
  //
  // {
  //   id: 80,
  //   label: 'MENUITEMS.COMMUNICATION.TEXT',
  //   isTitle: true
  // },
  // {
  //   id: 81,
  //   label: 'MENUITEMS.INTERFACING.TEXT',
  //   icon: 'bx-tone',
  //   subItems: [
  //     {
  //       id: 82,
  //       label: 'MENUITEMS.INTERFACING.LIST.EXPORT',
  //       link: ROUTE_APP_COMMUNICATION_INTERFACING_EXPORT,
  //       icon: 'bx-link-external',
  //       parentId: 81
  //     },
  //     {
  //       id: 83,
  //       label: 'MENUITEMS.INTERFACING.LIST.IMPORT',
  //       link: ROUTE_APP_COMMUNICATION_INTERFACING_IMPORT,
  //       icon: 'bx-exit',
  //       parentId: 81
  //     },
  //
  //   ]
  // },
  //
  // {
  //   id: 84,
  //   label: 'MENUITEMS.PCS.TEXT',
  //   icon: 'bx-shape-circle',
  //   link: ROUTE_APP_COMMUNICATION_PCS,
  // },
  //
  // {
  //   id: 98,
  //   isLayout: true
  // },
  // {
  //   id: 9811,
  //   label: '',
  //   isTitle: true
  // },
  //
  // {
  //   id: 90,
  //   label: 'MENUITEMS.GED.TEXT',
  //   isTitle: true
  // },
  // {
  //   id: 91,
  //   label: 'MENUITEMS.MY_DOCUMENTS.TEXT',
  //   icon: 'bx-file',
  //   link: ROUTE_APP_GED_MY_DOCUMENT,
  // },
  // {
  //   id: 92,
  //   label: 'MENUITEMS.SHARED_DOCUMENTS.TEXT',
  //   icon: 'bx-share',
  //   link: ROUTE_APP_GED_SHARED_DOCUMENT ,
  // },
  //
  // {
  //   id: 93,
  //   label: 'MENUITEMS.ARCHIVE.TEXT',
  //   icon: 'bx-archive',
  //   link: ROUTE_APP_GED_ARCHIVE,
  // },

];

