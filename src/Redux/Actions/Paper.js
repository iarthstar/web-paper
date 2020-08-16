import TYPE from '../Types/Paper';
import { makeSyncAction } from '../../Utils/Redux';

export const savePaper = makeSyncAction(TYPE.SAVE_PAPER);

export const newPaper = makeSyncAction(TYPE.NEW_PAPER);

export const prevPaper = makeSyncAction(TYPE.PREV_PAPER);

export const nextPaper = makeSyncAction(TYPE.NEXT_PAPER);