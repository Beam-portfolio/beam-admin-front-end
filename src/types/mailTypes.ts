// Common interfaces

export interface MailPerson {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface MailAttachment {
  id: string;
  preview: string;
  // add more fields if needed
}

export interface MailLabel {
  id: string;
  name: string;
  color?: string;
  unreadCount?: number;
  icon?: string,
  email?: string,
}

export interface MailsNormalized {
  allIds: string[];
  byId: Record<string, any>;
}

// 1. MailCompose
export interface MailComposeProps {
  onCloseCompose: () => void;
}

// 2. MailDetails
export interface MailDetailsProps {
  mail?: any | null;
  renderLabel: (labelId: string) => MailLabel | undefined;
}

// 3. MailHeader
export interface MailHeaderProps {
  onOpenMail?: () => void;
  onOpenNav?: () => void;
  [key: string]: any; // for ...other
}

// 4. MailItem
export interface MailItemProps {
  mail: any;
  selected?: boolean;
  onClickMail?: () => void;
  sx?: object;
  [key: string]: any; // for ...other
}

// 5. MailList
export interface MailListProps {
  loading?: boolean;
  mails: any;
  openMail?: boolean;
  onCloseMail?: () => void;
  onClickMail?: (mailId: string) => void;
  selectedLabelId?: string;
  selectedMailId?: string;
}

// 6. MailNavItem
export interface MailNavItemProps {
  selected?: boolean;
  label: MailLabel;
  onClickNavItem?: () => void;
  [key: string]: any; // for ...other
}

// 7. MailNav
export interface MailNavProps {
  loading?: boolean;
  openNav?: boolean;
  onCloseNav?: () => void;
  labels: MailLabel[];
  selectedLabelId?: string;
  handleClickLabel?: (labelId: string) => void;
  onToggleCompose?: () => void;
}