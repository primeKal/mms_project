import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';

// Use this instead of plain `useDispatch`
const useAppDispatch: () => AppDispatch = useDispatch;
