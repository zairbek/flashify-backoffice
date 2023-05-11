import {
  mdiMenu,
  mdiClockOutline,
  mdiCloud,
  mdiCrop,
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  {
    icon: mdiMenu,
    label: 'Sample menu',
    menu: [
      {
        icon: mdiClockOutline,
        label: 'Item One',
      },
      {
        icon: mdiCloud,
        label: 'Item Two',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiCrop,
        label: 'Item Last',
      },
    ],
  },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'Аккаунт',
        href: '/profile',
      },
      {
        icon: mdiCogOutline,
        label: 'Настройки',
      },
      {
        icon: mdiEmail,
        label: 'Письмы',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Выйти',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    icon: mdiLogout,
    label: 'Выйти',
    isDesktopNoLabel: true,
    isLogout: true,
  },
]

export default menuNavBar
