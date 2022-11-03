import { useCallback, useEffect, useRef, useState } from 'react';
import { Observable, Subject } from 'rxjs';

export const useSubjectState = <T>(
  subject: Subject<T>,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const subscription = subject.subscribe((value) => {
      setState(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [subject]);

  const setSubject = useCallback((value: T) => {
    subject.next(value);
  }, []);

  return [state, setSubject];
};

export const useSubjectValue = <T>(
  observable: Observable<T>,
  defaultValue: T,
): T => {
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const subscription = observable.subscribe((value) => {
      setState(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);

  return state;
};

export const useSetSubjectState = <T>(
  subject: Subject<T>,
): ((value: T) => void) => {
  const setSubject = useCallback((value: T) => {
    subject.next(value);
  }, []);

  return setSubject;
};

interface UseSubjectStateHooks<T> {
  useSubjectValue: (defaultValue: T) => T;
  useSetSubjectState: () => (value: T) => void;
  useSubjectState: (defaultValue: T) => [T, (value: T) => void];
}

export const createUseSubjectStateHooks = <T>(
  subject: Subject<T>,
): UseSubjectStateHooks<T> => {
  const useSubjectValue = (defaultValue: T): T => {
    const [state, setState] = useState(defaultValue);

    useEffect(() => {
      const subscription = subject.subscribe((value) => {
        setState(value);
      });
      return () => {
        subscription.unsubscribe();
      };
    }, [subject]);

    return state;
  };

  const useSetSubjectState = (): ((value: T) => void) => {
    const setSubject = useCallback((value: T) => {
      subject.next(value);
    }, []);

    return setSubject;
  };

  const useSubjectState = (defaultValue: T): [T, (value: T) => void] => {
    const state = useSubjectValue(defaultValue);
    const setState = useSetSubjectState();
    return [state, setState];
  };

  return {
    useSubjectValue,
    useSetSubjectState,
    useSubjectState,
  };
};

export const useSubjectSideEffect = <T>(
  observable: Observable<T>,
  onSubjectChange: (value: T) => void,
) => {
  const cbRef = useRef(onSubjectChange);
  cbRef.current = onSubjectChange;

  useEffect(() => {
    const subscription = observable.subscribe((value) => {
      cbRef.current(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);
};
