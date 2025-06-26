import { redirect } from 'next/navigation';
// config
import 'react-datepicker/dist/react-datepicker.css';

import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

export default async function HomePage() {
  redirect(PATH_AFTER_LOGIN);
}
