import { AnyAction, Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IRootState, ITodoAction } from '@/types/todo';

export const useAppSelector = <T>(
  selector: (state: IRootState) => T,
  equalityFn?: (prev: T, next: T) => boolean
) => useSelector<IRootState, T>(selector, equalityFn);

type AppDispatch = ThunkDispatch<IRootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
