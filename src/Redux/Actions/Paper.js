import TYPE from '../Types/Paper';
import { makeSyncAction } from '../../Utils/Redux';

export const showSnackbar = makeSyncAction(TYPE.SHOW_SNACKBAR);